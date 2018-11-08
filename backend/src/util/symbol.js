const convert = require('convert-units');

const QUANTITY_REGEX = /^(\d+)\W*([^0-9\W]+)$/;
const SYMBOL_REGEX = /^([^@:]+:)?([^@:]+)(@[^@:]+)?$/;

const UNIT_OVERRIDES = {
  mL: 'ml',
  tbsp: 'Tbs',
  tbs: 'Tbs',
};
const fixUnit = unit => (unit in UNIT_OVERRIDES ? UNIT_OVERRIDES[unit] : unit);

const QUANTITY_OVERRIDES = {
  pinch: 'a pinch of',
};
const formatQuantity = quantity => QUANTITY_OVERRIDES[quantity] || quantity;

const ITEM_OVERRIDES = {};
const CATEGORY_OVERRIDES = {
  tomato: {
    paste: 'tomato paste',
    crushed: 'crushed tomatoes',
  },
  butter: {
    peanut: 'peanut butter',
  },
  jam: {
    strawberry: 'strawberry jam',
  },
  bread: {
    sliced: 'slice(s) of bread',
  },
  onion: {
    caramelized: 'caramelized onions',
  },
  salt: {
    sea: 'sea salt',
  },
};
const formatName = (item, category) => {
  if (category) {
    const overrides = CATEGORY_OVERRIDES[category] || {};
    return overrides[item] || `${category}, ${item}`;
  }
  return ITEM_OVERRIDES[item] || item;
};

// TODO: how can we add overrides?
//  -> "butter, peanut" => "peanut butter"
//  -> "bread, sliced" => "slice(s) of bread"

class Symbol {
  constructor(item, quantity, category, parsedQuantity) {
    this.item = item;
    this.quantity = quantity;
    this.category = category;
    this.parsedQuantity = parsedQuantity;

    // TODO: how to parse a quantity like "3 medium"??
    if (!this.parsedQuantity) {
      const quantityMatch = this.quantity.match(QUANTITY_REGEX);
      this.parsedQuantity = undefined;
      try {
        this.parsedQuantity = quantityMatch
          ? convert(quantityMatch[1]).from(fixUnit(quantityMatch[2]))
          : undefined;
      } catch (err) {
        // could not parse quantity; silently set to undefined
        // console.warn(err);
      }
    }
  }

  static clone() {
    return new Symbol(this.item, this.quantity, this.category, this.parsedQuantity);
  }

  static parse(stringifed) {
    const match = stringifed.match(SYMBOL_REGEX);

    const category = match[1] && match[1].substr(0, match[1].length - 1);
    const item = match[2]; // eslint-disable-line
    const quantity = match[3].substr(1);

    return new Symbol(item, quantity, category);
  }

  quantityIn(unit, precision = 3) {
    return this.parsedQuantity && unit
      ? `${this.parsedQuantity.to(fixUnit(unit)).toPrecision(precision)}${unit}`
      : this.quantity;
  }

  withUnits(unit, precision) {
    return new Symbol(
      this.item,
      this.quantityIn(unit, precision),
      this.category,
      this.parsedQuantity,
    );
  }

  format(unit, precision) {
    return `${formatQuantity(this.quantityIn(unit, precision))} ${formatName(this.item, this.category)}`;
  }

  asObject() {
    return {
      category: this.category,
      item: this.item,
      quantity: this.quantity,
    };
  }
}

module.exports = Symbol;
