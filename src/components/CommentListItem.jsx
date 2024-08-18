import PropTypes from "prop-types";

function CommentListItem({ comment }) {
  return (
    <div className="border p-3 mb-2 rounded">
      <p className="mb-0">{comment.content}</p>
    </div>
  );
}

CommentListItem.propTypes = {
  comment: PropTypes.shape({
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommentListItem;
