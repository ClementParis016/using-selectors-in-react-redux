import React from 'react';
import { connect } from 'react-redux';

import { intlAmount } from './utils';

import { getItemsCount, getItemsTotal } from './store';

const Cart = ({ count, amount }) => (
  <div className="Cart">
    <span className="Cart-icon" role="img" aria-label="Cart">
      🛒
    </span>
    <span className="Cart-count">{count}</span>
    <span className="Cart-amount">{intlAmount.format(amount)}</span>
  </div>
);

const mapStateToProps = state => ({
  count: getItemsCount(state),
  amount: getItemsTotal(state)
});

export default connect(mapStateToProps)(Cart);
