package example.book.service.impl;

import example.book.dto.CartDetailDto;
import example.book.model.AppUser;
import example.book.model.CartDetail;
import example.book.repository.ICartRepository;
import example.book.repository.UserRepository;
import example.book.repository.UserRoleRepository;
import example.book.service.IUserService;
import freemarker.template.Configuration;
import freemarker.template.TemplateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;
import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@Service
public class UserService implements IUserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private UserRoleRepository userRoleRepository;
    @Autowired
    private ICartRepository cartRepository;

    final  Configuration configuration;


    public UserService(Configuration configuration) {
        this.configuration = configuration;
    }
    @Override
    public AppUser findByName(String name) {
        return userRepository.findAppUserByName(name);
    }

    @Override
    public String existsByUserName(String username) throws MessagingException, UnsupportedEncodingException {
        String user = userRepository.existsByUserName(username);
        AppUser appUser = userRepository.findAppUserByName(username);
        if (user != null) {
            sendVerificationEmailForResetPassWord(username, appUser.getEmail());
        }
        return user;
    }

    @Override
    public void saveNewPassword(String password, String name) {
        userRepository.saveNewPassword(password, name);
    }


    public void sendVerificationEmailForResetPassWord(String userName, String email) throws MessagingException, UnsupportedEncodingException {
        String subject = "Hãy xác thực email của bạn";
        String mailContent = "";
        String confirmUrl = "http://localhost:4200/verify-reset-password/" + userName;


        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");
        helper.setFrom("sangnguyenjp97@gmail.com", "CODE GYM");
        helper.setTo(email);
        helper.setSubject(subject);
        mailContent = "<p sytle='color:red;'>Xin chào " + userName + " ,<p>" + "<p> Nhấn vào link sau để xác thực email của bạn:</p>" +
                "<h3><a href='" + confirmUrl + "'>Link Xác thực( nhấn vào đây)!</a></h3>" +
                "<p>CODE GYM</p>";
        helper.setText(mailContent, true);
        javaMailSender.send(message);
    }

    /**
     * @return List User (test list)
     * @creator LongNT
     * @day 12/09/2022
     */

    @Override
    public List<AppUser> findAll() {
        return userRepository.findAll();
    }


    /**
     * @param appUser
     * @creator LongNT
     * @day 12/09/2022
     */

    @Override
    public void save(AppUser appUser) {
        if (userRepository.findAppUserByName(appUser.getUsername()) != null) {
            return;
        }
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encryptedPassword = passwordEncoder.encode(appUser.getPassword());
        appUser.setPassword(encryptedPassword);
        userRepository.save(appUser.getUsername(), appUser.getPassword(), appUser.getEmail());
        List<AppUser> appUsers = userRepository.findAll();
        userRoleRepository.save(appUsers.toArray().length);
    }

    /**
     * @param id
     * @return Employee
     * @creator LongNT
     * @day 12/09/2022
     */

    @Override
    public Optional<AppUser> findById(Integer id) {
        return userRepository.findById(id);
    }

    /**
     * @param appUser
     * @creator LongNT
     * @day 12/09/2022
     */

    @Override
    public void edit(AppUser appUser) {
        userRepository.edit(appUser.getUsername(), appUser.getPassword(), appUser.getEmail(), appUser.getId());
    }

    @Override
    public void deleteUser(int id) {
        userRepository.deleteUser(id);
    }


    @Override
    public Boolean existsUsername(String username) {
        return username.equals(userRepository.existsUsername(username));
    }

    @Override
    public Boolean existsEmail(String email) {
        return email.equals(userRepository.existsEmail(email));
    }

    @Override
    public void sendMail(String user) throws MessagingException, IOException, TemplateException {
        List<CartDetail> cartDetailDtoList = cartRepository.findAll();
        double totalMoney = 0;
        int quantity = 0;
        String mail = "";
        String nameBook = "";
        for (CartDetail item : cartDetailDtoList) {
            if (userRepository.findAppUserByName(user).equals(item.getAppUser())) {
                quantity += item.getQuantity();
                totalMoney += item.getQuantity() * (Double.parseDouble(item.getBook().getPrice()));
                mail = item.getAppUser().getEmail();
            }

        }
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");
        helper.setFrom("supperman1809@gmail.com");
        helper.setSubject("ĐƠN THANH TOÁN");
        helper.setTo(mail);
        StringWriter stringWriter = new StringWriter();
        Map<String, Object> model = new HashMap<>();
        model.put("totalMoney", totalMoney);
        model.put("cart", cartDetailDtoList);
        configuration.getTemplate("email.ftlh").process(model, stringWriter);
        helper.setText(stringWriter.getBuffer().toString(), true);
        javaMailSender.send(message);



    }
}
