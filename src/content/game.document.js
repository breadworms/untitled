export const resources = [
  {
    id: 'my-telescope',
    attributes: {
      modulePath: 'scripts/telescope.js'
    },
    relationships: {}
  },
  {
    id: 'my-knob',
    attributes: {
      modulePath: 'scripts/telescope-knob.js'
    },
    relationships: {
      telescope: 'my-telescope'
    }
  },
  {
    id: 'my-keypad',
    attributes: {
      modulePath: 'scripts/telescope-keypad.js'
    },
    relationships: {
      telescope: 'my-telescope',
      knob: 'my-knob'
    }
  },
  {
    id: 'my-throttle',
    attributes: {
      modulePath: 'scripts/telescope-throttle.js'
    },
    relationships: {
      telescope: 'my-telescope'
    }
  }
];
