package kkm.kkmproject.blog.article.domain.dto;

import java.time.format.DateTimeFormatter;

import org.commonmark.parser.Parser;
import org.commonmark.renderer.html.HtmlRenderer;

import groovy.transform.builder.Builder;
import kkm.kkmproject.blog.article.domain.Article;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ArticleResponse {
    private Long id;
    private Long subjectId;
    private String title;
    private String content;
    private boolean isVisible;
    private boolean isAuthed;
    private String createdTime;
    private String updatedTime;
    private String deletedTime;

    public ArticleResponse(Article article) {
        DateTimeFormatter ddMMmmmmFormat = DateTimeFormatter.ofPattern("dd-MM-MMMM");
        
        Parser parser = Parser.builder().build();
        HtmlRenderer renderer = HtmlRenderer.builder().build();

        this.id = article.getId();
        this.subjectId = article.getSubjectId();
        this.title = article.getTitle();
        this.content = renderer.render(parser.parse(article.getContent()));
        this.isVisible = article.isVisible();
        this.isAuthed = article.isAuthed();
        this.createdTime = article.getCreatedTime().format(ddMMmmmmFormat);
        this.updatedTime = article.getUpdatedTime() != null ? article.getUpdatedTime().format(ddMMmmmmFormat) : "";
        this.deletedTime = article.getDeletedTime() != null ? article.getDeletedTime().format(ddMMmmmmFormat) : "";
    }
}
