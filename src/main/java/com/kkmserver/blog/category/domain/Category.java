package com.kkmserver.blog.category.domain;

import com.kkmserver.blog.common.domain.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "categories")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Category extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 계층 구조는 프론트에서 처리하므로 단순 parentId
    private Long parentId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(length = 1000)
    private String description;

    @Builder.Default
    private boolean isActive = true;

    @Builder.Default
    private int position = 0;

    public void update(Long parentId, String title, String slug, String description, boolean isActive, int position) {
        this.parentId = parentId;
        this.title = title;
        this.slug = slug;
        this.description = description;
        this.isActive = isActive;
        this.position = position;
    }
}
