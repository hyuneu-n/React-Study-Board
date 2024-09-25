import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../data/api"; // 특정 게시글 조회 API 호출 함수

function PostViewPage() {
  const { category, postId } = useParams();  // 카테고리와 게시글 ID 가져오기
  const [post, setPost] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await fetchPostById(category, postId);  // 카테고리와 ID로 게시글 불러오기
        setPost(data);
      } catch (error) {
        console.error('게시글 조회 오류:', error);
      }
    };

    loadPost();
  }, [category, postId]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <p>작성자: {post.author}</p>
      <p>작성일: {post.createdAt}</p>
    </div>
  );
}

export default PostViewPage;
