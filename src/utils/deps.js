export class Deps {
  static #instances = new Map();

  static get(type) {
    return this.#instances.get(type.name)
      ?? this.add(type);
  }

  static add(type) {
    return this.#instances
      .set(type.name, new type())
      .get(type.name);
  }  
}
