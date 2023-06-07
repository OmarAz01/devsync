package com.omar.service;

import com.omar.entity.PostEntity;
import com.omar.entity.QueryDTO;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface PostService {

    void deletePost(Long postId);

    PostEntity updatePost(Long postId, PostEntity post);

    Optional<PostEntity> findPost(Long postId);

    PostEntity createPost(PostEntity post);

    Optional<PostEntity> findByUserId(Long userId);
    Optional<List<PostEntity>> findAllPosts();

    Optional<List<PostEntity>> findBySkillAndLevel(QueryDTO query);

}
