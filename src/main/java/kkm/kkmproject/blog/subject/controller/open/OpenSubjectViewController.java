package kkm.kkmproject.blog.subject.controller.open;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import kkm.kkmproject.blog.article.service.ArticleService;
import kkm.kkmproject.blog.subject.domain.dto.SubjectResponse;
import kkm.kkmproject.blog.subject.service.SubjectService;

@Controller
@RequestMapping("/view/open/subject")
public class OpenSubjectViewController {

    @Autowired
    SubjectService subjectService;

    @Autowired
    ArticleService articleService;

    @GetMapping("/{subjectId}")
    public String getArticleList(@PathVariable(name = "subjectId") Long subjectId, Model model) {
        SubjectResponse subject = subjectService.getSubjectById(subjectId);
        model.addAttribute("subject", subject);

        return "subject";
    }
}
