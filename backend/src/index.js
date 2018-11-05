const Symbol = require('./util/symbol');

const checkSymbol = (symbol, units) => {
  const parsed = Symbol.parse(symbol);
  console.log(`${symbol} => ${Symbol.format(parsed)}`);
};

checkSymbol('onions:diced@1 medium');
checkSymbol('sea salt@pinch', 'g');
checkSymbol('tomato paste@1tbsp', 'ml');

process.exit(0);
