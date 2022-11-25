package example.book.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Entity

public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(columnDefinition = "VARCHAR(45)")
    private String username;

    @Column(columnDefinition = "VARCHAR(100)")
    private String password;

    @Column(columnDefinition = "VARCHAR(45)")
    private String email;

    @Column(columnDefinition = "DATE")
    private LocalDate creationDate;
    private String phone;
    private String address;

    private Integer status =0;

//    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
//    private CartDetail cartDetail;

    @OneToMany(mappedBy = "appUser")
    @JsonBackReference
    private Set<CartDetail> cartDetails;

    @JsonIgnore
    @OneToOne(mappedBy = "appUser")
    private Customer customer;

    @OneToMany(mappedBy = "appUser")
    @JsonIgnore
    private List<UserRole> userRoles;

    public AppUser() {
    }

    public AppUser(Integer id, String username, String password, String email, LocalDate creationDate, String phone, String address, Integer status, CartDetail cartDetail, Customer customer) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.creationDate = creationDate;
        this.phone = phone;
        this.address = address;
        this.status = status;
//        this.cartDetail = (Set<CartDetail>) cartDetail;
        this.customer = customer;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }



    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }


}
