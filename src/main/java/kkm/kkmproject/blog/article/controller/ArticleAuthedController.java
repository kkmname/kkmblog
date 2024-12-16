package kkm.kkmproject.blog.article.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kkm.kkmproject.blog.article.domain.Article;
import kkm.kkmproject.blog.article.domain.dto.ArticleResponse;
import kkm.kkmproject.blog.article.domain.dto.ArticleSaveRequest;
import kkm.kkmproject.blog.article.service.ArticleService;
import kkm.kkmproject.blog.subject.service.SubjectService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/authed/article")
public class ArticleAuthedController {

    @Autowired
    SubjectService subjectService;

    @Autowired
    ArticleService articleService;

    @PostMapping
    public ArticleResponse saveArticle(@ModelAttribute ArticleSaveRequest articleSaveRequest, Model model) {
        log.info("articleSaveRequeset: {}", articleSaveRequest.toString());  
        ArticleResponse articleResponse = articleService.saveArticle(articleSaveRequest);
        return articleResponse;
    }
}
