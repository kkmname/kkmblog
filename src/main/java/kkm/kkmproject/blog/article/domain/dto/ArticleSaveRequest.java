package kkm.kkmproject.blog.article.domain.dto;

import java.time.LocalDateTime;

import kkm.kkmproject.blog.article.domain.Article;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ArticleSaveRequest {
    private String title;
    private long subjectId;
    private String content;
    private boolean isVisible;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deletedAt;

    public Article toArticle() {
        return Article.builder()
                      .title(this.title)
                      .subjectId(this.subjectId)
                      .content(this.content)
                      .isVisible(this.isVisible)
                      .createdTime(LocalDateTime.now())
                      .build();
    }
}
