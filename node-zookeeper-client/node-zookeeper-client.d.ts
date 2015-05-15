// Type definitions for node-zookeeper-client
// Project: https://github.com/alexguan/node-zookeeper-client
// Definitions by: wilfrem <https://github.com/wilfrem/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../node/node.d.ts" />

declare module zookeeper {
  // callback utilities
  interface Callback1<T1> {
    (arg1: T1): any;
  }
  interface Callback2<T1, T2> {
    (arg1: T1, arg2: T2): any;
  }
  interface Callback3<T1, T2, T3> {
    (arg1: T1, arg2: T2, arg3: T3): any;
  }
  /**
   * createClient Option
   */
  export interface ClientOptions {
    sessionTimeout?: number;
    spinDelay?: number;
    retries?: number;
  }
  /**
   * zookeeper client interface
   */
  export interface Client extends NodeJS.EventEmitter {
    connect(): void;
    close(): void;
    create(path: string, callback: Callback2<Exception, string>): void;
    create(path: string, data: Buffer, callback: Callback2<Exception, string>): void;
    create(path: string, acls: ACL[], callback: Callback2<Exception, string>): void;
    create(path: string, mode: CreateMode, callback: Callback2<Exception, string>): void;
    create(path: string, data: Buffer, acls: ACL[], callback: Callback2<Exception, string>): void;
    create(path: string, data: Buffer, mode: CreateMode, callback: Callback2<Exception, string>): void;
    create(path: string, acls: ACL[], mode: CreateMode, callback: Callback2<Exception, string>): void;
    create(path: string, data: Buffer, acls: ACL[], mode: CreateMode, callback: Callback2<Exception, string>): void;
    remove(path: string, callback: Callback1<Exception>): void;
    remove(path: string, version: number, callback: Callback1<Exception>): void;
    exists(path: string, callback: Callback2<Exception, Stat>): void;
    exists(path: string, watcher: Callback1<Event>, callback: Callback2<Exception, Stat>): void;
    getChildren(path: string, callback: Callback3<Exception, string[], Stat>): void;
    getChildren(path: string, watcher: Callback1<Event>, callback: Callback3<Exception, string[], Stat>): void;
    getData(path: string, callback: Callback3<Exception, Buffer, Stat>): void;
    getData(path: string, watcher: Callback1<Event>, callback: Callback3<Exception, Buffer, Stat>): void;
    setData(path: string, data: Buffer, callback: Callback2<Exception, Stat>): void;
    setData(path: string, data: Buffer, version: number, callback: Callback2<Exception, Stat>): void;
    getACL(path: string, callback: Callback3<Exception, ACL[], Stat>): void;
    setACL(path: string, acls: ACL[], callback: Callback2<Exception, Stat>): void;
    setACL(path: string, acls: ACL[], version: number, callback: Callback2<Exception, Stat>): void;
    transaction(): Transaction;
    mkdirp(path: string, callback: Callback2<Exception, string>): void;
    mkdirp(path: string, data: Buffer, callback: Callback2<Exception, string>): void;
    mkdirp(path: string, acls: ACL[], callback: Callback2<Exception, string>): void;
    mkdirp(path: string, mode: CreateMode, callback: Callback2<Exception, string>): void;
    mkdirp(path: string, data: Buffer, acls: ACL[], callback: Callback2<Exception, string>): void;
    mkdirp(path: string, data: Buffer, mode: CreateMode, callback: Callback2<Exception, string>): void;
    mkdirp(path: string, acls: ACL[], mode: CreateMode, callback: Callback2<Exception, string>): void;
    mkdirp(path: string, data: Buffer, acls: ACL[], mode: CreateMode, callback: Callback2<Exception, string>): void;
    addAuthInfo(scheme: string, auth: Buffer): void;
    getState(): State;
    getSessionId(): Buffer;
    getSessionPassword(): Buffer;
    getSessionTimeout(): number;

    on(event: string, listener: Function): NodeJS.EventEmitter;
    on(event: "state", listener: Callback1<State>): NodeJS.EventEmitter;
    on(event: "connected", listener: () => void): NodeJS.EventEmitter;
    on(event: "connectedReadOnly", listener: () => void): NodeJS.EventEmitter;
    on(event: "disconnected", listener: () => void): NodeJS.EventEmitter;
    on(event: "expired", listener: () => void): NodeJS.EventEmitter;
    on(event: "authenticationFailed", listener: () => void): NodeJS.EventEmitter;
    once(event: string, listener: Function): NodeJS.EventEmitter;
    once(event: "state", listener: (state: State) => void): NodeJS.EventEmitter;
    once(event: "connected", listener: () => void): NodeJS.EventEmitter;
    once(event: "connectedReadOnly", listener: () => void): NodeJS.EventEmitter;
    once(event: "disconnected", listener: () => void): NodeJS.EventEmitter;
    once(event: "expired", listener: () => void): NodeJS.EventEmitter;
    once(event: "authenticationFailed", listener: () => void): NodeJS.EventEmitter;

  }
  /**
   * zookeeper responce stat
   */
  export interface Stat {
    czxid: number;
    mzxid: number;
    ctime: number;
    mtime: number;
    version: number;
    cversion: number;
    aversion: number;
    ephemeralOwner: number;
    dataLength: number;
    numChildren: number;
    pzxid: number;
  }
  /**
   * zookeeper transaction class
   */
  export interface Transaction {
    create(path: string): Transaction;
    create(path: string, data: Buffer): Transaction;
    create(path: string, acls: ACL[]): Transaction;
    create(path: string, mode: CreateMode): Transaction;
    create(path: string, data: Buffer, acls: ACL[]): Transaction;
    create(path: string, data: Buffer, mode: CreateMode): Transaction;
    create(path: string, acls: ACL[], mode: CreateMode): Transaction;
    create(path: string, data: Buffer, acls: ACL[], mode: CreateMode): Transaction;
    setData(path: string, data: Buffer, version?: number): Transaction;
    check(path: string, version?: number): Transaction;
    remove(path: string, version?: number): Transaction;
    commit(callback: Callback2<Exception, any[]>): void;
  }
  /**
   * client factory function
   */
  export function createClient(connectionString: string, options?: ClientOptions): Client;
  /**
   * zookeeper acl class
   */
  export class ACL {
    constructor(permission: Permission, id: Id);
    static OPEN_ACL_UNSAFE: ACL[];
    static CREATOR_ALL_ACL: ACL[];
    static READ_ACL_UNSAFE: ACL[];
  }
  /**
   * zookeeper acl id class
   */
  export class Id {
    constructor(scheme: string, id: string);
    static ANYONE_ID_UNSAFE: Id;
    static AUTH_IDS: Id;
  }
  /**
   * zookeeper acl permission enum
   */
  export enum Permission {
    READ = 1,
    WRITE = 2,
    CREATE = 4,
    DELETE = 8,
    ADMIN = 16,
    ALL = 31
  }
  /**
   * zookeeper node create mode constants
   */
  export enum CreateMode {
    PERSISTENT = 0,
    PERSISTENT_SEQUENTIAL = 2,
    EPHEMERAL = 1,
    EPHEMERAL_SEQUENTIAL = 3
  }
  /**
   * zookeeper event infomation
   */
  export class Event {
    static NODE_CREATED: number;
    static NODE_DELETED: number;
    static NODE_DATA_CHANGED: number;
    static NODE_CHILDREN_CHANGED: number;

    getType(): number;
    getName(): string;
    getPath(): number;
    toString(): string;
  }
  /**
   * zookeeper connection state
   */
  interface State {
    getName(): string;
    getCode(): string;
  }
  /**
   * zookeeper connection stateCode
   */
  export interface StateEnum {
    DISCONNECTED: State;
    SYNC_CONNECTED: State;
    AUTH_FAILED: State;
    CONNECTED_READ_ONLY: State;
    SASL_AUTHENTICATED: State;
    EXPIRED: State;
  }
  export var State: StateEnum;
  /**
   * zookeeper error class
   */
  export class Exception {
    static OK: number;
    static SYSTEM_ERROR: number;
    static RUNTIME_INCONSISTENCY: number;
    static DATA_INCONSISTENCY: number;
    static CONNECTION_LOSS: number;
    static MARSHALLING_ERROR: number;
    static UNIMPLEMENTED: number;
    static OPERATION_TIMEOUT: number;
    static BAD_ARGUMENTS: number;
    static API_ERROR: number;
    static NO_NODE: number;
    static NO_AUTH: number;
    static BAD_VERSION: number;
    static NO_CHILDREN_FOR_EPHEMERALS: number;
    static NODE_EXISTS: number;
    static NOT_EMPTY: number;
    static SESSION_EXPIRED: number;
    static INVALID_CALLBACK: number;
    static INVALID_ACL: number;
    static AUTH_FAILED: number;

    getCode(): number;
    getPath(): string;
    getName(): string;
    toString(): string;
  }
}
declare module "node-zookeeper-client" {
  export = zookeeper;
}
