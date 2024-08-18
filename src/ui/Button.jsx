import PropTypes from "prop-types";

function Button({ title, onClick, variant }) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-${variant} my-2`}
    >
      {title || "button"}
    </button>
  );
}

Button.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.string,
};

Button.defaultProps = {
  variant: "primary",
};

export default Button;
