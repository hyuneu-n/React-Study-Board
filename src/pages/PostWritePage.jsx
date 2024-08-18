import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextInput from "../components/TextInput";
import Button from "../ui/Button";

function PostWritePage() {
  const navigate = useNavigate();
  const { category: initialCategory } = useParams(); 
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(initialCategory || "thread"); 

  const savePost = () => {
    const currentDate = new Date().toLocaleDateString(); // 현재 날짜를 문자열로 포맷
    const newPost = { 
      id: Date.now(), 
      title, 
      content, 
      category, 
      date: currentDate, // 작성일 추가
      comments: [] 
    };
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    savedPosts.push(newPost);
    localStorage.setItem("posts", JSON.stringify(savedPosts));
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
      <Button title="글 작성하기" onClick={savePost} />
    </div>
  );
}

export default PostWritePage;
