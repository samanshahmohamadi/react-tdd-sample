import {render} from '@testing-library/react';
import {RestaurantList} from '../RestaurantList';

describe('RestaurantList', () => {
  const restaurants = [
    {id: 1, name: 'Sushi Place'},
    {id: 2, name: 'Pizza Place'},
  ];
  let loadRestaurants;
  let context;

  const renderWithProps = (propOverrides = {}) => {
    const props = {
      loadRestaurants: jest.fn().mockName('loadRestaurants'),
      loading: false,
      restaurants,
      ...propOverrides,
    };
    loadRestaurants = props.loadRestaurants;

    context = render(<RestaurantList {...props} />);
  };

  it('displays the loading indicator while loading', () => {
    renderWithProps({loading: true});
    const {queryByTestId} = context;
    expect(queryByTestId('loading-indicator')).not.toBeNull();
  });

  it('loads restaurants on first render', () => {
    renderWithProps();
    expect(loadRestaurants).toHaveBeenCalled();
  });
});

describe('when loading succeeds', () => {
  const restaurants = [
    {id: 1, name: 'Sushi Place'},
    {id: 2, name: 'Pizza Place'},
  ];
  let loadRestaurants;
  let context;

  const renderWithProps = (propOverrides = {}) => {
    const props = {
      loadRestaurants: jest.fn().mockName('loadRestaurants'),
      loading: false,
      restaurants,
      ...propOverrides,
    };
    loadRestaurants = props.loadRestaurants;

    context = render(<RestaurantList {...props} />);
  };

  it('does not display the loading indicator while not loading', () => {
    renderWithProps();
    const {queryByTestId} = context;
    expect(queryByTestId('loading-indicator')).toBeNull();
  });

  it('displays the restaurants', () => {
    renderWithProps();
    const {queryByText} = context;

    expect(queryByText('Sushi Place')).not.toBeNull();
    expect(queryByText('Pizza Place')).not.toBeNull();
  });
});
