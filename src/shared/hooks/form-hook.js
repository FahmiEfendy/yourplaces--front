import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let isFormValid = true;
      for (const inputId in state.inputs) {
        if (inputId === state.inputs) {
          isFormValid = isFormValid && action.isValid;
        } else {
          isFormValid = isFormValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: isFormValid,
      };
    default:
      return state;
  }
};

const useForm = (initialInputs, initialFormValidality) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidality,
  });

  const inputChangeHandler = useCallback((id, value, isValid) => {
    dispatch({ type: "INPUT_CHANGE", value, isValid, inputId: id });
  }, []);

  return [formState, inputChangeHandler];
};

export default useForm;
