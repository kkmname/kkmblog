package kkm.kkmproject.blog.article.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import kkm.kkmproject.blog.article.domain.Article;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    public List<Article> findBySubjectIdAndIsAuthedFalseAndIsVisibleTrueOrderByCreatedTimeDesc(Long subjectId);
}
