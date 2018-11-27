import React from 'react';
import { connect } from 'react-redux';

import { intlAmount, intlPercent } from './utils';

import {
  getItemsWithTotal,
  getShippingFees,
  getTaxes,
  getTotalTaxExc,
  getTotalTaxInc,
  getCountry
} from './store';

import ShippingCountrySelector from './ShippingCountrySelector';

const Invoice = ({
  items,
  taxes,
  totalTaxExc,
  totalTaxInc,
  country,
  shipping,
  dispatch
}) => (
  <>
    <ShippingCountrySelector
      value={country}
      onChange={e =>
        dispatch({ type: 'SET_COUNTRY', payload: { country: e.target.value } })
      }
    />
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.id}>
            <td>
              <img width="50" height="50" src={item.thumbnail} alt="" />
              {item.desc}
            </td>
            <td>{intlAmount.format(item.unit_price)}</td>
            <td>
              <button
                type="button"
                onClick={() =>
                  dispatch({
                    type: 'DECREASE_QUANTITY',
                    payload: { id: item.id }
                  })
                }
              >
                -
              </button>
              {item.quantity}
              <button
                type="button"
                onClick={() =>
                  dispatch({
                    type: 'INCREASE_QUANTITY',
                    payload: { id: item.id }
                  })
                }
              >
                +
              </button>
            </td>
            <td>{intlAmount.format(item.total)}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th colSpan="3">Shipping</th>
          <td>{intlAmount.format(shipping)}</td>
        </tr>
        <tr>
          <th colSpan="3">Total tax exc.</th>
          <td>{intlAmount.format(totalTaxExc)}</td>
        </tr>
        {taxes.map(tax => (
          <tr key={tax.rate}>
            <th colSpan="2">Tax</th>
            <td>{intlPercent.format(tax.rate)}</td>
            <td>{intlAmount.format(tax.amount)}</td>
          </tr>
        ))}
        <tr>
          <th colSpan="3">Total tax inc.</th>
          <td>{intlAmount.format(totalTaxInc)}</td>
        </tr>
      </tfoot>
    </table>
  </>
);

const mapStateToProps = state => ({
  items: getItemsWithTotal(state),
  taxes: getTaxes(state),
  totalTaxExc: getTotalTaxExc(state),
  totalTaxInc: getTotalTaxInc(state),
  country: getCountry(state),
  shipping: getShippingFees(state)
});

export default connect(mapStateToProps)(Invoice);
