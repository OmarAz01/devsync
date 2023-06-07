package com.omar.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "posts")
public class PostEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    private String title;
    @Column(length = 300)
    private String content;
    private Long userId;
    private String skillNeeded;
    private String levelNeeded;
    private String dateCreated;
}
