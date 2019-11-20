/**
 * input: `1-2-3`
 * output: [1, 2, 3]
 */

export default (string) => string.split(`-`).map(item => parseInt(item));
