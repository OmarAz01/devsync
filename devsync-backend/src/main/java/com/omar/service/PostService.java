package com.omar.service;

import com.omar.dto.PostDTO;
import com.omar.entity.PostEntity;
import com.omar.dto.QueryDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PostService {

    ResponseEntity<Long> deletePost(Long postId);

    ResponseEntity<PostDTO> updatePost(Long postId, PostDTO post);

    ResponseEntity<PostDTO> findPost(Long postId);

    ResponseEntity<PostDTO> createPost(PostEntity post);

    ResponseEntity<List<PostDTO>> findByUserId(Long userId, String date);

    ResponseEntity<List<PostDTO>> findAllPostsBefore(String date);

    ResponseEntity<List<PostDTO>> findBySkillAndLevel(QueryDTO query);

}
