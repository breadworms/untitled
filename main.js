const game = new (require('./dist/Game').default)();

function destructor() {
  game.destroy().then(() => process.exit(0));
}

function errorDestructor(error) {
  console.error(error.stack ?? error);
  game.destroy().finally(() => process.exit(1));
}

process.on('SIGINT', destructor);
process.on('message', msg => msg === 'shutdown' && destructor()); // Windows
process.on('uncaughtException', errorDestructor);
process.on('unhandledRejection', errorDestructor);

game.init().then(() => process.send !== undefined && process.send('ready'));
