export default interface IGameObject {
  id: string;

  interact(type: string, args: string[]): string;
}
