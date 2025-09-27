package com.kkmserver.blog.category.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kkmserver.blog.article.domain.Article;
import com.kkmserver.blog.article.service.ArticleService;
import com.kkmserver.blog.category.domain.Category;
import com.kkmserver.blog.category.payload.CategoryResponse;
import com.kkmserver.blog.category.service.CategoryService;

import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/categories")
public class CategoryController {

    private final CategoryService categoryService;
    private final ArticleService articleService;
    
    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getCategories() {
        return ResponseEntity.status(HttpStatus.OK).body(categoryService.getCategoriesByIsActive());
    }
    
    @GetMapping("/{id}/articles")
    public ResponseEntity<List<Article>> getArticles(@PathVariable("id") Long id) {
        Category category = categoryService.getCategoryById(id);
        List<Article> articles = articleService.getArticlesByCategory(category);
        return ResponseEntity.status(HttpStatus.OK).body(articles);
    }
}
