/**
 * input: `cell-3-4-ally`
 * output: [3, 4]
 */

/**
 * choose less fucked up version:
  */
// export default (id) => id.split('-').reduce((a, i) => +i ? [ ...a, +i] : a, []);
export default (id) => id.match(/\d+-/g).map(item => parseInt(item));
