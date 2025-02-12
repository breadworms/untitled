type Attributes = Record<string, any>;
type Relationships = Record<string, string | string[]>;

export default interface IResource {
  id: string;
  attributes: Attributes;
  relationships: Relationships;
}
