package com.omar.controller;

import com.omar.entity.PostEntity;
import com.omar.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    @GetMapping("/all")
    public Optional<List<PostEntity>> getAllPosts() {
       return postService.findAllPosts();
    }

    @GetMapping("/skill/{skill}")
    public Optional<List<PostEntity>> getPostsBySkillNeeded(@PathVariable("skill") String skill ) {
        return postService.findBySkill(skill);
    }

    @GetMapping("/level/{level}")
    public Optional<List<PostEntity>> getPostsByLevelNeeded(@PathVariable("level") String level ) {
        return postService.findByLevel(level);
    }

    @GetMapping("/skill/{skill}/level/{level}")
    public Optional<List<PostEntity>> getPostsBySkillAndLevelNeeded(@PathVariable("skill") String skill, @PathVariable("level") String level ) {
        return postService.findBySkillAndLevel(skill, level);
    }

    @GetMapping("/user/{userId}")
    public Optional<PostEntity> getPostByUserId(@PathVariable("userId") Long userId) {
        return postService.findByUserId(userId);
    }

    @GetMapping("/{id}")
    public Optional<PostEntity> getPost(@PathVariable("id") Long id) {
        return postService.findPost(id);
    }

    @PostMapping("/create")
    public PostEntity createPost(@RequestBody PostEntity post) {
        return postService.createPost(post);
    }

    @PutMapping("/update/{id}")
    public PostEntity updatePost(@PathVariable("id") Long id, @RequestBody PostEntity post) {
        return postService.updatePost(id, post);
    }

    @DeleteMapping("/delete/{id}")
    public void deletePost(@PathVariable("id") Long id) {
        postService.deletePost(id);
    }


}
