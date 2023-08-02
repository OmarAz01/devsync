package com.omar.repo;

import com.omar.entity.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepo extends JpaRepository<PostEntity, Long> {
    @Query(value = "SELECT * FROM posts WHERE date_created < :date ORDER BY post_id DESC LIMIT 10", nativeQuery = true)
    Optional<List<PostEntity>> findAllPostsBefore(@Param("date") String date);

    @Query(value = "SELECT * FROM posts WHERE date_created < :date AND user_id = :userId ORDER BY post_id DESC LIMIT 10", nativeQuery = true)
    Optional<List<PostEntity>> findByUserId(@Param("userId") Long userId, @Param("date") String date);

    @Query(value = "SELECT * FROM posts WHERE user_id = :userId", nativeQuery = true)
    Optional<List<PostEntity>> findByUserId(@Param("userId") Long userId);

    @Query(value = "SELECT * FROM posts WHERE skill_needed LIKE CONCAT('%', :skillQuery, '%') AND level_needed LIKE CONCAT('%', :levelQuery, '%') AND date_created < :date ORDER BY post_id DESC LIMIT 10", nativeQuery = true)
    Optional<List<PostEntity>> findBySkillAndLevel(@Param("skillQuery") String skillQuery, @Param("levelQuery") String levelQuery, @Param("date") String date);


}
