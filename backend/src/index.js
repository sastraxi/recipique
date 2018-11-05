const Symbol = require('./util/symbol');

const checkSymbol = (symbol, units, precision = 3) => {
  const parsed = Symbol.parse(symbol);
  console.log(`${symbol} => ${parsed.format(units, precision)}`);
};

checkSymbol('onions:diced@1 medium');
checkSymbol('sea salt@pinch', 'g');
checkSymbol('tomato paste@1tbsp', 'ml');

process.exit(0);
