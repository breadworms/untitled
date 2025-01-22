import * as readline from 'node:readline';


export default class Game {
  async init() {
    const input = readline.createInterface({ input: process.stdin, output: process.stdout });

    input.on('line', command => {
      this.#receiveCommand(command);
      input.prompt();
    });

    input.on('close', this.destroy.bind(this));

    input.prompt();
  }

  async destroy() {
    console.log('Goodbye!...');
  }

  #receiveCommand(command: string) {
    console.log(command);
  }
}
