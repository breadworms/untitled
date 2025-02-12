const starMap = {
  40302: {
    10203: `The telescope reveals a bright shining star.`
  }
};

const obj = {};

obj.altitude = 0;
obj.azimuth = 0;
obj.depth = 0;

obj.examine = () => {
  return starMap[obj.altitude]?.[obj.azimuth] ?? `
    Peering into the telescope, you see the vastness of space but
    nothing of particular interest.
  `;
}

export default obj;
