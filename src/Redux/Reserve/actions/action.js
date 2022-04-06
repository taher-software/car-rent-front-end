export const GET_RESERVE_DATA = 'ALL-RESERVE/RESERVE/GET';
export const FAIL_RESERVE_DATA = 'ALL-RESERVE/RESERVE/FAIL';

export const allReserve = (payload) => ({
  type: GET_RESERVE_DATA,
  payload,
});

export const failReserve = (payload) => ({
  type: FAIL_RESERVE_DATA,
  payload,
});
