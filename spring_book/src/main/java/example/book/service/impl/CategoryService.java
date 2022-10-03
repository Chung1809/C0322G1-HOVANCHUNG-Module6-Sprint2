package example.book.service.impl;

import example.book.model.Category;
import example.book.repository.ICategoryRepository;
import example.book.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CategoryService implements ICategoryService {
    @Autowired
    private ICategoryRepository repository;
    @Override
    public List<Category> findAllCategory() {
        return repository.findAll();
    }
}
