const recipes = [
  {
    id: 0,
    name: 'Peanut butter and jelly sandwich',
    url: 'http://127.0.0.1/hacked',
    servesFrom: 1,
    servesTo: 1,
    provides: ['sandwich@1'],
    steps: [
      {
        text: 'Cut the crust off of the bread',
        optional: true,
      },
      {
        text: 'Spread $0 on $1',
        local: [
          { key: '0', value: 'butter:peanut@2tbsp' },
          { key: '1', value: 'bread:sliced@1' },
        ],
      },
      {
        text: 'Spread $0 on $1',
        local: [
          { key: '0', value: 'jam:strawberry@1tbsp' },
          { key: '1', value: 'bread:sliced@1' },
        ],
      },
    ],
  },
];

module.exports = recipes;
