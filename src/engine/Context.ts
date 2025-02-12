import IGameObject from './IGameObject'

export default class Context {
  public readonly objects: readonly IGameObject[];

  constructor(objects: IGameObject[]) {
    this.objects = objects;
  }

  public getObjectById(id: string) {
    return this.objects.find(o => o.id === id);
  }
}
