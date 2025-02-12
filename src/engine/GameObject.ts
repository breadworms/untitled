import IGameObject from './IGameObject'

export default class GameObject implements IGameObject {
  public readonly id: string;
  public readonly obj: any;

  /**
   * @internal
   */
  private constructor(id: string, obj: any) {
    this.id = id;
    this.obj = obj;
  }

  public interact(action: string, args: string[]): string {
    if (this.obj[action] === undefined) {
      return `You don't know how to "${action}" the ${this.id}.`;
    }

    return this.obj[action](...args);
  }

  public static async deserialize(id: string, initialProps: any) {
    const { modulePath, ...props } = initialProps;

    if (typeof modulePath !== 'string') {
      throw new Error(`Can't deserialize game object; no module path found.`);
    }

    const mod = await import(`../content/${modulePath}`);

    Object.assign(mod.default.default, props);

    return new this(id, mod.default.default);
  }
}
