//
// Autogenerated by Thrift Compiler (1.0.0-dev)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
import thrift = require('thrift');
import Thrift = thrift.Thrift;
import Q = thrift.Q;


import ttypes = require('./test_types');
//HELPER FUNCTIONS AND STRUCTURES


class Test_add_args {
  val1: number;
  val2: number;
  constructor(args?: { val1: number; val2: number; }) {
    this.val1 = null;
    this.val2 = null;
    if (args) {
        if (args.val1 !== undefined) {
            this.val1 = args.val1;
        }
        if (args.val2 !== undefined) {
            this.val2 = args.val2;
        }
    }
  }
  read(input: thrift.TProtocol): void {
    input.readStructBegin();
    while (true)
    {
      var ret = input.readFieldBegin();
      var fname = ret.fname;
      var ftype = ret.ftype;
      var fid = ret.fid;
      if (ftype == Thrift.Type.STOP) {
        break;
      }
      switch (fid)
      {
        case 1:
        if (ftype == Thrift.Type.I32) {
          this.val1 = input.readI32();
        } else {
          input.skip(ftype);
        }
        break;
        case 2:
        if (ftype == Thrift.Type.I32) {
          this.val2 = input.readI32();
        } else {
          input.skip(ftype);
        }
        break;
        default:
          input.skip(ftype);
      }
      input.readFieldEnd();
    }
    input.readStructEnd();
    return;
  }

  write(output: thrift.TProtocol): void {
    output.writeStructBegin('Test_add_args');
    if (this.val1 !== null && this.val1 !== undefined) {
      output.writeFieldBegin('val1', Thrift.Type.I32, 1);
      output.writeI32(this.val1);
      output.writeFieldEnd();
    }
    if (this.val2 !== null && this.val2 !== undefined) {
      output.writeFieldBegin('val2', Thrift.Type.I32, 2);
      output.writeI32(this.val2);
      output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
    return;
  }

}

class Test_add_result {
  success: number;
  constructor(args?: { success: number; }) {
    this.success = null;
    if (args) {
        if (args.success !== undefined) {
            this.success = args.success;
        }
    }
  }
  read(input: thrift.TProtocol): void {
    input.readStructBegin();
    while (true)
    {
      var ret = input.readFieldBegin();
      var fname = ret.fname;
      var ftype = ret.ftype;
      var fid = ret.fid;
      if (ftype == Thrift.Type.STOP) {
        break;
      }
      switch (fid)
      {
        case 0:
        if (ftype == Thrift.Type.I32) {
          this.success = input.readI32();
        } else {
          input.skip(ftype);
        }
        break;
        case 0:
          input.skip(ftype);
          break;
        default:
          input.skip(ftype);
      }
      input.readFieldEnd();
    }
    input.readStructEnd();
    return;
  }

  write(output: thrift.TProtocol): void {
    output.writeStructBegin('Test_add_result');
    if (this.success !== null && this.success !== undefined) {
      output.writeFieldBegin('success', Thrift.Type.I32, 0);
      output.writeI32(this.success);
      output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
    return;
  }

}

export class Client {
  private output: thrift.TTransport;
  private pClass: {new (trans: thrift.TTransport): thrift.TProtocol; };
  private _seqid: number = 0;
  private _reqs: {[key: string]: any; } = {}
  constructor(output: thrift.TTransport, pClass: {new (trans: thrift.TTransport): thrift.TProtocol; }) {
      this.output = output;
      this.pClass = pClass;
  }
  seqid() { return this._seqid; }
  new_seqid() { return this._seqid += 1; }
  add(val1: number, val2: number, callback?: (err: any, result: number) => void): Q.IPromise<number> {
    this._seqid = this.new_seqid();
    if (callback === undefined) {
      var _defer = Q.defer<number>();
      this._reqs[this.seqid()] = function(error: any, result: number) {
        if (error) {
          _defer.reject(error);
        } else {
          _defer.resolve(result);
        }
      };
      this.send_add(val1, val2);
      return _defer.promise;
    } else {
      this._reqs[this.seqid()] = callback;
      this.send_add(val1, val2);
    }
  }

  send_add(val1: number, val2: number): void {
    var output = new this.pClass(this.output);
    output.writeMessageBegin('add', Thrift.MessageType.CALL, this.seqid());
    var args = new Test_add_args();
    args.val1 = val1;
    args.val2 = val2;
    args.write(output);
    output.writeMessageEnd();
    return this.output.flush();
  }

  recv_add(input: thrift.TProtocol,mtype: Thrift.MessageType,rseqid: number) {
    var callback = this._reqs[rseqid] || function() {};
    delete this._reqs[rseqid];
    if (mtype == Thrift.MessageType.EXCEPTION) {
      var x = new Thrift.TApplicationException();
      x.read(input);
      input.readMessageEnd();
      return callback(x);
    }
    var result = new Test_add_result();
    result.read(input);
    input.readMessageEnd();

    if (null !== result.success) {
      return callback(null, result.success);
    }
    return callback('add failed: unknown result');
  }
}
export class Processor {
  private _handler: TestLike;
  constructor(handler: TestLike)   {
    this._handler = handler
  }
  process(input: thrift.TProtocol, output: thrift.TProtocol): any   {
    var r = input.readMessageBegin();
    if ((<any>this)['process_' + r.fname]) {
      return (<any>this)['process_' + r.fname].call(this, r.rseqid, input, output);
    } else {
      input.skip(Thrift.Type.STRUCT);
      input.readMessageEnd();
      var x = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN_METHOD, 'Unknown function ' + r.fname);
      output.writeMessageBegin(r.fname, Thrift.MessageType.EXCEPTION, r.rseqid);
      x.write(output);
      output.writeMessageEnd();
      output.flush();
    }
  }

  process_add(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol)   {
    var args = new Test_add_args();
    args.read(input);
    input.readMessageEnd();
    if (this._handler.add.length === 2) {
      Q.fcall(this._handler.add, args.val1, args.val2)
        .then(function(success) {
          var result = new Test_add_result({success: success});
          output.writeMessageBegin("add", Thrift.MessageType.REPLY, seqid);
          result.write(output);
          output.writeMessageEnd();
          output.flush();
        }, function (err) {
          var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
          output.writeMessageBegin("add", Thrift.MessageType.EXCEPTION, seqid);
          result.write(output);
          output.writeMessageEnd();
          output.flush();
        });
    } else {
      this._handler.add(args.val1, args.val2, function (err, result_) {
        var result: {write: (output: thrift.TProtocol) => void; };
        if (err == null) {
          result = new Test_add_result((err != null ? err : {success: result_}));
          output.writeMessageBegin("add", Thrift.MessageType.REPLY, seqid);
        } else {
          result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
          output.writeMessageBegin("add", Thrift.MessageType.EXCEPTION, seqid);
        }
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
    }
  }

}
export interface TestLike {
  add(val1: number, val2: number, callback?: (err: any, result: number) => void): Q.IPromise<number>;
}
