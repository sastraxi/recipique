const convert = require('convert-units');

const QUANTITY_REGEX = /^(\d+)(\D+)$/;
const SYMBOL_REGEX = /^([^@:]+:)?([^@:]+)(@[^@:]+)?$/;

module.exports = {
  parse: (symbol) => {
    const match = symbol.match(SYMBOL_REGEX);
    const category = match[1] && match[1].substr(0, match[1].length - 1);
    const item = match[2];
    const quantity = match[3].substr(1);

    const quantityMatch = quantity.match(QUANTITY_REGEX);
    let parsedQuantity;
    try {
      parsedQuantity = quantityMatch
        ? convert(quantityMatch[1]).from(quantityMatch[2])
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
};
