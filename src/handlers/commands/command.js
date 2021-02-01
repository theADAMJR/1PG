export default class Command {
  name = '';

  execute(...args) {
    throw new TypeError('Not implemented');
  }
}
