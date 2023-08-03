package com.omar.controller;

import com.omar.dto.PostDTO;
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

    @GetMapping("/all/{date}")
    public ResponseEntity<List<PostDTO>> getAllPostsBefore(@PathVariable("date") String date) {
        return postService.findAllPostsBefore(date);
    }

    @GetMapping("/user/{userId}/{date}")
    public ResponseEntity<List<PostDTO>> getPostsByUserId(@PathVariable("userId") Long userId, @PathVariable("date") String date) {
        return postService.findByUserId(userId, date);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDTO> getPostByPostId(@PathVariable("id") Long id) {
        return postService.findPost(id);
    }

    @PostMapping("/create")
    public ResponseEntity<PostDTO> createPost(@RequestBody PostEntity post) {
        return postService.createPost(post);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<PostDTO> updatePost(@PathVariable("id") Long id, @RequestBody PostDTO post) {
        return postService.updatePost(id, post);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Long> deletePost(@PathVariable("id") Long id) {
        return postService.deletePost(id);
    }

    @GetMapping("/query/{level}/{skill}/{date}")
    public ResponseEntity<List<PostDTO>> getPostsByQuery(@PathVariable("level") String level, @PathVariable("skill") String skill, @PathVariable("date") String date) {
        return postService.findBySkillAndLevel(level, skill, date);
    }

}
