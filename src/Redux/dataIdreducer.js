const initialState = {
    selectedDataId: null,
  };
  
  const DataIdReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_SELECTED_DATA_ID':
        return {
          ...state,
          selectedDataId: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default DataIdReducer;