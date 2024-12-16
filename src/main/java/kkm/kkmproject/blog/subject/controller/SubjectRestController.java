package kkm.kkmproject.blog.subject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kkm.kkmproject.blog.article.domain.dto.ArticleResponse;
import kkm.kkmproject.blog.subject.domain.dto.SubjectResponse;
import kkm.kkmproject.blog.subject.service.SubjectService;

@RestController
@RequestMapping("/public/subject")
public class SubjectRestController {

    @Autowired
    SubjectService subjectService;

    @GetMapping
    public List<SubjectResponse> getSubjectList() {
        return subjectService.getSubjectResponseList();
    }

    @GetMapping("/{subjectId}")
    public List<ArticleResponse> getArticleList(@PathVariable(name = "subjectId") Long subjectId, Model model) {
        return subjectService.getArticleResponseList(subjectId);
    }
}
