export const GET_CARS_DATA = 'CAR-RENT/CARS/GET';
export const FAIL_CARS_DATA = 'CAR-RENT/CARS/FAIL';
// export const CREATE_CARS_DATA = 'CAR-RENT/CARS/CREATE';
// export const CREATE_CARS_FAIL = 'CAR-RENT/CARS/CREATE_FAIL';

export const loadCars = (payload) => ({
  type: GET_CARS_DATA,
  payload,
});

export const failCars = (payload) => ({
  type: FAIL_CARS_DATA,
  payload,
});

// export const createNewCars = (newCar) => (async (dispatch) => {
//   dispatch({
//     type: CREATE_CARS_DATA,
//     payload: newCar,
//   });
// });
