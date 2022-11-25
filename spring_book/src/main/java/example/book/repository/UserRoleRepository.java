package example.book.repository;

import example.book.model.AppUser;
import example.book.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface UserRoleRepository extends JpaRepository<UserRole, Integer> {

    List<UserRole> findAllByAppUser(AppUser appUser);

    /**
     * @param id function deleteUserRole
     * @Creator HungNQ
     * @Date 12/09/2022
     */
    @Transactional
    @Modifying
    @Query(value = "delete from user_role where user_id= :id",nativeQuery = true)
    void deleteUserRole(@Param("id") int id);


    /**
     * @return list UserRole
     * @creator LongNT
     * @day 12/09/2022
     */

    @Query(value = "select * from user_role", nativeQuery = true)
    List<UserRole> findAll();

    /**
     * @param
     * @param userId
     * @creator LongNT
     * @day 12/09/2022
     */

    @Modifying
    @Query(value = "insert into user_role (`status`, role_id, user_id) values (0, 2, :userId)", nativeQuery = true)
    void save( @Param("userId") Integer userId);
}
