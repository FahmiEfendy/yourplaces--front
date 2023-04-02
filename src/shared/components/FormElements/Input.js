import { useReducer } from "react";

import "./Input.css";
import { validate } from "../../utils/validators";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validator),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
    isTouched: false,
  });

  const inputChangeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validator: props.validators,
    });
  };

  const inputTouchHandler = () => {
    dispatch({
      type: "TOUCH",
      isTouched: true,
    });
  };

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && `form-control--invalid`
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
          onBlur={inputTouchHandler}
        />
      ) : (
        <textarea
          id={props.id}
          rows={props.rows || 3}
          value={inputState.value}
          onChange={inputChangeHandler}
          onBlur={inputTouchHandler}
        />
      )}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
