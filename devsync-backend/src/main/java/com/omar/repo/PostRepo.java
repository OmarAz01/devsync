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
    @Query(value = "SELECT * FROM posts ORDER BY post_id DESC LIMIT 50", nativeQuery = true)
    Optional<List<PostEntity>> findAllPosts();

    @Query(value = "SELECT * FROM posts WHERE skill_needed = ?1 ORDER BY post_id DESC LIMIT 50", nativeQuery = true)
    Optional<List<PostEntity>> findBySkill(String skillNeeded);

    @Query(value = "SELECT * FROM posts WHERE level_needed = ?1 ORDER BY post_id DESC LIMIT 50", nativeQuery = true)
    Optional<List<PostEntity>> findByLevel(String levelNeeded);

    @Query(value = "SELECT * FROM posts WHERE skill_needed = ?1 AND level_needed = ?2 ORDER BY post_id DESC LIMIT 50", nativeQuery = true)
    Optional<List<PostEntity>> findBySkillAndLevel(String skillNeeded, String levelNeeded);


}
