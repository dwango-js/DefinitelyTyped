// Type definitions for type-name v1.0.1
// Project: https://github.com/twada/type-name/
// Definitions by: OKUNOKENTARO <https://github.com/armorik83>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare function typeName(anyVar: any): string;
declare module typeName {}

declare module "type-name" {
  export = typeName;
}