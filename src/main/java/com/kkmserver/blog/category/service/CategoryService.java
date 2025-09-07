package com.kkmserver.blog.category.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kkmserver.blog.category.domain.Category;
import com.kkmserver.blog.category.payload.CategoryRequest;
import com.kkmserver.blog.category.payload.CategoryResponse;
import com.kkmserver.blog.category.repository.CategoryRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CategoryService {
    
    private final CategoryRepository categoryRepository;
    
    public List<CategoryResponse> getCategoriesByIsActive() {
        List<Category> categories = categoryRepository.findByIsActiveAndDeletedDateIsNull(true);
        return categories.stream().map(category -> CategoryResponse.from(category)).toList();
    }

    public List<CategoryResponse> getCategories() {
        List<Category> categories = categoryRepository.findByDeletedDateIsNull();
        return categories.stream().map(category -> CategoryResponse.from(category)).toList();
    }

    public CategoryResponse createCategory(CategoryRequest categoryRequest) {
        Category category = Category.builder()
                                    .parentId(categoryRequest.getParentId())
                                    .title(categoryRequest.getTitle())
                                    .slug(categoryRequest.getSlug())
                                    .description(categoryRequest.getDescription())
                                    .isActive(categoryRequest.isActive())
                                    .position(categoryRequest.getPosition())
                                    .build();
        category = categoryRepository.save(category);
        
        return CategoryResponse.from(category);
    }

    public CategoryResponse updateCategory(Long id, CategoryRequest categoryRequest) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Category not found with id: " + id));
        category.update(
            categoryRequest.getParentId(),
            categoryRequest.getTitle(),
            categoryRequest.getSlug(),
            categoryRequest.getDescription(),
            categoryRequest.isActive(),
            categoryRequest.getPosition()
        );
        category = categoryRepository.save(category);

        return CategoryResponse.from(category);
    }

    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Category not found with id: " + id));
        categoryRepository.delete(category);
    }
}
