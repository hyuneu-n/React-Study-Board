import { useState } from "react";
import PropTypes from "prop-types";
import CommentListItem from "./CommentListItem";

function CommentList({ comments, onDelete }) {  // onDelete prop 추가
    const [currentPage, setCurrentPage] = useState(1);
    const [commentsPerPage] = useState(3);

    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

    const totalPages = Math.ceil(comments.length / commentsPerPage);

    return (
        <div className="container mt-4">
            {currentComments.map((comment) => (
                <CommentListItem key={comment.id} comment={comment} onDelete={onDelete} />
            ))}
            <div className="d-flex justify-content-center mt-4">
                <button
                    className="btn btn-secondary mx-2"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    className="btn btn-secondary mx-2"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

CommentList.propTypes = {
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            content: PropTypes.string.isRequired,
        })
    ).isRequired,
    onDelete: PropTypes.func.isRequired,  // onDelete prop validation 추가
};

export default CommentList;
