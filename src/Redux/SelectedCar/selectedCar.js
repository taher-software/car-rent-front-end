const SELECT = 'CAR-RENT/SELECTED-CAR/SELECT';
export const selectCar = (payload) => ({
  type: SELECT,
  payload,
});
const populateCar = (car) => localStorage.setItem('current_car', JSON.stringify(car));
const fetchCarStorage = () => JSON.parse(localStorage.getItem('current_car'));
let initialCar = fetchCarStorage();
if (!initialCar) {
  initialCar = {};
}

export const selectCarReducer = (state = initialCar, action) => {
  switch (action.type) {
    case SELECT:
      populateCar(action.payload);
      return action.payload;
    default:
      return state;
  }
};
