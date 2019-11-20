/**
 * returns ship parameter of cell object with current coordinates
 */

export default (sea, coordinates) => sea[coordinates[1]][coordinates[0]].ship;
