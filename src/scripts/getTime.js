export default () => Intl.DateTimeFormat(
  `en-GB`,
  {
    hour: `numeric`,
    minute: `numeric`,
    second: `numeric`
  }
).format(new Date())
