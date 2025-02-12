const obj = {};

obj.examine = () => `
  A numerical keypad with a digital display. The display currently reads "${getValue()}".
`;

obj.set = value => {
  setValue(value);

  return `
    You press the keys on the keypad. After a short delay, you feel the entire
    observatory rumble as the massive telescope visibly moves.
  `;
}

function getValue() {
  if (obj.relationships.knob.position === 0) {
    return obj.relationships.telescope.altitude;
  } else {
    return obj.relationships.telescope.azimuth;
  }
}

function setValue(value) {
  if (obj.relationships.knob.position === 0) {
    obj.relationships.telescope.altitude = value;
  } else {
    obj.relationships.telescope.azimuth = value;
  }
}

export default obj;
