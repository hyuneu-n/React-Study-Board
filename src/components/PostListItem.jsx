import PropTypes from "prop-types";

function PostListItem({ post, onClick, onDelete }) {
  return (
    <div className="card mb-3" onClick={onClick} style={{ cursor: "pointer" }}>
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <button
          className="btn btn-danger mt-3"
          onClick={(e) => {
            e.stopPropagation(); // 클릭 이벤트가 부모로 전파되는 것을 막음
            onDelete(post.id);
          }}
        >
          삭제하기
        </button>
      </div>
    </div>
  );
}

PostListItem.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PostListItem;
