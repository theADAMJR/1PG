module.exports = class {
  name = '';
  category = 'General';
  
  execute(...args) {
    throw new TypeError('Execute not implemented.');
  }
}