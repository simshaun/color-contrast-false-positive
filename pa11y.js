import pa11y from 'pa11y';

pa11y('http://localhost:3000', {
  runners: ['axe'],
  standard: 'WCAG2AA',
}).then((results) => {
    console.dir(results, { depth: null })
});