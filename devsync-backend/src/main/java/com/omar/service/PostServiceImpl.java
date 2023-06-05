package com.omar.service;

import com.omar.entity.PostEntity;
import com.omar.repo.PostRepo;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PostServiceImpl implements PostService{

    private final PostRepo postRepo;


    @Override
    public void deletePost(Long id) {
        PostEntity post = postRepo.findById(id).orElseThrow();
        postRepo.deleteById(id);
    }

    @Override
    public PostEntity updatePost(Long id, PostEntity post) {
        PostEntity existingPost = postRepo.findById(id).orElseThrow();
        existingPost.setContent(post.getContent());
        existingPost.setSkillNeeded(post.getSkillNeeded());
        existingPost.setLevelNeeded(post.getLevelNeeded());
        existingPost.setDateCreated(post.getDateCreated());
        return postRepo.save(existingPost);
    }

    @Override
    public Optional<PostEntity> findPost(Long id) {
        return postRepo.findById(id);
    }

    @Override
    public PostEntity createPost(PostEntity post) {
        return postRepo.save(post);
    }

    @Override
    public Optional<PostEntity> findByUserId(Long userId) {
        Optional<PostEntity> post = postRepo.findByUserId(userId);
        return post;
    }

    @Override
    public Optional<List<PostEntity>> findAllPosts() {
        Optional<List<PostEntity>> posts = postRepo.findAllPosts();
        return posts;
    }

    @Override
    public Optional<List<PostEntity>> findBySkill(String skillNeeded) {
        Optional<List<PostEntity>> posts = postRepo.findBySkill(skillNeeded);
        return posts;
    }

    @Override
    public Optional<List<PostEntity>> findByLevel(String levelNeeded) {
        Optional<List<PostEntity>> posts = postRepo.findByLevel(levelNeeded);
        return posts;
    }

    @Override
    public Optional<List<PostEntity>> findBySkillAndLevel(String skillNeeded, String levelNeeded) {
        Optional<List<PostEntity>> posts = postRepo.findBySkillAndLevel(skillNeeded, levelNeeded);
        return posts;
    }

}
