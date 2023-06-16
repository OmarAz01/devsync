package com.omar.service;

import com.omar.entity.PostEntity;
import com.omar.entity.QueryDTO;
import org.springframework.http.ResponseEntity;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface PostService {

    ResponseEntity<Long> deletePost(Long postId);

    ResponseEntity<PostEntity> updatePost(Long postId, PostEntity post);

    ResponseEntity<PostEntity> findPost(Long postId);

    ResponseEntity<PostEntity> createPost(PostEntity post);

    ResponseEntity<PostEntity> findByUserId(Long userId);

    ResponseEntity<List<PostEntity>> findAllPostsBefore(String date);

    ResponseEntity<List<PostEntity>> findBySkillAndLevel(QueryDTO query);

}
