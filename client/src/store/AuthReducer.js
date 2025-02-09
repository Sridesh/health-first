export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.data;

    case "REMOVE_USER":
      return null;

    default:
      return state;
  }
};

export const LoaderReducer = (state, action) => {
  switch (action.type) {
    case "START_LOADING":
      return true;

    case "STOP_LOADING":
      return false;

    default:
      return state;
  }
};
