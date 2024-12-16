package kkm.kkmproject.blog.subject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import kkm.kkmproject.blog.subject.domain.Subject;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
    List<Subject> findByIsAuthedFalseAndIsVisibleTrue();
}
