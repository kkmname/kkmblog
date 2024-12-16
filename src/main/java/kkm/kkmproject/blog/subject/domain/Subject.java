package kkm.kkmproject.blog.subject.domain;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "subject")  // optional, specify table name if different from the class name
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Automatically generate ID (you can change strategy if needed)
    private Long id;

    private Long parentId;

    private String title;

    private String description;

    @Column(name = "is_visible")  // optional, for custom column names
    private boolean isVisible;

    @Column(name = "is_authed")
    private boolean isAuthed;

    private int priority;

    @Column(name = "created_time")
    private LocalDateTime createdTime;

    @Column(name = "updated_time")
    private LocalDateTime updatedTime;

    @Column(name = "deleted_time")
    private LocalDateTime deletedTime;
}