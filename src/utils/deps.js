export default class Deps {
  static #instances = new Map();

  static get(type) {
    return this.#instances.get(type)
      ?? this.add(type, new type());
  }

  static add(type, instance) {
    return this.#instances
      .set(type, instance)
      .get(type);
  }
}
