const convert = require('convert-units');

const QUANTITY_REGEX = /^(\d+)(\D+)$/;
const SYMBOL_REGEX = /^([^@:]+:)?([^@:]+)(@[^@:]+)?$/;

const UNIT_OVERRIDES = {
  mL: 'ml',
  tbsp: 'Tbs',
  tbs: 'Tbs',
};

const fixUnit = unit => (unit in UNIT_OVERRIDES ? UNIT_OVERRIDES[unit] : unit);

// TODO: how can we add overrides?
//  -> "butter, peanut" => "peanut butter"
//  -> "bread, sliced" => "slice(s) of bread"
// TODO: this should be its own Class

module.exports = {
  fixUnit,
  parse: (symbol) => {
    const match = symbol.match(SYMBOL_REGEX);
    const category = match[1] && match[1].substr(0, match[1].length - 1);
    const item = match[2];
    const quantity = match[3].substr(1);

    const quantityMatch = quantity.match(QUANTITY_REGEX);
    let parsedQuantity;
    try {
      parsedQuantity = quantityMatch
        ? convert(quantityMatch[1]).from(fixUnit(quantityMatch[2]))
        : undefined;
    } catch (err) {
      // could not parse quantity; silently set to undefined
    }

    return {
      category,
      item,
      quantity,
      parsedQuantity,
    };
    // TODO: how to parse a quantity like "3 medium"??
  },
  format: (symbol, unit, precision = 3) => {
    const quantity = symbol.parsedQuantity && unit
      ? `${symbol.parsedQuantity.to(fixUnit(unit)).toPrecision(precision)}${unit}`
      : symbol.quantity;
    return `${quantity} ${(symbol.category ? `${symbol.category}, ` : '')}${symbol.item}`;
  },
};
