package example.book.repository;

import example.book.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<AppUser, Integer> {

    /**
     * Create by SangNH
     * Date: 08/09/2022
     * query: search by name
     *
     * @param name
     */
    @Query(value = "select * from app_user where username =:name", nativeQuery = true)
    AppUser findAppUserByName(@Param("name") String name);

    @Query(value = "SELECT username from app_user where username = ?1", nativeQuery = true)
    String existsByUserName(String username);

    @Modifying
    @Query(value = "update app_user set password =?1 where username = ?2", nativeQuery = true)
    void saveNewPassword(String password, String name);

    /**
     * @param id function deleteUser
     * @Creator HungNQ
     * @Date 12/09/2022
     */
    @Transactional
    @Modifying
    @Query(value = "update app_user set is_deleted = 1 where id = :id", nativeQuery = true)
    void deleteUser(@Param("id") int id);


    /**
     * @return list User
     * @creator LongNT
     * @day 12/09/2022
     */

    @Query(value = "select * from app_user", nativeQuery = true)
    List<AppUser> findAll();

    /**
     * @param username
     * @param password
     * @param email
     * @return save new User
     * @creator LongNT
     * @day 12/09/2022
     */
    @Modifying
    @Query(value = "insert into app_user (username, `password`, email, creation_date, is_deleted) values (:username, :password, :email, current_date(), 0)", nativeQuery = true)
    void save(@Param("username") String username, @Param("password") String password, @Param("email") String email);


    /**
     * @param id must not be {@literal null}.
     * @return id of User
     * @creator LongNT
     * @day 12/09/2022
     */

    @Query(value = "select * from app_user where id = :id", nativeQuery = true)
    Optional<AppUser> findById(@Param("id") Integer id);

    /**
     * @param username
     * @param password
     * @param email
     * @param id
     * @creator LongNT
     * @day 12/09/2022
     */

    @Modifying
    @Query(value = "update app_user set username = :username, `password` = :password, email = :email where id = :id", nativeQuery = true)
    void edit(@Param("username") String username, @Param("password") String password, @Param("email") String email, @Param("id") Integer id);

    /**
     * @param username
     * @return code
     * @creator LongNT
     * @day 15/09/2022
     */
    @Query(value = "select username from app_user where username = :username", nativeQuery = true)
    String existsUsername(@Param("username") String username);

    /**
     * @param email
     * @return code
     * @creator LongNT
     * @day 15/09/2022
     */
    @Query(value = "select email from app_user where email = :email", nativeQuery = true)
    String existsEmail(@Param("email") String email);
}