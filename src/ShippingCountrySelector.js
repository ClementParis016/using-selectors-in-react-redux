import React from "react";
import emojiFlags from "emoji-flags";

const countries = emojiFlags.data.sort((a, b) => a.name.localeCompare(b.name));

const ShippingCountrySelector = ({ value, onChange }) => (
  <label>
    Shipping country:{" "}
    <select name="country" value={value} onChange={onChange}>
      {countries.map(flag => (
        <option key={flag.code} value={flag.code}>
          {flag.emoji} {flag.name}
        </option>
      ))}
    </select>
  </label>
);

export default ShippingCountrySelector;
