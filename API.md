##################################################
# Category
##################################################
# [공통] 카테고리 목록 조회
http GET http://localhost:8080/categories 

# [공통] 카테고리별 아티클 조회
http GET http://localhost:8080/categories/1/articles

# [관리자] 카테고리 목록 조회
http GET http://localhost:8080/admin/categories 

# [관리자] 카테고리 생성
http POST :8080/admin/categories \
    title="Test" \
    slug="test" \
    description="test category" \
    isActive:=true \
    position:=99

# [관리자] 카테고리 수정
http PUT http://localhost:8080/admin/categories/{categoryId} \
    title="(update)Test" \
    slug="(update)test" \
    description="(update)test category" \
    isActive:=false \
    position:=98

# [관리자] 카테고리 삭제
http DELETE http://localhost:8080/admin/categories/{categoryId}
