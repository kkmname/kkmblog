package kkm.kkmproject.blog.subject.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kkm.kkmproject.blog.article.domain.dto.ArticleResponse;
import kkm.kkmproject.blog.article.repository.ArticleRepository;
import kkm.kkmproject.blog.subject.domain.Subject;
import kkm.kkmproject.blog.subject.domain.dto.SubjectResponse;
import kkm.kkmproject.blog.subject.repository.SubjectRepository;

@Service
public class SubjectService {
    @Autowired
    SubjectRepository subjectRepository;

    @Autowired
    ArticleRepository articleRepository;

    public Subject getSubjectById(Long subjectId) {
        return subjectRepository.findById(subjectId).get();
    }

    public List<SubjectResponse> getSubjectResponseList() {
        return subjectRepository.findByIsAuthedFalseAndIsVisibleTrue().stream()
                                                                      .map(subject -> new SubjectResponse(subject))
                                                                      .toList();
    }

    public List<ArticleResponse> getArticleResponseList(Long subjectId) {
        return articleRepository.findBySubjectIdAndIsAuthedFalseAndIsVisibleTrueOrderByCreatedTimeDesc(subjectId).stream()
                                                                                                                .map(article -> new ArticleResponse(article))
                                                                                                                .toList();
    }
}
