package com.omar.service;

import com.omar.entity.PostEntity;
import com.omar.dto.QueryDTO;
import com.omar.repo.PostRepo;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;
import java.net.URLDecoder;

@Service
@AllArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepo postRepo;

    @Override
    public ResponseEntity<Long> deletePost(Long id) {
        Optional<PostEntity> post = postRepo.findById(id);
        if (post.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        try {
            postRepo.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body(id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }


    }

    @Override
    public ResponseEntity<PostEntity> updatePost(Long id, PostEntity post) {
        Optional<PostEntity> existingPost = postRepo.findById(id);
        if (existingPost.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        existingPost.get().setContent(post.getContent());
        try {
            return ResponseEntity.status(HttpStatus.OK).body(postRepo.save(existingPost.get()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

    @Override
    public ResponseEntity<PostEntity> findPost(Long id) {
        Optional<PostEntity> post = postRepo.findById(id);
        if (post.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(post.get());
    }

    @Override
    public ResponseEntity<PostEntity> createPost(PostEntity post) {
        try {
            PostEntity newPost = postRepo.save(post);
            return ResponseEntity.status(HttpStatus.CREATED).body(newPost);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @Override
    public ResponseEntity<List<PostEntity>> findByUserId(Long userId) {
        return postRepo.findByUserUserId(userId).isEmpty() ? ResponseEntity.status(HttpStatus.NOT_FOUND).body(null) :
                ResponseEntity.status(HttpStatus.OK).body(postRepo.findByUserUserId(userId).get());
    }

    @Override
    public ResponseEntity<List<PostEntity>> findAllPostsBefore(String date) {
        String decodedDateTime;
        try {
            decodedDateTime = URLDecoder.decode(date, StandardCharsets.UTF_8.toString());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        try {
            Optional<List<PostEntity>> posts = postRepo.findAllPostsBefore(decodedDateTime.substring(0, 19));
            if (posts.get().isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            return ResponseEntity.status(HttpStatus.OK).body(posts.get());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @Override
    public ResponseEntity<List<PostEntity>> findBySkillAndLevel(QueryDTO query) {
        String decodedDateTime;
        try {
            decodedDateTime = URLDecoder.decode(query.getDate(), StandardCharsets.UTF_8.toString());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        try {
            Optional<List<PostEntity>> posts = postRepo.findBySkillAndLevel(query.getSkillQuery(), query.getLevelQuery(), decodedDateTime.substring(0, 19));
            if (posts.get().isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            return ResponseEntity.status(HttpStatus.OK).body(posts.get());
        } catch (Exception e) {
            throw new RuntimeException("Error occurred while retrieving posts by skill and level", e);
        }
    }
}
