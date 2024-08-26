import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import TextInput from "../components/TextInput";
import Button from "../ui/Button";

function PostWritePage() {
  const navigate = useNavigate();
  const { category: initialCategory } = useParams(); 
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(initialCategory || "thread"); 
  const [isEditing, setIsEditing] = useState(false);
  const [postId, setPostId] = useState(null);

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

  const savePost = () => {
    const currentDate = new Date().toLocaleDateString();
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const user = JSON.parse(localStorage.getItem("user")); // 사용자 정보 가져오기

    if (isEditing) {
      const updatedPosts = savedPosts.map((post) =>
        post.id === postId
          ? { ...post, title, content, category, date: currentDate }
          : post
      );
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
    } else {
      const newPost = { 
        id: Date.now(), 
        title, 
        content, 
        category, 
        date: currentDate, 
        author: user.email,
        comments: [] 
      };
      savedPosts.push(newPost);
      localStorage.setItem("posts", JSON.stringify(savedPosts));
    }

    navigate(`/${category}`); 
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
          disabled={isEditing} // 수정 모드일 때 게시판 선택 비활성화
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
