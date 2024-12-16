package kkm.kkmproject.blog.article.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import kkm.kkmproject.blog.subject.service.SubjectService;



@Controller
@RequestMapping("/authed/write/article")
public class ArticleAuthedViewController {
    
    @Autowired
    private SubjectService subjectService;

    @GetMapping
    public String viewWriteArticles() {
        return "authed/article";
    }
}
