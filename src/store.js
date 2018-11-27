import { createStore, combineReducers } from 'redux';
import { createSelector } from 'reselect';

const items = (
  state = {
    1: {
      id: '1',
      desc: 'Firefigher cap',
      unit_price: 8.99,
      quantity: 2,
      tax_rate: 0.2,
      thumbnail:
        'https://cdn.shopify.com/s/files/1/1682/7601/products/hatnew_1024x1024.JPG?v=1497943612'
    },
    2: {
      id: '2',
      desc: 'Fire extinguisher',
      unit_price: 125.38,
      quantity: 1,
      tax_rate: 0.2,
      thumbnail:
        'https://images.homedepot-static.com/productImages/e9b01a1c-c0f1-4eb7-9e00-b2cc1376c918/svn/kidde-fire-extinguishers-468003-64_300.jpg'
    },
    3: {
      id: '3',
      desc: 'Roasted nuts',
      unit_price: 3.4,
      quantity: 4,
      tax_rate: 0.055,
      thumbnail:
        'https://simpleveganblog-lne9w9dshg8v.stackpathdns.com/wp-content/uploads/2019/03/Spicy-pan-roasted-almonds-6.jpg'
    }
  },
  action
) => {
  switch (action.type) {
    case 'INCREASE_QUANTITY': {
      const item = state[action.payload.id];

      return {
        ...state,
        [item.id]: {
          ...item,
          quantity: item.quantity + 1
        }
      };
    }
    case 'DECREASE_QUANTITY': {
      const item = state[action.payload.id];

      return {
        ...state,
        [item.id]: {
          ...item,
          quantity: item.quantity - 1
        }
      };
    }
    default:
      return state;
  }
};

const country = (state = 'FR', action) => {
  switch (action.type) {
    case 'SET_COUNTRY':
      return action.payload.country;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  items,
  country
});

// Selectors

export const getCountry = state => state.country;

export const getItems = state => Object.values(state.items);

export const getItemsCount = createSelector(
  [getItems],
  items => items.reduce((count, item) => count + item.quantity, 0)
);

export const getItemsWithTotal = createSelector(
  [getItems],
  items =>
    items.map(item => ({
      ...item,
      total: item.unit_price * item.quantity
    }))
);

export const getItemsTotal = createSelector(
  [getItemsWithTotal],
  items => items.reduce((total, item) => total + item.total, 0)
);

export const getShippingFees = createSelector(
  [getCountry],
  country =>
    country.split().reduce((acc, _, i) => acc + country.charCodeAt(i), 0) / 5
);

export const getTaxes = createSelector(
  [getItemsWithTotal, getShippingFees],
  (items, shippingFees) =>
    Object.values(
      items.reduce(
        (taxes, item) => ({
          ...taxes,
          [item.tax_rate]: {
            rate: item.tax_rate,
            amount:
              (taxes[item.tax_rate] ? taxes[item.tax_rate].amount : 0) +
              item.total * item.tax_rate
          }
        }),
        {
          0.2: {
            rate: 0.2,
            amount: shippingFees * 0.2
          }
        }
      )
    )
);

export const getTotalTaxExc = createSelector(
  [getItemsTotal, getShippingFees],
  (itemsTotal, shippingFees) => itemsTotal + shippingFees
);

export const getTotalTaxInc = createSelector(
  [getTaxes, getTotalTaxExc],
  (taxes, totalTaxExc) =>
    taxes.reduce((total, tax) => total + tax.amount, totalTaxExc)
);

const store = createStore(rootReducer);

export default store;
