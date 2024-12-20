package kkm.kkmproject.blog.subject.controller.open;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kkm.kkmproject.blog.article.domain.dto.ArticleResponse;
import kkm.kkmproject.blog.article.service.ArticleService;
import kkm.kkmproject.blog.subject.domain.dto.SubjectResponse;
import kkm.kkmproject.blog.subject.service.SubjectService;

@RestController
@RequestMapping("/api/open/subject")
public class OpenSubjectApiController {

    @Autowired
    SubjectService subjectService;

    @Autowired
    ArticleService articleService;

    @GetMapping
    public List<SubjectResponse> getSubjectList() {
        return subjectService.getSubjectResponseList();
    }

    @GetMapping("/{subjectId}")
    public SubjectResponse getSubject(@PathVariable(name = "subjectId") Long subjectId) {
        return subjectService.getSubjectById(subjectId);
    }

    @GetMapping("/{subjectId}/articles")
    public List<ArticleResponse> getArticleList(@PathVariable(name = "subjectId") Long subjectId) {
        return articleService.getArticleResponseListBySuectId(subjectId);
    }
}
