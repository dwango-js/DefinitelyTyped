// Type definitions for thrift
// Project: https://thrift.apache.org/
// Definitions by: Kazuki Yasufuku <https://github.com/wilfrem>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../node/node.d.ts" />
/// <reference path="../q/Q.d.ts" />

// thrift.js
declare module ThriftJS {
    export enum Type {
        STOP = 0,
        VOID = 1,
        BOOL = 2,
        BYTE = 3,
        I08 = 3,
        DOUBLE = 4,
        I16 = 6,
        I32 = 8,
        I64 = 10,
        STRING = 11,
        UTF7 = 11,
        STRUCT = 12,
        MAP = 13,
        SET = 14,
        LIST = 15,
        UTF8 = 16,
        UTF16 = 17
    }
    export enum MessageType {
        CALL = 1,
        REPLY = 2,
        EXCEPTION = 3,
        ONEWAY = 4
    }
    export class TException implements Error {
        name: string;
        message: string;

        constructor(message: string);

        getMessage(): string;
    }
    export enum TApplicationExceptionType {
        UNKNOWN = 0,
        UNKNOWN_METHOD = 1,
        INVALID_MESSAGE_TYPE = 2,
        WRONG_METHOD_NAME = 3,
        BAD_SEQUENCE_ID = 4,
        MISSING_RESULT = 5,
        INTERNAL_ERROR = 6,
        PROTOCOL_ERROR = 7,
        INVALID_TRANSFORM = 8,
        INVALID_PROTOCOL = 9,
        UNSUPPORTED_CLIENT_TYPE = 10
    }
    export class TApplicationException extends TException {
        message: string;
        code: number;

        constructor(type?: TApplicationExceptionType, message?: string);
        read(input: Object): void;
        write(output: Object): void;
        getCode(): number;
    }
}


declare module "thrift" {
    import net = require("net");
    export import Q = require("q");
    export import Thrift = ThriftJS;

    export interface Connection extends NodeJS.EventEmitter {
        on(event: string, listener: Function): NodeJS.EventEmitter;
        on(event: "error", listener: (err: any) => any): NodeJS.EventEmitter;
        on(event: "connect", listener: () => any): NodeJS.EventEmitter;
        on(event: "timeout", listener: () => any): NodeJS.EventEmitter;
        on(event: "close", listeer: () => any): NodeJS.EventEmitter;
        end(): void;
    }
    export interface Server extends net.Server {
        on(event: string, listener: Function): NodeJS.EventEmitter;
        on(event: "error", listener: (err: any) => any): NodeJS.EventEmitter;
    }
    export interface ServerOptions {
        transport?: TTransport;
        protocol?: TProtocol;
        tls?: any;//tls.TlsOptions;
    }
    export interface ClientOptions {
        transport?: TTransport;
        protocol?: TProtocol;
        debug?: boolean;
        max_attempts?: number;
        retry_max_delay?: number;
        connect_timeout?: number;
        timeout?: number;
    }

    export function createConnection(host: string, port: number, options: ClientOptions): Connection;
    export function createSSLConnection(host: string, port: number, options: ClientOptions): Connection;

    export function createClient<TClient>(cls: {
        Client: { new (output: TTransport, pClass: {new (trans: TTransport): TProtocol; }): TClient; }
    }, connection: Connection): TClient;
    export function createServer<THandler, TProcessor> (cls: {
        Processor: { new (handler: THandler): TProcessor; }
    }, handler: THandler, options: ServerOptions): Server;


    export interface TTransport {
        commitPosition(): void;
        rollbackPosition(): void;
        isOpen(): boolean;
        open(): boolean;
        close(): boolean;
        setCurrSeqId(seqId: number): void;
        ensureAvailable(len: number): void;
        read(len: number): Buffer;
        readByte(): number;
        readI16(): number;
        readI32(): number;
        readDouble(): number;
        readString(): string;
        write(buf: Buffer): void;
        write(buf: string): void;
        flush(): void;
    }
    export interface TProtocol {
        flush(): void;
        writeMessageBegin(name: string, type: Thrift.MessageType, seqid: number): void;
        writeMessageEnd(): void;
        writeStructBegin(name: string): void;
        writeStructEnd(): void;
        writeFieldBegin(name: string, type: Thrift.Type, id: number): void;
        writeFieldEnd(): void;
        writeFieldStop(): void;
        writeMapBegin(ktype: Thrift.Type, vtype: Thrift.Type, size: number): void;
        writeMapEnd(): void;
        writeListBegin(etype: Thrift.Type, size: number): void;
        writeListEnd(): void;
        writeSetBegin(etype: Thrift.Type, size: number): void;
        writeSetEnd(): void;
        writeBool(bool: boolean): void;
        writeByte(b: number): void;
        writeI16(i16: number): void;
        writeI32(i32: number): void;
        writeI64(i64: number | {buffer: Buffer; }): void;
        writeDouble(dbl: number): void;
        writeString(arg: string | Buffer): void;
        writeBinary(arg: string | Buffer): void;
        readMessageBegin(): {fname: string; mtype: Thrift.MessageType; rseqid: number; };
        readMessageEnd(): void;
        readStructBegin(): {fname: string; };
        readStructEnd(): void;
        readFieldBegin(): {fname: string; ftype: Thrift.Type; fid: number; };
        readFieldEnd(): void;
        readMapBegin(): {ktype: Thrift.Type; vtype: Thrift.Type; size: number; };
        readMapEnd(): void;
        readListBegin(): {etype: Thrift.Type; size: number; };
        readListEnd(): void;
        readSetBegin(): {etype: Thrift.Type; size: number; };
        readSetEnd(): void;
        readBool(): boolean;
        readByte(): number;
        readI16(): number;
        readI32(): number;
        readI64(): any;
        readDouble(): number;
        readBinary(): Buffer;
        readString(): string;
        getTransport(): TTransport;
        skip(type: Thrift.Type): void;
    }
    export interface TBufferedTransport extends TTransport {}
    export interface TFramedTransport extends TTransport {}
    export interface TBinaryProtocol extends TProtocol {}
    export interface TJSONProtocol extends TProtocol {}
    export interface TCompactProtocol extends TProtocol {}
    export var TBufferedTransport: { new (buffer: Buffer, callback: Function): TBufferedTransport; };
    export var TFramedTransport: { new (buffer: Buffer, callback: Function): TFramedTransport; };
    export var TBinaryProtocol: { new (trans: TTransport, strictRead: boolean, strictWrite: boolean): TBinaryProtocol; };
    export var TJSONProtocol: { new (trans: TTransport): TJSONProtocol; };
    export var TCompactProtocol: { new (trans: TTransport): TCompactProtocol; };
}
