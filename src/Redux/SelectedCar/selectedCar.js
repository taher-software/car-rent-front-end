const SELECT = "CAR-RENT/SELECTED-CAR/SELECT";
export const selectCar = (payload) => ({
  type: SELECT,
  payload,
});
export const selectCarReducer = (state = {}, action) => {
  switch (action.type) {
    case SELECT:
      return action.payload;
    default:
      return state;
  }
};
