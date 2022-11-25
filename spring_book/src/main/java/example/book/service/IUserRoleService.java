package example.book.service;



import example.book.model.AppUser;
import example.book.model.UserRole;

import java.util.List;

public interface IUserRoleService {

    /**
     * @return list UserRole (test list)
     * @creator LongNT
     * @day 12/09/2022
     */

    List<UserRole> findAll();

    /**
     * @param userRole
     * @creator LongNT
     * @day 12/09/2022
     */
    void save(Integer userRole);

    void deleteUserRole(int id);

}
