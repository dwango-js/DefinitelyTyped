/// <reference path="thrift.d.ts" />
/// <reference path="../q/Q.d.ts" />

import thrift = require("thrift");
import Types = require("./test_types");
import Test = require("./Test");

class Handle implements Test.TestLike {
  add(val1: number, val2: number): thrift.Q.IPromise<number> {
    var defer = thrift.Q.defer<number>();
    defer.resolve(val1 + val2);
    return defer.promise;
  }
}

var connection = thrift.createConnection("localhost", 3001, {});
var client = thrift.createClient(Test, connection);
client.add(1,2).then((result: number) => {});
