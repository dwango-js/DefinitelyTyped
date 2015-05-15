/// <reference path="node-zookeeper-client.d.ts" />

import zookeeper = require("node-zookeeper-client");

var client = zookeeper.createClient("",{});
client.mkdirp("/foo/bar/baz", (error,path) => {});
client.create("/hoge",(error,path) => {});
client.getData("/hoge", (error, data, stat) =>{});

