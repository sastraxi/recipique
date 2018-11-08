const Symbol = require('./util/symbol');

const checkSymbol = (symbol, units, precision = 3) => {
  const parsed = Symbol.parse(symbol);
  console.log(`${symbol} => ${parsed.format(units, precision)}`);
};

checkSymbol('onion:diced@1 medium');
checkSymbol('salt:sea@pinch', 'g');
checkSymbol('tomato:paste@1tbsp', 'ml');
checkSymbol('tomato:crushed@1cup', 'ml');

process.exit(0);
