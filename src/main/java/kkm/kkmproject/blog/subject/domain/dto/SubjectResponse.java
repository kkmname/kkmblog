package kkm.kkmproject.blog.subject.domain.dto;

import java.time.LocalDateTime;

import kkm.kkmproject.blog.subject.domain.Subject;
import lombok.Getter;

@Getter
public class SubjectResponse {
    private Long id;
    private Long parentId;
    private String title;
    private String description;
    private boolean isVisible;
    private boolean isAuthed;
    private int priority;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private LocalDateTime deletedTime;

    public SubjectResponse(Subject subject) {
        this.id = subject.getId();
        this.parentId = subject.getParentId();
        this.title = subject.getTitle();
        this.description = subject.getDescription();
        this.isVisible = subject.isVisible();
        this.isAuthed = subject.isAuthed();
        this.priority = subject.getPriority();
        this.createdTime = subject.getCreatedTime();
        this.updatedTime = subject.getUpdatedTime();
        this.deletedTime = subject.getDeletedTime();
    }
}
