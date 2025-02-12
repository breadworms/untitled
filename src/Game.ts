import Composer from './Composer'
import Context from './engine/Context'
import Document from './engine/Document'

export default class Game {
  public async init() {
    const document = new Document('../content/game.document.js');
    const context = new Context(await document.decode());

    console.log(`[game] Loaded document with ${context.objects.length} objects.`);

    const composer = new Composer();

    composer.on('command', (args: string) => {
      const [command, objId, ...playerArgs] = args.split(' ');
      const obj = context.getObjectById(objId);

      if (obj === undefined) {
        console.log(`You don't know what "${objId}" is.`);
      } else {
        console.log(obj.interact(command, playerArgs));
      }
    });
  }

  public async destroy() {
    console.log('Goodbye!...');
  }
}
