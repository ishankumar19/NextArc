
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Goal
 * 
 */
export type Goal = $Result.DefaultSelection<Prisma.$GoalPayload>
/**
 * Model PlatformConnection
 * 
 */
export type PlatformConnection = $Result.DefaultSelection<Prisma.$PlatformConnectionPayload>
/**
 * Model Problem
 * 
 */
export type Problem = $Result.DefaultSelection<Prisma.$ProblemPayload>
/**
 * Model NormalizedSubmission
 * 
 */
export type NormalizedSubmission = $Result.DefaultSelection<Prisma.$NormalizedSubmissionPayload>
/**
 * Model ContestHistory
 * 
 */
export type ContestHistory = $Result.DefaultSelection<Prisma.$ContestHistoryPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.goal`: Exposes CRUD operations for the **Goal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Goals
    * const goals = await prisma.goal.findMany()
    * ```
    */
  get goal(): Prisma.GoalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.platformConnection`: Exposes CRUD operations for the **PlatformConnection** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PlatformConnections
    * const platformConnections = await prisma.platformConnection.findMany()
    * ```
    */
  get platformConnection(): Prisma.PlatformConnectionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.problem`: Exposes CRUD operations for the **Problem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Problems
    * const problems = await prisma.problem.findMany()
    * ```
    */
  get problem(): Prisma.ProblemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.normalizedSubmission`: Exposes CRUD operations for the **NormalizedSubmission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NormalizedSubmissions
    * const normalizedSubmissions = await prisma.normalizedSubmission.findMany()
    * ```
    */
  get normalizedSubmission(): Prisma.NormalizedSubmissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.contestHistory`: Exposes CRUD operations for the **ContestHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ContestHistories
    * const contestHistories = await prisma.contestHistory.findMany()
    * ```
    */
  get contestHistory(): Prisma.ContestHistoryDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Goal: 'Goal',
    PlatformConnection: 'PlatformConnection',
    Problem: 'Problem',
    NormalizedSubmission: 'NormalizedSubmission',
    ContestHistory: 'ContestHistory'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "goal" | "platformConnection" | "problem" | "normalizedSubmission" | "contestHistory"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Goal: {
        payload: Prisma.$GoalPayload<ExtArgs>
        fields: Prisma.GoalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GoalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GoalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          findFirst: {
            args: Prisma.GoalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GoalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          findMany: {
            args: Prisma.GoalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>[]
          }
          create: {
            args: Prisma.GoalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          createMany: {
            args: Prisma.GoalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GoalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>[]
          }
          delete: {
            args: Prisma.GoalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          update: {
            args: Prisma.GoalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          deleteMany: {
            args: Prisma.GoalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GoalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GoalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>[]
          }
          upsert: {
            args: Prisma.GoalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          aggregate: {
            args: Prisma.GoalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGoal>
          }
          groupBy: {
            args: Prisma.GoalGroupByArgs<ExtArgs>
            result: $Utils.Optional<GoalGroupByOutputType>[]
          }
          count: {
            args: Prisma.GoalCountArgs<ExtArgs>
            result: $Utils.Optional<GoalCountAggregateOutputType> | number
          }
        }
      }
      PlatformConnection: {
        payload: Prisma.$PlatformConnectionPayload<ExtArgs>
        fields: Prisma.PlatformConnectionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlatformConnectionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformConnectionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlatformConnectionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformConnectionPayload>
          }
          findFirst: {
            args: Prisma.PlatformConnectionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformConnectionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlatformConnectionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformConnectionPayload>
          }
          findMany: {
            args: Prisma.PlatformConnectionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformConnectionPayload>[]
          }
          create: {
            args: Prisma.PlatformConnectionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformConnectionPayload>
          }
          createMany: {
            args: Prisma.PlatformConnectionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlatformConnectionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformConnectionPayload>[]
          }
          delete: {
            args: Prisma.PlatformConnectionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformConnectionPayload>
          }
          update: {
            args: Prisma.PlatformConnectionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformConnectionPayload>
          }
          deleteMany: {
            args: Prisma.PlatformConnectionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlatformConnectionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlatformConnectionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformConnectionPayload>[]
          }
          upsert: {
            args: Prisma.PlatformConnectionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformConnectionPayload>
          }
          aggregate: {
            args: Prisma.PlatformConnectionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlatformConnection>
          }
          groupBy: {
            args: Prisma.PlatformConnectionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlatformConnectionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlatformConnectionCountArgs<ExtArgs>
            result: $Utils.Optional<PlatformConnectionCountAggregateOutputType> | number
          }
        }
      }
      Problem: {
        payload: Prisma.$ProblemPayload<ExtArgs>
        fields: Prisma.ProblemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProblemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProblemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload>
          }
          findFirst: {
            args: Prisma.ProblemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProblemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload>
          }
          findMany: {
            args: Prisma.ProblemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload>[]
          }
          create: {
            args: Prisma.ProblemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload>
          }
          createMany: {
            args: Prisma.ProblemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProblemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload>[]
          }
          delete: {
            args: Prisma.ProblemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload>
          }
          update: {
            args: Prisma.ProblemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload>
          }
          deleteMany: {
            args: Prisma.ProblemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProblemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProblemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload>[]
          }
          upsert: {
            args: Prisma.ProblemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload>
          }
          aggregate: {
            args: Prisma.ProblemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProblem>
          }
          groupBy: {
            args: Prisma.ProblemGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProblemGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProblemCountArgs<ExtArgs>
            result: $Utils.Optional<ProblemCountAggregateOutputType> | number
          }
        }
      }
      NormalizedSubmission: {
        payload: Prisma.$NormalizedSubmissionPayload<ExtArgs>
        fields: Prisma.NormalizedSubmissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NormalizedSubmissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NormalizedSubmissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NormalizedSubmissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NormalizedSubmissionPayload>
          }
          findFirst: {
            args: Prisma.NormalizedSubmissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NormalizedSubmissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NormalizedSubmissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NormalizedSubmissionPayload>
          }
          findMany: {
            args: Prisma.NormalizedSubmissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NormalizedSubmissionPayload>[]
          }
          create: {
            args: Prisma.NormalizedSubmissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NormalizedSubmissionPayload>
          }
          createMany: {
            args: Prisma.NormalizedSubmissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NormalizedSubmissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NormalizedSubmissionPayload>[]
          }
          delete: {
            args: Prisma.NormalizedSubmissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NormalizedSubmissionPayload>
          }
          update: {
            args: Prisma.NormalizedSubmissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NormalizedSubmissionPayload>
          }
          deleteMany: {
            args: Prisma.NormalizedSubmissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NormalizedSubmissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NormalizedSubmissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NormalizedSubmissionPayload>[]
          }
          upsert: {
            args: Prisma.NormalizedSubmissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NormalizedSubmissionPayload>
          }
          aggregate: {
            args: Prisma.NormalizedSubmissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNormalizedSubmission>
          }
          groupBy: {
            args: Prisma.NormalizedSubmissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<NormalizedSubmissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.NormalizedSubmissionCountArgs<ExtArgs>
            result: $Utils.Optional<NormalizedSubmissionCountAggregateOutputType> | number
          }
        }
      }
      ContestHistory: {
        payload: Prisma.$ContestHistoryPayload<ExtArgs>
        fields: Prisma.ContestHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContestHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContestHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContestHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContestHistoryPayload>
          }
          findFirst: {
            args: Prisma.ContestHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContestHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContestHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContestHistoryPayload>
          }
          findMany: {
            args: Prisma.ContestHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContestHistoryPayload>[]
          }
          create: {
            args: Prisma.ContestHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContestHistoryPayload>
          }
          createMany: {
            args: Prisma.ContestHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContestHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContestHistoryPayload>[]
          }
          delete: {
            args: Prisma.ContestHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContestHistoryPayload>
          }
          update: {
            args: Prisma.ContestHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContestHistoryPayload>
          }
          deleteMany: {
            args: Prisma.ContestHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContestHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ContestHistoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContestHistoryPayload>[]
          }
          upsert: {
            args: Prisma.ContestHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContestHistoryPayload>
          }
          aggregate: {
            args: Prisma.ContestHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContestHistory>
          }
          groupBy: {
            args: Prisma.ContestHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContestHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContestHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<ContestHistoryCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    goal?: GoalOmit
    platformConnection?: PlatformConnectionOmit
    problem?: ProblemOmit
    normalizedSubmission?: NormalizedSubmissionOmit
    contestHistory?: ContestHistoryOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    goals: number
    connections: number
    submissions: number
    contests: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    goals?: boolean | UserCountOutputTypeCountGoalsArgs
    connections?: boolean | UserCountOutputTypeCountConnectionsArgs
    submissions?: boolean | UserCountOutputTypeCountSubmissionsArgs
    contests?: boolean | UserCountOutputTypeCountContestsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGoalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GoalWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountConnectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlatformConnectionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSubmissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NormalizedSubmissionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountContestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContestHistoryWhereInput
  }


  /**
   * Count Type ProblemCountOutputType
   */

  export type ProblemCountOutputType = {
    submissions: number
  }

  export type ProblemCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submissions?: boolean | ProblemCountOutputTypeCountSubmissionsArgs
  }

  // Custom InputTypes
  /**
   * ProblemCountOutputType without action
   */
  export type ProblemCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemCountOutputType
     */
    select?: ProblemCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProblemCountOutputType without action
   */
  export type ProblemCountOutputTypeCountSubmissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NormalizedSubmissionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    goals?: boolean | User$goalsArgs<ExtArgs>
    connections?: boolean | User$connectionsArgs<ExtArgs>
    submissions?: boolean | User$submissionsArgs<ExtArgs>
    contests?: boolean | User$contestsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    goals?: boolean | User$goalsArgs<ExtArgs>
    connections?: boolean | User$connectionsArgs<ExtArgs>
    submissions?: boolean | User$submissionsArgs<ExtArgs>
    contests?: boolean | User$contestsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      goals: Prisma.$GoalPayload<ExtArgs>[]
      connections: Prisma.$PlatformConnectionPayload<ExtArgs>[]
      submissions: Prisma.$NormalizedSubmissionPayload<ExtArgs>[]
      contests: Prisma.$ContestHistoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    goals<T extends User$goalsArgs<ExtArgs> = {}>(args?: Subset<T, User$goalsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    connections<T extends User$connectionsArgs<ExtArgs> = {}>(args?: Subset<T, User$connectionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlatformConnectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    submissions<T extends User$submissionsArgs<ExtArgs> = {}>(args?: Subset<T, User$submissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NormalizedSubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    contests<T extends User$contestsArgs<ExtArgs> = {}>(args?: Subset<T, User$contestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContestHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.goals
   */
  export type User$goalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    where?: GoalWhereInput
    orderBy?: GoalOrderByWithRelationInput | GoalOrderByWithRelationInput[]
    cursor?: GoalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GoalScalarFieldEnum | GoalScalarFieldEnum[]
  }

  /**
   * User.connections
   */
  export type User$connectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformConnection
     */
    select?: PlatformConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformConnection
     */
    omit?: PlatformConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformConnectionInclude<ExtArgs> | null
    where?: PlatformConnectionWhereInput
    orderBy?: PlatformConnectionOrderByWithRelationInput | PlatformConnectionOrderByWithRelationInput[]
    cursor?: PlatformConnectionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlatformConnectionScalarFieldEnum | PlatformConnectionScalarFieldEnum[]
  }

  /**
   * User.submissions
   */
  export type User$submissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NormalizedSubmission
     */
    select?: NormalizedSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NormalizedSubmission
     */
    omit?: NormalizedSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NormalizedSubmissionInclude<ExtArgs> | null
    where?: NormalizedSubmissionWhereInput
    orderBy?: NormalizedSubmissionOrderByWithRelationInput | NormalizedSubmissionOrderByWithRelationInput[]
    cursor?: NormalizedSubmissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NormalizedSubmissionScalarFieldEnum | NormalizedSubmissionScalarFieldEnum[]
  }

  /**
   * User.contests
   */
  export type User$contestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContestHistory
     */
    select?: ContestHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContestHistory
     */
    omit?: ContestHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContestHistoryInclude<ExtArgs> | null
    where?: ContestHistoryWhereInput
    orderBy?: ContestHistoryOrderByWithRelationInput | ContestHistoryOrderByWithRelationInput[]
    cursor?: ContestHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContestHistoryScalarFieldEnum | ContestHistoryScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Goal
   */

  export type AggregateGoal = {
    _count: GoalCountAggregateOutputType | null
    _avg: GoalAvgAggregateOutputType | null
    _sum: GoalSumAggregateOutputType | null
    _min: GoalMinAggregateOutputType | null
    _max: GoalMaxAggregateOutputType | null
  }

  export type GoalAvgAggregateOutputType = {
    targetValue: number | null
    initialValue: number | null
    availableHoursPerWeek: number | null
  }

  export type GoalSumAggregateOutputType = {
    targetValue: number | null
    initialValue: number | null
    availableHoursPerWeek: number | null
  }

  export type GoalMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    category: string | null
    targetMetric: string | null
    targetValue: number | null
    initialValue: number | null
    startDate: Date | null
    deadline: Date | null
    availableHoursPerWeek: number | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GoalMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    category: string | null
    targetMetric: string | null
    targetValue: number | null
    initialValue: number | null
    startDate: Date | null
    deadline: Date | null
    availableHoursPerWeek: number | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GoalCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    category: number
    targetMetric: number
    targetValue: number
    initialValue: number
    startDate: number
    deadline: number
    availableHoursPerWeek: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GoalAvgAggregateInputType = {
    targetValue?: true
    initialValue?: true
    availableHoursPerWeek?: true
  }

  export type GoalSumAggregateInputType = {
    targetValue?: true
    initialValue?: true
    availableHoursPerWeek?: true
  }

  export type GoalMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    category?: true
    targetMetric?: true
    targetValue?: true
    initialValue?: true
    startDate?: true
    deadline?: true
    availableHoursPerWeek?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GoalMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    category?: true
    targetMetric?: true
    targetValue?: true
    initialValue?: true
    startDate?: true
    deadline?: true
    availableHoursPerWeek?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GoalCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    category?: true
    targetMetric?: true
    targetValue?: true
    initialValue?: true
    startDate?: true
    deadline?: true
    availableHoursPerWeek?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GoalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Goal to aggregate.
     */
    where?: GoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Goals to fetch.
     */
    orderBy?: GoalOrderByWithRelationInput | GoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Goals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Goals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Goals
    **/
    _count?: true | GoalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GoalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GoalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GoalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GoalMaxAggregateInputType
  }

  export type GetGoalAggregateType<T extends GoalAggregateArgs> = {
        [P in keyof T & keyof AggregateGoal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGoal[P]>
      : GetScalarType<T[P], AggregateGoal[P]>
  }




  export type GoalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GoalWhereInput
    orderBy?: GoalOrderByWithAggregationInput | GoalOrderByWithAggregationInput[]
    by: GoalScalarFieldEnum[] | GoalScalarFieldEnum
    having?: GoalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GoalCountAggregateInputType | true
    _avg?: GoalAvgAggregateInputType
    _sum?: GoalSumAggregateInputType
    _min?: GoalMinAggregateInputType
    _max?: GoalMaxAggregateInputType
  }

  export type GoalGroupByOutputType = {
    id: string
    userId: string
    title: string
    category: string
    targetMetric: string
    targetValue: number
    initialValue: number
    startDate: Date
    deadline: Date
    availableHoursPerWeek: number | null
    status: string
    createdAt: Date
    updatedAt: Date
    _count: GoalCountAggregateOutputType | null
    _avg: GoalAvgAggregateOutputType | null
    _sum: GoalSumAggregateOutputType | null
    _min: GoalMinAggregateOutputType | null
    _max: GoalMaxAggregateOutputType | null
  }

  type GetGoalGroupByPayload<T extends GoalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GoalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GoalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GoalGroupByOutputType[P]>
            : GetScalarType<T[P], GoalGroupByOutputType[P]>
        }
      >
    >


  export type GoalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    category?: boolean
    targetMetric?: boolean
    targetValue?: boolean
    initialValue?: boolean
    startDate?: boolean
    deadline?: boolean
    availableHoursPerWeek?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["goal"]>

  export type GoalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    category?: boolean
    targetMetric?: boolean
    targetValue?: boolean
    initialValue?: boolean
    startDate?: boolean
    deadline?: boolean
    availableHoursPerWeek?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["goal"]>

  export type GoalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    category?: boolean
    targetMetric?: boolean
    targetValue?: boolean
    initialValue?: boolean
    startDate?: boolean
    deadline?: boolean
    availableHoursPerWeek?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["goal"]>

  export type GoalSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    category?: boolean
    targetMetric?: boolean
    targetValue?: boolean
    initialValue?: boolean
    startDate?: boolean
    deadline?: boolean
    availableHoursPerWeek?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GoalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "title" | "category" | "targetMetric" | "targetValue" | "initialValue" | "startDate" | "deadline" | "availableHoursPerWeek" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["goal"]>
  export type GoalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type GoalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type GoalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $GoalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Goal"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      title: string
      category: string
      targetMetric: string
      targetValue: number
      initialValue: number
      startDate: Date
      deadline: Date
      availableHoursPerWeek: number | null
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["goal"]>
    composites: {}
  }

  type GoalGetPayload<S extends boolean | null | undefined | GoalDefaultArgs> = $Result.GetResult<Prisma.$GoalPayload, S>

  type GoalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GoalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GoalCountAggregateInputType | true
    }

  export interface GoalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Goal'], meta: { name: 'Goal' } }
    /**
     * Find zero or one Goal that matches the filter.
     * @param {GoalFindUniqueArgs} args - Arguments to find a Goal
     * @example
     * // Get one Goal
     * const goal = await prisma.goal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GoalFindUniqueArgs>(args: SelectSubset<T, GoalFindUniqueArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Goal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GoalFindUniqueOrThrowArgs} args - Arguments to find a Goal
     * @example
     * // Get one Goal
     * const goal = await prisma.goal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GoalFindUniqueOrThrowArgs>(args: SelectSubset<T, GoalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Goal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalFindFirstArgs} args - Arguments to find a Goal
     * @example
     * // Get one Goal
     * const goal = await prisma.goal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GoalFindFirstArgs>(args?: SelectSubset<T, GoalFindFirstArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Goal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalFindFirstOrThrowArgs} args - Arguments to find a Goal
     * @example
     * // Get one Goal
     * const goal = await prisma.goal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GoalFindFirstOrThrowArgs>(args?: SelectSubset<T, GoalFindFirstOrThrowArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Goals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Goals
     * const goals = await prisma.goal.findMany()
     * 
     * // Get first 10 Goals
     * const goals = await prisma.goal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const goalWithIdOnly = await prisma.goal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GoalFindManyArgs>(args?: SelectSubset<T, GoalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Goal.
     * @param {GoalCreateArgs} args - Arguments to create a Goal.
     * @example
     * // Create one Goal
     * const Goal = await prisma.goal.create({
     *   data: {
     *     // ... data to create a Goal
     *   }
     * })
     * 
     */
    create<T extends GoalCreateArgs>(args: SelectSubset<T, GoalCreateArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Goals.
     * @param {GoalCreateManyArgs} args - Arguments to create many Goals.
     * @example
     * // Create many Goals
     * const goal = await prisma.goal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GoalCreateManyArgs>(args?: SelectSubset<T, GoalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Goals and returns the data saved in the database.
     * @param {GoalCreateManyAndReturnArgs} args - Arguments to create many Goals.
     * @example
     * // Create many Goals
     * const goal = await prisma.goal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Goals and only return the `id`
     * const goalWithIdOnly = await prisma.goal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GoalCreateManyAndReturnArgs>(args?: SelectSubset<T, GoalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Goal.
     * @param {GoalDeleteArgs} args - Arguments to delete one Goal.
     * @example
     * // Delete one Goal
     * const Goal = await prisma.goal.delete({
     *   where: {
     *     // ... filter to delete one Goal
     *   }
     * })
     * 
     */
    delete<T extends GoalDeleteArgs>(args: SelectSubset<T, GoalDeleteArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Goal.
     * @param {GoalUpdateArgs} args - Arguments to update one Goal.
     * @example
     * // Update one Goal
     * const goal = await prisma.goal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GoalUpdateArgs>(args: SelectSubset<T, GoalUpdateArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Goals.
     * @param {GoalDeleteManyArgs} args - Arguments to filter Goals to delete.
     * @example
     * // Delete a few Goals
     * const { count } = await prisma.goal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GoalDeleteManyArgs>(args?: SelectSubset<T, GoalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Goals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Goals
     * const goal = await prisma.goal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GoalUpdateManyArgs>(args: SelectSubset<T, GoalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Goals and returns the data updated in the database.
     * @param {GoalUpdateManyAndReturnArgs} args - Arguments to update many Goals.
     * @example
     * // Update many Goals
     * const goal = await prisma.goal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Goals and only return the `id`
     * const goalWithIdOnly = await prisma.goal.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GoalUpdateManyAndReturnArgs>(args: SelectSubset<T, GoalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Goal.
     * @param {GoalUpsertArgs} args - Arguments to update or create a Goal.
     * @example
     * // Update or create a Goal
     * const goal = await prisma.goal.upsert({
     *   create: {
     *     // ... data to create a Goal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Goal we want to update
     *   }
     * })
     */
    upsert<T extends GoalUpsertArgs>(args: SelectSubset<T, GoalUpsertArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Goals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalCountArgs} args - Arguments to filter Goals to count.
     * @example
     * // Count the number of Goals
     * const count = await prisma.goal.count({
     *   where: {
     *     // ... the filter for the Goals we want to count
     *   }
     * })
    **/
    count<T extends GoalCountArgs>(
      args?: Subset<T, GoalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GoalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Goal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GoalAggregateArgs>(args: Subset<T, GoalAggregateArgs>): Prisma.PrismaPromise<GetGoalAggregateType<T>>

    /**
     * Group by Goal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GoalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GoalGroupByArgs['orderBy'] }
        : { orderBy?: GoalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GoalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGoalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Goal model
   */
  readonly fields: GoalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Goal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GoalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Goal model
   */
  interface GoalFieldRefs {
    readonly id: FieldRef<"Goal", 'String'>
    readonly userId: FieldRef<"Goal", 'String'>
    readonly title: FieldRef<"Goal", 'String'>
    readonly category: FieldRef<"Goal", 'String'>
    readonly targetMetric: FieldRef<"Goal", 'String'>
    readonly targetValue: FieldRef<"Goal", 'Float'>
    readonly initialValue: FieldRef<"Goal", 'Float'>
    readonly startDate: FieldRef<"Goal", 'DateTime'>
    readonly deadline: FieldRef<"Goal", 'DateTime'>
    readonly availableHoursPerWeek: FieldRef<"Goal", 'Float'>
    readonly status: FieldRef<"Goal", 'String'>
    readonly createdAt: FieldRef<"Goal", 'DateTime'>
    readonly updatedAt: FieldRef<"Goal", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Goal findUnique
   */
  export type GoalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * Filter, which Goal to fetch.
     */
    where: GoalWhereUniqueInput
  }

  /**
   * Goal findUniqueOrThrow
   */
  export type GoalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * Filter, which Goal to fetch.
     */
    where: GoalWhereUniqueInput
  }

  /**
   * Goal findFirst
   */
  export type GoalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * Filter, which Goal to fetch.
     */
    where?: GoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Goals to fetch.
     */
    orderBy?: GoalOrderByWithRelationInput | GoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Goals.
     */
    cursor?: GoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Goals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Goals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Goals.
     */
    distinct?: GoalScalarFieldEnum | GoalScalarFieldEnum[]
  }

  /**
   * Goal findFirstOrThrow
   */
  export type GoalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * Filter, which Goal to fetch.
     */
    where?: GoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Goals to fetch.
     */
    orderBy?: GoalOrderByWithRelationInput | GoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Goals.
     */
    cursor?: GoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Goals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Goals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Goals.
     */
    distinct?: GoalScalarFieldEnum | GoalScalarFieldEnum[]
  }

  /**
   * Goal findMany
   */
  export type GoalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * Filter, which Goals to fetch.
     */
    where?: GoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Goals to fetch.
     */
    orderBy?: GoalOrderByWithRelationInput | GoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Goals.
     */
    cursor?: GoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Goals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Goals.
     */
    skip?: number
    distinct?: GoalScalarFieldEnum | GoalScalarFieldEnum[]
  }

  /**
   * Goal create
   */
  export type GoalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * The data needed to create a Goal.
     */
    data: XOR<GoalCreateInput, GoalUncheckedCreateInput>
  }

  /**
   * Goal createMany
   */
  export type GoalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Goals.
     */
    data: GoalCreateManyInput | GoalCreateManyInput[]
  }

  /**
   * Goal createManyAndReturn
   */
  export type GoalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * The data used to create many Goals.
     */
    data: GoalCreateManyInput | GoalCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Goal update
   */
  export type GoalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * The data needed to update a Goal.
     */
    data: XOR<GoalUpdateInput, GoalUncheckedUpdateInput>
    /**
     * Choose, which Goal to update.
     */
    where: GoalWhereUniqueInput
  }

  /**
   * Goal updateMany
   */
  export type GoalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Goals.
     */
    data: XOR<GoalUpdateManyMutationInput, GoalUncheckedUpdateManyInput>
    /**
     * Filter which Goals to update
     */
    where?: GoalWhereInput
    /**
     * Limit how many Goals to update.
     */
    limit?: number
  }

  /**
   * Goal updateManyAndReturn
   */
  export type GoalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * The data used to update Goals.
     */
    data: XOR<GoalUpdateManyMutationInput, GoalUncheckedUpdateManyInput>
    /**
     * Filter which Goals to update
     */
    where?: GoalWhereInput
    /**
     * Limit how many Goals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Goal upsert
   */
  export type GoalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * The filter to search for the Goal to update in case it exists.
     */
    where: GoalWhereUniqueInput
    /**
     * In case the Goal found by the `where` argument doesn't exist, create a new Goal with this data.
     */
    create: XOR<GoalCreateInput, GoalUncheckedCreateInput>
    /**
     * In case the Goal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GoalUpdateInput, GoalUncheckedUpdateInput>
  }

  /**
   * Goal delete
   */
  export type GoalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * Filter which Goal to delete.
     */
    where: GoalWhereUniqueInput
  }

  /**
   * Goal deleteMany
   */
  export type GoalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Goals to delete
     */
    where?: GoalWhereInput
    /**
     * Limit how many Goals to delete.
     */
    limit?: number
  }

  /**
   * Goal without action
   */
  export type GoalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
  }


  /**
   * Model PlatformConnection
   */

  export type AggregatePlatformConnection = {
    _count: PlatformConnectionCountAggregateOutputType | null
    _min: PlatformConnectionMinAggregateOutputType | null
    _max: PlatformConnectionMaxAggregateOutputType | null
  }

  export type PlatformConnectionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    platform: string | null
    username: string | null
    status: string | null
    lastError: string | null
    lastSyncedAt: Date | null
    profileData: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlatformConnectionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    platform: string | null
    username: string | null
    status: string | null
    lastError: string | null
    lastSyncedAt: Date | null
    profileData: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlatformConnectionCountAggregateOutputType = {
    id: number
    userId: number
    platform: number
    username: number
    status: number
    lastError: number
    lastSyncedAt: number
    profileData: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PlatformConnectionMinAggregateInputType = {
    id?: true
    userId?: true
    platform?: true
    username?: true
    status?: true
    lastError?: true
    lastSyncedAt?: true
    profileData?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlatformConnectionMaxAggregateInputType = {
    id?: true
    userId?: true
    platform?: true
    username?: true
    status?: true
    lastError?: true
    lastSyncedAt?: true
    profileData?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlatformConnectionCountAggregateInputType = {
    id?: true
    userId?: true
    platform?: true
    username?: true
    status?: true
    lastError?: true
    lastSyncedAt?: true
    profileData?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PlatformConnectionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlatformConnection to aggregate.
     */
    where?: PlatformConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlatformConnections to fetch.
     */
    orderBy?: PlatformConnectionOrderByWithRelationInput | PlatformConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlatformConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlatformConnections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlatformConnections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PlatformConnections
    **/
    _count?: true | PlatformConnectionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlatformConnectionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlatformConnectionMaxAggregateInputType
  }

  export type GetPlatformConnectionAggregateType<T extends PlatformConnectionAggregateArgs> = {
        [P in keyof T & keyof AggregatePlatformConnection]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlatformConnection[P]>
      : GetScalarType<T[P], AggregatePlatformConnection[P]>
  }




  export type PlatformConnectionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlatformConnectionWhereInput
    orderBy?: PlatformConnectionOrderByWithAggregationInput | PlatformConnectionOrderByWithAggregationInput[]
    by: PlatformConnectionScalarFieldEnum[] | PlatformConnectionScalarFieldEnum
    having?: PlatformConnectionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlatformConnectionCountAggregateInputType | true
    _min?: PlatformConnectionMinAggregateInputType
    _max?: PlatformConnectionMaxAggregateInputType
  }

  export type PlatformConnectionGroupByOutputType = {
    id: string
    userId: string
    platform: string
    username: string
    status: string
    lastError: string | null
    lastSyncedAt: Date | null
    profileData: string | null
    createdAt: Date
    updatedAt: Date
    _count: PlatformConnectionCountAggregateOutputType | null
    _min: PlatformConnectionMinAggregateOutputType | null
    _max: PlatformConnectionMaxAggregateOutputType | null
  }

  type GetPlatformConnectionGroupByPayload<T extends PlatformConnectionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlatformConnectionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlatformConnectionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlatformConnectionGroupByOutputType[P]>
            : GetScalarType<T[P], PlatformConnectionGroupByOutputType[P]>
        }
      >
    >


  export type PlatformConnectionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    platform?: boolean
    username?: boolean
    status?: boolean
    lastError?: boolean
    lastSyncedAt?: boolean
    profileData?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["platformConnection"]>

  export type PlatformConnectionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    platform?: boolean
    username?: boolean
    status?: boolean
    lastError?: boolean
    lastSyncedAt?: boolean
    profileData?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["platformConnection"]>

  export type PlatformConnectionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    platform?: boolean
    username?: boolean
    status?: boolean
    lastError?: boolean
    lastSyncedAt?: boolean
    profileData?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["platformConnection"]>

  export type PlatformConnectionSelectScalar = {
    id?: boolean
    userId?: boolean
    platform?: boolean
    username?: boolean
    status?: boolean
    lastError?: boolean
    lastSyncedAt?: boolean
    profileData?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PlatformConnectionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "platform" | "username" | "status" | "lastError" | "lastSyncedAt" | "profileData" | "createdAt" | "updatedAt", ExtArgs["result"]["platformConnection"]>
  export type PlatformConnectionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PlatformConnectionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PlatformConnectionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PlatformConnectionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PlatformConnection"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      platform: string
      username: string
      status: string
      lastError: string | null
      lastSyncedAt: Date | null
      profileData: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["platformConnection"]>
    composites: {}
  }

  type PlatformConnectionGetPayload<S extends boolean | null | undefined | PlatformConnectionDefaultArgs> = $Result.GetResult<Prisma.$PlatformConnectionPayload, S>

  type PlatformConnectionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlatformConnectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlatformConnectionCountAggregateInputType | true
    }

  export interface PlatformConnectionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PlatformConnection'], meta: { name: 'PlatformConnection' } }
    /**
     * Find zero or one PlatformConnection that matches the filter.
     * @param {PlatformConnectionFindUniqueArgs} args - Arguments to find a PlatformConnection
     * @example
     * // Get one PlatformConnection
     * const platformConnection = await prisma.platformConnection.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlatformConnectionFindUniqueArgs>(args: SelectSubset<T, PlatformConnectionFindUniqueArgs<ExtArgs>>): Prisma__PlatformConnectionClient<$Result.GetResult<Prisma.$PlatformConnectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PlatformConnection that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlatformConnectionFindUniqueOrThrowArgs} args - Arguments to find a PlatformConnection
     * @example
     * // Get one PlatformConnection
     * const platformConnection = await prisma.platformConnection.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlatformConnectionFindUniqueOrThrowArgs>(args: SelectSubset<T, PlatformConnectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlatformConnectionClient<$Result.GetResult<Prisma.$PlatformConnectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlatformConnection that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformConnectionFindFirstArgs} args - Arguments to find a PlatformConnection
     * @example
     * // Get one PlatformConnection
     * const platformConnection = await prisma.platformConnection.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlatformConnectionFindFirstArgs>(args?: SelectSubset<T, PlatformConnectionFindFirstArgs<ExtArgs>>): Prisma__PlatformConnectionClient<$Result.GetResult<Prisma.$PlatformConnectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlatformConnection that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformConnectionFindFirstOrThrowArgs} args - Arguments to find a PlatformConnection
     * @example
     * // Get one PlatformConnection
     * const platformConnection = await prisma.platformConnection.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlatformConnectionFindFirstOrThrowArgs>(args?: SelectSubset<T, PlatformConnectionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlatformConnectionClient<$Result.GetResult<Prisma.$PlatformConnectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PlatformConnections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformConnectionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PlatformConnections
     * const platformConnections = await prisma.platformConnection.findMany()
     * 
     * // Get first 10 PlatformConnections
     * const platformConnections = await prisma.platformConnection.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const platformConnectionWithIdOnly = await prisma.platformConnection.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlatformConnectionFindManyArgs>(args?: SelectSubset<T, PlatformConnectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlatformConnectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PlatformConnection.
     * @param {PlatformConnectionCreateArgs} args - Arguments to create a PlatformConnection.
     * @example
     * // Create one PlatformConnection
     * const PlatformConnection = await prisma.platformConnection.create({
     *   data: {
     *     // ... data to create a PlatformConnection
     *   }
     * })
     * 
     */
    create<T extends PlatformConnectionCreateArgs>(args: SelectSubset<T, PlatformConnectionCreateArgs<ExtArgs>>): Prisma__PlatformConnectionClient<$Result.GetResult<Prisma.$PlatformConnectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PlatformConnections.
     * @param {PlatformConnectionCreateManyArgs} args - Arguments to create many PlatformConnections.
     * @example
     * // Create many PlatformConnections
     * const platformConnection = await prisma.platformConnection.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlatformConnectionCreateManyArgs>(args?: SelectSubset<T, PlatformConnectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PlatformConnections and returns the data saved in the database.
     * @param {PlatformConnectionCreateManyAndReturnArgs} args - Arguments to create many PlatformConnections.
     * @example
     * // Create many PlatformConnections
     * const platformConnection = await prisma.platformConnection.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PlatformConnections and only return the `id`
     * const platformConnectionWithIdOnly = await prisma.platformConnection.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlatformConnectionCreateManyAndReturnArgs>(args?: SelectSubset<T, PlatformConnectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlatformConnectionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PlatformConnection.
     * @param {PlatformConnectionDeleteArgs} args - Arguments to delete one PlatformConnection.
     * @example
     * // Delete one PlatformConnection
     * const PlatformConnection = await prisma.platformConnection.delete({
     *   where: {
     *     // ... filter to delete one PlatformConnection
     *   }
     * })
     * 
     */
    delete<T extends PlatformConnectionDeleteArgs>(args: SelectSubset<T, PlatformConnectionDeleteArgs<ExtArgs>>): Prisma__PlatformConnectionClient<$Result.GetResult<Prisma.$PlatformConnectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PlatformConnection.
     * @param {PlatformConnectionUpdateArgs} args - Arguments to update one PlatformConnection.
     * @example
     * // Update one PlatformConnection
     * const platformConnection = await prisma.platformConnection.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlatformConnectionUpdateArgs>(args: SelectSubset<T, PlatformConnectionUpdateArgs<ExtArgs>>): Prisma__PlatformConnectionClient<$Result.GetResult<Prisma.$PlatformConnectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PlatformConnections.
     * @param {PlatformConnectionDeleteManyArgs} args - Arguments to filter PlatformConnections to delete.
     * @example
     * // Delete a few PlatformConnections
     * const { count } = await prisma.platformConnection.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlatformConnectionDeleteManyArgs>(args?: SelectSubset<T, PlatformConnectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlatformConnections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformConnectionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PlatformConnections
     * const platformConnection = await prisma.platformConnection.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlatformConnectionUpdateManyArgs>(args: SelectSubset<T, PlatformConnectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlatformConnections and returns the data updated in the database.
     * @param {PlatformConnectionUpdateManyAndReturnArgs} args - Arguments to update many PlatformConnections.
     * @example
     * // Update many PlatformConnections
     * const platformConnection = await prisma.platformConnection.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PlatformConnections and only return the `id`
     * const platformConnectionWithIdOnly = await prisma.platformConnection.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlatformConnectionUpdateManyAndReturnArgs>(args: SelectSubset<T, PlatformConnectionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlatformConnectionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PlatformConnection.
     * @param {PlatformConnectionUpsertArgs} args - Arguments to update or create a PlatformConnection.
     * @example
     * // Update or create a PlatformConnection
     * const platformConnection = await prisma.platformConnection.upsert({
     *   create: {
     *     // ... data to create a PlatformConnection
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PlatformConnection we want to update
     *   }
     * })
     */
    upsert<T extends PlatformConnectionUpsertArgs>(args: SelectSubset<T, PlatformConnectionUpsertArgs<ExtArgs>>): Prisma__PlatformConnectionClient<$Result.GetResult<Prisma.$PlatformConnectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PlatformConnections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformConnectionCountArgs} args - Arguments to filter PlatformConnections to count.
     * @example
     * // Count the number of PlatformConnections
     * const count = await prisma.platformConnection.count({
     *   where: {
     *     // ... the filter for the PlatformConnections we want to count
     *   }
     * })
    **/
    count<T extends PlatformConnectionCountArgs>(
      args?: Subset<T, PlatformConnectionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlatformConnectionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PlatformConnection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformConnectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlatformConnectionAggregateArgs>(args: Subset<T, PlatformConnectionAggregateArgs>): Prisma.PrismaPromise<GetPlatformConnectionAggregateType<T>>

    /**
     * Group by PlatformConnection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformConnectionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlatformConnectionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlatformConnectionGroupByArgs['orderBy'] }
        : { orderBy?: PlatformConnectionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlatformConnectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlatformConnectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PlatformConnection model
   */
  readonly fields: PlatformConnectionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PlatformConnection.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlatformConnectionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PlatformConnection model
   */
  interface PlatformConnectionFieldRefs {
    readonly id: FieldRef<"PlatformConnection", 'String'>
    readonly userId: FieldRef<"PlatformConnection", 'String'>
    readonly platform: FieldRef<"PlatformConnection", 'String'>
    readonly username: FieldRef<"PlatformConnection", 'String'>
    readonly status: FieldRef<"PlatformConnection", 'String'>
    readonly lastError: FieldRef<"PlatformConnection", 'String'>
    readonly lastSyncedAt: FieldRef<"PlatformConnection", 'DateTime'>
    readonly profileData: FieldRef<"PlatformConnection", 'String'>
    readonly createdAt: FieldRef<"PlatformConnection", 'DateTime'>
    readonly updatedAt: FieldRef<"PlatformConnection", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PlatformConnection findUnique
   */
  export type PlatformConnectionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformConnection
     */
    select?: PlatformConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformConnection
     */
    omit?: PlatformConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformConnectionInclude<ExtArgs> | null
    /**
     * Filter, which PlatformConnection to fetch.
     */
    where: PlatformConnectionWhereUniqueInput
  }

  /**
   * PlatformConnection findUniqueOrThrow
   */
  export type PlatformConnectionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformConnection
     */
    select?: PlatformConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformConnection
     */
    omit?: PlatformConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformConnectionInclude<ExtArgs> | null
    /**
     * Filter, which PlatformConnection to fetch.
     */
    where: PlatformConnectionWhereUniqueInput
  }

  /**
   * PlatformConnection findFirst
   */
  export type PlatformConnectionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformConnection
     */
    select?: PlatformConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformConnection
     */
    omit?: PlatformConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformConnectionInclude<ExtArgs> | null
    /**
     * Filter, which PlatformConnection to fetch.
     */
    where?: PlatformConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlatformConnections to fetch.
     */
    orderBy?: PlatformConnectionOrderByWithRelationInput | PlatformConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlatformConnections.
     */
    cursor?: PlatformConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlatformConnections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlatformConnections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlatformConnections.
     */
    distinct?: PlatformConnectionScalarFieldEnum | PlatformConnectionScalarFieldEnum[]
  }

  /**
   * PlatformConnection findFirstOrThrow
   */
  export type PlatformConnectionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformConnection
     */
    select?: PlatformConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformConnection
     */
    omit?: PlatformConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformConnectionInclude<ExtArgs> | null
    /**
     * Filter, which PlatformConnection to fetch.
     */
    where?: PlatformConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlatformConnections to fetch.
     */
    orderBy?: PlatformConnectionOrderByWithRelationInput | PlatformConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlatformConnections.
     */
    cursor?: PlatformConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlatformConnections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlatformConnections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlatformConnections.
     */
    distinct?: PlatformConnectionScalarFieldEnum | PlatformConnectionScalarFieldEnum[]
  }

  /**
   * PlatformConnection findMany
   */
  export type PlatformConnectionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformConnection
     */
    select?: PlatformConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformConnection
     */
    omit?: PlatformConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformConnectionInclude<ExtArgs> | null
    /**
     * Filter, which PlatformConnections to fetch.
     */
    where?: PlatformConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlatformConnections to fetch.
     */
    orderBy?: PlatformConnectionOrderByWithRelationInput | PlatformConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PlatformConnections.
     */
    cursor?: PlatformConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlatformConnections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlatformConnections.
     */
    skip?: number
    distinct?: PlatformConnectionScalarFieldEnum | PlatformConnectionScalarFieldEnum[]
  }

  /**
   * PlatformConnection create
   */
  export type PlatformConnectionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformConnection
     */
    select?: PlatformConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformConnection
     */
    omit?: PlatformConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformConnectionInclude<ExtArgs> | null
    /**
     * The data needed to create a PlatformConnection.
     */
    data: XOR<PlatformConnectionCreateInput, PlatformConnectionUncheckedCreateInput>
  }

  /**
   * PlatformConnection createMany
   */
  export type PlatformConnectionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PlatformConnections.
     */
    data: PlatformConnectionCreateManyInput | PlatformConnectionCreateManyInput[]
  }

  /**
   * PlatformConnection createManyAndReturn
   */
  export type PlatformConnectionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformConnection
     */
    select?: PlatformConnectionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformConnection
     */
    omit?: PlatformConnectionOmit<ExtArgs> | null
    /**
     * The data used to create many PlatformConnections.
     */
    data: PlatformConnectionCreateManyInput | PlatformConnectionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformConnectionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlatformConnection update
   */
  export type PlatformConnectionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformConnection
     */
    select?: PlatformConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformConnection
     */
    omit?: PlatformConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformConnectionInclude<ExtArgs> | null
    /**
     * The data needed to update a PlatformConnection.
     */
    data: XOR<PlatformConnectionUpdateInput, PlatformConnectionUncheckedUpdateInput>
    /**
     * Choose, which PlatformConnection to update.
     */
    where: PlatformConnectionWhereUniqueInput
  }

  /**
   * PlatformConnection updateMany
   */
  export type PlatformConnectionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PlatformConnections.
     */
    data: XOR<PlatformConnectionUpdateManyMutationInput, PlatformConnectionUncheckedUpdateManyInput>
    /**
     * Filter which PlatformConnections to update
     */
    where?: PlatformConnectionWhereInput
    /**
     * Limit how many PlatformConnections to update.
     */
    limit?: number
  }

  /**
   * PlatformConnection updateManyAndReturn
   */
  export type PlatformConnectionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformConnection
     */
    select?: PlatformConnectionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformConnection
     */
    omit?: PlatformConnectionOmit<ExtArgs> | null
    /**
     * The data used to update PlatformConnections.
     */
    data: XOR<PlatformConnectionUpdateManyMutationInput, PlatformConnectionUncheckedUpdateManyInput>
    /**
     * Filter which PlatformConnections to update
     */
    where?: PlatformConnectionWhereInput
    /**
     * Limit how many PlatformConnections to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformConnectionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlatformConnection upsert
   */
  export type PlatformConnectionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformConnection
     */
    select?: PlatformConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformConnection
     */
    omit?: PlatformConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformConnectionInclude<ExtArgs> | null
    /**
     * The filter to search for the PlatformConnection to update in case it exists.
     */
    where: PlatformConnectionWhereUniqueInput
    /**
     * In case the PlatformConnection found by the `where` argument doesn't exist, create a new PlatformConnection with this data.
     */
    create: XOR<PlatformConnectionCreateInput, PlatformConnectionUncheckedCreateInput>
    /**
     * In case the PlatformConnection was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlatformConnectionUpdateInput, PlatformConnectionUncheckedUpdateInput>
  }

  /**
   * PlatformConnection delete
   */
  export type PlatformConnectionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformConnection
     */
    select?: PlatformConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformConnection
     */
    omit?: PlatformConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformConnectionInclude<ExtArgs> | null
    /**
     * Filter which PlatformConnection to delete.
     */
    where: PlatformConnectionWhereUniqueInput
  }

  /**
   * PlatformConnection deleteMany
   */
  export type PlatformConnectionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlatformConnections to delete
     */
    where?: PlatformConnectionWhereInput
    /**
     * Limit how many PlatformConnections to delete.
     */
    limit?: number
  }

  /**
   * PlatformConnection without action
   */
  export type PlatformConnectionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformConnection
     */
    select?: PlatformConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformConnection
     */
    omit?: PlatformConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformConnectionInclude<ExtArgs> | null
  }


  /**
   * Model Problem
   */

  export type AggregateProblem = {
    _count: ProblemCountAggregateOutputType | null
    _avg: ProblemAvgAggregateOutputType | null
    _sum: ProblemSumAggregateOutputType | null
    _min: ProblemMinAggregateOutputType | null
    _max: ProblemMaxAggregateOutputType | null
  }

  export type ProblemAvgAggregateOutputType = {
    numericDifficulty: number | null
  }

  export type ProblemSumAggregateOutputType = {
    numericDifficulty: number | null
  }

  export type ProblemMinAggregateOutputType = {
    id: string | null
    platform: string | null
    externalProblemId: string | null
    title: string | null
    difficulty: string | null
    numericDifficulty: number | null
    topics: string | null
    rawTags: string | null
    metadata: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProblemMaxAggregateOutputType = {
    id: string | null
    platform: string | null
    externalProblemId: string | null
    title: string | null
    difficulty: string | null
    numericDifficulty: number | null
    topics: string | null
    rawTags: string | null
    metadata: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProblemCountAggregateOutputType = {
    id: number
    platform: number
    externalProblemId: number
    title: number
    difficulty: number
    numericDifficulty: number
    topics: number
    rawTags: number
    metadata: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProblemAvgAggregateInputType = {
    numericDifficulty?: true
  }

  export type ProblemSumAggregateInputType = {
    numericDifficulty?: true
  }

  export type ProblemMinAggregateInputType = {
    id?: true
    platform?: true
    externalProblemId?: true
    title?: true
    difficulty?: true
    numericDifficulty?: true
    topics?: true
    rawTags?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProblemMaxAggregateInputType = {
    id?: true
    platform?: true
    externalProblemId?: true
    title?: true
    difficulty?: true
    numericDifficulty?: true
    topics?: true
    rawTags?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProblemCountAggregateInputType = {
    id?: true
    platform?: true
    externalProblemId?: true
    title?: true
    difficulty?: true
    numericDifficulty?: true
    topics?: true
    rawTags?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProblemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Problem to aggregate.
     */
    where?: ProblemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Problems to fetch.
     */
    orderBy?: ProblemOrderByWithRelationInput | ProblemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProblemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Problems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Problems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Problems
    **/
    _count?: true | ProblemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProblemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProblemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProblemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProblemMaxAggregateInputType
  }

  export type GetProblemAggregateType<T extends ProblemAggregateArgs> = {
        [P in keyof T & keyof AggregateProblem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProblem[P]>
      : GetScalarType<T[P], AggregateProblem[P]>
  }




  export type ProblemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProblemWhereInput
    orderBy?: ProblemOrderByWithAggregationInput | ProblemOrderByWithAggregationInput[]
    by: ProblemScalarFieldEnum[] | ProblemScalarFieldEnum
    having?: ProblemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProblemCountAggregateInputType | true
    _avg?: ProblemAvgAggregateInputType
    _sum?: ProblemSumAggregateInputType
    _min?: ProblemMinAggregateInputType
    _max?: ProblemMaxAggregateInputType
  }

  export type ProblemGroupByOutputType = {
    id: string
    platform: string
    externalProblemId: string
    title: string
    difficulty: string
    numericDifficulty: number | null
    topics: string
    rawTags: string
    metadata: string | null
    createdAt: Date
    updatedAt: Date
    _count: ProblemCountAggregateOutputType | null
    _avg: ProblemAvgAggregateOutputType | null
    _sum: ProblemSumAggregateOutputType | null
    _min: ProblemMinAggregateOutputType | null
    _max: ProblemMaxAggregateOutputType | null
  }

  type GetProblemGroupByPayload<T extends ProblemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProblemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProblemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProblemGroupByOutputType[P]>
            : GetScalarType<T[P], ProblemGroupByOutputType[P]>
        }
      >
    >


  export type ProblemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    platform?: boolean
    externalProblemId?: boolean
    title?: boolean
    difficulty?: boolean
    numericDifficulty?: boolean
    topics?: boolean
    rawTags?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    submissions?: boolean | Problem$submissionsArgs<ExtArgs>
    _count?: boolean | ProblemCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["problem"]>

  export type ProblemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    platform?: boolean
    externalProblemId?: boolean
    title?: boolean
    difficulty?: boolean
    numericDifficulty?: boolean
    topics?: boolean
    rawTags?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["problem"]>

  export type ProblemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    platform?: boolean
    externalProblemId?: boolean
    title?: boolean
    difficulty?: boolean
    numericDifficulty?: boolean
    topics?: boolean
    rawTags?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["problem"]>

  export type ProblemSelectScalar = {
    id?: boolean
    platform?: boolean
    externalProblemId?: boolean
    title?: boolean
    difficulty?: boolean
    numericDifficulty?: boolean
    topics?: boolean
    rawTags?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProblemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "platform" | "externalProblemId" | "title" | "difficulty" | "numericDifficulty" | "topics" | "rawTags" | "metadata" | "createdAt" | "updatedAt", ExtArgs["result"]["problem"]>
  export type ProblemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submissions?: boolean | Problem$submissionsArgs<ExtArgs>
    _count?: boolean | ProblemCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProblemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProblemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProblemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Problem"
    objects: {
      submissions: Prisma.$NormalizedSubmissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      platform: string
      externalProblemId: string
      title: string
      difficulty: string
      numericDifficulty: number | null
      topics: string
      rawTags: string
      metadata: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["problem"]>
    composites: {}
  }

  type ProblemGetPayload<S extends boolean | null | undefined | ProblemDefaultArgs> = $Result.GetResult<Prisma.$ProblemPayload, S>

  type ProblemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProblemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProblemCountAggregateInputType | true
    }

  export interface ProblemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Problem'], meta: { name: 'Problem' } }
    /**
     * Find zero or one Problem that matches the filter.
     * @param {ProblemFindUniqueArgs} args - Arguments to find a Problem
     * @example
     * // Get one Problem
     * const problem = await prisma.problem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProblemFindUniqueArgs>(args: SelectSubset<T, ProblemFindUniqueArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Problem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProblemFindUniqueOrThrowArgs} args - Arguments to find a Problem
     * @example
     * // Get one Problem
     * const problem = await prisma.problem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProblemFindUniqueOrThrowArgs>(args: SelectSubset<T, ProblemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Problem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemFindFirstArgs} args - Arguments to find a Problem
     * @example
     * // Get one Problem
     * const problem = await prisma.problem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProblemFindFirstArgs>(args?: SelectSubset<T, ProblemFindFirstArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Problem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemFindFirstOrThrowArgs} args - Arguments to find a Problem
     * @example
     * // Get one Problem
     * const problem = await prisma.problem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProblemFindFirstOrThrowArgs>(args?: SelectSubset<T, ProblemFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Problems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Problems
     * const problems = await prisma.problem.findMany()
     * 
     * // Get first 10 Problems
     * const problems = await prisma.problem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const problemWithIdOnly = await prisma.problem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProblemFindManyArgs>(args?: SelectSubset<T, ProblemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Problem.
     * @param {ProblemCreateArgs} args - Arguments to create a Problem.
     * @example
     * // Create one Problem
     * const Problem = await prisma.problem.create({
     *   data: {
     *     // ... data to create a Problem
     *   }
     * })
     * 
     */
    create<T extends ProblemCreateArgs>(args: SelectSubset<T, ProblemCreateArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Problems.
     * @param {ProblemCreateManyArgs} args - Arguments to create many Problems.
     * @example
     * // Create many Problems
     * const problem = await prisma.problem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProblemCreateManyArgs>(args?: SelectSubset<T, ProblemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Problems and returns the data saved in the database.
     * @param {ProblemCreateManyAndReturnArgs} args - Arguments to create many Problems.
     * @example
     * // Create many Problems
     * const problem = await prisma.problem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Problems and only return the `id`
     * const problemWithIdOnly = await prisma.problem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProblemCreateManyAndReturnArgs>(args?: SelectSubset<T, ProblemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Problem.
     * @param {ProblemDeleteArgs} args - Arguments to delete one Problem.
     * @example
     * // Delete one Problem
     * const Problem = await prisma.problem.delete({
     *   where: {
     *     // ... filter to delete one Problem
     *   }
     * })
     * 
     */
    delete<T extends ProblemDeleteArgs>(args: SelectSubset<T, ProblemDeleteArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Problem.
     * @param {ProblemUpdateArgs} args - Arguments to update one Problem.
     * @example
     * // Update one Problem
     * const problem = await prisma.problem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProblemUpdateArgs>(args: SelectSubset<T, ProblemUpdateArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Problems.
     * @param {ProblemDeleteManyArgs} args - Arguments to filter Problems to delete.
     * @example
     * // Delete a few Problems
     * const { count } = await prisma.problem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProblemDeleteManyArgs>(args?: SelectSubset<T, ProblemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Problems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Problems
     * const problem = await prisma.problem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProblemUpdateManyArgs>(args: SelectSubset<T, ProblemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Problems and returns the data updated in the database.
     * @param {ProblemUpdateManyAndReturnArgs} args - Arguments to update many Problems.
     * @example
     * // Update many Problems
     * const problem = await prisma.problem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Problems and only return the `id`
     * const problemWithIdOnly = await prisma.problem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProblemUpdateManyAndReturnArgs>(args: SelectSubset<T, ProblemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Problem.
     * @param {ProblemUpsertArgs} args - Arguments to update or create a Problem.
     * @example
     * // Update or create a Problem
     * const problem = await prisma.problem.upsert({
     *   create: {
     *     // ... data to create a Problem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Problem we want to update
     *   }
     * })
     */
    upsert<T extends ProblemUpsertArgs>(args: SelectSubset<T, ProblemUpsertArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Problems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemCountArgs} args - Arguments to filter Problems to count.
     * @example
     * // Count the number of Problems
     * const count = await prisma.problem.count({
     *   where: {
     *     // ... the filter for the Problems we want to count
     *   }
     * })
    **/
    count<T extends ProblemCountArgs>(
      args?: Subset<T, ProblemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProblemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Problem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProblemAggregateArgs>(args: Subset<T, ProblemAggregateArgs>): Prisma.PrismaPromise<GetProblemAggregateType<T>>

    /**
     * Group by Problem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProblemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProblemGroupByArgs['orderBy'] }
        : { orderBy?: ProblemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProblemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProblemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Problem model
   */
  readonly fields: ProblemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Problem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProblemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    submissions<T extends Problem$submissionsArgs<ExtArgs> = {}>(args?: Subset<T, Problem$submissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NormalizedSubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Problem model
   */
  interface ProblemFieldRefs {
    readonly id: FieldRef<"Problem", 'String'>
    readonly platform: FieldRef<"Problem", 'String'>
    readonly externalProblemId: FieldRef<"Problem", 'String'>
    readonly title: FieldRef<"Problem", 'String'>
    readonly difficulty: FieldRef<"Problem", 'String'>
    readonly numericDifficulty: FieldRef<"Problem", 'Int'>
    readonly topics: FieldRef<"Problem", 'String'>
    readonly rawTags: FieldRef<"Problem", 'String'>
    readonly metadata: FieldRef<"Problem", 'String'>
    readonly createdAt: FieldRef<"Problem", 'DateTime'>
    readonly updatedAt: FieldRef<"Problem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Problem findUnique
   */
  export type ProblemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Problem
     */
    omit?: ProblemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
    /**
     * Filter, which Problem to fetch.
     */
    where: ProblemWhereUniqueInput
  }

  /**
   * Problem findUniqueOrThrow
   */
  export type ProblemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Problem
     */
    omit?: ProblemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
    /**
     * Filter, which Problem to fetch.
     */
    where: ProblemWhereUniqueInput
  }

  /**
   * Problem findFirst
   */
  export type ProblemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Problem
     */
    omit?: ProblemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
    /**
     * Filter, which Problem to fetch.
     */
    where?: ProblemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Problems to fetch.
     */
    orderBy?: ProblemOrderByWithRelationInput | ProblemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Problems.
     */
    cursor?: ProblemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Problems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Problems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Problems.
     */
    distinct?: ProblemScalarFieldEnum | ProblemScalarFieldEnum[]
  }

  /**
   * Problem findFirstOrThrow
   */
  export type ProblemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Problem
     */
    omit?: ProblemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
    /**
     * Filter, which Problem to fetch.
     */
    where?: ProblemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Problems to fetch.
     */
    orderBy?: ProblemOrderByWithRelationInput | ProblemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Problems.
     */
    cursor?: ProblemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Problems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Problems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Problems.
     */
    distinct?: ProblemScalarFieldEnum | ProblemScalarFieldEnum[]
  }

  /**
   * Problem findMany
   */
  export type ProblemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Problem
     */
    omit?: ProblemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
    /**
     * Filter, which Problems to fetch.
     */
    where?: ProblemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Problems to fetch.
     */
    orderBy?: ProblemOrderByWithRelationInput | ProblemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Problems.
     */
    cursor?: ProblemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Problems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Problems.
     */
    skip?: number
    distinct?: ProblemScalarFieldEnum | ProblemScalarFieldEnum[]
  }

  /**
   * Problem create
   */
  export type ProblemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Problem
     */
    omit?: ProblemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
    /**
     * The data needed to create a Problem.
     */
    data: XOR<ProblemCreateInput, ProblemUncheckedCreateInput>
  }

  /**
   * Problem createMany
   */
  export type ProblemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Problems.
     */
    data: ProblemCreateManyInput | ProblemCreateManyInput[]
  }

  /**
   * Problem createManyAndReturn
   */
  export type ProblemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Problem
     */
    omit?: ProblemOmit<ExtArgs> | null
    /**
     * The data used to create many Problems.
     */
    data: ProblemCreateManyInput | ProblemCreateManyInput[]
  }

  /**
   * Problem update
   */
  export type ProblemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Problem
     */
    omit?: ProblemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
    /**
     * The data needed to update a Problem.
     */
    data: XOR<ProblemUpdateInput, ProblemUncheckedUpdateInput>
    /**
     * Choose, which Problem to update.
     */
    where: ProblemWhereUniqueInput
  }

  /**
   * Problem updateMany
   */
  export type ProblemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Problems.
     */
    data: XOR<ProblemUpdateManyMutationInput, ProblemUncheckedUpdateManyInput>
    /**
     * Filter which Problems to update
     */
    where?: ProblemWhereInput
    /**
     * Limit how many Problems to update.
     */
    limit?: number
  }

  /**
   * Problem updateManyAndReturn
   */
  export type ProblemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Problem
     */
    omit?: ProblemOmit<ExtArgs> | null
    /**
     * The data used to update Problems.
     */
    data: XOR<ProblemUpdateManyMutationInput, ProblemUncheckedUpdateManyInput>
    /**
     * Filter which Problems to update
     */
    where?: ProblemWhereInput
    /**
     * Limit how many Problems to update.
     */
    limit?: number
  }

  /**
   * Problem upsert
   */
  export type ProblemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Problem
     */
    omit?: ProblemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
    /**
     * The filter to search for the Problem to update in case it exists.
     */
    where: ProblemWhereUniqueInput
    /**
     * In case the Problem found by the `where` argument doesn't exist, create a new Problem with this data.
     */
    create: XOR<ProblemCreateInput, ProblemUncheckedCreateInput>
    /**
     * In case the Problem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProblemUpdateInput, ProblemUncheckedUpdateInput>
  }

  /**
   * Problem delete
   */
  export type ProblemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Problem
     */
    omit?: ProblemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
    /**
     * Filter which Problem to delete.
     */
    where: ProblemWhereUniqueInput
  }

  /**
   * Problem deleteMany
   */
  export type ProblemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Problems to delete
     */
    where?: ProblemWhereInput
    /**
     * Limit how many Problems to delete.
     */
    limit?: number
  }

  /**
   * Problem.submissions
   */
  export type Problem$submissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NormalizedSubmission
     */
    select?: NormalizedSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NormalizedSubmission
     */
    omit?: NormalizedSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NormalizedSubmissionInclude<ExtArgs> | null
    where?: NormalizedSubmissionWhereInput
    orderBy?: NormalizedSubmissionOrderByWithRelationInput | NormalizedSubmissionOrderByWithRelationInput[]
    cursor?: NormalizedSubmissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NormalizedSubmissionScalarFieldEnum | NormalizedSubmissionScalarFieldEnum[]
  }

  /**
   * Problem without action
   */
  export type ProblemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Problem
     */
    omit?: ProblemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
  }


  /**
   * Model NormalizedSubmission
   */

  export type AggregateNormalizedSubmission = {
    _count: NormalizedSubmissionCountAggregateOutputType | null
    _min: NormalizedSubmissionMinAggregateOutputType | null
    _max: NormalizedSubmissionMaxAggregateOutputType | null
  }

  export type NormalizedSubmissionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    platform: string | null
    externalSubmissionId: string | null
    problemId: string | null
    problemTitle: string | null
    verdict: string | null
    accepted: boolean | null
    language: string | null
    difficulty: string | null
    topics: string | null
    timestamp: Date | null
    contestId: string | null
    rawData: string | null
    createdAt: Date | null
  }

  export type NormalizedSubmissionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    platform: string | null
    externalSubmissionId: string | null
    problemId: string | null
    problemTitle: string | null
    verdict: string | null
    accepted: boolean | null
    language: string | null
    difficulty: string | null
    topics: string | null
    timestamp: Date | null
    contestId: string | null
    rawData: string | null
    createdAt: Date | null
  }

  export type NormalizedSubmissionCountAggregateOutputType = {
    id: number
    userId: number
    platform: number
    externalSubmissionId: number
    problemId: number
    problemTitle: number
    verdict: number
    accepted: number
    language: number
    difficulty: number
    topics: number
    timestamp: number
    contestId: number
    rawData: number
    createdAt: number
    _all: number
  }


  export type NormalizedSubmissionMinAggregateInputType = {
    id?: true
    userId?: true
    platform?: true
    externalSubmissionId?: true
    problemId?: true
    problemTitle?: true
    verdict?: true
    accepted?: true
    language?: true
    difficulty?: true
    topics?: true
    timestamp?: true
    contestId?: true
    rawData?: true
    createdAt?: true
  }

  export type NormalizedSubmissionMaxAggregateInputType = {
    id?: true
    userId?: true
    platform?: true
    externalSubmissionId?: true
    problemId?: true
    problemTitle?: true
    verdict?: true
    accepted?: true
    language?: true
    difficulty?: true
    topics?: true
    timestamp?: true
    contestId?: true
    rawData?: true
    createdAt?: true
  }

  export type NormalizedSubmissionCountAggregateInputType = {
    id?: true
    userId?: true
    platform?: true
    externalSubmissionId?: true
    problemId?: true
    problemTitle?: true
    verdict?: true
    accepted?: true
    language?: true
    difficulty?: true
    topics?: true
    timestamp?: true
    contestId?: true
    rawData?: true
    createdAt?: true
    _all?: true
  }

  export type NormalizedSubmissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NormalizedSubmission to aggregate.
     */
    where?: NormalizedSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NormalizedSubmissions to fetch.
     */
    orderBy?: NormalizedSubmissionOrderByWithRelationInput | NormalizedSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NormalizedSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NormalizedSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NormalizedSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NormalizedSubmissions
    **/
    _count?: true | NormalizedSubmissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NormalizedSubmissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NormalizedSubmissionMaxAggregateInputType
  }

  export type GetNormalizedSubmissionAggregateType<T extends NormalizedSubmissionAggregateArgs> = {
        [P in keyof T & keyof AggregateNormalizedSubmission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNormalizedSubmission[P]>
      : GetScalarType<T[P], AggregateNormalizedSubmission[P]>
  }




  export type NormalizedSubmissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NormalizedSubmissionWhereInput
    orderBy?: NormalizedSubmissionOrderByWithAggregationInput | NormalizedSubmissionOrderByWithAggregationInput[]
    by: NormalizedSubmissionScalarFieldEnum[] | NormalizedSubmissionScalarFieldEnum
    having?: NormalizedSubmissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NormalizedSubmissionCountAggregateInputType | true
    _min?: NormalizedSubmissionMinAggregateInputType
    _max?: NormalizedSubmissionMaxAggregateInputType
  }

  export type NormalizedSubmissionGroupByOutputType = {
    id: string
    userId: string
    platform: string
    externalSubmissionId: string
    problemId: string
    problemTitle: string
    verdict: string
    accepted: boolean
    language: string | null
    difficulty: string
    topics: string
    timestamp: Date
    contestId: string | null
    rawData: string | null
    createdAt: Date
    _count: NormalizedSubmissionCountAggregateOutputType | null
    _min: NormalizedSubmissionMinAggregateOutputType | null
    _max: NormalizedSubmissionMaxAggregateOutputType | null
  }

  type GetNormalizedSubmissionGroupByPayload<T extends NormalizedSubmissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NormalizedSubmissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NormalizedSubmissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NormalizedSubmissionGroupByOutputType[P]>
            : GetScalarType<T[P], NormalizedSubmissionGroupByOutputType[P]>
        }
      >
    >


  export type NormalizedSubmissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    platform?: boolean
    externalSubmissionId?: boolean
    problemId?: boolean
    problemTitle?: boolean
    verdict?: boolean
    accepted?: boolean
    language?: boolean
    difficulty?: boolean
    topics?: boolean
    timestamp?: boolean
    contestId?: boolean
    rawData?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["normalizedSubmission"]>

  export type NormalizedSubmissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    platform?: boolean
    externalSubmissionId?: boolean
    problemId?: boolean
    problemTitle?: boolean
    verdict?: boolean
    accepted?: boolean
    language?: boolean
    difficulty?: boolean
    topics?: boolean
    timestamp?: boolean
    contestId?: boolean
    rawData?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["normalizedSubmission"]>

  export type NormalizedSubmissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    platform?: boolean
    externalSubmissionId?: boolean
    problemId?: boolean
    problemTitle?: boolean
    verdict?: boolean
    accepted?: boolean
    language?: boolean
    difficulty?: boolean
    topics?: boolean
    timestamp?: boolean
    contestId?: boolean
    rawData?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["normalizedSubmission"]>

  export type NormalizedSubmissionSelectScalar = {
    id?: boolean
    userId?: boolean
    platform?: boolean
    externalSubmissionId?: boolean
    problemId?: boolean
    problemTitle?: boolean
    verdict?: boolean
    accepted?: boolean
    language?: boolean
    difficulty?: boolean
    topics?: boolean
    timestamp?: boolean
    contestId?: boolean
    rawData?: boolean
    createdAt?: boolean
  }

  export type NormalizedSubmissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "platform" | "externalSubmissionId" | "problemId" | "problemTitle" | "verdict" | "accepted" | "language" | "difficulty" | "topics" | "timestamp" | "contestId" | "rawData" | "createdAt", ExtArgs["result"]["normalizedSubmission"]>
  export type NormalizedSubmissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
  }
  export type NormalizedSubmissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
  }
  export type NormalizedSubmissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
  }

  export type $NormalizedSubmissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NormalizedSubmission"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      problem: Prisma.$ProblemPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      platform: string
      externalSubmissionId: string
      problemId: string
      problemTitle: string
      verdict: string
      accepted: boolean
      language: string | null
      difficulty: string
      topics: string
      timestamp: Date
      contestId: string | null
      rawData: string | null
      createdAt: Date
    }, ExtArgs["result"]["normalizedSubmission"]>
    composites: {}
  }

  type NormalizedSubmissionGetPayload<S extends boolean | null | undefined | NormalizedSubmissionDefaultArgs> = $Result.GetResult<Prisma.$NormalizedSubmissionPayload, S>

  type NormalizedSubmissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NormalizedSubmissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NormalizedSubmissionCountAggregateInputType | true
    }

  export interface NormalizedSubmissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NormalizedSubmission'], meta: { name: 'NormalizedSubmission' } }
    /**
     * Find zero or one NormalizedSubmission that matches the filter.
     * @param {NormalizedSubmissionFindUniqueArgs} args - Arguments to find a NormalizedSubmission
     * @example
     * // Get one NormalizedSubmission
     * const normalizedSubmission = await prisma.normalizedSubmission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NormalizedSubmissionFindUniqueArgs>(args: SelectSubset<T, NormalizedSubmissionFindUniqueArgs<ExtArgs>>): Prisma__NormalizedSubmissionClient<$Result.GetResult<Prisma.$NormalizedSubmissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NormalizedSubmission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NormalizedSubmissionFindUniqueOrThrowArgs} args - Arguments to find a NormalizedSubmission
     * @example
     * // Get one NormalizedSubmission
     * const normalizedSubmission = await prisma.normalizedSubmission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NormalizedSubmissionFindUniqueOrThrowArgs>(args: SelectSubset<T, NormalizedSubmissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NormalizedSubmissionClient<$Result.GetResult<Prisma.$NormalizedSubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NormalizedSubmission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NormalizedSubmissionFindFirstArgs} args - Arguments to find a NormalizedSubmission
     * @example
     * // Get one NormalizedSubmission
     * const normalizedSubmission = await prisma.normalizedSubmission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NormalizedSubmissionFindFirstArgs>(args?: SelectSubset<T, NormalizedSubmissionFindFirstArgs<ExtArgs>>): Prisma__NormalizedSubmissionClient<$Result.GetResult<Prisma.$NormalizedSubmissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NormalizedSubmission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NormalizedSubmissionFindFirstOrThrowArgs} args - Arguments to find a NormalizedSubmission
     * @example
     * // Get one NormalizedSubmission
     * const normalizedSubmission = await prisma.normalizedSubmission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NormalizedSubmissionFindFirstOrThrowArgs>(args?: SelectSubset<T, NormalizedSubmissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__NormalizedSubmissionClient<$Result.GetResult<Prisma.$NormalizedSubmissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NormalizedSubmissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NormalizedSubmissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NormalizedSubmissions
     * const normalizedSubmissions = await prisma.normalizedSubmission.findMany()
     * 
     * // Get first 10 NormalizedSubmissions
     * const normalizedSubmissions = await prisma.normalizedSubmission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const normalizedSubmissionWithIdOnly = await prisma.normalizedSubmission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NormalizedSubmissionFindManyArgs>(args?: SelectSubset<T, NormalizedSubmissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NormalizedSubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NormalizedSubmission.
     * @param {NormalizedSubmissionCreateArgs} args - Arguments to create a NormalizedSubmission.
     * @example
     * // Create one NormalizedSubmission
     * const NormalizedSubmission = await prisma.normalizedSubmission.create({
     *   data: {
     *     // ... data to create a NormalizedSubmission
     *   }
     * })
     * 
     */
    create<T extends NormalizedSubmissionCreateArgs>(args: SelectSubset<T, NormalizedSubmissionCreateArgs<ExtArgs>>): Prisma__NormalizedSubmissionClient<$Result.GetResult<Prisma.$NormalizedSubmissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NormalizedSubmissions.
     * @param {NormalizedSubmissionCreateManyArgs} args - Arguments to create many NormalizedSubmissions.
     * @example
     * // Create many NormalizedSubmissions
     * const normalizedSubmission = await prisma.normalizedSubmission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NormalizedSubmissionCreateManyArgs>(args?: SelectSubset<T, NormalizedSubmissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NormalizedSubmissions and returns the data saved in the database.
     * @param {NormalizedSubmissionCreateManyAndReturnArgs} args - Arguments to create many NormalizedSubmissions.
     * @example
     * // Create many NormalizedSubmissions
     * const normalizedSubmission = await prisma.normalizedSubmission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NormalizedSubmissions and only return the `id`
     * const normalizedSubmissionWithIdOnly = await prisma.normalizedSubmission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NormalizedSubmissionCreateManyAndReturnArgs>(args?: SelectSubset<T, NormalizedSubmissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NormalizedSubmissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NormalizedSubmission.
     * @param {NormalizedSubmissionDeleteArgs} args - Arguments to delete one NormalizedSubmission.
     * @example
     * // Delete one NormalizedSubmission
     * const NormalizedSubmission = await prisma.normalizedSubmission.delete({
     *   where: {
     *     // ... filter to delete one NormalizedSubmission
     *   }
     * })
     * 
     */
    delete<T extends NormalizedSubmissionDeleteArgs>(args: SelectSubset<T, NormalizedSubmissionDeleteArgs<ExtArgs>>): Prisma__NormalizedSubmissionClient<$Result.GetResult<Prisma.$NormalizedSubmissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NormalizedSubmission.
     * @param {NormalizedSubmissionUpdateArgs} args - Arguments to update one NormalizedSubmission.
     * @example
     * // Update one NormalizedSubmission
     * const normalizedSubmission = await prisma.normalizedSubmission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NormalizedSubmissionUpdateArgs>(args: SelectSubset<T, NormalizedSubmissionUpdateArgs<ExtArgs>>): Prisma__NormalizedSubmissionClient<$Result.GetResult<Prisma.$NormalizedSubmissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NormalizedSubmissions.
     * @param {NormalizedSubmissionDeleteManyArgs} args - Arguments to filter NormalizedSubmissions to delete.
     * @example
     * // Delete a few NormalizedSubmissions
     * const { count } = await prisma.normalizedSubmission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NormalizedSubmissionDeleteManyArgs>(args?: SelectSubset<T, NormalizedSubmissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NormalizedSubmissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NormalizedSubmissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NormalizedSubmissions
     * const normalizedSubmission = await prisma.normalizedSubmission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NormalizedSubmissionUpdateManyArgs>(args: SelectSubset<T, NormalizedSubmissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NormalizedSubmissions and returns the data updated in the database.
     * @param {NormalizedSubmissionUpdateManyAndReturnArgs} args - Arguments to update many NormalizedSubmissions.
     * @example
     * // Update many NormalizedSubmissions
     * const normalizedSubmission = await prisma.normalizedSubmission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NormalizedSubmissions and only return the `id`
     * const normalizedSubmissionWithIdOnly = await prisma.normalizedSubmission.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NormalizedSubmissionUpdateManyAndReturnArgs>(args: SelectSubset<T, NormalizedSubmissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NormalizedSubmissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NormalizedSubmission.
     * @param {NormalizedSubmissionUpsertArgs} args - Arguments to update or create a NormalizedSubmission.
     * @example
     * // Update or create a NormalizedSubmission
     * const normalizedSubmission = await prisma.normalizedSubmission.upsert({
     *   create: {
     *     // ... data to create a NormalizedSubmission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NormalizedSubmission we want to update
     *   }
     * })
     */
    upsert<T extends NormalizedSubmissionUpsertArgs>(args: SelectSubset<T, NormalizedSubmissionUpsertArgs<ExtArgs>>): Prisma__NormalizedSubmissionClient<$Result.GetResult<Prisma.$NormalizedSubmissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NormalizedSubmissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NormalizedSubmissionCountArgs} args - Arguments to filter NormalizedSubmissions to count.
     * @example
     * // Count the number of NormalizedSubmissions
     * const count = await prisma.normalizedSubmission.count({
     *   where: {
     *     // ... the filter for the NormalizedSubmissions we want to count
     *   }
     * })
    **/
    count<T extends NormalizedSubmissionCountArgs>(
      args?: Subset<T, NormalizedSubmissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NormalizedSubmissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NormalizedSubmission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NormalizedSubmissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NormalizedSubmissionAggregateArgs>(args: Subset<T, NormalizedSubmissionAggregateArgs>): Prisma.PrismaPromise<GetNormalizedSubmissionAggregateType<T>>

    /**
     * Group by NormalizedSubmission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NormalizedSubmissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NormalizedSubmissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NormalizedSubmissionGroupByArgs['orderBy'] }
        : { orderBy?: NormalizedSubmissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NormalizedSubmissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNormalizedSubmissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NormalizedSubmission model
   */
  readonly fields: NormalizedSubmissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NormalizedSubmission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NormalizedSubmissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    problem<T extends ProblemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProblemDefaultArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NormalizedSubmission model
   */
  interface NormalizedSubmissionFieldRefs {
    readonly id: FieldRef<"NormalizedSubmission", 'String'>
    readonly userId: FieldRef<"NormalizedSubmission", 'String'>
    readonly platform: FieldRef<"NormalizedSubmission", 'String'>
    readonly externalSubmissionId: FieldRef<"NormalizedSubmission", 'String'>
    readonly problemId: FieldRef<"NormalizedSubmission", 'String'>
    readonly problemTitle: FieldRef<"NormalizedSubmission", 'String'>
    readonly verdict: FieldRef<"NormalizedSubmission", 'String'>
    readonly accepted: FieldRef<"NormalizedSubmission", 'Boolean'>
    readonly language: FieldRef<"NormalizedSubmission", 'String'>
    readonly difficulty: FieldRef<"NormalizedSubmission", 'String'>
    readonly topics: FieldRef<"NormalizedSubmission", 'String'>
    readonly timestamp: FieldRef<"NormalizedSubmission", 'DateTime'>
    readonly contestId: FieldRef<"NormalizedSubmission", 'String'>
    readonly rawData: FieldRef<"NormalizedSubmission", 'String'>
    readonly createdAt: FieldRef<"NormalizedSubmission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NormalizedSubmission findUnique
   */
  export type NormalizedSubmissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NormalizedSubmission
     */
    select?: NormalizedSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NormalizedSubmission
     */
    omit?: NormalizedSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NormalizedSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which NormalizedSubmission to fetch.
     */
    where: NormalizedSubmissionWhereUniqueInput
  }

  /**
   * NormalizedSubmission findUniqueOrThrow
   */
  export type NormalizedSubmissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NormalizedSubmission
     */
    select?: NormalizedSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NormalizedSubmission
     */
    omit?: NormalizedSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NormalizedSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which NormalizedSubmission to fetch.
     */
    where: NormalizedSubmissionWhereUniqueInput
  }

  /**
   * NormalizedSubmission findFirst
   */
  export type NormalizedSubmissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NormalizedSubmission
     */
    select?: NormalizedSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NormalizedSubmission
     */
    omit?: NormalizedSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NormalizedSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which NormalizedSubmission to fetch.
     */
    where?: NormalizedSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NormalizedSubmissions to fetch.
     */
    orderBy?: NormalizedSubmissionOrderByWithRelationInput | NormalizedSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NormalizedSubmissions.
     */
    cursor?: NormalizedSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NormalizedSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NormalizedSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NormalizedSubmissions.
     */
    distinct?: NormalizedSubmissionScalarFieldEnum | NormalizedSubmissionScalarFieldEnum[]
  }

  /**
   * NormalizedSubmission findFirstOrThrow
   */
  export type NormalizedSubmissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NormalizedSubmission
     */
    select?: NormalizedSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NormalizedSubmission
     */
    omit?: NormalizedSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NormalizedSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which NormalizedSubmission to fetch.
     */
    where?: NormalizedSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NormalizedSubmissions to fetch.
     */
    orderBy?: NormalizedSubmissionOrderByWithRelationInput | NormalizedSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NormalizedSubmissions.
     */
    cursor?: NormalizedSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NormalizedSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NormalizedSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NormalizedSubmissions.
     */
    distinct?: NormalizedSubmissionScalarFieldEnum | NormalizedSubmissionScalarFieldEnum[]
  }

  /**
   * NormalizedSubmission findMany
   */
  export type NormalizedSubmissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NormalizedSubmission
     */
    select?: NormalizedSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NormalizedSubmission
     */
    omit?: NormalizedSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NormalizedSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which NormalizedSubmissions to fetch.
     */
    where?: NormalizedSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NormalizedSubmissions to fetch.
     */
    orderBy?: NormalizedSubmissionOrderByWithRelationInput | NormalizedSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NormalizedSubmissions.
     */
    cursor?: NormalizedSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NormalizedSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NormalizedSubmissions.
     */
    skip?: number
    distinct?: NormalizedSubmissionScalarFieldEnum | NormalizedSubmissionScalarFieldEnum[]
  }

  /**
   * NormalizedSubmission create
   */
  export type NormalizedSubmissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NormalizedSubmission
     */
    select?: NormalizedSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NormalizedSubmission
     */
    omit?: NormalizedSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NormalizedSubmissionInclude<ExtArgs> | null
    /**
     * The data needed to create a NormalizedSubmission.
     */
    data: XOR<NormalizedSubmissionCreateInput, NormalizedSubmissionUncheckedCreateInput>
  }

  /**
   * NormalizedSubmission createMany
   */
  export type NormalizedSubmissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NormalizedSubmissions.
     */
    data: NormalizedSubmissionCreateManyInput | NormalizedSubmissionCreateManyInput[]
  }

  /**
   * NormalizedSubmission createManyAndReturn
   */
  export type NormalizedSubmissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NormalizedSubmission
     */
    select?: NormalizedSubmissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NormalizedSubmission
     */
    omit?: NormalizedSubmissionOmit<ExtArgs> | null
    /**
     * The data used to create many NormalizedSubmissions.
     */
    data: NormalizedSubmissionCreateManyInput | NormalizedSubmissionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NormalizedSubmissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * NormalizedSubmission update
   */
  export type NormalizedSubmissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NormalizedSubmission
     */
    select?: NormalizedSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NormalizedSubmission
     */
    omit?: NormalizedSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NormalizedSubmissionInclude<ExtArgs> | null
    /**
     * The data needed to update a NormalizedSubmission.
     */
    data: XOR<NormalizedSubmissionUpdateInput, NormalizedSubmissionUncheckedUpdateInput>
    /**
     * Choose, which NormalizedSubmission to update.
     */
    where: NormalizedSubmissionWhereUniqueInput
  }

  /**
   * NormalizedSubmission updateMany
   */
  export type NormalizedSubmissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NormalizedSubmissions.
     */
    data: XOR<NormalizedSubmissionUpdateManyMutationInput, NormalizedSubmissionUncheckedUpdateManyInput>
    /**
     * Filter which NormalizedSubmissions to update
     */
    where?: NormalizedSubmissionWhereInput
    /**
     * Limit how many NormalizedSubmissions to update.
     */
    limit?: number
  }

  /**
   * NormalizedSubmission updateManyAndReturn
   */
  export type NormalizedSubmissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NormalizedSubmission
     */
    select?: NormalizedSubmissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NormalizedSubmission
     */
    omit?: NormalizedSubmissionOmit<ExtArgs> | null
    /**
     * The data used to update NormalizedSubmissions.
     */
    data: XOR<NormalizedSubmissionUpdateManyMutationInput, NormalizedSubmissionUncheckedUpdateManyInput>
    /**
     * Filter which NormalizedSubmissions to update
     */
    where?: NormalizedSubmissionWhereInput
    /**
     * Limit how many NormalizedSubmissions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NormalizedSubmissionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * NormalizedSubmission upsert
   */
  export type NormalizedSubmissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NormalizedSubmission
     */
    select?: NormalizedSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NormalizedSubmission
     */
    omit?: NormalizedSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NormalizedSubmissionInclude<ExtArgs> | null
    /**
     * The filter to search for the NormalizedSubmission to update in case it exists.
     */
    where: NormalizedSubmissionWhereUniqueInput
    /**
     * In case the NormalizedSubmission found by the `where` argument doesn't exist, create a new NormalizedSubmission with this data.
     */
    create: XOR<NormalizedSubmissionCreateInput, NormalizedSubmissionUncheckedCreateInput>
    /**
     * In case the NormalizedSubmission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NormalizedSubmissionUpdateInput, NormalizedSubmissionUncheckedUpdateInput>
  }

  /**
   * NormalizedSubmission delete
   */
  export type NormalizedSubmissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NormalizedSubmission
     */
    select?: NormalizedSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NormalizedSubmission
     */
    omit?: NormalizedSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NormalizedSubmissionInclude<ExtArgs> | null
    /**
     * Filter which NormalizedSubmission to delete.
     */
    where: NormalizedSubmissionWhereUniqueInput
  }

  /**
   * NormalizedSubmission deleteMany
   */
  export type NormalizedSubmissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NormalizedSubmissions to delete
     */
    where?: NormalizedSubmissionWhereInput
    /**
     * Limit how many NormalizedSubmissions to delete.
     */
    limit?: number
  }

  /**
   * NormalizedSubmission without action
   */
  export type NormalizedSubmissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NormalizedSubmission
     */
    select?: NormalizedSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NormalizedSubmission
     */
    omit?: NormalizedSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NormalizedSubmissionInclude<ExtArgs> | null
  }


  /**
   * Model ContestHistory
   */

  export type AggregateContestHistory = {
    _count: ContestHistoryCountAggregateOutputType | null
    _avg: ContestHistoryAvgAggregateOutputType | null
    _sum: ContestHistorySumAggregateOutputType | null
    _min: ContestHistoryMinAggregateOutputType | null
    _max: ContestHistoryMaxAggregateOutputType | null
  }

  export type ContestHistoryAvgAggregateOutputType = {
    rank: number | null
    oldRating: number | null
    newRating: number | null
    ratingChange: number | null
  }

  export type ContestHistorySumAggregateOutputType = {
    rank: number | null
    oldRating: number | null
    newRating: number | null
    ratingChange: number | null
  }

  export type ContestHistoryMinAggregateOutputType = {
    id: string | null
    userId: string | null
    platform: string | null
    contestId: string | null
    contestName: string | null
    rank: number | null
    oldRating: number | null
    newRating: number | null
    ratingChange: number | null
    timestamp: Date | null
    createdAt: Date | null
  }

  export type ContestHistoryMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    platform: string | null
    contestId: string | null
    contestName: string | null
    rank: number | null
    oldRating: number | null
    newRating: number | null
    ratingChange: number | null
    timestamp: Date | null
    createdAt: Date | null
  }

  export type ContestHistoryCountAggregateOutputType = {
    id: number
    userId: number
    platform: number
    contestId: number
    contestName: number
    rank: number
    oldRating: number
    newRating: number
    ratingChange: number
    timestamp: number
    createdAt: number
    _all: number
  }


  export type ContestHistoryAvgAggregateInputType = {
    rank?: true
    oldRating?: true
    newRating?: true
    ratingChange?: true
  }

  export type ContestHistorySumAggregateInputType = {
    rank?: true
    oldRating?: true
    newRating?: true
    ratingChange?: true
  }

  export type ContestHistoryMinAggregateInputType = {
    id?: true
    userId?: true
    platform?: true
    contestId?: true
    contestName?: true
    rank?: true
    oldRating?: true
    newRating?: true
    ratingChange?: true
    timestamp?: true
    createdAt?: true
  }

  export type ContestHistoryMaxAggregateInputType = {
    id?: true
    userId?: true
    platform?: true
    contestId?: true
    contestName?: true
    rank?: true
    oldRating?: true
    newRating?: true
    ratingChange?: true
    timestamp?: true
    createdAt?: true
  }

  export type ContestHistoryCountAggregateInputType = {
    id?: true
    userId?: true
    platform?: true
    contestId?: true
    contestName?: true
    rank?: true
    oldRating?: true
    newRating?: true
    ratingChange?: true
    timestamp?: true
    createdAt?: true
    _all?: true
  }

  export type ContestHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContestHistory to aggregate.
     */
    where?: ContestHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContestHistories to fetch.
     */
    orderBy?: ContestHistoryOrderByWithRelationInput | ContestHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContestHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContestHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContestHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ContestHistories
    **/
    _count?: true | ContestHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ContestHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ContestHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContestHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContestHistoryMaxAggregateInputType
  }

  export type GetContestHistoryAggregateType<T extends ContestHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateContestHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContestHistory[P]>
      : GetScalarType<T[P], AggregateContestHistory[P]>
  }




  export type ContestHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContestHistoryWhereInput
    orderBy?: ContestHistoryOrderByWithAggregationInput | ContestHistoryOrderByWithAggregationInput[]
    by: ContestHistoryScalarFieldEnum[] | ContestHistoryScalarFieldEnum
    having?: ContestHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContestHistoryCountAggregateInputType | true
    _avg?: ContestHistoryAvgAggregateInputType
    _sum?: ContestHistorySumAggregateInputType
    _min?: ContestHistoryMinAggregateInputType
    _max?: ContestHistoryMaxAggregateInputType
  }

  export type ContestHistoryGroupByOutputType = {
    id: string
    userId: string
    platform: string
    contestId: string
    contestName: string
    rank: number
    oldRating: number
    newRating: number
    ratingChange: number
    timestamp: Date
    createdAt: Date
    _count: ContestHistoryCountAggregateOutputType | null
    _avg: ContestHistoryAvgAggregateOutputType | null
    _sum: ContestHistorySumAggregateOutputType | null
    _min: ContestHistoryMinAggregateOutputType | null
    _max: ContestHistoryMaxAggregateOutputType | null
  }

  type GetContestHistoryGroupByPayload<T extends ContestHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContestHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContestHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContestHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], ContestHistoryGroupByOutputType[P]>
        }
      >
    >


  export type ContestHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    platform?: boolean
    contestId?: boolean
    contestName?: boolean
    rank?: boolean
    oldRating?: boolean
    newRating?: boolean
    ratingChange?: boolean
    timestamp?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contestHistory"]>

  export type ContestHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    platform?: boolean
    contestId?: boolean
    contestName?: boolean
    rank?: boolean
    oldRating?: boolean
    newRating?: boolean
    ratingChange?: boolean
    timestamp?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contestHistory"]>

  export type ContestHistorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    platform?: boolean
    contestId?: boolean
    contestName?: boolean
    rank?: boolean
    oldRating?: boolean
    newRating?: boolean
    ratingChange?: boolean
    timestamp?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contestHistory"]>

  export type ContestHistorySelectScalar = {
    id?: boolean
    userId?: boolean
    platform?: boolean
    contestId?: boolean
    contestName?: boolean
    rank?: boolean
    oldRating?: boolean
    newRating?: boolean
    ratingChange?: boolean
    timestamp?: boolean
    createdAt?: boolean
  }

  export type ContestHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "platform" | "contestId" | "contestName" | "rank" | "oldRating" | "newRating" | "ratingChange" | "timestamp" | "createdAt", ExtArgs["result"]["contestHistory"]>
  export type ContestHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ContestHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ContestHistoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ContestHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ContestHistory"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      platform: string
      contestId: string
      contestName: string
      rank: number
      oldRating: number
      newRating: number
      ratingChange: number
      timestamp: Date
      createdAt: Date
    }, ExtArgs["result"]["contestHistory"]>
    composites: {}
  }

  type ContestHistoryGetPayload<S extends boolean | null | undefined | ContestHistoryDefaultArgs> = $Result.GetResult<Prisma.$ContestHistoryPayload, S>

  type ContestHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContestHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContestHistoryCountAggregateInputType | true
    }

  export interface ContestHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ContestHistory'], meta: { name: 'ContestHistory' } }
    /**
     * Find zero or one ContestHistory that matches the filter.
     * @param {ContestHistoryFindUniqueArgs} args - Arguments to find a ContestHistory
     * @example
     * // Get one ContestHistory
     * const contestHistory = await prisma.contestHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContestHistoryFindUniqueArgs>(args: SelectSubset<T, ContestHistoryFindUniqueArgs<ExtArgs>>): Prisma__ContestHistoryClient<$Result.GetResult<Prisma.$ContestHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ContestHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContestHistoryFindUniqueOrThrowArgs} args - Arguments to find a ContestHistory
     * @example
     * // Get one ContestHistory
     * const contestHistory = await prisma.contestHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContestHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, ContestHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContestHistoryClient<$Result.GetResult<Prisma.$ContestHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContestHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContestHistoryFindFirstArgs} args - Arguments to find a ContestHistory
     * @example
     * // Get one ContestHistory
     * const contestHistory = await prisma.contestHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContestHistoryFindFirstArgs>(args?: SelectSubset<T, ContestHistoryFindFirstArgs<ExtArgs>>): Prisma__ContestHistoryClient<$Result.GetResult<Prisma.$ContestHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContestHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContestHistoryFindFirstOrThrowArgs} args - Arguments to find a ContestHistory
     * @example
     * // Get one ContestHistory
     * const contestHistory = await prisma.contestHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContestHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, ContestHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContestHistoryClient<$Result.GetResult<Prisma.$ContestHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ContestHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContestHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ContestHistories
     * const contestHistories = await prisma.contestHistory.findMany()
     * 
     * // Get first 10 ContestHistories
     * const contestHistories = await prisma.contestHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contestHistoryWithIdOnly = await prisma.contestHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContestHistoryFindManyArgs>(args?: SelectSubset<T, ContestHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContestHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ContestHistory.
     * @param {ContestHistoryCreateArgs} args - Arguments to create a ContestHistory.
     * @example
     * // Create one ContestHistory
     * const ContestHistory = await prisma.contestHistory.create({
     *   data: {
     *     // ... data to create a ContestHistory
     *   }
     * })
     * 
     */
    create<T extends ContestHistoryCreateArgs>(args: SelectSubset<T, ContestHistoryCreateArgs<ExtArgs>>): Prisma__ContestHistoryClient<$Result.GetResult<Prisma.$ContestHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ContestHistories.
     * @param {ContestHistoryCreateManyArgs} args - Arguments to create many ContestHistories.
     * @example
     * // Create many ContestHistories
     * const contestHistory = await prisma.contestHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContestHistoryCreateManyArgs>(args?: SelectSubset<T, ContestHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ContestHistories and returns the data saved in the database.
     * @param {ContestHistoryCreateManyAndReturnArgs} args - Arguments to create many ContestHistories.
     * @example
     * // Create many ContestHistories
     * const contestHistory = await prisma.contestHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ContestHistories and only return the `id`
     * const contestHistoryWithIdOnly = await prisma.contestHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContestHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, ContestHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContestHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ContestHistory.
     * @param {ContestHistoryDeleteArgs} args - Arguments to delete one ContestHistory.
     * @example
     * // Delete one ContestHistory
     * const ContestHistory = await prisma.contestHistory.delete({
     *   where: {
     *     // ... filter to delete one ContestHistory
     *   }
     * })
     * 
     */
    delete<T extends ContestHistoryDeleteArgs>(args: SelectSubset<T, ContestHistoryDeleteArgs<ExtArgs>>): Prisma__ContestHistoryClient<$Result.GetResult<Prisma.$ContestHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ContestHistory.
     * @param {ContestHistoryUpdateArgs} args - Arguments to update one ContestHistory.
     * @example
     * // Update one ContestHistory
     * const contestHistory = await prisma.contestHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContestHistoryUpdateArgs>(args: SelectSubset<T, ContestHistoryUpdateArgs<ExtArgs>>): Prisma__ContestHistoryClient<$Result.GetResult<Prisma.$ContestHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ContestHistories.
     * @param {ContestHistoryDeleteManyArgs} args - Arguments to filter ContestHistories to delete.
     * @example
     * // Delete a few ContestHistories
     * const { count } = await prisma.contestHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContestHistoryDeleteManyArgs>(args?: SelectSubset<T, ContestHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContestHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContestHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ContestHistories
     * const contestHistory = await prisma.contestHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContestHistoryUpdateManyArgs>(args: SelectSubset<T, ContestHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContestHistories and returns the data updated in the database.
     * @param {ContestHistoryUpdateManyAndReturnArgs} args - Arguments to update many ContestHistories.
     * @example
     * // Update many ContestHistories
     * const contestHistory = await prisma.contestHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ContestHistories and only return the `id`
     * const contestHistoryWithIdOnly = await prisma.contestHistory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ContestHistoryUpdateManyAndReturnArgs>(args: SelectSubset<T, ContestHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContestHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ContestHistory.
     * @param {ContestHistoryUpsertArgs} args - Arguments to update or create a ContestHistory.
     * @example
     * // Update or create a ContestHistory
     * const contestHistory = await prisma.contestHistory.upsert({
     *   create: {
     *     // ... data to create a ContestHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ContestHistory we want to update
     *   }
     * })
     */
    upsert<T extends ContestHistoryUpsertArgs>(args: SelectSubset<T, ContestHistoryUpsertArgs<ExtArgs>>): Prisma__ContestHistoryClient<$Result.GetResult<Prisma.$ContestHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ContestHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContestHistoryCountArgs} args - Arguments to filter ContestHistories to count.
     * @example
     * // Count the number of ContestHistories
     * const count = await prisma.contestHistory.count({
     *   where: {
     *     // ... the filter for the ContestHistories we want to count
     *   }
     * })
    **/
    count<T extends ContestHistoryCountArgs>(
      args?: Subset<T, ContestHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContestHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ContestHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContestHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContestHistoryAggregateArgs>(args: Subset<T, ContestHistoryAggregateArgs>): Prisma.PrismaPromise<GetContestHistoryAggregateType<T>>

    /**
     * Group by ContestHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContestHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContestHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContestHistoryGroupByArgs['orderBy'] }
        : { orderBy?: ContestHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContestHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContestHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ContestHistory model
   */
  readonly fields: ContestHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ContestHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContestHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ContestHistory model
   */
  interface ContestHistoryFieldRefs {
    readonly id: FieldRef<"ContestHistory", 'String'>
    readonly userId: FieldRef<"ContestHistory", 'String'>
    readonly platform: FieldRef<"ContestHistory", 'String'>
    readonly contestId: FieldRef<"ContestHistory", 'String'>
    readonly contestName: FieldRef<"ContestHistory", 'String'>
    readonly rank: FieldRef<"ContestHistory", 'Int'>
    readonly oldRating: FieldRef<"ContestHistory", 'Int'>
    readonly newRating: FieldRef<"ContestHistory", 'Int'>
    readonly ratingChange: FieldRef<"ContestHistory", 'Int'>
    readonly timestamp: FieldRef<"ContestHistory", 'DateTime'>
    readonly createdAt: FieldRef<"ContestHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ContestHistory findUnique
   */
  export type ContestHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContestHistory
     */
    select?: ContestHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContestHistory
     */
    omit?: ContestHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContestHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ContestHistory to fetch.
     */
    where: ContestHistoryWhereUniqueInput
  }

  /**
   * ContestHistory findUniqueOrThrow
   */
  export type ContestHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContestHistory
     */
    select?: ContestHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContestHistory
     */
    omit?: ContestHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContestHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ContestHistory to fetch.
     */
    where: ContestHistoryWhereUniqueInput
  }

  /**
   * ContestHistory findFirst
   */
  export type ContestHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContestHistory
     */
    select?: ContestHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContestHistory
     */
    omit?: ContestHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContestHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ContestHistory to fetch.
     */
    where?: ContestHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContestHistories to fetch.
     */
    orderBy?: ContestHistoryOrderByWithRelationInput | ContestHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContestHistories.
     */
    cursor?: ContestHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContestHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContestHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContestHistories.
     */
    distinct?: ContestHistoryScalarFieldEnum | ContestHistoryScalarFieldEnum[]
  }

  /**
   * ContestHistory findFirstOrThrow
   */
  export type ContestHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContestHistory
     */
    select?: ContestHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContestHistory
     */
    omit?: ContestHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContestHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ContestHistory to fetch.
     */
    where?: ContestHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContestHistories to fetch.
     */
    orderBy?: ContestHistoryOrderByWithRelationInput | ContestHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContestHistories.
     */
    cursor?: ContestHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContestHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContestHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContestHistories.
     */
    distinct?: ContestHistoryScalarFieldEnum | ContestHistoryScalarFieldEnum[]
  }

  /**
   * ContestHistory findMany
   */
  export type ContestHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContestHistory
     */
    select?: ContestHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContestHistory
     */
    omit?: ContestHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContestHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ContestHistories to fetch.
     */
    where?: ContestHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContestHistories to fetch.
     */
    orderBy?: ContestHistoryOrderByWithRelationInput | ContestHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ContestHistories.
     */
    cursor?: ContestHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContestHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContestHistories.
     */
    skip?: number
    distinct?: ContestHistoryScalarFieldEnum | ContestHistoryScalarFieldEnum[]
  }

  /**
   * ContestHistory create
   */
  export type ContestHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContestHistory
     */
    select?: ContestHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContestHistory
     */
    omit?: ContestHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContestHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a ContestHistory.
     */
    data: XOR<ContestHistoryCreateInput, ContestHistoryUncheckedCreateInput>
  }

  /**
   * ContestHistory createMany
   */
  export type ContestHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ContestHistories.
     */
    data: ContestHistoryCreateManyInput | ContestHistoryCreateManyInput[]
  }

  /**
   * ContestHistory createManyAndReturn
   */
  export type ContestHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContestHistory
     */
    select?: ContestHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ContestHistory
     */
    omit?: ContestHistoryOmit<ExtArgs> | null
    /**
     * The data used to create many ContestHistories.
     */
    data: ContestHistoryCreateManyInput | ContestHistoryCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContestHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ContestHistory update
   */
  export type ContestHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContestHistory
     */
    select?: ContestHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContestHistory
     */
    omit?: ContestHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContestHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a ContestHistory.
     */
    data: XOR<ContestHistoryUpdateInput, ContestHistoryUncheckedUpdateInput>
    /**
     * Choose, which ContestHistory to update.
     */
    where: ContestHistoryWhereUniqueInput
  }

  /**
   * ContestHistory updateMany
   */
  export type ContestHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ContestHistories.
     */
    data: XOR<ContestHistoryUpdateManyMutationInput, ContestHistoryUncheckedUpdateManyInput>
    /**
     * Filter which ContestHistories to update
     */
    where?: ContestHistoryWhereInput
    /**
     * Limit how many ContestHistories to update.
     */
    limit?: number
  }

  /**
   * ContestHistory updateManyAndReturn
   */
  export type ContestHistoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContestHistory
     */
    select?: ContestHistorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ContestHistory
     */
    omit?: ContestHistoryOmit<ExtArgs> | null
    /**
     * The data used to update ContestHistories.
     */
    data: XOR<ContestHistoryUpdateManyMutationInput, ContestHistoryUncheckedUpdateManyInput>
    /**
     * Filter which ContestHistories to update
     */
    where?: ContestHistoryWhereInput
    /**
     * Limit how many ContestHistories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContestHistoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ContestHistory upsert
   */
  export type ContestHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContestHistory
     */
    select?: ContestHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContestHistory
     */
    omit?: ContestHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContestHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the ContestHistory to update in case it exists.
     */
    where: ContestHistoryWhereUniqueInput
    /**
     * In case the ContestHistory found by the `where` argument doesn't exist, create a new ContestHistory with this data.
     */
    create: XOR<ContestHistoryCreateInput, ContestHistoryUncheckedCreateInput>
    /**
     * In case the ContestHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContestHistoryUpdateInput, ContestHistoryUncheckedUpdateInput>
  }

  /**
   * ContestHistory delete
   */
  export type ContestHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContestHistory
     */
    select?: ContestHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContestHistory
     */
    omit?: ContestHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContestHistoryInclude<ExtArgs> | null
    /**
     * Filter which ContestHistory to delete.
     */
    where: ContestHistoryWhereUniqueInput
  }

  /**
   * ContestHistory deleteMany
   */
  export type ContestHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContestHistories to delete
     */
    where?: ContestHistoryWhereInput
    /**
     * Limit how many ContestHistories to delete.
     */
    limit?: number
  }

  /**
   * ContestHistory without action
   */
  export type ContestHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContestHistory
     */
    select?: ContestHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContestHistory
     */
    omit?: ContestHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContestHistoryInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const GoalScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    category: 'category',
    targetMetric: 'targetMetric',
    targetValue: 'targetValue',
    initialValue: 'initialValue',
    startDate: 'startDate',
    deadline: 'deadline',
    availableHoursPerWeek: 'availableHoursPerWeek',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GoalScalarFieldEnum = (typeof GoalScalarFieldEnum)[keyof typeof GoalScalarFieldEnum]


  export const PlatformConnectionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    platform: 'platform',
    username: 'username',
    status: 'status',
    lastError: 'lastError',
    lastSyncedAt: 'lastSyncedAt',
    profileData: 'profileData',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PlatformConnectionScalarFieldEnum = (typeof PlatformConnectionScalarFieldEnum)[keyof typeof PlatformConnectionScalarFieldEnum]


  export const ProblemScalarFieldEnum: {
    id: 'id',
    platform: 'platform',
    externalProblemId: 'externalProblemId',
    title: 'title',
    difficulty: 'difficulty',
    numericDifficulty: 'numericDifficulty',
    topics: 'topics',
    rawTags: 'rawTags',
    metadata: 'metadata',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProblemScalarFieldEnum = (typeof ProblemScalarFieldEnum)[keyof typeof ProblemScalarFieldEnum]


  export const NormalizedSubmissionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    platform: 'platform',
    externalSubmissionId: 'externalSubmissionId',
    problemId: 'problemId',
    problemTitle: 'problemTitle',
    verdict: 'verdict',
    accepted: 'accepted',
    language: 'language',
    difficulty: 'difficulty',
    topics: 'topics',
    timestamp: 'timestamp',
    contestId: 'contestId',
    rawData: 'rawData',
    createdAt: 'createdAt'
  };

  export type NormalizedSubmissionScalarFieldEnum = (typeof NormalizedSubmissionScalarFieldEnum)[keyof typeof NormalizedSubmissionScalarFieldEnum]


  export const ContestHistoryScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    platform: 'platform',
    contestId: 'contestId',
    contestName: 'contestName',
    rank: 'rank',
    oldRating: 'oldRating',
    newRating: 'newRating',
    ratingChange: 'ratingChange',
    timestamp: 'timestamp',
    createdAt: 'createdAt'
  };

  export type ContestHistoryScalarFieldEnum = (typeof ContestHistoryScalarFieldEnum)[keyof typeof ContestHistoryScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    goals?: GoalListRelationFilter
    connections?: PlatformConnectionListRelationFilter
    submissions?: NormalizedSubmissionListRelationFilter
    contests?: ContestHistoryListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    goals?: GoalOrderByRelationAggregateInput
    connections?: PlatformConnectionOrderByRelationAggregateInput
    submissions?: NormalizedSubmissionOrderByRelationAggregateInput
    contests?: ContestHistoryOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    goals?: GoalListRelationFilter
    connections?: PlatformConnectionListRelationFilter
    submissions?: NormalizedSubmissionListRelationFilter
    contests?: ContestHistoryListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type GoalWhereInput = {
    AND?: GoalWhereInput | GoalWhereInput[]
    OR?: GoalWhereInput[]
    NOT?: GoalWhereInput | GoalWhereInput[]
    id?: StringFilter<"Goal"> | string
    userId?: StringFilter<"Goal"> | string
    title?: StringFilter<"Goal"> | string
    category?: StringFilter<"Goal"> | string
    targetMetric?: StringFilter<"Goal"> | string
    targetValue?: FloatFilter<"Goal"> | number
    initialValue?: FloatFilter<"Goal"> | number
    startDate?: DateTimeFilter<"Goal"> | Date | string
    deadline?: DateTimeFilter<"Goal"> | Date | string
    availableHoursPerWeek?: FloatNullableFilter<"Goal"> | number | null
    status?: StringFilter<"Goal"> | string
    createdAt?: DateTimeFilter<"Goal"> | Date | string
    updatedAt?: DateTimeFilter<"Goal"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type GoalOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    category?: SortOrder
    targetMetric?: SortOrder
    targetValue?: SortOrder
    initialValue?: SortOrder
    startDate?: SortOrder
    deadline?: SortOrder
    availableHoursPerWeek?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type GoalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GoalWhereInput | GoalWhereInput[]
    OR?: GoalWhereInput[]
    NOT?: GoalWhereInput | GoalWhereInput[]
    userId?: StringFilter<"Goal"> | string
    title?: StringFilter<"Goal"> | string
    category?: StringFilter<"Goal"> | string
    targetMetric?: StringFilter<"Goal"> | string
    targetValue?: FloatFilter<"Goal"> | number
    initialValue?: FloatFilter<"Goal"> | number
    startDate?: DateTimeFilter<"Goal"> | Date | string
    deadline?: DateTimeFilter<"Goal"> | Date | string
    availableHoursPerWeek?: FloatNullableFilter<"Goal"> | number | null
    status?: StringFilter<"Goal"> | string
    createdAt?: DateTimeFilter<"Goal"> | Date | string
    updatedAt?: DateTimeFilter<"Goal"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type GoalOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    category?: SortOrder
    targetMetric?: SortOrder
    targetValue?: SortOrder
    initialValue?: SortOrder
    startDate?: SortOrder
    deadline?: SortOrder
    availableHoursPerWeek?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GoalCountOrderByAggregateInput
    _avg?: GoalAvgOrderByAggregateInput
    _max?: GoalMaxOrderByAggregateInput
    _min?: GoalMinOrderByAggregateInput
    _sum?: GoalSumOrderByAggregateInput
  }

  export type GoalScalarWhereWithAggregatesInput = {
    AND?: GoalScalarWhereWithAggregatesInput | GoalScalarWhereWithAggregatesInput[]
    OR?: GoalScalarWhereWithAggregatesInput[]
    NOT?: GoalScalarWhereWithAggregatesInput | GoalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Goal"> | string
    userId?: StringWithAggregatesFilter<"Goal"> | string
    title?: StringWithAggregatesFilter<"Goal"> | string
    category?: StringWithAggregatesFilter<"Goal"> | string
    targetMetric?: StringWithAggregatesFilter<"Goal"> | string
    targetValue?: FloatWithAggregatesFilter<"Goal"> | number
    initialValue?: FloatWithAggregatesFilter<"Goal"> | number
    startDate?: DateTimeWithAggregatesFilter<"Goal"> | Date | string
    deadline?: DateTimeWithAggregatesFilter<"Goal"> | Date | string
    availableHoursPerWeek?: FloatNullableWithAggregatesFilter<"Goal"> | number | null
    status?: StringWithAggregatesFilter<"Goal"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Goal"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Goal"> | Date | string
  }

  export type PlatformConnectionWhereInput = {
    AND?: PlatformConnectionWhereInput | PlatformConnectionWhereInput[]
    OR?: PlatformConnectionWhereInput[]
    NOT?: PlatformConnectionWhereInput | PlatformConnectionWhereInput[]
    id?: StringFilter<"PlatformConnection"> | string
    userId?: StringFilter<"PlatformConnection"> | string
    platform?: StringFilter<"PlatformConnection"> | string
    username?: StringFilter<"PlatformConnection"> | string
    status?: StringFilter<"PlatformConnection"> | string
    lastError?: StringNullableFilter<"PlatformConnection"> | string | null
    lastSyncedAt?: DateTimeNullableFilter<"PlatformConnection"> | Date | string | null
    profileData?: StringNullableFilter<"PlatformConnection"> | string | null
    createdAt?: DateTimeFilter<"PlatformConnection"> | Date | string
    updatedAt?: DateTimeFilter<"PlatformConnection"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PlatformConnectionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    username?: SortOrder
    status?: SortOrder
    lastError?: SortOrderInput | SortOrder
    lastSyncedAt?: SortOrderInput | SortOrder
    profileData?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type PlatformConnectionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_platform?: PlatformConnectionUserIdPlatformCompoundUniqueInput
    AND?: PlatformConnectionWhereInput | PlatformConnectionWhereInput[]
    OR?: PlatformConnectionWhereInput[]
    NOT?: PlatformConnectionWhereInput | PlatformConnectionWhereInput[]
    userId?: StringFilter<"PlatformConnection"> | string
    platform?: StringFilter<"PlatformConnection"> | string
    username?: StringFilter<"PlatformConnection"> | string
    status?: StringFilter<"PlatformConnection"> | string
    lastError?: StringNullableFilter<"PlatformConnection"> | string | null
    lastSyncedAt?: DateTimeNullableFilter<"PlatformConnection"> | Date | string | null
    profileData?: StringNullableFilter<"PlatformConnection"> | string | null
    createdAt?: DateTimeFilter<"PlatformConnection"> | Date | string
    updatedAt?: DateTimeFilter<"PlatformConnection"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_platform">

  export type PlatformConnectionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    username?: SortOrder
    status?: SortOrder
    lastError?: SortOrderInput | SortOrder
    lastSyncedAt?: SortOrderInput | SortOrder
    profileData?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PlatformConnectionCountOrderByAggregateInput
    _max?: PlatformConnectionMaxOrderByAggregateInput
    _min?: PlatformConnectionMinOrderByAggregateInput
  }

  export type PlatformConnectionScalarWhereWithAggregatesInput = {
    AND?: PlatformConnectionScalarWhereWithAggregatesInput | PlatformConnectionScalarWhereWithAggregatesInput[]
    OR?: PlatformConnectionScalarWhereWithAggregatesInput[]
    NOT?: PlatformConnectionScalarWhereWithAggregatesInput | PlatformConnectionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PlatformConnection"> | string
    userId?: StringWithAggregatesFilter<"PlatformConnection"> | string
    platform?: StringWithAggregatesFilter<"PlatformConnection"> | string
    username?: StringWithAggregatesFilter<"PlatformConnection"> | string
    status?: StringWithAggregatesFilter<"PlatformConnection"> | string
    lastError?: StringNullableWithAggregatesFilter<"PlatformConnection"> | string | null
    lastSyncedAt?: DateTimeNullableWithAggregatesFilter<"PlatformConnection"> | Date | string | null
    profileData?: StringNullableWithAggregatesFilter<"PlatformConnection"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PlatformConnection"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PlatformConnection"> | Date | string
  }

  export type ProblemWhereInput = {
    AND?: ProblemWhereInput | ProblemWhereInput[]
    OR?: ProblemWhereInput[]
    NOT?: ProblemWhereInput | ProblemWhereInput[]
    id?: StringFilter<"Problem"> | string
    platform?: StringFilter<"Problem"> | string
    externalProblemId?: StringFilter<"Problem"> | string
    title?: StringFilter<"Problem"> | string
    difficulty?: StringFilter<"Problem"> | string
    numericDifficulty?: IntNullableFilter<"Problem"> | number | null
    topics?: StringFilter<"Problem"> | string
    rawTags?: StringFilter<"Problem"> | string
    metadata?: StringNullableFilter<"Problem"> | string | null
    createdAt?: DateTimeFilter<"Problem"> | Date | string
    updatedAt?: DateTimeFilter<"Problem"> | Date | string
    submissions?: NormalizedSubmissionListRelationFilter
  }

  export type ProblemOrderByWithRelationInput = {
    id?: SortOrder
    platform?: SortOrder
    externalProblemId?: SortOrder
    title?: SortOrder
    difficulty?: SortOrder
    numericDifficulty?: SortOrderInput | SortOrder
    topics?: SortOrder
    rawTags?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    submissions?: NormalizedSubmissionOrderByRelationAggregateInput
  }

  export type ProblemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    platform_externalProblemId?: ProblemPlatformExternalProblemIdCompoundUniqueInput
    AND?: ProblemWhereInput | ProblemWhereInput[]
    OR?: ProblemWhereInput[]
    NOT?: ProblemWhereInput | ProblemWhereInput[]
    platform?: StringFilter<"Problem"> | string
    externalProblemId?: StringFilter<"Problem"> | string
    title?: StringFilter<"Problem"> | string
    difficulty?: StringFilter<"Problem"> | string
    numericDifficulty?: IntNullableFilter<"Problem"> | number | null
    topics?: StringFilter<"Problem"> | string
    rawTags?: StringFilter<"Problem"> | string
    metadata?: StringNullableFilter<"Problem"> | string | null
    createdAt?: DateTimeFilter<"Problem"> | Date | string
    updatedAt?: DateTimeFilter<"Problem"> | Date | string
    submissions?: NormalizedSubmissionListRelationFilter
  }, "id" | "platform_externalProblemId">

  export type ProblemOrderByWithAggregationInput = {
    id?: SortOrder
    platform?: SortOrder
    externalProblemId?: SortOrder
    title?: SortOrder
    difficulty?: SortOrder
    numericDifficulty?: SortOrderInput | SortOrder
    topics?: SortOrder
    rawTags?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProblemCountOrderByAggregateInput
    _avg?: ProblemAvgOrderByAggregateInput
    _max?: ProblemMaxOrderByAggregateInput
    _min?: ProblemMinOrderByAggregateInput
    _sum?: ProblemSumOrderByAggregateInput
  }

  export type ProblemScalarWhereWithAggregatesInput = {
    AND?: ProblemScalarWhereWithAggregatesInput | ProblemScalarWhereWithAggregatesInput[]
    OR?: ProblemScalarWhereWithAggregatesInput[]
    NOT?: ProblemScalarWhereWithAggregatesInput | ProblemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Problem"> | string
    platform?: StringWithAggregatesFilter<"Problem"> | string
    externalProblemId?: StringWithAggregatesFilter<"Problem"> | string
    title?: StringWithAggregatesFilter<"Problem"> | string
    difficulty?: StringWithAggregatesFilter<"Problem"> | string
    numericDifficulty?: IntNullableWithAggregatesFilter<"Problem"> | number | null
    topics?: StringWithAggregatesFilter<"Problem"> | string
    rawTags?: StringWithAggregatesFilter<"Problem"> | string
    metadata?: StringNullableWithAggregatesFilter<"Problem"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Problem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Problem"> | Date | string
  }

  export type NormalizedSubmissionWhereInput = {
    AND?: NormalizedSubmissionWhereInput | NormalizedSubmissionWhereInput[]
    OR?: NormalizedSubmissionWhereInput[]
    NOT?: NormalizedSubmissionWhereInput | NormalizedSubmissionWhereInput[]
    id?: StringFilter<"NormalizedSubmission"> | string
    userId?: StringFilter<"NormalizedSubmission"> | string
    platform?: StringFilter<"NormalizedSubmission"> | string
    externalSubmissionId?: StringFilter<"NormalizedSubmission"> | string
    problemId?: StringFilter<"NormalizedSubmission"> | string
    problemTitle?: StringFilter<"NormalizedSubmission"> | string
    verdict?: StringFilter<"NormalizedSubmission"> | string
    accepted?: BoolFilter<"NormalizedSubmission"> | boolean
    language?: StringNullableFilter<"NormalizedSubmission"> | string | null
    difficulty?: StringFilter<"NormalizedSubmission"> | string
    topics?: StringFilter<"NormalizedSubmission"> | string
    timestamp?: DateTimeFilter<"NormalizedSubmission"> | Date | string
    contestId?: StringNullableFilter<"NormalizedSubmission"> | string | null
    rawData?: StringNullableFilter<"NormalizedSubmission"> | string | null
    createdAt?: DateTimeFilter<"NormalizedSubmission"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    problem?: XOR<ProblemScalarRelationFilter, ProblemWhereInput>
  }

  export type NormalizedSubmissionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    externalSubmissionId?: SortOrder
    problemId?: SortOrder
    problemTitle?: SortOrder
    verdict?: SortOrder
    accepted?: SortOrder
    language?: SortOrderInput | SortOrder
    difficulty?: SortOrder
    topics?: SortOrder
    timestamp?: SortOrder
    contestId?: SortOrderInput | SortOrder
    rawData?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    problem?: ProblemOrderByWithRelationInput
  }

  export type NormalizedSubmissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_platform_externalSubmissionId?: NormalizedSubmissionUserIdPlatformExternalSubmissionIdCompoundUniqueInput
    AND?: NormalizedSubmissionWhereInput | NormalizedSubmissionWhereInput[]
    OR?: NormalizedSubmissionWhereInput[]
    NOT?: NormalizedSubmissionWhereInput | NormalizedSubmissionWhereInput[]
    userId?: StringFilter<"NormalizedSubmission"> | string
    platform?: StringFilter<"NormalizedSubmission"> | string
    externalSubmissionId?: StringFilter<"NormalizedSubmission"> | string
    problemId?: StringFilter<"NormalizedSubmission"> | string
    problemTitle?: StringFilter<"NormalizedSubmission"> | string
    verdict?: StringFilter<"NormalizedSubmission"> | string
    accepted?: BoolFilter<"NormalizedSubmission"> | boolean
    language?: StringNullableFilter<"NormalizedSubmission"> | string | null
    difficulty?: StringFilter<"NormalizedSubmission"> | string
    topics?: StringFilter<"NormalizedSubmission"> | string
    timestamp?: DateTimeFilter<"NormalizedSubmission"> | Date | string
    contestId?: StringNullableFilter<"NormalizedSubmission"> | string | null
    rawData?: StringNullableFilter<"NormalizedSubmission"> | string | null
    createdAt?: DateTimeFilter<"NormalizedSubmission"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    problem?: XOR<ProblemScalarRelationFilter, ProblemWhereInput>
  }, "id" | "userId_platform_externalSubmissionId">

  export type NormalizedSubmissionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    externalSubmissionId?: SortOrder
    problemId?: SortOrder
    problemTitle?: SortOrder
    verdict?: SortOrder
    accepted?: SortOrder
    language?: SortOrderInput | SortOrder
    difficulty?: SortOrder
    topics?: SortOrder
    timestamp?: SortOrder
    contestId?: SortOrderInput | SortOrder
    rawData?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: NormalizedSubmissionCountOrderByAggregateInput
    _max?: NormalizedSubmissionMaxOrderByAggregateInput
    _min?: NormalizedSubmissionMinOrderByAggregateInput
  }

  export type NormalizedSubmissionScalarWhereWithAggregatesInput = {
    AND?: NormalizedSubmissionScalarWhereWithAggregatesInput | NormalizedSubmissionScalarWhereWithAggregatesInput[]
    OR?: NormalizedSubmissionScalarWhereWithAggregatesInput[]
    NOT?: NormalizedSubmissionScalarWhereWithAggregatesInput | NormalizedSubmissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NormalizedSubmission"> | string
    userId?: StringWithAggregatesFilter<"NormalizedSubmission"> | string
    platform?: StringWithAggregatesFilter<"NormalizedSubmission"> | string
    externalSubmissionId?: StringWithAggregatesFilter<"NormalizedSubmission"> | string
    problemId?: StringWithAggregatesFilter<"NormalizedSubmission"> | string
    problemTitle?: StringWithAggregatesFilter<"NormalizedSubmission"> | string
    verdict?: StringWithAggregatesFilter<"NormalizedSubmission"> | string
    accepted?: BoolWithAggregatesFilter<"NormalizedSubmission"> | boolean
    language?: StringNullableWithAggregatesFilter<"NormalizedSubmission"> | string | null
    difficulty?: StringWithAggregatesFilter<"NormalizedSubmission"> | string
    topics?: StringWithAggregatesFilter<"NormalizedSubmission"> | string
    timestamp?: DateTimeWithAggregatesFilter<"NormalizedSubmission"> | Date | string
    contestId?: StringNullableWithAggregatesFilter<"NormalizedSubmission"> | string | null
    rawData?: StringNullableWithAggregatesFilter<"NormalizedSubmission"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"NormalizedSubmission"> | Date | string
  }

  export type ContestHistoryWhereInput = {
    AND?: ContestHistoryWhereInput | ContestHistoryWhereInput[]
    OR?: ContestHistoryWhereInput[]
    NOT?: ContestHistoryWhereInput | ContestHistoryWhereInput[]
    id?: StringFilter<"ContestHistory"> | string
    userId?: StringFilter<"ContestHistory"> | string
    platform?: StringFilter<"ContestHistory"> | string
    contestId?: StringFilter<"ContestHistory"> | string
    contestName?: StringFilter<"ContestHistory"> | string
    rank?: IntFilter<"ContestHistory"> | number
    oldRating?: IntFilter<"ContestHistory"> | number
    newRating?: IntFilter<"ContestHistory"> | number
    ratingChange?: IntFilter<"ContestHistory"> | number
    timestamp?: DateTimeFilter<"ContestHistory"> | Date | string
    createdAt?: DateTimeFilter<"ContestHistory"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ContestHistoryOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    contestId?: SortOrder
    contestName?: SortOrder
    rank?: SortOrder
    oldRating?: SortOrder
    newRating?: SortOrder
    ratingChange?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ContestHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_platform_contestId?: ContestHistoryUserIdPlatformContestIdCompoundUniqueInput
    AND?: ContestHistoryWhereInput | ContestHistoryWhereInput[]
    OR?: ContestHistoryWhereInput[]
    NOT?: ContestHistoryWhereInput | ContestHistoryWhereInput[]
    userId?: StringFilter<"ContestHistory"> | string
    platform?: StringFilter<"ContestHistory"> | string
    contestId?: StringFilter<"ContestHistory"> | string
    contestName?: StringFilter<"ContestHistory"> | string
    rank?: IntFilter<"ContestHistory"> | number
    oldRating?: IntFilter<"ContestHistory"> | number
    newRating?: IntFilter<"ContestHistory"> | number
    ratingChange?: IntFilter<"ContestHistory"> | number
    timestamp?: DateTimeFilter<"ContestHistory"> | Date | string
    createdAt?: DateTimeFilter<"ContestHistory"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_platform_contestId">

  export type ContestHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    contestId?: SortOrder
    contestName?: SortOrder
    rank?: SortOrder
    oldRating?: SortOrder
    newRating?: SortOrder
    ratingChange?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
    _count?: ContestHistoryCountOrderByAggregateInput
    _avg?: ContestHistoryAvgOrderByAggregateInput
    _max?: ContestHistoryMaxOrderByAggregateInput
    _min?: ContestHistoryMinOrderByAggregateInput
    _sum?: ContestHistorySumOrderByAggregateInput
  }

  export type ContestHistoryScalarWhereWithAggregatesInput = {
    AND?: ContestHistoryScalarWhereWithAggregatesInput | ContestHistoryScalarWhereWithAggregatesInput[]
    OR?: ContestHistoryScalarWhereWithAggregatesInput[]
    NOT?: ContestHistoryScalarWhereWithAggregatesInput | ContestHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ContestHistory"> | string
    userId?: StringWithAggregatesFilter<"ContestHistory"> | string
    platform?: StringWithAggregatesFilter<"ContestHistory"> | string
    contestId?: StringWithAggregatesFilter<"ContestHistory"> | string
    contestName?: StringWithAggregatesFilter<"ContestHistory"> | string
    rank?: IntWithAggregatesFilter<"ContestHistory"> | number
    oldRating?: IntWithAggregatesFilter<"ContestHistory"> | number
    newRating?: IntWithAggregatesFilter<"ContestHistory"> | number
    ratingChange?: IntWithAggregatesFilter<"ContestHistory"> | number
    timestamp?: DateTimeWithAggregatesFilter<"ContestHistory"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"ContestHistory"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    goals?: GoalCreateNestedManyWithoutUserInput
    connections?: PlatformConnectionCreateNestedManyWithoutUserInput
    submissions?: NormalizedSubmissionCreateNestedManyWithoutUserInput
    contests?: ContestHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    goals?: GoalUncheckedCreateNestedManyWithoutUserInput
    connections?: PlatformConnectionUncheckedCreateNestedManyWithoutUserInput
    submissions?: NormalizedSubmissionUncheckedCreateNestedManyWithoutUserInput
    contests?: ContestHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    goals?: GoalUpdateManyWithoutUserNestedInput
    connections?: PlatformConnectionUpdateManyWithoutUserNestedInput
    submissions?: NormalizedSubmissionUpdateManyWithoutUserNestedInput
    contests?: ContestHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    goals?: GoalUncheckedUpdateManyWithoutUserNestedInput
    connections?: PlatformConnectionUncheckedUpdateManyWithoutUserNestedInput
    submissions?: NormalizedSubmissionUncheckedUpdateManyWithoutUserNestedInput
    contests?: ContestHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GoalCreateInput = {
    id?: string
    title: string
    category: string
    targetMetric: string
    targetValue: number
    initialValue: number
    startDate?: Date | string
    deadline: Date | string
    availableHoursPerWeek?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutGoalsInput
  }

  export type GoalUncheckedCreateInput = {
    id?: string
    userId: string
    title: string
    category: string
    targetMetric: string
    targetValue: number
    initialValue: number
    startDate?: Date | string
    deadline: Date | string
    availableHoursPerWeek?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GoalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    targetMetric?: StringFieldUpdateOperationsInput | string
    targetValue?: FloatFieldUpdateOperationsInput | number
    initialValue?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    availableHoursPerWeek?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutGoalsNestedInput
  }

  export type GoalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    targetMetric?: StringFieldUpdateOperationsInput | string
    targetValue?: FloatFieldUpdateOperationsInput | number
    initialValue?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    availableHoursPerWeek?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GoalCreateManyInput = {
    id?: string
    userId: string
    title: string
    category: string
    targetMetric: string
    targetValue: number
    initialValue: number
    startDate?: Date | string
    deadline: Date | string
    availableHoursPerWeek?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GoalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    targetMetric?: StringFieldUpdateOperationsInput | string
    targetValue?: FloatFieldUpdateOperationsInput | number
    initialValue?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    availableHoursPerWeek?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GoalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    targetMetric?: StringFieldUpdateOperationsInput | string
    targetValue?: FloatFieldUpdateOperationsInput | number
    initialValue?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    availableHoursPerWeek?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlatformConnectionCreateInput = {
    id?: string
    platform: string
    username: string
    status?: string
    lastError?: string | null
    lastSyncedAt?: Date | string | null
    profileData?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutConnectionsInput
  }

  export type PlatformConnectionUncheckedCreateInput = {
    id?: string
    userId: string
    platform: string
    username: string
    status?: string
    lastError?: string | null
    lastSyncedAt?: Date | string | null
    profileData?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlatformConnectionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileData?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutConnectionsNestedInput
  }

  export type PlatformConnectionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileData?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlatformConnectionCreateManyInput = {
    id?: string
    userId: string
    platform: string
    username: string
    status?: string
    lastError?: string | null
    lastSyncedAt?: Date | string | null
    profileData?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlatformConnectionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileData?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlatformConnectionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileData?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProblemCreateInput = {
    id?: string
    platform: string
    externalProblemId: string
    title: string
    difficulty: string
    numericDifficulty?: number | null
    topics: string
    rawTags: string
    metadata?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    submissions?: NormalizedSubmissionCreateNestedManyWithoutProblemInput
  }

  export type ProblemUncheckedCreateInput = {
    id?: string
    platform: string
    externalProblemId: string
    title: string
    difficulty: string
    numericDifficulty?: number | null
    topics: string
    rawTags: string
    metadata?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    submissions?: NormalizedSubmissionUncheckedCreateNestedManyWithoutProblemInput
  }

  export type ProblemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    externalProblemId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    numericDifficulty?: NullableIntFieldUpdateOperationsInput | number | null
    topics?: StringFieldUpdateOperationsInput | string
    rawTags?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submissions?: NormalizedSubmissionUpdateManyWithoutProblemNestedInput
  }

  export type ProblemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    externalProblemId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    numericDifficulty?: NullableIntFieldUpdateOperationsInput | number | null
    topics?: StringFieldUpdateOperationsInput | string
    rawTags?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submissions?: NormalizedSubmissionUncheckedUpdateManyWithoutProblemNestedInput
  }

  export type ProblemCreateManyInput = {
    id?: string
    platform: string
    externalProblemId: string
    title: string
    difficulty: string
    numericDifficulty?: number | null
    topics: string
    rawTags: string
    metadata?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProblemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    externalProblemId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    numericDifficulty?: NullableIntFieldUpdateOperationsInput | number | null
    topics?: StringFieldUpdateOperationsInput | string
    rawTags?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProblemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    externalProblemId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    numericDifficulty?: NullableIntFieldUpdateOperationsInput | number | null
    topics?: StringFieldUpdateOperationsInput | string
    rawTags?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NormalizedSubmissionCreateInput = {
    id?: string
    platform: string
    externalSubmissionId: string
    problemTitle: string
    verdict: string
    accepted: boolean
    language?: string | null
    difficulty: string
    topics: string
    timestamp: Date | string
    contestId?: string | null
    rawData?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSubmissionsInput
    problem: ProblemCreateNestedOneWithoutSubmissionsInput
  }

  export type NormalizedSubmissionUncheckedCreateInput = {
    id?: string
    userId: string
    platform: string
    externalSubmissionId: string
    problemId: string
    problemTitle: string
    verdict: string
    accepted: boolean
    language?: string | null
    difficulty: string
    topics: string
    timestamp: Date | string
    contestId?: string | null
    rawData?: string | null
    createdAt?: Date | string
  }

  export type NormalizedSubmissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    externalSubmissionId?: StringFieldUpdateOperationsInput | string
    problemTitle?: StringFieldUpdateOperationsInput | string
    verdict?: StringFieldUpdateOperationsInput | string
    accepted?: BoolFieldUpdateOperationsInput | boolean
    language?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: StringFieldUpdateOperationsInput | string
    topics?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    contestId?: NullableStringFieldUpdateOperationsInput | string | null
    rawData?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSubmissionsNestedInput
    problem?: ProblemUpdateOneRequiredWithoutSubmissionsNestedInput
  }

  export type NormalizedSubmissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    externalSubmissionId?: StringFieldUpdateOperationsInput | string
    problemId?: StringFieldUpdateOperationsInput | string
    problemTitle?: StringFieldUpdateOperationsInput | string
    verdict?: StringFieldUpdateOperationsInput | string
    accepted?: BoolFieldUpdateOperationsInput | boolean
    language?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: StringFieldUpdateOperationsInput | string
    topics?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    contestId?: NullableStringFieldUpdateOperationsInput | string | null
    rawData?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NormalizedSubmissionCreateManyInput = {
    id?: string
    userId: string
    platform: string
    externalSubmissionId: string
    problemId: string
    problemTitle: string
    verdict: string
    accepted: boolean
    language?: string | null
    difficulty: string
    topics: string
    timestamp: Date | string
    contestId?: string | null
    rawData?: string | null
    createdAt?: Date | string
  }

  export type NormalizedSubmissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    externalSubmissionId?: StringFieldUpdateOperationsInput | string
    problemTitle?: StringFieldUpdateOperationsInput | string
    verdict?: StringFieldUpdateOperationsInput | string
    accepted?: BoolFieldUpdateOperationsInput | boolean
    language?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: StringFieldUpdateOperationsInput | string
    topics?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    contestId?: NullableStringFieldUpdateOperationsInput | string | null
    rawData?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NormalizedSubmissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    externalSubmissionId?: StringFieldUpdateOperationsInput | string
    problemId?: StringFieldUpdateOperationsInput | string
    problemTitle?: StringFieldUpdateOperationsInput | string
    verdict?: StringFieldUpdateOperationsInput | string
    accepted?: BoolFieldUpdateOperationsInput | boolean
    language?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: StringFieldUpdateOperationsInput | string
    topics?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    contestId?: NullableStringFieldUpdateOperationsInput | string | null
    rawData?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContestHistoryCreateInput = {
    id?: string
    platform: string
    contestId: string
    contestName: string
    rank: number
    oldRating: number
    newRating: number
    ratingChange: number
    timestamp: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutContestsInput
  }

  export type ContestHistoryUncheckedCreateInput = {
    id?: string
    userId: string
    platform: string
    contestId: string
    contestName: string
    rank: number
    oldRating: number
    newRating: number
    ratingChange: number
    timestamp: Date | string
    createdAt?: Date | string
  }

  export type ContestHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    contestId?: StringFieldUpdateOperationsInput | string
    contestName?: StringFieldUpdateOperationsInput | string
    rank?: IntFieldUpdateOperationsInput | number
    oldRating?: IntFieldUpdateOperationsInput | number
    newRating?: IntFieldUpdateOperationsInput | number
    ratingChange?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutContestsNestedInput
  }

  export type ContestHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    contestId?: StringFieldUpdateOperationsInput | string
    contestName?: StringFieldUpdateOperationsInput | string
    rank?: IntFieldUpdateOperationsInput | number
    oldRating?: IntFieldUpdateOperationsInput | number
    newRating?: IntFieldUpdateOperationsInput | number
    ratingChange?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContestHistoryCreateManyInput = {
    id?: string
    userId: string
    platform: string
    contestId: string
    contestName: string
    rank: number
    oldRating: number
    newRating: number
    ratingChange: number
    timestamp: Date | string
    createdAt?: Date | string
  }

  export type ContestHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    contestId?: StringFieldUpdateOperationsInput | string
    contestName?: StringFieldUpdateOperationsInput | string
    rank?: IntFieldUpdateOperationsInput | number
    oldRating?: IntFieldUpdateOperationsInput | number
    newRating?: IntFieldUpdateOperationsInput | number
    ratingChange?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContestHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    contestId?: StringFieldUpdateOperationsInput | string
    contestName?: StringFieldUpdateOperationsInput | string
    rank?: IntFieldUpdateOperationsInput | number
    oldRating?: IntFieldUpdateOperationsInput | number
    newRating?: IntFieldUpdateOperationsInput | number
    ratingChange?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type GoalListRelationFilter = {
    every?: GoalWhereInput
    some?: GoalWhereInput
    none?: GoalWhereInput
  }

  export type PlatformConnectionListRelationFilter = {
    every?: PlatformConnectionWhereInput
    some?: PlatformConnectionWhereInput
    none?: PlatformConnectionWhereInput
  }

  export type NormalizedSubmissionListRelationFilter = {
    every?: NormalizedSubmissionWhereInput
    some?: NormalizedSubmissionWhereInput
    none?: NormalizedSubmissionWhereInput
  }

  export type ContestHistoryListRelationFilter = {
    every?: ContestHistoryWhereInput
    some?: ContestHistoryWhereInput
    none?: ContestHistoryWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type GoalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PlatformConnectionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NormalizedSubmissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ContestHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type GoalCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    category?: SortOrder
    targetMetric?: SortOrder
    targetValue?: SortOrder
    initialValue?: SortOrder
    startDate?: SortOrder
    deadline?: SortOrder
    availableHoursPerWeek?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GoalAvgOrderByAggregateInput = {
    targetValue?: SortOrder
    initialValue?: SortOrder
    availableHoursPerWeek?: SortOrder
  }

  export type GoalMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    category?: SortOrder
    targetMetric?: SortOrder
    targetValue?: SortOrder
    initialValue?: SortOrder
    startDate?: SortOrder
    deadline?: SortOrder
    availableHoursPerWeek?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GoalMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    category?: SortOrder
    targetMetric?: SortOrder
    targetValue?: SortOrder
    initialValue?: SortOrder
    startDate?: SortOrder
    deadline?: SortOrder
    availableHoursPerWeek?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GoalSumOrderByAggregateInput = {
    targetValue?: SortOrder
    initialValue?: SortOrder
    availableHoursPerWeek?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type PlatformConnectionUserIdPlatformCompoundUniqueInput = {
    userId: string
    platform: string
  }

  export type PlatformConnectionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    username?: SortOrder
    status?: SortOrder
    lastError?: SortOrder
    lastSyncedAt?: SortOrder
    profileData?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlatformConnectionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    username?: SortOrder
    status?: SortOrder
    lastError?: SortOrder
    lastSyncedAt?: SortOrder
    profileData?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlatformConnectionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    username?: SortOrder
    status?: SortOrder
    lastError?: SortOrder
    lastSyncedAt?: SortOrder
    profileData?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ProblemPlatformExternalProblemIdCompoundUniqueInput = {
    platform: string
    externalProblemId: string
  }

  export type ProblemCountOrderByAggregateInput = {
    id?: SortOrder
    platform?: SortOrder
    externalProblemId?: SortOrder
    title?: SortOrder
    difficulty?: SortOrder
    numericDifficulty?: SortOrder
    topics?: SortOrder
    rawTags?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProblemAvgOrderByAggregateInput = {
    numericDifficulty?: SortOrder
  }

  export type ProblemMaxOrderByAggregateInput = {
    id?: SortOrder
    platform?: SortOrder
    externalProblemId?: SortOrder
    title?: SortOrder
    difficulty?: SortOrder
    numericDifficulty?: SortOrder
    topics?: SortOrder
    rawTags?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProblemMinOrderByAggregateInput = {
    id?: SortOrder
    platform?: SortOrder
    externalProblemId?: SortOrder
    title?: SortOrder
    difficulty?: SortOrder
    numericDifficulty?: SortOrder
    topics?: SortOrder
    rawTags?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProblemSumOrderByAggregateInput = {
    numericDifficulty?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ProblemScalarRelationFilter = {
    is?: ProblemWhereInput
    isNot?: ProblemWhereInput
  }

  export type NormalizedSubmissionUserIdPlatformExternalSubmissionIdCompoundUniqueInput = {
    userId: string
    platform: string
    externalSubmissionId: string
  }

  export type NormalizedSubmissionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    externalSubmissionId?: SortOrder
    problemId?: SortOrder
    problemTitle?: SortOrder
    verdict?: SortOrder
    accepted?: SortOrder
    language?: SortOrder
    difficulty?: SortOrder
    topics?: SortOrder
    timestamp?: SortOrder
    contestId?: SortOrder
    rawData?: SortOrder
    createdAt?: SortOrder
  }

  export type NormalizedSubmissionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    externalSubmissionId?: SortOrder
    problemId?: SortOrder
    problemTitle?: SortOrder
    verdict?: SortOrder
    accepted?: SortOrder
    language?: SortOrder
    difficulty?: SortOrder
    topics?: SortOrder
    timestamp?: SortOrder
    contestId?: SortOrder
    rawData?: SortOrder
    createdAt?: SortOrder
  }

  export type NormalizedSubmissionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    externalSubmissionId?: SortOrder
    problemId?: SortOrder
    problemTitle?: SortOrder
    verdict?: SortOrder
    accepted?: SortOrder
    language?: SortOrder
    difficulty?: SortOrder
    topics?: SortOrder
    timestamp?: SortOrder
    contestId?: SortOrder
    rawData?: SortOrder
    createdAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ContestHistoryUserIdPlatformContestIdCompoundUniqueInput = {
    userId: string
    platform: string
    contestId: string
  }

  export type ContestHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    contestId?: SortOrder
    contestName?: SortOrder
    rank?: SortOrder
    oldRating?: SortOrder
    newRating?: SortOrder
    ratingChange?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
  }

  export type ContestHistoryAvgOrderByAggregateInput = {
    rank?: SortOrder
    oldRating?: SortOrder
    newRating?: SortOrder
    ratingChange?: SortOrder
  }

  export type ContestHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    contestId?: SortOrder
    contestName?: SortOrder
    rank?: SortOrder
    oldRating?: SortOrder
    newRating?: SortOrder
    ratingChange?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
  }

  export type ContestHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    contestId?: SortOrder
    contestName?: SortOrder
    rank?: SortOrder
    oldRating?: SortOrder
    newRating?: SortOrder
    ratingChange?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
  }

  export type ContestHistorySumOrderByAggregateInput = {
    rank?: SortOrder
    oldRating?: SortOrder
    newRating?: SortOrder
    ratingChange?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type GoalCreateNestedManyWithoutUserInput = {
    create?: XOR<GoalCreateWithoutUserInput, GoalUncheckedCreateWithoutUserInput> | GoalCreateWithoutUserInput[] | GoalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GoalCreateOrConnectWithoutUserInput | GoalCreateOrConnectWithoutUserInput[]
    createMany?: GoalCreateManyUserInputEnvelope
    connect?: GoalWhereUniqueInput | GoalWhereUniqueInput[]
  }

  export type PlatformConnectionCreateNestedManyWithoutUserInput = {
    create?: XOR<PlatformConnectionCreateWithoutUserInput, PlatformConnectionUncheckedCreateWithoutUserInput> | PlatformConnectionCreateWithoutUserInput[] | PlatformConnectionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PlatformConnectionCreateOrConnectWithoutUserInput | PlatformConnectionCreateOrConnectWithoutUserInput[]
    createMany?: PlatformConnectionCreateManyUserInputEnvelope
    connect?: PlatformConnectionWhereUniqueInput | PlatformConnectionWhereUniqueInput[]
  }

  export type NormalizedSubmissionCreateNestedManyWithoutUserInput = {
    create?: XOR<NormalizedSubmissionCreateWithoutUserInput, NormalizedSubmissionUncheckedCreateWithoutUserInput> | NormalizedSubmissionCreateWithoutUserInput[] | NormalizedSubmissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NormalizedSubmissionCreateOrConnectWithoutUserInput | NormalizedSubmissionCreateOrConnectWithoutUserInput[]
    createMany?: NormalizedSubmissionCreateManyUserInputEnvelope
    connect?: NormalizedSubmissionWhereUniqueInput | NormalizedSubmissionWhereUniqueInput[]
  }

  export type ContestHistoryCreateNestedManyWithoutUserInput = {
    create?: XOR<ContestHistoryCreateWithoutUserInput, ContestHistoryUncheckedCreateWithoutUserInput> | ContestHistoryCreateWithoutUserInput[] | ContestHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ContestHistoryCreateOrConnectWithoutUserInput | ContestHistoryCreateOrConnectWithoutUserInput[]
    createMany?: ContestHistoryCreateManyUserInputEnvelope
    connect?: ContestHistoryWhereUniqueInput | ContestHistoryWhereUniqueInput[]
  }

  export type GoalUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<GoalCreateWithoutUserInput, GoalUncheckedCreateWithoutUserInput> | GoalCreateWithoutUserInput[] | GoalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GoalCreateOrConnectWithoutUserInput | GoalCreateOrConnectWithoutUserInput[]
    createMany?: GoalCreateManyUserInputEnvelope
    connect?: GoalWhereUniqueInput | GoalWhereUniqueInput[]
  }

  export type PlatformConnectionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PlatformConnectionCreateWithoutUserInput, PlatformConnectionUncheckedCreateWithoutUserInput> | PlatformConnectionCreateWithoutUserInput[] | PlatformConnectionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PlatformConnectionCreateOrConnectWithoutUserInput | PlatformConnectionCreateOrConnectWithoutUserInput[]
    createMany?: PlatformConnectionCreateManyUserInputEnvelope
    connect?: PlatformConnectionWhereUniqueInput | PlatformConnectionWhereUniqueInput[]
  }

  export type NormalizedSubmissionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NormalizedSubmissionCreateWithoutUserInput, NormalizedSubmissionUncheckedCreateWithoutUserInput> | NormalizedSubmissionCreateWithoutUserInput[] | NormalizedSubmissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NormalizedSubmissionCreateOrConnectWithoutUserInput | NormalizedSubmissionCreateOrConnectWithoutUserInput[]
    createMany?: NormalizedSubmissionCreateManyUserInputEnvelope
    connect?: NormalizedSubmissionWhereUniqueInput | NormalizedSubmissionWhereUniqueInput[]
  }

  export type ContestHistoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ContestHistoryCreateWithoutUserInput, ContestHistoryUncheckedCreateWithoutUserInput> | ContestHistoryCreateWithoutUserInput[] | ContestHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ContestHistoryCreateOrConnectWithoutUserInput | ContestHistoryCreateOrConnectWithoutUserInput[]
    createMany?: ContestHistoryCreateManyUserInputEnvelope
    connect?: ContestHistoryWhereUniqueInput | ContestHistoryWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type GoalUpdateManyWithoutUserNestedInput = {
    create?: XOR<GoalCreateWithoutUserInput, GoalUncheckedCreateWithoutUserInput> | GoalCreateWithoutUserInput[] | GoalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GoalCreateOrConnectWithoutUserInput | GoalCreateOrConnectWithoutUserInput[]
    upsert?: GoalUpsertWithWhereUniqueWithoutUserInput | GoalUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GoalCreateManyUserInputEnvelope
    set?: GoalWhereUniqueInput | GoalWhereUniqueInput[]
    disconnect?: GoalWhereUniqueInput | GoalWhereUniqueInput[]
    delete?: GoalWhereUniqueInput | GoalWhereUniqueInput[]
    connect?: GoalWhereUniqueInput | GoalWhereUniqueInput[]
    update?: GoalUpdateWithWhereUniqueWithoutUserInput | GoalUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GoalUpdateManyWithWhereWithoutUserInput | GoalUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GoalScalarWhereInput | GoalScalarWhereInput[]
  }

  export type PlatformConnectionUpdateManyWithoutUserNestedInput = {
    create?: XOR<PlatformConnectionCreateWithoutUserInput, PlatformConnectionUncheckedCreateWithoutUserInput> | PlatformConnectionCreateWithoutUserInput[] | PlatformConnectionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PlatformConnectionCreateOrConnectWithoutUserInput | PlatformConnectionCreateOrConnectWithoutUserInput[]
    upsert?: PlatformConnectionUpsertWithWhereUniqueWithoutUserInput | PlatformConnectionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PlatformConnectionCreateManyUserInputEnvelope
    set?: PlatformConnectionWhereUniqueInput | PlatformConnectionWhereUniqueInput[]
    disconnect?: PlatformConnectionWhereUniqueInput | PlatformConnectionWhereUniqueInput[]
    delete?: PlatformConnectionWhereUniqueInput | PlatformConnectionWhereUniqueInput[]
    connect?: PlatformConnectionWhereUniqueInput | PlatformConnectionWhereUniqueInput[]
    update?: PlatformConnectionUpdateWithWhereUniqueWithoutUserInput | PlatformConnectionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PlatformConnectionUpdateManyWithWhereWithoutUserInput | PlatformConnectionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PlatformConnectionScalarWhereInput | PlatformConnectionScalarWhereInput[]
  }

  export type NormalizedSubmissionUpdateManyWithoutUserNestedInput = {
    create?: XOR<NormalizedSubmissionCreateWithoutUserInput, NormalizedSubmissionUncheckedCreateWithoutUserInput> | NormalizedSubmissionCreateWithoutUserInput[] | NormalizedSubmissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NormalizedSubmissionCreateOrConnectWithoutUserInput | NormalizedSubmissionCreateOrConnectWithoutUserInput[]
    upsert?: NormalizedSubmissionUpsertWithWhereUniqueWithoutUserInput | NormalizedSubmissionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NormalizedSubmissionCreateManyUserInputEnvelope
    set?: NormalizedSubmissionWhereUniqueInput | NormalizedSubmissionWhereUniqueInput[]
    disconnect?: NormalizedSubmissionWhereUniqueInput | NormalizedSubmissionWhereUniqueInput[]
    delete?: NormalizedSubmissionWhereUniqueInput | NormalizedSubmissionWhereUniqueInput[]
    connect?: NormalizedSubmissionWhereUniqueInput | NormalizedSubmissionWhereUniqueInput[]
    update?: NormalizedSubmissionUpdateWithWhereUniqueWithoutUserInput | NormalizedSubmissionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NormalizedSubmissionUpdateManyWithWhereWithoutUserInput | NormalizedSubmissionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NormalizedSubmissionScalarWhereInput | NormalizedSubmissionScalarWhereInput[]
  }

  export type ContestHistoryUpdateManyWithoutUserNestedInput = {
    create?: XOR<ContestHistoryCreateWithoutUserInput, ContestHistoryUncheckedCreateWithoutUserInput> | ContestHistoryCreateWithoutUserInput[] | ContestHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ContestHistoryCreateOrConnectWithoutUserInput | ContestHistoryCreateOrConnectWithoutUserInput[]
    upsert?: ContestHistoryUpsertWithWhereUniqueWithoutUserInput | ContestHistoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ContestHistoryCreateManyUserInputEnvelope
    set?: ContestHistoryWhereUniqueInput | ContestHistoryWhereUniqueInput[]
    disconnect?: ContestHistoryWhereUniqueInput | ContestHistoryWhereUniqueInput[]
    delete?: ContestHistoryWhereUniqueInput | ContestHistoryWhereUniqueInput[]
    connect?: ContestHistoryWhereUniqueInput | ContestHistoryWhereUniqueInput[]
    update?: ContestHistoryUpdateWithWhereUniqueWithoutUserInput | ContestHistoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ContestHistoryUpdateManyWithWhereWithoutUserInput | ContestHistoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ContestHistoryScalarWhereInput | ContestHistoryScalarWhereInput[]
  }

  export type GoalUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<GoalCreateWithoutUserInput, GoalUncheckedCreateWithoutUserInput> | GoalCreateWithoutUserInput[] | GoalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GoalCreateOrConnectWithoutUserInput | GoalCreateOrConnectWithoutUserInput[]
    upsert?: GoalUpsertWithWhereUniqueWithoutUserInput | GoalUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GoalCreateManyUserInputEnvelope
    set?: GoalWhereUniqueInput | GoalWhereUniqueInput[]
    disconnect?: GoalWhereUniqueInput | GoalWhereUniqueInput[]
    delete?: GoalWhereUniqueInput | GoalWhereUniqueInput[]
    connect?: GoalWhereUniqueInput | GoalWhereUniqueInput[]
    update?: GoalUpdateWithWhereUniqueWithoutUserInput | GoalUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GoalUpdateManyWithWhereWithoutUserInput | GoalUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GoalScalarWhereInput | GoalScalarWhereInput[]
  }

  export type PlatformConnectionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PlatformConnectionCreateWithoutUserInput, PlatformConnectionUncheckedCreateWithoutUserInput> | PlatformConnectionCreateWithoutUserInput[] | PlatformConnectionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PlatformConnectionCreateOrConnectWithoutUserInput | PlatformConnectionCreateOrConnectWithoutUserInput[]
    upsert?: PlatformConnectionUpsertWithWhereUniqueWithoutUserInput | PlatformConnectionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PlatformConnectionCreateManyUserInputEnvelope
    set?: PlatformConnectionWhereUniqueInput | PlatformConnectionWhereUniqueInput[]
    disconnect?: PlatformConnectionWhereUniqueInput | PlatformConnectionWhereUniqueInput[]
    delete?: PlatformConnectionWhereUniqueInput | PlatformConnectionWhereUniqueInput[]
    connect?: PlatformConnectionWhereUniqueInput | PlatformConnectionWhereUniqueInput[]
    update?: PlatformConnectionUpdateWithWhereUniqueWithoutUserInput | PlatformConnectionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PlatformConnectionUpdateManyWithWhereWithoutUserInput | PlatformConnectionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PlatformConnectionScalarWhereInput | PlatformConnectionScalarWhereInput[]
  }

  export type NormalizedSubmissionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NormalizedSubmissionCreateWithoutUserInput, NormalizedSubmissionUncheckedCreateWithoutUserInput> | NormalizedSubmissionCreateWithoutUserInput[] | NormalizedSubmissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NormalizedSubmissionCreateOrConnectWithoutUserInput | NormalizedSubmissionCreateOrConnectWithoutUserInput[]
    upsert?: NormalizedSubmissionUpsertWithWhereUniqueWithoutUserInput | NormalizedSubmissionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NormalizedSubmissionCreateManyUserInputEnvelope
    set?: NormalizedSubmissionWhereUniqueInput | NormalizedSubmissionWhereUniqueInput[]
    disconnect?: NormalizedSubmissionWhereUniqueInput | NormalizedSubmissionWhereUniqueInput[]
    delete?: NormalizedSubmissionWhereUniqueInput | NormalizedSubmissionWhereUniqueInput[]
    connect?: NormalizedSubmissionWhereUniqueInput | NormalizedSubmissionWhereUniqueInput[]
    update?: NormalizedSubmissionUpdateWithWhereUniqueWithoutUserInput | NormalizedSubmissionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NormalizedSubmissionUpdateManyWithWhereWithoutUserInput | NormalizedSubmissionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NormalizedSubmissionScalarWhereInput | NormalizedSubmissionScalarWhereInput[]
  }

  export type ContestHistoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ContestHistoryCreateWithoutUserInput, ContestHistoryUncheckedCreateWithoutUserInput> | ContestHistoryCreateWithoutUserInput[] | ContestHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ContestHistoryCreateOrConnectWithoutUserInput | ContestHistoryCreateOrConnectWithoutUserInput[]
    upsert?: ContestHistoryUpsertWithWhereUniqueWithoutUserInput | ContestHistoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ContestHistoryCreateManyUserInputEnvelope
    set?: ContestHistoryWhereUniqueInput | ContestHistoryWhereUniqueInput[]
    disconnect?: ContestHistoryWhereUniqueInput | ContestHistoryWhereUniqueInput[]
    delete?: ContestHistoryWhereUniqueInput | ContestHistoryWhereUniqueInput[]
    connect?: ContestHistoryWhereUniqueInput | ContestHistoryWhereUniqueInput[]
    update?: ContestHistoryUpdateWithWhereUniqueWithoutUserInput | ContestHistoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ContestHistoryUpdateManyWithWhereWithoutUserInput | ContestHistoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ContestHistoryScalarWhereInput | ContestHistoryScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutGoalsInput = {
    create?: XOR<UserCreateWithoutGoalsInput, UserUncheckedCreateWithoutGoalsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGoalsInput
    connect?: UserWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutGoalsNestedInput = {
    create?: XOR<UserCreateWithoutGoalsInput, UserUncheckedCreateWithoutGoalsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGoalsInput
    upsert?: UserUpsertWithoutGoalsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGoalsInput, UserUpdateWithoutGoalsInput>, UserUncheckedUpdateWithoutGoalsInput>
  }

  export type UserCreateNestedOneWithoutConnectionsInput = {
    create?: XOR<UserCreateWithoutConnectionsInput, UserUncheckedCreateWithoutConnectionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConnectionsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutConnectionsNestedInput = {
    create?: XOR<UserCreateWithoutConnectionsInput, UserUncheckedCreateWithoutConnectionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConnectionsInput
    upsert?: UserUpsertWithoutConnectionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutConnectionsInput, UserUpdateWithoutConnectionsInput>, UserUncheckedUpdateWithoutConnectionsInput>
  }

  export type NormalizedSubmissionCreateNestedManyWithoutProblemInput = {
    create?: XOR<NormalizedSubmissionCreateWithoutProblemInput, NormalizedSubmissionUncheckedCreateWithoutProblemInput> | NormalizedSubmissionCreateWithoutProblemInput[] | NormalizedSubmissionUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: NormalizedSubmissionCreateOrConnectWithoutProblemInput | NormalizedSubmissionCreateOrConnectWithoutProblemInput[]
    createMany?: NormalizedSubmissionCreateManyProblemInputEnvelope
    connect?: NormalizedSubmissionWhereUniqueInput | NormalizedSubmissionWhereUniqueInput[]
  }

  export type NormalizedSubmissionUncheckedCreateNestedManyWithoutProblemInput = {
    create?: XOR<NormalizedSubmissionCreateWithoutProblemInput, NormalizedSubmissionUncheckedCreateWithoutProblemInput> | NormalizedSubmissionCreateWithoutProblemInput[] | NormalizedSubmissionUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: NormalizedSubmissionCreateOrConnectWithoutProblemInput | NormalizedSubmissionCreateOrConnectWithoutProblemInput[]
    createMany?: NormalizedSubmissionCreateManyProblemInputEnvelope
    connect?: NormalizedSubmissionWhereUniqueInput | NormalizedSubmissionWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NormalizedSubmissionUpdateManyWithoutProblemNestedInput = {
    create?: XOR<NormalizedSubmissionCreateWithoutProblemInput, NormalizedSubmissionUncheckedCreateWithoutProblemInput> | NormalizedSubmissionCreateWithoutProblemInput[] | NormalizedSubmissionUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: NormalizedSubmissionCreateOrConnectWithoutProblemInput | NormalizedSubmissionCreateOrConnectWithoutProblemInput[]
    upsert?: NormalizedSubmissionUpsertWithWhereUniqueWithoutProblemInput | NormalizedSubmissionUpsertWithWhereUniqueWithoutProblemInput[]
    createMany?: NormalizedSubmissionCreateManyProblemInputEnvelope
    set?: NormalizedSubmissionWhereUniqueInput | NormalizedSubmissionWhereUniqueInput[]
    disconnect?: NormalizedSubmissionWhereUniqueInput | NormalizedSubmissionWhereUniqueInput[]
    delete?: NormalizedSubmissionWhereUniqueInput | NormalizedSubmissionWhereUniqueInput[]
    connect?: NormalizedSubmissionWhereUniqueInput | NormalizedSubmissionWhereUniqueInput[]
    update?: NormalizedSubmissionUpdateWithWhereUniqueWithoutProblemInput | NormalizedSubmissionUpdateWithWhereUniqueWithoutProblemInput[]
    updateMany?: NormalizedSubmissionUpdateManyWithWhereWithoutProblemInput | NormalizedSubmissionUpdateManyWithWhereWithoutProblemInput[]
    deleteMany?: NormalizedSubmissionScalarWhereInput | NormalizedSubmissionScalarWhereInput[]
  }

  export type NormalizedSubmissionUncheckedUpdateManyWithoutProblemNestedInput = {
    create?: XOR<NormalizedSubmissionCreateWithoutProblemInput, NormalizedSubmissionUncheckedCreateWithoutProblemInput> | NormalizedSubmissionCreateWithoutProblemInput[] | NormalizedSubmissionUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: NormalizedSubmissionCreateOrConnectWithoutProblemInput | NormalizedSubmissionCreateOrConnectWithoutProblemInput[]
    upsert?: NormalizedSubmissionUpsertWithWhereUniqueWithoutProblemInput | NormalizedSubmissionUpsertWithWhereUniqueWithoutProblemInput[]
    createMany?: NormalizedSubmissionCreateManyProblemInputEnvelope
    set?: NormalizedSubmissionWhereUniqueInput | NormalizedSubmissionWhereUniqueInput[]
    disconnect?: NormalizedSubmissionWhereUniqueInput | NormalizedSubmissionWhereUniqueInput[]
    delete?: NormalizedSubmissionWhereUniqueInput | NormalizedSubmissionWhereUniqueInput[]
    connect?: NormalizedSubmissionWhereUniqueInput | NormalizedSubmissionWhereUniqueInput[]
    update?: NormalizedSubmissionUpdateWithWhereUniqueWithoutProblemInput | NormalizedSubmissionUpdateWithWhereUniqueWithoutProblemInput[]
    updateMany?: NormalizedSubmissionUpdateManyWithWhereWithoutProblemInput | NormalizedSubmissionUpdateManyWithWhereWithoutProblemInput[]
    deleteMany?: NormalizedSubmissionScalarWhereInput | NormalizedSubmissionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSubmissionsInput = {
    create?: XOR<UserCreateWithoutSubmissionsInput, UserUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubmissionsInput
    connect?: UserWhereUniqueInput
  }

  export type ProblemCreateNestedOneWithoutSubmissionsInput = {
    create?: XOR<ProblemCreateWithoutSubmissionsInput, ProblemUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: ProblemCreateOrConnectWithoutSubmissionsInput
    connect?: ProblemWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutSubmissionsNestedInput = {
    create?: XOR<UserCreateWithoutSubmissionsInput, UserUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubmissionsInput
    upsert?: UserUpsertWithoutSubmissionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSubmissionsInput, UserUpdateWithoutSubmissionsInput>, UserUncheckedUpdateWithoutSubmissionsInput>
  }

  export type ProblemUpdateOneRequiredWithoutSubmissionsNestedInput = {
    create?: XOR<ProblemCreateWithoutSubmissionsInput, ProblemUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: ProblemCreateOrConnectWithoutSubmissionsInput
    upsert?: ProblemUpsertWithoutSubmissionsInput
    connect?: ProblemWhereUniqueInput
    update?: XOR<XOR<ProblemUpdateToOneWithWhereWithoutSubmissionsInput, ProblemUpdateWithoutSubmissionsInput>, ProblemUncheckedUpdateWithoutSubmissionsInput>
  }

  export type UserCreateNestedOneWithoutContestsInput = {
    create?: XOR<UserCreateWithoutContestsInput, UserUncheckedCreateWithoutContestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutContestsInput
    connect?: UserWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutContestsNestedInput = {
    create?: XOR<UserCreateWithoutContestsInput, UserUncheckedCreateWithoutContestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutContestsInput
    upsert?: UserUpsertWithoutContestsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutContestsInput, UserUpdateWithoutContestsInput>, UserUncheckedUpdateWithoutContestsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type GoalCreateWithoutUserInput = {
    id?: string
    title: string
    category: string
    targetMetric: string
    targetValue: number
    initialValue: number
    startDate?: Date | string
    deadline: Date | string
    availableHoursPerWeek?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GoalUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    category: string
    targetMetric: string
    targetValue: number
    initialValue: number
    startDate?: Date | string
    deadline: Date | string
    availableHoursPerWeek?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GoalCreateOrConnectWithoutUserInput = {
    where: GoalWhereUniqueInput
    create: XOR<GoalCreateWithoutUserInput, GoalUncheckedCreateWithoutUserInput>
  }

  export type GoalCreateManyUserInputEnvelope = {
    data: GoalCreateManyUserInput | GoalCreateManyUserInput[]
  }

  export type PlatformConnectionCreateWithoutUserInput = {
    id?: string
    platform: string
    username: string
    status?: string
    lastError?: string | null
    lastSyncedAt?: Date | string | null
    profileData?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlatformConnectionUncheckedCreateWithoutUserInput = {
    id?: string
    platform: string
    username: string
    status?: string
    lastError?: string | null
    lastSyncedAt?: Date | string | null
    profileData?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlatformConnectionCreateOrConnectWithoutUserInput = {
    where: PlatformConnectionWhereUniqueInput
    create: XOR<PlatformConnectionCreateWithoutUserInput, PlatformConnectionUncheckedCreateWithoutUserInput>
  }

  export type PlatformConnectionCreateManyUserInputEnvelope = {
    data: PlatformConnectionCreateManyUserInput | PlatformConnectionCreateManyUserInput[]
  }

  export type NormalizedSubmissionCreateWithoutUserInput = {
    id?: string
    platform: string
    externalSubmissionId: string
    problemTitle: string
    verdict: string
    accepted: boolean
    language?: string | null
    difficulty: string
    topics: string
    timestamp: Date | string
    contestId?: string | null
    rawData?: string | null
    createdAt?: Date | string
    problem: ProblemCreateNestedOneWithoutSubmissionsInput
  }

  export type NormalizedSubmissionUncheckedCreateWithoutUserInput = {
    id?: string
    platform: string
    externalSubmissionId: string
    problemId: string
    problemTitle: string
    verdict: string
    accepted: boolean
    language?: string | null
    difficulty: string
    topics: string
    timestamp: Date | string
    contestId?: string | null
    rawData?: string | null
    createdAt?: Date | string
  }

  export type NormalizedSubmissionCreateOrConnectWithoutUserInput = {
    where: NormalizedSubmissionWhereUniqueInput
    create: XOR<NormalizedSubmissionCreateWithoutUserInput, NormalizedSubmissionUncheckedCreateWithoutUserInput>
  }

  export type NormalizedSubmissionCreateManyUserInputEnvelope = {
    data: NormalizedSubmissionCreateManyUserInput | NormalizedSubmissionCreateManyUserInput[]
  }

  export type ContestHistoryCreateWithoutUserInput = {
    id?: string
    platform: string
    contestId: string
    contestName: string
    rank: number
    oldRating: number
    newRating: number
    ratingChange: number
    timestamp: Date | string
    createdAt?: Date | string
  }

  export type ContestHistoryUncheckedCreateWithoutUserInput = {
    id?: string
    platform: string
    contestId: string
    contestName: string
    rank: number
    oldRating: number
    newRating: number
    ratingChange: number
    timestamp: Date | string
    createdAt?: Date | string
  }

  export type ContestHistoryCreateOrConnectWithoutUserInput = {
    where: ContestHistoryWhereUniqueInput
    create: XOR<ContestHistoryCreateWithoutUserInput, ContestHistoryUncheckedCreateWithoutUserInput>
  }

  export type ContestHistoryCreateManyUserInputEnvelope = {
    data: ContestHistoryCreateManyUserInput | ContestHistoryCreateManyUserInput[]
  }

  export type GoalUpsertWithWhereUniqueWithoutUserInput = {
    where: GoalWhereUniqueInput
    update: XOR<GoalUpdateWithoutUserInput, GoalUncheckedUpdateWithoutUserInput>
    create: XOR<GoalCreateWithoutUserInput, GoalUncheckedCreateWithoutUserInput>
  }

  export type GoalUpdateWithWhereUniqueWithoutUserInput = {
    where: GoalWhereUniqueInput
    data: XOR<GoalUpdateWithoutUserInput, GoalUncheckedUpdateWithoutUserInput>
  }

  export type GoalUpdateManyWithWhereWithoutUserInput = {
    where: GoalScalarWhereInput
    data: XOR<GoalUpdateManyMutationInput, GoalUncheckedUpdateManyWithoutUserInput>
  }

  export type GoalScalarWhereInput = {
    AND?: GoalScalarWhereInput | GoalScalarWhereInput[]
    OR?: GoalScalarWhereInput[]
    NOT?: GoalScalarWhereInput | GoalScalarWhereInput[]
    id?: StringFilter<"Goal"> | string
    userId?: StringFilter<"Goal"> | string
    title?: StringFilter<"Goal"> | string
    category?: StringFilter<"Goal"> | string
    targetMetric?: StringFilter<"Goal"> | string
    targetValue?: FloatFilter<"Goal"> | number
    initialValue?: FloatFilter<"Goal"> | number
    startDate?: DateTimeFilter<"Goal"> | Date | string
    deadline?: DateTimeFilter<"Goal"> | Date | string
    availableHoursPerWeek?: FloatNullableFilter<"Goal"> | number | null
    status?: StringFilter<"Goal"> | string
    createdAt?: DateTimeFilter<"Goal"> | Date | string
    updatedAt?: DateTimeFilter<"Goal"> | Date | string
  }

  export type PlatformConnectionUpsertWithWhereUniqueWithoutUserInput = {
    where: PlatformConnectionWhereUniqueInput
    update: XOR<PlatformConnectionUpdateWithoutUserInput, PlatformConnectionUncheckedUpdateWithoutUserInput>
    create: XOR<PlatformConnectionCreateWithoutUserInput, PlatformConnectionUncheckedCreateWithoutUserInput>
  }

  export type PlatformConnectionUpdateWithWhereUniqueWithoutUserInput = {
    where: PlatformConnectionWhereUniqueInput
    data: XOR<PlatformConnectionUpdateWithoutUserInput, PlatformConnectionUncheckedUpdateWithoutUserInput>
  }

  export type PlatformConnectionUpdateManyWithWhereWithoutUserInput = {
    where: PlatformConnectionScalarWhereInput
    data: XOR<PlatformConnectionUpdateManyMutationInput, PlatformConnectionUncheckedUpdateManyWithoutUserInput>
  }

  export type PlatformConnectionScalarWhereInput = {
    AND?: PlatformConnectionScalarWhereInput | PlatformConnectionScalarWhereInput[]
    OR?: PlatformConnectionScalarWhereInput[]
    NOT?: PlatformConnectionScalarWhereInput | PlatformConnectionScalarWhereInput[]
    id?: StringFilter<"PlatformConnection"> | string
    userId?: StringFilter<"PlatformConnection"> | string
    platform?: StringFilter<"PlatformConnection"> | string
    username?: StringFilter<"PlatformConnection"> | string
    status?: StringFilter<"PlatformConnection"> | string
    lastError?: StringNullableFilter<"PlatformConnection"> | string | null
    lastSyncedAt?: DateTimeNullableFilter<"PlatformConnection"> | Date | string | null
    profileData?: StringNullableFilter<"PlatformConnection"> | string | null
    createdAt?: DateTimeFilter<"PlatformConnection"> | Date | string
    updatedAt?: DateTimeFilter<"PlatformConnection"> | Date | string
  }

  export type NormalizedSubmissionUpsertWithWhereUniqueWithoutUserInput = {
    where: NormalizedSubmissionWhereUniqueInput
    update: XOR<NormalizedSubmissionUpdateWithoutUserInput, NormalizedSubmissionUncheckedUpdateWithoutUserInput>
    create: XOR<NormalizedSubmissionCreateWithoutUserInput, NormalizedSubmissionUncheckedCreateWithoutUserInput>
  }

  export type NormalizedSubmissionUpdateWithWhereUniqueWithoutUserInput = {
    where: NormalizedSubmissionWhereUniqueInput
    data: XOR<NormalizedSubmissionUpdateWithoutUserInput, NormalizedSubmissionUncheckedUpdateWithoutUserInput>
  }

  export type NormalizedSubmissionUpdateManyWithWhereWithoutUserInput = {
    where: NormalizedSubmissionScalarWhereInput
    data: XOR<NormalizedSubmissionUpdateManyMutationInput, NormalizedSubmissionUncheckedUpdateManyWithoutUserInput>
  }

  export type NormalizedSubmissionScalarWhereInput = {
    AND?: NormalizedSubmissionScalarWhereInput | NormalizedSubmissionScalarWhereInput[]
    OR?: NormalizedSubmissionScalarWhereInput[]
    NOT?: NormalizedSubmissionScalarWhereInput | NormalizedSubmissionScalarWhereInput[]
    id?: StringFilter<"NormalizedSubmission"> | string
    userId?: StringFilter<"NormalizedSubmission"> | string
    platform?: StringFilter<"NormalizedSubmission"> | string
    externalSubmissionId?: StringFilter<"NormalizedSubmission"> | string
    problemId?: StringFilter<"NormalizedSubmission"> | string
    problemTitle?: StringFilter<"NormalizedSubmission"> | string
    verdict?: StringFilter<"NormalizedSubmission"> | string
    accepted?: BoolFilter<"NormalizedSubmission"> | boolean
    language?: StringNullableFilter<"NormalizedSubmission"> | string | null
    difficulty?: StringFilter<"NormalizedSubmission"> | string
    topics?: StringFilter<"NormalizedSubmission"> | string
    timestamp?: DateTimeFilter<"NormalizedSubmission"> | Date | string
    contestId?: StringNullableFilter<"NormalizedSubmission"> | string | null
    rawData?: StringNullableFilter<"NormalizedSubmission"> | string | null
    createdAt?: DateTimeFilter<"NormalizedSubmission"> | Date | string
  }

  export type ContestHistoryUpsertWithWhereUniqueWithoutUserInput = {
    where: ContestHistoryWhereUniqueInput
    update: XOR<ContestHistoryUpdateWithoutUserInput, ContestHistoryUncheckedUpdateWithoutUserInput>
    create: XOR<ContestHistoryCreateWithoutUserInput, ContestHistoryUncheckedCreateWithoutUserInput>
  }

  export type ContestHistoryUpdateWithWhereUniqueWithoutUserInput = {
    where: ContestHistoryWhereUniqueInput
    data: XOR<ContestHistoryUpdateWithoutUserInput, ContestHistoryUncheckedUpdateWithoutUserInput>
  }

  export type ContestHistoryUpdateManyWithWhereWithoutUserInput = {
    where: ContestHistoryScalarWhereInput
    data: XOR<ContestHistoryUpdateManyMutationInput, ContestHistoryUncheckedUpdateManyWithoutUserInput>
  }

  export type ContestHistoryScalarWhereInput = {
    AND?: ContestHistoryScalarWhereInput | ContestHistoryScalarWhereInput[]
    OR?: ContestHistoryScalarWhereInput[]
    NOT?: ContestHistoryScalarWhereInput | ContestHistoryScalarWhereInput[]
    id?: StringFilter<"ContestHistory"> | string
    userId?: StringFilter<"ContestHistory"> | string
    platform?: StringFilter<"ContestHistory"> | string
    contestId?: StringFilter<"ContestHistory"> | string
    contestName?: StringFilter<"ContestHistory"> | string
    rank?: IntFilter<"ContestHistory"> | number
    oldRating?: IntFilter<"ContestHistory"> | number
    newRating?: IntFilter<"ContestHistory"> | number
    ratingChange?: IntFilter<"ContestHistory"> | number
    timestamp?: DateTimeFilter<"ContestHistory"> | Date | string
    createdAt?: DateTimeFilter<"ContestHistory"> | Date | string
  }

  export type UserCreateWithoutGoalsInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    connections?: PlatformConnectionCreateNestedManyWithoutUserInput
    submissions?: NormalizedSubmissionCreateNestedManyWithoutUserInput
    contests?: ContestHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutGoalsInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    connections?: PlatformConnectionUncheckedCreateNestedManyWithoutUserInput
    submissions?: NormalizedSubmissionUncheckedCreateNestedManyWithoutUserInput
    contests?: ContestHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutGoalsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGoalsInput, UserUncheckedCreateWithoutGoalsInput>
  }

  export type UserUpsertWithoutGoalsInput = {
    update: XOR<UserUpdateWithoutGoalsInput, UserUncheckedUpdateWithoutGoalsInput>
    create: XOR<UserCreateWithoutGoalsInput, UserUncheckedCreateWithoutGoalsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGoalsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGoalsInput, UserUncheckedUpdateWithoutGoalsInput>
  }

  export type UserUpdateWithoutGoalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connections?: PlatformConnectionUpdateManyWithoutUserNestedInput
    submissions?: NormalizedSubmissionUpdateManyWithoutUserNestedInput
    contests?: ContestHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutGoalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connections?: PlatformConnectionUncheckedUpdateManyWithoutUserNestedInput
    submissions?: NormalizedSubmissionUncheckedUpdateManyWithoutUserNestedInput
    contests?: ContestHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutConnectionsInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    goals?: GoalCreateNestedManyWithoutUserInput
    submissions?: NormalizedSubmissionCreateNestedManyWithoutUserInput
    contests?: ContestHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutConnectionsInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    goals?: GoalUncheckedCreateNestedManyWithoutUserInput
    submissions?: NormalizedSubmissionUncheckedCreateNestedManyWithoutUserInput
    contests?: ContestHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutConnectionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutConnectionsInput, UserUncheckedCreateWithoutConnectionsInput>
  }

  export type UserUpsertWithoutConnectionsInput = {
    update: XOR<UserUpdateWithoutConnectionsInput, UserUncheckedUpdateWithoutConnectionsInput>
    create: XOR<UserCreateWithoutConnectionsInput, UserUncheckedCreateWithoutConnectionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutConnectionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutConnectionsInput, UserUncheckedUpdateWithoutConnectionsInput>
  }

  export type UserUpdateWithoutConnectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    goals?: GoalUpdateManyWithoutUserNestedInput
    submissions?: NormalizedSubmissionUpdateManyWithoutUserNestedInput
    contests?: ContestHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutConnectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    goals?: GoalUncheckedUpdateManyWithoutUserNestedInput
    submissions?: NormalizedSubmissionUncheckedUpdateManyWithoutUserNestedInput
    contests?: ContestHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type NormalizedSubmissionCreateWithoutProblemInput = {
    id?: string
    platform: string
    externalSubmissionId: string
    problemTitle: string
    verdict: string
    accepted: boolean
    language?: string | null
    difficulty: string
    topics: string
    timestamp: Date | string
    contestId?: string | null
    rawData?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSubmissionsInput
  }

  export type NormalizedSubmissionUncheckedCreateWithoutProblemInput = {
    id?: string
    userId: string
    platform: string
    externalSubmissionId: string
    problemTitle: string
    verdict: string
    accepted: boolean
    language?: string | null
    difficulty: string
    topics: string
    timestamp: Date | string
    contestId?: string | null
    rawData?: string | null
    createdAt?: Date | string
  }

  export type NormalizedSubmissionCreateOrConnectWithoutProblemInput = {
    where: NormalizedSubmissionWhereUniqueInput
    create: XOR<NormalizedSubmissionCreateWithoutProblemInput, NormalizedSubmissionUncheckedCreateWithoutProblemInput>
  }

  export type NormalizedSubmissionCreateManyProblemInputEnvelope = {
    data: NormalizedSubmissionCreateManyProblemInput | NormalizedSubmissionCreateManyProblemInput[]
  }

  export type NormalizedSubmissionUpsertWithWhereUniqueWithoutProblemInput = {
    where: NormalizedSubmissionWhereUniqueInput
    update: XOR<NormalizedSubmissionUpdateWithoutProblemInput, NormalizedSubmissionUncheckedUpdateWithoutProblemInput>
    create: XOR<NormalizedSubmissionCreateWithoutProblemInput, NormalizedSubmissionUncheckedCreateWithoutProblemInput>
  }

  export type NormalizedSubmissionUpdateWithWhereUniqueWithoutProblemInput = {
    where: NormalizedSubmissionWhereUniqueInput
    data: XOR<NormalizedSubmissionUpdateWithoutProblemInput, NormalizedSubmissionUncheckedUpdateWithoutProblemInput>
  }

  export type NormalizedSubmissionUpdateManyWithWhereWithoutProblemInput = {
    where: NormalizedSubmissionScalarWhereInput
    data: XOR<NormalizedSubmissionUpdateManyMutationInput, NormalizedSubmissionUncheckedUpdateManyWithoutProblemInput>
  }

  export type UserCreateWithoutSubmissionsInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    goals?: GoalCreateNestedManyWithoutUserInput
    connections?: PlatformConnectionCreateNestedManyWithoutUserInput
    contests?: ContestHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSubmissionsInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    goals?: GoalUncheckedCreateNestedManyWithoutUserInput
    connections?: PlatformConnectionUncheckedCreateNestedManyWithoutUserInput
    contests?: ContestHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSubmissionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSubmissionsInput, UserUncheckedCreateWithoutSubmissionsInput>
  }

  export type ProblemCreateWithoutSubmissionsInput = {
    id?: string
    platform: string
    externalProblemId: string
    title: string
    difficulty: string
    numericDifficulty?: number | null
    topics: string
    rawTags: string
    metadata?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProblemUncheckedCreateWithoutSubmissionsInput = {
    id?: string
    platform: string
    externalProblemId: string
    title: string
    difficulty: string
    numericDifficulty?: number | null
    topics: string
    rawTags: string
    metadata?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProblemCreateOrConnectWithoutSubmissionsInput = {
    where: ProblemWhereUniqueInput
    create: XOR<ProblemCreateWithoutSubmissionsInput, ProblemUncheckedCreateWithoutSubmissionsInput>
  }

  export type UserUpsertWithoutSubmissionsInput = {
    update: XOR<UserUpdateWithoutSubmissionsInput, UserUncheckedUpdateWithoutSubmissionsInput>
    create: XOR<UserCreateWithoutSubmissionsInput, UserUncheckedCreateWithoutSubmissionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSubmissionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSubmissionsInput, UserUncheckedUpdateWithoutSubmissionsInput>
  }

  export type UserUpdateWithoutSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    goals?: GoalUpdateManyWithoutUserNestedInput
    connections?: PlatformConnectionUpdateManyWithoutUserNestedInput
    contests?: ContestHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    goals?: GoalUncheckedUpdateManyWithoutUserNestedInput
    connections?: PlatformConnectionUncheckedUpdateManyWithoutUserNestedInput
    contests?: ContestHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProblemUpsertWithoutSubmissionsInput = {
    update: XOR<ProblemUpdateWithoutSubmissionsInput, ProblemUncheckedUpdateWithoutSubmissionsInput>
    create: XOR<ProblemCreateWithoutSubmissionsInput, ProblemUncheckedCreateWithoutSubmissionsInput>
    where?: ProblemWhereInput
  }

  export type ProblemUpdateToOneWithWhereWithoutSubmissionsInput = {
    where?: ProblemWhereInput
    data: XOR<ProblemUpdateWithoutSubmissionsInput, ProblemUncheckedUpdateWithoutSubmissionsInput>
  }

  export type ProblemUpdateWithoutSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    externalProblemId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    numericDifficulty?: NullableIntFieldUpdateOperationsInput | number | null
    topics?: StringFieldUpdateOperationsInput | string
    rawTags?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProblemUncheckedUpdateWithoutSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    externalProblemId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    numericDifficulty?: NullableIntFieldUpdateOperationsInput | number | null
    topics?: StringFieldUpdateOperationsInput | string
    rawTags?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutContestsInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    goals?: GoalCreateNestedManyWithoutUserInput
    connections?: PlatformConnectionCreateNestedManyWithoutUserInput
    submissions?: NormalizedSubmissionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutContestsInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    goals?: GoalUncheckedCreateNestedManyWithoutUserInput
    connections?: PlatformConnectionUncheckedCreateNestedManyWithoutUserInput
    submissions?: NormalizedSubmissionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutContestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutContestsInput, UserUncheckedCreateWithoutContestsInput>
  }

  export type UserUpsertWithoutContestsInput = {
    update: XOR<UserUpdateWithoutContestsInput, UserUncheckedUpdateWithoutContestsInput>
    create: XOR<UserCreateWithoutContestsInput, UserUncheckedCreateWithoutContestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutContestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutContestsInput, UserUncheckedUpdateWithoutContestsInput>
  }

  export type UserUpdateWithoutContestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    goals?: GoalUpdateManyWithoutUserNestedInput
    connections?: PlatformConnectionUpdateManyWithoutUserNestedInput
    submissions?: NormalizedSubmissionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutContestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    goals?: GoalUncheckedUpdateManyWithoutUserNestedInput
    connections?: PlatformConnectionUncheckedUpdateManyWithoutUserNestedInput
    submissions?: NormalizedSubmissionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type GoalCreateManyUserInput = {
    id?: string
    title: string
    category: string
    targetMetric: string
    targetValue: number
    initialValue: number
    startDate?: Date | string
    deadline: Date | string
    availableHoursPerWeek?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlatformConnectionCreateManyUserInput = {
    id?: string
    platform: string
    username: string
    status?: string
    lastError?: string | null
    lastSyncedAt?: Date | string | null
    profileData?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NormalizedSubmissionCreateManyUserInput = {
    id?: string
    platform: string
    externalSubmissionId: string
    problemId: string
    problemTitle: string
    verdict: string
    accepted: boolean
    language?: string | null
    difficulty: string
    topics: string
    timestamp: Date | string
    contestId?: string | null
    rawData?: string | null
    createdAt?: Date | string
  }

  export type ContestHistoryCreateManyUserInput = {
    id?: string
    platform: string
    contestId: string
    contestName: string
    rank: number
    oldRating: number
    newRating: number
    ratingChange: number
    timestamp: Date | string
    createdAt?: Date | string
  }

  export type GoalUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    targetMetric?: StringFieldUpdateOperationsInput | string
    targetValue?: FloatFieldUpdateOperationsInput | number
    initialValue?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    availableHoursPerWeek?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GoalUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    targetMetric?: StringFieldUpdateOperationsInput | string
    targetValue?: FloatFieldUpdateOperationsInput | number
    initialValue?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    availableHoursPerWeek?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GoalUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    targetMetric?: StringFieldUpdateOperationsInput | string
    targetValue?: FloatFieldUpdateOperationsInput | number
    initialValue?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    availableHoursPerWeek?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlatformConnectionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileData?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlatformConnectionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileData?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlatformConnectionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileData?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NormalizedSubmissionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    externalSubmissionId?: StringFieldUpdateOperationsInput | string
    problemTitle?: StringFieldUpdateOperationsInput | string
    verdict?: StringFieldUpdateOperationsInput | string
    accepted?: BoolFieldUpdateOperationsInput | boolean
    language?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: StringFieldUpdateOperationsInput | string
    topics?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    contestId?: NullableStringFieldUpdateOperationsInput | string | null
    rawData?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    problem?: ProblemUpdateOneRequiredWithoutSubmissionsNestedInput
  }

  export type NormalizedSubmissionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    externalSubmissionId?: StringFieldUpdateOperationsInput | string
    problemId?: StringFieldUpdateOperationsInput | string
    problemTitle?: StringFieldUpdateOperationsInput | string
    verdict?: StringFieldUpdateOperationsInput | string
    accepted?: BoolFieldUpdateOperationsInput | boolean
    language?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: StringFieldUpdateOperationsInput | string
    topics?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    contestId?: NullableStringFieldUpdateOperationsInput | string | null
    rawData?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NormalizedSubmissionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    externalSubmissionId?: StringFieldUpdateOperationsInput | string
    problemId?: StringFieldUpdateOperationsInput | string
    problemTitle?: StringFieldUpdateOperationsInput | string
    verdict?: StringFieldUpdateOperationsInput | string
    accepted?: BoolFieldUpdateOperationsInput | boolean
    language?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: StringFieldUpdateOperationsInput | string
    topics?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    contestId?: NullableStringFieldUpdateOperationsInput | string | null
    rawData?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContestHistoryUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    contestId?: StringFieldUpdateOperationsInput | string
    contestName?: StringFieldUpdateOperationsInput | string
    rank?: IntFieldUpdateOperationsInput | number
    oldRating?: IntFieldUpdateOperationsInput | number
    newRating?: IntFieldUpdateOperationsInput | number
    ratingChange?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContestHistoryUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    contestId?: StringFieldUpdateOperationsInput | string
    contestName?: StringFieldUpdateOperationsInput | string
    rank?: IntFieldUpdateOperationsInput | number
    oldRating?: IntFieldUpdateOperationsInput | number
    newRating?: IntFieldUpdateOperationsInput | number
    ratingChange?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContestHistoryUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    contestId?: StringFieldUpdateOperationsInput | string
    contestName?: StringFieldUpdateOperationsInput | string
    rank?: IntFieldUpdateOperationsInput | number
    oldRating?: IntFieldUpdateOperationsInput | number
    newRating?: IntFieldUpdateOperationsInput | number
    ratingChange?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NormalizedSubmissionCreateManyProblemInput = {
    id?: string
    userId: string
    platform: string
    externalSubmissionId: string
    problemTitle: string
    verdict: string
    accepted: boolean
    language?: string | null
    difficulty: string
    topics: string
    timestamp: Date | string
    contestId?: string | null
    rawData?: string | null
    createdAt?: Date | string
  }

  export type NormalizedSubmissionUpdateWithoutProblemInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    externalSubmissionId?: StringFieldUpdateOperationsInput | string
    problemTitle?: StringFieldUpdateOperationsInput | string
    verdict?: StringFieldUpdateOperationsInput | string
    accepted?: BoolFieldUpdateOperationsInput | boolean
    language?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: StringFieldUpdateOperationsInput | string
    topics?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    contestId?: NullableStringFieldUpdateOperationsInput | string | null
    rawData?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSubmissionsNestedInput
  }

  export type NormalizedSubmissionUncheckedUpdateWithoutProblemInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    externalSubmissionId?: StringFieldUpdateOperationsInput | string
    problemTitle?: StringFieldUpdateOperationsInput | string
    verdict?: StringFieldUpdateOperationsInput | string
    accepted?: BoolFieldUpdateOperationsInput | boolean
    language?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: StringFieldUpdateOperationsInput | string
    topics?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    contestId?: NullableStringFieldUpdateOperationsInput | string | null
    rawData?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NormalizedSubmissionUncheckedUpdateManyWithoutProblemInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    externalSubmissionId?: StringFieldUpdateOperationsInput | string
    problemTitle?: StringFieldUpdateOperationsInput | string
    verdict?: StringFieldUpdateOperationsInput | string
    accepted?: BoolFieldUpdateOperationsInput | boolean
    language?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: StringFieldUpdateOperationsInput | string
    topics?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    contestId?: NullableStringFieldUpdateOperationsInput | string | null
    rawData?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}