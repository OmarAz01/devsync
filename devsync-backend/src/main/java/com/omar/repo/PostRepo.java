package com.omar.repo;

import com.omar.entity.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepo extends JpaRepository<PostEntity, Long> {

    Optional<PostEntity> findByUserId(Long userId);
    @Query(value = "SELECT * FROM posts ORDER BY post_id DESC LIMIT 30", nativeQuery = true)
    Optional<List<PostEntity>> findAllPosts();

    @Query(value = "SELECT * FROM posts WHERE skill_needed LIKE %:skillQuery% AND level_needed LIKE %:levelQuery% ORDER BY post_id DESC LIMIT 30", nativeQuery = true)
    Optional<List<PostEntity>> findBySkillAndLevel(String skillQuery, String levelQuery);


}
