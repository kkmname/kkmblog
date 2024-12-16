package kkm.kkmproject.blog.article.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kkm.kkmproject.blog.article.domain.Article;
import kkm.kkmproject.blog.article.domain.dto.ArticleResponse;
import kkm.kkmproject.blog.article.domain.dto.ArticleSaveRequest;
import kkm.kkmproject.blog.article.repository.ArticleRepository;

@Service
public class ArticleService {
    @Autowired
    ArticleRepository articleRepository;

    public ArticleResponse saveArticle(ArticleSaveRequest articleSaveRequest) {
        Article article = articleSaveRequest.toArticle();
        articleRepository.save(article);
        return new ArticleResponse(article);
    }

    public ArticleResponse getArticleByArticleId(Long articleId) {
        return new ArticleResponse(articleRepository.findById(articleId).get());
    }
}
