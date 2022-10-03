package example.book.service.impl;

import example.book.model.Book;
import example.book.repository.IBookRepository;
import example.book.service.IBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class BookService implements IBookService {
    @Autowired
    private IBookRepository repository;
    @Override
    public Page<Book> findAllBook(Pageable pageable, String name,String category) {
        return repository.findAllBook(pageable,"%" +name + "%","%" + category +"%");
    }

    @Override
    public void createBook(Book book) {
       repository.save(book);
    }

    @Override
    public void updateBook(Book book) {
       repository.save(book);
    }

    @Override
    public Optional<Book> findById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public void deleteBook(Integer id) {
       repository.deleteBook(id);
    }
}
