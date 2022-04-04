export const GET_CARS_DATA = "CAR-RENT/CARS/GET";
export const FAIL_CARS_DATA = "CAR-RENT/CARS/FAIL";

export const loadCars = (payload) => ({
  type: GET_CARS_DATA,
  payload,
});

export const failCars = (payload) => ({
  type: FAIL_CARS_DATA,
  payload,
});
