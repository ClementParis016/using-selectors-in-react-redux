import React from "react";

import { intlAmount } from "./utils";

const Cart = ({ count, amount }) => (
  <div className="Cart">
    <span className="Cart-icon" role="img" aria-label="Cart">
      🛒
    </span>
    <span className="Cart-count">{count}</span>
    <span className="Cart-amount">{intlAmount.format(amount)}</span>
  </div>
);

export default Cart;
