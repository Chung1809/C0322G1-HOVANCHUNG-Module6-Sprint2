package example.book.controller;

import example.book.model.AppUser;
import example.book.model.UserRole;
import example.book.service.IUserRoleService;
import example.book.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequestMapping("/api/public/book")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class AppUserController {
    @Autowired
    private IUserService userService;
    @Autowired
    private IUserRoleService userRoleService;

    @PostMapping("/facebook")
    public ResponseEntity<Object> addUser(@RequestBody AppUser appUser) {
        userService.save(appUser);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("/google")
    public ResponseEntity<Object> addGoogle(@RequestBody AppUser appUser) {
        userService.save(appUser);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
