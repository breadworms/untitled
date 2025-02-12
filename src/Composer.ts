import { createInterface as createConsoleInterface } from 'node:readline'
import { EventEmitter } from 'node:stream'

export default class Composer extends EventEmitter {
  constructor() {
    super();

    const consoleInput = createConsoleInterface({
      input: process.stdin,
      output: process.stdout
    });

    consoleInput.on('line', command => {
      this.emit('command', command);
      consoleInput.prompt();
    });

    consoleInput.on('close', () => {
      process.emit('SIGINT', 'SIGINT');
    });

    consoleInput.prompt();
  }
}
