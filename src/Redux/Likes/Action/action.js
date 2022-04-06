export const GET_LIKES_DATA = 'CAR-RENT/LIKES/GET';
export const START_LIKES_DATA = 'CAR-RENT/LIKES/START';
export const FAILURE_LIKES_DATA = 'CAR-RENT/LIKES/FAILURE';

export const getLIkes = (payload) => ({
  type: GET_LIKES_DATA,
  payload,
});

export const failGetLikes = (payload) => ({
  type: FAILURE_LIKES_DATA,
  payload,
});
export const startGetLIkes = () => ({
  type: START_LIKES_DATA,
});
