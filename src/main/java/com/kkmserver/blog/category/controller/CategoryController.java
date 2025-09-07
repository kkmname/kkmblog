package com.kkmserver.blog.category.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kkmserver.blog.category.domain.Category;
import com.kkmserver.blog.category.payload.CategoryResponse;
import com.kkmserver.blog.category.service.CategoryService;

import lombok.AllArgsConstructor;


@AllArgsConstructor
@RestController
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryService categoryService;
    
    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getCategories() {
        return ResponseEntity.status(HttpStatus.OK).body(categoryService.getCategoriesByIsActive());
    }
    
    // 카테고리의 아티클 목록 조회
    @GetMapping("/{id}/articles")
    public ResponseEntity<Category> getArticles(@PathVariable("id") Long id) {
        // TODO: ArticleService
        return null;
    }
}
