package example.book.dto;

import example.book.model.CartDetail;
import example.book.model.Category;
import example.book.model.Discount;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.time.LocalDate;
import java.util.Set;

public class BookDto implements Validator {
    private Integer id;
    private String code;
    private String name;
    private String description;
    private String price;
    private String image;
    private String publisher;
    private String totalPage;
    private String author;
    private LocalDate releaseDate;
    private Integer status = 0;
    private Category category;
    private Discount discount;
    private Set<CartDetail> carts;


    public BookDto() {
    }

    public BookDto(Integer id, String code, String name, String description, String price, String image, String publisher, String totalPage, String author, LocalDate releaseDate, Integer status, Category category, Discount discount, Set<CartDetail> carts) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.publisher = publisher;
        this.totalPage = totalPage;
        this.author = author;
        this.releaseDate = releaseDate;
        this.status = status;
        this.category = category;
        this.discount = discount;
        this.carts = carts;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(String totalPage) {
        this.totalPage = totalPage;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Discount getDiscount() {
        return discount;
    }

    public void setDiscount(Discount discount) {
        this.discount = discount;
    }

    public Set<CartDetail> getCarts() {
        return carts;
    }

    public void setCarts(Set<CartDetail> carts) {
        this.carts = carts;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return false;
    }


    @Override
    public void validate(Object target, Errors errors) {

    }
}
