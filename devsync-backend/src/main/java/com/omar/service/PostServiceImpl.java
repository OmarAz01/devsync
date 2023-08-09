package com.omar.service;

import com.omar.dto.PostDTO;
import com.omar.entity.PostEntity;
import com.omar.dto.QueryDTO;
import com.omar.entity.UserEntity;
import com.omar.repo.PostRepo;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
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
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(id);
        }
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        if (principal instanceof UserEntity) {
            if (!((UserEntity) principal).getUserId().equals(post.get().getUser().getUserId()) &&
                    !((UserEntity) principal).getRole().toString().equals("ADMIN")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        try {
            postRepo.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body(id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }


    }

    @Override
    public ResponseEntity<PostDTO> updatePost(Long id, PostDTO post) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        if (principal instanceof UserEntity) {
            if (!((UserEntity) principal).getUserId().equals(post.getUserId())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        Optional<PostEntity> existingPost = postRepo.findById(id);
        if (existingPost.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        existingPost.get().setContent(post.getContent());
        try {
            return ResponseEntity.status(HttpStatus.OK).body(PostDTO.convertToDTO(postRepo.save(existingPost.get())));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

    @Override
    public ResponseEntity<PostDTO> findPost(Long id) {
        Optional<PostEntity> post = postRepo.findById(id);
        if (post.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        PostDTO postDTO = PostDTO.convertToDTO(post.get());
        return ResponseEntity.status(HttpStatus.OK).body(postDTO);
    }

    @Override
    public ResponseEntity<PostDTO> createPost(PostEntity post) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        if (principal instanceof UserEntity) {
            post.setUser((UserEntity) principal);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        try {
            PostEntity newPost = postRepo.save(post);
            PostDTO postDTO = PostDTO.convertToDTO(newPost);
            return ResponseEntity.status(HttpStatus.CREATED).body(postDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @Override
    public ResponseEntity<List<PostDTO>> findByUserId(Long userId, String date) {
        List<PostDTO> postsDTO = new ArrayList<>();
        String newDate = date.replace("%20", " ");
        String decodedDateTime;
        try {
            decodedDateTime = URLDecoder.decode(newDate, StandardCharsets.UTF_8.toString());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        try {
            Optional<List<PostEntity>> posts = postRepo.findByUserId(userId, decodedDateTime.substring(0, 19));
            if (posts.isEmpty() || posts.get().isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            for (PostEntity post : posts.get()) {
                postsDTO.add(PostDTO.convertToDTO(post));
            }
            return ResponseEntity.status(HttpStatus.OK).body(postsDTO);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @Override
    public ResponseEntity<List<PostDTO>> findAllPostsBefore(String date) {
        List<PostDTO> postsDTO = new ArrayList<>();
        String newDate = date.replace("%20", " ");
        System.out.println(newDate);
        String decodedDateTime;
        try {
            decodedDateTime = URLDecoder.decode(newDate, StandardCharsets.UTF_8.toString());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        try {
            Optional<List<PostEntity>> posts = postRepo.findAllPostsBefore(decodedDateTime.substring(0, 19));
            if (posts.get().isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            for (PostEntity post : posts.get()) {
                postsDTO.add(PostDTO.convertToDTO(post));
            }
            return ResponseEntity.status(HttpStatus.OK).body(postsDTO);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @Override
    public ResponseEntity<List<PostDTO>> findBySkillAndLevel(String level, String skill, String date) {
        List<PostDTO> postsDTO = new ArrayList<>();
        String newDate = date.replace("%20", " ");
        String newSkill = skill.replace("%20", " ");
        String newLevel = level.replace("%20", " ");
        String decodedDateTime;
        if (newSkill.equals("null")) {
            newSkill = "";
        }
        if (newLevel.equals("null")) {
            newLevel = "";
        }
        try {
            decodedDateTime = URLDecoder.decode(newDate, StandardCharsets.UTF_8.toString());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        try {
            Optional<List<PostEntity>> posts = postRepo.findBySkillAndLevel(newSkill, newLevel, decodedDateTime.substring(0, 19));
            if (posts.get().isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            for (PostEntity post : posts.get()) {
                postsDTO.add(PostDTO.convertToDTO(post));
            }
            return ResponseEntity.status(HttpStatus.OK).body(postsDTO);
        } catch (Exception e) {
            throw new RuntimeException("Error occurred while retrieving posts by skill and level", e);
        }
    }
}
