package example.book.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/public/book")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class CartController {

}
