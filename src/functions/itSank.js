export default (type, ship, state) => {
  const areAllDecksHitted = (a, i) => state.ally[i[1]][i[0]].hit && a;
  return state.squadron[type][ship].reduce(areAllDecksHitted, true);
}
