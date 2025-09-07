package com.kkmserver.blog.category.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kkmserver.blog.category.domain.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByIsActiveAndDeletedDateIsNull(boolean isActive);
    List<Category> findByDeletedDateIsNull();
    Category findBySlug(String slug);
}
