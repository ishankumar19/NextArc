
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
 * Model Plan
 * 
 */
export type Plan = $Result.DefaultSelection<Prisma.$PlanPayload>
/**
 * Model PlanVersion
 * 
 */
export type PlanVersion = $Result.DefaultSelection<Prisma.$PlanVersionPayload>
/**
 * Model PlanTask
 * 
 */
export type PlanTask = $Result.DefaultSelection<Prisma.$PlanTaskPayload>
/**
 * Model TaskEvidenceMatch
 * 
 */
export type TaskEvidenceMatch = $Result.DefaultSelection<Prisma.$TaskEvidenceMatchPayload>
/**
 * Model PlanEvaluation
 * 
 */
export type PlanEvaluation = $Result.DefaultSelection<Prisma.$PlanEvaluationPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>

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

  /**
   * `prisma.plan`: Exposes CRUD operations for the **Plan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Plans
    * const plans = await prisma.plan.findMany()
    * ```
    */
  get plan(): Prisma.PlanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.planVersion`: Exposes CRUD operations for the **PlanVersion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PlanVersions
    * const planVersions = await prisma.planVersion.findMany()
    * ```
    */
  get planVersion(): Prisma.PlanVersionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.planTask`: Exposes CRUD operations for the **PlanTask** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PlanTasks
    * const planTasks = await prisma.planTask.findMany()
    * ```
    */
  get planTask(): Prisma.PlanTaskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.taskEvidenceMatch`: Exposes CRUD operations for the **TaskEvidenceMatch** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TaskEvidenceMatches
    * const taskEvidenceMatches = await prisma.taskEvidenceMatch.findMany()
    * ```
    */
  get taskEvidenceMatch(): Prisma.TaskEvidenceMatchDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.planEvaluation`: Exposes CRUD operations for the **PlanEvaluation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PlanEvaluations
    * const planEvaluations = await prisma.planEvaluation.findMany()
    * ```
    */
  get planEvaluation(): Prisma.PlanEvaluationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;
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
    ContestHistory: 'ContestHistory',
    Plan: 'Plan',
    PlanVersion: 'PlanVersion',
    PlanTask: 'PlanTask',
    TaskEvidenceMatch: 'TaskEvidenceMatch',
    PlanEvaluation: 'PlanEvaluation',
    Session: 'Session'
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
      modelProps: "user" | "goal" | "platformConnection" | "problem" | "normalizedSubmission" | "contestHistory" | "plan" | "planVersion" | "planTask" | "taskEvidenceMatch" | "planEvaluation" | "session"
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
      Plan: {
        payload: Prisma.$PlanPayload<ExtArgs>
        fields: Prisma.PlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          findFirst: {
            args: Prisma.PlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          findMany: {
            args: Prisma.PlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>[]
          }
          create: {
            args: Prisma.PlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          createMany: {
            args: Prisma.PlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>[]
          }
          delete: {
            args: Prisma.PlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          update: {
            args: Prisma.PlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          deleteMany: {
            args: Prisma.PlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>[]
          }
          upsert: {
            args: Prisma.PlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          aggregate: {
            args: Prisma.PlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlan>
          }
          groupBy: {
            args: Prisma.PlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlanCountArgs<ExtArgs>
            result: $Utils.Optional<PlanCountAggregateOutputType> | number
          }
        }
      }
      PlanVersion: {
        payload: Prisma.$PlanVersionPayload<ExtArgs>
        fields: Prisma.PlanVersionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlanVersionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanVersionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlanVersionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanVersionPayload>
          }
          findFirst: {
            args: Prisma.PlanVersionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanVersionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlanVersionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanVersionPayload>
          }
          findMany: {
            args: Prisma.PlanVersionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanVersionPayload>[]
          }
          create: {
            args: Prisma.PlanVersionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanVersionPayload>
          }
          createMany: {
            args: Prisma.PlanVersionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlanVersionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanVersionPayload>[]
          }
          delete: {
            args: Prisma.PlanVersionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanVersionPayload>
          }
          update: {
            args: Prisma.PlanVersionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanVersionPayload>
          }
          deleteMany: {
            args: Prisma.PlanVersionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlanVersionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlanVersionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanVersionPayload>[]
          }
          upsert: {
            args: Prisma.PlanVersionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanVersionPayload>
          }
          aggregate: {
            args: Prisma.PlanVersionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlanVersion>
          }
          groupBy: {
            args: Prisma.PlanVersionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlanVersionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlanVersionCountArgs<ExtArgs>
            result: $Utils.Optional<PlanVersionCountAggregateOutputType> | number
          }
        }
      }
      PlanTask: {
        payload: Prisma.$PlanTaskPayload<ExtArgs>
        fields: Prisma.PlanTaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlanTaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanTaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlanTaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanTaskPayload>
          }
          findFirst: {
            args: Prisma.PlanTaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanTaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlanTaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanTaskPayload>
          }
          findMany: {
            args: Prisma.PlanTaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanTaskPayload>[]
          }
          create: {
            args: Prisma.PlanTaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanTaskPayload>
          }
          createMany: {
            args: Prisma.PlanTaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlanTaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanTaskPayload>[]
          }
          delete: {
            args: Prisma.PlanTaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanTaskPayload>
          }
          update: {
            args: Prisma.PlanTaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanTaskPayload>
          }
          deleteMany: {
            args: Prisma.PlanTaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlanTaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlanTaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanTaskPayload>[]
          }
          upsert: {
            args: Prisma.PlanTaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanTaskPayload>
          }
          aggregate: {
            args: Prisma.PlanTaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlanTask>
          }
          groupBy: {
            args: Prisma.PlanTaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlanTaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlanTaskCountArgs<ExtArgs>
            result: $Utils.Optional<PlanTaskCountAggregateOutputType> | number
          }
        }
      }
      TaskEvidenceMatch: {
        payload: Prisma.$TaskEvidenceMatchPayload<ExtArgs>
        fields: Prisma.TaskEvidenceMatchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskEvidenceMatchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskEvidenceMatchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskEvidenceMatchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskEvidenceMatchPayload>
          }
          findFirst: {
            args: Prisma.TaskEvidenceMatchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskEvidenceMatchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskEvidenceMatchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskEvidenceMatchPayload>
          }
          findMany: {
            args: Prisma.TaskEvidenceMatchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskEvidenceMatchPayload>[]
          }
          create: {
            args: Prisma.TaskEvidenceMatchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskEvidenceMatchPayload>
          }
          createMany: {
            args: Prisma.TaskEvidenceMatchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskEvidenceMatchCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskEvidenceMatchPayload>[]
          }
          delete: {
            args: Prisma.TaskEvidenceMatchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskEvidenceMatchPayload>
          }
          update: {
            args: Prisma.TaskEvidenceMatchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskEvidenceMatchPayload>
          }
          deleteMany: {
            args: Prisma.TaskEvidenceMatchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskEvidenceMatchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskEvidenceMatchUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskEvidenceMatchPayload>[]
          }
          upsert: {
            args: Prisma.TaskEvidenceMatchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskEvidenceMatchPayload>
          }
          aggregate: {
            args: Prisma.TaskEvidenceMatchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTaskEvidenceMatch>
          }
          groupBy: {
            args: Prisma.TaskEvidenceMatchGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskEvidenceMatchGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskEvidenceMatchCountArgs<ExtArgs>
            result: $Utils.Optional<TaskEvidenceMatchCountAggregateOutputType> | number
          }
        }
      }
      PlanEvaluation: {
        payload: Prisma.$PlanEvaluationPayload<ExtArgs>
        fields: Prisma.PlanEvaluationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlanEvaluationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanEvaluationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlanEvaluationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanEvaluationPayload>
          }
          findFirst: {
            args: Prisma.PlanEvaluationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanEvaluationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlanEvaluationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanEvaluationPayload>
          }
          findMany: {
            args: Prisma.PlanEvaluationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanEvaluationPayload>[]
          }
          create: {
            args: Prisma.PlanEvaluationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanEvaluationPayload>
          }
          createMany: {
            args: Prisma.PlanEvaluationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlanEvaluationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanEvaluationPayload>[]
          }
          delete: {
            args: Prisma.PlanEvaluationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanEvaluationPayload>
          }
          update: {
            args: Prisma.PlanEvaluationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanEvaluationPayload>
          }
          deleteMany: {
            args: Prisma.PlanEvaluationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlanEvaluationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlanEvaluationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanEvaluationPayload>[]
          }
          upsert: {
            args: Prisma.PlanEvaluationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanEvaluationPayload>
          }
          aggregate: {
            args: Prisma.PlanEvaluationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlanEvaluation>
          }
          groupBy: {
            args: Prisma.PlanEvaluationGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlanEvaluationGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlanEvaluationCountArgs<ExtArgs>
            result: $Utils.Optional<PlanEvaluationCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
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
    plan?: PlanOmit
    planVersion?: PlanVersionOmit
    planTask?: PlanTaskOmit
    taskEvidenceMatch?: TaskEvidenceMatchOmit
    planEvaluation?: PlanEvaluationOmit
    session?: SessionOmit
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
    sessions: number
    goals: number
    connections: number
    submissions: number
    contests: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
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
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
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
   * Count Type GoalCountOutputType
   */

  export type GoalCountOutputType = {
    plans: number
  }

  export type GoalCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plans?: boolean | GoalCountOutputTypeCountPlansArgs
  }

  // Custom InputTypes
  /**
   * GoalCountOutputType without action
   */
  export type GoalCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoalCountOutputType
     */
    select?: GoalCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GoalCountOutputType without action
   */
  export type GoalCountOutputTypeCountPlansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlanWhereInput
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
   * Count Type NormalizedSubmissionCountOutputType
   */

  export type NormalizedSubmissionCountOutputType = {
    taskMatches: number
  }

  export type NormalizedSubmissionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    taskMatches?: boolean | NormalizedSubmissionCountOutputTypeCountTaskMatchesArgs
  }

  // Custom InputTypes
  /**
   * NormalizedSubmissionCountOutputType without action
   */
  export type NormalizedSubmissionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NormalizedSubmissionCountOutputType
     */
    select?: NormalizedSubmissionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * NormalizedSubmissionCountOutputType without action
   */
  export type NormalizedSubmissionCountOutputTypeCountTaskMatchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskEvidenceMatchWhereInput
  }


  /**
   * Count Type ContestHistoryCountOutputType
   */

  export type ContestHistoryCountOutputType = {
    taskMatches: number
  }

  export type ContestHistoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    taskMatches?: boolean | ContestHistoryCountOutputTypeCountTaskMatchesArgs
  }

  // Custom InputTypes
  /**
   * ContestHistoryCountOutputType without action
   */
  export type ContestHistoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContestHistoryCountOutputType
     */
    select?: ContestHistoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ContestHistoryCountOutputType without action
   */
  export type ContestHistoryCountOutputTypeCountTaskMatchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskEvidenceMatchWhereInput
  }


  /**
   * Count Type PlanCountOutputType
   */

  export type PlanCountOutputType = {
    versions: number
    evaluations: number
  }

  export type PlanCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    versions?: boolean | PlanCountOutputTypeCountVersionsArgs
    evaluations?: boolean | PlanCountOutputTypeCountEvaluationsArgs
  }

  // Custom InputTypes
  /**
   * PlanCountOutputType without action
   */
  export type PlanCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanCountOutputType
     */
    select?: PlanCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlanCountOutputType without action
   */
  export type PlanCountOutputTypeCountVersionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlanVersionWhereInput
  }

  /**
   * PlanCountOutputType without action
   */
  export type PlanCountOutputTypeCountEvaluationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlanEvaluationWhereInput
  }


  /**
   * Count Type PlanVersionCountOutputType
   */

  export type PlanVersionCountOutputType = {
    tasks: number
  }

  export type PlanVersionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | PlanVersionCountOutputTypeCountTasksArgs
  }

  // Custom InputTypes
  /**
   * PlanVersionCountOutputType without action
   */
  export type PlanVersionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanVersionCountOutputType
     */
    select?: PlanVersionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlanVersionCountOutputType without action
   */
  export type PlanVersionCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlanTaskWhereInput
  }


  /**
   * Count Type PlanTaskCountOutputType
   */

  export type PlanTaskCountOutputType = {
    matches: number
  }

  export type PlanTaskCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    matches?: boolean | PlanTaskCountOutputTypeCountMatchesArgs
  }

  // Custom InputTypes
  /**
   * PlanTaskCountOutputType without action
   */
  export type PlanTaskCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanTaskCountOutputType
     */
    select?: PlanTaskCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlanTaskCountOutputType without action
   */
  export type PlanTaskCountOutputTypeCountMatchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskEvidenceMatchWhereInput
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
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    passwordHash: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
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
    passwordHash: string | null
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
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sessions?: boolean | User$sessionsArgs<ExtArgs>
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
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "passwordHash" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | User$sessionsArgs<ExtArgs>
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
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      goals: Prisma.$GoalPayload<ExtArgs>[]
      connections: Prisma.$PlatformConnectionPayload<ExtArgs>[]
      submissions: Prisma.$NormalizedSubmissionPayload<ExtArgs>[]
      contests: Prisma.$ContestHistoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      passwordHash: string | null
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
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly passwordHash: FieldRef<"User", 'String'>
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
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
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
    plans?: boolean | Goal$plansArgs<ExtArgs>
    _count?: boolean | GoalCountOutputTypeDefaultArgs<ExtArgs>
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
    plans?: boolean | Goal$plansArgs<ExtArgs>
    _count?: boolean | GoalCountOutputTypeDefaultArgs<ExtArgs>
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
      plans: Prisma.$PlanPayload<ExtArgs>[]
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
    plans<T extends Goal$plansArgs<ExtArgs> = {}>(args?: Subset<T, Goal$plansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Goal.plans
   */
  export type Goal$plansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    where?: PlanWhereInput
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    cursor?: PlanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
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
    taskMatches?: boolean | NormalizedSubmission$taskMatchesArgs<ExtArgs>
    _count?: boolean | NormalizedSubmissionCountOutputTypeDefaultArgs<ExtArgs>
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
    taskMatches?: boolean | NormalizedSubmission$taskMatchesArgs<ExtArgs>
    _count?: boolean | NormalizedSubmissionCountOutputTypeDefaultArgs<ExtArgs>
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
      taskMatches: Prisma.$TaskEvidenceMatchPayload<ExtArgs>[]
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
    taskMatches<T extends NormalizedSubmission$taskMatchesArgs<ExtArgs> = {}>(args?: Subset<T, NormalizedSubmission$taskMatchesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskEvidenceMatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * NormalizedSubmission.taskMatches
   */
  export type NormalizedSubmission$taskMatchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskEvidenceMatch
     */
    select?: TaskEvidenceMatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskEvidenceMatch
     */
    omit?: TaskEvidenceMatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskEvidenceMatchInclude<ExtArgs> | null
    where?: TaskEvidenceMatchWhereInput
    orderBy?: TaskEvidenceMatchOrderByWithRelationInput | TaskEvidenceMatchOrderByWithRelationInput[]
    cursor?: TaskEvidenceMatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskEvidenceMatchScalarFieldEnum | TaskEvidenceMatchScalarFieldEnum[]
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
    taskMatches?: boolean | ContestHistory$taskMatchesArgs<ExtArgs>
    _count?: boolean | ContestHistoryCountOutputTypeDefaultArgs<ExtArgs>
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
    taskMatches?: boolean | ContestHistory$taskMatchesArgs<ExtArgs>
    _count?: boolean | ContestHistoryCountOutputTypeDefaultArgs<ExtArgs>
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
      taskMatches: Prisma.$TaskEvidenceMatchPayload<ExtArgs>[]
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
    taskMatches<T extends ContestHistory$taskMatchesArgs<ExtArgs> = {}>(args?: Subset<T, ContestHistory$taskMatchesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskEvidenceMatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * ContestHistory.taskMatches
   */
  export type ContestHistory$taskMatchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskEvidenceMatch
     */
    select?: TaskEvidenceMatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskEvidenceMatch
     */
    omit?: TaskEvidenceMatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskEvidenceMatchInclude<ExtArgs> | null
    where?: TaskEvidenceMatchWhereInput
    orderBy?: TaskEvidenceMatchOrderByWithRelationInput | TaskEvidenceMatchOrderByWithRelationInput[]
    cursor?: TaskEvidenceMatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskEvidenceMatchScalarFieldEnum | TaskEvidenceMatchScalarFieldEnum[]
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
   * Model Plan
   */

  export type AggregatePlan = {
    _count: PlanCountAggregateOutputType | null
    _avg: PlanAvgAggregateOutputType | null
    _sum: PlanSumAggregateOutputType | null
    _min: PlanMinAggregateOutputType | null
    _max: PlanMaxAggregateOutputType | null
  }

  export type PlanAvgAggregateOutputType = {
    currentVersionNum: number | null
  }

  export type PlanSumAggregateOutputType = {
    currentVersionNum: number | null
  }

  export type PlanMinAggregateOutputType = {
    id: string | null
    goalId: string | null
    userId: string | null
    status: string | null
    currentVersionNum: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlanMaxAggregateOutputType = {
    id: string | null
    goalId: string | null
    userId: string | null
    status: string | null
    currentVersionNum: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlanCountAggregateOutputType = {
    id: number
    goalId: number
    userId: number
    status: number
    currentVersionNum: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PlanAvgAggregateInputType = {
    currentVersionNum?: true
  }

  export type PlanSumAggregateInputType = {
    currentVersionNum?: true
  }

  export type PlanMinAggregateInputType = {
    id?: true
    goalId?: true
    userId?: true
    status?: true
    currentVersionNum?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlanMaxAggregateInputType = {
    id?: true
    goalId?: true
    userId?: true
    status?: true
    currentVersionNum?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlanCountAggregateInputType = {
    id?: true
    goalId?: true
    userId?: true
    status?: true
    currentVersionNum?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Plan to aggregate.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Plans
    **/
    _count?: true | PlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlanMaxAggregateInputType
  }

  export type GetPlanAggregateType<T extends PlanAggregateArgs> = {
        [P in keyof T & keyof AggregatePlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlan[P]>
      : GetScalarType<T[P], AggregatePlan[P]>
  }




  export type PlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlanWhereInput
    orderBy?: PlanOrderByWithAggregationInput | PlanOrderByWithAggregationInput[]
    by: PlanScalarFieldEnum[] | PlanScalarFieldEnum
    having?: PlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlanCountAggregateInputType | true
    _avg?: PlanAvgAggregateInputType
    _sum?: PlanSumAggregateInputType
    _min?: PlanMinAggregateInputType
    _max?: PlanMaxAggregateInputType
  }

  export type PlanGroupByOutputType = {
    id: string
    goalId: string
    userId: string
    status: string
    currentVersionNum: number
    createdAt: Date
    updatedAt: Date
    _count: PlanCountAggregateOutputType | null
    _avg: PlanAvgAggregateOutputType | null
    _sum: PlanSumAggregateOutputType | null
    _min: PlanMinAggregateOutputType | null
    _max: PlanMaxAggregateOutputType | null
  }

  type GetPlanGroupByPayload<T extends PlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlanGroupByOutputType[P]>
            : GetScalarType<T[P], PlanGroupByOutputType[P]>
        }
      >
    >


  export type PlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    goalId?: boolean
    userId?: boolean
    status?: boolean
    currentVersionNum?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    goal?: boolean | GoalDefaultArgs<ExtArgs>
    versions?: boolean | Plan$versionsArgs<ExtArgs>
    evaluations?: boolean | Plan$evaluationsArgs<ExtArgs>
    _count?: boolean | PlanCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["plan"]>

  export type PlanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    goalId?: boolean
    userId?: boolean
    status?: boolean
    currentVersionNum?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    goal?: boolean | GoalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["plan"]>

  export type PlanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    goalId?: boolean
    userId?: boolean
    status?: boolean
    currentVersionNum?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    goal?: boolean | GoalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["plan"]>

  export type PlanSelectScalar = {
    id?: boolean
    goalId?: boolean
    userId?: boolean
    status?: boolean
    currentVersionNum?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PlanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "goalId" | "userId" | "status" | "currentVersionNum" | "createdAt" | "updatedAt", ExtArgs["result"]["plan"]>
  export type PlanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    goal?: boolean | GoalDefaultArgs<ExtArgs>
    versions?: boolean | Plan$versionsArgs<ExtArgs>
    evaluations?: boolean | Plan$evaluationsArgs<ExtArgs>
    _count?: boolean | PlanCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PlanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    goal?: boolean | GoalDefaultArgs<ExtArgs>
  }
  export type PlanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    goal?: boolean | GoalDefaultArgs<ExtArgs>
  }

  export type $PlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Plan"
    objects: {
      goal: Prisma.$GoalPayload<ExtArgs>
      versions: Prisma.$PlanVersionPayload<ExtArgs>[]
      evaluations: Prisma.$PlanEvaluationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      goalId: string
      userId: string
      status: string
      currentVersionNum: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["plan"]>
    composites: {}
  }

  type PlanGetPayload<S extends boolean | null | undefined | PlanDefaultArgs> = $Result.GetResult<Prisma.$PlanPayload, S>

  type PlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlanCountAggregateInputType | true
    }

  export interface PlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Plan'], meta: { name: 'Plan' } }
    /**
     * Find zero or one Plan that matches the filter.
     * @param {PlanFindUniqueArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlanFindUniqueArgs>(args: SelectSubset<T, PlanFindUniqueArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Plan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlanFindUniqueOrThrowArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlanFindUniqueOrThrowArgs>(args: SelectSubset<T, PlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Plan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFindFirstArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlanFindFirstArgs>(args?: SelectSubset<T, PlanFindFirstArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Plan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFindFirstOrThrowArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlanFindFirstOrThrowArgs>(args?: SelectSubset<T, PlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Plans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Plans
     * const plans = await prisma.plan.findMany()
     * 
     * // Get first 10 Plans
     * const plans = await prisma.plan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const planWithIdOnly = await prisma.plan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlanFindManyArgs>(args?: SelectSubset<T, PlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Plan.
     * @param {PlanCreateArgs} args - Arguments to create a Plan.
     * @example
     * // Create one Plan
     * const Plan = await prisma.plan.create({
     *   data: {
     *     // ... data to create a Plan
     *   }
     * })
     * 
     */
    create<T extends PlanCreateArgs>(args: SelectSubset<T, PlanCreateArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Plans.
     * @param {PlanCreateManyArgs} args - Arguments to create many Plans.
     * @example
     * // Create many Plans
     * const plan = await prisma.plan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlanCreateManyArgs>(args?: SelectSubset<T, PlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Plans and returns the data saved in the database.
     * @param {PlanCreateManyAndReturnArgs} args - Arguments to create many Plans.
     * @example
     * // Create many Plans
     * const plan = await prisma.plan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Plans and only return the `id`
     * const planWithIdOnly = await prisma.plan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlanCreateManyAndReturnArgs>(args?: SelectSubset<T, PlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Plan.
     * @param {PlanDeleteArgs} args - Arguments to delete one Plan.
     * @example
     * // Delete one Plan
     * const Plan = await prisma.plan.delete({
     *   where: {
     *     // ... filter to delete one Plan
     *   }
     * })
     * 
     */
    delete<T extends PlanDeleteArgs>(args: SelectSubset<T, PlanDeleteArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Plan.
     * @param {PlanUpdateArgs} args - Arguments to update one Plan.
     * @example
     * // Update one Plan
     * const plan = await prisma.plan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlanUpdateArgs>(args: SelectSubset<T, PlanUpdateArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Plans.
     * @param {PlanDeleteManyArgs} args - Arguments to filter Plans to delete.
     * @example
     * // Delete a few Plans
     * const { count } = await prisma.plan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlanDeleteManyArgs>(args?: SelectSubset<T, PlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Plans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Plans
     * const plan = await prisma.plan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlanUpdateManyArgs>(args: SelectSubset<T, PlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Plans and returns the data updated in the database.
     * @param {PlanUpdateManyAndReturnArgs} args - Arguments to update many Plans.
     * @example
     * // Update many Plans
     * const plan = await prisma.plan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Plans and only return the `id`
     * const planWithIdOnly = await prisma.plan.updateManyAndReturn({
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
    updateManyAndReturn<T extends PlanUpdateManyAndReturnArgs>(args: SelectSubset<T, PlanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Plan.
     * @param {PlanUpsertArgs} args - Arguments to update or create a Plan.
     * @example
     * // Update or create a Plan
     * const plan = await prisma.plan.upsert({
     *   create: {
     *     // ... data to create a Plan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Plan we want to update
     *   }
     * })
     */
    upsert<T extends PlanUpsertArgs>(args: SelectSubset<T, PlanUpsertArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Plans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanCountArgs} args - Arguments to filter Plans to count.
     * @example
     * // Count the number of Plans
     * const count = await prisma.plan.count({
     *   where: {
     *     // ... the filter for the Plans we want to count
     *   }
     * })
    **/
    count<T extends PlanCountArgs>(
      args?: Subset<T, PlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Plan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PlanAggregateArgs>(args: Subset<T, PlanAggregateArgs>): Prisma.PrismaPromise<GetPlanAggregateType<T>>

    /**
     * Group by Plan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanGroupByArgs} args - Group by arguments.
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
      T extends PlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlanGroupByArgs['orderBy'] }
        : { orderBy?: PlanGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Plan model
   */
  readonly fields: PlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Plan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    goal<T extends GoalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GoalDefaultArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    versions<T extends Plan$versionsArgs<ExtArgs> = {}>(args?: Subset<T, Plan$versionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanVersionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    evaluations<T extends Plan$evaluationsArgs<ExtArgs> = {}>(args?: Subset<T, Plan$evaluationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanEvaluationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Plan model
   */
  interface PlanFieldRefs {
    readonly id: FieldRef<"Plan", 'String'>
    readonly goalId: FieldRef<"Plan", 'String'>
    readonly userId: FieldRef<"Plan", 'String'>
    readonly status: FieldRef<"Plan", 'String'>
    readonly currentVersionNum: FieldRef<"Plan", 'Int'>
    readonly createdAt: FieldRef<"Plan", 'DateTime'>
    readonly updatedAt: FieldRef<"Plan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Plan findUnique
   */
  export type PlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan findUniqueOrThrow
   */
  export type PlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan findFirst
   */
  export type PlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Plans.
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Plans.
     */
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
  }

  /**
   * Plan findFirstOrThrow
   */
  export type PlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Plans.
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Plans.
     */
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
  }

  /**
   * Plan findMany
   */
  export type PlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plans to fetch.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Plans.
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
  }

  /**
   * Plan create
   */
  export type PlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * The data needed to create a Plan.
     */
    data: XOR<PlanCreateInput, PlanUncheckedCreateInput>
  }

  /**
   * Plan createMany
   */
  export type PlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Plans.
     */
    data: PlanCreateManyInput | PlanCreateManyInput[]
  }

  /**
   * Plan createManyAndReturn
   */
  export type PlanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * The data used to create many Plans.
     */
    data: PlanCreateManyInput | PlanCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Plan update
   */
  export type PlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * The data needed to update a Plan.
     */
    data: XOR<PlanUpdateInput, PlanUncheckedUpdateInput>
    /**
     * Choose, which Plan to update.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan updateMany
   */
  export type PlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Plans.
     */
    data: XOR<PlanUpdateManyMutationInput, PlanUncheckedUpdateManyInput>
    /**
     * Filter which Plans to update
     */
    where?: PlanWhereInput
    /**
     * Limit how many Plans to update.
     */
    limit?: number
  }

  /**
   * Plan updateManyAndReturn
   */
  export type PlanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * The data used to update Plans.
     */
    data: XOR<PlanUpdateManyMutationInput, PlanUncheckedUpdateManyInput>
    /**
     * Filter which Plans to update
     */
    where?: PlanWhereInput
    /**
     * Limit how many Plans to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Plan upsert
   */
  export type PlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * The filter to search for the Plan to update in case it exists.
     */
    where: PlanWhereUniqueInput
    /**
     * In case the Plan found by the `where` argument doesn't exist, create a new Plan with this data.
     */
    create: XOR<PlanCreateInput, PlanUncheckedCreateInput>
    /**
     * In case the Plan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlanUpdateInput, PlanUncheckedUpdateInput>
  }

  /**
   * Plan delete
   */
  export type PlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter which Plan to delete.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan deleteMany
   */
  export type PlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Plans to delete
     */
    where?: PlanWhereInput
    /**
     * Limit how many Plans to delete.
     */
    limit?: number
  }

  /**
   * Plan.versions
   */
  export type Plan$versionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanVersion
     */
    select?: PlanVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanVersion
     */
    omit?: PlanVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanVersionInclude<ExtArgs> | null
    where?: PlanVersionWhereInput
    orderBy?: PlanVersionOrderByWithRelationInput | PlanVersionOrderByWithRelationInput[]
    cursor?: PlanVersionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlanVersionScalarFieldEnum | PlanVersionScalarFieldEnum[]
  }

  /**
   * Plan.evaluations
   */
  export type Plan$evaluationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanEvaluation
     */
    select?: PlanEvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanEvaluation
     */
    omit?: PlanEvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanEvaluationInclude<ExtArgs> | null
    where?: PlanEvaluationWhereInput
    orderBy?: PlanEvaluationOrderByWithRelationInput | PlanEvaluationOrderByWithRelationInput[]
    cursor?: PlanEvaluationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlanEvaluationScalarFieldEnum | PlanEvaluationScalarFieldEnum[]
  }

  /**
   * Plan without action
   */
  export type PlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
  }


  /**
   * Model PlanVersion
   */

  export type AggregatePlanVersion = {
    _count: PlanVersionCountAggregateOutputType | null
    _avg: PlanVersionAvgAggregateOutputType | null
    _sum: PlanVersionSumAggregateOutputType | null
    _min: PlanVersionMinAggregateOutputType | null
    _max: PlanVersionMaxAggregateOutputType | null
  }

  export type PlanVersionAvgAggregateOutputType = {
    versionNumber: number | null
  }

  export type PlanVersionSumAggregateOutputType = {
    versionNumber: number | null
  }

  export type PlanVersionMinAggregateOutputType = {
    id: string | null
    planId: string | null
    versionNumber: number | null
    schemaVersion: string | null
    summary: string | null
    milestoneTitle: string | null
    bottleneckType: string | null
    planData: string | null
    startDate: Date | null
    targetReviewDate: Date | null
    createdAt: Date | null
  }

  export type PlanVersionMaxAggregateOutputType = {
    id: string | null
    planId: string | null
    versionNumber: number | null
    schemaVersion: string | null
    summary: string | null
    milestoneTitle: string | null
    bottleneckType: string | null
    planData: string | null
    startDate: Date | null
    targetReviewDate: Date | null
    createdAt: Date | null
  }

  export type PlanVersionCountAggregateOutputType = {
    id: number
    planId: number
    versionNumber: number
    schemaVersion: number
    summary: number
    milestoneTitle: number
    bottleneckType: number
    planData: number
    startDate: number
    targetReviewDate: number
    createdAt: number
    _all: number
  }


  export type PlanVersionAvgAggregateInputType = {
    versionNumber?: true
  }

  export type PlanVersionSumAggregateInputType = {
    versionNumber?: true
  }

  export type PlanVersionMinAggregateInputType = {
    id?: true
    planId?: true
    versionNumber?: true
    schemaVersion?: true
    summary?: true
    milestoneTitle?: true
    bottleneckType?: true
    planData?: true
    startDate?: true
    targetReviewDate?: true
    createdAt?: true
  }

  export type PlanVersionMaxAggregateInputType = {
    id?: true
    planId?: true
    versionNumber?: true
    schemaVersion?: true
    summary?: true
    milestoneTitle?: true
    bottleneckType?: true
    planData?: true
    startDate?: true
    targetReviewDate?: true
    createdAt?: true
  }

  export type PlanVersionCountAggregateInputType = {
    id?: true
    planId?: true
    versionNumber?: true
    schemaVersion?: true
    summary?: true
    milestoneTitle?: true
    bottleneckType?: true
    planData?: true
    startDate?: true
    targetReviewDate?: true
    createdAt?: true
    _all?: true
  }

  export type PlanVersionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlanVersion to aggregate.
     */
    where?: PlanVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanVersions to fetch.
     */
    orderBy?: PlanVersionOrderByWithRelationInput | PlanVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlanVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PlanVersions
    **/
    _count?: true | PlanVersionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlanVersionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlanVersionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlanVersionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlanVersionMaxAggregateInputType
  }

  export type GetPlanVersionAggregateType<T extends PlanVersionAggregateArgs> = {
        [P in keyof T & keyof AggregatePlanVersion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlanVersion[P]>
      : GetScalarType<T[P], AggregatePlanVersion[P]>
  }




  export type PlanVersionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlanVersionWhereInput
    orderBy?: PlanVersionOrderByWithAggregationInput | PlanVersionOrderByWithAggregationInput[]
    by: PlanVersionScalarFieldEnum[] | PlanVersionScalarFieldEnum
    having?: PlanVersionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlanVersionCountAggregateInputType | true
    _avg?: PlanVersionAvgAggregateInputType
    _sum?: PlanVersionSumAggregateInputType
    _min?: PlanVersionMinAggregateInputType
    _max?: PlanVersionMaxAggregateInputType
  }

  export type PlanVersionGroupByOutputType = {
    id: string
    planId: string
    versionNumber: number
    schemaVersion: string
    summary: string
    milestoneTitle: string
    bottleneckType: string
    planData: string
    startDate: Date
    targetReviewDate: Date
    createdAt: Date
    _count: PlanVersionCountAggregateOutputType | null
    _avg: PlanVersionAvgAggregateOutputType | null
    _sum: PlanVersionSumAggregateOutputType | null
    _min: PlanVersionMinAggregateOutputType | null
    _max: PlanVersionMaxAggregateOutputType | null
  }

  type GetPlanVersionGroupByPayload<T extends PlanVersionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlanVersionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlanVersionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlanVersionGroupByOutputType[P]>
            : GetScalarType<T[P], PlanVersionGroupByOutputType[P]>
        }
      >
    >


  export type PlanVersionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    planId?: boolean
    versionNumber?: boolean
    schemaVersion?: boolean
    summary?: boolean
    milestoneTitle?: boolean
    bottleneckType?: boolean
    planData?: boolean
    startDate?: boolean
    targetReviewDate?: boolean
    createdAt?: boolean
    plan?: boolean | PlanDefaultArgs<ExtArgs>
    tasks?: boolean | PlanVersion$tasksArgs<ExtArgs>
    _count?: boolean | PlanVersionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["planVersion"]>

  export type PlanVersionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    planId?: boolean
    versionNumber?: boolean
    schemaVersion?: boolean
    summary?: boolean
    milestoneTitle?: boolean
    bottleneckType?: boolean
    planData?: boolean
    startDate?: boolean
    targetReviewDate?: boolean
    createdAt?: boolean
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["planVersion"]>

  export type PlanVersionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    planId?: boolean
    versionNumber?: boolean
    schemaVersion?: boolean
    summary?: boolean
    milestoneTitle?: boolean
    bottleneckType?: boolean
    planData?: boolean
    startDate?: boolean
    targetReviewDate?: boolean
    createdAt?: boolean
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["planVersion"]>

  export type PlanVersionSelectScalar = {
    id?: boolean
    planId?: boolean
    versionNumber?: boolean
    schemaVersion?: boolean
    summary?: boolean
    milestoneTitle?: boolean
    bottleneckType?: boolean
    planData?: boolean
    startDate?: boolean
    targetReviewDate?: boolean
    createdAt?: boolean
  }

  export type PlanVersionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "planId" | "versionNumber" | "schemaVersion" | "summary" | "milestoneTitle" | "bottleneckType" | "planData" | "startDate" | "targetReviewDate" | "createdAt", ExtArgs["result"]["planVersion"]>
  export type PlanVersionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | PlanDefaultArgs<ExtArgs>
    tasks?: boolean | PlanVersion$tasksArgs<ExtArgs>
    _count?: boolean | PlanVersionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PlanVersionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }
  export type PlanVersionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }

  export type $PlanVersionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PlanVersion"
    objects: {
      plan: Prisma.$PlanPayload<ExtArgs>
      tasks: Prisma.$PlanTaskPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      planId: string
      versionNumber: number
      schemaVersion: string
      summary: string
      milestoneTitle: string
      bottleneckType: string
      planData: string
      startDate: Date
      targetReviewDate: Date
      createdAt: Date
    }, ExtArgs["result"]["planVersion"]>
    composites: {}
  }

  type PlanVersionGetPayload<S extends boolean | null | undefined | PlanVersionDefaultArgs> = $Result.GetResult<Prisma.$PlanVersionPayload, S>

  type PlanVersionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlanVersionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlanVersionCountAggregateInputType | true
    }

  export interface PlanVersionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PlanVersion'], meta: { name: 'PlanVersion' } }
    /**
     * Find zero or one PlanVersion that matches the filter.
     * @param {PlanVersionFindUniqueArgs} args - Arguments to find a PlanVersion
     * @example
     * // Get one PlanVersion
     * const planVersion = await prisma.planVersion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlanVersionFindUniqueArgs>(args: SelectSubset<T, PlanVersionFindUniqueArgs<ExtArgs>>): Prisma__PlanVersionClient<$Result.GetResult<Prisma.$PlanVersionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PlanVersion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlanVersionFindUniqueOrThrowArgs} args - Arguments to find a PlanVersion
     * @example
     * // Get one PlanVersion
     * const planVersion = await prisma.planVersion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlanVersionFindUniqueOrThrowArgs>(args: SelectSubset<T, PlanVersionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlanVersionClient<$Result.GetResult<Prisma.$PlanVersionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlanVersion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanVersionFindFirstArgs} args - Arguments to find a PlanVersion
     * @example
     * // Get one PlanVersion
     * const planVersion = await prisma.planVersion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlanVersionFindFirstArgs>(args?: SelectSubset<T, PlanVersionFindFirstArgs<ExtArgs>>): Prisma__PlanVersionClient<$Result.GetResult<Prisma.$PlanVersionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlanVersion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanVersionFindFirstOrThrowArgs} args - Arguments to find a PlanVersion
     * @example
     * // Get one PlanVersion
     * const planVersion = await prisma.planVersion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlanVersionFindFirstOrThrowArgs>(args?: SelectSubset<T, PlanVersionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlanVersionClient<$Result.GetResult<Prisma.$PlanVersionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PlanVersions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanVersionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PlanVersions
     * const planVersions = await prisma.planVersion.findMany()
     * 
     * // Get first 10 PlanVersions
     * const planVersions = await prisma.planVersion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const planVersionWithIdOnly = await prisma.planVersion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlanVersionFindManyArgs>(args?: SelectSubset<T, PlanVersionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanVersionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PlanVersion.
     * @param {PlanVersionCreateArgs} args - Arguments to create a PlanVersion.
     * @example
     * // Create one PlanVersion
     * const PlanVersion = await prisma.planVersion.create({
     *   data: {
     *     // ... data to create a PlanVersion
     *   }
     * })
     * 
     */
    create<T extends PlanVersionCreateArgs>(args: SelectSubset<T, PlanVersionCreateArgs<ExtArgs>>): Prisma__PlanVersionClient<$Result.GetResult<Prisma.$PlanVersionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PlanVersions.
     * @param {PlanVersionCreateManyArgs} args - Arguments to create many PlanVersions.
     * @example
     * // Create many PlanVersions
     * const planVersion = await prisma.planVersion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlanVersionCreateManyArgs>(args?: SelectSubset<T, PlanVersionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PlanVersions and returns the data saved in the database.
     * @param {PlanVersionCreateManyAndReturnArgs} args - Arguments to create many PlanVersions.
     * @example
     * // Create many PlanVersions
     * const planVersion = await prisma.planVersion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PlanVersions and only return the `id`
     * const planVersionWithIdOnly = await prisma.planVersion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlanVersionCreateManyAndReturnArgs>(args?: SelectSubset<T, PlanVersionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanVersionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PlanVersion.
     * @param {PlanVersionDeleteArgs} args - Arguments to delete one PlanVersion.
     * @example
     * // Delete one PlanVersion
     * const PlanVersion = await prisma.planVersion.delete({
     *   where: {
     *     // ... filter to delete one PlanVersion
     *   }
     * })
     * 
     */
    delete<T extends PlanVersionDeleteArgs>(args: SelectSubset<T, PlanVersionDeleteArgs<ExtArgs>>): Prisma__PlanVersionClient<$Result.GetResult<Prisma.$PlanVersionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PlanVersion.
     * @param {PlanVersionUpdateArgs} args - Arguments to update one PlanVersion.
     * @example
     * // Update one PlanVersion
     * const planVersion = await prisma.planVersion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlanVersionUpdateArgs>(args: SelectSubset<T, PlanVersionUpdateArgs<ExtArgs>>): Prisma__PlanVersionClient<$Result.GetResult<Prisma.$PlanVersionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PlanVersions.
     * @param {PlanVersionDeleteManyArgs} args - Arguments to filter PlanVersions to delete.
     * @example
     * // Delete a few PlanVersions
     * const { count } = await prisma.planVersion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlanVersionDeleteManyArgs>(args?: SelectSubset<T, PlanVersionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlanVersions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanVersionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PlanVersions
     * const planVersion = await prisma.planVersion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlanVersionUpdateManyArgs>(args: SelectSubset<T, PlanVersionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlanVersions and returns the data updated in the database.
     * @param {PlanVersionUpdateManyAndReturnArgs} args - Arguments to update many PlanVersions.
     * @example
     * // Update many PlanVersions
     * const planVersion = await prisma.planVersion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PlanVersions and only return the `id`
     * const planVersionWithIdOnly = await prisma.planVersion.updateManyAndReturn({
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
    updateManyAndReturn<T extends PlanVersionUpdateManyAndReturnArgs>(args: SelectSubset<T, PlanVersionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanVersionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PlanVersion.
     * @param {PlanVersionUpsertArgs} args - Arguments to update or create a PlanVersion.
     * @example
     * // Update or create a PlanVersion
     * const planVersion = await prisma.planVersion.upsert({
     *   create: {
     *     // ... data to create a PlanVersion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PlanVersion we want to update
     *   }
     * })
     */
    upsert<T extends PlanVersionUpsertArgs>(args: SelectSubset<T, PlanVersionUpsertArgs<ExtArgs>>): Prisma__PlanVersionClient<$Result.GetResult<Prisma.$PlanVersionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PlanVersions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanVersionCountArgs} args - Arguments to filter PlanVersions to count.
     * @example
     * // Count the number of PlanVersions
     * const count = await prisma.planVersion.count({
     *   where: {
     *     // ... the filter for the PlanVersions we want to count
     *   }
     * })
    **/
    count<T extends PlanVersionCountArgs>(
      args?: Subset<T, PlanVersionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlanVersionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PlanVersion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanVersionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PlanVersionAggregateArgs>(args: Subset<T, PlanVersionAggregateArgs>): Prisma.PrismaPromise<GetPlanVersionAggregateType<T>>

    /**
     * Group by PlanVersion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanVersionGroupByArgs} args - Group by arguments.
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
      T extends PlanVersionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlanVersionGroupByArgs['orderBy'] }
        : { orderBy?: PlanVersionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PlanVersionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlanVersionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PlanVersion model
   */
  readonly fields: PlanVersionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PlanVersion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlanVersionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    plan<T extends PlanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlanDefaultArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tasks<T extends PlanVersion$tasksArgs<ExtArgs> = {}>(args?: Subset<T, PlanVersion$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanTaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the PlanVersion model
   */
  interface PlanVersionFieldRefs {
    readonly id: FieldRef<"PlanVersion", 'String'>
    readonly planId: FieldRef<"PlanVersion", 'String'>
    readonly versionNumber: FieldRef<"PlanVersion", 'Int'>
    readonly schemaVersion: FieldRef<"PlanVersion", 'String'>
    readonly summary: FieldRef<"PlanVersion", 'String'>
    readonly milestoneTitle: FieldRef<"PlanVersion", 'String'>
    readonly bottleneckType: FieldRef<"PlanVersion", 'String'>
    readonly planData: FieldRef<"PlanVersion", 'String'>
    readonly startDate: FieldRef<"PlanVersion", 'DateTime'>
    readonly targetReviewDate: FieldRef<"PlanVersion", 'DateTime'>
    readonly createdAt: FieldRef<"PlanVersion", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PlanVersion findUnique
   */
  export type PlanVersionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanVersion
     */
    select?: PlanVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanVersion
     */
    omit?: PlanVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanVersionInclude<ExtArgs> | null
    /**
     * Filter, which PlanVersion to fetch.
     */
    where: PlanVersionWhereUniqueInput
  }

  /**
   * PlanVersion findUniqueOrThrow
   */
  export type PlanVersionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanVersion
     */
    select?: PlanVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanVersion
     */
    omit?: PlanVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanVersionInclude<ExtArgs> | null
    /**
     * Filter, which PlanVersion to fetch.
     */
    where: PlanVersionWhereUniqueInput
  }

  /**
   * PlanVersion findFirst
   */
  export type PlanVersionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanVersion
     */
    select?: PlanVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanVersion
     */
    omit?: PlanVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanVersionInclude<ExtArgs> | null
    /**
     * Filter, which PlanVersion to fetch.
     */
    where?: PlanVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanVersions to fetch.
     */
    orderBy?: PlanVersionOrderByWithRelationInput | PlanVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlanVersions.
     */
    cursor?: PlanVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlanVersions.
     */
    distinct?: PlanVersionScalarFieldEnum | PlanVersionScalarFieldEnum[]
  }

  /**
   * PlanVersion findFirstOrThrow
   */
  export type PlanVersionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanVersion
     */
    select?: PlanVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanVersion
     */
    omit?: PlanVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanVersionInclude<ExtArgs> | null
    /**
     * Filter, which PlanVersion to fetch.
     */
    where?: PlanVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanVersions to fetch.
     */
    orderBy?: PlanVersionOrderByWithRelationInput | PlanVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlanVersions.
     */
    cursor?: PlanVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlanVersions.
     */
    distinct?: PlanVersionScalarFieldEnum | PlanVersionScalarFieldEnum[]
  }

  /**
   * PlanVersion findMany
   */
  export type PlanVersionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanVersion
     */
    select?: PlanVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanVersion
     */
    omit?: PlanVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanVersionInclude<ExtArgs> | null
    /**
     * Filter, which PlanVersions to fetch.
     */
    where?: PlanVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanVersions to fetch.
     */
    orderBy?: PlanVersionOrderByWithRelationInput | PlanVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PlanVersions.
     */
    cursor?: PlanVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanVersions.
     */
    skip?: number
    distinct?: PlanVersionScalarFieldEnum | PlanVersionScalarFieldEnum[]
  }

  /**
   * PlanVersion create
   */
  export type PlanVersionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanVersion
     */
    select?: PlanVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanVersion
     */
    omit?: PlanVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanVersionInclude<ExtArgs> | null
    /**
     * The data needed to create a PlanVersion.
     */
    data: XOR<PlanVersionCreateInput, PlanVersionUncheckedCreateInput>
  }

  /**
   * PlanVersion createMany
   */
  export type PlanVersionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PlanVersions.
     */
    data: PlanVersionCreateManyInput | PlanVersionCreateManyInput[]
  }

  /**
   * PlanVersion createManyAndReturn
   */
  export type PlanVersionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanVersion
     */
    select?: PlanVersionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlanVersion
     */
    omit?: PlanVersionOmit<ExtArgs> | null
    /**
     * The data used to create many PlanVersions.
     */
    data: PlanVersionCreateManyInput | PlanVersionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanVersionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlanVersion update
   */
  export type PlanVersionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanVersion
     */
    select?: PlanVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanVersion
     */
    omit?: PlanVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanVersionInclude<ExtArgs> | null
    /**
     * The data needed to update a PlanVersion.
     */
    data: XOR<PlanVersionUpdateInput, PlanVersionUncheckedUpdateInput>
    /**
     * Choose, which PlanVersion to update.
     */
    where: PlanVersionWhereUniqueInput
  }

  /**
   * PlanVersion updateMany
   */
  export type PlanVersionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PlanVersions.
     */
    data: XOR<PlanVersionUpdateManyMutationInput, PlanVersionUncheckedUpdateManyInput>
    /**
     * Filter which PlanVersions to update
     */
    where?: PlanVersionWhereInput
    /**
     * Limit how many PlanVersions to update.
     */
    limit?: number
  }

  /**
   * PlanVersion updateManyAndReturn
   */
  export type PlanVersionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanVersion
     */
    select?: PlanVersionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlanVersion
     */
    omit?: PlanVersionOmit<ExtArgs> | null
    /**
     * The data used to update PlanVersions.
     */
    data: XOR<PlanVersionUpdateManyMutationInput, PlanVersionUncheckedUpdateManyInput>
    /**
     * Filter which PlanVersions to update
     */
    where?: PlanVersionWhereInput
    /**
     * Limit how many PlanVersions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanVersionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlanVersion upsert
   */
  export type PlanVersionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanVersion
     */
    select?: PlanVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanVersion
     */
    omit?: PlanVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanVersionInclude<ExtArgs> | null
    /**
     * The filter to search for the PlanVersion to update in case it exists.
     */
    where: PlanVersionWhereUniqueInput
    /**
     * In case the PlanVersion found by the `where` argument doesn't exist, create a new PlanVersion with this data.
     */
    create: XOR<PlanVersionCreateInput, PlanVersionUncheckedCreateInput>
    /**
     * In case the PlanVersion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlanVersionUpdateInput, PlanVersionUncheckedUpdateInput>
  }

  /**
   * PlanVersion delete
   */
  export type PlanVersionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanVersion
     */
    select?: PlanVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanVersion
     */
    omit?: PlanVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanVersionInclude<ExtArgs> | null
    /**
     * Filter which PlanVersion to delete.
     */
    where: PlanVersionWhereUniqueInput
  }

  /**
   * PlanVersion deleteMany
   */
  export type PlanVersionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlanVersions to delete
     */
    where?: PlanVersionWhereInput
    /**
     * Limit how many PlanVersions to delete.
     */
    limit?: number
  }

  /**
   * PlanVersion.tasks
   */
  export type PlanVersion$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanTask
     */
    select?: PlanTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanTask
     */
    omit?: PlanTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanTaskInclude<ExtArgs> | null
    where?: PlanTaskWhereInput
    orderBy?: PlanTaskOrderByWithRelationInput | PlanTaskOrderByWithRelationInput[]
    cursor?: PlanTaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlanTaskScalarFieldEnum | PlanTaskScalarFieldEnum[]
  }

  /**
   * PlanVersion without action
   */
  export type PlanVersionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanVersion
     */
    select?: PlanVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanVersion
     */
    omit?: PlanVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanVersionInclude<ExtArgs> | null
  }


  /**
   * Model PlanTask
   */

  export type AggregatePlanTask = {
    _count: PlanTaskCountAggregateOutputType | null
    _avg: PlanTaskAvgAggregateOutputType | null
    _sum: PlanTaskSumAggregateOutputType | null
    _min: PlanTaskMinAggregateOutputType | null
    _max: PlanTaskMaxAggregateOutputType | null
  }

  export type PlanTaskAvgAggregateOutputType = {
    quantity: number | null
    quantityCompleted: number | null
    minDifficulty: number | null
    maxDifficulty: number | null
  }

  export type PlanTaskSumAggregateOutputType = {
    quantity: number | null
    quantityCompleted: number | null
    minDifficulty: number | null
    maxDifficulty: number | null
  }

  export type PlanTaskMinAggregateOutputType = {
    id: string | null
    planVersionId: string | null
    externalTaskId: string | null
    type: string | null
    title: string | null
    quantity: number | null
    quantityCompleted: number | null
    platform: string | null
    minDifficulty: number | null
    maxDifficulty: number | null
    difficultyTier: string | null
    topics: string | null
    reason: string | null
    evidenceReferences: string | null
    completionMetric: string | null
    status: string | null
    createdAt: Date | null
  }

  export type PlanTaskMaxAggregateOutputType = {
    id: string | null
    planVersionId: string | null
    externalTaskId: string | null
    type: string | null
    title: string | null
    quantity: number | null
    quantityCompleted: number | null
    platform: string | null
    minDifficulty: number | null
    maxDifficulty: number | null
    difficultyTier: string | null
    topics: string | null
    reason: string | null
    evidenceReferences: string | null
    completionMetric: string | null
    status: string | null
    createdAt: Date | null
  }

  export type PlanTaskCountAggregateOutputType = {
    id: number
    planVersionId: number
    externalTaskId: number
    type: number
    title: number
    quantity: number
    quantityCompleted: number
    platform: number
    minDifficulty: number
    maxDifficulty: number
    difficultyTier: number
    topics: number
    reason: number
    evidenceReferences: number
    completionMetric: number
    status: number
    createdAt: number
    _all: number
  }


  export type PlanTaskAvgAggregateInputType = {
    quantity?: true
    quantityCompleted?: true
    minDifficulty?: true
    maxDifficulty?: true
  }

  export type PlanTaskSumAggregateInputType = {
    quantity?: true
    quantityCompleted?: true
    minDifficulty?: true
    maxDifficulty?: true
  }

  export type PlanTaskMinAggregateInputType = {
    id?: true
    planVersionId?: true
    externalTaskId?: true
    type?: true
    title?: true
    quantity?: true
    quantityCompleted?: true
    platform?: true
    minDifficulty?: true
    maxDifficulty?: true
    difficultyTier?: true
    topics?: true
    reason?: true
    evidenceReferences?: true
    completionMetric?: true
    status?: true
    createdAt?: true
  }

  export type PlanTaskMaxAggregateInputType = {
    id?: true
    planVersionId?: true
    externalTaskId?: true
    type?: true
    title?: true
    quantity?: true
    quantityCompleted?: true
    platform?: true
    minDifficulty?: true
    maxDifficulty?: true
    difficultyTier?: true
    topics?: true
    reason?: true
    evidenceReferences?: true
    completionMetric?: true
    status?: true
    createdAt?: true
  }

  export type PlanTaskCountAggregateInputType = {
    id?: true
    planVersionId?: true
    externalTaskId?: true
    type?: true
    title?: true
    quantity?: true
    quantityCompleted?: true
    platform?: true
    minDifficulty?: true
    maxDifficulty?: true
    difficultyTier?: true
    topics?: true
    reason?: true
    evidenceReferences?: true
    completionMetric?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type PlanTaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlanTask to aggregate.
     */
    where?: PlanTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanTasks to fetch.
     */
    orderBy?: PlanTaskOrderByWithRelationInput | PlanTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlanTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanTasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PlanTasks
    **/
    _count?: true | PlanTaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlanTaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlanTaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlanTaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlanTaskMaxAggregateInputType
  }

  export type GetPlanTaskAggregateType<T extends PlanTaskAggregateArgs> = {
        [P in keyof T & keyof AggregatePlanTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlanTask[P]>
      : GetScalarType<T[P], AggregatePlanTask[P]>
  }




  export type PlanTaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlanTaskWhereInput
    orderBy?: PlanTaskOrderByWithAggregationInput | PlanTaskOrderByWithAggregationInput[]
    by: PlanTaskScalarFieldEnum[] | PlanTaskScalarFieldEnum
    having?: PlanTaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlanTaskCountAggregateInputType | true
    _avg?: PlanTaskAvgAggregateInputType
    _sum?: PlanTaskSumAggregateInputType
    _min?: PlanTaskMinAggregateInputType
    _max?: PlanTaskMaxAggregateInputType
  }

  export type PlanTaskGroupByOutputType = {
    id: string
    planVersionId: string
    externalTaskId: string
    type: string
    title: string
    quantity: number
    quantityCompleted: number
    platform: string | null
    minDifficulty: number | null
    maxDifficulty: number | null
    difficultyTier: string | null
    topics: string
    reason: string
    evidenceReferences: string
    completionMetric: string
    status: string
    createdAt: Date
    _count: PlanTaskCountAggregateOutputType | null
    _avg: PlanTaskAvgAggregateOutputType | null
    _sum: PlanTaskSumAggregateOutputType | null
    _min: PlanTaskMinAggregateOutputType | null
    _max: PlanTaskMaxAggregateOutputType | null
  }

  type GetPlanTaskGroupByPayload<T extends PlanTaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlanTaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlanTaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlanTaskGroupByOutputType[P]>
            : GetScalarType<T[P], PlanTaskGroupByOutputType[P]>
        }
      >
    >


  export type PlanTaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    planVersionId?: boolean
    externalTaskId?: boolean
    type?: boolean
    title?: boolean
    quantity?: boolean
    quantityCompleted?: boolean
    platform?: boolean
    minDifficulty?: boolean
    maxDifficulty?: boolean
    difficultyTier?: boolean
    topics?: boolean
    reason?: boolean
    evidenceReferences?: boolean
    completionMetric?: boolean
    status?: boolean
    createdAt?: boolean
    planVersion?: boolean | PlanVersionDefaultArgs<ExtArgs>
    matches?: boolean | PlanTask$matchesArgs<ExtArgs>
    _count?: boolean | PlanTaskCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["planTask"]>

  export type PlanTaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    planVersionId?: boolean
    externalTaskId?: boolean
    type?: boolean
    title?: boolean
    quantity?: boolean
    quantityCompleted?: boolean
    platform?: boolean
    minDifficulty?: boolean
    maxDifficulty?: boolean
    difficultyTier?: boolean
    topics?: boolean
    reason?: boolean
    evidenceReferences?: boolean
    completionMetric?: boolean
    status?: boolean
    createdAt?: boolean
    planVersion?: boolean | PlanVersionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["planTask"]>

  export type PlanTaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    planVersionId?: boolean
    externalTaskId?: boolean
    type?: boolean
    title?: boolean
    quantity?: boolean
    quantityCompleted?: boolean
    platform?: boolean
    minDifficulty?: boolean
    maxDifficulty?: boolean
    difficultyTier?: boolean
    topics?: boolean
    reason?: boolean
    evidenceReferences?: boolean
    completionMetric?: boolean
    status?: boolean
    createdAt?: boolean
    planVersion?: boolean | PlanVersionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["planTask"]>

  export type PlanTaskSelectScalar = {
    id?: boolean
    planVersionId?: boolean
    externalTaskId?: boolean
    type?: boolean
    title?: boolean
    quantity?: boolean
    quantityCompleted?: boolean
    platform?: boolean
    minDifficulty?: boolean
    maxDifficulty?: boolean
    difficultyTier?: boolean
    topics?: boolean
    reason?: boolean
    evidenceReferences?: boolean
    completionMetric?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type PlanTaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "planVersionId" | "externalTaskId" | "type" | "title" | "quantity" | "quantityCompleted" | "platform" | "minDifficulty" | "maxDifficulty" | "difficultyTier" | "topics" | "reason" | "evidenceReferences" | "completionMetric" | "status" | "createdAt", ExtArgs["result"]["planTask"]>
  export type PlanTaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    planVersion?: boolean | PlanVersionDefaultArgs<ExtArgs>
    matches?: boolean | PlanTask$matchesArgs<ExtArgs>
    _count?: boolean | PlanTaskCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PlanTaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    planVersion?: boolean | PlanVersionDefaultArgs<ExtArgs>
  }
  export type PlanTaskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    planVersion?: boolean | PlanVersionDefaultArgs<ExtArgs>
  }

  export type $PlanTaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PlanTask"
    objects: {
      planVersion: Prisma.$PlanVersionPayload<ExtArgs>
      matches: Prisma.$TaskEvidenceMatchPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      planVersionId: string
      externalTaskId: string
      type: string
      title: string
      quantity: number
      quantityCompleted: number
      platform: string | null
      minDifficulty: number | null
      maxDifficulty: number | null
      difficultyTier: string | null
      topics: string
      reason: string
      evidenceReferences: string
      completionMetric: string
      status: string
      createdAt: Date
    }, ExtArgs["result"]["planTask"]>
    composites: {}
  }

  type PlanTaskGetPayload<S extends boolean | null | undefined | PlanTaskDefaultArgs> = $Result.GetResult<Prisma.$PlanTaskPayload, S>

  type PlanTaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlanTaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlanTaskCountAggregateInputType | true
    }

  export interface PlanTaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PlanTask'], meta: { name: 'PlanTask' } }
    /**
     * Find zero or one PlanTask that matches the filter.
     * @param {PlanTaskFindUniqueArgs} args - Arguments to find a PlanTask
     * @example
     * // Get one PlanTask
     * const planTask = await prisma.planTask.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlanTaskFindUniqueArgs>(args: SelectSubset<T, PlanTaskFindUniqueArgs<ExtArgs>>): Prisma__PlanTaskClient<$Result.GetResult<Prisma.$PlanTaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PlanTask that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlanTaskFindUniqueOrThrowArgs} args - Arguments to find a PlanTask
     * @example
     * // Get one PlanTask
     * const planTask = await prisma.planTask.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlanTaskFindUniqueOrThrowArgs>(args: SelectSubset<T, PlanTaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlanTaskClient<$Result.GetResult<Prisma.$PlanTaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlanTask that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanTaskFindFirstArgs} args - Arguments to find a PlanTask
     * @example
     * // Get one PlanTask
     * const planTask = await prisma.planTask.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlanTaskFindFirstArgs>(args?: SelectSubset<T, PlanTaskFindFirstArgs<ExtArgs>>): Prisma__PlanTaskClient<$Result.GetResult<Prisma.$PlanTaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlanTask that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanTaskFindFirstOrThrowArgs} args - Arguments to find a PlanTask
     * @example
     * // Get one PlanTask
     * const planTask = await prisma.planTask.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlanTaskFindFirstOrThrowArgs>(args?: SelectSubset<T, PlanTaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlanTaskClient<$Result.GetResult<Prisma.$PlanTaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PlanTasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanTaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PlanTasks
     * const planTasks = await prisma.planTask.findMany()
     * 
     * // Get first 10 PlanTasks
     * const planTasks = await prisma.planTask.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const planTaskWithIdOnly = await prisma.planTask.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlanTaskFindManyArgs>(args?: SelectSubset<T, PlanTaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanTaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PlanTask.
     * @param {PlanTaskCreateArgs} args - Arguments to create a PlanTask.
     * @example
     * // Create one PlanTask
     * const PlanTask = await prisma.planTask.create({
     *   data: {
     *     // ... data to create a PlanTask
     *   }
     * })
     * 
     */
    create<T extends PlanTaskCreateArgs>(args: SelectSubset<T, PlanTaskCreateArgs<ExtArgs>>): Prisma__PlanTaskClient<$Result.GetResult<Prisma.$PlanTaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PlanTasks.
     * @param {PlanTaskCreateManyArgs} args - Arguments to create many PlanTasks.
     * @example
     * // Create many PlanTasks
     * const planTask = await prisma.planTask.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlanTaskCreateManyArgs>(args?: SelectSubset<T, PlanTaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PlanTasks and returns the data saved in the database.
     * @param {PlanTaskCreateManyAndReturnArgs} args - Arguments to create many PlanTasks.
     * @example
     * // Create many PlanTasks
     * const planTask = await prisma.planTask.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PlanTasks and only return the `id`
     * const planTaskWithIdOnly = await prisma.planTask.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlanTaskCreateManyAndReturnArgs>(args?: SelectSubset<T, PlanTaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanTaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PlanTask.
     * @param {PlanTaskDeleteArgs} args - Arguments to delete one PlanTask.
     * @example
     * // Delete one PlanTask
     * const PlanTask = await prisma.planTask.delete({
     *   where: {
     *     // ... filter to delete one PlanTask
     *   }
     * })
     * 
     */
    delete<T extends PlanTaskDeleteArgs>(args: SelectSubset<T, PlanTaskDeleteArgs<ExtArgs>>): Prisma__PlanTaskClient<$Result.GetResult<Prisma.$PlanTaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PlanTask.
     * @param {PlanTaskUpdateArgs} args - Arguments to update one PlanTask.
     * @example
     * // Update one PlanTask
     * const planTask = await prisma.planTask.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlanTaskUpdateArgs>(args: SelectSubset<T, PlanTaskUpdateArgs<ExtArgs>>): Prisma__PlanTaskClient<$Result.GetResult<Prisma.$PlanTaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PlanTasks.
     * @param {PlanTaskDeleteManyArgs} args - Arguments to filter PlanTasks to delete.
     * @example
     * // Delete a few PlanTasks
     * const { count } = await prisma.planTask.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlanTaskDeleteManyArgs>(args?: SelectSubset<T, PlanTaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlanTasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanTaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PlanTasks
     * const planTask = await prisma.planTask.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlanTaskUpdateManyArgs>(args: SelectSubset<T, PlanTaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlanTasks and returns the data updated in the database.
     * @param {PlanTaskUpdateManyAndReturnArgs} args - Arguments to update many PlanTasks.
     * @example
     * // Update many PlanTasks
     * const planTask = await prisma.planTask.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PlanTasks and only return the `id`
     * const planTaskWithIdOnly = await prisma.planTask.updateManyAndReturn({
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
    updateManyAndReturn<T extends PlanTaskUpdateManyAndReturnArgs>(args: SelectSubset<T, PlanTaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanTaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PlanTask.
     * @param {PlanTaskUpsertArgs} args - Arguments to update or create a PlanTask.
     * @example
     * // Update or create a PlanTask
     * const planTask = await prisma.planTask.upsert({
     *   create: {
     *     // ... data to create a PlanTask
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PlanTask we want to update
     *   }
     * })
     */
    upsert<T extends PlanTaskUpsertArgs>(args: SelectSubset<T, PlanTaskUpsertArgs<ExtArgs>>): Prisma__PlanTaskClient<$Result.GetResult<Prisma.$PlanTaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PlanTasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanTaskCountArgs} args - Arguments to filter PlanTasks to count.
     * @example
     * // Count the number of PlanTasks
     * const count = await prisma.planTask.count({
     *   where: {
     *     // ... the filter for the PlanTasks we want to count
     *   }
     * })
    **/
    count<T extends PlanTaskCountArgs>(
      args?: Subset<T, PlanTaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlanTaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PlanTask.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanTaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PlanTaskAggregateArgs>(args: Subset<T, PlanTaskAggregateArgs>): Prisma.PrismaPromise<GetPlanTaskAggregateType<T>>

    /**
     * Group by PlanTask.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanTaskGroupByArgs} args - Group by arguments.
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
      T extends PlanTaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlanTaskGroupByArgs['orderBy'] }
        : { orderBy?: PlanTaskGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PlanTaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlanTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PlanTask model
   */
  readonly fields: PlanTaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PlanTask.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlanTaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    planVersion<T extends PlanVersionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlanVersionDefaultArgs<ExtArgs>>): Prisma__PlanVersionClient<$Result.GetResult<Prisma.$PlanVersionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    matches<T extends PlanTask$matchesArgs<ExtArgs> = {}>(args?: Subset<T, PlanTask$matchesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskEvidenceMatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the PlanTask model
   */
  interface PlanTaskFieldRefs {
    readonly id: FieldRef<"PlanTask", 'String'>
    readonly planVersionId: FieldRef<"PlanTask", 'String'>
    readonly externalTaskId: FieldRef<"PlanTask", 'String'>
    readonly type: FieldRef<"PlanTask", 'String'>
    readonly title: FieldRef<"PlanTask", 'String'>
    readonly quantity: FieldRef<"PlanTask", 'Int'>
    readonly quantityCompleted: FieldRef<"PlanTask", 'Int'>
    readonly platform: FieldRef<"PlanTask", 'String'>
    readonly minDifficulty: FieldRef<"PlanTask", 'Int'>
    readonly maxDifficulty: FieldRef<"PlanTask", 'Int'>
    readonly difficultyTier: FieldRef<"PlanTask", 'String'>
    readonly topics: FieldRef<"PlanTask", 'String'>
    readonly reason: FieldRef<"PlanTask", 'String'>
    readonly evidenceReferences: FieldRef<"PlanTask", 'String'>
    readonly completionMetric: FieldRef<"PlanTask", 'String'>
    readonly status: FieldRef<"PlanTask", 'String'>
    readonly createdAt: FieldRef<"PlanTask", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PlanTask findUnique
   */
  export type PlanTaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanTask
     */
    select?: PlanTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanTask
     */
    omit?: PlanTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanTaskInclude<ExtArgs> | null
    /**
     * Filter, which PlanTask to fetch.
     */
    where: PlanTaskWhereUniqueInput
  }

  /**
   * PlanTask findUniqueOrThrow
   */
  export type PlanTaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanTask
     */
    select?: PlanTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanTask
     */
    omit?: PlanTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanTaskInclude<ExtArgs> | null
    /**
     * Filter, which PlanTask to fetch.
     */
    where: PlanTaskWhereUniqueInput
  }

  /**
   * PlanTask findFirst
   */
  export type PlanTaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanTask
     */
    select?: PlanTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanTask
     */
    omit?: PlanTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanTaskInclude<ExtArgs> | null
    /**
     * Filter, which PlanTask to fetch.
     */
    where?: PlanTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanTasks to fetch.
     */
    orderBy?: PlanTaskOrderByWithRelationInput | PlanTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlanTasks.
     */
    cursor?: PlanTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanTasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlanTasks.
     */
    distinct?: PlanTaskScalarFieldEnum | PlanTaskScalarFieldEnum[]
  }

  /**
   * PlanTask findFirstOrThrow
   */
  export type PlanTaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanTask
     */
    select?: PlanTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanTask
     */
    omit?: PlanTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanTaskInclude<ExtArgs> | null
    /**
     * Filter, which PlanTask to fetch.
     */
    where?: PlanTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanTasks to fetch.
     */
    orderBy?: PlanTaskOrderByWithRelationInput | PlanTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlanTasks.
     */
    cursor?: PlanTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanTasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlanTasks.
     */
    distinct?: PlanTaskScalarFieldEnum | PlanTaskScalarFieldEnum[]
  }

  /**
   * PlanTask findMany
   */
  export type PlanTaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanTask
     */
    select?: PlanTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanTask
     */
    omit?: PlanTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanTaskInclude<ExtArgs> | null
    /**
     * Filter, which PlanTasks to fetch.
     */
    where?: PlanTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanTasks to fetch.
     */
    orderBy?: PlanTaskOrderByWithRelationInput | PlanTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PlanTasks.
     */
    cursor?: PlanTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanTasks.
     */
    skip?: number
    distinct?: PlanTaskScalarFieldEnum | PlanTaskScalarFieldEnum[]
  }

  /**
   * PlanTask create
   */
  export type PlanTaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanTask
     */
    select?: PlanTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanTask
     */
    omit?: PlanTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanTaskInclude<ExtArgs> | null
    /**
     * The data needed to create a PlanTask.
     */
    data: XOR<PlanTaskCreateInput, PlanTaskUncheckedCreateInput>
  }

  /**
   * PlanTask createMany
   */
  export type PlanTaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PlanTasks.
     */
    data: PlanTaskCreateManyInput | PlanTaskCreateManyInput[]
  }

  /**
   * PlanTask createManyAndReturn
   */
  export type PlanTaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanTask
     */
    select?: PlanTaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlanTask
     */
    omit?: PlanTaskOmit<ExtArgs> | null
    /**
     * The data used to create many PlanTasks.
     */
    data: PlanTaskCreateManyInput | PlanTaskCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanTaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlanTask update
   */
  export type PlanTaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanTask
     */
    select?: PlanTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanTask
     */
    omit?: PlanTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanTaskInclude<ExtArgs> | null
    /**
     * The data needed to update a PlanTask.
     */
    data: XOR<PlanTaskUpdateInput, PlanTaskUncheckedUpdateInput>
    /**
     * Choose, which PlanTask to update.
     */
    where: PlanTaskWhereUniqueInput
  }

  /**
   * PlanTask updateMany
   */
  export type PlanTaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PlanTasks.
     */
    data: XOR<PlanTaskUpdateManyMutationInput, PlanTaskUncheckedUpdateManyInput>
    /**
     * Filter which PlanTasks to update
     */
    where?: PlanTaskWhereInput
    /**
     * Limit how many PlanTasks to update.
     */
    limit?: number
  }

  /**
   * PlanTask updateManyAndReturn
   */
  export type PlanTaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanTask
     */
    select?: PlanTaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlanTask
     */
    omit?: PlanTaskOmit<ExtArgs> | null
    /**
     * The data used to update PlanTasks.
     */
    data: XOR<PlanTaskUpdateManyMutationInput, PlanTaskUncheckedUpdateManyInput>
    /**
     * Filter which PlanTasks to update
     */
    where?: PlanTaskWhereInput
    /**
     * Limit how many PlanTasks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanTaskIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlanTask upsert
   */
  export type PlanTaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanTask
     */
    select?: PlanTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanTask
     */
    omit?: PlanTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanTaskInclude<ExtArgs> | null
    /**
     * The filter to search for the PlanTask to update in case it exists.
     */
    where: PlanTaskWhereUniqueInput
    /**
     * In case the PlanTask found by the `where` argument doesn't exist, create a new PlanTask with this data.
     */
    create: XOR<PlanTaskCreateInput, PlanTaskUncheckedCreateInput>
    /**
     * In case the PlanTask was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlanTaskUpdateInput, PlanTaskUncheckedUpdateInput>
  }

  /**
   * PlanTask delete
   */
  export type PlanTaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanTask
     */
    select?: PlanTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanTask
     */
    omit?: PlanTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanTaskInclude<ExtArgs> | null
    /**
     * Filter which PlanTask to delete.
     */
    where: PlanTaskWhereUniqueInput
  }

  /**
   * PlanTask deleteMany
   */
  export type PlanTaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlanTasks to delete
     */
    where?: PlanTaskWhereInput
    /**
     * Limit how many PlanTasks to delete.
     */
    limit?: number
  }

  /**
   * PlanTask.matches
   */
  export type PlanTask$matchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskEvidenceMatch
     */
    select?: TaskEvidenceMatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskEvidenceMatch
     */
    omit?: TaskEvidenceMatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskEvidenceMatchInclude<ExtArgs> | null
    where?: TaskEvidenceMatchWhereInput
    orderBy?: TaskEvidenceMatchOrderByWithRelationInput | TaskEvidenceMatchOrderByWithRelationInput[]
    cursor?: TaskEvidenceMatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskEvidenceMatchScalarFieldEnum | TaskEvidenceMatchScalarFieldEnum[]
  }

  /**
   * PlanTask without action
   */
  export type PlanTaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanTask
     */
    select?: PlanTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanTask
     */
    omit?: PlanTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanTaskInclude<ExtArgs> | null
  }


  /**
   * Model TaskEvidenceMatch
   */

  export type AggregateTaskEvidenceMatch = {
    _count: TaskEvidenceMatchCountAggregateOutputType | null
    _min: TaskEvidenceMatchMinAggregateOutputType | null
    _max: TaskEvidenceMatchMaxAggregateOutputType | null
  }

  export type TaskEvidenceMatchMinAggregateOutputType = {
    id: string | null
    taskId: string | null
    submissionId: string | null
    contestHistoryId: string | null
    matchedAt: Date | null
    notes: string | null
  }

  export type TaskEvidenceMatchMaxAggregateOutputType = {
    id: string | null
    taskId: string | null
    submissionId: string | null
    contestHistoryId: string | null
    matchedAt: Date | null
    notes: string | null
  }

  export type TaskEvidenceMatchCountAggregateOutputType = {
    id: number
    taskId: number
    submissionId: number
    contestHistoryId: number
    matchedAt: number
    notes: number
    _all: number
  }


  export type TaskEvidenceMatchMinAggregateInputType = {
    id?: true
    taskId?: true
    submissionId?: true
    contestHistoryId?: true
    matchedAt?: true
    notes?: true
  }

  export type TaskEvidenceMatchMaxAggregateInputType = {
    id?: true
    taskId?: true
    submissionId?: true
    contestHistoryId?: true
    matchedAt?: true
    notes?: true
  }

  export type TaskEvidenceMatchCountAggregateInputType = {
    id?: true
    taskId?: true
    submissionId?: true
    contestHistoryId?: true
    matchedAt?: true
    notes?: true
    _all?: true
  }

  export type TaskEvidenceMatchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskEvidenceMatch to aggregate.
     */
    where?: TaskEvidenceMatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskEvidenceMatches to fetch.
     */
    orderBy?: TaskEvidenceMatchOrderByWithRelationInput | TaskEvidenceMatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskEvidenceMatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskEvidenceMatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskEvidenceMatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TaskEvidenceMatches
    **/
    _count?: true | TaskEvidenceMatchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskEvidenceMatchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskEvidenceMatchMaxAggregateInputType
  }

  export type GetTaskEvidenceMatchAggregateType<T extends TaskEvidenceMatchAggregateArgs> = {
        [P in keyof T & keyof AggregateTaskEvidenceMatch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTaskEvidenceMatch[P]>
      : GetScalarType<T[P], AggregateTaskEvidenceMatch[P]>
  }




  export type TaskEvidenceMatchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskEvidenceMatchWhereInput
    orderBy?: TaskEvidenceMatchOrderByWithAggregationInput | TaskEvidenceMatchOrderByWithAggregationInput[]
    by: TaskEvidenceMatchScalarFieldEnum[] | TaskEvidenceMatchScalarFieldEnum
    having?: TaskEvidenceMatchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskEvidenceMatchCountAggregateInputType | true
    _min?: TaskEvidenceMatchMinAggregateInputType
    _max?: TaskEvidenceMatchMaxAggregateInputType
  }

  export type TaskEvidenceMatchGroupByOutputType = {
    id: string
    taskId: string
    submissionId: string | null
    contestHistoryId: string | null
    matchedAt: Date
    notes: string | null
    _count: TaskEvidenceMatchCountAggregateOutputType | null
    _min: TaskEvidenceMatchMinAggregateOutputType | null
    _max: TaskEvidenceMatchMaxAggregateOutputType | null
  }

  type GetTaskEvidenceMatchGroupByPayload<T extends TaskEvidenceMatchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskEvidenceMatchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskEvidenceMatchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskEvidenceMatchGroupByOutputType[P]>
            : GetScalarType<T[P], TaskEvidenceMatchGroupByOutputType[P]>
        }
      >
    >


  export type TaskEvidenceMatchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    submissionId?: boolean
    contestHistoryId?: boolean
    matchedAt?: boolean
    notes?: boolean
    task?: boolean | PlanTaskDefaultArgs<ExtArgs>
    submission?: boolean | TaskEvidenceMatch$submissionArgs<ExtArgs>
    contestHistory?: boolean | TaskEvidenceMatch$contestHistoryArgs<ExtArgs>
  }, ExtArgs["result"]["taskEvidenceMatch"]>

  export type TaskEvidenceMatchSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    submissionId?: boolean
    contestHistoryId?: boolean
    matchedAt?: boolean
    notes?: boolean
    task?: boolean | PlanTaskDefaultArgs<ExtArgs>
    submission?: boolean | TaskEvidenceMatch$submissionArgs<ExtArgs>
    contestHistory?: boolean | TaskEvidenceMatch$contestHistoryArgs<ExtArgs>
  }, ExtArgs["result"]["taskEvidenceMatch"]>

  export type TaskEvidenceMatchSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    submissionId?: boolean
    contestHistoryId?: boolean
    matchedAt?: boolean
    notes?: boolean
    task?: boolean | PlanTaskDefaultArgs<ExtArgs>
    submission?: boolean | TaskEvidenceMatch$submissionArgs<ExtArgs>
    contestHistory?: boolean | TaskEvidenceMatch$contestHistoryArgs<ExtArgs>
  }, ExtArgs["result"]["taskEvidenceMatch"]>

  export type TaskEvidenceMatchSelectScalar = {
    id?: boolean
    taskId?: boolean
    submissionId?: boolean
    contestHistoryId?: boolean
    matchedAt?: boolean
    notes?: boolean
  }

  export type TaskEvidenceMatchOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "taskId" | "submissionId" | "contestHistoryId" | "matchedAt" | "notes", ExtArgs["result"]["taskEvidenceMatch"]>
  export type TaskEvidenceMatchInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | PlanTaskDefaultArgs<ExtArgs>
    submission?: boolean | TaskEvidenceMatch$submissionArgs<ExtArgs>
    contestHistory?: boolean | TaskEvidenceMatch$contestHistoryArgs<ExtArgs>
  }
  export type TaskEvidenceMatchIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | PlanTaskDefaultArgs<ExtArgs>
    submission?: boolean | TaskEvidenceMatch$submissionArgs<ExtArgs>
    contestHistory?: boolean | TaskEvidenceMatch$contestHistoryArgs<ExtArgs>
  }
  export type TaskEvidenceMatchIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | PlanTaskDefaultArgs<ExtArgs>
    submission?: boolean | TaskEvidenceMatch$submissionArgs<ExtArgs>
    contestHistory?: boolean | TaskEvidenceMatch$contestHistoryArgs<ExtArgs>
  }

  export type $TaskEvidenceMatchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TaskEvidenceMatch"
    objects: {
      task: Prisma.$PlanTaskPayload<ExtArgs>
      submission: Prisma.$NormalizedSubmissionPayload<ExtArgs> | null
      contestHistory: Prisma.$ContestHistoryPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      taskId: string
      submissionId: string | null
      contestHistoryId: string | null
      matchedAt: Date
      notes: string | null
    }, ExtArgs["result"]["taskEvidenceMatch"]>
    composites: {}
  }

  type TaskEvidenceMatchGetPayload<S extends boolean | null | undefined | TaskEvidenceMatchDefaultArgs> = $Result.GetResult<Prisma.$TaskEvidenceMatchPayload, S>

  type TaskEvidenceMatchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskEvidenceMatchFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskEvidenceMatchCountAggregateInputType | true
    }

  export interface TaskEvidenceMatchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TaskEvidenceMatch'], meta: { name: 'TaskEvidenceMatch' } }
    /**
     * Find zero or one TaskEvidenceMatch that matches the filter.
     * @param {TaskEvidenceMatchFindUniqueArgs} args - Arguments to find a TaskEvidenceMatch
     * @example
     * // Get one TaskEvidenceMatch
     * const taskEvidenceMatch = await prisma.taskEvidenceMatch.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskEvidenceMatchFindUniqueArgs>(args: SelectSubset<T, TaskEvidenceMatchFindUniqueArgs<ExtArgs>>): Prisma__TaskEvidenceMatchClient<$Result.GetResult<Prisma.$TaskEvidenceMatchPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TaskEvidenceMatch that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskEvidenceMatchFindUniqueOrThrowArgs} args - Arguments to find a TaskEvidenceMatch
     * @example
     * // Get one TaskEvidenceMatch
     * const taskEvidenceMatch = await prisma.taskEvidenceMatch.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskEvidenceMatchFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskEvidenceMatchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskEvidenceMatchClient<$Result.GetResult<Prisma.$TaskEvidenceMatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TaskEvidenceMatch that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskEvidenceMatchFindFirstArgs} args - Arguments to find a TaskEvidenceMatch
     * @example
     * // Get one TaskEvidenceMatch
     * const taskEvidenceMatch = await prisma.taskEvidenceMatch.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskEvidenceMatchFindFirstArgs>(args?: SelectSubset<T, TaskEvidenceMatchFindFirstArgs<ExtArgs>>): Prisma__TaskEvidenceMatchClient<$Result.GetResult<Prisma.$TaskEvidenceMatchPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TaskEvidenceMatch that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskEvidenceMatchFindFirstOrThrowArgs} args - Arguments to find a TaskEvidenceMatch
     * @example
     * // Get one TaskEvidenceMatch
     * const taskEvidenceMatch = await prisma.taskEvidenceMatch.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskEvidenceMatchFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskEvidenceMatchFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskEvidenceMatchClient<$Result.GetResult<Prisma.$TaskEvidenceMatchPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TaskEvidenceMatches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskEvidenceMatchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TaskEvidenceMatches
     * const taskEvidenceMatches = await prisma.taskEvidenceMatch.findMany()
     * 
     * // Get first 10 TaskEvidenceMatches
     * const taskEvidenceMatches = await prisma.taskEvidenceMatch.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskEvidenceMatchWithIdOnly = await prisma.taskEvidenceMatch.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskEvidenceMatchFindManyArgs>(args?: SelectSubset<T, TaskEvidenceMatchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskEvidenceMatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TaskEvidenceMatch.
     * @param {TaskEvidenceMatchCreateArgs} args - Arguments to create a TaskEvidenceMatch.
     * @example
     * // Create one TaskEvidenceMatch
     * const TaskEvidenceMatch = await prisma.taskEvidenceMatch.create({
     *   data: {
     *     // ... data to create a TaskEvidenceMatch
     *   }
     * })
     * 
     */
    create<T extends TaskEvidenceMatchCreateArgs>(args: SelectSubset<T, TaskEvidenceMatchCreateArgs<ExtArgs>>): Prisma__TaskEvidenceMatchClient<$Result.GetResult<Prisma.$TaskEvidenceMatchPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TaskEvidenceMatches.
     * @param {TaskEvidenceMatchCreateManyArgs} args - Arguments to create many TaskEvidenceMatches.
     * @example
     * // Create many TaskEvidenceMatches
     * const taskEvidenceMatch = await prisma.taskEvidenceMatch.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskEvidenceMatchCreateManyArgs>(args?: SelectSubset<T, TaskEvidenceMatchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TaskEvidenceMatches and returns the data saved in the database.
     * @param {TaskEvidenceMatchCreateManyAndReturnArgs} args - Arguments to create many TaskEvidenceMatches.
     * @example
     * // Create many TaskEvidenceMatches
     * const taskEvidenceMatch = await prisma.taskEvidenceMatch.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TaskEvidenceMatches and only return the `id`
     * const taskEvidenceMatchWithIdOnly = await prisma.taskEvidenceMatch.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskEvidenceMatchCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskEvidenceMatchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskEvidenceMatchPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TaskEvidenceMatch.
     * @param {TaskEvidenceMatchDeleteArgs} args - Arguments to delete one TaskEvidenceMatch.
     * @example
     * // Delete one TaskEvidenceMatch
     * const TaskEvidenceMatch = await prisma.taskEvidenceMatch.delete({
     *   where: {
     *     // ... filter to delete one TaskEvidenceMatch
     *   }
     * })
     * 
     */
    delete<T extends TaskEvidenceMatchDeleteArgs>(args: SelectSubset<T, TaskEvidenceMatchDeleteArgs<ExtArgs>>): Prisma__TaskEvidenceMatchClient<$Result.GetResult<Prisma.$TaskEvidenceMatchPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TaskEvidenceMatch.
     * @param {TaskEvidenceMatchUpdateArgs} args - Arguments to update one TaskEvidenceMatch.
     * @example
     * // Update one TaskEvidenceMatch
     * const taskEvidenceMatch = await prisma.taskEvidenceMatch.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskEvidenceMatchUpdateArgs>(args: SelectSubset<T, TaskEvidenceMatchUpdateArgs<ExtArgs>>): Prisma__TaskEvidenceMatchClient<$Result.GetResult<Prisma.$TaskEvidenceMatchPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TaskEvidenceMatches.
     * @param {TaskEvidenceMatchDeleteManyArgs} args - Arguments to filter TaskEvidenceMatches to delete.
     * @example
     * // Delete a few TaskEvidenceMatches
     * const { count } = await prisma.taskEvidenceMatch.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskEvidenceMatchDeleteManyArgs>(args?: SelectSubset<T, TaskEvidenceMatchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskEvidenceMatches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskEvidenceMatchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TaskEvidenceMatches
     * const taskEvidenceMatch = await prisma.taskEvidenceMatch.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskEvidenceMatchUpdateManyArgs>(args: SelectSubset<T, TaskEvidenceMatchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskEvidenceMatches and returns the data updated in the database.
     * @param {TaskEvidenceMatchUpdateManyAndReturnArgs} args - Arguments to update many TaskEvidenceMatches.
     * @example
     * // Update many TaskEvidenceMatches
     * const taskEvidenceMatch = await prisma.taskEvidenceMatch.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TaskEvidenceMatches and only return the `id`
     * const taskEvidenceMatchWithIdOnly = await prisma.taskEvidenceMatch.updateManyAndReturn({
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
    updateManyAndReturn<T extends TaskEvidenceMatchUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskEvidenceMatchUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskEvidenceMatchPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TaskEvidenceMatch.
     * @param {TaskEvidenceMatchUpsertArgs} args - Arguments to update or create a TaskEvidenceMatch.
     * @example
     * // Update or create a TaskEvidenceMatch
     * const taskEvidenceMatch = await prisma.taskEvidenceMatch.upsert({
     *   create: {
     *     // ... data to create a TaskEvidenceMatch
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TaskEvidenceMatch we want to update
     *   }
     * })
     */
    upsert<T extends TaskEvidenceMatchUpsertArgs>(args: SelectSubset<T, TaskEvidenceMatchUpsertArgs<ExtArgs>>): Prisma__TaskEvidenceMatchClient<$Result.GetResult<Prisma.$TaskEvidenceMatchPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TaskEvidenceMatches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskEvidenceMatchCountArgs} args - Arguments to filter TaskEvidenceMatches to count.
     * @example
     * // Count the number of TaskEvidenceMatches
     * const count = await prisma.taskEvidenceMatch.count({
     *   where: {
     *     // ... the filter for the TaskEvidenceMatches we want to count
     *   }
     * })
    **/
    count<T extends TaskEvidenceMatchCountArgs>(
      args?: Subset<T, TaskEvidenceMatchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskEvidenceMatchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TaskEvidenceMatch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskEvidenceMatchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TaskEvidenceMatchAggregateArgs>(args: Subset<T, TaskEvidenceMatchAggregateArgs>): Prisma.PrismaPromise<GetTaskEvidenceMatchAggregateType<T>>

    /**
     * Group by TaskEvidenceMatch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskEvidenceMatchGroupByArgs} args - Group by arguments.
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
      T extends TaskEvidenceMatchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskEvidenceMatchGroupByArgs['orderBy'] }
        : { orderBy?: TaskEvidenceMatchGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TaskEvidenceMatchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskEvidenceMatchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TaskEvidenceMatch model
   */
  readonly fields: TaskEvidenceMatchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TaskEvidenceMatch.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskEvidenceMatchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends PlanTaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlanTaskDefaultArgs<ExtArgs>>): Prisma__PlanTaskClient<$Result.GetResult<Prisma.$PlanTaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    submission<T extends TaskEvidenceMatch$submissionArgs<ExtArgs> = {}>(args?: Subset<T, TaskEvidenceMatch$submissionArgs<ExtArgs>>): Prisma__NormalizedSubmissionClient<$Result.GetResult<Prisma.$NormalizedSubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    contestHistory<T extends TaskEvidenceMatch$contestHistoryArgs<ExtArgs> = {}>(args?: Subset<T, TaskEvidenceMatch$contestHistoryArgs<ExtArgs>>): Prisma__ContestHistoryClient<$Result.GetResult<Prisma.$ContestHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the TaskEvidenceMatch model
   */
  interface TaskEvidenceMatchFieldRefs {
    readonly id: FieldRef<"TaskEvidenceMatch", 'String'>
    readonly taskId: FieldRef<"TaskEvidenceMatch", 'String'>
    readonly submissionId: FieldRef<"TaskEvidenceMatch", 'String'>
    readonly contestHistoryId: FieldRef<"TaskEvidenceMatch", 'String'>
    readonly matchedAt: FieldRef<"TaskEvidenceMatch", 'DateTime'>
    readonly notes: FieldRef<"TaskEvidenceMatch", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TaskEvidenceMatch findUnique
   */
  export type TaskEvidenceMatchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskEvidenceMatch
     */
    select?: TaskEvidenceMatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskEvidenceMatch
     */
    omit?: TaskEvidenceMatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskEvidenceMatchInclude<ExtArgs> | null
    /**
     * Filter, which TaskEvidenceMatch to fetch.
     */
    where: TaskEvidenceMatchWhereUniqueInput
  }

  /**
   * TaskEvidenceMatch findUniqueOrThrow
   */
  export type TaskEvidenceMatchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskEvidenceMatch
     */
    select?: TaskEvidenceMatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskEvidenceMatch
     */
    omit?: TaskEvidenceMatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskEvidenceMatchInclude<ExtArgs> | null
    /**
     * Filter, which TaskEvidenceMatch to fetch.
     */
    where: TaskEvidenceMatchWhereUniqueInput
  }

  /**
   * TaskEvidenceMatch findFirst
   */
  export type TaskEvidenceMatchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskEvidenceMatch
     */
    select?: TaskEvidenceMatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskEvidenceMatch
     */
    omit?: TaskEvidenceMatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskEvidenceMatchInclude<ExtArgs> | null
    /**
     * Filter, which TaskEvidenceMatch to fetch.
     */
    where?: TaskEvidenceMatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskEvidenceMatches to fetch.
     */
    orderBy?: TaskEvidenceMatchOrderByWithRelationInput | TaskEvidenceMatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskEvidenceMatches.
     */
    cursor?: TaskEvidenceMatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskEvidenceMatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskEvidenceMatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskEvidenceMatches.
     */
    distinct?: TaskEvidenceMatchScalarFieldEnum | TaskEvidenceMatchScalarFieldEnum[]
  }

  /**
   * TaskEvidenceMatch findFirstOrThrow
   */
  export type TaskEvidenceMatchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskEvidenceMatch
     */
    select?: TaskEvidenceMatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskEvidenceMatch
     */
    omit?: TaskEvidenceMatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskEvidenceMatchInclude<ExtArgs> | null
    /**
     * Filter, which TaskEvidenceMatch to fetch.
     */
    where?: TaskEvidenceMatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskEvidenceMatches to fetch.
     */
    orderBy?: TaskEvidenceMatchOrderByWithRelationInput | TaskEvidenceMatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskEvidenceMatches.
     */
    cursor?: TaskEvidenceMatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskEvidenceMatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskEvidenceMatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskEvidenceMatches.
     */
    distinct?: TaskEvidenceMatchScalarFieldEnum | TaskEvidenceMatchScalarFieldEnum[]
  }

  /**
   * TaskEvidenceMatch findMany
   */
  export type TaskEvidenceMatchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskEvidenceMatch
     */
    select?: TaskEvidenceMatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskEvidenceMatch
     */
    omit?: TaskEvidenceMatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskEvidenceMatchInclude<ExtArgs> | null
    /**
     * Filter, which TaskEvidenceMatches to fetch.
     */
    where?: TaskEvidenceMatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskEvidenceMatches to fetch.
     */
    orderBy?: TaskEvidenceMatchOrderByWithRelationInput | TaskEvidenceMatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TaskEvidenceMatches.
     */
    cursor?: TaskEvidenceMatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskEvidenceMatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskEvidenceMatches.
     */
    skip?: number
    distinct?: TaskEvidenceMatchScalarFieldEnum | TaskEvidenceMatchScalarFieldEnum[]
  }

  /**
   * TaskEvidenceMatch create
   */
  export type TaskEvidenceMatchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskEvidenceMatch
     */
    select?: TaskEvidenceMatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskEvidenceMatch
     */
    omit?: TaskEvidenceMatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskEvidenceMatchInclude<ExtArgs> | null
    /**
     * The data needed to create a TaskEvidenceMatch.
     */
    data: XOR<TaskEvidenceMatchCreateInput, TaskEvidenceMatchUncheckedCreateInput>
  }

  /**
   * TaskEvidenceMatch createMany
   */
  export type TaskEvidenceMatchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TaskEvidenceMatches.
     */
    data: TaskEvidenceMatchCreateManyInput | TaskEvidenceMatchCreateManyInput[]
  }

  /**
   * TaskEvidenceMatch createManyAndReturn
   */
  export type TaskEvidenceMatchCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskEvidenceMatch
     */
    select?: TaskEvidenceMatchSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TaskEvidenceMatch
     */
    omit?: TaskEvidenceMatchOmit<ExtArgs> | null
    /**
     * The data used to create many TaskEvidenceMatches.
     */
    data: TaskEvidenceMatchCreateManyInput | TaskEvidenceMatchCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskEvidenceMatchIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TaskEvidenceMatch update
   */
  export type TaskEvidenceMatchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskEvidenceMatch
     */
    select?: TaskEvidenceMatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskEvidenceMatch
     */
    omit?: TaskEvidenceMatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskEvidenceMatchInclude<ExtArgs> | null
    /**
     * The data needed to update a TaskEvidenceMatch.
     */
    data: XOR<TaskEvidenceMatchUpdateInput, TaskEvidenceMatchUncheckedUpdateInput>
    /**
     * Choose, which TaskEvidenceMatch to update.
     */
    where: TaskEvidenceMatchWhereUniqueInput
  }

  /**
   * TaskEvidenceMatch updateMany
   */
  export type TaskEvidenceMatchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TaskEvidenceMatches.
     */
    data: XOR<TaskEvidenceMatchUpdateManyMutationInput, TaskEvidenceMatchUncheckedUpdateManyInput>
    /**
     * Filter which TaskEvidenceMatches to update
     */
    where?: TaskEvidenceMatchWhereInput
    /**
     * Limit how many TaskEvidenceMatches to update.
     */
    limit?: number
  }

  /**
   * TaskEvidenceMatch updateManyAndReturn
   */
  export type TaskEvidenceMatchUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskEvidenceMatch
     */
    select?: TaskEvidenceMatchSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TaskEvidenceMatch
     */
    omit?: TaskEvidenceMatchOmit<ExtArgs> | null
    /**
     * The data used to update TaskEvidenceMatches.
     */
    data: XOR<TaskEvidenceMatchUpdateManyMutationInput, TaskEvidenceMatchUncheckedUpdateManyInput>
    /**
     * Filter which TaskEvidenceMatches to update
     */
    where?: TaskEvidenceMatchWhereInput
    /**
     * Limit how many TaskEvidenceMatches to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskEvidenceMatchIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TaskEvidenceMatch upsert
   */
  export type TaskEvidenceMatchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskEvidenceMatch
     */
    select?: TaskEvidenceMatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskEvidenceMatch
     */
    omit?: TaskEvidenceMatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskEvidenceMatchInclude<ExtArgs> | null
    /**
     * The filter to search for the TaskEvidenceMatch to update in case it exists.
     */
    where: TaskEvidenceMatchWhereUniqueInput
    /**
     * In case the TaskEvidenceMatch found by the `where` argument doesn't exist, create a new TaskEvidenceMatch with this data.
     */
    create: XOR<TaskEvidenceMatchCreateInput, TaskEvidenceMatchUncheckedCreateInput>
    /**
     * In case the TaskEvidenceMatch was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskEvidenceMatchUpdateInput, TaskEvidenceMatchUncheckedUpdateInput>
  }

  /**
   * TaskEvidenceMatch delete
   */
  export type TaskEvidenceMatchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskEvidenceMatch
     */
    select?: TaskEvidenceMatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskEvidenceMatch
     */
    omit?: TaskEvidenceMatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskEvidenceMatchInclude<ExtArgs> | null
    /**
     * Filter which TaskEvidenceMatch to delete.
     */
    where: TaskEvidenceMatchWhereUniqueInput
  }

  /**
   * TaskEvidenceMatch deleteMany
   */
  export type TaskEvidenceMatchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskEvidenceMatches to delete
     */
    where?: TaskEvidenceMatchWhereInput
    /**
     * Limit how many TaskEvidenceMatches to delete.
     */
    limit?: number
  }

  /**
   * TaskEvidenceMatch.submission
   */
  export type TaskEvidenceMatch$submissionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
  }

  /**
   * TaskEvidenceMatch.contestHistory
   */
  export type TaskEvidenceMatch$contestHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
  }

  /**
   * TaskEvidenceMatch without action
   */
  export type TaskEvidenceMatchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskEvidenceMatch
     */
    select?: TaskEvidenceMatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskEvidenceMatch
     */
    omit?: TaskEvidenceMatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskEvidenceMatchInclude<ExtArgs> | null
  }


  /**
   * Model PlanEvaluation
   */

  export type AggregatePlanEvaluation = {
    _count: PlanEvaluationCountAggregateOutputType | null
    _avg: PlanEvaluationAvgAggregateOutputType | null
    _sum: PlanEvaluationSumAggregateOutputType | null
    _min: PlanEvaluationMinAggregateOutputType | null
    _max: PlanEvaluationMaxAggregateOutputType | null
  }

  export type PlanEvaluationAvgAggregateOutputType = {
    evaluatedVersionNum: number | null
    completionRate: number | null
    tasksPlanned: number | null
    tasksCompleted: number | null
    ratingChange: number | null
  }

  export type PlanEvaluationSumAggregateOutputType = {
    evaluatedVersionNum: number | null
    completionRate: number | null
    tasksPlanned: number | null
    tasksCompleted: number | null
    ratingChange: number | null
  }

  export type PlanEvaluationMinAggregateOutputType = {
    id: string | null
    planId: string | null
    evaluatedVersionNum: number | null
    completionRate: number | null
    tasksPlanned: number | null
    tasksCompleted: number | null
    ratingChange: number | null
    outcomeData: string | null
    evaluatedAt: Date | null
  }

  export type PlanEvaluationMaxAggregateOutputType = {
    id: string | null
    planId: string | null
    evaluatedVersionNum: number | null
    completionRate: number | null
    tasksPlanned: number | null
    tasksCompleted: number | null
    ratingChange: number | null
    outcomeData: string | null
    evaluatedAt: Date | null
  }

  export type PlanEvaluationCountAggregateOutputType = {
    id: number
    planId: number
    evaluatedVersionNum: number
    completionRate: number
    tasksPlanned: number
    tasksCompleted: number
    ratingChange: number
    outcomeData: number
    evaluatedAt: number
    _all: number
  }


  export type PlanEvaluationAvgAggregateInputType = {
    evaluatedVersionNum?: true
    completionRate?: true
    tasksPlanned?: true
    tasksCompleted?: true
    ratingChange?: true
  }

  export type PlanEvaluationSumAggregateInputType = {
    evaluatedVersionNum?: true
    completionRate?: true
    tasksPlanned?: true
    tasksCompleted?: true
    ratingChange?: true
  }

  export type PlanEvaluationMinAggregateInputType = {
    id?: true
    planId?: true
    evaluatedVersionNum?: true
    completionRate?: true
    tasksPlanned?: true
    tasksCompleted?: true
    ratingChange?: true
    outcomeData?: true
    evaluatedAt?: true
  }

  export type PlanEvaluationMaxAggregateInputType = {
    id?: true
    planId?: true
    evaluatedVersionNum?: true
    completionRate?: true
    tasksPlanned?: true
    tasksCompleted?: true
    ratingChange?: true
    outcomeData?: true
    evaluatedAt?: true
  }

  export type PlanEvaluationCountAggregateInputType = {
    id?: true
    planId?: true
    evaluatedVersionNum?: true
    completionRate?: true
    tasksPlanned?: true
    tasksCompleted?: true
    ratingChange?: true
    outcomeData?: true
    evaluatedAt?: true
    _all?: true
  }

  export type PlanEvaluationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlanEvaluation to aggregate.
     */
    where?: PlanEvaluationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanEvaluations to fetch.
     */
    orderBy?: PlanEvaluationOrderByWithRelationInput | PlanEvaluationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlanEvaluationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanEvaluations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanEvaluations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PlanEvaluations
    **/
    _count?: true | PlanEvaluationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlanEvaluationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlanEvaluationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlanEvaluationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlanEvaluationMaxAggregateInputType
  }

  export type GetPlanEvaluationAggregateType<T extends PlanEvaluationAggregateArgs> = {
        [P in keyof T & keyof AggregatePlanEvaluation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlanEvaluation[P]>
      : GetScalarType<T[P], AggregatePlanEvaluation[P]>
  }




  export type PlanEvaluationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlanEvaluationWhereInput
    orderBy?: PlanEvaluationOrderByWithAggregationInput | PlanEvaluationOrderByWithAggregationInput[]
    by: PlanEvaluationScalarFieldEnum[] | PlanEvaluationScalarFieldEnum
    having?: PlanEvaluationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlanEvaluationCountAggregateInputType | true
    _avg?: PlanEvaluationAvgAggregateInputType
    _sum?: PlanEvaluationSumAggregateInputType
    _min?: PlanEvaluationMinAggregateInputType
    _max?: PlanEvaluationMaxAggregateInputType
  }

  export type PlanEvaluationGroupByOutputType = {
    id: string
    planId: string
    evaluatedVersionNum: number
    completionRate: number
    tasksPlanned: number
    tasksCompleted: number
    ratingChange: number | null
    outcomeData: string
    evaluatedAt: Date
    _count: PlanEvaluationCountAggregateOutputType | null
    _avg: PlanEvaluationAvgAggregateOutputType | null
    _sum: PlanEvaluationSumAggregateOutputType | null
    _min: PlanEvaluationMinAggregateOutputType | null
    _max: PlanEvaluationMaxAggregateOutputType | null
  }

  type GetPlanEvaluationGroupByPayload<T extends PlanEvaluationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlanEvaluationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlanEvaluationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlanEvaluationGroupByOutputType[P]>
            : GetScalarType<T[P], PlanEvaluationGroupByOutputType[P]>
        }
      >
    >


  export type PlanEvaluationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    planId?: boolean
    evaluatedVersionNum?: boolean
    completionRate?: boolean
    tasksPlanned?: boolean
    tasksCompleted?: boolean
    ratingChange?: boolean
    outcomeData?: boolean
    evaluatedAt?: boolean
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["planEvaluation"]>

  export type PlanEvaluationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    planId?: boolean
    evaluatedVersionNum?: boolean
    completionRate?: boolean
    tasksPlanned?: boolean
    tasksCompleted?: boolean
    ratingChange?: boolean
    outcomeData?: boolean
    evaluatedAt?: boolean
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["planEvaluation"]>

  export type PlanEvaluationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    planId?: boolean
    evaluatedVersionNum?: boolean
    completionRate?: boolean
    tasksPlanned?: boolean
    tasksCompleted?: boolean
    ratingChange?: boolean
    outcomeData?: boolean
    evaluatedAt?: boolean
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["planEvaluation"]>

  export type PlanEvaluationSelectScalar = {
    id?: boolean
    planId?: boolean
    evaluatedVersionNum?: boolean
    completionRate?: boolean
    tasksPlanned?: boolean
    tasksCompleted?: boolean
    ratingChange?: boolean
    outcomeData?: boolean
    evaluatedAt?: boolean
  }

  export type PlanEvaluationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "planId" | "evaluatedVersionNum" | "completionRate" | "tasksPlanned" | "tasksCompleted" | "ratingChange" | "outcomeData" | "evaluatedAt", ExtArgs["result"]["planEvaluation"]>
  export type PlanEvaluationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }
  export type PlanEvaluationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }
  export type PlanEvaluationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }

  export type $PlanEvaluationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PlanEvaluation"
    objects: {
      plan: Prisma.$PlanPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      planId: string
      evaluatedVersionNum: number
      completionRate: number
      tasksPlanned: number
      tasksCompleted: number
      ratingChange: number | null
      outcomeData: string
      evaluatedAt: Date
    }, ExtArgs["result"]["planEvaluation"]>
    composites: {}
  }

  type PlanEvaluationGetPayload<S extends boolean | null | undefined | PlanEvaluationDefaultArgs> = $Result.GetResult<Prisma.$PlanEvaluationPayload, S>

  type PlanEvaluationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlanEvaluationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlanEvaluationCountAggregateInputType | true
    }

  export interface PlanEvaluationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PlanEvaluation'], meta: { name: 'PlanEvaluation' } }
    /**
     * Find zero or one PlanEvaluation that matches the filter.
     * @param {PlanEvaluationFindUniqueArgs} args - Arguments to find a PlanEvaluation
     * @example
     * // Get one PlanEvaluation
     * const planEvaluation = await prisma.planEvaluation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlanEvaluationFindUniqueArgs>(args: SelectSubset<T, PlanEvaluationFindUniqueArgs<ExtArgs>>): Prisma__PlanEvaluationClient<$Result.GetResult<Prisma.$PlanEvaluationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PlanEvaluation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlanEvaluationFindUniqueOrThrowArgs} args - Arguments to find a PlanEvaluation
     * @example
     * // Get one PlanEvaluation
     * const planEvaluation = await prisma.planEvaluation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlanEvaluationFindUniqueOrThrowArgs>(args: SelectSubset<T, PlanEvaluationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlanEvaluationClient<$Result.GetResult<Prisma.$PlanEvaluationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlanEvaluation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanEvaluationFindFirstArgs} args - Arguments to find a PlanEvaluation
     * @example
     * // Get one PlanEvaluation
     * const planEvaluation = await prisma.planEvaluation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlanEvaluationFindFirstArgs>(args?: SelectSubset<T, PlanEvaluationFindFirstArgs<ExtArgs>>): Prisma__PlanEvaluationClient<$Result.GetResult<Prisma.$PlanEvaluationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlanEvaluation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanEvaluationFindFirstOrThrowArgs} args - Arguments to find a PlanEvaluation
     * @example
     * // Get one PlanEvaluation
     * const planEvaluation = await prisma.planEvaluation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlanEvaluationFindFirstOrThrowArgs>(args?: SelectSubset<T, PlanEvaluationFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlanEvaluationClient<$Result.GetResult<Prisma.$PlanEvaluationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PlanEvaluations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanEvaluationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PlanEvaluations
     * const planEvaluations = await prisma.planEvaluation.findMany()
     * 
     * // Get first 10 PlanEvaluations
     * const planEvaluations = await prisma.planEvaluation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const planEvaluationWithIdOnly = await prisma.planEvaluation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlanEvaluationFindManyArgs>(args?: SelectSubset<T, PlanEvaluationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanEvaluationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PlanEvaluation.
     * @param {PlanEvaluationCreateArgs} args - Arguments to create a PlanEvaluation.
     * @example
     * // Create one PlanEvaluation
     * const PlanEvaluation = await prisma.planEvaluation.create({
     *   data: {
     *     // ... data to create a PlanEvaluation
     *   }
     * })
     * 
     */
    create<T extends PlanEvaluationCreateArgs>(args: SelectSubset<T, PlanEvaluationCreateArgs<ExtArgs>>): Prisma__PlanEvaluationClient<$Result.GetResult<Prisma.$PlanEvaluationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PlanEvaluations.
     * @param {PlanEvaluationCreateManyArgs} args - Arguments to create many PlanEvaluations.
     * @example
     * // Create many PlanEvaluations
     * const planEvaluation = await prisma.planEvaluation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlanEvaluationCreateManyArgs>(args?: SelectSubset<T, PlanEvaluationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PlanEvaluations and returns the data saved in the database.
     * @param {PlanEvaluationCreateManyAndReturnArgs} args - Arguments to create many PlanEvaluations.
     * @example
     * // Create many PlanEvaluations
     * const planEvaluation = await prisma.planEvaluation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PlanEvaluations and only return the `id`
     * const planEvaluationWithIdOnly = await prisma.planEvaluation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlanEvaluationCreateManyAndReturnArgs>(args?: SelectSubset<T, PlanEvaluationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanEvaluationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PlanEvaluation.
     * @param {PlanEvaluationDeleteArgs} args - Arguments to delete one PlanEvaluation.
     * @example
     * // Delete one PlanEvaluation
     * const PlanEvaluation = await prisma.planEvaluation.delete({
     *   where: {
     *     // ... filter to delete one PlanEvaluation
     *   }
     * })
     * 
     */
    delete<T extends PlanEvaluationDeleteArgs>(args: SelectSubset<T, PlanEvaluationDeleteArgs<ExtArgs>>): Prisma__PlanEvaluationClient<$Result.GetResult<Prisma.$PlanEvaluationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PlanEvaluation.
     * @param {PlanEvaluationUpdateArgs} args - Arguments to update one PlanEvaluation.
     * @example
     * // Update one PlanEvaluation
     * const planEvaluation = await prisma.planEvaluation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlanEvaluationUpdateArgs>(args: SelectSubset<T, PlanEvaluationUpdateArgs<ExtArgs>>): Prisma__PlanEvaluationClient<$Result.GetResult<Prisma.$PlanEvaluationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PlanEvaluations.
     * @param {PlanEvaluationDeleteManyArgs} args - Arguments to filter PlanEvaluations to delete.
     * @example
     * // Delete a few PlanEvaluations
     * const { count } = await prisma.planEvaluation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlanEvaluationDeleteManyArgs>(args?: SelectSubset<T, PlanEvaluationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlanEvaluations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanEvaluationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PlanEvaluations
     * const planEvaluation = await prisma.planEvaluation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlanEvaluationUpdateManyArgs>(args: SelectSubset<T, PlanEvaluationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlanEvaluations and returns the data updated in the database.
     * @param {PlanEvaluationUpdateManyAndReturnArgs} args - Arguments to update many PlanEvaluations.
     * @example
     * // Update many PlanEvaluations
     * const planEvaluation = await prisma.planEvaluation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PlanEvaluations and only return the `id`
     * const planEvaluationWithIdOnly = await prisma.planEvaluation.updateManyAndReturn({
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
    updateManyAndReturn<T extends PlanEvaluationUpdateManyAndReturnArgs>(args: SelectSubset<T, PlanEvaluationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanEvaluationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PlanEvaluation.
     * @param {PlanEvaluationUpsertArgs} args - Arguments to update or create a PlanEvaluation.
     * @example
     * // Update or create a PlanEvaluation
     * const planEvaluation = await prisma.planEvaluation.upsert({
     *   create: {
     *     // ... data to create a PlanEvaluation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PlanEvaluation we want to update
     *   }
     * })
     */
    upsert<T extends PlanEvaluationUpsertArgs>(args: SelectSubset<T, PlanEvaluationUpsertArgs<ExtArgs>>): Prisma__PlanEvaluationClient<$Result.GetResult<Prisma.$PlanEvaluationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PlanEvaluations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanEvaluationCountArgs} args - Arguments to filter PlanEvaluations to count.
     * @example
     * // Count the number of PlanEvaluations
     * const count = await prisma.planEvaluation.count({
     *   where: {
     *     // ... the filter for the PlanEvaluations we want to count
     *   }
     * })
    **/
    count<T extends PlanEvaluationCountArgs>(
      args?: Subset<T, PlanEvaluationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlanEvaluationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PlanEvaluation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanEvaluationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PlanEvaluationAggregateArgs>(args: Subset<T, PlanEvaluationAggregateArgs>): Prisma.PrismaPromise<GetPlanEvaluationAggregateType<T>>

    /**
     * Group by PlanEvaluation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanEvaluationGroupByArgs} args - Group by arguments.
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
      T extends PlanEvaluationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlanEvaluationGroupByArgs['orderBy'] }
        : { orderBy?: PlanEvaluationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PlanEvaluationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlanEvaluationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PlanEvaluation model
   */
  readonly fields: PlanEvaluationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PlanEvaluation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlanEvaluationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    plan<T extends PlanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlanDefaultArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PlanEvaluation model
   */
  interface PlanEvaluationFieldRefs {
    readonly id: FieldRef<"PlanEvaluation", 'String'>
    readonly planId: FieldRef<"PlanEvaluation", 'String'>
    readonly evaluatedVersionNum: FieldRef<"PlanEvaluation", 'Int'>
    readonly completionRate: FieldRef<"PlanEvaluation", 'Float'>
    readonly tasksPlanned: FieldRef<"PlanEvaluation", 'Int'>
    readonly tasksCompleted: FieldRef<"PlanEvaluation", 'Int'>
    readonly ratingChange: FieldRef<"PlanEvaluation", 'Int'>
    readonly outcomeData: FieldRef<"PlanEvaluation", 'String'>
    readonly evaluatedAt: FieldRef<"PlanEvaluation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PlanEvaluation findUnique
   */
  export type PlanEvaluationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanEvaluation
     */
    select?: PlanEvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanEvaluation
     */
    omit?: PlanEvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanEvaluationInclude<ExtArgs> | null
    /**
     * Filter, which PlanEvaluation to fetch.
     */
    where: PlanEvaluationWhereUniqueInput
  }

  /**
   * PlanEvaluation findUniqueOrThrow
   */
  export type PlanEvaluationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanEvaluation
     */
    select?: PlanEvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanEvaluation
     */
    omit?: PlanEvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanEvaluationInclude<ExtArgs> | null
    /**
     * Filter, which PlanEvaluation to fetch.
     */
    where: PlanEvaluationWhereUniqueInput
  }

  /**
   * PlanEvaluation findFirst
   */
  export type PlanEvaluationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanEvaluation
     */
    select?: PlanEvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanEvaluation
     */
    omit?: PlanEvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanEvaluationInclude<ExtArgs> | null
    /**
     * Filter, which PlanEvaluation to fetch.
     */
    where?: PlanEvaluationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanEvaluations to fetch.
     */
    orderBy?: PlanEvaluationOrderByWithRelationInput | PlanEvaluationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlanEvaluations.
     */
    cursor?: PlanEvaluationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanEvaluations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanEvaluations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlanEvaluations.
     */
    distinct?: PlanEvaluationScalarFieldEnum | PlanEvaluationScalarFieldEnum[]
  }

  /**
   * PlanEvaluation findFirstOrThrow
   */
  export type PlanEvaluationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanEvaluation
     */
    select?: PlanEvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanEvaluation
     */
    omit?: PlanEvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanEvaluationInclude<ExtArgs> | null
    /**
     * Filter, which PlanEvaluation to fetch.
     */
    where?: PlanEvaluationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanEvaluations to fetch.
     */
    orderBy?: PlanEvaluationOrderByWithRelationInput | PlanEvaluationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlanEvaluations.
     */
    cursor?: PlanEvaluationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanEvaluations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanEvaluations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlanEvaluations.
     */
    distinct?: PlanEvaluationScalarFieldEnum | PlanEvaluationScalarFieldEnum[]
  }

  /**
   * PlanEvaluation findMany
   */
  export type PlanEvaluationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanEvaluation
     */
    select?: PlanEvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanEvaluation
     */
    omit?: PlanEvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanEvaluationInclude<ExtArgs> | null
    /**
     * Filter, which PlanEvaluations to fetch.
     */
    where?: PlanEvaluationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanEvaluations to fetch.
     */
    orderBy?: PlanEvaluationOrderByWithRelationInput | PlanEvaluationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PlanEvaluations.
     */
    cursor?: PlanEvaluationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanEvaluations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanEvaluations.
     */
    skip?: number
    distinct?: PlanEvaluationScalarFieldEnum | PlanEvaluationScalarFieldEnum[]
  }

  /**
   * PlanEvaluation create
   */
  export type PlanEvaluationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanEvaluation
     */
    select?: PlanEvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanEvaluation
     */
    omit?: PlanEvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanEvaluationInclude<ExtArgs> | null
    /**
     * The data needed to create a PlanEvaluation.
     */
    data: XOR<PlanEvaluationCreateInput, PlanEvaluationUncheckedCreateInput>
  }

  /**
   * PlanEvaluation createMany
   */
  export type PlanEvaluationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PlanEvaluations.
     */
    data: PlanEvaluationCreateManyInput | PlanEvaluationCreateManyInput[]
  }

  /**
   * PlanEvaluation createManyAndReturn
   */
  export type PlanEvaluationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanEvaluation
     */
    select?: PlanEvaluationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlanEvaluation
     */
    omit?: PlanEvaluationOmit<ExtArgs> | null
    /**
     * The data used to create many PlanEvaluations.
     */
    data: PlanEvaluationCreateManyInput | PlanEvaluationCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanEvaluationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlanEvaluation update
   */
  export type PlanEvaluationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanEvaluation
     */
    select?: PlanEvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanEvaluation
     */
    omit?: PlanEvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanEvaluationInclude<ExtArgs> | null
    /**
     * The data needed to update a PlanEvaluation.
     */
    data: XOR<PlanEvaluationUpdateInput, PlanEvaluationUncheckedUpdateInput>
    /**
     * Choose, which PlanEvaluation to update.
     */
    where: PlanEvaluationWhereUniqueInput
  }

  /**
   * PlanEvaluation updateMany
   */
  export type PlanEvaluationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PlanEvaluations.
     */
    data: XOR<PlanEvaluationUpdateManyMutationInput, PlanEvaluationUncheckedUpdateManyInput>
    /**
     * Filter which PlanEvaluations to update
     */
    where?: PlanEvaluationWhereInput
    /**
     * Limit how many PlanEvaluations to update.
     */
    limit?: number
  }

  /**
   * PlanEvaluation updateManyAndReturn
   */
  export type PlanEvaluationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanEvaluation
     */
    select?: PlanEvaluationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlanEvaluation
     */
    omit?: PlanEvaluationOmit<ExtArgs> | null
    /**
     * The data used to update PlanEvaluations.
     */
    data: XOR<PlanEvaluationUpdateManyMutationInput, PlanEvaluationUncheckedUpdateManyInput>
    /**
     * Filter which PlanEvaluations to update
     */
    where?: PlanEvaluationWhereInput
    /**
     * Limit how many PlanEvaluations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanEvaluationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlanEvaluation upsert
   */
  export type PlanEvaluationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanEvaluation
     */
    select?: PlanEvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanEvaluation
     */
    omit?: PlanEvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanEvaluationInclude<ExtArgs> | null
    /**
     * The filter to search for the PlanEvaluation to update in case it exists.
     */
    where: PlanEvaluationWhereUniqueInput
    /**
     * In case the PlanEvaluation found by the `where` argument doesn't exist, create a new PlanEvaluation with this data.
     */
    create: XOR<PlanEvaluationCreateInput, PlanEvaluationUncheckedCreateInput>
    /**
     * In case the PlanEvaluation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlanEvaluationUpdateInput, PlanEvaluationUncheckedUpdateInput>
  }

  /**
   * PlanEvaluation delete
   */
  export type PlanEvaluationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanEvaluation
     */
    select?: PlanEvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanEvaluation
     */
    omit?: PlanEvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanEvaluationInclude<ExtArgs> | null
    /**
     * Filter which PlanEvaluation to delete.
     */
    where: PlanEvaluationWhereUniqueInput
  }

  /**
   * PlanEvaluation deleteMany
   */
  export type PlanEvaluationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlanEvaluations to delete
     */
    where?: PlanEvaluationWhereInput
    /**
     * Limit how many PlanEvaluations to delete.
     */
    limit?: number
  }

  /**
   * PlanEvaluation without action
   */
  export type PlanEvaluationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanEvaluation
     */
    select?: PlanEvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanEvaluation
     */
    omit?: PlanEvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanEvaluationInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
    createdAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
    createdAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    sessionToken: number
    userId: number
    expires: number
    createdAt: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
    createdAt?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
    createdAt?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
    createdAt?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    sessionToken: string
    userId: string
    expires: Date
    createdAt: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    createdAt?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionToken" | "userId" | "expires" | "createdAt", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionToken: string
      userId: string
      expires: Date
      createdAt: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
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
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
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
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly sessionToken: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly expires: FieldRef<"Session", 'DateTime'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
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
    passwordHash: 'passwordHash',
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


  export const PlanScalarFieldEnum: {
    id: 'id',
    goalId: 'goalId',
    userId: 'userId',
    status: 'status',
    currentVersionNum: 'currentVersionNum',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PlanScalarFieldEnum = (typeof PlanScalarFieldEnum)[keyof typeof PlanScalarFieldEnum]


  export const PlanVersionScalarFieldEnum: {
    id: 'id',
    planId: 'planId',
    versionNumber: 'versionNumber',
    schemaVersion: 'schemaVersion',
    summary: 'summary',
    milestoneTitle: 'milestoneTitle',
    bottleneckType: 'bottleneckType',
    planData: 'planData',
    startDate: 'startDate',
    targetReviewDate: 'targetReviewDate',
    createdAt: 'createdAt'
  };

  export type PlanVersionScalarFieldEnum = (typeof PlanVersionScalarFieldEnum)[keyof typeof PlanVersionScalarFieldEnum]


  export const PlanTaskScalarFieldEnum: {
    id: 'id',
    planVersionId: 'planVersionId',
    externalTaskId: 'externalTaskId',
    type: 'type',
    title: 'title',
    quantity: 'quantity',
    quantityCompleted: 'quantityCompleted',
    platform: 'platform',
    minDifficulty: 'minDifficulty',
    maxDifficulty: 'maxDifficulty',
    difficultyTier: 'difficultyTier',
    topics: 'topics',
    reason: 'reason',
    evidenceReferences: 'evidenceReferences',
    completionMetric: 'completionMetric',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type PlanTaskScalarFieldEnum = (typeof PlanTaskScalarFieldEnum)[keyof typeof PlanTaskScalarFieldEnum]


  export const TaskEvidenceMatchScalarFieldEnum: {
    id: 'id',
    taskId: 'taskId',
    submissionId: 'submissionId',
    contestHistoryId: 'contestHistoryId',
    matchedAt: 'matchedAt',
    notes: 'notes'
  };

  export type TaskEvidenceMatchScalarFieldEnum = (typeof TaskEvidenceMatchScalarFieldEnum)[keyof typeof TaskEvidenceMatchScalarFieldEnum]


  export const PlanEvaluationScalarFieldEnum: {
    id: 'id',
    planId: 'planId',
    evaluatedVersionNum: 'evaluatedVersionNum',
    completionRate: 'completionRate',
    tasksPlanned: 'tasksPlanned',
    tasksCompleted: 'tasksCompleted',
    ratingChange: 'ratingChange',
    outcomeData: 'outcomeData',
    evaluatedAt: 'evaluatedAt'
  };

  export type PlanEvaluationScalarFieldEnum = (typeof PlanEvaluationScalarFieldEnum)[keyof typeof PlanEvaluationScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    sessionToken: 'sessionToken',
    userId: 'userId',
    expires: 'expires',
    createdAt: 'createdAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


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
    passwordHash?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    sessions?: SessionListRelationFilter
    goals?: GoalListRelationFilter
    connections?: PlatformConnectionListRelationFilter
    submissions?: NormalizedSubmissionListRelationFilter
    contests?: ContestHistoryListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    passwordHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sessions?: SessionOrderByRelationAggregateInput
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
    passwordHash?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    sessions?: SessionListRelationFilter
    goals?: GoalListRelationFilter
    connections?: PlatformConnectionListRelationFilter
    submissions?: NormalizedSubmissionListRelationFilter
    contests?: ContestHistoryListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    passwordHash?: SortOrderInput | SortOrder
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
    passwordHash?: StringNullableWithAggregatesFilter<"User"> | string | null
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
    plans?: PlanListRelationFilter
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
    plans?: PlanOrderByRelationAggregateInput
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
    plans?: PlanListRelationFilter
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
    taskMatches?: TaskEvidenceMatchListRelationFilter
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
    taskMatches?: TaskEvidenceMatchOrderByRelationAggregateInput
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
    taskMatches?: TaskEvidenceMatchListRelationFilter
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
    taskMatches?: TaskEvidenceMatchListRelationFilter
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
    taskMatches?: TaskEvidenceMatchOrderByRelationAggregateInput
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
    taskMatches?: TaskEvidenceMatchListRelationFilter
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

  export type PlanWhereInput = {
    AND?: PlanWhereInput | PlanWhereInput[]
    OR?: PlanWhereInput[]
    NOT?: PlanWhereInput | PlanWhereInput[]
    id?: StringFilter<"Plan"> | string
    goalId?: StringFilter<"Plan"> | string
    userId?: StringFilter<"Plan"> | string
    status?: StringFilter<"Plan"> | string
    currentVersionNum?: IntFilter<"Plan"> | number
    createdAt?: DateTimeFilter<"Plan"> | Date | string
    updatedAt?: DateTimeFilter<"Plan"> | Date | string
    goal?: XOR<GoalScalarRelationFilter, GoalWhereInput>
    versions?: PlanVersionListRelationFilter
    evaluations?: PlanEvaluationListRelationFilter
  }

  export type PlanOrderByWithRelationInput = {
    id?: SortOrder
    goalId?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    currentVersionNum?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    goal?: GoalOrderByWithRelationInput
    versions?: PlanVersionOrderByRelationAggregateInput
    evaluations?: PlanEvaluationOrderByRelationAggregateInput
  }

  export type PlanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PlanWhereInput | PlanWhereInput[]
    OR?: PlanWhereInput[]
    NOT?: PlanWhereInput | PlanWhereInput[]
    goalId?: StringFilter<"Plan"> | string
    userId?: StringFilter<"Plan"> | string
    status?: StringFilter<"Plan"> | string
    currentVersionNum?: IntFilter<"Plan"> | number
    createdAt?: DateTimeFilter<"Plan"> | Date | string
    updatedAt?: DateTimeFilter<"Plan"> | Date | string
    goal?: XOR<GoalScalarRelationFilter, GoalWhereInput>
    versions?: PlanVersionListRelationFilter
    evaluations?: PlanEvaluationListRelationFilter
  }, "id">

  export type PlanOrderByWithAggregationInput = {
    id?: SortOrder
    goalId?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    currentVersionNum?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PlanCountOrderByAggregateInput
    _avg?: PlanAvgOrderByAggregateInput
    _max?: PlanMaxOrderByAggregateInput
    _min?: PlanMinOrderByAggregateInput
    _sum?: PlanSumOrderByAggregateInput
  }

  export type PlanScalarWhereWithAggregatesInput = {
    AND?: PlanScalarWhereWithAggregatesInput | PlanScalarWhereWithAggregatesInput[]
    OR?: PlanScalarWhereWithAggregatesInput[]
    NOT?: PlanScalarWhereWithAggregatesInput | PlanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Plan"> | string
    goalId?: StringWithAggregatesFilter<"Plan"> | string
    userId?: StringWithAggregatesFilter<"Plan"> | string
    status?: StringWithAggregatesFilter<"Plan"> | string
    currentVersionNum?: IntWithAggregatesFilter<"Plan"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Plan"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Plan"> | Date | string
  }

  export type PlanVersionWhereInput = {
    AND?: PlanVersionWhereInput | PlanVersionWhereInput[]
    OR?: PlanVersionWhereInput[]
    NOT?: PlanVersionWhereInput | PlanVersionWhereInput[]
    id?: StringFilter<"PlanVersion"> | string
    planId?: StringFilter<"PlanVersion"> | string
    versionNumber?: IntFilter<"PlanVersion"> | number
    schemaVersion?: StringFilter<"PlanVersion"> | string
    summary?: StringFilter<"PlanVersion"> | string
    milestoneTitle?: StringFilter<"PlanVersion"> | string
    bottleneckType?: StringFilter<"PlanVersion"> | string
    planData?: StringFilter<"PlanVersion"> | string
    startDate?: DateTimeFilter<"PlanVersion"> | Date | string
    targetReviewDate?: DateTimeFilter<"PlanVersion"> | Date | string
    createdAt?: DateTimeFilter<"PlanVersion"> | Date | string
    plan?: XOR<PlanScalarRelationFilter, PlanWhereInput>
    tasks?: PlanTaskListRelationFilter
  }

  export type PlanVersionOrderByWithRelationInput = {
    id?: SortOrder
    planId?: SortOrder
    versionNumber?: SortOrder
    schemaVersion?: SortOrder
    summary?: SortOrder
    milestoneTitle?: SortOrder
    bottleneckType?: SortOrder
    planData?: SortOrder
    startDate?: SortOrder
    targetReviewDate?: SortOrder
    createdAt?: SortOrder
    plan?: PlanOrderByWithRelationInput
    tasks?: PlanTaskOrderByRelationAggregateInput
  }

  export type PlanVersionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    planId_versionNumber?: PlanVersionPlanIdVersionNumberCompoundUniqueInput
    AND?: PlanVersionWhereInput | PlanVersionWhereInput[]
    OR?: PlanVersionWhereInput[]
    NOT?: PlanVersionWhereInput | PlanVersionWhereInput[]
    planId?: StringFilter<"PlanVersion"> | string
    versionNumber?: IntFilter<"PlanVersion"> | number
    schemaVersion?: StringFilter<"PlanVersion"> | string
    summary?: StringFilter<"PlanVersion"> | string
    milestoneTitle?: StringFilter<"PlanVersion"> | string
    bottleneckType?: StringFilter<"PlanVersion"> | string
    planData?: StringFilter<"PlanVersion"> | string
    startDate?: DateTimeFilter<"PlanVersion"> | Date | string
    targetReviewDate?: DateTimeFilter<"PlanVersion"> | Date | string
    createdAt?: DateTimeFilter<"PlanVersion"> | Date | string
    plan?: XOR<PlanScalarRelationFilter, PlanWhereInput>
    tasks?: PlanTaskListRelationFilter
  }, "id" | "planId_versionNumber">

  export type PlanVersionOrderByWithAggregationInput = {
    id?: SortOrder
    planId?: SortOrder
    versionNumber?: SortOrder
    schemaVersion?: SortOrder
    summary?: SortOrder
    milestoneTitle?: SortOrder
    bottleneckType?: SortOrder
    planData?: SortOrder
    startDate?: SortOrder
    targetReviewDate?: SortOrder
    createdAt?: SortOrder
    _count?: PlanVersionCountOrderByAggregateInput
    _avg?: PlanVersionAvgOrderByAggregateInput
    _max?: PlanVersionMaxOrderByAggregateInput
    _min?: PlanVersionMinOrderByAggregateInput
    _sum?: PlanVersionSumOrderByAggregateInput
  }

  export type PlanVersionScalarWhereWithAggregatesInput = {
    AND?: PlanVersionScalarWhereWithAggregatesInput | PlanVersionScalarWhereWithAggregatesInput[]
    OR?: PlanVersionScalarWhereWithAggregatesInput[]
    NOT?: PlanVersionScalarWhereWithAggregatesInput | PlanVersionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PlanVersion"> | string
    planId?: StringWithAggregatesFilter<"PlanVersion"> | string
    versionNumber?: IntWithAggregatesFilter<"PlanVersion"> | number
    schemaVersion?: StringWithAggregatesFilter<"PlanVersion"> | string
    summary?: StringWithAggregatesFilter<"PlanVersion"> | string
    milestoneTitle?: StringWithAggregatesFilter<"PlanVersion"> | string
    bottleneckType?: StringWithAggregatesFilter<"PlanVersion"> | string
    planData?: StringWithAggregatesFilter<"PlanVersion"> | string
    startDate?: DateTimeWithAggregatesFilter<"PlanVersion"> | Date | string
    targetReviewDate?: DateTimeWithAggregatesFilter<"PlanVersion"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"PlanVersion"> | Date | string
  }

  export type PlanTaskWhereInput = {
    AND?: PlanTaskWhereInput | PlanTaskWhereInput[]
    OR?: PlanTaskWhereInput[]
    NOT?: PlanTaskWhereInput | PlanTaskWhereInput[]
    id?: StringFilter<"PlanTask"> | string
    planVersionId?: StringFilter<"PlanTask"> | string
    externalTaskId?: StringFilter<"PlanTask"> | string
    type?: StringFilter<"PlanTask"> | string
    title?: StringFilter<"PlanTask"> | string
    quantity?: IntFilter<"PlanTask"> | number
    quantityCompleted?: IntFilter<"PlanTask"> | number
    platform?: StringNullableFilter<"PlanTask"> | string | null
    minDifficulty?: IntNullableFilter<"PlanTask"> | number | null
    maxDifficulty?: IntNullableFilter<"PlanTask"> | number | null
    difficultyTier?: StringNullableFilter<"PlanTask"> | string | null
    topics?: StringFilter<"PlanTask"> | string
    reason?: StringFilter<"PlanTask"> | string
    evidenceReferences?: StringFilter<"PlanTask"> | string
    completionMetric?: StringFilter<"PlanTask"> | string
    status?: StringFilter<"PlanTask"> | string
    createdAt?: DateTimeFilter<"PlanTask"> | Date | string
    planVersion?: XOR<PlanVersionScalarRelationFilter, PlanVersionWhereInput>
    matches?: TaskEvidenceMatchListRelationFilter
  }

  export type PlanTaskOrderByWithRelationInput = {
    id?: SortOrder
    planVersionId?: SortOrder
    externalTaskId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    quantity?: SortOrder
    quantityCompleted?: SortOrder
    platform?: SortOrderInput | SortOrder
    minDifficulty?: SortOrderInput | SortOrder
    maxDifficulty?: SortOrderInput | SortOrder
    difficultyTier?: SortOrderInput | SortOrder
    topics?: SortOrder
    reason?: SortOrder
    evidenceReferences?: SortOrder
    completionMetric?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    planVersion?: PlanVersionOrderByWithRelationInput
    matches?: TaskEvidenceMatchOrderByRelationAggregateInput
  }

  export type PlanTaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PlanTaskWhereInput | PlanTaskWhereInput[]
    OR?: PlanTaskWhereInput[]
    NOT?: PlanTaskWhereInput | PlanTaskWhereInput[]
    planVersionId?: StringFilter<"PlanTask"> | string
    externalTaskId?: StringFilter<"PlanTask"> | string
    type?: StringFilter<"PlanTask"> | string
    title?: StringFilter<"PlanTask"> | string
    quantity?: IntFilter<"PlanTask"> | number
    quantityCompleted?: IntFilter<"PlanTask"> | number
    platform?: StringNullableFilter<"PlanTask"> | string | null
    minDifficulty?: IntNullableFilter<"PlanTask"> | number | null
    maxDifficulty?: IntNullableFilter<"PlanTask"> | number | null
    difficultyTier?: StringNullableFilter<"PlanTask"> | string | null
    topics?: StringFilter<"PlanTask"> | string
    reason?: StringFilter<"PlanTask"> | string
    evidenceReferences?: StringFilter<"PlanTask"> | string
    completionMetric?: StringFilter<"PlanTask"> | string
    status?: StringFilter<"PlanTask"> | string
    createdAt?: DateTimeFilter<"PlanTask"> | Date | string
    planVersion?: XOR<PlanVersionScalarRelationFilter, PlanVersionWhereInput>
    matches?: TaskEvidenceMatchListRelationFilter
  }, "id">

  export type PlanTaskOrderByWithAggregationInput = {
    id?: SortOrder
    planVersionId?: SortOrder
    externalTaskId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    quantity?: SortOrder
    quantityCompleted?: SortOrder
    platform?: SortOrderInput | SortOrder
    minDifficulty?: SortOrderInput | SortOrder
    maxDifficulty?: SortOrderInput | SortOrder
    difficultyTier?: SortOrderInput | SortOrder
    topics?: SortOrder
    reason?: SortOrder
    evidenceReferences?: SortOrder
    completionMetric?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: PlanTaskCountOrderByAggregateInput
    _avg?: PlanTaskAvgOrderByAggregateInput
    _max?: PlanTaskMaxOrderByAggregateInput
    _min?: PlanTaskMinOrderByAggregateInput
    _sum?: PlanTaskSumOrderByAggregateInput
  }

  export type PlanTaskScalarWhereWithAggregatesInput = {
    AND?: PlanTaskScalarWhereWithAggregatesInput | PlanTaskScalarWhereWithAggregatesInput[]
    OR?: PlanTaskScalarWhereWithAggregatesInput[]
    NOT?: PlanTaskScalarWhereWithAggregatesInput | PlanTaskScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PlanTask"> | string
    planVersionId?: StringWithAggregatesFilter<"PlanTask"> | string
    externalTaskId?: StringWithAggregatesFilter<"PlanTask"> | string
    type?: StringWithAggregatesFilter<"PlanTask"> | string
    title?: StringWithAggregatesFilter<"PlanTask"> | string
    quantity?: IntWithAggregatesFilter<"PlanTask"> | number
    quantityCompleted?: IntWithAggregatesFilter<"PlanTask"> | number
    platform?: StringNullableWithAggregatesFilter<"PlanTask"> | string | null
    minDifficulty?: IntNullableWithAggregatesFilter<"PlanTask"> | number | null
    maxDifficulty?: IntNullableWithAggregatesFilter<"PlanTask"> | number | null
    difficultyTier?: StringNullableWithAggregatesFilter<"PlanTask"> | string | null
    topics?: StringWithAggregatesFilter<"PlanTask"> | string
    reason?: StringWithAggregatesFilter<"PlanTask"> | string
    evidenceReferences?: StringWithAggregatesFilter<"PlanTask"> | string
    completionMetric?: StringWithAggregatesFilter<"PlanTask"> | string
    status?: StringWithAggregatesFilter<"PlanTask"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PlanTask"> | Date | string
  }

  export type TaskEvidenceMatchWhereInput = {
    AND?: TaskEvidenceMatchWhereInput | TaskEvidenceMatchWhereInput[]
    OR?: TaskEvidenceMatchWhereInput[]
    NOT?: TaskEvidenceMatchWhereInput | TaskEvidenceMatchWhereInput[]
    id?: StringFilter<"TaskEvidenceMatch"> | string
    taskId?: StringFilter<"TaskEvidenceMatch"> | string
    submissionId?: StringNullableFilter<"TaskEvidenceMatch"> | string | null
    contestHistoryId?: StringNullableFilter<"TaskEvidenceMatch"> | string | null
    matchedAt?: DateTimeFilter<"TaskEvidenceMatch"> | Date | string
    notes?: StringNullableFilter<"TaskEvidenceMatch"> | string | null
    task?: XOR<PlanTaskScalarRelationFilter, PlanTaskWhereInput>
    submission?: XOR<NormalizedSubmissionNullableScalarRelationFilter, NormalizedSubmissionWhereInput> | null
    contestHistory?: XOR<ContestHistoryNullableScalarRelationFilter, ContestHistoryWhereInput> | null
  }

  export type TaskEvidenceMatchOrderByWithRelationInput = {
    id?: SortOrder
    taskId?: SortOrder
    submissionId?: SortOrderInput | SortOrder
    contestHistoryId?: SortOrderInput | SortOrder
    matchedAt?: SortOrder
    notes?: SortOrderInput | SortOrder
    task?: PlanTaskOrderByWithRelationInput
    submission?: NormalizedSubmissionOrderByWithRelationInput
    contestHistory?: ContestHistoryOrderByWithRelationInput
  }

  export type TaskEvidenceMatchWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    taskId_submissionId?: TaskEvidenceMatchTaskIdSubmissionIdCompoundUniqueInput
    taskId_contestHistoryId?: TaskEvidenceMatchTaskIdContestHistoryIdCompoundUniqueInput
    AND?: TaskEvidenceMatchWhereInput | TaskEvidenceMatchWhereInput[]
    OR?: TaskEvidenceMatchWhereInput[]
    NOT?: TaskEvidenceMatchWhereInput | TaskEvidenceMatchWhereInput[]
    taskId?: StringFilter<"TaskEvidenceMatch"> | string
    submissionId?: StringNullableFilter<"TaskEvidenceMatch"> | string | null
    contestHistoryId?: StringNullableFilter<"TaskEvidenceMatch"> | string | null
    matchedAt?: DateTimeFilter<"TaskEvidenceMatch"> | Date | string
    notes?: StringNullableFilter<"TaskEvidenceMatch"> | string | null
    task?: XOR<PlanTaskScalarRelationFilter, PlanTaskWhereInput>
    submission?: XOR<NormalizedSubmissionNullableScalarRelationFilter, NormalizedSubmissionWhereInput> | null
    contestHistory?: XOR<ContestHistoryNullableScalarRelationFilter, ContestHistoryWhereInput> | null
  }, "id" | "taskId_submissionId" | "taskId_contestHistoryId">

  export type TaskEvidenceMatchOrderByWithAggregationInput = {
    id?: SortOrder
    taskId?: SortOrder
    submissionId?: SortOrderInput | SortOrder
    contestHistoryId?: SortOrderInput | SortOrder
    matchedAt?: SortOrder
    notes?: SortOrderInput | SortOrder
    _count?: TaskEvidenceMatchCountOrderByAggregateInput
    _max?: TaskEvidenceMatchMaxOrderByAggregateInput
    _min?: TaskEvidenceMatchMinOrderByAggregateInput
  }

  export type TaskEvidenceMatchScalarWhereWithAggregatesInput = {
    AND?: TaskEvidenceMatchScalarWhereWithAggregatesInput | TaskEvidenceMatchScalarWhereWithAggregatesInput[]
    OR?: TaskEvidenceMatchScalarWhereWithAggregatesInput[]
    NOT?: TaskEvidenceMatchScalarWhereWithAggregatesInput | TaskEvidenceMatchScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TaskEvidenceMatch"> | string
    taskId?: StringWithAggregatesFilter<"TaskEvidenceMatch"> | string
    submissionId?: StringNullableWithAggregatesFilter<"TaskEvidenceMatch"> | string | null
    contestHistoryId?: StringNullableWithAggregatesFilter<"TaskEvidenceMatch"> | string | null
    matchedAt?: DateTimeWithAggregatesFilter<"TaskEvidenceMatch"> | Date | string
    notes?: StringNullableWithAggregatesFilter<"TaskEvidenceMatch"> | string | null
  }

  export type PlanEvaluationWhereInput = {
    AND?: PlanEvaluationWhereInput | PlanEvaluationWhereInput[]
    OR?: PlanEvaluationWhereInput[]
    NOT?: PlanEvaluationWhereInput | PlanEvaluationWhereInput[]
    id?: StringFilter<"PlanEvaluation"> | string
    planId?: StringFilter<"PlanEvaluation"> | string
    evaluatedVersionNum?: IntFilter<"PlanEvaluation"> | number
    completionRate?: FloatFilter<"PlanEvaluation"> | number
    tasksPlanned?: IntFilter<"PlanEvaluation"> | number
    tasksCompleted?: IntFilter<"PlanEvaluation"> | number
    ratingChange?: IntNullableFilter<"PlanEvaluation"> | number | null
    outcomeData?: StringFilter<"PlanEvaluation"> | string
    evaluatedAt?: DateTimeFilter<"PlanEvaluation"> | Date | string
    plan?: XOR<PlanScalarRelationFilter, PlanWhereInput>
  }

  export type PlanEvaluationOrderByWithRelationInput = {
    id?: SortOrder
    planId?: SortOrder
    evaluatedVersionNum?: SortOrder
    completionRate?: SortOrder
    tasksPlanned?: SortOrder
    tasksCompleted?: SortOrder
    ratingChange?: SortOrderInput | SortOrder
    outcomeData?: SortOrder
    evaluatedAt?: SortOrder
    plan?: PlanOrderByWithRelationInput
  }

  export type PlanEvaluationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PlanEvaluationWhereInput | PlanEvaluationWhereInput[]
    OR?: PlanEvaluationWhereInput[]
    NOT?: PlanEvaluationWhereInput | PlanEvaluationWhereInput[]
    planId?: StringFilter<"PlanEvaluation"> | string
    evaluatedVersionNum?: IntFilter<"PlanEvaluation"> | number
    completionRate?: FloatFilter<"PlanEvaluation"> | number
    tasksPlanned?: IntFilter<"PlanEvaluation"> | number
    tasksCompleted?: IntFilter<"PlanEvaluation"> | number
    ratingChange?: IntNullableFilter<"PlanEvaluation"> | number | null
    outcomeData?: StringFilter<"PlanEvaluation"> | string
    evaluatedAt?: DateTimeFilter<"PlanEvaluation"> | Date | string
    plan?: XOR<PlanScalarRelationFilter, PlanWhereInput>
  }, "id">

  export type PlanEvaluationOrderByWithAggregationInput = {
    id?: SortOrder
    planId?: SortOrder
    evaluatedVersionNum?: SortOrder
    completionRate?: SortOrder
    tasksPlanned?: SortOrder
    tasksCompleted?: SortOrder
    ratingChange?: SortOrderInput | SortOrder
    outcomeData?: SortOrder
    evaluatedAt?: SortOrder
    _count?: PlanEvaluationCountOrderByAggregateInput
    _avg?: PlanEvaluationAvgOrderByAggregateInput
    _max?: PlanEvaluationMaxOrderByAggregateInput
    _min?: PlanEvaluationMinOrderByAggregateInput
    _sum?: PlanEvaluationSumOrderByAggregateInput
  }

  export type PlanEvaluationScalarWhereWithAggregatesInput = {
    AND?: PlanEvaluationScalarWhereWithAggregatesInput | PlanEvaluationScalarWhereWithAggregatesInput[]
    OR?: PlanEvaluationScalarWhereWithAggregatesInput[]
    NOT?: PlanEvaluationScalarWhereWithAggregatesInput | PlanEvaluationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PlanEvaluation"> | string
    planId?: StringWithAggregatesFilter<"PlanEvaluation"> | string
    evaluatedVersionNum?: IntWithAggregatesFilter<"PlanEvaluation"> | number
    completionRate?: FloatWithAggregatesFilter<"PlanEvaluation"> | number
    tasksPlanned?: IntWithAggregatesFilter<"PlanEvaluation"> | number
    tasksCompleted?: IntWithAggregatesFilter<"PlanEvaluation"> | number
    ratingChange?: IntNullableWithAggregatesFilter<"PlanEvaluation"> | number | null
    outcomeData?: StringWithAggregatesFilter<"PlanEvaluation"> | string
    evaluatedAt?: DateTimeWithAggregatesFilter<"PlanEvaluation"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionToken?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "sessionToken">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    sessionToken?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    expires?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    goals?: GoalCreateNestedManyWithoutUserInput
    connections?: PlatformConnectionCreateNestedManyWithoutUserInput
    submissions?: NormalizedSubmissionCreateNestedManyWithoutUserInput
    contests?: ContestHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    goals?: GoalUncheckedCreateNestedManyWithoutUserInput
    connections?: PlatformConnectionUncheckedCreateNestedManyWithoutUserInput
    submissions?: NormalizedSubmissionUncheckedCreateNestedManyWithoutUserInput
    contests?: ContestHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    goals?: GoalUpdateManyWithoutUserNestedInput
    connections?: PlatformConnectionUpdateManyWithoutUserNestedInput
    submissions?: NormalizedSubmissionUpdateManyWithoutUserNestedInput
    contests?: ContestHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    goals?: GoalUncheckedUpdateManyWithoutUserNestedInput
    connections?: PlatformConnectionUncheckedUpdateManyWithoutUserNestedInput
    submissions?: NormalizedSubmissionUncheckedUpdateManyWithoutUserNestedInput
    contests?: ContestHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
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
    plans?: PlanCreateNestedManyWithoutGoalInput
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
    plans?: PlanUncheckedCreateNestedManyWithoutGoalInput
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
    plans?: PlanUpdateManyWithoutGoalNestedInput
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
    plans?: PlanUncheckedUpdateManyWithoutGoalNestedInput
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
    taskMatches?: TaskEvidenceMatchCreateNestedManyWithoutSubmissionInput
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
    taskMatches?: TaskEvidenceMatchUncheckedCreateNestedManyWithoutSubmissionInput
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
    taskMatches?: TaskEvidenceMatchUpdateManyWithoutSubmissionNestedInput
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
    taskMatches?: TaskEvidenceMatchUncheckedUpdateManyWithoutSubmissionNestedInput
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
    taskMatches?: TaskEvidenceMatchCreateNestedManyWithoutContestHistoryInput
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
    taskMatches?: TaskEvidenceMatchUncheckedCreateNestedManyWithoutContestHistoryInput
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
    taskMatches?: TaskEvidenceMatchUpdateManyWithoutContestHistoryNestedInput
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
    taskMatches?: TaskEvidenceMatchUncheckedUpdateManyWithoutContestHistoryNestedInput
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

  export type PlanCreateInput = {
    id?: string
    userId: string
    status?: string
    currentVersionNum?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    goal: GoalCreateNestedOneWithoutPlansInput
    versions?: PlanVersionCreateNestedManyWithoutPlanInput
    evaluations?: PlanEvaluationCreateNestedManyWithoutPlanInput
  }

  export type PlanUncheckedCreateInput = {
    id?: string
    goalId: string
    userId: string
    status?: string
    currentVersionNum?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    versions?: PlanVersionUncheckedCreateNestedManyWithoutPlanInput
    evaluations?: PlanEvaluationUncheckedCreateNestedManyWithoutPlanInput
  }

  export type PlanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    currentVersionNum?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    goal?: GoalUpdateOneRequiredWithoutPlansNestedInput
    versions?: PlanVersionUpdateManyWithoutPlanNestedInput
    evaluations?: PlanEvaluationUpdateManyWithoutPlanNestedInput
  }

  export type PlanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    goalId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    currentVersionNum?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    versions?: PlanVersionUncheckedUpdateManyWithoutPlanNestedInput
    evaluations?: PlanEvaluationUncheckedUpdateManyWithoutPlanNestedInput
  }

  export type PlanCreateManyInput = {
    id?: string
    goalId: string
    userId: string
    status?: string
    currentVersionNum?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    currentVersionNum?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    goalId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    currentVersionNum?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanVersionCreateInput = {
    id?: string
    versionNumber: number
    schemaVersion?: string
    summary: string
    milestoneTitle: string
    bottleneckType: string
    planData: string
    startDate: Date | string
    targetReviewDate: Date | string
    createdAt?: Date | string
    plan: PlanCreateNestedOneWithoutVersionsInput
    tasks?: PlanTaskCreateNestedManyWithoutPlanVersionInput
  }

  export type PlanVersionUncheckedCreateInput = {
    id?: string
    planId: string
    versionNumber: number
    schemaVersion?: string
    summary: string
    milestoneTitle: string
    bottleneckType: string
    planData: string
    startDate: Date | string
    targetReviewDate: Date | string
    createdAt?: Date | string
    tasks?: PlanTaskUncheckedCreateNestedManyWithoutPlanVersionInput
  }

  export type PlanVersionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    schemaVersion?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    milestoneTitle?: StringFieldUpdateOperationsInput | string
    bottleneckType?: StringFieldUpdateOperationsInput | string
    planData?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    targetReviewDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plan?: PlanUpdateOneRequiredWithoutVersionsNestedInput
    tasks?: PlanTaskUpdateManyWithoutPlanVersionNestedInput
  }

  export type PlanVersionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    schemaVersion?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    milestoneTitle?: StringFieldUpdateOperationsInput | string
    bottleneckType?: StringFieldUpdateOperationsInput | string
    planData?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    targetReviewDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: PlanTaskUncheckedUpdateManyWithoutPlanVersionNestedInput
  }

  export type PlanVersionCreateManyInput = {
    id?: string
    planId: string
    versionNumber: number
    schemaVersion?: string
    summary: string
    milestoneTitle: string
    bottleneckType: string
    planData: string
    startDate: Date | string
    targetReviewDate: Date | string
    createdAt?: Date | string
  }

  export type PlanVersionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    schemaVersion?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    milestoneTitle?: StringFieldUpdateOperationsInput | string
    bottleneckType?: StringFieldUpdateOperationsInput | string
    planData?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    targetReviewDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanVersionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    schemaVersion?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    milestoneTitle?: StringFieldUpdateOperationsInput | string
    bottleneckType?: StringFieldUpdateOperationsInput | string
    planData?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    targetReviewDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanTaskCreateInput = {
    id?: string
    externalTaskId: string
    type: string
    title: string
    quantity?: number
    quantityCompleted?: number
    platform?: string | null
    minDifficulty?: number | null
    maxDifficulty?: number | null
    difficultyTier?: string | null
    topics: string
    reason: string
    evidenceReferences: string
    completionMetric: string
    status?: string
    createdAt?: Date | string
    planVersion: PlanVersionCreateNestedOneWithoutTasksInput
    matches?: TaskEvidenceMatchCreateNestedManyWithoutTaskInput
  }

  export type PlanTaskUncheckedCreateInput = {
    id?: string
    planVersionId: string
    externalTaskId: string
    type: string
    title: string
    quantity?: number
    quantityCompleted?: number
    platform?: string | null
    minDifficulty?: number | null
    maxDifficulty?: number | null
    difficultyTier?: string | null
    topics: string
    reason: string
    evidenceReferences: string
    completionMetric: string
    status?: string
    createdAt?: Date | string
    matches?: TaskEvidenceMatchUncheckedCreateNestedManyWithoutTaskInput
  }

  export type PlanTaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalTaskId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    quantityCompleted?: IntFieldUpdateOperationsInput | number
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    minDifficulty?: NullableIntFieldUpdateOperationsInput | number | null
    maxDifficulty?: NullableIntFieldUpdateOperationsInput | number | null
    difficultyTier?: NullableStringFieldUpdateOperationsInput | string | null
    topics?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    evidenceReferences?: StringFieldUpdateOperationsInput | string
    completionMetric?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    planVersion?: PlanVersionUpdateOneRequiredWithoutTasksNestedInput
    matches?: TaskEvidenceMatchUpdateManyWithoutTaskNestedInput
  }

  export type PlanTaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    planVersionId?: StringFieldUpdateOperationsInput | string
    externalTaskId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    quantityCompleted?: IntFieldUpdateOperationsInput | number
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    minDifficulty?: NullableIntFieldUpdateOperationsInput | number | null
    maxDifficulty?: NullableIntFieldUpdateOperationsInput | number | null
    difficultyTier?: NullableStringFieldUpdateOperationsInput | string | null
    topics?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    evidenceReferences?: StringFieldUpdateOperationsInput | string
    completionMetric?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    matches?: TaskEvidenceMatchUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type PlanTaskCreateManyInput = {
    id?: string
    planVersionId: string
    externalTaskId: string
    type: string
    title: string
    quantity?: number
    quantityCompleted?: number
    platform?: string | null
    minDifficulty?: number | null
    maxDifficulty?: number | null
    difficultyTier?: string | null
    topics: string
    reason: string
    evidenceReferences: string
    completionMetric: string
    status?: string
    createdAt?: Date | string
  }

  export type PlanTaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalTaskId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    quantityCompleted?: IntFieldUpdateOperationsInput | number
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    minDifficulty?: NullableIntFieldUpdateOperationsInput | number | null
    maxDifficulty?: NullableIntFieldUpdateOperationsInput | number | null
    difficultyTier?: NullableStringFieldUpdateOperationsInput | string | null
    topics?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    evidenceReferences?: StringFieldUpdateOperationsInput | string
    completionMetric?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanTaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    planVersionId?: StringFieldUpdateOperationsInput | string
    externalTaskId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    quantityCompleted?: IntFieldUpdateOperationsInput | number
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    minDifficulty?: NullableIntFieldUpdateOperationsInput | number | null
    maxDifficulty?: NullableIntFieldUpdateOperationsInput | number | null
    difficultyTier?: NullableStringFieldUpdateOperationsInput | string | null
    topics?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    evidenceReferences?: StringFieldUpdateOperationsInput | string
    completionMetric?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskEvidenceMatchCreateInput = {
    id?: string
    matchedAt?: Date | string
    notes?: string | null
    task: PlanTaskCreateNestedOneWithoutMatchesInput
    submission?: NormalizedSubmissionCreateNestedOneWithoutTaskMatchesInput
    contestHistory?: ContestHistoryCreateNestedOneWithoutTaskMatchesInput
  }

  export type TaskEvidenceMatchUncheckedCreateInput = {
    id?: string
    taskId: string
    submissionId?: string | null
    contestHistoryId?: string | null
    matchedAt?: Date | string
    notes?: string | null
  }

  export type TaskEvidenceMatchUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    task?: PlanTaskUpdateOneRequiredWithoutMatchesNestedInput
    submission?: NormalizedSubmissionUpdateOneWithoutTaskMatchesNestedInput
    contestHistory?: ContestHistoryUpdateOneWithoutTaskMatchesNestedInput
  }

  export type TaskEvidenceMatchUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    submissionId?: NullableStringFieldUpdateOperationsInput | string | null
    contestHistoryId?: NullableStringFieldUpdateOperationsInput | string | null
    matchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TaskEvidenceMatchCreateManyInput = {
    id?: string
    taskId: string
    submissionId?: string | null
    contestHistoryId?: string | null
    matchedAt?: Date | string
    notes?: string | null
  }

  export type TaskEvidenceMatchUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TaskEvidenceMatchUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    submissionId?: NullableStringFieldUpdateOperationsInput | string | null
    contestHistoryId?: NullableStringFieldUpdateOperationsInput | string | null
    matchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PlanEvaluationCreateInput = {
    id?: string
    evaluatedVersionNum: number
    completionRate: number
    tasksPlanned: number
    tasksCompleted: number
    ratingChange?: number | null
    outcomeData: string
    evaluatedAt?: Date | string
    plan: PlanCreateNestedOneWithoutEvaluationsInput
  }

  export type PlanEvaluationUncheckedCreateInput = {
    id?: string
    planId: string
    evaluatedVersionNum: number
    completionRate: number
    tasksPlanned: number
    tasksCompleted: number
    ratingChange?: number | null
    outcomeData: string
    evaluatedAt?: Date | string
  }

  export type PlanEvaluationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    evaluatedVersionNum?: IntFieldUpdateOperationsInput | number
    completionRate?: FloatFieldUpdateOperationsInput | number
    tasksPlanned?: IntFieldUpdateOperationsInput | number
    tasksCompleted?: IntFieldUpdateOperationsInput | number
    ratingChange?: NullableIntFieldUpdateOperationsInput | number | null
    outcomeData?: StringFieldUpdateOperationsInput | string
    evaluatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plan?: PlanUpdateOneRequiredWithoutEvaluationsNestedInput
  }

  export type PlanEvaluationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    evaluatedVersionNum?: IntFieldUpdateOperationsInput | number
    completionRate?: FloatFieldUpdateOperationsInput | number
    tasksPlanned?: IntFieldUpdateOperationsInput | number
    tasksCompleted?: IntFieldUpdateOperationsInput | number
    ratingChange?: NullableIntFieldUpdateOperationsInput | number | null
    outcomeData?: StringFieldUpdateOperationsInput | string
    evaluatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanEvaluationCreateManyInput = {
    id?: string
    planId: string
    evaluatedVersionNum: number
    completionRate: number
    tasksPlanned: number
    tasksCompleted: number
    ratingChange?: number | null
    outcomeData: string
    evaluatedAt?: Date | string
  }

  export type PlanEvaluationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    evaluatedVersionNum?: IntFieldUpdateOperationsInput | number
    completionRate?: FloatFieldUpdateOperationsInput | number
    tasksPlanned?: IntFieldUpdateOperationsInput | number
    tasksCompleted?: IntFieldUpdateOperationsInput | number
    ratingChange?: NullableIntFieldUpdateOperationsInput | number | null
    outcomeData?: StringFieldUpdateOperationsInput | string
    evaluatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanEvaluationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    evaluatedVersionNum?: IntFieldUpdateOperationsInput | number
    completionRate?: FloatFieldUpdateOperationsInput | number
    tasksPlanned?: IntFieldUpdateOperationsInput | number
    tasksCompleted?: IntFieldUpdateOperationsInput | number
    ratingChange?: NullableIntFieldUpdateOperationsInput | number | null
    outcomeData?: StringFieldUpdateOperationsInput | string
    evaluatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id?: string
    sessionToken: string
    expires: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
    createdAt?: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
    createdAt?: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
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

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
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
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
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

  export type PlanListRelationFilter = {
    every?: PlanWhereInput
    some?: PlanWhereInput
    none?: PlanWhereInput
  }

  export type PlanOrderByRelationAggregateInput = {
    _count?: SortOrder
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

  export type TaskEvidenceMatchListRelationFilter = {
    every?: TaskEvidenceMatchWhereInput
    some?: TaskEvidenceMatchWhereInput
    none?: TaskEvidenceMatchWhereInput
  }

  export type TaskEvidenceMatchOrderByRelationAggregateInput = {
    _count?: SortOrder
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

  export type GoalScalarRelationFilter = {
    is?: GoalWhereInput
    isNot?: GoalWhereInput
  }

  export type PlanVersionListRelationFilter = {
    every?: PlanVersionWhereInput
    some?: PlanVersionWhereInput
    none?: PlanVersionWhereInput
  }

  export type PlanEvaluationListRelationFilter = {
    every?: PlanEvaluationWhereInput
    some?: PlanEvaluationWhereInput
    none?: PlanEvaluationWhereInput
  }

  export type PlanVersionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PlanEvaluationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PlanCountOrderByAggregateInput = {
    id?: SortOrder
    goalId?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    currentVersionNum?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlanAvgOrderByAggregateInput = {
    currentVersionNum?: SortOrder
  }

  export type PlanMaxOrderByAggregateInput = {
    id?: SortOrder
    goalId?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    currentVersionNum?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlanMinOrderByAggregateInput = {
    id?: SortOrder
    goalId?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    currentVersionNum?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlanSumOrderByAggregateInput = {
    currentVersionNum?: SortOrder
  }

  export type PlanScalarRelationFilter = {
    is?: PlanWhereInput
    isNot?: PlanWhereInput
  }

  export type PlanTaskListRelationFilter = {
    every?: PlanTaskWhereInput
    some?: PlanTaskWhereInput
    none?: PlanTaskWhereInput
  }

  export type PlanTaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PlanVersionPlanIdVersionNumberCompoundUniqueInput = {
    planId: string
    versionNumber: number
  }

  export type PlanVersionCountOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
    versionNumber?: SortOrder
    schemaVersion?: SortOrder
    summary?: SortOrder
    milestoneTitle?: SortOrder
    bottleneckType?: SortOrder
    planData?: SortOrder
    startDate?: SortOrder
    targetReviewDate?: SortOrder
    createdAt?: SortOrder
  }

  export type PlanVersionAvgOrderByAggregateInput = {
    versionNumber?: SortOrder
  }

  export type PlanVersionMaxOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
    versionNumber?: SortOrder
    schemaVersion?: SortOrder
    summary?: SortOrder
    milestoneTitle?: SortOrder
    bottleneckType?: SortOrder
    planData?: SortOrder
    startDate?: SortOrder
    targetReviewDate?: SortOrder
    createdAt?: SortOrder
  }

  export type PlanVersionMinOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
    versionNumber?: SortOrder
    schemaVersion?: SortOrder
    summary?: SortOrder
    milestoneTitle?: SortOrder
    bottleneckType?: SortOrder
    planData?: SortOrder
    startDate?: SortOrder
    targetReviewDate?: SortOrder
    createdAt?: SortOrder
  }

  export type PlanVersionSumOrderByAggregateInput = {
    versionNumber?: SortOrder
  }

  export type PlanVersionScalarRelationFilter = {
    is?: PlanVersionWhereInput
    isNot?: PlanVersionWhereInput
  }

  export type PlanTaskCountOrderByAggregateInput = {
    id?: SortOrder
    planVersionId?: SortOrder
    externalTaskId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    quantity?: SortOrder
    quantityCompleted?: SortOrder
    platform?: SortOrder
    minDifficulty?: SortOrder
    maxDifficulty?: SortOrder
    difficultyTier?: SortOrder
    topics?: SortOrder
    reason?: SortOrder
    evidenceReferences?: SortOrder
    completionMetric?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type PlanTaskAvgOrderByAggregateInput = {
    quantity?: SortOrder
    quantityCompleted?: SortOrder
    minDifficulty?: SortOrder
    maxDifficulty?: SortOrder
  }

  export type PlanTaskMaxOrderByAggregateInput = {
    id?: SortOrder
    planVersionId?: SortOrder
    externalTaskId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    quantity?: SortOrder
    quantityCompleted?: SortOrder
    platform?: SortOrder
    minDifficulty?: SortOrder
    maxDifficulty?: SortOrder
    difficultyTier?: SortOrder
    topics?: SortOrder
    reason?: SortOrder
    evidenceReferences?: SortOrder
    completionMetric?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type PlanTaskMinOrderByAggregateInput = {
    id?: SortOrder
    planVersionId?: SortOrder
    externalTaskId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    quantity?: SortOrder
    quantityCompleted?: SortOrder
    platform?: SortOrder
    minDifficulty?: SortOrder
    maxDifficulty?: SortOrder
    difficultyTier?: SortOrder
    topics?: SortOrder
    reason?: SortOrder
    evidenceReferences?: SortOrder
    completionMetric?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type PlanTaskSumOrderByAggregateInput = {
    quantity?: SortOrder
    quantityCompleted?: SortOrder
    minDifficulty?: SortOrder
    maxDifficulty?: SortOrder
  }

  export type PlanTaskScalarRelationFilter = {
    is?: PlanTaskWhereInput
    isNot?: PlanTaskWhereInput
  }

  export type NormalizedSubmissionNullableScalarRelationFilter = {
    is?: NormalizedSubmissionWhereInput | null
    isNot?: NormalizedSubmissionWhereInput | null
  }

  export type ContestHistoryNullableScalarRelationFilter = {
    is?: ContestHistoryWhereInput | null
    isNot?: ContestHistoryWhereInput | null
  }

  export type TaskEvidenceMatchTaskIdSubmissionIdCompoundUniqueInput = {
    taskId: string
    submissionId: string
  }

  export type TaskEvidenceMatchTaskIdContestHistoryIdCompoundUniqueInput = {
    taskId: string
    contestHistoryId: string
  }

  export type TaskEvidenceMatchCountOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    submissionId?: SortOrder
    contestHistoryId?: SortOrder
    matchedAt?: SortOrder
    notes?: SortOrder
  }

  export type TaskEvidenceMatchMaxOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    submissionId?: SortOrder
    contestHistoryId?: SortOrder
    matchedAt?: SortOrder
    notes?: SortOrder
  }

  export type TaskEvidenceMatchMinOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    submissionId?: SortOrder
    contestHistoryId?: SortOrder
    matchedAt?: SortOrder
    notes?: SortOrder
  }

  export type PlanEvaluationCountOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
    evaluatedVersionNum?: SortOrder
    completionRate?: SortOrder
    tasksPlanned?: SortOrder
    tasksCompleted?: SortOrder
    ratingChange?: SortOrder
    outcomeData?: SortOrder
    evaluatedAt?: SortOrder
  }

  export type PlanEvaluationAvgOrderByAggregateInput = {
    evaluatedVersionNum?: SortOrder
    completionRate?: SortOrder
    tasksPlanned?: SortOrder
    tasksCompleted?: SortOrder
    ratingChange?: SortOrder
  }

  export type PlanEvaluationMaxOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
    evaluatedVersionNum?: SortOrder
    completionRate?: SortOrder
    tasksPlanned?: SortOrder
    tasksCompleted?: SortOrder
    ratingChange?: SortOrder
    outcomeData?: SortOrder
    evaluatedAt?: SortOrder
  }

  export type PlanEvaluationMinOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
    evaluatedVersionNum?: SortOrder
    completionRate?: SortOrder
    tasksPlanned?: SortOrder
    tasksCompleted?: SortOrder
    ratingChange?: SortOrder
    outcomeData?: SortOrder
    evaluatedAt?: SortOrder
  }

  export type PlanEvaluationSumOrderByAggregateInput = {
    evaluatedVersionNum?: SortOrder
    completionRate?: SortOrder
    tasksPlanned?: SortOrder
    tasksCompleted?: SortOrder
    ratingChange?: SortOrder
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
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

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
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

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
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

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
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

  export type PlanCreateNestedManyWithoutGoalInput = {
    create?: XOR<PlanCreateWithoutGoalInput, PlanUncheckedCreateWithoutGoalInput> | PlanCreateWithoutGoalInput[] | PlanUncheckedCreateWithoutGoalInput[]
    connectOrCreate?: PlanCreateOrConnectWithoutGoalInput | PlanCreateOrConnectWithoutGoalInput[]
    createMany?: PlanCreateManyGoalInputEnvelope
    connect?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
  }

  export type PlanUncheckedCreateNestedManyWithoutGoalInput = {
    create?: XOR<PlanCreateWithoutGoalInput, PlanUncheckedCreateWithoutGoalInput> | PlanCreateWithoutGoalInput[] | PlanUncheckedCreateWithoutGoalInput[]
    connectOrCreate?: PlanCreateOrConnectWithoutGoalInput | PlanCreateOrConnectWithoutGoalInput[]
    createMany?: PlanCreateManyGoalInputEnvelope
    connect?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
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

  export type PlanUpdateManyWithoutGoalNestedInput = {
    create?: XOR<PlanCreateWithoutGoalInput, PlanUncheckedCreateWithoutGoalInput> | PlanCreateWithoutGoalInput[] | PlanUncheckedCreateWithoutGoalInput[]
    connectOrCreate?: PlanCreateOrConnectWithoutGoalInput | PlanCreateOrConnectWithoutGoalInput[]
    upsert?: PlanUpsertWithWhereUniqueWithoutGoalInput | PlanUpsertWithWhereUniqueWithoutGoalInput[]
    createMany?: PlanCreateManyGoalInputEnvelope
    set?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
    disconnect?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
    delete?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
    connect?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
    update?: PlanUpdateWithWhereUniqueWithoutGoalInput | PlanUpdateWithWhereUniqueWithoutGoalInput[]
    updateMany?: PlanUpdateManyWithWhereWithoutGoalInput | PlanUpdateManyWithWhereWithoutGoalInput[]
    deleteMany?: PlanScalarWhereInput | PlanScalarWhereInput[]
  }

  export type PlanUncheckedUpdateManyWithoutGoalNestedInput = {
    create?: XOR<PlanCreateWithoutGoalInput, PlanUncheckedCreateWithoutGoalInput> | PlanCreateWithoutGoalInput[] | PlanUncheckedCreateWithoutGoalInput[]
    connectOrCreate?: PlanCreateOrConnectWithoutGoalInput | PlanCreateOrConnectWithoutGoalInput[]
    upsert?: PlanUpsertWithWhereUniqueWithoutGoalInput | PlanUpsertWithWhereUniqueWithoutGoalInput[]
    createMany?: PlanCreateManyGoalInputEnvelope
    set?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
    disconnect?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
    delete?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
    connect?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
    update?: PlanUpdateWithWhereUniqueWithoutGoalInput | PlanUpdateWithWhereUniqueWithoutGoalInput[]
    updateMany?: PlanUpdateManyWithWhereWithoutGoalInput | PlanUpdateManyWithWhereWithoutGoalInput[]
    deleteMany?: PlanScalarWhereInput | PlanScalarWhereInput[]
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

  export type TaskEvidenceMatchCreateNestedManyWithoutSubmissionInput = {
    create?: XOR<TaskEvidenceMatchCreateWithoutSubmissionInput, TaskEvidenceMatchUncheckedCreateWithoutSubmissionInput> | TaskEvidenceMatchCreateWithoutSubmissionInput[] | TaskEvidenceMatchUncheckedCreateWithoutSubmissionInput[]
    connectOrCreate?: TaskEvidenceMatchCreateOrConnectWithoutSubmissionInput | TaskEvidenceMatchCreateOrConnectWithoutSubmissionInput[]
    createMany?: TaskEvidenceMatchCreateManySubmissionInputEnvelope
    connect?: TaskEvidenceMatchWhereUniqueInput | TaskEvidenceMatchWhereUniqueInput[]
  }

  export type TaskEvidenceMatchUncheckedCreateNestedManyWithoutSubmissionInput = {
    create?: XOR<TaskEvidenceMatchCreateWithoutSubmissionInput, TaskEvidenceMatchUncheckedCreateWithoutSubmissionInput> | TaskEvidenceMatchCreateWithoutSubmissionInput[] | TaskEvidenceMatchUncheckedCreateWithoutSubmissionInput[]
    connectOrCreate?: TaskEvidenceMatchCreateOrConnectWithoutSubmissionInput | TaskEvidenceMatchCreateOrConnectWithoutSubmissionInput[]
    createMany?: TaskEvidenceMatchCreateManySubmissionInputEnvelope
    connect?: TaskEvidenceMatchWhereUniqueInput | TaskEvidenceMatchWhereUniqueInput[]
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

  export type TaskEvidenceMatchUpdateManyWithoutSubmissionNestedInput = {
    create?: XOR<TaskEvidenceMatchCreateWithoutSubmissionInput, TaskEvidenceMatchUncheckedCreateWithoutSubmissionInput> | TaskEvidenceMatchCreateWithoutSubmissionInput[] | TaskEvidenceMatchUncheckedCreateWithoutSubmissionInput[]
    connectOrCreate?: TaskEvidenceMatchCreateOrConnectWithoutSubmissionInput | TaskEvidenceMatchCreateOrConnectWithoutSubmissionInput[]
    upsert?: TaskEvidenceMatchUpsertWithWhereUniqueWithoutSubmissionInput | TaskEvidenceMatchUpsertWithWhereUniqueWithoutSubmissionInput[]
    createMany?: TaskEvidenceMatchCreateManySubmissionInputEnvelope
    set?: TaskEvidenceMatchWhereUniqueInput | TaskEvidenceMatchWhereUniqueInput[]
    disconnect?: TaskEvidenceMatchWhereUniqueInput | TaskEvidenceMatchWhereUniqueInput[]
    delete?: TaskEvidenceMatchWhereUniqueInput | TaskEvidenceMatchWhereUniqueInput[]
    connect?: TaskEvidenceMatchWhereUniqueInput | TaskEvidenceMatchWhereUniqueInput[]
    update?: TaskEvidenceMatchUpdateWithWhereUniqueWithoutSubmissionInput | TaskEvidenceMatchUpdateWithWhereUniqueWithoutSubmissionInput[]
    updateMany?: TaskEvidenceMatchUpdateManyWithWhereWithoutSubmissionInput | TaskEvidenceMatchUpdateManyWithWhereWithoutSubmissionInput[]
    deleteMany?: TaskEvidenceMatchScalarWhereInput | TaskEvidenceMatchScalarWhereInput[]
  }

  export type TaskEvidenceMatchUncheckedUpdateManyWithoutSubmissionNestedInput = {
    create?: XOR<TaskEvidenceMatchCreateWithoutSubmissionInput, TaskEvidenceMatchUncheckedCreateWithoutSubmissionInput> | TaskEvidenceMatchCreateWithoutSubmissionInput[] | TaskEvidenceMatchUncheckedCreateWithoutSubmissionInput[]
    connectOrCreate?: TaskEvidenceMatchCreateOrConnectWithoutSubmissionInput | TaskEvidenceMatchCreateOrConnectWithoutSubmissionInput[]
    upsert?: TaskEvidenceMatchUpsertWithWhereUniqueWithoutSubmissionInput | TaskEvidenceMatchUpsertWithWhereUniqueWithoutSubmissionInput[]
    createMany?: TaskEvidenceMatchCreateManySubmissionInputEnvelope
    set?: TaskEvidenceMatchWhereUniqueInput | TaskEvidenceMatchWhereUniqueInput[]
    disconnect?: TaskEvidenceMatchWhereUniqueInput | TaskEvidenceMatchWhereUniqueInput[]
    delete?: TaskEvidenceMatchWhereUniqueInput | TaskEvidenceMatchWhereUniqueInput[]
    connect?: TaskEvidenceMatchWhereUniqueInput | TaskEvidenceMatchWhereUniqueInput[]
    update?: TaskEvidenceMatchUpdateWithWhereUniqueWithoutSubmissionInput | TaskEvidenceMatchUpdateWithWhereUniqueWithoutSubmissionInput[]
    updateMany?: TaskEvidenceMatchUpdateManyWithWhereWithoutSubmissionInput | TaskEvidenceMatchUpdateManyWithWhereWithoutSubmissionInput[]
    deleteMany?: TaskEvidenceMatchScalarWhereInput | TaskEvidenceMatchScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutContestsInput = {
    create?: XOR<UserCreateWithoutContestsInput, UserUncheckedCreateWithoutContestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutContestsInput
    connect?: UserWhereUniqueInput
  }

  export type TaskEvidenceMatchCreateNestedManyWithoutContestHistoryInput = {
    create?: XOR<TaskEvidenceMatchCreateWithoutContestHistoryInput, TaskEvidenceMatchUncheckedCreateWithoutContestHistoryInput> | TaskEvidenceMatchCreateWithoutContestHistoryInput[] | TaskEvidenceMatchUncheckedCreateWithoutContestHistoryInput[]
    connectOrCreate?: TaskEvidenceMatchCreateOrConnectWithoutContestHistoryInput | TaskEvidenceMatchCreateOrConnectWithoutContestHistoryInput[]
    createMany?: TaskEvidenceMatchCreateManyContestHistoryInputEnvelope
    connect?: TaskEvidenceMatchWhereUniqueInput | TaskEvidenceMatchWhereUniqueInput[]
  }

  export type TaskEvidenceMatchUncheckedCreateNestedManyWithoutContestHistoryInput = {
    create?: XOR<TaskEvidenceMatchCreateWithoutContestHistoryInput, TaskEvidenceMatchUncheckedCreateWithoutContestHistoryInput> | TaskEvidenceMatchCreateWithoutContestHistoryInput[] | TaskEvidenceMatchUncheckedCreateWithoutContestHistoryInput[]
    connectOrCreate?: TaskEvidenceMatchCreateOrConnectWithoutContestHistoryInput | TaskEvidenceMatchCreateOrConnectWithoutContestHistoryInput[]
    createMany?: TaskEvidenceMatchCreateManyContestHistoryInputEnvelope
    connect?: TaskEvidenceMatchWhereUniqueInput | TaskEvidenceMatchWhereUniqueInput[]
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

  export type TaskEvidenceMatchUpdateManyWithoutContestHistoryNestedInput = {
    create?: XOR<TaskEvidenceMatchCreateWithoutContestHistoryInput, TaskEvidenceMatchUncheckedCreateWithoutContestHistoryInput> | TaskEvidenceMatchCreateWithoutContestHistoryInput[] | TaskEvidenceMatchUncheckedCreateWithoutContestHistoryInput[]
    connectOrCreate?: TaskEvidenceMatchCreateOrConnectWithoutContestHistoryInput | TaskEvidenceMatchCreateOrConnectWithoutContestHistoryInput[]
    upsert?: TaskEvidenceMatchUpsertWithWhereUniqueWithoutContestHistoryInput | TaskEvidenceMatchUpsertWithWhereUniqueWithoutContestHistoryInput[]
    createMany?: TaskEvidenceMatchCreateManyContestHistoryInputEnvelope
    set?: TaskEvidenceMatchWhereUniqueInput | TaskEvidenceMatchWhereUniqueInput[]
    disconnect?: TaskEvidenceMatchWhereUniqueInput | TaskEvidenceMatchWhereUniqueInput[]
    delete?: TaskEvidenceMatchWhereUniqueInput | TaskEvidenceMatchWhereUniqueInput[]
    connect?: TaskEvidenceMatchWhereUniqueInput | TaskEvidenceMatchWhereUniqueInput[]
    update?: TaskEvidenceMatchUpdateWithWhereUniqueWithoutContestHistoryInput | TaskEvidenceMatchUpdateWithWhereUniqueWithoutContestHistoryInput[]
    updateMany?: TaskEvidenceMatchUpdateManyWithWhereWithoutContestHistoryInput | TaskEvidenceMatchUpdateManyWithWhereWithoutContestHistoryInput[]
    deleteMany?: TaskEvidenceMatchScalarWhereInput | TaskEvidenceMatchScalarWhereInput[]
  }

  export type TaskEvidenceMatchUncheckedUpdateManyWithoutContestHistoryNestedInput = {
    create?: XOR<TaskEvidenceMatchCreateWithoutContestHistoryInput, TaskEvidenceMatchUncheckedCreateWithoutContestHistoryInput> | TaskEvidenceMatchCreateWithoutContestHistoryInput[] | TaskEvidenceMatchUncheckedCreateWithoutContestHistoryInput[]
    connectOrCreate?: TaskEvidenceMatchCreateOrConnectWithoutContestHistoryInput | TaskEvidenceMatchCreateOrConnectWithoutContestHistoryInput[]
    upsert?: TaskEvidenceMatchUpsertWithWhereUniqueWithoutContestHistoryInput | TaskEvidenceMatchUpsertWithWhereUniqueWithoutContestHistoryInput[]
    createMany?: TaskEvidenceMatchCreateManyContestHistoryInputEnvelope
    set?: TaskEvidenceMatchWhereUniqueInput | TaskEvidenceMatchWhereUniqueInput[]
    disconnect?: TaskEvidenceMatchWhereUniqueInput | TaskEvidenceMatchWhereUniqueInput[]
    delete?: TaskEvidenceMatchWhereUniqueInput | TaskEvidenceMatchWhereUniqueInput[]
    connect?: TaskEvidenceMatchWhereUniqueInput | TaskEvidenceMatchWhereUniqueInput[]
    update?: TaskEvidenceMatchUpdateWithWhereUniqueWithoutContestHistoryInput | TaskEvidenceMatchUpdateWithWhereUniqueWithoutContestHistoryInput[]
    updateMany?: TaskEvidenceMatchUpdateManyWithWhereWithoutContestHistoryInput | TaskEvidenceMatchUpdateManyWithWhereWithoutContestHistoryInput[]
    deleteMany?: TaskEvidenceMatchScalarWhereInput | TaskEvidenceMatchScalarWhereInput[]
  }

  export type GoalCreateNestedOneWithoutPlansInput = {
    create?: XOR<GoalCreateWithoutPlansInput, GoalUncheckedCreateWithoutPlansInput>
    connectOrCreate?: GoalCreateOrConnectWithoutPlansInput
    connect?: GoalWhereUniqueInput
  }

  export type PlanVersionCreateNestedManyWithoutPlanInput = {
    create?: XOR<PlanVersionCreateWithoutPlanInput, PlanVersionUncheckedCreateWithoutPlanInput> | PlanVersionCreateWithoutPlanInput[] | PlanVersionUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: PlanVersionCreateOrConnectWithoutPlanInput | PlanVersionCreateOrConnectWithoutPlanInput[]
    createMany?: PlanVersionCreateManyPlanInputEnvelope
    connect?: PlanVersionWhereUniqueInput | PlanVersionWhereUniqueInput[]
  }

  export type PlanEvaluationCreateNestedManyWithoutPlanInput = {
    create?: XOR<PlanEvaluationCreateWithoutPlanInput, PlanEvaluationUncheckedCreateWithoutPlanInput> | PlanEvaluationCreateWithoutPlanInput[] | PlanEvaluationUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: PlanEvaluationCreateOrConnectWithoutPlanInput | PlanEvaluationCreateOrConnectWithoutPlanInput[]
    createMany?: PlanEvaluationCreateManyPlanInputEnvelope
    connect?: PlanEvaluationWhereUniqueInput | PlanEvaluationWhereUniqueInput[]
  }

  export type PlanVersionUncheckedCreateNestedManyWithoutPlanInput = {
    create?: XOR<PlanVersionCreateWithoutPlanInput, PlanVersionUncheckedCreateWithoutPlanInput> | PlanVersionCreateWithoutPlanInput[] | PlanVersionUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: PlanVersionCreateOrConnectWithoutPlanInput | PlanVersionCreateOrConnectWithoutPlanInput[]
    createMany?: PlanVersionCreateManyPlanInputEnvelope
    connect?: PlanVersionWhereUniqueInput | PlanVersionWhereUniqueInput[]
  }

  export type PlanEvaluationUncheckedCreateNestedManyWithoutPlanInput = {
    create?: XOR<PlanEvaluationCreateWithoutPlanInput, PlanEvaluationUncheckedCreateWithoutPlanInput> | PlanEvaluationCreateWithoutPlanInput[] | PlanEvaluationUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: PlanEvaluationCreateOrConnectWithoutPlanInput | PlanEvaluationCreateOrConnectWithoutPlanInput[]
    createMany?: PlanEvaluationCreateManyPlanInputEnvelope
    connect?: PlanEvaluationWhereUniqueInput | PlanEvaluationWhereUniqueInput[]
  }

  export type GoalUpdateOneRequiredWithoutPlansNestedInput = {
    create?: XOR<GoalCreateWithoutPlansInput, GoalUncheckedCreateWithoutPlansInput>
    connectOrCreate?: GoalCreateOrConnectWithoutPlansInput
    upsert?: GoalUpsertWithoutPlansInput
    connect?: GoalWhereUniqueInput
    update?: XOR<XOR<GoalUpdateToOneWithWhereWithoutPlansInput, GoalUpdateWithoutPlansInput>, GoalUncheckedUpdateWithoutPlansInput>
  }

  export type PlanVersionUpdateManyWithoutPlanNestedInput = {
    create?: XOR<PlanVersionCreateWithoutPlanInput, PlanVersionUncheckedCreateWithoutPlanInput> | PlanVersionCreateWithoutPlanInput[] | PlanVersionUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: PlanVersionCreateOrConnectWithoutPlanInput | PlanVersionCreateOrConnectWithoutPlanInput[]
    upsert?: PlanVersionUpsertWithWhereUniqueWithoutPlanInput | PlanVersionUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: PlanVersionCreateManyPlanInputEnvelope
    set?: PlanVersionWhereUniqueInput | PlanVersionWhereUniqueInput[]
    disconnect?: PlanVersionWhereUniqueInput | PlanVersionWhereUniqueInput[]
    delete?: PlanVersionWhereUniqueInput | PlanVersionWhereUniqueInput[]
    connect?: PlanVersionWhereUniqueInput | PlanVersionWhereUniqueInput[]
    update?: PlanVersionUpdateWithWhereUniqueWithoutPlanInput | PlanVersionUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: PlanVersionUpdateManyWithWhereWithoutPlanInput | PlanVersionUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: PlanVersionScalarWhereInput | PlanVersionScalarWhereInput[]
  }

  export type PlanEvaluationUpdateManyWithoutPlanNestedInput = {
    create?: XOR<PlanEvaluationCreateWithoutPlanInput, PlanEvaluationUncheckedCreateWithoutPlanInput> | PlanEvaluationCreateWithoutPlanInput[] | PlanEvaluationUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: PlanEvaluationCreateOrConnectWithoutPlanInput | PlanEvaluationCreateOrConnectWithoutPlanInput[]
    upsert?: PlanEvaluationUpsertWithWhereUniqueWithoutPlanInput | PlanEvaluationUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: PlanEvaluationCreateManyPlanInputEnvelope
    set?: PlanEvaluationWhereUniqueInput | PlanEvaluationWhereUniqueInput[]
    disconnect?: PlanEvaluationWhereUniqueInput | PlanEvaluationWhereUniqueInput[]
    delete?: PlanEvaluationWhereUniqueInput | PlanEvaluationWhereUniqueInput[]
    connect?: PlanEvaluationWhereUniqueInput | PlanEvaluationWhereUniqueInput[]
    update?: PlanEvaluationUpdateWithWhereUniqueWithoutPlanInput | PlanEvaluationUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: PlanEvaluationUpdateManyWithWhereWithoutPlanInput | PlanEvaluationUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: PlanEvaluationScalarWhereInput | PlanEvaluationScalarWhereInput[]
  }

  export type PlanVersionUncheckedUpdateManyWithoutPlanNestedInput = {
    create?: XOR<PlanVersionCreateWithoutPlanInput, PlanVersionUncheckedCreateWithoutPlanInput> | PlanVersionCreateWithoutPlanInput[] | PlanVersionUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: PlanVersionCreateOrConnectWithoutPlanInput | PlanVersionCreateOrConnectWithoutPlanInput[]
    upsert?: PlanVersionUpsertWithWhereUniqueWithoutPlanInput | PlanVersionUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: PlanVersionCreateManyPlanInputEnvelope
    set?: PlanVersionWhereUniqueInput | PlanVersionWhereUniqueInput[]
    disconnect?: PlanVersionWhereUniqueInput | PlanVersionWhereUniqueInput[]
    delete?: PlanVersionWhereUniqueInput | PlanVersionWhereUniqueInput[]
    connect?: PlanVersionWhereUniqueInput | PlanVersionWhereUniqueInput[]
    update?: PlanVersionUpdateWithWhereUniqueWithoutPlanInput | PlanVersionUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: PlanVersionUpdateManyWithWhereWithoutPlanInput | PlanVersionUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: PlanVersionScalarWhereInput | PlanVersionScalarWhereInput[]
  }

  export type PlanEvaluationUncheckedUpdateManyWithoutPlanNestedInput = {
    create?: XOR<PlanEvaluationCreateWithoutPlanInput, PlanEvaluationUncheckedCreateWithoutPlanInput> | PlanEvaluationCreateWithoutPlanInput[] | PlanEvaluationUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: PlanEvaluationCreateOrConnectWithoutPlanInput | PlanEvaluationCreateOrConnectWithoutPlanInput[]
    upsert?: PlanEvaluationUpsertWithWhereUniqueWithoutPlanInput | PlanEvaluationUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: PlanEvaluationCreateManyPlanInputEnvelope
    set?: PlanEvaluationWhereUniqueInput | PlanEvaluationWhereUniqueInput[]
    disconnect?: PlanEvaluationWhereUniqueInput | PlanEvaluationWhereUniqueInput[]
    delete?: PlanEvaluationWhereUniqueInput | PlanEvaluationWhereUniqueInput[]
    connect?: PlanEvaluationWhereUniqueInput | PlanEvaluationWhereUniqueInput[]
    update?: PlanEvaluationUpdateWithWhereUniqueWithoutPlanInput | PlanEvaluationUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: PlanEvaluationUpdateManyWithWhereWithoutPlanInput | PlanEvaluationUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: PlanEvaluationScalarWhereInput | PlanEvaluationScalarWhereInput[]
  }

  export type PlanCreateNestedOneWithoutVersionsInput = {
    create?: XOR<PlanCreateWithoutVersionsInput, PlanUncheckedCreateWithoutVersionsInput>
    connectOrCreate?: PlanCreateOrConnectWithoutVersionsInput
    connect?: PlanWhereUniqueInput
  }

  export type PlanTaskCreateNestedManyWithoutPlanVersionInput = {
    create?: XOR<PlanTaskCreateWithoutPlanVersionInput, PlanTaskUncheckedCreateWithoutPlanVersionInput> | PlanTaskCreateWithoutPlanVersionInput[] | PlanTaskUncheckedCreateWithoutPlanVersionInput[]
    connectOrCreate?: PlanTaskCreateOrConnectWithoutPlanVersionInput | PlanTaskCreateOrConnectWithoutPlanVersionInput[]
    createMany?: PlanTaskCreateManyPlanVersionInputEnvelope
    connect?: PlanTaskWhereUniqueInput | PlanTaskWhereUniqueInput[]
  }

  export type PlanTaskUncheckedCreateNestedManyWithoutPlanVersionInput = {
    create?: XOR<PlanTaskCreateWithoutPlanVersionInput, PlanTaskUncheckedCreateWithoutPlanVersionInput> | PlanTaskCreateWithoutPlanVersionInput[] | PlanTaskUncheckedCreateWithoutPlanVersionInput[]
    connectOrCreate?: PlanTaskCreateOrConnectWithoutPlanVersionInput | PlanTaskCreateOrConnectWithoutPlanVersionInput[]
    createMany?: PlanTaskCreateManyPlanVersionInputEnvelope
    connect?: PlanTaskWhereUniqueInput | PlanTaskWhereUniqueInput[]
  }

  export type PlanUpdateOneRequiredWithoutVersionsNestedInput = {
    create?: XOR<PlanCreateWithoutVersionsInput, PlanUncheckedCreateWithoutVersionsInput>
    connectOrCreate?: PlanCreateOrConnectWithoutVersionsInput
    upsert?: PlanUpsertWithoutVersionsInput
    connect?: PlanWhereUniqueInput
    update?: XOR<XOR<PlanUpdateToOneWithWhereWithoutVersionsInput, PlanUpdateWithoutVersionsInput>, PlanUncheckedUpdateWithoutVersionsInput>
  }

  export type PlanTaskUpdateManyWithoutPlanVersionNestedInput = {
    create?: XOR<PlanTaskCreateWithoutPlanVersionInput, PlanTaskUncheckedCreateWithoutPlanVersionInput> | PlanTaskCreateWithoutPlanVersionInput[] | PlanTaskUncheckedCreateWithoutPlanVersionInput[]
    connectOrCreate?: PlanTaskCreateOrConnectWithoutPlanVersionInput | PlanTaskCreateOrConnectWithoutPlanVersionInput[]
    upsert?: PlanTaskUpsertWithWhereUniqueWithoutPlanVersionInput | PlanTaskUpsertWithWhereUniqueWithoutPlanVersionInput[]
    createMany?: PlanTaskCreateManyPlanVersionInputEnvelope
    set?: PlanTaskWhereUniqueInput | PlanTaskWhereUniqueInput[]
    disconnect?: PlanTaskWhereUniqueInput | PlanTaskWhereUniqueInput[]
    delete?: PlanTaskWhereUniqueInput | PlanTaskWhereUniqueInput[]
    connect?: PlanTaskWhereUniqueInput | PlanTaskWhereUniqueInput[]
    update?: PlanTaskUpdateWithWhereUniqueWithoutPlanVersionInput | PlanTaskUpdateWithWhereUniqueWithoutPlanVersionInput[]
    updateMany?: PlanTaskUpdateManyWithWhereWithoutPlanVersionInput | PlanTaskUpdateManyWithWhereWithoutPlanVersionInput[]
    deleteMany?: PlanTaskScalarWhereInput | PlanTaskScalarWhereInput[]
  }

  export type PlanTaskUncheckedUpdateManyWithoutPlanVersionNestedInput = {
    create?: XOR<PlanTaskCreateWithoutPlanVersionInput, PlanTaskUncheckedCreateWithoutPlanVersionInput> | PlanTaskCreateWithoutPlanVersionInput[] | PlanTaskUncheckedCreateWithoutPlanVersionInput[]
    connectOrCreate?: PlanTaskCreateOrConnectWithoutPlanVersionInput | PlanTaskCreateOrConnectWithoutPlanVersionInput[]
    upsert?: PlanTaskUpsertWithWhereUniqueWithoutPlanVersionInput | PlanTaskUpsertWithWhereUniqueWithoutPlanVersionInput[]
    createMany?: PlanTaskCreateManyPlanVersionInputEnvelope
    set?: PlanTaskWhereUniqueInput | PlanTaskWhereUniqueInput[]
    disconnect?: PlanTaskWhereUniqueInput | PlanTaskWhereUniqueInput[]
    delete?: PlanTaskWhereUniqueInput | PlanTaskWhereUniqueInput[]
    connect?: PlanTaskWhereUniqueInput | PlanTaskWhereUniqueInput[]
    update?: PlanTaskUpdateWithWhereUniqueWithoutPlanVersionInput | PlanTaskUpdateWithWhereUniqueWithoutPlanVersionInput[]
    updateMany?: PlanTaskUpdateManyWithWhereWithoutPlanVersionInput | PlanTaskUpdateManyWithWhereWithoutPlanVersionInput[]
    deleteMany?: PlanTaskScalarWhereInput | PlanTaskScalarWhereInput[]
  }

  export type PlanVersionCreateNestedOneWithoutTasksInput = {
    create?: XOR<PlanVersionCreateWithoutTasksInput, PlanVersionUncheckedCreateWithoutTasksInput>
    connectOrCreate?: PlanVersionCreateOrConnectWithoutTasksInput
    connect?: PlanVersionWhereUniqueInput
  }

  export type TaskEvidenceMatchCreateNestedManyWithoutTaskInput = {
    create?: XOR<TaskEvidenceMatchCreateWithoutTaskInput, TaskEvidenceMatchUncheckedCreateWithoutTaskInput> | TaskEvidenceMatchCreateWithoutTaskInput[] | TaskEvidenceMatchUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskEvidenceMatchCreateOrConnectWithoutTaskInput | TaskEvidenceMatchCreateOrConnectWithoutTaskInput[]
    createMany?: TaskEvidenceMatchCreateManyTaskInputEnvelope
    connect?: TaskEvidenceMatchWhereUniqueInput | TaskEvidenceMatchWhereUniqueInput[]
  }

  export type TaskEvidenceMatchUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<TaskEvidenceMatchCreateWithoutTaskInput, TaskEvidenceMatchUncheckedCreateWithoutTaskInput> | TaskEvidenceMatchCreateWithoutTaskInput[] | TaskEvidenceMatchUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskEvidenceMatchCreateOrConnectWithoutTaskInput | TaskEvidenceMatchCreateOrConnectWithoutTaskInput[]
    createMany?: TaskEvidenceMatchCreateManyTaskInputEnvelope
    connect?: TaskEvidenceMatchWhereUniqueInput | TaskEvidenceMatchWhereUniqueInput[]
  }

  export type PlanVersionUpdateOneRequiredWithoutTasksNestedInput = {
    create?: XOR<PlanVersionCreateWithoutTasksInput, PlanVersionUncheckedCreateWithoutTasksInput>
    connectOrCreate?: PlanVersionCreateOrConnectWithoutTasksInput
    upsert?: PlanVersionUpsertWithoutTasksInput
    connect?: PlanVersionWhereUniqueInput
    update?: XOR<XOR<PlanVersionUpdateToOneWithWhereWithoutTasksInput, PlanVersionUpdateWithoutTasksInput>, PlanVersionUncheckedUpdateWithoutTasksInput>
  }

  export type TaskEvidenceMatchUpdateManyWithoutTaskNestedInput = {
    create?: XOR<TaskEvidenceMatchCreateWithoutTaskInput, TaskEvidenceMatchUncheckedCreateWithoutTaskInput> | TaskEvidenceMatchCreateWithoutTaskInput[] | TaskEvidenceMatchUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskEvidenceMatchCreateOrConnectWithoutTaskInput | TaskEvidenceMatchCreateOrConnectWithoutTaskInput[]
    upsert?: TaskEvidenceMatchUpsertWithWhereUniqueWithoutTaskInput | TaskEvidenceMatchUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: TaskEvidenceMatchCreateManyTaskInputEnvelope
    set?: TaskEvidenceMatchWhereUniqueInput | TaskEvidenceMatchWhereUniqueInput[]
    disconnect?: TaskEvidenceMatchWhereUniqueInput | TaskEvidenceMatchWhereUniqueInput[]
    delete?: TaskEvidenceMatchWhereUniqueInput | TaskEvidenceMatchWhereUniqueInput[]
    connect?: TaskEvidenceMatchWhereUniqueInput | TaskEvidenceMatchWhereUniqueInput[]
    update?: TaskEvidenceMatchUpdateWithWhereUniqueWithoutTaskInput | TaskEvidenceMatchUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: TaskEvidenceMatchUpdateManyWithWhereWithoutTaskInput | TaskEvidenceMatchUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: TaskEvidenceMatchScalarWhereInput | TaskEvidenceMatchScalarWhereInput[]
  }

  export type TaskEvidenceMatchUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<TaskEvidenceMatchCreateWithoutTaskInput, TaskEvidenceMatchUncheckedCreateWithoutTaskInput> | TaskEvidenceMatchCreateWithoutTaskInput[] | TaskEvidenceMatchUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskEvidenceMatchCreateOrConnectWithoutTaskInput | TaskEvidenceMatchCreateOrConnectWithoutTaskInput[]
    upsert?: TaskEvidenceMatchUpsertWithWhereUniqueWithoutTaskInput | TaskEvidenceMatchUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: TaskEvidenceMatchCreateManyTaskInputEnvelope
    set?: TaskEvidenceMatchWhereUniqueInput | TaskEvidenceMatchWhereUniqueInput[]
    disconnect?: TaskEvidenceMatchWhereUniqueInput | TaskEvidenceMatchWhereUniqueInput[]
    delete?: TaskEvidenceMatchWhereUniqueInput | TaskEvidenceMatchWhereUniqueInput[]
    connect?: TaskEvidenceMatchWhereUniqueInput | TaskEvidenceMatchWhereUniqueInput[]
    update?: TaskEvidenceMatchUpdateWithWhereUniqueWithoutTaskInput | TaskEvidenceMatchUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: TaskEvidenceMatchUpdateManyWithWhereWithoutTaskInput | TaskEvidenceMatchUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: TaskEvidenceMatchScalarWhereInput | TaskEvidenceMatchScalarWhereInput[]
  }

  export type PlanTaskCreateNestedOneWithoutMatchesInput = {
    create?: XOR<PlanTaskCreateWithoutMatchesInput, PlanTaskUncheckedCreateWithoutMatchesInput>
    connectOrCreate?: PlanTaskCreateOrConnectWithoutMatchesInput
    connect?: PlanTaskWhereUniqueInput
  }

  export type NormalizedSubmissionCreateNestedOneWithoutTaskMatchesInput = {
    create?: XOR<NormalizedSubmissionCreateWithoutTaskMatchesInput, NormalizedSubmissionUncheckedCreateWithoutTaskMatchesInput>
    connectOrCreate?: NormalizedSubmissionCreateOrConnectWithoutTaskMatchesInput
    connect?: NormalizedSubmissionWhereUniqueInput
  }

  export type ContestHistoryCreateNestedOneWithoutTaskMatchesInput = {
    create?: XOR<ContestHistoryCreateWithoutTaskMatchesInput, ContestHistoryUncheckedCreateWithoutTaskMatchesInput>
    connectOrCreate?: ContestHistoryCreateOrConnectWithoutTaskMatchesInput
    connect?: ContestHistoryWhereUniqueInput
  }

  export type PlanTaskUpdateOneRequiredWithoutMatchesNestedInput = {
    create?: XOR<PlanTaskCreateWithoutMatchesInput, PlanTaskUncheckedCreateWithoutMatchesInput>
    connectOrCreate?: PlanTaskCreateOrConnectWithoutMatchesInput
    upsert?: PlanTaskUpsertWithoutMatchesInput
    connect?: PlanTaskWhereUniqueInput
    update?: XOR<XOR<PlanTaskUpdateToOneWithWhereWithoutMatchesInput, PlanTaskUpdateWithoutMatchesInput>, PlanTaskUncheckedUpdateWithoutMatchesInput>
  }

  export type NormalizedSubmissionUpdateOneWithoutTaskMatchesNestedInput = {
    create?: XOR<NormalizedSubmissionCreateWithoutTaskMatchesInput, NormalizedSubmissionUncheckedCreateWithoutTaskMatchesInput>
    connectOrCreate?: NormalizedSubmissionCreateOrConnectWithoutTaskMatchesInput
    upsert?: NormalizedSubmissionUpsertWithoutTaskMatchesInput
    disconnect?: NormalizedSubmissionWhereInput | boolean
    delete?: NormalizedSubmissionWhereInput | boolean
    connect?: NormalizedSubmissionWhereUniqueInput
    update?: XOR<XOR<NormalizedSubmissionUpdateToOneWithWhereWithoutTaskMatchesInput, NormalizedSubmissionUpdateWithoutTaskMatchesInput>, NormalizedSubmissionUncheckedUpdateWithoutTaskMatchesInput>
  }

  export type ContestHistoryUpdateOneWithoutTaskMatchesNestedInput = {
    create?: XOR<ContestHistoryCreateWithoutTaskMatchesInput, ContestHistoryUncheckedCreateWithoutTaskMatchesInput>
    connectOrCreate?: ContestHistoryCreateOrConnectWithoutTaskMatchesInput
    upsert?: ContestHistoryUpsertWithoutTaskMatchesInput
    disconnect?: ContestHistoryWhereInput | boolean
    delete?: ContestHistoryWhereInput | boolean
    connect?: ContestHistoryWhereUniqueInput
    update?: XOR<XOR<ContestHistoryUpdateToOneWithWhereWithoutTaskMatchesInput, ContestHistoryUpdateWithoutTaskMatchesInput>, ContestHistoryUncheckedUpdateWithoutTaskMatchesInput>
  }

  export type PlanCreateNestedOneWithoutEvaluationsInput = {
    create?: XOR<PlanCreateWithoutEvaluationsInput, PlanUncheckedCreateWithoutEvaluationsInput>
    connectOrCreate?: PlanCreateOrConnectWithoutEvaluationsInput
    connect?: PlanWhereUniqueInput
  }

  export type PlanUpdateOneRequiredWithoutEvaluationsNestedInput = {
    create?: XOR<PlanCreateWithoutEvaluationsInput, PlanUncheckedCreateWithoutEvaluationsInput>
    connectOrCreate?: PlanCreateOrConnectWithoutEvaluationsInput
    upsert?: PlanUpsertWithoutEvaluationsInput
    connect?: PlanWhereUniqueInput
    update?: XOR<XOR<PlanUpdateToOneWithWhereWithoutEvaluationsInput, PlanUpdateWithoutEvaluationsInput>, PlanUncheckedUpdateWithoutEvaluationsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
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

  export type SessionCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
    createdAt?: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
    createdAt?: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
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
    plans?: PlanCreateNestedManyWithoutGoalInput
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
    plans?: PlanUncheckedCreateNestedManyWithoutGoalInput
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
    taskMatches?: TaskEvidenceMatchCreateNestedManyWithoutSubmissionInput
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
    taskMatches?: TaskEvidenceMatchUncheckedCreateNestedManyWithoutSubmissionInput
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
    taskMatches?: TaskEvidenceMatchCreateNestedManyWithoutContestHistoryInput
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
    taskMatches?: TaskEvidenceMatchUncheckedCreateNestedManyWithoutContestHistoryInput
  }

  export type ContestHistoryCreateOrConnectWithoutUserInput = {
    where: ContestHistoryWhereUniqueInput
    create: XOR<ContestHistoryCreateWithoutUserInput, ContestHistoryUncheckedCreateWithoutUserInput>
  }

  export type ContestHistoryCreateManyUserInputEnvelope = {
    data: ContestHistoryCreateManyUserInput | ContestHistoryCreateManyUserInput[]
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
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
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    connections?: PlatformConnectionCreateNestedManyWithoutUserInput
    submissions?: NormalizedSubmissionCreateNestedManyWithoutUserInput
    contests?: ContestHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutGoalsInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    connections?: PlatformConnectionUncheckedCreateNestedManyWithoutUserInput
    submissions?: NormalizedSubmissionUncheckedCreateNestedManyWithoutUserInput
    contests?: ContestHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutGoalsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGoalsInput, UserUncheckedCreateWithoutGoalsInput>
  }

  export type PlanCreateWithoutGoalInput = {
    id?: string
    userId: string
    status?: string
    currentVersionNum?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    versions?: PlanVersionCreateNestedManyWithoutPlanInput
    evaluations?: PlanEvaluationCreateNestedManyWithoutPlanInput
  }

  export type PlanUncheckedCreateWithoutGoalInput = {
    id?: string
    userId: string
    status?: string
    currentVersionNum?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    versions?: PlanVersionUncheckedCreateNestedManyWithoutPlanInput
    evaluations?: PlanEvaluationUncheckedCreateNestedManyWithoutPlanInput
  }

  export type PlanCreateOrConnectWithoutGoalInput = {
    where: PlanWhereUniqueInput
    create: XOR<PlanCreateWithoutGoalInput, PlanUncheckedCreateWithoutGoalInput>
  }

  export type PlanCreateManyGoalInputEnvelope = {
    data: PlanCreateManyGoalInput | PlanCreateManyGoalInput[]
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
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    connections?: PlatformConnectionUpdateManyWithoutUserNestedInput
    submissions?: NormalizedSubmissionUpdateManyWithoutUserNestedInput
    contests?: ContestHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutGoalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    connections?: PlatformConnectionUncheckedUpdateManyWithoutUserNestedInput
    submissions?: NormalizedSubmissionUncheckedUpdateManyWithoutUserNestedInput
    contests?: ContestHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PlanUpsertWithWhereUniqueWithoutGoalInput = {
    where: PlanWhereUniqueInput
    update: XOR<PlanUpdateWithoutGoalInput, PlanUncheckedUpdateWithoutGoalInput>
    create: XOR<PlanCreateWithoutGoalInput, PlanUncheckedCreateWithoutGoalInput>
  }

  export type PlanUpdateWithWhereUniqueWithoutGoalInput = {
    where: PlanWhereUniqueInput
    data: XOR<PlanUpdateWithoutGoalInput, PlanUncheckedUpdateWithoutGoalInput>
  }

  export type PlanUpdateManyWithWhereWithoutGoalInput = {
    where: PlanScalarWhereInput
    data: XOR<PlanUpdateManyMutationInput, PlanUncheckedUpdateManyWithoutGoalInput>
  }

  export type PlanScalarWhereInput = {
    AND?: PlanScalarWhereInput | PlanScalarWhereInput[]
    OR?: PlanScalarWhereInput[]
    NOT?: PlanScalarWhereInput | PlanScalarWhereInput[]
    id?: StringFilter<"Plan"> | string
    goalId?: StringFilter<"Plan"> | string
    userId?: StringFilter<"Plan"> | string
    status?: StringFilter<"Plan"> | string
    currentVersionNum?: IntFilter<"Plan"> | number
    createdAt?: DateTimeFilter<"Plan"> | Date | string
    updatedAt?: DateTimeFilter<"Plan"> | Date | string
  }

  export type UserCreateWithoutConnectionsInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    goals?: GoalCreateNestedManyWithoutUserInput
    submissions?: NormalizedSubmissionCreateNestedManyWithoutUserInput
    contests?: ContestHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutConnectionsInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
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
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    goals?: GoalUpdateManyWithoutUserNestedInput
    submissions?: NormalizedSubmissionUpdateManyWithoutUserNestedInput
    contests?: ContestHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutConnectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
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
    taskMatches?: TaskEvidenceMatchCreateNestedManyWithoutSubmissionInput
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
    taskMatches?: TaskEvidenceMatchUncheckedCreateNestedManyWithoutSubmissionInput
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
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    goals?: GoalCreateNestedManyWithoutUserInput
    connections?: PlatformConnectionCreateNestedManyWithoutUserInput
    contests?: ContestHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSubmissionsInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
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

  export type TaskEvidenceMatchCreateWithoutSubmissionInput = {
    id?: string
    matchedAt?: Date | string
    notes?: string | null
    task: PlanTaskCreateNestedOneWithoutMatchesInput
    contestHistory?: ContestHistoryCreateNestedOneWithoutTaskMatchesInput
  }

  export type TaskEvidenceMatchUncheckedCreateWithoutSubmissionInput = {
    id?: string
    taskId: string
    contestHistoryId?: string | null
    matchedAt?: Date | string
    notes?: string | null
  }

  export type TaskEvidenceMatchCreateOrConnectWithoutSubmissionInput = {
    where: TaskEvidenceMatchWhereUniqueInput
    create: XOR<TaskEvidenceMatchCreateWithoutSubmissionInput, TaskEvidenceMatchUncheckedCreateWithoutSubmissionInput>
  }

  export type TaskEvidenceMatchCreateManySubmissionInputEnvelope = {
    data: TaskEvidenceMatchCreateManySubmissionInput | TaskEvidenceMatchCreateManySubmissionInput[]
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
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    goals?: GoalUpdateManyWithoutUserNestedInput
    connections?: PlatformConnectionUpdateManyWithoutUserNestedInput
    contests?: ContestHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
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

  export type TaskEvidenceMatchUpsertWithWhereUniqueWithoutSubmissionInput = {
    where: TaskEvidenceMatchWhereUniqueInput
    update: XOR<TaskEvidenceMatchUpdateWithoutSubmissionInput, TaskEvidenceMatchUncheckedUpdateWithoutSubmissionInput>
    create: XOR<TaskEvidenceMatchCreateWithoutSubmissionInput, TaskEvidenceMatchUncheckedCreateWithoutSubmissionInput>
  }

  export type TaskEvidenceMatchUpdateWithWhereUniqueWithoutSubmissionInput = {
    where: TaskEvidenceMatchWhereUniqueInput
    data: XOR<TaskEvidenceMatchUpdateWithoutSubmissionInput, TaskEvidenceMatchUncheckedUpdateWithoutSubmissionInput>
  }

  export type TaskEvidenceMatchUpdateManyWithWhereWithoutSubmissionInput = {
    where: TaskEvidenceMatchScalarWhereInput
    data: XOR<TaskEvidenceMatchUpdateManyMutationInput, TaskEvidenceMatchUncheckedUpdateManyWithoutSubmissionInput>
  }

  export type TaskEvidenceMatchScalarWhereInput = {
    AND?: TaskEvidenceMatchScalarWhereInput | TaskEvidenceMatchScalarWhereInput[]
    OR?: TaskEvidenceMatchScalarWhereInput[]
    NOT?: TaskEvidenceMatchScalarWhereInput | TaskEvidenceMatchScalarWhereInput[]
    id?: StringFilter<"TaskEvidenceMatch"> | string
    taskId?: StringFilter<"TaskEvidenceMatch"> | string
    submissionId?: StringNullableFilter<"TaskEvidenceMatch"> | string | null
    contestHistoryId?: StringNullableFilter<"TaskEvidenceMatch"> | string | null
    matchedAt?: DateTimeFilter<"TaskEvidenceMatch"> | Date | string
    notes?: StringNullableFilter<"TaskEvidenceMatch"> | string | null
  }

  export type UserCreateWithoutContestsInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    goals?: GoalCreateNestedManyWithoutUserInput
    connections?: PlatformConnectionCreateNestedManyWithoutUserInput
    submissions?: NormalizedSubmissionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutContestsInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    goals?: GoalUncheckedCreateNestedManyWithoutUserInput
    connections?: PlatformConnectionUncheckedCreateNestedManyWithoutUserInput
    submissions?: NormalizedSubmissionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutContestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutContestsInput, UserUncheckedCreateWithoutContestsInput>
  }

  export type TaskEvidenceMatchCreateWithoutContestHistoryInput = {
    id?: string
    matchedAt?: Date | string
    notes?: string | null
    task: PlanTaskCreateNestedOneWithoutMatchesInput
    submission?: NormalizedSubmissionCreateNestedOneWithoutTaskMatchesInput
  }

  export type TaskEvidenceMatchUncheckedCreateWithoutContestHistoryInput = {
    id?: string
    taskId: string
    submissionId?: string | null
    matchedAt?: Date | string
    notes?: string | null
  }

  export type TaskEvidenceMatchCreateOrConnectWithoutContestHistoryInput = {
    where: TaskEvidenceMatchWhereUniqueInput
    create: XOR<TaskEvidenceMatchCreateWithoutContestHistoryInput, TaskEvidenceMatchUncheckedCreateWithoutContestHistoryInput>
  }

  export type TaskEvidenceMatchCreateManyContestHistoryInputEnvelope = {
    data: TaskEvidenceMatchCreateManyContestHistoryInput | TaskEvidenceMatchCreateManyContestHistoryInput[]
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
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    goals?: GoalUpdateManyWithoutUserNestedInput
    connections?: PlatformConnectionUpdateManyWithoutUserNestedInput
    submissions?: NormalizedSubmissionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutContestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    goals?: GoalUncheckedUpdateManyWithoutUserNestedInput
    connections?: PlatformConnectionUncheckedUpdateManyWithoutUserNestedInput
    submissions?: NormalizedSubmissionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TaskEvidenceMatchUpsertWithWhereUniqueWithoutContestHistoryInput = {
    where: TaskEvidenceMatchWhereUniqueInput
    update: XOR<TaskEvidenceMatchUpdateWithoutContestHistoryInput, TaskEvidenceMatchUncheckedUpdateWithoutContestHistoryInput>
    create: XOR<TaskEvidenceMatchCreateWithoutContestHistoryInput, TaskEvidenceMatchUncheckedCreateWithoutContestHistoryInput>
  }

  export type TaskEvidenceMatchUpdateWithWhereUniqueWithoutContestHistoryInput = {
    where: TaskEvidenceMatchWhereUniqueInput
    data: XOR<TaskEvidenceMatchUpdateWithoutContestHistoryInput, TaskEvidenceMatchUncheckedUpdateWithoutContestHistoryInput>
  }

  export type TaskEvidenceMatchUpdateManyWithWhereWithoutContestHistoryInput = {
    where: TaskEvidenceMatchScalarWhereInput
    data: XOR<TaskEvidenceMatchUpdateManyMutationInput, TaskEvidenceMatchUncheckedUpdateManyWithoutContestHistoryInput>
  }

  export type GoalCreateWithoutPlansInput = {
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

  export type GoalUncheckedCreateWithoutPlansInput = {
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

  export type GoalCreateOrConnectWithoutPlansInput = {
    where: GoalWhereUniqueInput
    create: XOR<GoalCreateWithoutPlansInput, GoalUncheckedCreateWithoutPlansInput>
  }

  export type PlanVersionCreateWithoutPlanInput = {
    id?: string
    versionNumber: number
    schemaVersion?: string
    summary: string
    milestoneTitle: string
    bottleneckType: string
    planData: string
    startDate: Date | string
    targetReviewDate: Date | string
    createdAt?: Date | string
    tasks?: PlanTaskCreateNestedManyWithoutPlanVersionInput
  }

  export type PlanVersionUncheckedCreateWithoutPlanInput = {
    id?: string
    versionNumber: number
    schemaVersion?: string
    summary: string
    milestoneTitle: string
    bottleneckType: string
    planData: string
    startDate: Date | string
    targetReviewDate: Date | string
    createdAt?: Date | string
    tasks?: PlanTaskUncheckedCreateNestedManyWithoutPlanVersionInput
  }

  export type PlanVersionCreateOrConnectWithoutPlanInput = {
    where: PlanVersionWhereUniqueInput
    create: XOR<PlanVersionCreateWithoutPlanInput, PlanVersionUncheckedCreateWithoutPlanInput>
  }

  export type PlanVersionCreateManyPlanInputEnvelope = {
    data: PlanVersionCreateManyPlanInput | PlanVersionCreateManyPlanInput[]
  }

  export type PlanEvaluationCreateWithoutPlanInput = {
    id?: string
    evaluatedVersionNum: number
    completionRate: number
    tasksPlanned: number
    tasksCompleted: number
    ratingChange?: number | null
    outcomeData: string
    evaluatedAt?: Date | string
  }

  export type PlanEvaluationUncheckedCreateWithoutPlanInput = {
    id?: string
    evaluatedVersionNum: number
    completionRate: number
    tasksPlanned: number
    tasksCompleted: number
    ratingChange?: number | null
    outcomeData: string
    evaluatedAt?: Date | string
  }

  export type PlanEvaluationCreateOrConnectWithoutPlanInput = {
    where: PlanEvaluationWhereUniqueInput
    create: XOR<PlanEvaluationCreateWithoutPlanInput, PlanEvaluationUncheckedCreateWithoutPlanInput>
  }

  export type PlanEvaluationCreateManyPlanInputEnvelope = {
    data: PlanEvaluationCreateManyPlanInput | PlanEvaluationCreateManyPlanInput[]
  }

  export type GoalUpsertWithoutPlansInput = {
    update: XOR<GoalUpdateWithoutPlansInput, GoalUncheckedUpdateWithoutPlansInput>
    create: XOR<GoalCreateWithoutPlansInput, GoalUncheckedCreateWithoutPlansInput>
    where?: GoalWhereInput
  }

  export type GoalUpdateToOneWithWhereWithoutPlansInput = {
    where?: GoalWhereInput
    data: XOR<GoalUpdateWithoutPlansInput, GoalUncheckedUpdateWithoutPlansInput>
  }

  export type GoalUpdateWithoutPlansInput = {
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

  export type GoalUncheckedUpdateWithoutPlansInput = {
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

  export type PlanVersionUpsertWithWhereUniqueWithoutPlanInput = {
    where: PlanVersionWhereUniqueInput
    update: XOR<PlanVersionUpdateWithoutPlanInput, PlanVersionUncheckedUpdateWithoutPlanInput>
    create: XOR<PlanVersionCreateWithoutPlanInput, PlanVersionUncheckedCreateWithoutPlanInput>
  }

  export type PlanVersionUpdateWithWhereUniqueWithoutPlanInput = {
    where: PlanVersionWhereUniqueInput
    data: XOR<PlanVersionUpdateWithoutPlanInput, PlanVersionUncheckedUpdateWithoutPlanInput>
  }

  export type PlanVersionUpdateManyWithWhereWithoutPlanInput = {
    where: PlanVersionScalarWhereInput
    data: XOR<PlanVersionUpdateManyMutationInput, PlanVersionUncheckedUpdateManyWithoutPlanInput>
  }

  export type PlanVersionScalarWhereInput = {
    AND?: PlanVersionScalarWhereInput | PlanVersionScalarWhereInput[]
    OR?: PlanVersionScalarWhereInput[]
    NOT?: PlanVersionScalarWhereInput | PlanVersionScalarWhereInput[]
    id?: StringFilter<"PlanVersion"> | string
    planId?: StringFilter<"PlanVersion"> | string
    versionNumber?: IntFilter<"PlanVersion"> | number
    schemaVersion?: StringFilter<"PlanVersion"> | string
    summary?: StringFilter<"PlanVersion"> | string
    milestoneTitle?: StringFilter<"PlanVersion"> | string
    bottleneckType?: StringFilter<"PlanVersion"> | string
    planData?: StringFilter<"PlanVersion"> | string
    startDate?: DateTimeFilter<"PlanVersion"> | Date | string
    targetReviewDate?: DateTimeFilter<"PlanVersion"> | Date | string
    createdAt?: DateTimeFilter<"PlanVersion"> | Date | string
  }

  export type PlanEvaluationUpsertWithWhereUniqueWithoutPlanInput = {
    where: PlanEvaluationWhereUniqueInput
    update: XOR<PlanEvaluationUpdateWithoutPlanInput, PlanEvaluationUncheckedUpdateWithoutPlanInput>
    create: XOR<PlanEvaluationCreateWithoutPlanInput, PlanEvaluationUncheckedCreateWithoutPlanInput>
  }

  export type PlanEvaluationUpdateWithWhereUniqueWithoutPlanInput = {
    where: PlanEvaluationWhereUniqueInput
    data: XOR<PlanEvaluationUpdateWithoutPlanInput, PlanEvaluationUncheckedUpdateWithoutPlanInput>
  }

  export type PlanEvaluationUpdateManyWithWhereWithoutPlanInput = {
    where: PlanEvaluationScalarWhereInput
    data: XOR<PlanEvaluationUpdateManyMutationInput, PlanEvaluationUncheckedUpdateManyWithoutPlanInput>
  }

  export type PlanEvaluationScalarWhereInput = {
    AND?: PlanEvaluationScalarWhereInput | PlanEvaluationScalarWhereInput[]
    OR?: PlanEvaluationScalarWhereInput[]
    NOT?: PlanEvaluationScalarWhereInput | PlanEvaluationScalarWhereInput[]
    id?: StringFilter<"PlanEvaluation"> | string
    planId?: StringFilter<"PlanEvaluation"> | string
    evaluatedVersionNum?: IntFilter<"PlanEvaluation"> | number
    completionRate?: FloatFilter<"PlanEvaluation"> | number
    tasksPlanned?: IntFilter<"PlanEvaluation"> | number
    tasksCompleted?: IntFilter<"PlanEvaluation"> | number
    ratingChange?: IntNullableFilter<"PlanEvaluation"> | number | null
    outcomeData?: StringFilter<"PlanEvaluation"> | string
    evaluatedAt?: DateTimeFilter<"PlanEvaluation"> | Date | string
  }

  export type PlanCreateWithoutVersionsInput = {
    id?: string
    userId: string
    status?: string
    currentVersionNum?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    goal: GoalCreateNestedOneWithoutPlansInput
    evaluations?: PlanEvaluationCreateNestedManyWithoutPlanInput
  }

  export type PlanUncheckedCreateWithoutVersionsInput = {
    id?: string
    goalId: string
    userId: string
    status?: string
    currentVersionNum?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    evaluations?: PlanEvaluationUncheckedCreateNestedManyWithoutPlanInput
  }

  export type PlanCreateOrConnectWithoutVersionsInput = {
    where: PlanWhereUniqueInput
    create: XOR<PlanCreateWithoutVersionsInput, PlanUncheckedCreateWithoutVersionsInput>
  }

  export type PlanTaskCreateWithoutPlanVersionInput = {
    id?: string
    externalTaskId: string
    type: string
    title: string
    quantity?: number
    quantityCompleted?: number
    platform?: string | null
    minDifficulty?: number | null
    maxDifficulty?: number | null
    difficultyTier?: string | null
    topics: string
    reason: string
    evidenceReferences: string
    completionMetric: string
    status?: string
    createdAt?: Date | string
    matches?: TaskEvidenceMatchCreateNestedManyWithoutTaskInput
  }

  export type PlanTaskUncheckedCreateWithoutPlanVersionInput = {
    id?: string
    externalTaskId: string
    type: string
    title: string
    quantity?: number
    quantityCompleted?: number
    platform?: string | null
    minDifficulty?: number | null
    maxDifficulty?: number | null
    difficultyTier?: string | null
    topics: string
    reason: string
    evidenceReferences: string
    completionMetric: string
    status?: string
    createdAt?: Date | string
    matches?: TaskEvidenceMatchUncheckedCreateNestedManyWithoutTaskInput
  }

  export type PlanTaskCreateOrConnectWithoutPlanVersionInput = {
    where: PlanTaskWhereUniqueInput
    create: XOR<PlanTaskCreateWithoutPlanVersionInput, PlanTaskUncheckedCreateWithoutPlanVersionInput>
  }

  export type PlanTaskCreateManyPlanVersionInputEnvelope = {
    data: PlanTaskCreateManyPlanVersionInput | PlanTaskCreateManyPlanVersionInput[]
  }

  export type PlanUpsertWithoutVersionsInput = {
    update: XOR<PlanUpdateWithoutVersionsInput, PlanUncheckedUpdateWithoutVersionsInput>
    create: XOR<PlanCreateWithoutVersionsInput, PlanUncheckedCreateWithoutVersionsInput>
    where?: PlanWhereInput
  }

  export type PlanUpdateToOneWithWhereWithoutVersionsInput = {
    where?: PlanWhereInput
    data: XOR<PlanUpdateWithoutVersionsInput, PlanUncheckedUpdateWithoutVersionsInput>
  }

  export type PlanUpdateWithoutVersionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    currentVersionNum?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    goal?: GoalUpdateOneRequiredWithoutPlansNestedInput
    evaluations?: PlanEvaluationUpdateManyWithoutPlanNestedInput
  }

  export type PlanUncheckedUpdateWithoutVersionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    goalId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    currentVersionNum?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    evaluations?: PlanEvaluationUncheckedUpdateManyWithoutPlanNestedInput
  }

  export type PlanTaskUpsertWithWhereUniqueWithoutPlanVersionInput = {
    where: PlanTaskWhereUniqueInput
    update: XOR<PlanTaskUpdateWithoutPlanVersionInput, PlanTaskUncheckedUpdateWithoutPlanVersionInput>
    create: XOR<PlanTaskCreateWithoutPlanVersionInput, PlanTaskUncheckedCreateWithoutPlanVersionInput>
  }

  export type PlanTaskUpdateWithWhereUniqueWithoutPlanVersionInput = {
    where: PlanTaskWhereUniqueInput
    data: XOR<PlanTaskUpdateWithoutPlanVersionInput, PlanTaskUncheckedUpdateWithoutPlanVersionInput>
  }

  export type PlanTaskUpdateManyWithWhereWithoutPlanVersionInput = {
    where: PlanTaskScalarWhereInput
    data: XOR<PlanTaskUpdateManyMutationInput, PlanTaskUncheckedUpdateManyWithoutPlanVersionInput>
  }

  export type PlanTaskScalarWhereInput = {
    AND?: PlanTaskScalarWhereInput | PlanTaskScalarWhereInput[]
    OR?: PlanTaskScalarWhereInput[]
    NOT?: PlanTaskScalarWhereInput | PlanTaskScalarWhereInput[]
    id?: StringFilter<"PlanTask"> | string
    planVersionId?: StringFilter<"PlanTask"> | string
    externalTaskId?: StringFilter<"PlanTask"> | string
    type?: StringFilter<"PlanTask"> | string
    title?: StringFilter<"PlanTask"> | string
    quantity?: IntFilter<"PlanTask"> | number
    quantityCompleted?: IntFilter<"PlanTask"> | number
    platform?: StringNullableFilter<"PlanTask"> | string | null
    minDifficulty?: IntNullableFilter<"PlanTask"> | number | null
    maxDifficulty?: IntNullableFilter<"PlanTask"> | number | null
    difficultyTier?: StringNullableFilter<"PlanTask"> | string | null
    topics?: StringFilter<"PlanTask"> | string
    reason?: StringFilter<"PlanTask"> | string
    evidenceReferences?: StringFilter<"PlanTask"> | string
    completionMetric?: StringFilter<"PlanTask"> | string
    status?: StringFilter<"PlanTask"> | string
    createdAt?: DateTimeFilter<"PlanTask"> | Date | string
  }

  export type PlanVersionCreateWithoutTasksInput = {
    id?: string
    versionNumber: number
    schemaVersion?: string
    summary: string
    milestoneTitle: string
    bottleneckType: string
    planData: string
    startDate: Date | string
    targetReviewDate: Date | string
    createdAt?: Date | string
    plan: PlanCreateNestedOneWithoutVersionsInput
  }

  export type PlanVersionUncheckedCreateWithoutTasksInput = {
    id?: string
    planId: string
    versionNumber: number
    schemaVersion?: string
    summary: string
    milestoneTitle: string
    bottleneckType: string
    planData: string
    startDate: Date | string
    targetReviewDate: Date | string
    createdAt?: Date | string
  }

  export type PlanVersionCreateOrConnectWithoutTasksInput = {
    where: PlanVersionWhereUniqueInput
    create: XOR<PlanVersionCreateWithoutTasksInput, PlanVersionUncheckedCreateWithoutTasksInput>
  }

  export type TaskEvidenceMatchCreateWithoutTaskInput = {
    id?: string
    matchedAt?: Date | string
    notes?: string | null
    submission?: NormalizedSubmissionCreateNestedOneWithoutTaskMatchesInput
    contestHistory?: ContestHistoryCreateNestedOneWithoutTaskMatchesInput
  }

  export type TaskEvidenceMatchUncheckedCreateWithoutTaskInput = {
    id?: string
    submissionId?: string | null
    contestHistoryId?: string | null
    matchedAt?: Date | string
    notes?: string | null
  }

  export type TaskEvidenceMatchCreateOrConnectWithoutTaskInput = {
    where: TaskEvidenceMatchWhereUniqueInput
    create: XOR<TaskEvidenceMatchCreateWithoutTaskInput, TaskEvidenceMatchUncheckedCreateWithoutTaskInput>
  }

  export type TaskEvidenceMatchCreateManyTaskInputEnvelope = {
    data: TaskEvidenceMatchCreateManyTaskInput | TaskEvidenceMatchCreateManyTaskInput[]
  }

  export type PlanVersionUpsertWithoutTasksInput = {
    update: XOR<PlanVersionUpdateWithoutTasksInput, PlanVersionUncheckedUpdateWithoutTasksInput>
    create: XOR<PlanVersionCreateWithoutTasksInput, PlanVersionUncheckedCreateWithoutTasksInput>
    where?: PlanVersionWhereInput
  }

  export type PlanVersionUpdateToOneWithWhereWithoutTasksInput = {
    where?: PlanVersionWhereInput
    data: XOR<PlanVersionUpdateWithoutTasksInput, PlanVersionUncheckedUpdateWithoutTasksInput>
  }

  export type PlanVersionUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    schemaVersion?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    milestoneTitle?: StringFieldUpdateOperationsInput | string
    bottleneckType?: StringFieldUpdateOperationsInput | string
    planData?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    targetReviewDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plan?: PlanUpdateOneRequiredWithoutVersionsNestedInput
  }

  export type PlanVersionUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    schemaVersion?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    milestoneTitle?: StringFieldUpdateOperationsInput | string
    bottleneckType?: StringFieldUpdateOperationsInput | string
    planData?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    targetReviewDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskEvidenceMatchUpsertWithWhereUniqueWithoutTaskInput = {
    where: TaskEvidenceMatchWhereUniqueInput
    update: XOR<TaskEvidenceMatchUpdateWithoutTaskInput, TaskEvidenceMatchUncheckedUpdateWithoutTaskInput>
    create: XOR<TaskEvidenceMatchCreateWithoutTaskInput, TaskEvidenceMatchUncheckedCreateWithoutTaskInput>
  }

  export type TaskEvidenceMatchUpdateWithWhereUniqueWithoutTaskInput = {
    where: TaskEvidenceMatchWhereUniqueInput
    data: XOR<TaskEvidenceMatchUpdateWithoutTaskInput, TaskEvidenceMatchUncheckedUpdateWithoutTaskInput>
  }

  export type TaskEvidenceMatchUpdateManyWithWhereWithoutTaskInput = {
    where: TaskEvidenceMatchScalarWhereInput
    data: XOR<TaskEvidenceMatchUpdateManyMutationInput, TaskEvidenceMatchUncheckedUpdateManyWithoutTaskInput>
  }

  export type PlanTaskCreateWithoutMatchesInput = {
    id?: string
    externalTaskId: string
    type: string
    title: string
    quantity?: number
    quantityCompleted?: number
    platform?: string | null
    minDifficulty?: number | null
    maxDifficulty?: number | null
    difficultyTier?: string | null
    topics: string
    reason: string
    evidenceReferences: string
    completionMetric: string
    status?: string
    createdAt?: Date | string
    planVersion: PlanVersionCreateNestedOneWithoutTasksInput
  }

  export type PlanTaskUncheckedCreateWithoutMatchesInput = {
    id?: string
    planVersionId: string
    externalTaskId: string
    type: string
    title: string
    quantity?: number
    quantityCompleted?: number
    platform?: string | null
    minDifficulty?: number | null
    maxDifficulty?: number | null
    difficultyTier?: string | null
    topics: string
    reason: string
    evidenceReferences: string
    completionMetric: string
    status?: string
    createdAt?: Date | string
  }

  export type PlanTaskCreateOrConnectWithoutMatchesInput = {
    where: PlanTaskWhereUniqueInput
    create: XOR<PlanTaskCreateWithoutMatchesInput, PlanTaskUncheckedCreateWithoutMatchesInput>
  }

  export type NormalizedSubmissionCreateWithoutTaskMatchesInput = {
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

  export type NormalizedSubmissionUncheckedCreateWithoutTaskMatchesInput = {
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

  export type NormalizedSubmissionCreateOrConnectWithoutTaskMatchesInput = {
    where: NormalizedSubmissionWhereUniqueInput
    create: XOR<NormalizedSubmissionCreateWithoutTaskMatchesInput, NormalizedSubmissionUncheckedCreateWithoutTaskMatchesInput>
  }

  export type ContestHistoryCreateWithoutTaskMatchesInput = {
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

  export type ContestHistoryUncheckedCreateWithoutTaskMatchesInput = {
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

  export type ContestHistoryCreateOrConnectWithoutTaskMatchesInput = {
    where: ContestHistoryWhereUniqueInput
    create: XOR<ContestHistoryCreateWithoutTaskMatchesInput, ContestHistoryUncheckedCreateWithoutTaskMatchesInput>
  }

  export type PlanTaskUpsertWithoutMatchesInput = {
    update: XOR<PlanTaskUpdateWithoutMatchesInput, PlanTaskUncheckedUpdateWithoutMatchesInput>
    create: XOR<PlanTaskCreateWithoutMatchesInput, PlanTaskUncheckedCreateWithoutMatchesInput>
    where?: PlanTaskWhereInput
  }

  export type PlanTaskUpdateToOneWithWhereWithoutMatchesInput = {
    where?: PlanTaskWhereInput
    data: XOR<PlanTaskUpdateWithoutMatchesInput, PlanTaskUncheckedUpdateWithoutMatchesInput>
  }

  export type PlanTaskUpdateWithoutMatchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalTaskId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    quantityCompleted?: IntFieldUpdateOperationsInput | number
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    minDifficulty?: NullableIntFieldUpdateOperationsInput | number | null
    maxDifficulty?: NullableIntFieldUpdateOperationsInput | number | null
    difficultyTier?: NullableStringFieldUpdateOperationsInput | string | null
    topics?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    evidenceReferences?: StringFieldUpdateOperationsInput | string
    completionMetric?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    planVersion?: PlanVersionUpdateOneRequiredWithoutTasksNestedInput
  }

  export type PlanTaskUncheckedUpdateWithoutMatchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    planVersionId?: StringFieldUpdateOperationsInput | string
    externalTaskId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    quantityCompleted?: IntFieldUpdateOperationsInput | number
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    minDifficulty?: NullableIntFieldUpdateOperationsInput | number | null
    maxDifficulty?: NullableIntFieldUpdateOperationsInput | number | null
    difficultyTier?: NullableStringFieldUpdateOperationsInput | string | null
    topics?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    evidenceReferences?: StringFieldUpdateOperationsInput | string
    completionMetric?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NormalizedSubmissionUpsertWithoutTaskMatchesInput = {
    update: XOR<NormalizedSubmissionUpdateWithoutTaskMatchesInput, NormalizedSubmissionUncheckedUpdateWithoutTaskMatchesInput>
    create: XOR<NormalizedSubmissionCreateWithoutTaskMatchesInput, NormalizedSubmissionUncheckedCreateWithoutTaskMatchesInput>
    where?: NormalizedSubmissionWhereInput
  }

  export type NormalizedSubmissionUpdateToOneWithWhereWithoutTaskMatchesInput = {
    where?: NormalizedSubmissionWhereInput
    data: XOR<NormalizedSubmissionUpdateWithoutTaskMatchesInput, NormalizedSubmissionUncheckedUpdateWithoutTaskMatchesInput>
  }

  export type NormalizedSubmissionUpdateWithoutTaskMatchesInput = {
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

  export type NormalizedSubmissionUncheckedUpdateWithoutTaskMatchesInput = {
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

  export type ContestHistoryUpsertWithoutTaskMatchesInput = {
    update: XOR<ContestHistoryUpdateWithoutTaskMatchesInput, ContestHistoryUncheckedUpdateWithoutTaskMatchesInput>
    create: XOR<ContestHistoryCreateWithoutTaskMatchesInput, ContestHistoryUncheckedCreateWithoutTaskMatchesInput>
    where?: ContestHistoryWhereInput
  }

  export type ContestHistoryUpdateToOneWithWhereWithoutTaskMatchesInput = {
    where?: ContestHistoryWhereInput
    data: XOR<ContestHistoryUpdateWithoutTaskMatchesInput, ContestHistoryUncheckedUpdateWithoutTaskMatchesInput>
  }

  export type ContestHistoryUpdateWithoutTaskMatchesInput = {
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

  export type ContestHistoryUncheckedUpdateWithoutTaskMatchesInput = {
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

  export type PlanCreateWithoutEvaluationsInput = {
    id?: string
    userId: string
    status?: string
    currentVersionNum?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    goal: GoalCreateNestedOneWithoutPlansInput
    versions?: PlanVersionCreateNestedManyWithoutPlanInput
  }

  export type PlanUncheckedCreateWithoutEvaluationsInput = {
    id?: string
    goalId: string
    userId: string
    status?: string
    currentVersionNum?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    versions?: PlanVersionUncheckedCreateNestedManyWithoutPlanInput
  }

  export type PlanCreateOrConnectWithoutEvaluationsInput = {
    where: PlanWhereUniqueInput
    create: XOR<PlanCreateWithoutEvaluationsInput, PlanUncheckedCreateWithoutEvaluationsInput>
  }

  export type PlanUpsertWithoutEvaluationsInput = {
    update: XOR<PlanUpdateWithoutEvaluationsInput, PlanUncheckedUpdateWithoutEvaluationsInput>
    create: XOR<PlanCreateWithoutEvaluationsInput, PlanUncheckedCreateWithoutEvaluationsInput>
    where?: PlanWhereInput
  }

  export type PlanUpdateToOneWithWhereWithoutEvaluationsInput = {
    where?: PlanWhereInput
    data: XOR<PlanUpdateWithoutEvaluationsInput, PlanUncheckedUpdateWithoutEvaluationsInput>
  }

  export type PlanUpdateWithoutEvaluationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    currentVersionNum?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    goal?: GoalUpdateOneRequiredWithoutPlansNestedInput
    versions?: PlanVersionUpdateManyWithoutPlanNestedInput
  }

  export type PlanUncheckedUpdateWithoutEvaluationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    goalId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    currentVersionNum?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    versions?: PlanVersionUncheckedUpdateManyWithoutPlanNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    goals?: GoalCreateNestedManyWithoutUserInput
    connections?: PlatformConnectionCreateNestedManyWithoutUserInput
    submissions?: NormalizedSubmissionCreateNestedManyWithoutUserInput
    contests?: ContestHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    goals?: GoalUncheckedCreateNestedManyWithoutUserInput
    connections?: PlatformConnectionUncheckedCreateNestedManyWithoutUserInput
    submissions?: NormalizedSubmissionUncheckedCreateNestedManyWithoutUserInput
    contests?: ContestHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    goals?: GoalUpdateManyWithoutUserNestedInput
    connections?: PlatformConnectionUpdateManyWithoutUserNestedInput
    submissions?: NormalizedSubmissionUpdateManyWithoutUserNestedInput
    contests?: ContestHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    goals?: GoalUncheckedUpdateManyWithoutUserNestedInput
    connections?: PlatformConnectionUncheckedUpdateManyWithoutUserNestedInput
    submissions?: NormalizedSubmissionUncheckedUpdateManyWithoutUserNestedInput
    contests?: ContestHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SessionCreateManyUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
    createdAt?: Date | string
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

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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
    plans?: PlanUpdateManyWithoutGoalNestedInput
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
    plans?: PlanUncheckedUpdateManyWithoutGoalNestedInput
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
    taskMatches?: TaskEvidenceMatchUpdateManyWithoutSubmissionNestedInput
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
    taskMatches?: TaskEvidenceMatchUncheckedUpdateManyWithoutSubmissionNestedInput
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
    taskMatches?: TaskEvidenceMatchUpdateManyWithoutContestHistoryNestedInput
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
    taskMatches?: TaskEvidenceMatchUncheckedUpdateManyWithoutContestHistoryNestedInput
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

  export type PlanCreateManyGoalInput = {
    id?: string
    userId: string
    status?: string
    currentVersionNum?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlanUpdateWithoutGoalInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    currentVersionNum?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    versions?: PlanVersionUpdateManyWithoutPlanNestedInput
    evaluations?: PlanEvaluationUpdateManyWithoutPlanNestedInput
  }

  export type PlanUncheckedUpdateWithoutGoalInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    currentVersionNum?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    versions?: PlanVersionUncheckedUpdateManyWithoutPlanNestedInput
    evaluations?: PlanEvaluationUncheckedUpdateManyWithoutPlanNestedInput
  }

  export type PlanUncheckedUpdateManyWithoutGoalInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    currentVersionNum?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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
    taskMatches?: TaskEvidenceMatchUpdateManyWithoutSubmissionNestedInput
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
    taskMatches?: TaskEvidenceMatchUncheckedUpdateManyWithoutSubmissionNestedInput
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

  export type TaskEvidenceMatchCreateManySubmissionInput = {
    id?: string
    taskId: string
    contestHistoryId?: string | null
    matchedAt?: Date | string
    notes?: string | null
  }

  export type TaskEvidenceMatchUpdateWithoutSubmissionInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    task?: PlanTaskUpdateOneRequiredWithoutMatchesNestedInput
    contestHistory?: ContestHistoryUpdateOneWithoutTaskMatchesNestedInput
  }

  export type TaskEvidenceMatchUncheckedUpdateWithoutSubmissionInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    contestHistoryId?: NullableStringFieldUpdateOperationsInput | string | null
    matchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TaskEvidenceMatchUncheckedUpdateManyWithoutSubmissionInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    contestHistoryId?: NullableStringFieldUpdateOperationsInput | string | null
    matchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TaskEvidenceMatchCreateManyContestHistoryInput = {
    id?: string
    taskId: string
    submissionId?: string | null
    matchedAt?: Date | string
    notes?: string | null
  }

  export type TaskEvidenceMatchUpdateWithoutContestHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    task?: PlanTaskUpdateOneRequiredWithoutMatchesNestedInput
    submission?: NormalizedSubmissionUpdateOneWithoutTaskMatchesNestedInput
  }

  export type TaskEvidenceMatchUncheckedUpdateWithoutContestHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    submissionId?: NullableStringFieldUpdateOperationsInput | string | null
    matchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TaskEvidenceMatchUncheckedUpdateManyWithoutContestHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    submissionId?: NullableStringFieldUpdateOperationsInput | string | null
    matchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PlanVersionCreateManyPlanInput = {
    id?: string
    versionNumber: number
    schemaVersion?: string
    summary: string
    milestoneTitle: string
    bottleneckType: string
    planData: string
    startDate: Date | string
    targetReviewDate: Date | string
    createdAt?: Date | string
  }

  export type PlanEvaluationCreateManyPlanInput = {
    id?: string
    evaluatedVersionNum: number
    completionRate: number
    tasksPlanned: number
    tasksCompleted: number
    ratingChange?: number | null
    outcomeData: string
    evaluatedAt?: Date | string
  }

  export type PlanVersionUpdateWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    schemaVersion?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    milestoneTitle?: StringFieldUpdateOperationsInput | string
    bottleneckType?: StringFieldUpdateOperationsInput | string
    planData?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    targetReviewDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: PlanTaskUpdateManyWithoutPlanVersionNestedInput
  }

  export type PlanVersionUncheckedUpdateWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    schemaVersion?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    milestoneTitle?: StringFieldUpdateOperationsInput | string
    bottleneckType?: StringFieldUpdateOperationsInput | string
    planData?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    targetReviewDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: PlanTaskUncheckedUpdateManyWithoutPlanVersionNestedInput
  }

  export type PlanVersionUncheckedUpdateManyWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    schemaVersion?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    milestoneTitle?: StringFieldUpdateOperationsInput | string
    bottleneckType?: StringFieldUpdateOperationsInput | string
    planData?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    targetReviewDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanEvaluationUpdateWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    evaluatedVersionNum?: IntFieldUpdateOperationsInput | number
    completionRate?: FloatFieldUpdateOperationsInput | number
    tasksPlanned?: IntFieldUpdateOperationsInput | number
    tasksCompleted?: IntFieldUpdateOperationsInput | number
    ratingChange?: NullableIntFieldUpdateOperationsInput | number | null
    outcomeData?: StringFieldUpdateOperationsInput | string
    evaluatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanEvaluationUncheckedUpdateWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    evaluatedVersionNum?: IntFieldUpdateOperationsInput | number
    completionRate?: FloatFieldUpdateOperationsInput | number
    tasksPlanned?: IntFieldUpdateOperationsInput | number
    tasksCompleted?: IntFieldUpdateOperationsInput | number
    ratingChange?: NullableIntFieldUpdateOperationsInput | number | null
    outcomeData?: StringFieldUpdateOperationsInput | string
    evaluatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanEvaluationUncheckedUpdateManyWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    evaluatedVersionNum?: IntFieldUpdateOperationsInput | number
    completionRate?: FloatFieldUpdateOperationsInput | number
    tasksPlanned?: IntFieldUpdateOperationsInput | number
    tasksCompleted?: IntFieldUpdateOperationsInput | number
    ratingChange?: NullableIntFieldUpdateOperationsInput | number | null
    outcomeData?: StringFieldUpdateOperationsInput | string
    evaluatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanTaskCreateManyPlanVersionInput = {
    id?: string
    externalTaskId: string
    type: string
    title: string
    quantity?: number
    quantityCompleted?: number
    platform?: string | null
    minDifficulty?: number | null
    maxDifficulty?: number | null
    difficultyTier?: string | null
    topics: string
    reason: string
    evidenceReferences: string
    completionMetric: string
    status?: string
    createdAt?: Date | string
  }

  export type PlanTaskUpdateWithoutPlanVersionInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalTaskId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    quantityCompleted?: IntFieldUpdateOperationsInput | number
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    minDifficulty?: NullableIntFieldUpdateOperationsInput | number | null
    maxDifficulty?: NullableIntFieldUpdateOperationsInput | number | null
    difficultyTier?: NullableStringFieldUpdateOperationsInput | string | null
    topics?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    evidenceReferences?: StringFieldUpdateOperationsInput | string
    completionMetric?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    matches?: TaskEvidenceMatchUpdateManyWithoutTaskNestedInput
  }

  export type PlanTaskUncheckedUpdateWithoutPlanVersionInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalTaskId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    quantityCompleted?: IntFieldUpdateOperationsInput | number
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    minDifficulty?: NullableIntFieldUpdateOperationsInput | number | null
    maxDifficulty?: NullableIntFieldUpdateOperationsInput | number | null
    difficultyTier?: NullableStringFieldUpdateOperationsInput | string | null
    topics?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    evidenceReferences?: StringFieldUpdateOperationsInput | string
    completionMetric?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    matches?: TaskEvidenceMatchUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type PlanTaskUncheckedUpdateManyWithoutPlanVersionInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalTaskId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    quantityCompleted?: IntFieldUpdateOperationsInput | number
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    minDifficulty?: NullableIntFieldUpdateOperationsInput | number | null
    maxDifficulty?: NullableIntFieldUpdateOperationsInput | number | null
    difficultyTier?: NullableStringFieldUpdateOperationsInput | string | null
    topics?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    evidenceReferences?: StringFieldUpdateOperationsInput | string
    completionMetric?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskEvidenceMatchCreateManyTaskInput = {
    id?: string
    submissionId?: string | null
    contestHistoryId?: string | null
    matchedAt?: Date | string
    notes?: string | null
  }

  export type TaskEvidenceMatchUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    submission?: NormalizedSubmissionUpdateOneWithoutTaskMatchesNestedInput
    contestHistory?: ContestHistoryUpdateOneWithoutTaskMatchesNestedInput
  }

  export type TaskEvidenceMatchUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    submissionId?: NullableStringFieldUpdateOperationsInput | string | null
    contestHistoryId?: NullableStringFieldUpdateOperationsInput | string | null
    matchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TaskEvidenceMatchUncheckedUpdateManyWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    submissionId?: NullableStringFieldUpdateOperationsInput | string | null
    contestHistoryId?: NullableStringFieldUpdateOperationsInput | string | null
    matchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
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