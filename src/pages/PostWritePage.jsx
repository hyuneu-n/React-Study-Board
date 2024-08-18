import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import TextInput from "../components/TextInput";
import Button from "../ui/Button";

function PostWritePage() {
  const navigate = useNavigate();
  const { category: initialCategory } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(initialCategory || "shopping");

  const savePost = () => {
    const newPost = { id: Date.now(), title, content, category, comments: [] };
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    savedPosts.push(newPost);
    localStorage.setItem("posts", JSON.stringify(savedPosts));
    navigate(`/${category}`);
  };

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="form-select"
        >
          <option value="shopping">쇼핑 게시판</option>
          <option value="free">자유 게시판</option>
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

PostWritePage.propTypes = {
  category: PropTypes.string,
};

export default PostWritePage;
