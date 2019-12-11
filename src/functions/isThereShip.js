/**
 * returns ship parameter of cell with current coordinates
 */

export default (sea, coordinates) => sea[coordinates[1]][coordinates[0]].ship;
