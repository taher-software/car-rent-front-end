import { loadCars, failCars } from '../actions/actions';

const fetchCars = () => fetch('http://127.0.0.1:3002/api/cars');

const fetchAllCars = () => (dispatch) => {
    fetchCars()
        .then((result) => result.json())
        .then((res) => dispatch(loadCars(res)))
        .catch((error) => dispatch(failCars(error.message)));
};
export default fetchAllCars;

// export const createReservation = async (datareserve) => {
//   const {
//     url,
//     brand,
//     modelYear,
//     model,
//     description,
//     rentFee,
//   } = datareserve;

//   const reservation = {
//     url,
//     brand,
//     model_year: modelYear,
//     model,
//     description,
//     rent_fee: rentFee,
//   };

//   const resp = await fetch('http://[::1]:3000/api/cars', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       reservation,
//     }),
//   });
//   const data = await resp.text();
//   return data;
// };