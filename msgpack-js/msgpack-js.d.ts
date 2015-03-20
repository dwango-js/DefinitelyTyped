// Type definitions for msgpack 0.3.0
// Project: https://github.com/creationix/msgpack-js
// Definitions by: nkzawa <https://github.com/nkzawa/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../node/node.d.ts"/>

declare module "msgpack-js" {
    export function encode(data: any): Buffer;
    export function decode(buffer: Buffer): any;
}
