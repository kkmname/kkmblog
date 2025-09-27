package com.kkmserver.blog.article.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kkmserver.blog.article.domain.Article;
import com.kkmserver.blog.article.repository.ArticleRepository;
import com.kkmserver.blog.category.domain.Category;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ArticleService {
    
    private final ArticleRepository articleRepository;

    public List<Article> getArticlesByCategory(Category category) {
        return articleRepository.findByCategory(category);
    }
}
