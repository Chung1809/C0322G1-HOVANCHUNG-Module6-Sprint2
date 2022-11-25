package example.book.service.impl;

import example.book.model.AppUser;
import example.book.model.UserRole;
import example.book.repository.UserRepository;
import example.book.repository.UserRoleRepository;
import example.book.service.IUserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserRoleService implements IUserRoleService {

    @Autowired
    UserRoleRepository userRoleRepository;

    @Autowired
    UserRepository userRepository;

    /**
     * @return list UserRole (test list)
     * @creator LongNT
     * @day 12/09/2022
     */

    @Override
    public List<UserRole> findAll() {
        return userRoleRepository.findAll();
    }

    /**
     * @param userRole
     * @creator LongNT
     * @day 12/09/2022
     */

    @Override
    public void save(Integer userRole) {
        userRoleRepository.save(userRole);
    }


    @Override
    public void deleteUserRole(int id) {
        userRoleRepository.deleteUserRole(id);
    }
}
