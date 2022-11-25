package example.book.service.impl;

import example.book.model.CartDetail;
import example.book.repository.ICartRepository;
import example.book.service.ICartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService implements ICartService {
    @Autowired
    private ICartRepository repository;
    @Override
    public List<CartDetail> findAllCart(Integer user) {
        return repository.findAllCart(user);
    }

    @Override
    public List<CartDetail> findAllCart() {
        return repository.findAll();
    }


    @Override
    public List<CartDetail> findAllHistoryCart(Integer user) {
        return repository.findAllHistoryCart(user);
    }



    @Override
    public List<CartDetail> getCart(Integer book,Integer user) {
        return repository.getCart(book, user);
    }

    @Override
    public void increaseQuantity(Integer quantity, Integer book, Integer user) {
        repository.quantityIncrease(quantity,book,user);
    }



    @Override
    public void addCart(CartDetail cart) {
        repository.save(cart);
    }


    @Override
    public Optional<CartDetail> findById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public void deleteCart(Integer id) {
        repository.deleteCart(id);
    }

    @Override
    public void payment(Integer id) {
        repository.payment(id);
    }


}
