package com.kkmserver.blog.category.payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryRequest {
    private Long parentId;
    private String title;
    private String slug;
    private String description;
    @Builder.Default
    private boolean isActive = true;
    @Builder.Default
    private int position = 0;
}
