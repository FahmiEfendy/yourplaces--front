import { useReducer } from "react";

import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
  });

  const inputChangeHandler = (event) => {
    dispatch({ type: "CHANGE", val: event.target.value });
  };

  return (
    <div
      className={`form-control ${
        !inputState.isValid && `form-control--invalid`
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {props.type ? (
        <input
          type={props.type}
          id={props.id}
          placeholder={props.placeholder}
          value={inputState.value}
          onChange={inputChangeHandler}
        />
      ) : (
        <textarea
          id={props.id}
          rows={props.rows || 3}
          value={inputState.value}
          onChange={inputChangeHandler}
        />
      )}
      {!inputState.isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
