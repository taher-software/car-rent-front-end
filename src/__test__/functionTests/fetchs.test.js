import { fetchUser } from '../../Redux/Username/thunk/thunk';
import { fetchCars } from '../../Redux/cars/fetch/fetchcars';
import { fetchLikes } from '../../Redux/Likes/Thunk/thunk';
import { getReserveUrl } from '../../Redux/Reserve/thunk/Fetch_reserve';

describe('fetch users data ', () => {
  test('get the correct data', async () => {
    const resp = await fetchUser();
    const result = await resp.json();
    expect(result).toBeInstanceOf(Object);
    expect(result.users).toBeInstanceOf(Array);
  });
});

describe('fetch cars data', () => {
  test('get the correct data', async () => {
    const resp = await fetchCars();
    const result = await resp.json();
    expect(result).toBeInstanceOf(Object);
    expect(result.cars).toBeInstanceOf(Array);
  });
});

describe('fetch likes data', () => {
  test('get the correct data', async () => {
    const resp = await fetchLikes();
    const result = await resp.json();
    expect(result).toBeInstanceOf(Object);
    expect(result.likes).toBeInstanceOf(Array);
  });
});

describe('fetch reservations data', () => {
  test('get the correct data', async () => {
    const resp = await getReserveUrl();
    const result = await resp.json();
    expect(result).toBeInstanceOf(Object);
    expect(result.reserves).toBeInstanceOf(Array);
  });
});
