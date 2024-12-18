package kkm.kkmproject.blog.subject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import kkm.kkmproject.blog.article.domain.dto.ArticleResponse;
import kkm.kkmproject.blog.article.service.ArticleService;
import kkm.kkmproject.blog.subject.domain.Subject;
import kkm.kkmproject.blog.subject.service.SubjectService;

@Controller
@RequestMapping("/public/view/subject")
public class SubjectViewController {

    @Autowired
    SubjectService subjectService;

    @Autowired
    ArticleService articleService;

    @GetMapping("/{subjectId}")
    public String getArticleList(@PathVariable(name = "subjectId") Long subjectId, Model model) {
        Subject subject = subjectService.getSubjectById(subjectId);
        model.addAttribute("subject", subject);

        List<ArticleResponse> articleList = subjectService.getArticleResponseList(subjectId);
        model.addAttribute("articleList", articleList);

        return "subject";
    }
}
