package com.omar.controller;

import com.omar.entity.PostEntity;
import com.omar.dto.QueryDTO;
import com.omar.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    @PostMapping("/all")
    public ResponseEntity<List<PostEntity>> getAllPostsBefore(@RequestBody String date) {
        return postService.findAllPostsBefore(date);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PostEntity>> getPostsByUserId(@PathVariable("userId") Long userId) {
        return postService.findByUserId(userId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostEntity> getPostByPostId(@PathVariable("id") Long id) {
        return postService.findPost(id);
    }

    @PostMapping("/create")
    public ResponseEntity<PostEntity> createPost(@RequestBody PostEntity post) {
        return postService.createPost(post);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<PostEntity> updatePost(@PathVariable("id") Long id, @RequestBody PostEntity post) {
        return postService.updatePost(id, post);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Long> deletePost(@PathVariable("id") Long id) {
        return postService.deletePost(id);
    }

    @PostMapping("/query")
    public ResponseEntity<List<PostEntity>> getPostsByQuery(@RequestBody QueryDTO query) {
        return postService.findBySkillAndLevel(query);
    }

}
