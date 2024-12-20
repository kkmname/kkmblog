package kkm.kkmproject.blog.article.controller.secure;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;



@Controller
@RequestMapping("/view/secure/write/article")
public class SecureArticleViewController {
    
    @GetMapping
    public String viewWriteArticles() {
        return "authed/article";
    }
}
