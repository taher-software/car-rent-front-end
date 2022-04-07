export const GET_USERNAME_DATA = 'CAR-RENT/USERNAME/GET';
export const FAIL_USERNAME_DATA = 'CAR-RENT/USERNAME/FAIL';

export const loadUsername = (payload) => ({
  type: GET_USERNAME_DATA,
  payload,
});

export const failUsername = (payload) => ({
  type: FAIL_USERNAME_DATA,
  payload,
});
