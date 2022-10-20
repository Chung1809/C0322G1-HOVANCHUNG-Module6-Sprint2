//package example.book.service.impl;
//
//import example.book.model.CartDetail;
//import example.book.repository.ICartRepository;
//import example.book.service.ICartService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class CartService implements ICartService {
//    @Autowired
//    private ICartRepository repository;
//    @Override
//    public List<CartDetail> findAllCart(Integer user) {
//        return repository.findAllUser(user);
//    }
//
//    @Override
//    public void setQuantity(Integer quantity, Integer book, Integer user) {
//
//    }
//
//    @Override
//    public void addCart(CartDetail cartDetail) {
//        repository.save(cartDetail);
//    }
//
//    @Override
//    public Optional<CartDetail> findById(Integer id) {
//        return repository.findById(id);
//    }
//
//    @Override
//    public List<CartDetail> findAllUser(Integer user) {
//        return null;
//    }
//}
