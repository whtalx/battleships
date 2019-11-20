/**
 * input: `cell-3-4-ally`
 * output: [3, 4]
 */

export default (id) => id.match(/\d+-/g).map(item => parseInt(item));
