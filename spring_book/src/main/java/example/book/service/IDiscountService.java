package example.book.service;

import example.book.model.Discount;

import java.util.List;

public interface IDiscountService {
    List<Discount> findAllDiscount();
}
