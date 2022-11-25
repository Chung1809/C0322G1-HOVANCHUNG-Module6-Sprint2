package example.book.service;

import example.book.model.CartDetail;

import java.util.List;
import java.util.Optional;

public interface ICartService {
    List<CartDetail> findAllCart(Integer user);
    List<CartDetail> findAllCart();
    List<CartDetail> findAllHistoryCart(Integer user);
    List<CartDetail> getCart(Integer book,Integer user);
    void increaseQuantity(Integer quantity,Integer book, Integer user);
    void addCart(CartDetail cart);
    Optional<CartDetail> findById(Integer id);
    void deleteCart(Integer id);
    void payment(Integer id);


}
