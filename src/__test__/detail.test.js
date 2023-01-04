import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Detail from '../components/cars/detail';

const mockStore = configureStore([]);

describe('render correctly Splash component', () => {
  let store;
  let tree;
  beforeEach(() => {
    store = mockStore({
      Users: {},
      session: {},
      Cars: {},
      current_user: {},
      current_car: {},
      my_reserves: {},
      likes: {},
    });
    store.dispatch = jest.fn();
    tree = render(
      <Provider store={store}>
        <Router>
          <Detail />
        </Router>
      </Provider>,
    );
  });
  it('should render with given state from redux store', () => {
    expect(tree).toMatchSnapshot();
  });
});
