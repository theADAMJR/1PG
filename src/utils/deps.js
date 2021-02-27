export class Deps {
  static #instances = new Map();

  static get(type) {
    return this.#instances.get(type.name)
      ?? this.add(type, new type());
  }

  static add(type, instance) {
    return this.#instances
      .set(type.name, instance)
      .get(type.name);
  }  
}
