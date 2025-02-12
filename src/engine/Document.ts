import IDocument from './IDocument'
import IGameObject from './IGameObject'
import GameObject from './GameObject'

export default class Document {
  #path: string;

  constructor(path: string) {
    this.#path = path;
  }

  public async decode() {
    const { resources } = (await import(this.#path)) as IDocument;
    const gameObjects = new Map<string, IGameObject>();
    const totalNumberOfResources = resources.length;

    // Start by sorting resources by most relationships first, reducing
    // the number of passes needed to fully decode the document. They
    // will be iterated through in reverse, hence that order.
    resources.sort(
      (a, b) => Object.keys(b.relationships).length - Object.keys(a.relationships).length
    );

    while (gameObjects.size < totalNumberOfResources) {
      const numberOfObjectsBeforePass = gameObjects.size;

      for (let index = resources.length - 1; index >= 0; index--) {
        const resource = resources[index];
        const relationships = Object.entries(resource.relationships);
        const foundRelationships: Record<string, IGameObject> = {};

        for (const [name, resourceId] of relationships) {
          const resourceIds = typeof resourceId === 'string'
            ? [resourceId]
            : resourceId;

          resourceIds.forEach(id => {
            const gameObject = gameObjects.get(id);

            if (gameObject !== undefined) {
              foundRelationships[name] = (gameObject as any).obj;
            }
          });
        }

        if (Object.keys(foundRelationships).length === relationships.length) {
          gameObjects.set(resource.id, await GameObject.deserialize(
            resource.id,
            Object.assign({}, resource.attributes, { relationships: foundRelationships })
          ));

          resources.splice(index, 1);
        }
      }

      if (gameObjects.size <= numberOfObjectsBeforePass) {
        throw new Error(`Stopping potential infinite loop during document decoding. Does the document contain cyclical relationships?`);
      }
    }

    return [...gameObjects.values()];
  }

  public encode()  {
    throw new Error('Not implemented');
  }

  public save() {
    throw new Error('Not implemented');
  }
}
