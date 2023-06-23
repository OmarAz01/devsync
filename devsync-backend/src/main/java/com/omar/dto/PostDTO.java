package com.omar.dto;

import com.omar.entity.PostEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostDTO {
    private Long postId;
    private String content;
    private Long userId;
    private String skillNeeded;
    private String levelNeeded;
    private String dateCreated;

    public static PostDTO convertToDTO(PostEntity post) {
        return new PostDTO(
                post.getPostId(),
                post.getContent(),
                post.getUser().getUserId(),
                post.getSkillNeeded(),
                post.getLevelNeeded(),
                post.getDateCreated()
        );
    }
}
