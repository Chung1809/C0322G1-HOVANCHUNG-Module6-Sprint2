//package example.book.repository;
//
//import example.book.model.Book;
//import example.book.model.CartDetail;
//import org.apache.catalina.User;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Modifying;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.List;
//
//@Transactional
//public interface ICartRepository extends JpaRepository<CartDetail, Integer> {
//    @Modifying
//    @Query(value = "update cart_detail set quantity + :quantity where book_id =:book and user_id =:user", nativeQuery = true)
//    void quantityIncrease(@Param("quantity") Integer quantity,
//                          @Param("book") Integer book,
//                          @Param("user") Integer user);
//
//    @Query(value = "select * from cart_detail where `status` = 0 and book_id =:book and user_id =:id ", nativeQuery = true)
//    List<CartDetail> findAllCart(@Param("book") Integer book,
//                                 @Param("user") Integer user);
//
//    @Query(value = "update cart_detail set quantity - :quantity where book_id =:book and user_id =:user", nativeQuery = true)
//    void quantityDiscount(@Param("quantity") Integer quantity,
//                          @Param("book") Integer book,
//                          @Param("user") Integer user);
//    @Query(value = "select * from cart_detail where user_id =:user",nativeQuery = true)
//    List<CartDetail> findAllUser(@Param("user") Integer user);
//}
