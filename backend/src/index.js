const Symbol = require('./util/symbol');

const checkSymbol = (symbol, units) => {
  const parsed = Symbol.parse(symbol);
  console.log(`${symbol} => ${JSON.stringify(
    (!units || !parsed.parsedQuantity) ? parsed : {
      ...parsed,
      quantity: `${parsed.parsedQuantity.to(units).toPrecision(3)}${units}`,
      parsedQuantity: undefined,
    },
  )}`);
};

checkSymbol('onions:diced@1 medium');
checkSymbol('sea salt@pinch', 'g');
checkSymbol('tomato paste@1Tbs', 'ml');

process.exit(0);
