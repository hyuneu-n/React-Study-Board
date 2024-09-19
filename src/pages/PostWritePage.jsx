import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import TextInput from "../components/TextInput";
import Button from "../ui/Button";
import { createPost, updatePost } from "../data/api"; // API 함수 import

function PostWritePage() {
  const navigate = useNavigate();
  const { category: initialCategory } = useParams();
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(initialCategory || "thread");
  const [isEditing, setIsEditing] = useState(false);
  const [postId, setPostId] = useState(null);

  // 기존에 작성된 글을 수정하는 경우, 해당 글의 정보를 불러옴
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const editPostId = queryParams.get("edit");

    if (editPostId) {
      const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
      const postToEdit = savedPosts.find((post) => post.id === Number(editPostId));

      if (postToEdit) {
        setTitle(postToEdit.title);
        setContent(postToEdit.content);
        setCategory(postToEdit.category);
        setPostId(postToEdit.id);
        setIsEditing(true);
      }
    }
  }, [location.search]);

  const savePost = async () => {
    const currentDate = new Date().toLocaleDateString();

    try {
      if (isEditing) {
        // 수정 시
        const updatedPost = {
          id: postId,
          title,
          content,
          category,
          date: currentDate,
        };
        await updatePost(postId, updatedPost); // API 호출로 수정
      } else {
        // 새 글 작성 시
        const newPost = {
          title,
          content,
          category,
          date: currentDate,
        };
        await createPost(newPost); // API 호출로 작성
      }
      // 저장 또는 수정 후 해당 카테고리 목록 페이지로 리다이렉트
      navigate(`/${category}`);
    } catch (error) {
      console.error("게시글 저장 실패:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <label htmlFor="categorySelect" className="form-label">게시판 선택</label>
        <select
          id="categorySelect"
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={isEditing}
        >
          <option value="thread">Thread</option>
          <option value="qna">QnA</option>
        </select>
      </div>
      <TextInput
        height={20}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <TextInput
        height={480}
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
      <Button title={isEditing ? "글 수정하기" : "글 작성하기"} onClick={savePost} />
    </div>
  );
}

export default PostWritePage;
