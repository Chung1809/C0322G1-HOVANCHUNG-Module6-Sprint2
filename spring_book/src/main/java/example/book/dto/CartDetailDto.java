package example.book.dto;

import example.book.model.AppUser;
import example.book.model.Book;

public class CartDetailDto {
    private Integer id;
    private Integer quantity;
    private Integer status;
    private Book book;
    private AppUser appUser;

    public CartDetailDto() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public CartDetailDto(Integer id, Integer quantity, Integer status) {
        this.id = id;
        this.quantity = quantity;
        this.status = status;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public AppUser getAppUser() {
        return appUser;
    }

    public void setAppUser(AppUser appUser) {
        this.appUser = appUser;
    }
}
