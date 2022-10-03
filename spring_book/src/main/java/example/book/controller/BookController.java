package example.book.controller;

import example.book.dto.BookDto;
import example.book.model.Book;
import example.book.model.Category;
import example.book.service.IBookService;
import example.book.service.ICategoryService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RequestMapping("book")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class BookController {
    @Autowired
    private IBookService bookService;
    @Autowired
    private ICategoryService categoryService;

    @GetMapping("/list/category")
    public ResponseEntity<List<Category>> findAllPlacement() {
        return new ResponseEntity<>(categoryService.findAllCategory(), HttpStatus.OK);
    }
    @GetMapping("/list")
    public ResponseEntity<Page<Book>> findAllBook(@PageableDefault(value = 6) Pageable pageable,
                                                  @RequestParam Optional<String> name,
                                                  @RequestParam Optional<String> category) {
        String nameSearch = name.orElse("");
        String categorySearch = category.orElse("");
        Page<Book> book = bookService.findAllBook(pageable, nameSearch,categorySearch);
        if (book.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(book, HttpStatus.OK);
    }
    @PostMapping("/create")
    public ResponseEntity<Object> createBook(@RequestBody @Valid BookDto bookDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            Book book = new Book();
            BeanUtils.copyProperties(bookDto, book);
            bookService.createBook(book);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }
    @PutMapping("/edit/{id}")
    public ResponseEntity<Object> editBook(@PathVariable("id") Integer id,@RequestBody @Valid BookDto bookDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Optional<Book> bookUpdate = bookService.findById(id);
        if (!bookUpdate.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
            Book book = new Book();
            BeanUtils.copyProperties(bookDto, book);
            book.setId(bookUpdate.get().getId());
            bookService.updateBook(book);
            return new ResponseEntity<>(book,HttpStatus.OK);

    }
    @DeleteMapping("/delete/{id}")
    private ResponseEntity<?> delete(@PathVariable("id") Integer id) {
        bookService.deleteBook(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Integer id) {
        Optional<Book> book = bookService.findById(id);
        if (!book.isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(book, HttpStatus.OK);
        }
    }
}
