package example.book.service;

import example.book.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface IBookService {
    Page<Book> findAllBook(Pageable pageable , String name ,String category);
    void createBook(Book book);
    void updateBook(Book book);
    Optional<Book> findById(Integer id);
    void deleteBook(Integer id);
}
