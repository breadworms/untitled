const obj = {};

obj.position = 0;

obj.examine = () => `
  A knob with two possible positions, marked "Altitude" and "Azimuth".
  It is currently set to the "${['Altitude', 'Azimuth'][obj.position]}" position.
`;

obj.turn = () => {
  obj.position = obj.position === 0 ? 1 : 0;

  return `You turn the knob to the "${['Altitude', 'Azimuth'][obj.position]}" position.`;
}

export default obj;
