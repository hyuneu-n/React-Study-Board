import PropTypes from "prop-types";

function TextInput({ height, value, onChange }) {
  return (
    <textarea
      style={{ height: `${height}px` }}
      className="form-control mb-3"
      value={value}
      onChange={onChange}
    />
  );
}

TextInput.propTypes = {
  height: PropTypes.number,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextInput;
