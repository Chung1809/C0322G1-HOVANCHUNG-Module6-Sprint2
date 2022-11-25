package example.book.controller;

import example.book.dto.CartDetailDto;
import example.book.model.AppUser;
import example.book.model.Book;
import example.book.model.CartDetail;
import example.book.service.IBookService;
import example.book.service.ICartService;
import example.book.service.IUserService;
import freemarker.template.TemplateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Objects;

@RequestMapping("/api/public/book")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class CartController {

    @Autowired
    private ICartService cartService;
    @Autowired
    private IUserService userService;
    @Autowired
    private IBookService bookService;

    @GetMapping("/cart/{user}")
    public ResponseEntity<List<CartDetail>> findAllCart(@PathVariable("user") Integer user) {
        List<CartDetail> cartList = cartService.findAllCart(user);
        return new ResponseEntity<>(cartList, HttpStatus.OK);
    }

    @GetMapping("/cart/history/{user}")
    public ResponseEntity<List<CartDetail>> findAllHistoryCart(@PathVariable("user") Integer user) {
        List<CartDetail> cartList = cartService.findAllHistoryCart(user);
        return new ResponseEntity<>(cartList, HttpStatus.OK);
    }

    @GetMapping("/cart/{book}/{user}")
    public ResponseEntity<List<CartDetail>> getCart(@PathVariable("user") Integer user,
                                                    @PathVariable("book") Integer book) {
        List<CartDetail> cartList = cartService.getCart(book, user);
        return new ResponseEntity<>(cartList, HttpStatus.OK);
    }

    @GetMapping("/cart/save/{quantity}/{book}/{user}")
    public ResponseEntity<Object> saveCart(@PathVariable Integer quantity,
                                           @PathVariable Integer book,
                                           @PathVariable String user) {
        AppUser user1 = userService.findByName(user);
        Book book1 = bookService.findById(book).orElse(null);
        assert book1 != null;
        List<CartDetail> cart = cartService.getCart(book1.getId(), user1.getId());
        CartDetail cartDetail = new CartDetail();
        if (cart.isEmpty()) {
            cartDetail.setQuantity(quantity);
            cartDetail.setBook(book1);
            cartDetail.setStatus(0);
            cartDetail.setAppUser(user1);
            cartService.addCart(cartDetail);
        } else {
            cartService.increaseQuantity(quantity, book1.getId(), user1.getId());
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @DeleteMapping("/deleteCart/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
        cartService.deleteCart(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/payment/{user}/{sendMail}")
    public ResponseEntity<?> payment(@PathVariable("user") Integer user,
                                     @PathVariable("sendMail") String sendMail) throws IOException, MessagingException, TemplateException {
        userService.sendMail(sendMail);
        cartService.payment(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/list/cart/{user}")
    public ResponseEntity<?> findAll(@PathVariable("user") String user) {
        if ("".equals(user)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        AppUser user1 = userService.findByName(user);
        List<CartDetail> cartList = cartService.findAllCart(Integer.parseInt(String.valueOf(user1.getId())));
        return new ResponseEntity<>(cartList, HttpStatus.OK);
    }

    @GetMapping("/list/cart/history/{user}")
    public ResponseEntity<?> getCartHistory(@PathVariable("user") String user) {
        if ("".equals(user)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        AppUser user1 = userService.findByName(user);
        List<CartDetail> cartList = cartService.findAllHistoryCart(user1.getId());
        return new ResponseEntity<>(cartList, HttpStatus.OK);
    }


}
