package example.book.service.impl;

import example.book.model.Discount;
import example.book.repository.IDiscountRepository;
import example.book.service.IDiscountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class DiscountService implements IDiscountService {
    @Autowired
    IDiscountRepository repository;
    @Override
    public List<Discount> findAllDiscount() {
        return repository.findAll();
    }
}
