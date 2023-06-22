package com.omar.service;

import com.omar.entity.PostEntity;
import com.omar.dto.QueryDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PostService {

    ResponseEntity<Long> deletePost(Long postId);

    ResponseEntity<PostEntity> updatePost(Long postId, PostEntity post);

    ResponseEntity<PostEntity> findPost(Long postId);

    ResponseEntity<PostEntity> createPost(PostEntity post);

    ResponseEntity<List<PostEntity>> findByUserId(Long userId);

    ResponseEntity<List<PostEntity>> findAllPostsBefore(String date);

    ResponseEntity<List<PostEntity>> findBySkillAndLevel(QueryDTO query);

}
