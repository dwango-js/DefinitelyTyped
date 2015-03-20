/// <reference path="../node/node.d.ts" />

import msgpack = require("msgpack-js");

var data: string = "";
var encoded: Buffer = msgpack.encode(data);
var decoded: string = msgpack.decode(encoded);

