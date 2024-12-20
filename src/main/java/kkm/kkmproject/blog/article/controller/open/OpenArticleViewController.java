package kkm.kkmproject.blog.article.controller.open;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import kkm.kkmproject.blog.article.domain.dto.ArticleResponse;
import kkm.kkmproject.blog.article.service.ArticleService;
import kkm.kkmproject.blog.subject.service.SubjectService;


@Controller
@RequestMapping("/view/open/article")
public class OpenArticleViewController {
    
    @Autowired
    ArticleService articleService;

    @Autowired
    SubjectService subjectService;

    @GetMapping("{articleId}")
    public String viewArticle(@PathVariable(name="articleId") Long articleId, Model model) {
        ArticleResponse articleResponse = articleService.getArticleByArticleId(articleId);
        model.addAttribute("article", articleResponse);

        return "article";
    }
    
}
