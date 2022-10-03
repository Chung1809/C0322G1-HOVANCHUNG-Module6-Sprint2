package example.book.repository;

import example.book.model.Advertisement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface IAdvertisementRepository extends JpaRepository<Advertisement,Integer> {
}
