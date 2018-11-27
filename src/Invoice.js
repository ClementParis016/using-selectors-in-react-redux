import React from "react";
import { connect } from "react-redux";

import { intlAmount, intlPercent } from "./utils";

import ShippingCountrySelector from "./ShippingCountrySelector";

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
        dispatch({ type: "SET_COUNTRY", payload: { country: e.target.value } })
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
                    type: "DECREASE_QUANTITY",
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
                    type: "INCREASE_QUANTITY",
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

const mapStateToProps = state => {
  const items = Object.values(state.items).map(item => ({
    ...item,
    total: item.unit_price * item.quantity
  }));

  const shipping =
    state.country
      .split()
      .reduce((acc, _, i) => acc + state.country.charCodeAt(i), 0) / 5;

  const taxes = Object.values(
    items.reduce(
      (acc, item) => ({
        ...acc,
        [item.tax_rate]: {
          rate: item.tax_rate,
          amount:
            (acc[item.tax_rate] ? acc[item.tax_rate].amount : 0) +
            item.total * item.tax_rate
        }
      }),
      {
        0.2: {
          rate: 0.2,
          amount: shipping * 0.2
        }
      }
    )
  );

  const totalTaxExc =
    items.reduce((acc, item) => acc + item.total, 0) + shipping;

  const totalTaxInc = taxes.reduce((acc, tax) => acc + tax.amount, totalTaxExc);

  return {
    items,
    taxes,
    totalTaxExc,
    totalTaxInc,
    country: state.country,
    shipping
  };
};

export default connect(mapStateToProps)(Invoice);
