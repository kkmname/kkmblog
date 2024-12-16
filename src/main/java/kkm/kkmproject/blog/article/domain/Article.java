package kkm.kkmproject.blog.article.domain;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "article")  
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Automatically generate ID (you can change strategy if needed)
    private Long id;

    @Column(name = "subject_id")
    private Long subjectId;

    private String title;

    private String content;

    @Column(name = "is_visible")  // optional, for custom column names
    private boolean isVisible;

    @Column(name = "is_authed")
    private boolean isAuthed;

    @Column(name = "created_time")
    private LocalDateTime createdTime;

    @Column(name = "updated_time")
    private LocalDateTime updatedTime;

    @Column(name = "deleted_time")
    private LocalDateTime deletedTime;
}
