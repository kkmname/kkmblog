package com.kkmserver.blog.category.payload;

import java.time.LocalDateTime;

import com.kkmserver.blog.category.domain.Category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class CategoryResponse {
    private Long id;
    private Long parentId;
    private String title;
    private String slug;
    private String description;
    private boolean isActive;
    private int position;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
    private LocalDateTime deletedDate;

    public static CategoryResponse from(Category category) {
        return CategoryResponse.builder()
                               .id(category.getId())
                               .parentId(category.getParentId())
                               .title(category.getTitle())
                               .slug(category.getSlug())
                               .description(category.getDescription())
                               .createdDate(category.getCreatedDate())
                               .updatedDate(category.getUpdatedDate())
                               .deletedDate(category.getDeletedDate())
                               .build();
    }
}
