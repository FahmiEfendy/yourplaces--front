import "./Input.css";

const Input = (props) => {
  return (
    <div className="form-control">
      <label htmlFor={props.id}>{props.label}</label>
      {props.type ? (
        <input
          type={props.type}
          id={props.id}
          placeholder={props.placeholder}
        />
      ) : (
        <textarea id={props.id} rows={props.rows || 3} />
      )}
    </div>
  );
};

export default Input;
