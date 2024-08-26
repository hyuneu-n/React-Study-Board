import PropTypes from "prop-types";

function CommentListItem({ comment, onDelete }) {
  return (
    <div className="border p-3 mb-2 rounded d-flex justify-content-between align-items-center">
      <div>
        <p className="mb-0">{comment.content}</p>
        <small className="text-muted">{comment.date}</small>
      </div>
      <button 
        className="btn btn-danger btn-sm"
        onClick={() => onDelete(comment.id)}
      >
        삭제
      </button>
    </div>
  );
}

CommentListItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CommentListItem;