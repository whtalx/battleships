/**
 * input: `cell-3-4-ally`
 * output: [3, 4]
 */

export default (id) =>// choose less fucked up version:
  id.match(/\d+-/g).map(item => parseInt(item));
  // id.split('-').reduce((a, i) => +i ? [ ...a, +i] : a, []);
