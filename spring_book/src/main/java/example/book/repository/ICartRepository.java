package example.book.repository;

import example.book.model.CartDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Repository
@Transactional
public interface ICartRepository extends JpaRepository<CartDetail, Integer> {
    @Modifying
    @Query(value = "update cart_detail set quantity = quantity + :quantity where book_id =:book and user_id =:user", nativeQuery = true)
    void quantityIncrease(@Param("quantity") Integer quantity,
                          @Param("book") Integer book,
                          @Param("user") Integer user);


    @Query(value = "select * from cart_detail where `status` = 0  and user_id =:user ", nativeQuery = true)
    List<CartDetail> findAllCart(@Param("user") Integer user);

    @Query(value = "select * from cart_detail where `status` = 1  and user_id =:user ", nativeQuery = true)
    List<CartDetail> findAllHistoryCart(@Param("user") Integer user);

    @Modifying
    @Query(value = "update cart_detail set `status` = 2 where id =:id",nativeQuery = true)
    void deleteCart(@Param("id") Integer id);
    @Modifying
    @Query(value = "update cart_detail set `status` = 1 where user_id =:user",nativeQuery = true)
    void payment(@Param("user") Integer user);

    @Query(value = "select * from cart_detail where book_id = :bookId and user_id = :userId", nativeQuery = true)
    List<CartDetail> getCart(@Param("bookId") Integer bookId, @Param("userId") Integer userId);

}
