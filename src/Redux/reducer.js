const initialState = {
  navigationPath: '',
};

const navigationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NAVIGATION_PATH':
      return {
        ...state,
        navigationPath: action.payload,
      };
    default:
      return state;
  }
};

export default navigationReducer;

