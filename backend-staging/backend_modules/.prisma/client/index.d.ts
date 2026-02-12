
/**
 * Client
**/

import * as runtime from '@prisma/client/runtime/library.js';
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
 * Model Lead
 * 
 */
export type Lead = $Result.DefaultSelection<Prisma.$LeadPayload>
/**
 * Model Pipeline
 * 
 */
export type Pipeline = $Result.DefaultSelection<Prisma.$PipelinePayload>
/**
 * Model PipelineStage
 * 
 */
export type PipelineStage = $Result.DefaultSelection<Prisma.$PipelineStagePayload>
/**
 * Model CustomField
 * 
 */
export type CustomField = $Result.DefaultSelection<Prisma.$CustomFieldPayload>
/**
 * Model TimelineEvent
 * 
 */
export type TimelineEvent = $Result.DefaultSelection<Prisma.$TimelineEventPayload>
/**
 * Model Contract
 * 
 */
export type Contract = $Result.DefaultSelection<Prisma.$ContractPayload>
/**
 * Model Practice
 * 
 */
export type Practice = $Result.DefaultSelection<Prisma.$PracticePayload>
/**
 * Model Document
 * 
 */
export type Document = $Result.DefaultSelection<Prisma.$DocumentPayload>
/**
 * Model Reminder
 * 
 */
export type Reminder = $Result.DefaultSelection<Prisma.$ReminderPayload>

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
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.lead`: Exposes CRUD operations for the **Lead** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Leads
    * const leads = await prisma.lead.findMany()
    * ```
    */
  get lead(): Prisma.LeadDelegate<ExtArgs>;

  /**
   * `prisma.pipeline`: Exposes CRUD operations for the **Pipeline** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pipelines
    * const pipelines = await prisma.pipeline.findMany()
    * ```
    */
  get pipeline(): Prisma.PipelineDelegate<ExtArgs>;

  /**
   * `prisma.pipelineStage`: Exposes CRUD operations for the **PipelineStage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PipelineStages
    * const pipelineStages = await prisma.pipelineStage.findMany()
    * ```
    */
  get pipelineStage(): Prisma.PipelineStageDelegate<ExtArgs>;

  /**
   * `prisma.customField`: Exposes CRUD operations for the **CustomField** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CustomFields
    * const customFields = await prisma.customField.findMany()
    * ```
    */
  get customField(): Prisma.CustomFieldDelegate<ExtArgs>;

  /**
   * `prisma.timelineEvent`: Exposes CRUD operations for the **TimelineEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TimelineEvents
    * const timelineEvents = await prisma.timelineEvent.findMany()
    * ```
    */
  get timelineEvent(): Prisma.TimelineEventDelegate<ExtArgs>;

  /**
   * `prisma.contract`: Exposes CRUD operations for the **Contract** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contracts
    * const contracts = await prisma.contract.findMany()
    * ```
    */
  get contract(): Prisma.ContractDelegate<ExtArgs>;

  /**
   * `prisma.practice`: Exposes CRUD operations for the **Practice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Practices
    * const practices = await prisma.practice.findMany()
    * ```
    */
  get practice(): Prisma.PracticeDelegate<ExtArgs>;

  /**
   * `prisma.document`: Exposes CRUD operations for the **Document** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Documents
    * const documents = await prisma.document.findMany()
    * ```
    */
  get document(): Prisma.DocumentDelegate<ExtArgs>;

  /**
   * `prisma.reminder`: Exposes CRUD operations for the **Reminder** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reminders
    * const reminders = await prisma.reminder.findMany()
    * ```
    */
  get reminder(): Prisma.ReminderDelegate<ExtArgs>;
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
  export import NotFoundError = runtime.NotFoundError

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
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


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
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
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
    Lead: 'Lead',
    Pipeline: 'Pipeline',
    PipelineStage: 'PipelineStage',
    CustomField: 'CustomField',
    TimelineEvent: 'TimelineEvent',
    Contract: 'Contract',
    Practice: 'Practice',
    Document: 'Document',
    Reminder: 'Reminder'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "lead" | "pipeline" | "pipelineStage" | "customField" | "timelineEvent" | "contract" | "practice" | "document" | "reminder"
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
      Lead: {
        payload: Prisma.$LeadPayload<ExtArgs>
        fields: Prisma.LeadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LeadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LeadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          findFirst: {
            args: Prisma.LeadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LeadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          findMany: {
            args: Prisma.LeadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>[]
          }
          create: {
            args: Prisma.LeadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          createMany: {
            args: Prisma.LeadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LeadCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>[]
          }
          delete: {
            args: Prisma.LeadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          update: {
            args: Prisma.LeadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          deleteMany: {
            args: Prisma.LeadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LeadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LeadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          aggregate: {
            args: Prisma.LeadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLead>
          }
          groupBy: {
            args: Prisma.LeadGroupByArgs<ExtArgs>
            result: $Utils.Optional<LeadGroupByOutputType>[]
          }
          count: {
            args: Prisma.LeadCountArgs<ExtArgs>
            result: $Utils.Optional<LeadCountAggregateOutputType> | number
          }
        }
      }
      Pipeline: {
        payload: Prisma.$PipelinePayload<ExtArgs>
        fields: Prisma.PipelineFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PipelineFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PipelinePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PipelineFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PipelinePayload>
          }
          findFirst: {
            args: Prisma.PipelineFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PipelinePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PipelineFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PipelinePayload>
          }
          findMany: {
            args: Prisma.PipelineFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PipelinePayload>[]
          }
          create: {
            args: Prisma.PipelineCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PipelinePayload>
          }
          createMany: {
            args: Prisma.PipelineCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PipelineCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PipelinePayload>[]
          }
          delete: {
            args: Prisma.PipelineDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PipelinePayload>
          }
          update: {
            args: Prisma.PipelineUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PipelinePayload>
          }
          deleteMany: {
            args: Prisma.PipelineDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PipelineUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PipelineUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PipelinePayload>
          }
          aggregate: {
            args: Prisma.PipelineAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePipeline>
          }
          groupBy: {
            args: Prisma.PipelineGroupByArgs<ExtArgs>
            result: $Utils.Optional<PipelineGroupByOutputType>[]
          }
          count: {
            args: Prisma.PipelineCountArgs<ExtArgs>
            result: $Utils.Optional<PipelineCountAggregateOutputType> | number
          }
        }
      }
      PipelineStage: {
        payload: Prisma.$PipelineStagePayload<ExtArgs>
        fields: Prisma.PipelineStageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PipelineStageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PipelineStagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PipelineStageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PipelineStagePayload>
          }
          findFirst: {
            args: Prisma.PipelineStageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PipelineStagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PipelineStageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PipelineStagePayload>
          }
          findMany: {
            args: Prisma.PipelineStageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PipelineStagePayload>[]
          }
          create: {
            args: Prisma.PipelineStageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PipelineStagePayload>
          }
          createMany: {
            args: Prisma.PipelineStageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PipelineStageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PipelineStagePayload>[]
          }
          delete: {
            args: Prisma.PipelineStageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PipelineStagePayload>
          }
          update: {
            args: Prisma.PipelineStageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PipelineStagePayload>
          }
          deleteMany: {
            args: Prisma.PipelineStageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PipelineStageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PipelineStageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PipelineStagePayload>
          }
          aggregate: {
            args: Prisma.PipelineStageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePipelineStage>
          }
          groupBy: {
            args: Prisma.PipelineStageGroupByArgs<ExtArgs>
            result: $Utils.Optional<PipelineStageGroupByOutputType>[]
          }
          count: {
            args: Prisma.PipelineStageCountArgs<ExtArgs>
            result: $Utils.Optional<PipelineStageCountAggregateOutputType> | number
          }
        }
      }
      CustomField: {
        payload: Prisma.$CustomFieldPayload<ExtArgs>
        fields: Prisma.CustomFieldFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomFieldFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFieldPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomFieldFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFieldPayload>
          }
          findFirst: {
            args: Prisma.CustomFieldFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFieldPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomFieldFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFieldPayload>
          }
          findMany: {
            args: Prisma.CustomFieldFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFieldPayload>[]
          }
          create: {
            args: Prisma.CustomFieldCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFieldPayload>
          }
          createMany: {
            args: Prisma.CustomFieldCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomFieldCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFieldPayload>[]
          }
          delete: {
            args: Prisma.CustomFieldDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFieldPayload>
          }
          update: {
            args: Prisma.CustomFieldUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFieldPayload>
          }
          deleteMany: {
            args: Prisma.CustomFieldDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomFieldUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CustomFieldUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFieldPayload>
          }
          aggregate: {
            args: Prisma.CustomFieldAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomField>
          }
          groupBy: {
            args: Prisma.CustomFieldGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomFieldGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomFieldCountArgs<ExtArgs>
            result: $Utils.Optional<CustomFieldCountAggregateOutputType> | number
          }
        }
      }
      TimelineEvent: {
        payload: Prisma.$TimelineEventPayload<ExtArgs>
        fields: Prisma.TimelineEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TimelineEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TimelineEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineEventPayload>
          }
          findFirst: {
            args: Prisma.TimelineEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TimelineEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineEventPayload>
          }
          findMany: {
            args: Prisma.TimelineEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineEventPayload>[]
          }
          create: {
            args: Prisma.TimelineEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineEventPayload>
          }
          createMany: {
            args: Prisma.TimelineEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TimelineEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineEventPayload>[]
          }
          delete: {
            args: Prisma.TimelineEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineEventPayload>
          }
          update: {
            args: Prisma.TimelineEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineEventPayload>
          }
          deleteMany: {
            args: Prisma.TimelineEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TimelineEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TimelineEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineEventPayload>
          }
          aggregate: {
            args: Prisma.TimelineEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTimelineEvent>
          }
          groupBy: {
            args: Prisma.TimelineEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<TimelineEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.TimelineEventCountArgs<ExtArgs>
            result: $Utils.Optional<TimelineEventCountAggregateOutputType> | number
          }
        }
      }
      Contract: {
        payload: Prisma.$ContractPayload<ExtArgs>
        fields: Prisma.ContractFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContractFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContractFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload>
          }
          findFirst: {
            args: Prisma.ContractFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContractFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload>
          }
          findMany: {
            args: Prisma.ContractFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload>[]
          }
          create: {
            args: Prisma.ContractCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload>
          }
          createMany: {
            args: Prisma.ContractCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContractCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload>[]
          }
          delete: {
            args: Prisma.ContractDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload>
          }
          update: {
            args: Prisma.ContractUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload>
          }
          deleteMany: {
            args: Prisma.ContractDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContractUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ContractUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload>
          }
          aggregate: {
            args: Prisma.ContractAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContract>
          }
          groupBy: {
            args: Prisma.ContractGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContractGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContractCountArgs<ExtArgs>
            result: $Utils.Optional<ContractCountAggregateOutputType> | number
          }
        }
      }
      Practice: {
        payload: Prisma.$PracticePayload<ExtArgs>
        fields: Prisma.PracticeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PracticeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PracticePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PracticeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PracticePayload>
          }
          findFirst: {
            args: Prisma.PracticeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PracticePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PracticeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PracticePayload>
          }
          findMany: {
            args: Prisma.PracticeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PracticePayload>[]
          }
          create: {
            args: Prisma.PracticeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PracticePayload>
          }
          createMany: {
            args: Prisma.PracticeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PracticeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PracticePayload>[]
          }
          delete: {
            args: Prisma.PracticeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PracticePayload>
          }
          update: {
            args: Prisma.PracticeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PracticePayload>
          }
          deleteMany: {
            args: Prisma.PracticeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PracticeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PracticeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PracticePayload>
          }
          aggregate: {
            args: Prisma.PracticeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePractice>
          }
          groupBy: {
            args: Prisma.PracticeGroupByArgs<ExtArgs>
            result: $Utils.Optional<PracticeGroupByOutputType>[]
          }
          count: {
            args: Prisma.PracticeCountArgs<ExtArgs>
            result: $Utils.Optional<PracticeCountAggregateOutputType> | number
          }
        }
      }
      Document: {
        payload: Prisma.$DocumentPayload<ExtArgs>
        fields: Prisma.DocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findFirst: {
            args: Prisma.DocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findMany: {
            args: Prisma.DocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          create: {
            args: Prisma.DocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          createMany: {
            args: Prisma.DocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          delete: {
            args: Prisma.DocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          update: {
            args: Prisma.DocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          deleteMany: {
            args: Prisma.DocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          aggregate: {
            args: Prisma.DocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocument>
          }
          groupBy: {
            args: Prisma.DocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentCountAggregateOutputType> | number
          }
        }
      }
      Reminder: {
        payload: Prisma.$ReminderPayload<ExtArgs>
        fields: Prisma.ReminderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReminderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReminderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>
          }
          findFirst: {
            args: Prisma.ReminderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReminderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>
          }
          findMany: {
            args: Prisma.ReminderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>[]
          }
          create: {
            args: Prisma.ReminderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>
          }
          createMany: {
            args: Prisma.ReminderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReminderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>[]
          }
          delete: {
            args: Prisma.ReminderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>
          }
          update: {
            args: Prisma.ReminderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>
          }
          deleteMany: {
            args: Prisma.ReminderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReminderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ReminderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>
          }
          aggregate: {
            args: Prisma.ReminderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReminder>
          }
          groupBy: {
            args: Prisma.ReminderGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReminderGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReminderCountArgs<ExtArgs>
            result: $Utils.Optional<ReminderCountAggregateOutputType> | number
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
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
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
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

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
   * Count Type LeadCountOutputType
   */

  export type LeadCountOutputType = {
    timeline: number
    contracts: number
    practices: number
    documents: number
    reminders: number
  }

  export type LeadCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    timeline?: boolean | LeadCountOutputTypeCountTimelineArgs
    contracts?: boolean | LeadCountOutputTypeCountContractsArgs
    practices?: boolean | LeadCountOutputTypeCountPracticesArgs
    documents?: boolean | LeadCountOutputTypeCountDocumentsArgs
    reminders?: boolean | LeadCountOutputTypeCountRemindersArgs
  }

  // Custom InputTypes
  /**
   * LeadCountOutputType without action
   */
  export type LeadCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadCountOutputType
     */
    select?: LeadCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LeadCountOutputType without action
   */
  export type LeadCountOutputTypeCountTimelineArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimelineEventWhereInput
  }

  /**
   * LeadCountOutputType without action
   */
  export type LeadCountOutputTypeCountContractsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContractWhereInput
  }

  /**
   * LeadCountOutputType without action
   */
  export type LeadCountOutputTypeCountPracticesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PracticeWhereInput
  }

  /**
   * LeadCountOutputType without action
   */
  export type LeadCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
  }

  /**
   * LeadCountOutputType without action
   */
  export type LeadCountOutputTypeCountRemindersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReminderWhereInput
  }


  /**
   * Count Type PipelineCountOutputType
   */

  export type PipelineCountOutputType = {
    stages: number
    leads: number
  }

  export type PipelineCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stages?: boolean | PipelineCountOutputTypeCountStagesArgs
    leads?: boolean | PipelineCountOutputTypeCountLeadsArgs
  }

  // Custom InputTypes
  /**
   * PipelineCountOutputType without action
   */
  export type PipelineCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PipelineCountOutputType
     */
    select?: PipelineCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PipelineCountOutputType without action
   */
  export type PipelineCountOutputTypeCountStagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PipelineStageWhereInput
  }

  /**
   * PipelineCountOutputType without action
   */
  export type PipelineCountOutputTypeCountLeadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadWhereInput
  }


  /**
   * Count Type PipelineStageCountOutputType
   */

  export type PipelineStageCountOutputType = {
    leads: number
  }

  export type PipelineStageCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leads?: boolean | PipelineStageCountOutputTypeCountLeadsArgs
  }

  // Custom InputTypes
  /**
   * PipelineStageCountOutputType without action
   */
  export type PipelineStageCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PipelineStageCountOutputType
     */
    select?: PipelineStageCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PipelineStageCountOutputType without action
   */
  export type PipelineStageCountOutputTypeCountLeadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadWhereInput
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
    password: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
    tenantId: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
    tenantId: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    role: number
    createdAt: number
    updatedAt: number
    tenantId: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    tenantId?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    tenantId?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    tenantId?: true
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
    password: string
    role: string
    createdAt: Date
    updatedAt: Date
    tenantId: string | null
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
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenantId?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenantId?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenantId?: boolean
  }


  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      role: string
      createdAt: Date
      updatedAt: Date
      tenantId: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
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
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

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
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

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
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

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
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

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
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

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
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

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
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

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
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

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
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

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
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


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
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly tenantId: FieldRef<"User", 'String'>
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
    skipDuplicates?: boolean
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
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
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
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
  }


  /**
   * Model Lead
   */

  export type AggregateLead = {
    _count: LeadCountAggregateOutputType | null
    _min: LeadMinAggregateOutputType | null
    _max: LeadMaxAggregateOutputType | null
  }

  export type LeadMinAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
    pipelineId: string | null
    stageId: string | null
    tenantId: string | null
  }

  export type LeadMaxAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
    pipelineId: string | null
    stageId: string | null
    tenantId: string | null
  }

  export type LeadCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    email: number
    status: number
    createdAt: number
    updatedAt: number
    data: number
    tags: number
    pipelineId: number
    stageId: number
    tenantId: number
    _all: number
  }


  export type LeadMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    pipelineId?: true
    stageId?: true
    tenantId?: true
  }

  export type LeadMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    pipelineId?: true
    stageId?: true
    tenantId?: true
  }

  export type LeadCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    data?: true
    tags?: true
    pipelineId?: true
    stageId?: true
    tenantId?: true
    _all?: true
  }

  export type LeadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lead to aggregate.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Leads
    **/
    _count?: true | LeadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeadMaxAggregateInputType
  }

  export type GetLeadAggregateType<T extends LeadAggregateArgs> = {
        [P in keyof T & keyof AggregateLead]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLead[P]>
      : GetScalarType<T[P], AggregateLead[P]>
  }




  export type LeadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadWhereInput
    orderBy?: LeadOrderByWithAggregationInput | LeadOrderByWithAggregationInput[]
    by: LeadScalarFieldEnum[] | LeadScalarFieldEnum
    having?: LeadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeadCountAggregateInputType | true
    _min?: LeadMinAggregateInputType
    _max?: LeadMaxAggregateInputType
  }

  export type LeadGroupByOutputType = {
    id: string
    firstName: string
    lastName: string
    email: string
    status: string
    createdAt: Date
    updatedAt: Date
    data: JsonValue | null
    tags: string[]
    pipelineId: string | null
    stageId: string | null
    tenantId: string | null
    _count: LeadCountAggregateOutputType | null
    _min: LeadMinAggregateOutputType | null
    _max: LeadMaxAggregateOutputType | null
  }

  type GetLeadGroupByPayload<T extends LeadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeadGroupByOutputType[P]>
            : GetScalarType<T[P], LeadGroupByOutputType[P]>
        }
      >
    >


  export type LeadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    data?: boolean
    tags?: boolean
    pipelineId?: boolean
    stageId?: boolean
    tenantId?: boolean
    timeline?: boolean | Lead$timelineArgs<ExtArgs>
    contracts?: boolean | Lead$contractsArgs<ExtArgs>
    practices?: boolean | Lead$practicesArgs<ExtArgs>
    documents?: boolean | Lead$documentsArgs<ExtArgs>
    reminders?: boolean | Lead$remindersArgs<ExtArgs>
    pipeline?: boolean | Lead$pipelineArgs<ExtArgs>
    stage?: boolean | Lead$stageArgs<ExtArgs>
    _count?: boolean | LeadCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lead"]>

  export type LeadSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    data?: boolean
    tags?: boolean
    pipelineId?: boolean
    stageId?: boolean
    tenantId?: boolean
    pipeline?: boolean | Lead$pipelineArgs<ExtArgs>
    stage?: boolean | Lead$stageArgs<ExtArgs>
  }, ExtArgs["result"]["lead"]>

  export type LeadSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    data?: boolean
    tags?: boolean
    pipelineId?: boolean
    stageId?: boolean
    tenantId?: boolean
  }

  export type LeadInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    timeline?: boolean | Lead$timelineArgs<ExtArgs>
    contracts?: boolean | Lead$contractsArgs<ExtArgs>
    practices?: boolean | Lead$practicesArgs<ExtArgs>
    documents?: boolean | Lead$documentsArgs<ExtArgs>
    reminders?: boolean | Lead$remindersArgs<ExtArgs>
    pipeline?: boolean | Lead$pipelineArgs<ExtArgs>
    stage?: boolean | Lead$stageArgs<ExtArgs>
    _count?: boolean | LeadCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LeadIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pipeline?: boolean | Lead$pipelineArgs<ExtArgs>
    stage?: boolean | Lead$stageArgs<ExtArgs>
  }

  export type $LeadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Lead"
    objects: {
      timeline: Prisma.$TimelineEventPayload<ExtArgs>[]
      contracts: Prisma.$ContractPayload<ExtArgs>[]
      practices: Prisma.$PracticePayload<ExtArgs>[]
      documents: Prisma.$DocumentPayload<ExtArgs>[]
      reminders: Prisma.$ReminderPayload<ExtArgs>[]
      pipeline: Prisma.$PipelinePayload<ExtArgs> | null
      stage: Prisma.$PipelineStagePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstName: string
      lastName: string
      email: string
      status: string
      createdAt: Date
      updatedAt: Date
      data: Prisma.JsonValue | null
      tags: string[]
      pipelineId: string | null
      stageId: string | null
      tenantId: string | null
    }, ExtArgs["result"]["lead"]>
    composites: {}
  }

  type LeadGetPayload<S extends boolean | null | undefined | LeadDefaultArgs> = $Result.GetResult<Prisma.$LeadPayload, S>

  type LeadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<LeadFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: LeadCountAggregateInputType | true
    }

  export interface LeadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Lead'], meta: { name: 'Lead' } }
    /**
     * Find zero or one Lead that matches the filter.
     * @param {LeadFindUniqueArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeadFindUniqueArgs>(args: SelectSubset<T, LeadFindUniqueArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Lead that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {LeadFindUniqueOrThrowArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeadFindUniqueOrThrowArgs>(args: SelectSubset<T, LeadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Lead that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindFirstArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeadFindFirstArgs>(args?: SelectSubset<T, LeadFindFirstArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Lead that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindFirstOrThrowArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeadFindFirstOrThrowArgs>(args?: SelectSubset<T, LeadFindFirstOrThrowArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Leads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Leads
     * const leads = await prisma.lead.findMany()
     * 
     * // Get first 10 Leads
     * const leads = await prisma.lead.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leadWithIdOnly = await prisma.lead.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LeadFindManyArgs>(args?: SelectSubset<T, LeadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Lead.
     * @param {LeadCreateArgs} args - Arguments to create a Lead.
     * @example
     * // Create one Lead
     * const Lead = await prisma.lead.create({
     *   data: {
     *     // ... data to create a Lead
     *   }
     * })
     * 
     */
    create<T extends LeadCreateArgs>(args: SelectSubset<T, LeadCreateArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Leads.
     * @param {LeadCreateManyArgs} args - Arguments to create many Leads.
     * @example
     * // Create many Leads
     * const lead = await prisma.lead.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LeadCreateManyArgs>(args?: SelectSubset<T, LeadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Leads and returns the data saved in the database.
     * @param {LeadCreateManyAndReturnArgs} args - Arguments to create many Leads.
     * @example
     * // Create many Leads
     * const lead = await prisma.lead.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Leads and only return the `id`
     * const leadWithIdOnly = await prisma.lead.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LeadCreateManyAndReturnArgs>(args?: SelectSubset<T, LeadCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Lead.
     * @param {LeadDeleteArgs} args - Arguments to delete one Lead.
     * @example
     * // Delete one Lead
     * const Lead = await prisma.lead.delete({
     *   where: {
     *     // ... filter to delete one Lead
     *   }
     * })
     * 
     */
    delete<T extends LeadDeleteArgs>(args: SelectSubset<T, LeadDeleteArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Lead.
     * @param {LeadUpdateArgs} args - Arguments to update one Lead.
     * @example
     * // Update one Lead
     * const lead = await prisma.lead.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LeadUpdateArgs>(args: SelectSubset<T, LeadUpdateArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Leads.
     * @param {LeadDeleteManyArgs} args - Arguments to filter Leads to delete.
     * @example
     * // Delete a few Leads
     * const { count } = await prisma.lead.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LeadDeleteManyArgs>(args?: SelectSubset<T, LeadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Leads
     * const lead = await prisma.lead.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LeadUpdateManyArgs>(args: SelectSubset<T, LeadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Lead.
     * @param {LeadUpsertArgs} args - Arguments to update or create a Lead.
     * @example
     * // Update or create a Lead
     * const lead = await prisma.lead.upsert({
     *   create: {
     *     // ... data to create a Lead
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lead we want to update
     *   }
     * })
     */
    upsert<T extends LeadUpsertArgs>(args: SelectSubset<T, LeadUpsertArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Leads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadCountArgs} args - Arguments to filter Leads to count.
     * @example
     * // Count the number of Leads
     * const count = await prisma.lead.count({
     *   where: {
     *     // ... the filter for the Leads we want to count
     *   }
     * })
    **/
    count<T extends LeadCountArgs>(
      args?: Subset<T, LeadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Lead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LeadAggregateArgs>(args: Subset<T, LeadAggregateArgs>): Prisma.PrismaPromise<GetLeadAggregateType<T>>

    /**
     * Group by Lead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadGroupByArgs} args - Group by arguments.
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
      T extends LeadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeadGroupByArgs['orderBy'] }
        : { orderBy?: LeadGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LeadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Lead model
   */
  readonly fields: LeadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Lead.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    timeline<T extends Lead$timelineArgs<ExtArgs> = {}>(args?: Subset<T, Lead$timelineArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimelineEventPayload<ExtArgs>, T, "findMany"> | Null>
    contracts<T extends Lead$contractsArgs<ExtArgs> = {}>(args?: Subset<T, Lead$contractsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "findMany"> | Null>
    practices<T extends Lead$practicesArgs<ExtArgs> = {}>(args?: Subset<T, Lead$practicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PracticePayload<ExtArgs>, T, "findMany"> | Null>
    documents<T extends Lead$documentsArgs<ExtArgs> = {}>(args?: Subset<T, Lead$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany"> | Null>
    reminders<T extends Lead$remindersArgs<ExtArgs> = {}>(args?: Subset<T, Lead$remindersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findMany"> | Null>
    pipeline<T extends Lead$pipelineArgs<ExtArgs> = {}>(args?: Subset<T, Lead$pipelineArgs<ExtArgs>>): Prisma__PipelineClient<$Result.GetResult<Prisma.$PipelinePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    stage<T extends Lead$stageArgs<ExtArgs> = {}>(args?: Subset<T, Lead$stageArgs<ExtArgs>>): Prisma__PipelineStageClient<$Result.GetResult<Prisma.$PipelineStagePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the Lead model
   */ 
  interface LeadFieldRefs {
    readonly id: FieldRef<"Lead", 'String'>
    readonly firstName: FieldRef<"Lead", 'String'>
    readonly lastName: FieldRef<"Lead", 'String'>
    readonly email: FieldRef<"Lead", 'String'>
    readonly status: FieldRef<"Lead", 'String'>
    readonly createdAt: FieldRef<"Lead", 'DateTime'>
    readonly updatedAt: FieldRef<"Lead", 'DateTime'>
    readonly data: FieldRef<"Lead", 'Json'>
    readonly tags: FieldRef<"Lead", 'String[]'>
    readonly pipelineId: FieldRef<"Lead", 'String'>
    readonly stageId: FieldRef<"Lead", 'String'>
    readonly tenantId: FieldRef<"Lead", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Lead findUnique
   */
  export type LeadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead findUniqueOrThrow
   */
  export type LeadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead findFirst
   */
  export type LeadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leads.
     */
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead findFirstOrThrow
   */
  export type LeadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leads.
     */
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead findMany
   */
  export type LeadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Leads to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead create
   */
  export type LeadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * The data needed to create a Lead.
     */
    data: XOR<LeadCreateInput, LeadUncheckedCreateInput>
  }

  /**
   * Lead createMany
   */
  export type LeadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Leads.
     */
    data: LeadCreateManyInput | LeadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Lead createManyAndReturn
   */
  export type LeadCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Leads.
     */
    data: LeadCreateManyInput | LeadCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Lead update
   */
  export type LeadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * The data needed to update a Lead.
     */
    data: XOR<LeadUpdateInput, LeadUncheckedUpdateInput>
    /**
     * Choose, which Lead to update.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead updateMany
   */
  export type LeadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Leads.
     */
    data: XOR<LeadUpdateManyMutationInput, LeadUncheckedUpdateManyInput>
    /**
     * Filter which Leads to update
     */
    where?: LeadWhereInput
  }

  /**
   * Lead upsert
   */
  export type LeadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * The filter to search for the Lead to update in case it exists.
     */
    where: LeadWhereUniqueInput
    /**
     * In case the Lead found by the `where` argument doesn't exist, create a new Lead with this data.
     */
    create: XOR<LeadCreateInput, LeadUncheckedCreateInput>
    /**
     * In case the Lead was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeadUpdateInput, LeadUncheckedUpdateInput>
  }

  /**
   * Lead delete
   */
  export type LeadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter which Lead to delete.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead deleteMany
   */
  export type LeadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Leads to delete
     */
    where?: LeadWhereInput
  }

  /**
   * Lead.timeline
   */
  export type Lead$timelineArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineEvent
     */
    select?: TimelineEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimelineEventInclude<ExtArgs> | null
    where?: TimelineEventWhereInput
    orderBy?: TimelineEventOrderByWithRelationInput | TimelineEventOrderByWithRelationInput[]
    cursor?: TimelineEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TimelineEventScalarFieldEnum | TimelineEventScalarFieldEnum[]
  }

  /**
   * Lead.contracts
   */
  export type Lead$contractsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    where?: ContractWhereInput
    orderBy?: ContractOrderByWithRelationInput | ContractOrderByWithRelationInput[]
    cursor?: ContractWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContractScalarFieldEnum | ContractScalarFieldEnum[]
  }

  /**
   * Lead.practices
   */
  export type Lead$practicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Practice
     */
    select?: PracticeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PracticeInclude<ExtArgs> | null
    where?: PracticeWhereInput
    orderBy?: PracticeOrderByWithRelationInput | PracticeOrderByWithRelationInput[]
    cursor?: PracticeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PracticeScalarFieldEnum | PracticeScalarFieldEnum[]
  }

  /**
   * Lead.documents
   */
  export type Lead$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    cursor?: DocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Lead.reminders
   */
  export type Lead$remindersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    where?: ReminderWhereInput
    orderBy?: ReminderOrderByWithRelationInput | ReminderOrderByWithRelationInput[]
    cursor?: ReminderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReminderScalarFieldEnum | ReminderScalarFieldEnum[]
  }

  /**
   * Lead.pipeline
   */
  export type Lead$pipelineArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pipeline
     */
    select?: PipelineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PipelineInclude<ExtArgs> | null
    where?: PipelineWhereInput
  }

  /**
   * Lead.stage
   */
  export type Lead$stageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PipelineStage
     */
    select?: PipelineStageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PipelineStageInclude<ExtArgs> | null
    where?: PipelineStageWhereInput
  }

  /**
   * Lead without action
   */
  export type LeadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
  }


  /**
   * Model Pipeline
   */

  export type AggregatePipeline = {
    _count: PipelineCountAggregateOutputType | null
    _min: PipelineMinAggregateOutputType | null
    _max: PipelineMaxAggregateOutputType | null
  }

  export type PipelineMinAggregateOutputType = {
    id: string | null
    name: string | null
    isDefault: boolean | null
    tenantId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PipelineMaxAggregateOutputType = {
    id: string | null
    name: string | null
    isDefault: boolean | null
    tenantId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PipelineCountAggregateOutputType = {
    id: number
    name: number
    isDefault: number
    tenantId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PipelineMinAggregateInputType = {
    id?: true
    name?: true
    isDefault?: true
    tenantId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PipelineMaxAggregateInputType = {
    id?: true
    name?: true
    isDefault?: true
    tenantId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PipelineCountAggregateInputType = {
    id?: true
    name?: true
    isDefault?: true
    tenantId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PipelineAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pipeline to aggregate.
     */
    where?: PipelineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pipelines to fetch.
     */
    orderBy?: PipelineOrderByWithRelationInput | PipelineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PipelineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pipelines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pipelines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pipelines
    **/
    _count?: true | PipelineCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PipelineMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PipelineMaxAggregateInputType
  }

  export type GetPipelineAggregateType<T extends PipelineAggregateArgs> = {
        [P in keyof T & keyof AggregatePipeline]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePipeline[P]>
      : GetScalarType<T[P], AggregatePipeline[P]>
  }




  export type PipelineGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PipelineWhereInput
    orderBy?: PipelineOrderByWithAggregationInput | PipelineOrderByWithAggregationInput[]
    by: PipelineScalarFieldEnum[] | PipelineScalarFieldEnum
    having?: PipelineScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PipelineCountAggregateInputType | true
    _min?: PipelineMinAggregateInputType
    _max?: PipelineMaxAggregateInputType
  }

  export type PipelineGroupByOutputType = {
    id: string
    name: string
    isDefault: boolean
    tenantId: string | null
    createdAt: Date
    updatedAt: Date
    _count: PipelineCountAggregateOutputType | null
    _min: PipelineMinAggregateOutputType | null
    _max: PipelineMaxAggregateOutputType | null
  }

  type GetPipelineGroupByPayload<T extends PipelineGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PipelineGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PipelineGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PipelineGroupByOutputType[P]>
            : GetScalarType<T[P], PipelineGroupByOutputType[P]>
        }
      >
    >


  export type PipelineSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    isDefault?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    stages?: boolean | Pipeline$stagesArgs<ExtArgs>
    leads?: boolean | Pipeline$leadsArgs<ExtArgs>
    _count?: boolean | PipelineCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pipeline"]>

  export type PipelineSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    isDefault?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["pipeline"]>

  export type PipelineSelectScalar = {
    id?: boolean
    name?: boolean
    isDefault?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PipelineInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stages?: boolean | Pipeline$stagesArgs<ExtArgs>
    leads?: boolean | Pipeline$leadsArgs<ExtArgs>
    _count?: boolean | PipelineCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PipelineIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PipelinePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pipeline"
    objects: {
      stages: Prisma.$PipelineStagePayload<ExtArgs>[]
      leads: Prisma.$LeadPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      isDefault: boolean
      tenantId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pipeline"]>
    composites: {}
  }

  type PipelineGetPayload<S extends boolean | null | undefined | PipelineDefaultArgs> = $Result.GetResult<Prisma.$PipelinePayload, S>

  type PipelineCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PipelineFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PipelineCountAggregateInputType | true
    }

  export interface PipelineDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pipeline'], meta: { name: 'Pipeline' } }
    /**
     * Find zero or one Pipeline that matches the filter.
     * @param {PipelineFindUniqueArgs} args - Arguments to find a Pipeline
     * @example
     * // Get one Pipeline
     * const pipeline = await prisma.pipeline.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PipelineFindUniqueArgs>(args: SelectSubset<T, PipelineFindUniqueArgs<ExtArgs>>): Prisma__PipelineClient<$Result.GetResult<Prisma.$PipelinePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Pipeline that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PipelineFindUniqueOrThrowArgs} args - Arguments to find a Pipeline
     * @example
     * // Get one Pipeline
     * const pipeline = await prisma.pipeline.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PipelineFindUniqueOrThrowArgs>(args: SelectSubset<T, PipelineFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PipelineClient<$Result.GetResult<Prisma.$PipelinePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Pipeline that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PipelineFindFirstArgs} args - Arguments to find a Pipeline
     * @example
     * // Get one Pipeline
     * const pipeline = await prisma.pipeline.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PipelineFindFirstArgs>(args?: SelectSubset<T, PipelineFindFirstArgs<ExtArgs>>): Prisma__PipelineClient<$Result.GetResult<Prisma.$PipelinePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Pipeline that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PipelineFindFirstOrThrowArgs} args - Arguments to find a Pipeline
     * @example
     * // Get one Pipeline
     * const pipeline = await prisma.pipeline.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PipelineFindFirstOrThrowArgs>(args?: SelectSubset<T, PipelineFindFirstOrThrowArgs<ExtArgs>>): Prisma__PipelineClient<$Result.GetResult<Prisma.$PipelinePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Pipelines that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PipelineFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pipelines
     * const pipelines = await prisma.pipeline.findMany()
     * 
     * // Get first 10 Pipelines
     * const pipelines = await prisma.pipeline.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pipelineWithIdOnly = await prisma.pipeline.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PipelineFindManyArgs>(args?: SelectSubset<T, PipelineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PipelinePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Pipeline.
     * @param {PipelineCreateArgs} args - Arguments to create a Pipeline.
     * @example
     * // Create one Pipeline
     * const Pipeline = await prisma.pipeline.create({
     *   data: {
     *     // ... data to create a Pipeline
     *   }
     * })
     * 
     */
    create<T extends PipelineCreateArgs>(args: SelectSubset<T, PipelineCreateArgs<ExtArgs>>): Prisma__PipelineClient<$Result.GetResult<Prisma.$PipelinePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Pipelines.
     * @param {PipelineCreateManyArgs} args - Arguments to create many Pipelines.
     * @example
     * // Create many Pipelines
     * const pipeline = await prisma.pipeline.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PipelineCreateManyArgs>(args?: SelectSubset<T, PipelineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pipelines and returns the data saved in the database.
     * @param {PipelineCreateManyAndReturnArgs} args - Arguments to create many Pipelines.
     * @example
     * // Create many Pipelines
     * const pipeline = await prisma.pipeline.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pipelines and only return the `id`
     * const pipelineWithIdOnly = await prisma.pipeline.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PipelineCreateManyAndReturnArgs>(args?: SelectSubset<T, PipelineCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PipelinePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Pipeline.
     * @param {PipelineDeleteArgs} args - Arguments to delete one Pipeline.
     * @example
     * // Delete one Pipeline
     * const Pipeline = await prisma.pipeline.delete({
     *   where: {
     *     // ... filter to delete one Pipeline
     *   }
     * })
     * 
     */
    delete<T extends PipelineDeleteArgs>(args: SelectSubset<T, PipelineDeleteArgs<ExtArgs>>): Prisma__PipelineClient<$Result.GetResult<Prisma.$PipelinePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Pipeline.
     * @param {PipelineUpdateArgs} args - Arguments to update one Pipeline.
     * @example
     * // Update one Pipeline
     * const pipeline = await prisma.pipeline.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PipelineUpdateArgs>(args: SelectSubset<T, PipelineUpdateArgs<ExtArgs>>): Prisma__PipelineClient<$Result.GetResult<Prisma.$PipelinePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Pipelines.
     * @param {PipelineDeleteManyArgs} args - Arguments to filter Pipelines to delete.
     * @example
     * // Delete a few Pipelines
     * const { count } = await prisma.pipeline.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PipelineDeleteManyArgs>(args?: SelectSubset<T, PipelineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pipelines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PipelineUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pipelines
     * const pipeline = await prisma.pipeline.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PipelineUpdateManyArgs>(args: SelectSubset<T, PipelineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Pipeline.
     * @param {PipelineUpsertArgs} args - Arguments to update or create a Pipeline.
     * @example
     * // Update or create a Pipeline
     * const pipeline = await prisma.pipeline.upsert({
     *   create: {
     *     // ... data to create a Pipeline
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pipeline we want to update
     *   }
     * })
     */
    upsert<T extends PipelineUpsertArgs>(args: SelectSubset<T, PipelineUpsertArgs<ExtArgs>>): Prisma__PipelineClient<$Result.GetResult<Prisma.$PipelinePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Pipelines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PipelineCountArgs} args - Arguments to filter Pipelines to count.
     * @example
     * // Count the number of Pipelines
     * const count = await prisma.pipeline.count({
     *   where: {
     *     // ... the filter for the Pipelines we want to count
     *   }
     * })
    **/
    count<T extends PipelineCountArgs>(
      args?: Subset<T, PipelineCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PipelineCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pipeline.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PipelineAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PipelineAggregateArgs>(args: Subset<T, PipelineAggregateArgs>): Prisma.PrismaPromise<GetPipelineAggregateType<T>>

    /**
     * Group by Pipeline.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PipelineGroupByArgs} args - Group by arguments.
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
      T extends PipelineGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PipelineGroupByArgs['orderBy'] }
        : { orderBy?: PipelineGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PipelineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPipelineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pipeline model
   */
  readonly fields: PipelineFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pipeline.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PipelineClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    stages<T extends Pipeline$stagesArgs<ExtArgs> = {}>(args?: Subset<T, Pipeline$stagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PipelineStagePayload<ExtArgs>, T, "findMany"> | Null>
    leads<T extends Pipeline$leadsArgs<ExtArgs> = {}>(args?: Subset<T, Pipeline$leadsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Pipeline model
   */ 
  interface PipelineFieldRefs {
    readonly id: FieldRef<"Pipeline", 'String'>
    readonly name: FieldRef<"Pipeline", 'String'>
    readonly isDefault: FieldRef<"Pipeline", 'Boolean'>
    readonly tenantId: FieldRef<"Pipeline", 'String'>
    readonly createdAt: FieldRef<"Pipeline", 'DateTime'>
    readonly updatedAt: FieldRef<"Pipeline", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Pipeline findUnique
   */
  export type PipelineFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pipeline
     */
    select?: PipelineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PipelineInclude<ExtArgs> | null
    /**
     * Filter, which Pipeline to fetch.
     */
    where: PipelineWhereUniqueInput
  }

  /**
   * Pipeline findUniqueOrThrow
   */
  export type PipelineFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pipeline
     */
    select?: PipelineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PipelineInclude<ExtArgs> | null
    /**
     * Filter, which Pipeline to fetch.
     */
    where: PipelineWhereUniqueInput
  }

  /**
   * Pipeline findFirst
   */
  export type PipelineFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pipeline
     */
    select?: PipelineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PipelineInclude<ExtArgs> | null
    /**
     * Filter, which Pipeline to fetch.
     */
    where?: PipelineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pipelines to fetch.
     */
    orderBy?: PipelineOrderByWithRelationInput | PipelineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pipelines.
     */
    cursor?: PipelineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pipelines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pipelines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pipelines.
     */
    distinct?: PipelineScalarFieldEnum | PipelineScalarFieldEnum[]
  }

  /**
   * Pipeline findFirstOrThrow
   */
  export type PipelineFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pipeline
     */
    select?: PipelineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PipelineInclude<ExtArgs> | null
    /**
     * Filter, which Pipeline to fetch.
     */
    where?: PipelineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pipelines to fetch.
     */
    orderBy?: PipelineOrderByWithRelationInput | PipelineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pipelines.
     */
    cursor?: PipelineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pipelines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pipelines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pipelines.
     */
    distinct?: PipelineScalarFieldEnum | PipelineScalarFieldEnum[]
  }

  /**
   * Pipeline findMany
   */
  export type PipelineFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pipeline
     */
    select?: PipelineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PipelineInclude<ExtArgs> | null
    /**
     * Filter, which Pipelines to fetch.
     */
    where?: PipelineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pipelines to fetch.
     */
    orderBy?: PipelineOrderByWithRelationInput | PipelineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pipelines.
     */
    cursor?: PipelineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pipelines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pipelines.
     */
    skip?: number
    distinct?: PipelineScalarFieldEnum | PipelineScalarFieldEnum[]
  }

  /**
   * Pipeline create
   */
  export type PipelineCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pipeline
     */
    select?: PipelineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PipelineInclude<ExtArgs> | null
    /**
     * The data needed to create a Pipeline.
     */
    data: XOR<PipelineCreateInput, PipelineUncheckedCreateInput>
  }

  /**
   * Pipeline createMany
   */
  export type PipelineCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pipelines.
     */
    data: PipelineCreateManyInput | PipelineCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pipeline createManyAndReturn
   */
  export type PipelineCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pipeline
     */
    select?: PipelineSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Pipelines.
     */
    data: PipelineCreateManyInput | PipelineCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pipeline update
   */
  export type PipelineUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pipeline
     */
    select?: PipelineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PipelineInclude<ExtArgs> | null
    /**
     * The data needed to update a Pipeline.
     */
    data: XOR<PipelineUpdateInput, PipelineUncheckedUpdateInput>
    /**
     * Choose, which Pipeline to update.
     */
    where: PipelineWhereUniqueInput
  }

  /**
   * Pipeline updateMany
   */
  export type PipelineUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pipelines.
     */
    data: XOR<PipelineUpdateManyMutationInput, PipelineUncheckedUpdateManyInput>
    /**
     * Filter which Pipelines to update
     */
    where?: PipelineWhereInput
  }

  /**
   * Pipeline upsert
   */
  export type PipelineUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pipeline
     */
    select?: PipelineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PipelineInclude<ExtArgs> | null
    /**
     * The filter to search for the Pipeline to update in case it exists.
     */
    where: PipelineWhereUniqueInput
    /**
     * In case the Pipeline found by the `where` argument doesn't exist, create a new Pipeline with this data.
     */
    create: XOR<PipelineCreateInput, PipelineUncheckedCreateInput>
    /**
     * In case the Pipeline was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PipelineUpdateInput, PipelineUncheckedUpdateInput>
  }

  /**
   * Pipeline delete
   */
  export type PipelineDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pipeline
     */
    select?: PipelineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PipelineInclude<ExtArgs> | null
    /**
     * Filter which Pipeline to delete.
     */
    where: PipelineWhereUniqueInput
  }

  /**
   * Pipeline deleteMany
   */
  export type PipelineDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pipelines to delete
     */
    where?: PipelineWhereInput
  }

  /**
   * Pipeline.stages
   */
  export type Pipeline$stagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PipelineStage
     */
    select?: PipelineStageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PipelineStageInclude<ExtArgs> | null
    where?: PipelineStageWhereInput
    orderBy?: PipelineStageOrderByWithRelationInput | PipelineStageOrderByWithRelationInput[]
    cursor?: PipelineStageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PipelineStageScalarFieldEnum | PipelineStageScalarFieldEnum[]
  }

  /**
   * Pipeline.leads
   */
  export type Pipeline$leadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    where?: LeadWhereInput
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    cursor?: LeadWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Pipeline without action
   */
  export type PipelineDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pipeline
     */
    select?: PipelineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PipelineInclude<ExtArgs> | null
  }


  /**
   * Model PipelineStage
   */

  export type AggregatePipelineStage = {
    _count: PipelineStageCountAggregateOutputType | null
    _avg: PipelineStageAvgAggregateOutputType | null
    _sum: PipelineStageSumAggregateOutputType | null
    _min: PipelineStageMinAggregateOutputType | null
    _max: PipelineStageMaxAggregateOutputType | null
  }

  export type PipelineStageAvgAggregateOutputType = {
    order: number | null
  }

  export type PipelineStageSumAggregateOutputType = {
    order: number | null
  }

  export type PipelineStageMinAggregateOutputType = {
    id: string | null
    name: string | null
    color: string | null
    order: number | null
    pipelineId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PipelineStageMaxAggregateOutputType = {
    id: string | null
    name: string | null
    color: string | null
    order: number | null
    pipelineId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PipelineStageCountAggregateOutputType = {
    id: number
    name: number
    color: number
    order: number
    pipelineId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PipelineStageAvgAggregateInputType = {
    order?: true
  }

  export type PipelineStageSumAggregateInputType = {
    order?: true
  }

  export type PipelineStageMinAggregateInputType = {
    id?: true
    name?: true
    color?: true
    order?: true
    pipelineId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PipelineStageMaxAggregateInputType = {
    id?: true
    name?: true
    color?: true
    order?: true
    pipelineId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PipelineStageCountAggregateInputType = {
    id?: true
    name?: true
    color?: true
    order?: true
    pipelineId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PipelineStageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PipelineStage to aggregate.
     */
    where?: PipelineStageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PipelineStages to fetch.
     */
    orderBy?: PipelineStageOrderByWithRelationInput | PipelineStageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PipelineStageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PipelineStages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PipelineStages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PipelineStages
    **/
    _count?: true | PipelineStageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PipelineStageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PipelineStageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PipelineStageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PipelineStageMaxAggregateInputType
  }

  export type GetPipelineStageAggregateType<T extends PipelineStageAggregateArgs> = {
        [P in keyof T & keyof AggregatePipelineStage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePipelineStage[P]>
      : GetScalarType<T[P], AggregatePipelineStage[P]>
  }




  export type PipelineStageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PipelineStageWhereInput
    orderBy?: PipelineStageOrderByWithAggregationInput | PipelineStageOrderByWithAggregationInput[]
    by: PipelineStageScalarFieldEnum[] | PipelineStageScalarFieldEnum
    having?: PipelineStageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PipelineStageCountAggregateInputType | true
    _avg?: PipelineStageAvgAggregateInputType
    _sum?: PipelineStageSumAggregateInputType
    _min?: PipelineStageMinAggregateInputType
    _max?: PipelineStageMaxAggregateInputType
  }

  export type PipelineStageGroupByOutputType = {
    id: string
    name: string
    color: string
    order: number
    pipelineId: string
    createdAt: Date
    updatedAt: Date
    _count: PipelineStageCountAggregateOutputType | null
    _avg: PipelineStageAvgAggregateOutputType | null
    _sum: PipelineStageSumAggregateOutputType | null
    _min: PipelineStageMinAggregateOutputType | null
    _max: PipelineStageMaxAggregateOutputType | null
  }

  type GetPipelineStageGroupByPayload<T extends PipelineStageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PipelineStageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PipelineStageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PipelineStageGroupByOutputType[P]>
            : GetScalarType<T[P], PipelineStageGroupByOutputType[P]>
        }
      >
    >


  export type PipelineStageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    color?: boolean
    order?: boolean
    pipelineId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pipeline?: boolean | PipelineDefaultArgs<ExtArgs>
    leads?: boolean | PipelineStage$leadsArgs<ExtArgs>
    _count?: boolean | PipelineStageCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pipelineStage"]>

  export type PipelineStageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    color?: boolean
    order?: boolean
    pipelineId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pipeline?: boolean | PipelineDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pipelineStage"]>

  export type PipelineStageSelectScalar = {
    id?: boolean
    name?: boolean
    color?: boolean
    order?: boolean
    pipelineId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PipelineStageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pipeline?: boolean | PipelineDefaultArgs<ExtArgs>
    leads?: boolean | PipelineStage$leadsArgs<ExtArgs>
    _count?: boolean | PipelineStageCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PipelineStageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pipeline?: boolean | PipelineDefaultArgs<ExtArgs>
  }

  export type $PipelineStagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PipelineStage"
    objects: {
      pipeline: Prisma.$PipelinePayload<ExtArgs>
      leads: Prisma.$LeadPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      color: string
      order: number
      pipelineId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pipelineStage"]>
    composites: {}
  }

  type PipelineStageGetPayload<S extends boolean | null | undefined | PipelineStageDefaultArgs> = $Result.GetResult<Prisma.$PipelineStagePayload, S>

  type PipelineStageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PipelineStageFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PipelineStageCountAggregateInputType | true
    }

  export interface PipelineStageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PipelineStage'], meta: { name: 'PipelineStage' } }
    /**
     * Find zero or one PipelineStage that matches the filter.
     * @param {PipelineStageFindUniqueArgs} args - Arguments to find a PipelineStage
     * @example
     * // Get one PipelineStage
     * const pipelineStage = await prisma.pipelineStage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PipelineStageFindUniqueArgs>(args: SelectSubset<T, PipelineStageFindUniqueArgs<ExtArgs>>): Prisma__PipelineStageClient<$Result.GetResult<Prisma.$PipelineStagePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PipelineStage that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PipelineStageFindUniqueOrThrowArgs} args - Arguments to find a PipelineStage
     * @example
     * // Get one PipelineStage
     * const pipelineStage = await prisma.pipelineStage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PipelineStageFindUniqueOrThrowArgs>(args: SelectSubset<T, PipelineStageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PipelineStageClient<$Result.GetResult<Prisma.$PipelineStagePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PipelineStage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PipelineStageFindFirstArgs} args - Arguments to find a PipelineStage
     * @example
     * // Get one PipelineStage
     * const pipelineStage = await prisma.pipelineStage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PipelineStageFindFirstArgs>(args?: SelectSubset<T, PipelineStageFindFirstArgs<ExtArgs>>): Prisma__PipelineStageClient<$Result.GetResult<Prisma.$PipelineStagePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PipelineStage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PipelineStageFindFirstOrThrowArgs} args - Arguments to find a PipelineStage
     * @example
     * // Get one PipelineStage
     * const pipelineStage = await prisma.pipelineStage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PipelineStageFindFirstOrThrowArgs>(args?: SelectSubset<T, PipelineStageFindFirstOrThrowArgs<ExtArgs>>): Prisma__PipelineStageClient<$Result.GetResult<Prisma.$PipelineStagePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PipelineStages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PipelineStageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PipelineStages
     * const pipelineStages = await prisma.pipelineStage.findMany()
     * 
     * // Get first 10 PipelineStages
     * const pipelineStages = await prisma.pipelineStage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pipelineStageWithIdOnly = await prisma.pipelineStage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PipelineStageFindManyArgs>(args?: SelectSubset<T, PipelineStageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PipelineStagePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PipelineStage.
     * @param {PipelineStageCreateArgs} args - Arguments to create a PipelineStage.
     * @example
     * // Create one PipelineStage
     * const PipelineStage = await prisma.pipelineStage.create({
     *   data: {
     *     // ... data to create a PipelineStage
     *   }
     * })
     * 
     */
    create<T extends PipelineStageCreateArgs>(args: SelectSubset<T, PipelineStageCreateArgs<ExtArgs>>): Prisma__PipelineStageClient<$Result.GetResult<Prisma.$PipelineStagePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PipelineStages.
     * @param {PipelineStageCreateManyArgs} args - Arguments to create many PipelineStages.
     * @example
     * // Create many PipelineStages
     * const pipelineStage = await prisma.pipelineStage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PipelineStageCreateManyArgs>(args?: SelectSubset<T, PipelineStageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PipelineStages and returns the data saved in the database.
     * @param {PipelineStageCreateManyAndReturnArgs} args - Arguments to create many PipelineStages.
     * @example
     * // Create many PipelineStages
     * const pipelineStage = await prisma.pipelineStage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PipelineStages and only return the `id`
     * const pipelineStageWithIdOnly = await prisma.pipelineStage.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PipelineStageCreateManyAndReturnArgs>(args?: SelectSubset<T, PipelineStageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PipelineStagePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PipelineStage.
     * @param {PipelineStageDeleteArgs} args - Arguments to delete one PipelineStage.
     * @example
     * // Delete one PipelineStage
     * const PipelineStage = await prisma.pipelineStage.delete({
     *   where: {
     *     // ... filter to delete one PipelineStage
     *   }
     * })
     * 
     */
    delete<T extends PipelineStageDeleteArgs>(args: SelectSubset<T, PipelineStageDeleteArgs<ExtArgs>>): Prisma__PipelineStageClient<$Result.GetResult<Prisma.$PipelineStagePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PipelineStage.
     * @param {PipelineStageUpdateArgs} args - Arguments to update one PipelineStage.
     * @example
     * // Update one PipelineStage
     * const pipelineStage = await prisma.pipelineStage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PipelineStageUpdateArgs>(args: SelectSubset<T, PipelineStageUpdateArgs<ExtArgs>>): Prisma__PipelineStageClient<$Result.GetResult<Prisma.$PipelineStagePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PipelineStages.
     * @param {PipelineStageDeleteManyArgs} args - Arguments to filter PipelineStages to delete.
     * @example
     * // Delete a few PipelineStages
     * const { count } = await prisma.pipelineStage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PipelineStageDeleteManyArgs>(args?: SelectSubset<T, PipelineStageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PipelineStages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PipelineStageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PipelineStages
     * const pipelineStage = await prisma.pipelineStage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PipelineStageUpdateManyArgs>(args: SelectSubset<T, PipelineStageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PipelineStage.
     * @param {PipelineStageUpsertArgs} args - Arguments to update or create a PipelineStage.
     * @example
     * // Update or create a PipelineStage
     * const pipelineStage = await prisma.pipelineStage.upsert({
     *   create: {
     *     // ... data to create a PipelineStage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PipelineStage we want to update
     *   }
     * })
     */
    upsert<T extends PipelineStageUpsertArgs>(args: SelectSubset<T, PipelineStageUpsertArgs<ExtArgs>>): Prisma__PipelineStageClient<$Result.GetResult<Prisma.$PipelineStagePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PipelineStages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PipelineStageCountArgs} args - Arguments to filter PipelineStages to count.
     * @example
     * // Count the number of PipelineStages
     * const count = await prisma.pipelineStage.count({
     *   where: {
     *     // ... the filter for the PipelineStages we want to count
     *   }
     * })
    **/
    count<T extends PipelineStageCountArgs>(
      args?: Subset<T, PipelineStageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PipelineStageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PipelineStage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PipelineStageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PipelineStageAggregateArgs>(args: Subset<T, PipelineStageAggregateArgs>): Prisma.PrismaPromise<GetPipelineStageAggregateType<T>>

    /**
     * Group by PipelineStage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PipelineStageGroupByArgs} args - Group by arguments.
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
      T extends PipelineStageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PipelineStageGroupByArgs['orderBy'] }
        : { orderBy?: PipelineStageGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PipelineStageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPipelineStageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PipelineStage model
   */
  readonly fields: PipelineStageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PipelineStage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PipelineStageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pipeline<T extends PipelineDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PipelineDefaultArgs<ExtArgs>>): Prisma__PipelineClient<$Result.GetResult<Prisma.$PipelinePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    leads<T extends PipelineStage$leadsArgs<ExtArgs> = {}>(args?: Subset<T, PipelineStage$leadsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the PipelineStage model
   */ 
  interface PipelineStageFieldRefs {
    readonly id: FieldRef<"PipelineStage", 'String'>
    readonly name: FieldRef<"PipelineStage", 'String'>
    readonly color: FieldRef<"PipelineStage", 'String'>
    readonly order: FieldRef<"PipelineStage", 'Int'>
    readonly pipelineId: FieldRef<"PipelineStage", 'String'>
    readonly createdAt: FieldRef<"PipelineStage", 'DateTime'>
    readonly updatedAt: FieldRef<"PipelineStage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PipelineStage findUnique
   */
  export type PipelineStageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PipelineStage
     */
    select?: PipelineStageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PipelineStageInclude<ExtArgs> | null
    /**
     * Filter, which PipelineStage to fetch.
     */
    where: PipelineStageWhereUniqueInput
  }

  /**
   * PipelineStage findUniqueOrThrow
   */
  export type PipelineStageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PipelineStage
     */
    select?: PipelineStageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PipelineStageInclude<ExtArgs> | null
    /**
     * Filter, which PipelineStage to fetch.
     */
    where: PipelineStageWhereUniqueInput
  }

  /**
   * PipelineStage findFirst
   */
  export type PipelineStageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PipelineStage
     */
    select?: PipelineStageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PipelineStageInclude<ExtArgs> | null
    /**
     * Filter, which PipelineStage to fetch.
     */
    where?: PipelineStageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PipelineStages to fetch.
     */
    orderBy?: PipelineStageOrderByWithRelationInput | PipelineStageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PipelineStages.
     */
    cursor?: PipelineStageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PipelineStages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PipelineStages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PipelineStages.
     */
    distinct?: PipelineStageScalarFieldEnum | PipelineStageScalarFieldEnum[]
  }

  /**
   * PipelineStage findFirstOrThrow
   */
  export type PipelineStageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PipelineStage
     */
    select?: PipelineStageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PipelineStageInclude<ExtArgs> | null
    /**
     * Filter, which PipelineStage to fetch.
     */
    where?: PipelineStageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PipelineStages to fetch.
     */
    orderBy?: PipelineStageOrderByWithRelationInput | PipelineStageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PipelineStages.
     */
    cursor?: PipelineStageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PipelineStages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PipelineStages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PipelineStages.
     */
    distinct?: PipelineStageScalarFieldEnum | PipelineStageScalarFieldEnum[]
  }

  /**
   * PipelineStage findMany
   */
  export type PipelineStageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PipelineStage
     */
    select?: PipelineStageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PipelineStageInclude<ExtArgs> | null
    /**
     * Filter, which PipelineStages to fetch.
     */
    where?: PipelineStageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PipelineStages to fetch.
     */
    orderBy?: PipelineStageOrderByWithRelationInput | PipelineStageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PipelineStages.
     */
    cursor?: PipelineStageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PipelineStages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PipelineStages.
     */
    skip?: number
    distinct?: PipelineStageScalarFieldEnum | PipelineStageScalarFieldEnum[]
  }

  /**
   * PipelineStage create
   */
  export type PipelineStageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PipelineStage
     */
    select?: PipelineStageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PipelineStageInclude<ExtArgs> | null
    /**
     * The data needed to create a PipelineStage.
     */
    data: XOR<PipelineStageCreateInput, PipelineStageUncheckedCreateInput>
  }

  /**
   * PipelineStage createMany
   */
  export type PipelineStageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PipelineStages.
     */
    data: PipelineStageCreateManyInput | PipelineStageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PipelineStage createManyAndReturn
   */
  export type PipelineStageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PipelineStage
     */
    select?: PipelineStageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PipelineStages.
     */
    data: PipelineStageCreateManyInput | PipelineStageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PipelineStageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PipelineStage update
   */
  export type PipelineStageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PipelineStage
     */
    select?: PipelineStageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PipelineStageInclude<ExtArgs> | null
    /**
     * The data needed to update a PipelineStage.
     */
    data: XOR<PipelineStageUpdateInput, PipelineStageUncheckedUpdateInput>
    /**
     * Choose, which PipelineStage to update.
     */
    where: PipelineStageWhereUniqueInput
  }

  /**
   * PipelineStage updateMany
   */
  export type PipelineStageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PipelineStages.
     */
    data: XOR<PipelineStageUpdateManyMutationInput, PipelineStageUncheckedUpdateManyInput>
    /**
     * Filter which PipelineStages to update
     */
    where?: PipelineStageWhereInput
  }

  /**
   * PipelineStage upsert
   */
  export type PipelineStageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PipelineStage
     */
    select?: PipelineStageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PipelineStageInclude<ExtArgs> | null
    /**
     * The filter to search for the PipelineStage to update in case it exists.
     */
    where: PipelineStageWhereUniqueInput
    /**
     * In case the PipelineStage found by the `where` argument doesn't exist, create a new PipelineStage with this data.
     */
    create: XOR<PipelineStageCreateInput, PipelineStageUncheckedCreateInput>
    /**
     * In case the PipelineStage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PipelineStageUpdateInput, PipelineStageUncheckedUpdateInput>
  }

  /**
   * PipelineStage delete
   */
  export type PipelineStageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PipelineStage
     */
    select?: PipelineStageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PipelineStageInclude<ExtArgs> | null
    /**
     * Filter which PipelineStage to delete.
     */
    where: PipelineStageWhereUniqueInput
  }

  /**
   * PipelineStage deleteMany
   */
  export type PipelineStageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PipelineStages to delete
     */
    where?: PipelineStageWhereInput
  }

  /**
   * PipelineStage.leads
   */
  export type PipelineStage$leadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    where?: LeadWhereInput
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    cursor?: LeadWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * PipelineStage without action
   */
  export type PipelineStageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PipelineStage
     */
    select?: PipelineStageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PipelineStageInclude<ExtArgs> | null
  }


  /**
   * Model CustomField
   */

  export type AggregateCustomField = {
    _count: CustomFieldCountAggregateOutputType | null
    _min: CustomFieldMinAggregateOutputType | null
    _max: CustomFieldMaxAggregateOutputType | null
  }

  export type CustomFieldMinAggregateOutputType = {
    id: string | null
    name: string | null
    key: string | null
    type: string | null
    entityType: string | null
    tenantId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomFieldMaxAggregateOutputType = {
    id: string | null
    name: string | null
    key: string | null
    type: string | null
    entityType: string | null
    tenantId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomFieldCountAggregateOutputType = {
    id: number
    name: number
    key: number
    type: number
    options: number
    entityType: number
    tenantId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CustomFieldMinAggregateInputType = {
    id?: true
    name?: true
    key?: true
    type?: true
    entityType?: true
    tenantId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomFieldMaxAggregateInputType = {
    id?: true
    name?: true
    key?: true
    type?: true
    entityType?: true
    tenantId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomFieldCountAggregateInputType = {
    id?: true
    name?: true
    key?: true
    type?: true
    options?: true
    entityType?: true
    tenantId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CustomFieldAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomField to aggregate.
     */
    where?: CustomFieldWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomFields to fetch.
     */
    orderBy?: CustomFieldOrderByWithRelationInput | CustomFieldOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomFieldWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomFields from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomFields.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CustomFields
    **/
    _count?: true | CustomFieldCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomFieldMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomFieldMaxAggregateInputType
  }

  export type GetCustomFieldAggregateType<T extends CustomFieldAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomField]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomField[P]>
      : GetScalarType<T[P], AggregateCustomField[P]>
  }




  export type CustomFieldGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomFieldWhereInput
    orderBy?: CustomFieldOrderByWithAggregationInput | CustomFieldOrderByWithAggregationInput[]
    by: CustomFieldScalarFieldEnum[] | CustomFieldScalarFieldEnum
    having?: CustomFieldScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomFieldCountAggregateInputType | true
    _min?: CustomFieldMinAggregateInputType
    _max?: CustomFieldMaxAggregateInputType
  }

  export type CustomFieldGroupByOutputType = {
    id: string
    name: string
    key: string
    type: string
    options: JsonValue | null
    entityType: string
    tenantId: string | null
    createdAt: Date
    updatedAt: Date
    _count: CustomFieldCountAggregateOutputType | null
    _min: CustomFieldMinAggregateOutputType | null
    _max: CustomFieldMaxAggregateOutputType | null
  }

  type GetCustomFieldGroupByPayload<T extends CustomFieldGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomFieldGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomFieldGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomFieldGroupByOutputType[P]>
            : GetScalarType<T[P], CustomFieldGroupByOutputType[P]>
        }
      >
    >


  export type CustomFieldSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    key?: boolean
    type?: boolean
    options?: boolean
    entityType?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["customField"]>

  export type CustomFieldSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    key?: boolean
    type?: boolean
    options?: boolean
    entityType?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["customField"]>

  export type CustomFieldSelectScalar = {
    id?: boolean
    name?: boolean
    key?: boolean
    type?: boolean
    options?: boolean
    entityType?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $CustomFieldPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CustomField"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      key: string
      type: string
      options: Prisma.JsonValue | null
      entityType: string
      tenantId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["customField"]>
    composites: {}
  }

  type CustomFieldGetPayload<S extends boolean | null | undefined | CustomFieldDefaultArgs> = $Result.GetResult<Prisma.$CustomFieldPayload, S>

  type CustomFieldCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CustomFieldFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CustomFieldCountAggregateInputType | true
    }

  export interface CustomFieldDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CustomField'], meta: { name: 'CustomField' } }
    /**
     * Find zero or one CustomField that matches the filter.
     * @param {CustomFieldFindUniqueArgs} args - Arguments to find a CustomField
     * @example
     * // Get one CustomField
     * const customField = await prisma.customField.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomFieldFindUniqueArgs>(args: SelectSubset<T, CustomFieldFindUniqueArgs<ExtArgs>>): Prisma__CustomFieldClient<$Result.GetResult<Prisma.$CustomFieldPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CustomField that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CustomFieldFindUniqueOrThrowArgs} args - Arguments to find a CustomField
     * @example
     * // Get one CustomField
     * const customField = await prisma.customField.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomFieldFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomFieldFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomFieldClient<$Result.GetResult<Prisma.$CustomFieldPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CustomField that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomFieldFindFirstArgs} args - Arguments to find a CustomField
     * @example
     * // Get one CustomField
     * const customField = await prisma.customField.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomFieldFindFirstArgs>(args?: SelectSubset<T, CustomFieldFindFirstArgs<ExtArgs>>): Prisma__CustomFieldClient<$Result.GetResult<Prisma.$CustomFieldPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CustomField that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomFieldFindFirstOrThrowArgs} args - Arguments to find a CustomField
     * @example
     * // Get one CustomField
     * const customField = await prisma.customField.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomFieldFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomFieldFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomFieldClient<$Result.GetResult<Prisma.$CustomFieldPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CustomFields that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomFieldFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CustomFields
     * const customFields = await prisma.customField.findMany()
     * 
     * // Get first 10 CustomFields
     * const customFields = await prisma.customField.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customFieldWithIdOnly = await prisma.customField.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomFieldFindManyArgs>(args?: SelectSubset<T, CustomFieldFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomFieldPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CustomField.
     * @param {CustomFieldCreateArgs} args - Arguments to create a CustomField.
     * @example
     * // Create one CustomField
     * const CustomField = await prisma.customField.create({
     *   data: {
     *     // ... data to create a CustomField
     *   }
     * })
     * 
     */
    create<T extends CustomFieldCreateArgs>(args: SelectSubset<T, CustomFieldCreateArgs<ExtArgs>>): Prisma__CustomFieldClient<$Result.GetResult<Prisma.$CustomFieldPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CustomFields.
     * @param {CustomFieldCreateManyArgs} args - Arguments to create many CustomFields.
     * @example
     * // Create many CustomFields
     * const customField = await prisma.customField.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomFieldCreateManyArgs>(args?: SelectSubset<T, CustomFieldCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CustomFields and returns the data saved in the database.
     * @param {CustomFieldCreateManyAndReturnArgs} args - Arguments to create many CustomFields.
     * @example
     * // Create many CustomFields
     * const customField = await prisma.customField.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CustomFields and only return the `id`
     * const customFieldWithIdOnly = await prisma.customField.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomFieldCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomFieldCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomFieldPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CustomField.
     * @param {CustomFieldDeleteArgs} args - Arguments to delete one CustomField.
     * @example
     * // Delete one CustomField
     * const CustomField = await prisma.customField.delete({
     *   where: {
     *     // ... filter to delete one CustomField
     *   }
     * })
     * 
     */
    delete<T extends CustomFieldDeleteArgs>(args: SelectSubset<T, CustomFieldDeleteArgs<ExtArgs>>): Prisma__CustomFieldClient<$Result.GetResult<Prisma.$CustomFieldPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CustomField.
     * @param {CustomFieldUpdateArgs} args - Arguments to update one CustomField.
     * @example
     * // Update one CustomField
     * const customField = await prisma.customField.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomFieldUpdateArgs>(args: SelectSubset<T, CustomFieldUpdateArgs<ExtArgs>>): Prisma__CustomFieldClient<$Result.GetResult<Prisma.$CustomFieldPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CustomFields.
     * @param {CustomFieldDeleteManyArgs} args - Arguments to filter CustomFields to delete.
     * @example
     * // Delete a few CustomFields
     * const { count } = await prisma.customField.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomFieldDeleteManyArgs>(args?: SelectSubset<T, CustomFieldDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomFields.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomFieldUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CustomFields
     * const customField = await prisma.customField.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomFieldUpdateManyArgs>(args: SelectSubset<T, CustomFieldUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CustomField.
     * @param {CustomFieldUpsertArgs} args - Arguments to update or create a CustomField.
     * @example
     * // Update or create a CustomField
     * const customField = await prisma.customField.upsert({
     *   create: {
     *     // ... data to create a CustomField
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CustomField we want to update
     *   }
     * })
     */
    upsert<T extends CustomFieldUpsertArgs>(args: SelectSubset<T, CustomFieldUpsertArgs<ExtArgs>>): Prisma__CustomFieldClient<$Result.GetResult<Prisma.$CustomFieldPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CustomFields.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomFieldCountArgs} args - Arguments to filter CustomFields to count.
     * @example
     * // Count the number of CustomFields
     * const count = await prisma.customField.count({
     *   where: {
     *     // ... the filter for the CustomFields we want to count
     *   }
     * })
    **/
    count<T extends CustomFieldCountArgs>(
      args?: Subset<T, CustomFieldCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomFieldCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CustomField.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomFieldAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CustomFieldAggregateArgs>(args: Subset<T, CustomFieldAggregateArgs>): Prisma.PrismaPromise<GetCustomFieldAggregateType<T>>

    /**
     * Group by CustomField.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomFieldGroupByArgs} args - Group by arguments.
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
      T extends CustomFieldGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomFieldGroupByArgs['orderBy'] }
        : { orderBy?: CustomFieldGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CustomFieldGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomFieldGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CustomField model
   */
  readonly fields: CustomFieldFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CustomField.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomFieldClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the CustomField model
   */ 
  interface CustomFieldFieldRefs {
    readonly id: FieldRef<"CustomField", 'String'>
    readonly name: FieldRef<"CustomField", 'String'>
    readonly key: FieldRef<"CustomField", 'String'>
    readonly type: FieldRef<"CustomField", 'String'>
    readonly options: FieldRef<"CustomField", 'Json'>
    readonly entityType: FieldRef<"CustomField", 'String'>
    readonly tenantId: FieldRef<"CustomField", 'String'>
    readonly createdAt: FieldRef<"CustomField", 'DateTime'>
    readonly updatedAt: FieldRef<"CustomField", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CustomField findUnique
   */
  export type CustomFieldFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomField
     */
    select?: CustomFieldSelect<ExtArgs> | null
    /**
     * Filter, which CustomField to fetch.
     */
    where: CustomFieldWhereUniqueInput
  }

  /**
   * CustomField findUniqueOrThrow
   */
  export type CustomFieldFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomField
     */
    select?: CustomFieldSelect<ExtArgs> | null
    /**
     * Filter, which CustomField to fetch.
     */
    where: CustomFieldWhereUniqueInput
  }

  /**
   * CustomField findFirst
   */
  export type CustomFieldFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomField
     */
    select?: CustomFieldSelect<ExtArgs> | null
    /**
     * Filter, which CustomField to fetch.
     */
    where?: CustomFieldWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomFields to fetch.
     */
    orderBy?: CustomFieldOrderByWithRelationInput | CustomFieldOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomFields.
     */
    cursor?: CustomFieldWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomFields from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomFields.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomFields.
     */
    distinct?: CustomFieldScalarFieldEnum | CustomFieldScalarFieldEnum[]
  }

  /**
   * CustomField findFirstOrThrow
   */
  export type CustomFieldFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomField
     */
    select?: CustomFieldSelect<ExtArgs> | null
    /**
     * Filter, which CustomField to fetch.
     */
    where?: CustomFieldWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomFields to fetch.
     */
    orderBy?: CustomFieldOrderByWithRelationInput | CustomFieldOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomFields.
     */
    cursor?: CustomFieldWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomFields from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomFields.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomFields.
     */
    distinct?: CustomFieldScalarFieldEnum | CustomFieldScalarFieldEnum[]
  }

  /**
   * CustomField findMany
   */
  export type CustomFieldFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomField
     */
    select?: CustomFieldSelect<ExtArgs> | null
    /**
     * Filter, which CustomFields to fetch.
     */
    where?: CustomFieldWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomFields to fetch.
     */
    orderBy?: CustomFieldOrderByWithRelationInput | CustomFieldOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CustomFields.
     */
    cursor?: CustomFieldWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomFields from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomFields.
     */
    skip?: number
    distinct?: CustomFieldScalarFieldEnum | CustomFieldScalarFieldEnum[]
  }

  /**
   * CustomField create
   */
  export type CustomFieldCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomField
     */
    select?: CustomFieldSelect<ExtArgs> | null
    /**
     * The data needed to create a CustomField.
     */
    data: XOR<CustomFieldCreateInput, CustomFieldUncheckedCreateInput>
  }

  /**
   * CustomField createMany
   */
  export type CustomFieldCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CustomFields.
     */
    data: CustomFieldCreateManyInput | CustomFieldCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CustomField createManyAndReturn
   */
  export type CustomFieldCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomField
     */
    select?: CustomFieldSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CustomFields.
     */
    data: CustomFieldCreateManyInput | CustomFieldCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CustomField update
   */
  export type CustomFieldUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomField
     */
    select?: CustomFieldSelect<ExtArgs> | null
    /**
     * The data needed to update a CustomField.
     */
    data: XOR<CustomFieldUpdateInput, CustomFieldUncheckedUpdateInput>
    /**
     * Choose, which CustomField to update.
     */
    where: CustomFieldWhereUniqueInput
  }

  /**
   * CustomField updateMany
   */
  export type CustomFieldUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CustomFields.
     */
    data: XOR<CustomFieldUpdateManyMutationInput, CustomFieldUncheckedUpdateManyInput>
    /**
     * Filter which CustomFields to update
     */
    where?: CustomFieldWhereInput
  }

  /**
   * CustomField upsert
   */
  export type CustomFieldUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomField
     */
    select?: CustomFieldSelect<ExtArgs> | null
    /**
     * The filter to search for the CustomField to update in case it exists.
     */
    where: CustomFieldWhereUniqueInput
    /**
     * In case the CustomField found by the `where` argument doesn't exist, create a new CustomField with this data.
     */
    create: XOR<CustomFieldCreateInput, CustomFieldUncheckedCreateInput>
    /**
     * In case the CustomField was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomFieldUpdateInput, CustomFieldUncheckedUpdateInput>
  }

  /**
   * CustomField delete
   */
  export type CustomFieldDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomField
     */
    select?: CustomFieldSelect<ExtArgs> | null
    /**
     * Filter which CustomField to delete.
     */
    where: CustomFieldWhereUniqueInput
  }

  /**
   * CustomField deleteMany
   */
  export type CustomFieldDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomFields to delete
     */
    where?: CustomFieldWhereInput
  }

  /**
   * CustomField without action
   */
  export type CustomFieldDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomField
     */
    select?: CustomFieldSelect<ExtArgs> | null
  }


  /**
   * Model TimelineEvent
   */

  export type AggregateTimelineEvent = {
    _count: TimelineEventCountAggregateOutputType | null
    _min: TimelineEventMinAggregateOutputType | null
    _max: TimelineEventMaxAggregateOutputType | null
  }

  export type TimelineEventMinAggregateOutputType = {
    id: string | null
    leadId: string | null
    type: string | null
    description: string | null
    date: Date | null
    icon: string | null
  }

  export type TimelineEventMaxAggregateOutputType = {
    id: string | null
    leadId: string | null
    type: string | null
    description: string | null
    date: Date | null
    icon: string | null
  }

  export type TimelineEventCountAggregateOutputType = {
    id: number
    leadId: number
    type: number
    description: number
    date: number
    icon: number
    metadata: number
    _all: number
  }


  export type TimelineEventMinAggregateInputType = {
    id?: true
    leadId?: true
    type?: true
    description?: true
    date?: true
    icon?: true
  }

  export type TimelineEventMaxAggregateInputType = {
    id?: true
    leadId?: true
    type?: true
    description?: true
    date?: true
    icon?: true
  }

  export type TimelineEventCountAggregateInputType = {
    id?: true
    leadId?: true
    type?: true
    description?: true
    date?: true
    icon?: true
    metadata?: true
    _all?: true
  }

  export type TimelineEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TimelineEvent to aggregate.
     */
    where?: TimelineEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimelineEvents to fetch.
     */
    orderBy?: TimelineEventOrderByWithRelationInput | TimelineEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TimelineEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimelineEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimelineEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TimelineEvents
    **/
    _count?: true | TimelineEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TimelineEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TimelineEventMaxAggregateInputType
  }

  export type GetTimelineEventAggregateType<T extends TimelineEventAggregateArgs> = {
        [P in keyof T & keyof AggregateTimelineEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTimelineEvent[P]>
      : GetScalarType<T[P], AggregateTimelineEvent[P]>
  }




  export type TimelineEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimelineEventWhereInput
    orderBy?: TimelineEventOrderByWithAggregationInput | TimelineEventOrderByWithAggregationInput[]
    by: TimelineEventScalarFieldEnum[] | TimelineEventScalarFieldEnum
    having?: TimelineEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TimelineEventCountAggregateInputType | true
    _min?: TimelineEventMinAggregateInputType
    _max?: TimelineEventMaxAggregateInputType
  }

  export type TimelineEventGroupByOutputType = {
    id: string
    leadId: string
    type: string
    description: string
    date: Date
    icon: string | null
    metadata: JsonValue | null
    _count: TimelineEventCountAggregateOutputType | null
    _min: TimelineEventMinAggregateOutputType | null
    _max: TimelineEventMaxAggregateOutputType | null
  }

  type GetTimelineEventGroupByPayload<T extends TimelineEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TimelineEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TimelineEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TimelineEventGroupByOutputType[P]>
            : GetScalarType<T[P], TimelineEventGroupByOutputType[P]>
        }
      >
    >


  export type TimelineEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leadId?: boolean
    type?: boolean
    description?: boolean
    date?: boolean
    icon?: boolean
    metadata?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["timelineEvent"]>

  export type TimelineEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leadId?: boolean
    type?: boolean
    description?: boolean
    date?: boolean
    icon?: boolean
    metadata?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["timelineEvent"]>

  export type TimelineEventSelectScalar = {
    id?: boolean
    leadId?: boolean
    type?: boolean
    description?: boolean
    date?: boolean
    icon?: boolean
    metadata?: boolean
  }

  export type TimelineEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }
  export type TimelineEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }

  export type $TimelineEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TimelineEvent"
    objects: {
      lead: Prisma.$LeadPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      leadId: string
      type: string
      description: string
      date: Date
      icon: string | null
      metadata: Prisma.JsonValue | null
    }, ExtArgs["result"]["timelineEvent"]>
    composites: {}
  }

  type TimelineEventGetPayload<S extends boolean | null | undefined | TimelineEventDefaultArgs> = $Result.GetResult<Prisma.$TimelineEventPayload, S>

  type TimelineEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TimelineEventFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TimelineEventCountAggregateInputType | true
    }

  export interface TimelineEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TimelineEvent'], meta: { name: 'TimelineEvent' } }
    /**
     * Find zero or one TimelineEvent that matches the filter.
     * @param {TimelineEventFindUniqueArgs} args - Arguments to find a TimelineEvent
     * @example
     * // Get one TimelineEvent
     * const timelineEvent = await prisma.timelineEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TimelineEventFindUniqueArgs>(args: SelectSubset<T, TimelineEventFindUniqueArgs<ExtArgs>>): Prisma__TimelineEventClient<$Result.GetResult<Prisma.$TimelineEventPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TimelineEvent that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TimelineEventFindUniqueOrThrowArgs} args - Arguments to find a TimelineEvent
     * @example
     * // Get one TimelineEvent
     * const timelineEvent = await prisma.timelineEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TimelineEventFindUniqueOrThrowArgs>(args: SelectSubset<T, TimelineEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TimelineEventClient<$Result.GetResult<Prisma.$TimelineEventPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TimelineEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineEventFindFirstArgs} args - Arguments to find a TimelineEvent
     * @example
     * // Get one TimelineEvent
     * const timelineEvent = await prisma.timelineEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TimelineEventFindFirstArgs>(args?: SelectSubset<T, TimelineEventFindFirstArgs<ExtArgs>>): Prisma__TimelineEventClient<$Result.GetResult<Prisma.$TimelineEventPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TimelineEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineEventFindFirstOrThrowArgs} args - Arguments to find a TimelineEvent
     * @example
     * // Get one TimelineEvent
     * const timelineEvent = await prisma.timelineEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TimelineEventFindFirstOrThrowArgs>(args?: SelectSubset<T, TimelineEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__TimelineEventClient<$Result.GetResult<Prisma.$TimelineEventPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TimelineEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TimelineEvents
     * const timelineEvents = await prisma.timelineEvent.findMany()
     * 
     * // Get first 10 TimelineEvents
     * const timelineEvents = await prisma.timelineEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const timelineEventWithIdOnly = await prisma.timelineEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TimelineEventFindManyArgs>(args?: SelectSubset<T, TimelineEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimelineEventPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TimelineEvent.
     * @param {TimelineEventCreateArgs} args - Arguments to create a TimelineEvent.
     * @example
     * // Create one TimelineEvent
     * const TimelineEvent = await prisma.timelineEvent.create({
     *   data: {
     *     // ... data to create a TimelineEvent
     *   }
     * })
     * 
     */
    create<T extends TimelineEventCreateArgs>(args: SelectSubset<T, TimelineEventCreateArgs<ExtArgs>>): Prisma__TimelineEventClient<$Result.GetResult<Prisma.$TimelineEventPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TimelineEvents.
     * @param {TimelineEventCreateManyArgs} args - Arguments to create many TimelineEvents.
     * @example
     * // Create many TimelineEvents
     * const timelineEvent = await prisma.timelineEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TimelineEventCreateManyArgs>(args?: SelectSubset<T, TimelineEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TimelineEvents and returns the data saved in the database.
     * @param {TimelineEventCreateManyAndReturnArgs} args - Arguments to create many TimelineEvents.
     * @example
     * // Create many TimelineEvents
     * const timelineEvent = await prisma.timelineEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TimelineEvents and only return the `id`
     * const timelineEventWithIdOnly = await prisma.timelineEvent.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TimelineEventCreateManyAndReturnArgs>(args?: SelectSubset<T, TimelineEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimelineEventPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a TimelineEvent.
     * @param {TimelineEventDeleteArgs} args - Arguments to delete one TimelineEvent.
     * @example
     * // Delete one TimelineEvent
     * const TimelineEvent = await prisma.timelineEvent.delete({
     *   where: {
     *     // ... filter to delete one TimelineEvent
     *   }
     * })
     * 
     */
    delete<T extends TimelineEventDeleteArgs>(args: SelectSubset<T, TimelineEventDeleteArgs<ExtArgs>>): Prisma__TimelineEventClient<$Result.GetResult<Prisma.$TimelineEventPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TimelineEvent.
     * @param {TimelineEventUpdateArgs} args - Arguments to update one TimelineEvent.
     * @example
     * // Update one TimelineEvent
     * const timelineEvent = await prisma.timelineEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TimelineEventUpdateArgs>(args: SelectSubset<T, TimelineEventUpdateArgs<ExtArgs>>): Prisma__TimelineEventClient<$Result.GetResult<Prisma.$TimelineEventPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TimelineEvents.
     * @param {TimelineEventDeleteManyArgs} args - Arguments to filter TimelineEvents to delete.
     * @example
     * // Delete a few TimelineEvents
     * const { count } = await prisma.timelineEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TimelineEventDeleteManyArgs>(args?: SelectSubset<T, TimelineEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TimelineEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TimelineEvents
     * const timelineEvent = await prisma.timelineEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TimelineEventUpdateManyArgs>(args: SelectSubset<T, TimelineEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TimelineEvent.
     * @param {TimelineEventUpsertArgs} args - Arguments to update or create a TimelineEvent.
     * @example
     * // Update or create a TimelineEvent
     * const timelineEvent = await prisma.timelineEvent.upsert({
     *   create: {
     *     // ... data to create a TimelineEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TimelineEvent we want to update
     *   }
     * })
     */
    upsert<T extends TimelineEventUpsertArgs>(args: SelectSubset<T, TimelineEventUpsertArgs<ExtArgs>>): Prisma__TimelineEventClient<$Result.GetResult<Prisma.$TimelineEventPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TimelineEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineEventCountArgs} args - Arguments to filter TimelineEvents to count.
     * @example
     * // Count the number of TimelineEvents
     * const count = await prisma.timelineEvent.count({
     *   where: {
     *     // ... the filter for the TimelineEvents we want to count
     *   }
     * })
    **/
    count<T extends TimelineEventCountArgs>(
      args?: Subset<T, TimelineEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TimelineEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TimelineEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TimelineEventAggregateArgs>(args: Subset<T, TimelineEventAggregateArgs>): Prisma.PrismaPromise<GetTimelineEventAggregateType<T>>

    /**
     * Group by TimelineEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineEventGroupByArgs} args - Group by arguments.
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
      T extends TimelineEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TimelineEventGroupByArgs['orderBy'] }
        : { orderBy?: TimelineEventGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TimelineEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTimelineEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TimelineEvent model
   */
  readonly fields: TimelineEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TimelineEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TimelineEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lead<T extends LeadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LeadDefaultArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the TimelineEvent model
   */ 
  interface TimelineEventFieldRefs {
    readonly id: FieldRef<"TimelineEvent", 'String'>
    readonly leadId: FieldRef<"TimelineEvent", 'String'>
    readonly type: FieldRef<"TimelineEvent", 'String'>
    readonly description: FieldRef<"TimelineEvent", 'String'>
    readonly date: FieldRef<"TimelineEvent", 'DateTime'>
    readonly icon: FieldRef<"TimelineEvent", 'String'>
    readonly metadata: FieldRef<"TimelineEvent", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * TimelineEvent findUnique
   */
  export type TimelineEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineEvent
     */
    select?: TimelineEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimelineEventInclude<ExtArgs> | null
    /**
     * Filter, which TimelineEvent to fetch.
     */
    where: TimelineEventWhereUniqueInput
  }

  /**
   * TimelineEvent findUniqueOrThrow
   */
  export type TimelineEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineEvent
     */
    select?: TimelineEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimelineEventInclude<ExtArgs> | null
    /**
     * Filter, which TimelineEvent to fetch.
     */
    where: TimelineEventWhereUniqueInput
  }

  /**
   * TimelineEvent findFirst
   */
  export type TimelineEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineEvent
     */
    select?: TimelineEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimelineEventInclude<ExtArgs> | null
    /**
     * Filter, which TimelineEvent to fetch.
     */
    where?: TimelineEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimelineEvents to fetch.
     */
    orderBy?: TimelineEventOrderByWithRelationInput | TimelineEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TimelineEvents.
     */
    cursor?: TimelineEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimelineEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimelineEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimelineEvents.
     */
    distinct?: TimelineEventScalarFieldEnum | TimelineEventScalarFieldEnum[]
  }

  /**
   * TimelineEvent findFirstOrThrow
   */
  export type TimelineEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineEvent
     */
    select?: TimelineEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimelineEventInclude<ExtArgs> | null
    /**
     * Filter, which TimelineEvent to fetch.
     */
    where?: TimelineEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimelineEvents to fetch.
     */
    orderBy?: TimelineEventOrderByWithRelationInput | TimelineEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TimelineEvents.
     */
    cursor?: TimelineEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimelineEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimelineEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimelineEvents.
     */
    distinct?: TimelineEventScalarFieldEnum | TimelineEventScalarFieldEnum[]
  }

  /**
   * TimelineEvent findMany
   */
  export type TimelineEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineEvent
     */
    select?: TimelineEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimelineEventInclude<ExtArgs> | null
    /**
     * Filter, which TimelineEvents to fetch.
     */
    where?: TimelineEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimelineEvents to fetch.
     */
    orderBy?: TimelineEventOrderByWithRelationInput | TimelineEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TimelineEvents.
     */
    cursor?: TimelineEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimelineEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimelineEvents.
     */
    skip?: number
    distinct?: TimelineEventScalarFieldEnum | TimelineEventScalarFieldEnum[]
  }

  /**
   * TimelineEvent create
   */
  export type TimelineEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineEvent
     */
    select?: TimelineEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimelineEventInclude<ExtArgs> | null
    /**
     * The data needed to create a TimelineEvent.
     */
    data: XOR<TimelineEventCreateInput, TimelineEventUncheckedCreateInput>
  }

  /**
   * TimelineEvent createMany
   */
  export type TimelineEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TimelineEvents.
     */
    data: TimelineEventCreateManyInput | TimelineEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TimelineEvent createManyAndReturn
   */
  export type TimelineEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineEvent
     */
    select?: TimelineEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many TimelineEvents.
     */
    data: TimelineEventCreateManyInput | TimelineEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimelineEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TimelineEvent update
   */
  export type TimelineEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineEvent
     */
    select?: TimelineEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimelineEventInclude<ExtArgs> | null
    /**
     * The data needed to update a TimelineEvent.
     */
    data: XOR<TimelineEventUpdateInput, TimelineEventUncheckedUpdateInput>
    /**
     * Choose, which TimelineEvent to update.
     */
    where: TimelineEventWhereUniqueInput
  }

  /**
   * TimelineEvent updateMany
   */
  export type TimelineEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TimelineEvents.
     */
    data: XOR<TimelineEventUpdateManyMutationInput, TimelineEventUncheckedUpdateManyInput>
    /**
     * Filter which TimelineEvents to update
     */
    where?: TimelineEventWhereInput
  }

  /**
   * TimelineEvent upsert
   */
  export type TimelineEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineEvent
     */
    select?: TimelineEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimelineEventInclude<ExtArgs> | null
    /**
     * The filter to search for the TimelineEvent to update in case it exists.
     */
    where: TimelineEventWhereUniqueInput
    /**
     * In case the TimelineEvent found by the `where` argument doesn't exist, create a new TimelineEvent with this data.
     */
    create: XOR<TimelineEventCreateInput, TimelineEventUncheckedCreateInput>
    /**
     * In case the TimelineEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TimelineEventUpdateInput, TimelineEventUncheckedUpdateInput>
  }

  /**
   * TimelineEvent delete
   */
  export type TimelineEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineEvent
     */
    select?: TimelineEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimelineEventInclude<ExtArgs> | null
    /**
     * Filter which TimelineEvent to delete.
     */
    where: TimelineEventWhereUniqueInput
  }

  /**
   * TimelineEvent deleteMany
   */
  export type TimelineEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TimelineEvents to delete
     */
    where?: TimelineEventWhereInput
  }

  /**
   * TimelineEvent without action
   */
  export type TimelineEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineEvent
     */
    select?: TimelineEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimelineEventInclude<ExtArgs> | null
  }


  /**
   * Model Contract
   */

  export type AggregateContract = {
    _count: ContractCountAggregateOutputType | null
    _avg: ContractAvgAggregateOutputType | null
    _sum: ContractSumAggregateOutputType | null
    _min: ContractMinAggregateOutputType | null
    _max: ContractMaxAggregateOutputType | null
  }

  export type ContractAvgAggregateOutputType = {
    amount: number | null
  }

  export type ContractSumAggregateOutputType = {
    amount: number | null
  }

  export type ContractMinAggregateOutputType = {
    id: string | null
    leadId: string | null
    title: string | null
    amount: number | null
    startDate: Date | null
    endDate: Date | null
    status: string | null
    createdAt: Date | null
  }

  export type ContractMaxAggregateOutputType = {
    id: string | null
    leadId: string | null
    title: string | null
    amount: number | null
    startDate: Date | null
    endDate: Date | null
    status: string | null
    createdAt: Date | null
  }

  export type ContractCountAggregateOutputType = {
    id: number
    leadId: number
    title: number
    amount: number
    startDate: number
    endDate: number
    status: number
    createdAt: number
    _all: number
  }


  export type ContractAvgAggregateInputType = {
    amount?: true
  }

  export type ContractSumAggregateInputType = {
    amount?: true
  }

  export type ContractMinAggregateInputType = {
    id?: true
    leadId?: true
    title?: true
    amount?: true
    startDate?: true
    endDate?: true
    status?: true
    createdAt?: true
  }

  export type ContractMaxAggregateInputType = {
    id?: true
    leadId?: true
    title?: true
    amount?: true
    startDate?: true
    endDate?: true
    status?: true
    createdAt?: true
  }

  export type ContractCountAggregateInputType = {
    id?: true
    leadId?: true
    title?: true
    amount?: true
    startDate?: true
    endDate?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type ContractAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contract to aggregate.
     */
    where?: ContractWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contracts to fetch.
     */
    orderBy?: ContractOrderByWithRelationInput | ContractOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContractWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contracts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contracts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Contracts
    **/
    _count?: true | ContractCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ContractAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ContractSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContractMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContractMaxAggregateInputType
  }

  export type GetContractAggregateType<T extends ContractAggregateArgs> = {
        [P in keyof T & keyof AggregateContract]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContract[P]>
      : GetScalarType<T[P], AggregateContract[P]>
  }




  export type ContractGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContractWhereInput
    orderBy?: ContractOrderByWithAggregationInput | ContractOrderByWithAggregationInput[]
    by: ContractScalarFieldEnum[] | ContractScalarFieldEnum
    having?: ContractScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContractCountAggregateInputType | true
    _avg?: ContractAvgAggregateInputType
    _sum?: ContractSumAggregateInputType
    _min?: ContractMinAggregateInputType
    _max?: ContractMaxAggregateInputType
  }

  export type ContractGroupByOutputType = {
    id: string
    leadId: string
    title: string
    amount: number
    startDate: Date | null
    endDate: Date
    status: string
    createdAt: Date
    _count: ContractCountAggregateOutputType | null
    _avg: ContractAvgAggregateOutputType | null
    _sum: ContractSumAggregateOutputType | null
    _min: ContractMinAggregateOutputType | null
    _max: ContractMaxAggregateOutputType | null
  }

  type GetContractGroupByPayload<T extends ContractGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContractGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContractGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContractGroupByOutputType[P]>
            : GetScalarType<T[P], ContractGroupByOutputType[P]>
        }
      >
    >


  export type ContractSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leadId?: boolean
    title?: boolean
    amount?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    createdAt?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contract"]>

  export type ContractSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leadId?: boolean
    title?: boolean
    amount?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    createdAt?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contract"]>

  export type ContractSelectScalar = {
    id?: boolean
    leadId?: boolean
    title?: boolean
    amount?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type ContractInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }
  export type ContractIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }

  export type $ContractPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Contract"
    objects: {
      lead: Prisma.$LeadPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      leadId: string
      title: string
      amount: number
      startDate: Date | null
      endDate: Date
      status: string
      createdAt: Date
    }, ExtArgs["result"]["contract"]>
    composites: {}
  }

  type ContractGetPayload<S extends boolean | null | undefined | ContractDefaultArgs> = $Result.GetResult<Prisma.$ContractPayload, S>

  type ContractCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ContractFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ContractCountAggregateInputType | true
    }

  export interface ContractDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Contract'], meta: { name: 'Contract' } }
    /**
     * Find zero or one Contract that matches the filter.
     * @param {ContractFindUniqueArgs} args - Arguments to find a Contract
     * @example
     * // Get one Contract
     * const contract = await prisma.contract.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContractFindUniqueArgs>(args: SelectSubset<T, ContractFindUniqueArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Contract that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ContractFindUniqueOrThrowArgs} args - Arguments to find a Contract
     * @example
     * // Get one Contract
     * const contract = await prisma.contract.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContractFindUniqueOrThrowArgs>(args: SelectSubset<T, ContractFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Contract that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractFindFirstArgs} args - Arguments to find a Contract
     * @example
     * // Get one Contract
     * const contract = await prisma.contract.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContractFindFirstArgs>(args?: SelectSubset<T, ContractFindFirstArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Contract that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractFindFirstOrThrowArgs} args - Arguments to find a Contract
     * @example
     * // Get one Contract
     * const contract = await prisma.contract.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContractFindFirstOrThrowArgs>(args?: SelectSubset<T, ContractFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Contracts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Contracts
     * const contracts = await prisma.contract.findMany()
     * 
     * // Get first 10 Contracts
     * const contracts = await prisma.contract.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contractWithIdOnly = await prisma.contract.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContractFindManyArgs>(args?: SelectSubset<T, ContractFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Contract.
     * @param {ContractCreateArgs} args - Arguments to create a Contract.
     * @example
     * // Create one Contract
     * const Contract = await prisma.contract.create({
     *   data: {
     *     // ... data to create a Contract
     *   }
     * })
     * 
     */
    create<T extends ContractCreateArgs>(args: SelectSubset<T, ContractCreateArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Contracts.
     * @param {ContractCreateManyArgs} args - Arguments to create many Contracts.
     * @example
     * // Create many Contracts
     * const contract = await prisma.contract.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContractCreateManyArgs>(args?: SelectSubset<T, ContractCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Contracts and returns the data saved in the database.
     * @param {ContractCreateManyAndReturnArgs} args - Arguments to create many Contracts.
     * @example
     * // Create many Contracts
     * const contract = await prisma.contract.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Contracts and only return the `id`
     * const contractWithIdOnly = await prisma.contract.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContractCreateManyAndReturnArgs>(args?: SelectSubset<T, ContractCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Contract.
     * @param {ContractDeleteArgs} args - Arguments to delete one Contract.
     * @example
     * // Delete one Contract
     * const Contract = await prisma.contract.delete({
     *   where: {
     *     // ... filter to delete one Contract
     *   }
     * })
     * 
     */
    delete<T extends ContractDeleteArgs>(args: SelectSubset<T, ContractDeleteArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Contract.
     * @param {ContractUpdateArgs} args - Arguments to update one Contract.
     * @example
     * // Update one Contract
     * const contract = await prisma.contract.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContractUpdateArgs>(args: SelectSubset<T, ContractUpdateArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Contracts.
     * @param {ContractDeleteManyArgs} args - Arguments to filter Contracts to delete.
     * @example
     * // Delete a few Contracts
     * const { count } = await prisma.contract.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContractDeleteManyArgs>(args?: SelectSubset<T, ContractDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contracts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Contracts
     * const contract = await prisma.contract.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContractUpdateManyArgs>(args: SelectSubset<T, ContractUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Contract.
     * @param {ContractUpsertArgs} args - Arguments to update or create a Contract.
     * @example
     * // Update or create a Contract
     * const contract = await prisma.contract.upsert({
     *   create: {
     *     // ... data to create a Contract
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Contract we want to update
     *   }
     * })
     */
    upsert<T extends ContractUpsertArgs>(args: SelectSubset<T, ContractUpsertArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Contracts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractCountArgs} args - Arguments to filter Contracts to count.
     * @example
     * // Count the number of Contracts
     * const count = await prisma.contract.count({
     *   where: {
     *     // ... the filter for the Contracts we want to count
     *   }
     * })
    **/
    count<T extends ContractCountArgs>(
      args?: Subset<T, ContractCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContractCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Contract.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ContractAggregateArgs>(args: Subset<T, ContractAggregateArgs>): Prisma.PrismaPromise<GetContractAggregateType<T>>

    /**
     * Group by Contract.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractGroupByArgs} args - Group by arguments.
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
      T extends ContractGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContractGroupByArgs['orderBy'] }
        : { orderBy?: ContractGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ContractGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContractGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Contract model
   */
  readonly fields: ContractFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Contract.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContractClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lead<T extends LeadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LeadDefaultArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Contract model
   */ 
  interface ContractFieldRefs {
    readonly id: FieldRef<"Contract", 'String'>
    readonly leadId: FieldRef<"Contract", 'String'>
    readonly title: FieldRef<"Contract", 'String'>
    readonly amount: FieldRef<"Contract", 'Float'>
    readonly startDate: FieldRef<"Contract", 'DateTime'>
    readonly endDate: FieldRef<"Contract", 'DateTime'>
    readonly status: FieldRef<"Contract", 'String'>
    readonly createdAt: FieldRef<"Contract", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Contract findUnique
   */
  export type ContractFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    /**
     * Filter, which Contract to fetch.
     */
    where: ContractWhereUniqueInput
  }

  /**
   * Contract findUniqueOrThrow
   */
  export type ContractFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    /**
     * Filter, which Contract to fetch.
     */
    where: ContractWhereUniqueInput
  }

  /**
   * Contract findFirst
   */
  export type ContractFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    /**
     * Filter, which Contract to fetch.
     */
    where?: ContractWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contracts to fetch.
     */
    orderBy?: ContractOrderByWithRelationInput | ContractOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contracts.
     */
    cursor?: ContractWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contracts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contracts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contracts.
     */
    distinct?: ContractScalarFieldEnum | ContractScalarFieldEnum[]
  }

  /**
   * Contract findFirstOrThrow
   */
  export type ContractFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    /**
     * Filter, which Contract to fetch.
     */
    where?: ContractWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contracts to fetch.
     */
    orderBy?: ContractOrderByWithRelationInput | ContractOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contracts.
     */
    cursor?: ContractWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contracts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contracts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contracts.
     */
    distinct?: ContractScalarFieldEnum | ContractScalarFieldEnum[]
  }

  /**
   * Contract findMany
   */
  export type ContractFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    /**
     * Filter, which Contracts to fetch.
     */
    where?: ContractWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contracts to fetch.
     */
    orderBy?: ContractOrderByWithRelationInput | ContractOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Contracts.
     */
    cursor?: ContractWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contracts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contracts.
     */
    skip?: number
    distinct?: ContractScalarFieldEnum | ContractScalarFieldEnum[]
  }

  /**
   * Contract create
   */
  export type ContractCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    /**
     * The data needed to create a Contract.
     */
    data: XOR<ContractCreateInput, ContractUncheckedCreateInput>
  }

  /**
   * Contract createMany
   */
  export type ContractCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Contracts.
     */
    data: ContractCreateManyInput | ContractCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Contract createManyAndReturn
   */
  export type ContractCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Contracts.
     */
    data: ContractCreateManyInput | ContractCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Contract update
   */
  export type ContractUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    /**
     * The data needed to update a Contract.
     */
    data: XOR<ContractUpdateInput, ContractUncheckedUpdateInput>
    /**
     * Choose, which Contract to update.
     */
    where: ContractWhereUniqueInput
  }

  /**
   * Contract updateMany
   */
  export type ContractUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Contracts.
     */
    data: XOR<ContractUpdateManyMutationInput, ContractUncheckedUpdateManyInput>
    /**
     * Filter which Contracts to update
     */
    where?: ContractWhereInput
  }

  /**
   * Contract upsert
   */
  export type ContractUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    /**
     * The filter to search for the Contract to update in case it exists.
     */
    where: ContractWhereUniqueInput
    /**
     * In case the Contract found by the `where` argument doesn't exist, create a new Contract with this data.
     */
    create: XOR<ContractCreateInput, ContractUncheckedCreateInput>
    /**
     * In case the Contract was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContractUpdateInput, ContractUncheckedUpdateInput>
  }

  /**
   * Contract delete
   */
  export type ContractDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    /**
     * Filter which Contract to delete.
     */
    where: ContractWhereUniqueInput
  }

  /**
   * Contract deleteMany
   */
  export type ContractDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contracts to delete
     */
    where?: ContractWhereInput
  }

  /**
   * Contract without action
   */
  export type ContractDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
  }


  /**
   * Model Practice
   */

  export type AggregatePractice = {
    _count: PracticeCountAggregateOutputType | null
    _min: PracticeMinAggregateOutputType | null
    _max: PracticeMaxAggregateOutputType | null
  }

  export type PracticeMinAggregateOutputType = {
    id: string | null
    leadId: string | null
    title: string | null
    status: string | null
    createdAt: Date | null
  }

  export type PracticeMaxAggregateOutputType = {
    id: string | null
    leadId: string | null
    title: string | null
    status: string | null
    createdAt: Date | null
  }

  export type PracticeCountAggregateOutputType = {
    id: number
    leadId: number
    title: number
    status: number
    createdAt: number
    _all: number
  }


  export type PracticeMinAggregateInputType = {
    id?: true
    leadId?: true
    title?: true
    status?: true
    createdAt?: true
  }

  export type PracticeMaxAggregateInputType = {
    id?: true
    leadId?: true
    title?: true
    status?: true
    createdAt?: true
  }

  export type PracticeCountAggregateInputType = {
    id?: true
    leadId?: true
    title?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type PracticeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Practice to aggregate.
     */
    where?: PracticeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Practices to fetch.
     */
    orderBy?: PracticeOrderByWithRelationInput | PracticeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PracticeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Practices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Practices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Practices
    **/
    _count?: true | PracticeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PracticeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PracticeMaxAggregateInputType
  }

  export type GetPracticeAggregateType<T extends PracticeAggregateArgs> = {
        [P in keyof T & keyof AggregatePractice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePractice[P]>
      : GetScalarType<T[P], AggregatePractice[P]>
  }




  export type PracticeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PracticeWhereInput
    orderBy?: PracticeOrderByWithAggregationInput | PracticeOrderByWithAggregationInput[]
    by: PracticeScalarFieldEnum[] | PracticeScalarFieldEnum
    having?: PracticeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PracticeCountAggregateInputType | true
    _min?: PracticeMinAggregateInputType
    _max?: PracticeMaxAggregateInputType
  }

  export type PracticeGroupByOutputType = {
    id: string
    leadId: string
    title: string
    status: string
    createdAt: Date
    _count: PracticeCountAggregateOutputType | null
    _min: PracticeMinAggregateOutputType | null
    _max: PracticeMaxAggregateOutputType | null
  }

  type GetPracticeGroupByPayload<T extends PracticeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PracticeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PracticeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PracticeGroupByOutputType[P]>
            : GetScalarType<T[P], PracticeGroupByOutputType[P]>
        }
      >
    >


  export type PracticeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leadId?: boolean
    title?: boolean
    status?: boolean
    createdAt?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["practice"]>

  export type PracticeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leadId?: boolean
    title?: boolean
    status?: boolean
    createdAt?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["practice"]>

  export type PracticeSelectScalar = {
    id?: boolean
    leadId?: boolean
    title?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type PracticeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }
  export type PracticeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }

  export type $PracticePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Practice"
    objects: {
      lead: Prisma.$LeadPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      leadId: string
      title: string
      status: string
      createdAt: Date
    }, ExtArgs["result"]["practice"]>
    composites: {}
  }

  type PracticeGetPayload<S extends boolean | null | undefined | PracticeDefaultArgs> = $Result.GetResult<Prisma.$PracticePayload, S>

  type PracticeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PracticeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PracticeCountAggregateInputType | true
    }

  export interface PracticeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Practice'], meta: { name: 'Practice' } }
    /**
     * Find zero or one Practice that matches the filter.
     * @param {PracticeFindUniqueArgs} args - Arguments to find a Practice
     * @example
     * // Get one Practice
     * const practice = await prisma.practice.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PracticeFindUniqueArgs>(args: SelectSubset<T, PracticeFindUniqueArgs<ExtArgs>>): Prisma__PracticeClient<$Result.GetResult<Prisma.$PracticePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Practice that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PracticeFindUniqueOrThrowArgs} args - Arguments to find a Practice
     * @example
     * // Get one Practice
     * const practice = await prisma.practice.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PracticeFindUniqueOrThrowArgs>(args: SelectSubset<T, PracticeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PracticeClient<$Result.GetResult<Prisma.$PracticePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Practice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PracticeFindFirstArgs} args - Arguments to find a Practice
     * @example
     * // Get one Practice
     * const practice = await prisma.practice.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PracticeFindFirstArgs>(args?: SelectSubset<T, PracticeFindFirstArgs<ExtArgs>>): Prisma__PracticeClient<$Result.GetResult<Prisma.$PracticePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Practice that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PracticeFindFirstOrThrowArgs} args - Arguments to find a Practice
     * @example
     * // Get one Practice
     * const practice = await prisma.practice.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PracticeFindFirstOrThrowArgs>(args?: SelectSubset<T, PracticeFindFirstOrThrowArgs<ExtArgs>>): Prisma__PracticeClient<$Result.GetResult<Prisma.$PracticePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Practices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PracticeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Practices
     * const practices = await prisma.practice.findMany()
     * 
     * // Get first 10 Practices
     * const practices = await prisma.practice.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const practiceWithIdOnly = await prisma.practice.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PracticeFindManyArgs>(args?: SelectSubset<T, PracticeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PracticePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Practice.
     * @param {PracticeCreateArgs} args - Arguments to create a Practice.
     * @example
     * // Create one Practice
     * const Practice = await prisma.practice.create({
     *   data: {
     *     // ... data to create a Practice
     *   }
     * })
     * 
     */
    create<T extends PracticeCreateArgs>(args: SelectSubset<T, PracticeCreateArgs<ExtArgs>>): Prisma__PracticeClient<$Result.GetResult<Prisma.$PracticePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Practices.
     * @param {PracticeCreateManyArgs} args - Arguments to create many Practices.
     * @example
     * // Create many Practices
     * const practice = await prisma.practice.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PracticeCreateManyArgs>(args?: SelectSubset<T, PracticeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Practices and returns the data saved in the database.
     * @param {PracticeCreateManyAndReturnArgs} args - Arguments to create many Practices.
     * @example
     * // Create many Practices
     * const practice = await prisma.practice.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Practices and only return the `id`
     * const practiceWithIdOnly = await prisma.practice.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PracticeCreateManyAndReturnArgs>(args?: SelectSubset<T, PracticeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PracticePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Practice.
     * @param {PracticeDeleteArgs} args - Arguments to delete one Practice.
     * @example
     * // Delete one Practice
     * const Practice = await prisma.practice.delete({
     *   where: {
     *     // ... filter to delete one Practice
     *   }
     * })
     * 
     */
    delete<T extends PracticeDeleteArgs>(args: SelectSubset<T, PracticeDeleteArgs<ExtArgs>>): Prisma__PracticeClient<$Result.GetResult<Prisma.$PracticePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Practice.
     * @param {PracticeUpdateArgs} args - Arguments to update one Practice.
     * @example
     * // Update one Practice
     * const practice = await prisma.practice.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PracticeUpdateArgs>(args: SelectSubset<T, PracticeUpdateArgs<ExtArgs>>): Prisma__PracticeClient<$Result.GetResult<Prisma.$PracticePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Practices.
     * @param {PracticeDeleteManyArgs} args - Arguments to filter Practices to delete.
     * @example
     * // Delete a few Practices
     * const { count } = await prisma.practice.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PracticeDeleteManyArgs>(args?: SelectSubset<T, PracticeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Practices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PracticeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Practices
     * const practice = await prisma.practice.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PracticeUpdateManyArgs>(args: SelectSubset<T, PracticeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Practice.
     * @param {PracticeUpsertArgs} args - Arguments to update or create a Practice.
     * @example
     * // Update or create a Practice
     * const practice = await prisma.practice.upsert({
     *   create: {
     *     // ... data to create a Practice
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Practice we want to update
     *   }
     * })
     */
    upsert<T extends PracticeUpsertArgs>(args: SelectSubset<T, PracticeUpsertArgs<ExtArgs>>): Prisma__PracticeClient<$Result.GetResult<Prisma.$PracticePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Practices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PracticeCountArgs} args - Arguments to filter Practices to count.
     * @example
     * // Count the number of Practices
     * const count = await prisma.practice.count({
     *   where: {
     *     // ... the filter for the Practices we want to count
     *   }
     * })
    **/
    count<T extends PracticeCountArgs>(
      args?: Subset<T, PracticeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PracticeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Practice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PracticeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PracticeAggregateArgs>(args: Subset<T, PracticeAggregateArgs>): Prisma.PrismaPromise<GetPracticeAggregateType<T>>

    /**
     * Group by Practice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PracticeGroupByArgs} args - Group by arguments.
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
      T extends PracticeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PracticeGroupByArgs['orderBy'] }
        : { orderBy?: PracticeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PracticeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPracticeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Practice model
   */
  readonly fields: PracticeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Practice.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PracticeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lead<T extends LeadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LeadDefaultArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Practice model
   */ 
  interface PracticeFieldRefs {
    readonly id: FieldRef<"Practice", 'String'>
    readonly leadId: FieldRef<"Practice", 'String'>
    readonly title: FieldRef<"Practice", 'String'>
    readonly status: FieldRef<"Practice", 'String'>
    readonly createdAt: FieldRef<"Practice", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Practice findUnique
   */
  export type PracticeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Practice
     */
    select?: PracticeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PracticeInclude<ExtArgs> | null
    /**
     * Filter, which Practice to fetch.
     */
    where: PracticeWhereUniqueInput
  }

  /**
   * Practice findUniqueOrThrow
   */
  export type PracticeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Practice
     */
    select?: PracticeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PracticeInclude<ExtArgs> | null
    /**
     * Filter, which Practice to fetch.
     */
    where: PracticeWhereUniqueInput
  }

  /**
   * Practice findFirst
   */
  export type PracticeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Practice
     */
    select?: PracticeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PracticeInclude<ExtArgs> | null
    /**
     * Filter, which Practice to fetch.
     */
    where?: PracticeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Practices to fetch.
     */
    orderBy?: PracticeOrderByWithRelationInput | PracticeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Practices.
     */
    cursor?: PracticeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Practices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Practices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Practices.
     */
    distinct?: PracticeScalarFieldEnum | PracticeScalarFieldEnum[]
  }

  /**
   * Practice findFirstOrThrow
   */
  export type PracticeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Practice
     */
    select?: PracticeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PracticeInclude<ExtArgs> | null
    /**
     * Filter, which Practice to fetch.
     */
    where?: PracticeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Practices to fetch.
     */
    orderBy?: PracticeOrderByWithRelationInput | PracticeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Practices.
     */
    cursor?: PracticeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Practices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Practices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Practices.
     */
    distinct?: PracticeScalarFieldEnum | PracticeScalarFieldEnum[]
  }

  /**
   * Practice findMany
   */
  export type PracticeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Practice
     */
    select?: PracticeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PracticeInclude<ExtArgs> | null
    /**
     * Filter, which Practices to fetch.
     */
    where?: PracticeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Practices to fetch.
     */
    orderBy?: PracticeOrderByWithRelationInput | PracticeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Practices.
     */
    cursor?: PracticeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Practices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Practices.
     */
    skip?: number
    distinct?: PracticeScalarFieldEnum | PracticeScalarFieldEnum[]
  }

  /**
   * Practice create
   */
  export type PracticeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Practice
     */
    select?: PracticeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PracticeInclude<ExtArgs> | null
    /**
     * The data needed to create a Practice.
     */
    data: XOR<PracticeCreateInput, PracticeUncheckedCreateInput>
  }

  /**
   * Practice createMany
   */
  export type PracticeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Practices.
     */
    data: PracticeCreateManyInput | PracticeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Practice createManyAndReturn
   */
  export type PracticeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Practice
     */
    select?: PracticeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Practices.
     */
    data: PracticeCreateManyInput | PracticeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PracticeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Practice update
   */
  export type PracticeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Practice
     */
    select?: PracticeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PracticeInclude<ExtArgs> | null
    /**
     * The data needed to update a Practice.
     */
    data: XOR<PracticeUpdateInput, PracticeUncheckedUpdateInput>
    /**
     * Choose, which Practice to update.
     */
    where: PracticeWhereUniqueInput
  }

  /**
   * Practice updateMany
   */
  export type PracticeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Practices.
     */
    data: XOR<PracticeUpdateManyMutationInput, PracticeUncheckedUpdateManyInput>
    /**
     * Filter which Practices to update
     */
    where?: PracticeWhereInput
  }

  /**
   * Practice upsert
   */
  export type PracticeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Practice
     */
    select?: PracticeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PracticeInclude<ExtArgs> | null
    /**
     * The filter to search for the Practice to update in case it exists.
     */
    where: PracticeWhereUniqueInput
    /**
     * In case the Practice found by the `where` argument doesn't exist, create a new Practice with this data.
     */
    create: XOR<PracticeCreateInput, PracticeUncheckedCreateInput>
    /**
     * In case the Practice was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PracticeUpdateInput, PracticeUncheckedUpdateInput>
  }

  /**
   * Practice delete
   */
  export type PracticeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Practice
     */
    select?: PracticeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PracticeInclude<ExtArgs> | null
    /**
     * Filter which Practice to delete.
     */
    where: PracticeWhereUniqueInput
  }

  /**
   * Practice deleteMany
   */
  export type PracticeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Practices to delete
     */
    where?: PracticeWhereInput
  }

  /**
   * Practice without action
   */
  export type PracticeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Practice
     */
    select?: PracticeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PracticeInclude<ExtArgs> | null
  }


  /**
   * Model Document
   */

  export type AggregateDocument = {
    _count: DocumentCountAggregateOutputType | null
    _avg: DocumentAvgAggregateOutputType | null
    _sum: DocumentSumAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  export type DocumentAvgAggregateOutputType = {
    size: number | null
  }

  export type DocumentSumAggregateOutputType = {
    size: number | null
  }

  export type DocumentMinAggregateOutputType = {
    id: string | null
    leadId: string | null
    name: string | null
    type: string | null
    path: string | null
    size: number | null
    uploadedAt: Date | null
  }

  export type DocumentMaxAggregateOutputType = {
    id: string | null
    leadId: string | null
    name: string | null
    type: string | null
    path: string | null
    size: number | null
    uploadedAt: Date | null
  }

  export type DocumentCountAggregateOutputType = {
    id: number
    leadId: number
    name: number
    type: number
    path: number
    size: number
    uploadedAt: number
    _all: number
  }


  export type DocumentAvgAggregateInputType = {
    size?: true
  }

  export type DocumentSumAggregateInputType = {
    size?: true
  }

  export type DocumentMinAggregateInputType = {
    id?: true
    leadId?: true
    name?: true
    type?: true
    path?: true
    size?: true
    uploadedAt?: true
  }

  export type DocumentMaxAggregateInputType = {
    id?: true
    leadId?: true
    name?: true
    type?: true
    path?: true
    size?: true
    uploadedAt?: true
  }

  export type DocumentCountAggregateInputType = {
    id?: true
    leadId?: true
    name?: true
    type?: true
    path?: true
    size?: true
    uploadedAt?: true
    _all?: true
  }

  export type DocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Document to aggregate.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Documents
    **/
    _count?: true | DocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DocumentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DocumentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentMaxAggregateInputType
  }

  export type GetDocumentAggregateType<T extends DocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocument[P]>
      : GetScalarType<T[P], AggregateDocument[P]>
  }




  export type DocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithAggregationInput | DocumentOrderByWithAggregationInput[]
    by: DocumentScalarFieldEnum[] | DocumentScalarFieldEnum
    having?: DocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentCountAggregateInputType | true
    _avg?: DocumentAvgAggregateInputType
    _sum?: DocumentSumAggregateInputType
    _min?: DocumentMinAggregateInputType
    _max?: DocumentMaxAggregateInputType
  }

  export type DocumentGroupByOutputType = {
    id: string
    leadId: string
    name: string
    type: string
    path: string
    size: number | null
    uploadedAt: Date
    _count: DocumentCountAggregateOutputType | null
    _avg: DocumentAvgAggregateOutputType | null
    _sum: DocumentSumAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  type GetDocumentGroupByPayload<T extends DocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentGroupByOutputType[P]>
        }
      >
    >


  export type DocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leadId?: boolean
    name?: boolean
    type?: boolean
    path?: boolean
    size?: boolean
    uploadedAt?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leadId?: boolean
    name?: boolean
    type?: boolean
    path?: boolean
    size?: boolean
    uploadedAt?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectScalar = {
    id?: boolean
    leadId?: boolean
    name?: boolean
    type?: boolean
    path?: boolean
    size?: boolean
    uploadedAt?: boolean
  }

  export type DocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }
  export type DocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }

  export type $DocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Document"
    objects: {
      lead: Prisma.$LeadPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      leadId: string
      name: string
      type: string
      path: string
      size: number | null
      uploadedAt: Date
    }, ExtArgs["result"]["document"]>
    composites: {}
  }

  type DocumentGetPayload<S extends boolean | null | undefined | DocumentDefaultArgs> = $Result.GetResult<Prisma.$DocumentPayload, S>

  type DocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DocumentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DocumentCountAggregateInputType | true
    }

  export interface DocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Document'], meta: { name: 'Document' } }
    /**
     * Find zero or one Document that matches the filter.
     * @param {DocumentFindUniqueArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentFindUniqueArgs>(args: SelectSubset<T, DocumentFindUniqueArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Document that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DocumentFindUniqueOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Document that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentFindFirstArgs>(args?: SelectSubset<T, DocumentFindFirstArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Document that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Documents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Documents
     * const documents = await prisma.document.findMany()
     * 
     * // Get first 10 Documents
     * const documents = await prisma.document.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentWithIdOnly = await prisma.document.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentFindManyArgs>(args?: SelectSubset<T, DocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Document.
     * @param {DocumentCreateArgs} args - Arguments to create a Document.
     * @example
     * // Create one Document
     * const Document = await prisma.document.create({
     *   data: {
     *     // ... data to create a Document
     *   }
     * })
     * 
     */
    create<T extends DocumentCreateArgs>(args: SelectSubset<T, DocumentCreateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Documents.
     * @param {DocumentCreateManyArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentCreateManyArgs>(args?: SelectSubset<T, DocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Documents and returns the data saved in the database.
     * @param {DocumentCreateManyAndReturnArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Document.
     * @param {DocumentDeleteArgs} args - Arguments to delete one Document.
     * @example
     * // Delete one Document
     * const Document = await prisma.document.delete({
     *   where: {
     *     // ... filter to delete one Document
     *   }
     * })
     * 
     */
    delete<T extends DocumentDeleteArgs>(args: SelectSubset<T, DocumentDeleteArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Document.
     * @param {DocumentUpdateArgs} args - Arguments to update one Document.
     * @example
     * // Update one Document
     * const document = await prisma.document.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentUpdateArgs>(args: SelectSubset<T, DocumentUpdateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Documents.
     * @param {DocumentDeleteManyArgs} args - Arguments to filter Documents to delete.
     * @example
     * // Delete a few Documents
     * const { count } = await prisma.document.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentDeleteManyArgs>(args?: SelectSubset<T, DocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentUpdateManyArgs>(args: SelectSubset<T, DocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Document.
     * @param {DocumentUpsertArgs} args - Arguments to update or create a Document.
     * @example
     * // Update or create a Document
     * const document = await prisma.document.upsert({
     *   create: {
     *     // ... data to create a Document
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Document we want to update
     *   }
     * })
     */
    upsert<T extends DocumentUpsertArgs>(args: SelectSubset<T, DocumentUpsertArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentCountArgs} args - Arguments to filter Documents to count.
     * @example
     * // Count the number of Documents
     * const count = await prisma.document.count({
     *   where: {
     *     // ... the filter for the Documents we want to count
     *   }
     * })
    **/
    count<T extends DocumentCountArgs>(
      args?: Subset<T, DocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DocumentAggregateArgs>(args: Subset<T, DocumentAggregateArgs>): Prisma.PrismaPromise<GetDocumentAggregateType<T>>

    /**
     * Group by Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentGroupByArgs} args - Group by arguments.
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
      T extends DocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentGroupByArgs['orderBy'] }
        : { orderBy?: DocumentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Document model
   */
  readonly fields: DocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Document.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lead<T extends LeadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LeadDefaultArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Document model
   */ 
  interface DocumentFieldRefs {
    readonly id: FieldRef<"Document", 'String'>
    readonly leadId: FieldRef<"Document", 'String'>
    readonly name: FieldRef<"Document", 'String'>
    readonly type: FieldRef<"Document", 'String'>
    readonly path: FieldRef<"Document", 'String'>
    readonly size: FieldRef<"Document", 'Int'>
    readonly uploadedAt: FieldRef<"Document", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Document findUnique
   */
  export type DocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findUniqueOrThrow
   */
  export type DocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findFirst
   */
  export type DocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findFirstOrThrow
   */
  export type DocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findMany
   */
  export type DocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Documents to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document create
   */
  export type DocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a Document.
     */
    data: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
  }

  /**
   * Document createMany
   */
  export type DocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Document createManyAndReturn
   */
  export type DocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Document update
   */
  export type DocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a Document.
     */
    data: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
    /**
     * Choose, which Document to update.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document updateMany
   */
  export type DocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
  }

  /**
   * Document upsert
   */
  export type DocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the Document to update in case it exists.
     */
    where: DocumentWhereUniqueInput
    /**
     * In case the Document found by the `where` argument doesn't exist, create a new Document with this data.
     */
    create: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
    /**
     * In case the Document was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
  }

  /**
   * Document delete
   */
  export type DocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter which Document to delete.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document deleteMany
   */
  export type DocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Documents to delete
     */
    where?: DocumentWhereInput
  }

  /**
   * Document without action
   */
  export type DocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
  }


  /**
   * Model Reminder
   */

  export type AggregateReminder = {
    _count: ReminderCountAggregateOutputType | null
    _min: ReminderMinAggregateOutputType | null
    _max: ReminderMaxAggregateOutputType | null
  }

  export type ReminderMinAggregateOutputType = {
    id: string | null
    leadId: string | null
    title: string | null
    datetime: Date | null
    completed: boolean | null
    emailSent: boolean | null
    createdAt: Date | null
  }

  export type ReminderMaxAggregateOutputType = {
    id: string | null
    leadId: string | null
    title: string | null
    datetime: Date | null
    completed: boolean | null
    emailSent: boolean | null
    createdAt: Date | null
  }

  export type ReminderCountAggregateOutputType = {
    id: number
    leadId: number
    title: number
    datetime: number
    completed: number
    emailSent: number
    createdAt: number
    _all: number
  }


  export type ReminderMinAggregateInputType = {
    id?: true
    leadId?: true
    title?: true
    datetime?: true
    completed?: true
    emailSent?: true
    createdAt?: true
  }

  export type ReminderMaxAggregateInputType = {
    id?: true
    leadId?: true
    title?: true
    datetime?: true
    completed?: true
    emailSent?: true
    createdAt?: true
  }

  export type ReminderCountAggregateInputType = {
    id?: true
    leadId?: true
    title?: true
    datetime?: true
    completed?: true
    emailSent?: true
    createdAt?: true
    _all?: true
  }

  export type ReminderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reminder to aggregate.
     */
    where?: ReminderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reminders to fetch.
     */
    orderBy?: ReminderOrderByWithRelationInput | ReminderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReminderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reminders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reminders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reminders
    **/
    _count?: true | ReminderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReminderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReminderMaxAggregateInputType
  }

  export type GetReminderAggregateType<T extends ReminderAggregateArgs> = {
        [P in keyof T & keyof AggregateReminder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReminder[P]>
      : GetScalarType<T[P], AggregateReminder[P]>
  }




  export type ReminderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReminderWhereInput
    orderBy?: ReminderOrderByWithAggregationInput | ReminderOrderByWithAggregationInput[]
    by: ReminderScalarFieldEnum[] | ReminderScalarFieldEnum
    having?: ReminderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReminderCountAggregateInputType | true
    _min?: ReminderMinAggregateInputType
    _max?: ReminderMaxAggregateInputType
  }

  export type ReminderGroupByOutputType = {
    id: string
    leadId: string
    title: string
    datetime: Date
    completed: boolean
    emailSent: boolean
    createdAt: Date
    _count: ReminderCountAggregateOutputType | null
    _min: ReminderMinAggregateOutputType | null
    _max: ReminderMaxAggregateOutputType | null
  }

  type GetReminderGroupByPayload<T extends ReminderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReminderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReminderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReminderGroupByOutputType[P]>
            : GetScalarType<T[P], ReminderGroupByOutputType[P]>
        }
      >
    >


  export type ReminderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leadId?: boolean
    title?: boolean
    datetime?: boolean
    completed?: boolean
    emailSent?: boolean
    createdAt?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reminder"]>

  export type ReminderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leadId?: boolean
    title?: boolean
    datetime?: boolean
    completed?: boolean
    emailSent?: boolean
    createdAt?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reminder"]>

  export type ReminderSelectScalar = {
    id?: boolean
    leadId?: boolean
    title?: boolean
    datetime?: boolean
    completed?: boolean
    emailSent?: boolean
    createdAt?: boolean
  }

  export type ReminderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }
  export type ReminderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }

  export type $ReminderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Reminder"
    objects: {
      lead: Prisma.$LeadPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      leadId: string
      title: string
      datetime: Date
      completed: boolean
      emailSent: boolean
      createdAt: Date
    }, ExtArgs["result"]["reminder"]>
    composites: {}
  }

  type ReminderGetPayload<S extends boolean | null | undefined | ReminderDefaultArgs> = $Result.GetResult<Prisma.$ReminderPayload, S>

  type ReminderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ReminderFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ReminderCountAggregateInputType | true
    }

  export interface ReminderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Reminder'], meta: { name: 'Reminder' } }
    /**
     * Find zero or one Reminder that matches the filter.
     * @param {ReminderFindUniqueArgs} args - Arguments to find a Reminder
     * @example
     * // Get one Reminder
     * const reminder = await prisma.reminder.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReminderFindUniqueArgs>(args: SelectSubset<T, ReminderFindUniqueArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Reminder that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ReminderFindUniqueOrThrowArgs} args - Arguments to find a Reminder
     * @example
     * // Get one Reminder
     * const reminder = await prisma.reminder.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReminderFindUniqueOrThrowArgs>(args: SelectSubset<T, ReminderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Reminder that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReminderFindFirstArgs} args - Arguments to find a Reminder
     * @example
     * // Get one Reminder
     * const reminder = await prisma.reminder.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReminderFindFirstArgs>(args?: SelectSubset<T, ReminderFindFirstArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Reminder that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReminderFindFirstOrThrowArgs} args - Arguments to find a Reminder
     * @example
     * // Get one Reminder
     * const reminder = await prisma.reminder.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReminderFindFirstOrThrowArgs>(args?: SelectSubset<T, ReminderFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Reminders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReminderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reminders
     * const reminders = await prisma.reminder.findMany()
     * 
     * // Get first 10 Reminders
     * const reminders = await prisma.reminder.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reminderWithIdOnly = await prisma.reminder.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReminderFindManyArgs>(args?: SelectSubset<T, ReminderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Reminder.
     * @param {ReminderCreateArgs} args - Arguments to create a Reminder.
     * @example
     * // Create one Reminder
     * const Reminder = await prisma.reminder.create({
     *   data: {
     *     // ... data to create a Reminder
     *   }
     * })
     * 
     */
    create<T extends ReminderCreateArgs>(args: SelectSubset<T, ReminderCreateArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Reminders.
     * @param {ReminderCreateManyArgs} args - Arguments to create many Reminders.
     * @example
     * // Create many Reminders
     * const reminder = await prisma.reminder.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReminderCreateManyArgs>(args?: SelectSubset<T, ReminderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reminders and returns the data saved in the database.
     * @param {ReminderCreateManyAndReturnArgs} args - Arguments to create many Reminders.
     * @example
     * // Create many Reminders
     * const reminder = await prisma.reminder.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reminders and only return the `id`
     * const reminderWithIdOnly = await prisma.reminder.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReminderCreateManyAndReturnArgs>(args?: SelectSubset<T, ReminderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Reminder.
     * @param {ReminderDeleteArgs} args - Arguments to delete one Reminder.
     * @example
     * // Delete one Reminder
     * const Reminder = await prisma.reminder.delete({
     *   where: {
     *     // ... filter to delete one Reminder
     *   }
     * })
     * 
     */
    delete<T extends ReminderDeleteArgs>(args: SelectSubset<T, ReminderDeleteArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Reminder.
     * @param {ReminderUpdateArgs} args - Arguments to update one Reminder.
     * @example
     * // Update one Reminder
     * const reminder = await prisma.reminder.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReminderUpdateArgs>(args: SelectSubset<T, ReminderUpdateArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Reminders.
     * @param {ReminderDeleteManyArgs} args - Arguments to filter Reminders to delete.
     * @example
     * // Delete a few Reminders
     * const { count } = await prisma.reminder.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReminderDeleteManyArgs>(args?: SelectSubset<T, ReminderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reminders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReminderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reminders
     * const reminder = await prisma.reminder.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReminderUpdateManyArgs>(args: SelectSubset<T, ReminderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Reminder.
     * @param {ReminderUpsertArgs} args - Arguments to update or create a Reminder.
     * @example
     * // Update or create a Reminder
     * const reminder = await prisma.reminder.upsert({
     *   create: {
     *     // ... data to create a Reminder
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Reminder we want to update
     *   }
     * })
     */
    upsert<T extends ReminderUpsertArgs>(args: SelectSubset<T, ReminderUpsertArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Reminders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReminderCountArgs} args - Arguments to filter Reminders to count.
     * @example
     * // Count the number of Reminders
     * const count = await prisma.reminder.count({
     *   where: {
     *     // ... the filter for the Reminders we want to count
     *   }
     * })
    **/
    count<T extends ReminderCountArgs>(
      args?: Subset<T, ReminderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReminderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Reminder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReminderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ReminderAggregateArgs>(args: Subset<T, ReminderAggregateArgs>): Prisma.PrismaPromise<GetReminderAggregateType<T>>

    /**
     * Group by Reminder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReminderGroupByArgs} args - Group by arguments.
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
      T extends ReminderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReminderGroupByArgs['orderBy'] }
        : { orderBy?: ReminderGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ReminderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReminderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Reminder model
   */
  readonly fields: ReminderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Reminder.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReminderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lead<T extends LeadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LeadDefaultArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Reminder model
   */ 
  interface ReminderFieldRefs {
    readonly id: FieldRef<"Reminder", 'String'>
    readonly leadId: FieldRef<"Reminder", 'String'>
    readonly title: FieldRef<"Reminder", 'String'>
    readonly datetime: FieldRef<"Reminder", 'DateTime'>
    readonly completed: FieldRef<"Reminder", 'Boolean'>
    readonly emailSent: FieldRef<"Reminder", 'Boolean'>
    readonly createdAt: FieldRef<"Reminder", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Reminder findUnique
   */
  export type ReminderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * Filter, which Reminder to fetch.
     */
    where: ReminderWhereUniqueInput
  }

  /**
   * Reminder findUniqueOrThrow
   */
  export type ReminderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * Filter, which Reminder to fetch.
     */
    where: ReminderWhereUniqueInput
  }

  /**
   * Reminder findFirst
   */
  export type ReminderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * Filter, which Reminder to fetch.
     */
    where?: ReminderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reminders to fetch.
     */
    orderBy?: ReminderOrderByWithRelationInput | ReminderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reminders.
     */
    cursor?: ReminderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reminders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reminders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reminders.
     */
    distinct?: ReminderScalarFieldEnum | ReminderScalarFieldEnum[]
  }

  /**
   * Reminder findFirstOrThrow
   */
  export type ReminderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * Filter, which Reminder to fetch.
     */
    where?: ReminderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reminders to fetch.
     */
    orderBy?: ReminderOrderByWithRelationInput | ReminderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reminders.
     */
    cursor?: ReminderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reminders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reminders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reminders.
     */
    distinct?: ReminderScalarFieldEnum | ReminderScalarFieldEnum[]
  }

  /**
   * Reminder findMany
   */
  export type ReminderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * Filter, which Reminders to fetch.
     */
    where?: ReminderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reminders to fetch.
     */
    orderBy?: ReminderOrderByWithRelationInput | ReminderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reminders.
     */
    cursor?: ReminderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reminders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reminders.
     */
    skip?: number
    distinct?: ReminderScalarFieldEnum | ReminderScalarFieldEnum[]
  }

  /**
   * Reminder create
   */
  export type ReminderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * The data needed to create a Reminder.
     */
    data: XOR<ReminderCreateInput, ReminderUncheckedCreateInput>
  }

  /**
   * Reminder createMany
   */
  export type ReminderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reminders.
     */
    data: ReminderCreateManyInput | ReminderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Reminder createManyAndReturn
   */
  export type ReminderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Reminders.
     */
    data: ReminderCreateManyInput | ReminderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Reminder update
   */
  export type ReminderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * The data needed to update a Reminder.
     */
    data: XOR<ReminderUpdateInput, ReminderUncheckedUpdateInput>
    /**
     * Choose, which Reminder to update.
     */
    where: ReminderWhereUniqueInput
  }

  /**
   * Reminder updateMany
   */
  export type ReminderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reminders.
     */
    data: XOR<ReminderUpdateManyMutationInput, ReminderUncheckedUpdateManyInput>
    /**
     * Filter which Reminders to update
     */
    where?: ReminderWhereInput
  }

  /**
   * Reminder upsert
   */
  export type ReminderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * The filter to search for the Reminder to update in case it exists.
     */
    where: ReminderWhereUniqueInput
    /**
     * In case the Reminder found by the `where` argument doesn't exist, create a new Reminder with this data.
     */
    create: XOR<ReminderCreateInput, ReminderUncheckedCreateInput>
    /**
     * In case the Reminder was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReminderUpdateInput, ReminderUncheckedUpdateInput>
  }

  /**
   * Reminder delete
   */
  export type ReminderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * Filter which Reminder to delete.
     */
    where: ReminderWhereUniqueInput
  }

  /**
   * Reminder deleteMany
   */
  export type ReminderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reminders to delete
     */
    where?: ReminderWhereInput
  }

  /**
   * Reminder without action
   */
  export type ReminderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    tenantId: 'tenantId'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const LeadScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    data: 'data',
    tags: 'tags',
    pipelineId: 'pipelineId',
    stageId: 'stageId',
    tenantId: 'tenantId'
  };

  export type LeadScalarFieldEnum = (typeof LeadScalarFieldEnum)[keyof typeof LeadScalarFieldEnum]


  export const PipelineScalarFieldEnum: {
    id: 'id',
    name: 'name',
    isDefault: 'isDefault',
    tenantId: 'tenantId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PipelineScalarFieldEnum = (typeof PipelineScalarFieldEnum)[keyof typeof PipelineScalarFieldEnum]


  export const PipelineStageScalarFieldEnum: {
    id: 'id',
    name: 'name',
    color: 'color',
    order: 'order',
    pipelineId: 'pipelineId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PipelineStageScalarFieldEnum = (typeof PipelineStageScalarFieldEnum)[keyof typeof PipelineStageScalarFieldEnum]


  export const CustomFieldScalarFieldEnum: {
    id: 'id',
    name: 'name',
    key: 'key',
    type: 'type',
    options: 'options',
    entityType: 'entityType',
    tenantId: 'tenantId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CustomFieldScalarFieldEnum = (typeof CustomFieldScalarFieldEnum)[keyof typeof CustomFieldScalarFieldEnum]


  export const TimelineEventScalarFieldEnum: {
    id: 'id',
    leadId: 'leadId',
    type: 'type',
    description: 'description',
    date: 'date',
    icon: 'icon',
    metadata: 'metadata'
  };

  export type TimelineEventScalarFieldEnum = (typeof TimelineEventScalarFieldEnum)[keyof typeof TimelineEventScalarFieldEnum]


  export const ContractScalarFieldEnum: {
    id: 'id',
    leadId: 'leadId',
    title: 'title',
    amount: 'amount',
    startDate: 'startDate',
    endDate: 'endDate',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type ContractScalarFieldEnum = (typeof ContractScalarFieldEnum)[keyof typeof ContractScalarFieldEnum]


  export const PracticeScalarFieldEnum: {
    id: 'id',
    leadId: 'leadId',
    title: 'title',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type PracticeScalarFieldEnum = (typeof PracticeScalarFieldEnum)[keyof typeof PracticeScalarFieldEnum]


  export const DocumentScalarFieldEnum: {
    id: 'id',
    leadId: 'leadId',
    name: 'name',
    type: 'type',
    path: 'path',
    size: 'size',
    uploadedAt: 'uploadedAt'
  };

  export type DocumentScalarFieldEnum = (typeof DocumentScalarFieldEnum)[keyof typeof DocumentScalarFieldEnum]


  export const ReminderScalarFieldEnum: {
    id: 'id',
    leadId: 'leadId',
    title: 'title',
    datetime: 'datetime',
    completed: 'completed',
    emailSent: 'emailSent',
    createdAt: 'createdAt'
  };

  export type ReminderScalarFieldEnum = (typeof ReminderScalarFieldEnum)[keyof typeof ReminderScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    tenantId?: StringNullableFilter<"User"> | string | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenantId?: SortOrderInput | SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    tenantId?: StringNullableFilter<"User"> | string | null
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenantId?: SortOrderInput | SortOrder
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
    password?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    tenantId?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type LeadWhereInput = {
    AND?: LeadWhereInput | LeadWhereInput[]
    OR?: LeadWhereInput[]
    NOT?: LeadWhereInput | LeadWhereInput[]
    id?: StringFilter<"Lead"> | string
    firstName?: StringFilter<"Lead"> | string
    lastName?: StringFilter<"Lead"> | string
    email?: StringFilter<"Lead"> | string
    status?: StringFilter<"Lead"> | string
    createdAt?: DateTimeFilter<"Lead"> | Date | string
    updatedAt?: DateTimeFilter<"Lead"> | Date | string
    data?: JsonNullableFilter<"Lead">
    tags?: StringNullableListFilter<"Lead">
    pipelineId?: StringNullableFilter<"Lead"> | string | null
    stageId?: StringNullableFilter<"Lead"> | string | null
    tenantId?: StringNullableFilter<"Lead"> | string | null
    timeline?: TimelineEventListRelationFilter
    contracts?: ContractListRelationFilter
    practices?: PracticeListRelationFilter
    documents?: DocumentListRelationFilter
    reminders?: ReminderListRelationFilter
    pipeline?: XOR<PipelineNullableRelationFilter, PipelineWhereInput> | null
    stage?: XOR<PipelineStageNullableRelationFilter, PipelineStageWhereInput> | null
  }

  export type LeadOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    data?: SortOrderInput | SortOrder
    tags?: SortOrder
    pipelineId?: SortOrderInput | SortOrder
    stageId?: SortOrderInput | SortOrder
    tenantId?: SortOrderInput | SortOrder
    timeline?: TimelineEventOrderByRelationAggregateInput
    contracts?: ContractOrderByRelationAggregateInput
    practices?: PracticeOrderByRelationAggregateInput
    documents?: DocumentOrderByRelationAggregateInput
    reminders?: ReminderOrderByRelationAggregateInput
    pipeline?: PipelineOrderByWithRelationInput
    stage?: PipelineStageOrderByWithRelationInput
  }

  export type LeadWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LeadWhereInput | LeadWhereInput[]
    OR?: LeadWhereInput[]
    NOT?: LeadWhereInput | LeadWhereInput[]
    firstName?: StringFilter<"Lead"> | string
    lastName?: StringFilter<"Lead"> | string
    email?: StringFilter<"Lead"> | string
    status?: StringFilter<"Lead"> | string
    createdAt?: DateTimeFilter<"Lead"> | Date | string
    updatedAt?: DateTimeFilter<"Lead"> | Date | string
    data?: JsonNullableFilter<"Lead">
    tags?: StringNullableListFilter<"Lead">
    pipelineId?: StringNullableFilter<"Lead"> | string | null
    stageId?: StringNullableFilter<"Lead"> | string | null
    tenantId?: StringNullableFilter<"Lead"> | string | null
    timeline?: TimelineEventListRelationFilter
    contracts?: ContractListRelationFilter
    practices?: PracticeListRelationFilter
    documents?: DocumentListRelationFilter
    reminders?: ReminderListRelationFilter
    pipeline?: XOR<PipelineNullableRelationFilter, PipelineWhereInput> | null
    stage?: XOR<PipelineStageNullableRelationFilter, PipelineStageWhereInput> | null
  }, "id">

  export type LeadOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    data?: SortOrderInput | SortOrder
    tags?: SortOrder
    pipelineId?: SortOrderInput | SortOrder
    stageId?: SortOrderInput | SortOrder
    tenantId?: SortOrderInput | SortOrder
    _count?: LeadCountOrderByAggregateInput
    _max?: LeadMaxOrderByAggregateInput
    _min?: LeadMinOrderByAggregateInput
  }

  export type LeadScalarWhereWithAggregatesInput = {
    AND?: LeadScalarWhereWithAggregatesInput | LeadScalarWhereWithAggregatesInput[]
    OR?: LeadScalarWhereWithAggregatesInput[]
    NOT?: LeadScalarWhereWithAggregatesInput | LeadScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Lead"> | string
    firstName?: StringWithAggregatesFilter<"Lead"> | string
    lastName?: StringWithAggregatesFilter<"Lead"> | string
    email?: StringWithAggregatesFilter<"Lead"> | string
    status?: StringWithAggregatesFilter<"Lead"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Lead"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Lead"> | Date | string
    data?: JsonNullableWithAggregatesFilter<"Lead">
    tags?: StringNullableListFilter<"Lead">
    pipelineId?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    stageId?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    tenantId?: StringNullableWithAggregatesFilter<"Lead"> | string | null
  }

  export type PipelineWhereInput = {
    AND?: PipelineWhereInput | PipelineWhereInput[]
    OR?: PipelineWhereInput[]
    NOT?: PipelineWhereInput | PipelineWhereInput[]
    id?: StringFilter<"Pipeline"> | string
    name?: StringFilter<"Pipeline"> | string
    isDefault?: BoolFilter<"Pipeline"> | boolean
    tenantId?: StringNullableFilter<"Pipeline"> | string | null
    createdAt?: DateTimeFilter<"Pipeline"> | Date | string
    updatedAt?: DateTimeFilter<"Pipeline"> | Date | string
    stages?: PipelineStageListRelationFilter
    leads?: LeadListRelationFilter
  }

  export type PipelineOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    isDefault?: SortOrder
    tenantId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    stages?: PipelineStageOrderByRelationAggregateInput
    leads?: LeadOrderByRelationAggregateInput
  }

  export type PipelineWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PipelineWhereInput | PipelineWhereInput[]
    OR?: PipelineWhereInput[]
    NOT?: PipelineWhereInput | PipelineWhereInput[]
    name?: StringFilter<"Pipeline"> | string
    isDefault?: BoolFilter<"Pipeline"> | boolean
    tenantId?: StringNullableFilter<"Pipeline"> | string | null
    createdAt?: DateTimeFilter<"Pipeline"> | Date | string
    updatedAt?: DateTimeFilter<"Pipeline"> | Date | string
    stages?: PipelineStageListRelationFilter
    leads?: LeadListRelationFilter
  }, "id">

  export type PipelineOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    isDefault?: SortOrder
    tenantId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PipelineCountOrderByAggregateInput
    _max?: PipelineMaxOrderByAggregateInput
    _min?: PipelineMinOrderByAggregateInput
  }

  export type PipelineScalarWhereWithAggregatesInput = {
    AND?: PipelineScalarWhereWithAggregatesInput | PipelineScalarWhereWithAggregatesInput[]
    OR?: PipelineScalarWhereWithAggregatesInput[]
    NOT?: PipelineScalarWhereWithAggregatesInput | PipelineScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Pipeline"> | string
    name?: StringWithAggregatesFilter<"Pipeline"> | string
    isDefault?: BoolWithAggregatesFilter<"Pipeline"> | boolean
    tenantId?: StringNullableWithAggregatesFilter<"Pipeline"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Pipeline"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Pipeline"> | Date | string
  }

  export type PipelineStageWhereInput = {
    AND?: PipelineStageWhereInput | PipelineStageWhereInput[]
    OR?: PipelineStageWhereInput[]
    NOT?: PipelineStageWhereInput | PipelineStageWhereInput[]
    id?: StringFilter<"PipelineStage"> | string
    name?: StringFilter<"PipelineStage"> | string
    color?: StringFilter<"PipelineStage"> | string
    order?: IntFilter<"PipelineStage"> | number
    pipelineId?: StringFilter<"PipelineStage"> | string
    createdAt?: DateTimeFilter<"PipelineStage"> | Date | string
    updatedAt?: DateTimeFilter<"PipelineStage"> | Date | string
    pipeline?: XOR<PipelineRelationFilter, PipelineWhereInput>
    leads?: LeadListRelationFilter
  }

  export type PipelineStageOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    order?: SortOrder
    pipelineId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pipeline?: PipelineOrderByWithRelationInput
    leads?: LeadOrderByRelationAggregateInput
  }

  export type PipelineStageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PipelineStageWhereInput | PipelineStageWhereInput[]
    OR?: PipelineStageWhereInput[]
    NOT?: PipelineStageWhereInput | PipelineStageWhereInput[]
    name?: StringFilter<"PipelineStage"> | string
    color?: StringFilter<"PipelineStage"> | string
    order?: IntFilter<"PipelineStage"> | number
    pipelineId?: StringFilter<"PipelineStage"> | string
    createdAt?: DateTimeFilter<"PipelineStage"> | Date | string
    updatedAt?: DateTimeFilter<"PipelineStage"> | Date | string
    pipeline?: XOR<PipelineRelationFilter, PipelineWhereInput>
    leads?: LeadListRelationFilter
  }, "id">

  export type PipelineStageOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    order?: SortOrder
    pipelineId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PipelineStageCountOrderByAggregateInput
    _avg?: PipelineStageAvgOrderByAggregateInput
    _max?: PipelineStageMaxOrderByAggregateInput
    _min?: PipelineStageMinOrderByAggregateInput
    _sum?: PipelineStageSumOrderByAggregateInput
  }

  export type PipelineStageScalarWhereWithAggregatesInput = {
    AND?: PipelineStageScalarWhereWithAggregatesInput | PipelineStageScalarWhereWithAggregatesInput[]
    OR?: PipelineStageScalarWhereWithAggregatesInput[]
    NOT?: PipelineStageScalarWhereWithAggregatesInput | PipelineStageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PipelineStage"> | string
    name?: StringWithAggregatesFilter<"PipelineStage"> | string
    color?: StringWithAggregatesFilter<"PipelineStage"> | string
    order?: IntWithAggregatesFilter<"PipelineStage"> | number
    pipelineId?: StringWithAggregatesFilter<"PipelineStage"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PipelineStage"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PipelineStage"> | Date | string
  }

  export type CustomFieldWhereInput = {
    AND?: CustomFieldWhereInput | CustomFieldWhereInput[]
    OR?: CustomFieldWhereInput[]
    NOT?: CustomFieldWhereInput | CustomFieldWhereInput[]
    id?: StringFilter<"CustomField"> | string
    name?: StringFilter<"CustomField"> | string
    key?: StringFilter<"CustomField"> | string
    type?: StringFilter<"CustomField"> | string
    options?: JsonNullableFilter<"CustomField">
    entityType?: StringFilter<"CustomField"> | string
    tenantId?: StringNullableFilter<"CustomField"> | string | null
    createdAt?: DateTimeFilter<"CustomField"> | Date | string
    updatedAt?: DateTimeFilter<"CustomField"> | Date | string
  }

  export type CustomFieldOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    key?: SortOrder
    type?: SortOrder
    options?: SortOrderInput | SortOrder
    entityType?: SortOrder
    tenantId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomFieldWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CustomFieldWhereInput | CustomFieldWhereInput[]
    OR?: CustomFieldWhereInput[]
    NOT?: CustomFieldWhereInput | CustomFieldWhereInput[]
    name?: StringFilter<"CustomField"> | string
    key?: StringFilter<"CustomField"> | string
    type?: StringFilter<"CustomField"> | string
    options?: JsonNullableFilter<"CustomField">
    entityType?: StringFilter<"CustomField"> | string
    tenantId?: StringNullableFilter<"CustomField"> | string | null
    createdAt?: DateTimeFilter<"CustomField"> | Date | string
    updatedAt?: DateTimeFilter<"CustomField"> | Date | string
  }, "id">

  export type CustomFieldOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    key?: SortOrder
    type?: SortOrder
    options?: SortOrderInput | SortOrder
    entityType?: SortOrder
    tenantId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CustomFieldCountOrderByAggregateInput
    _max?: CustomFieldMaxOrderByAggregateInput
    _min?: CustomFieldMinOrderByAggregateInput
  }

  export type CustomFieldScalarWhereWithAggregatesInput = {
    AND?: CustomFieldScalarWhereWithAggregatesInput | CustomFieldScalarWhereWithAggregatesInput[]
    OR?: CustomFieldScalarWhereWithAggregatesInput[]
    NOT?: CustomFieldScalarWhereWithAggregatesInput | CustomFieldScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CustomField"> | string
    name?: StringWithAggregatesFilter<"CustomField"> | string
    key?: StringWithAggregatesFilter<"CustomField"> | string
    type?: StringWithAggregatesFilter<"CustomField"> | string
    options?: JsonNullableWithAggregatesFilter<"CustomField">
    entityType?: StringWithAggregatesFilter<"CustomField"> | string
    tenantId?: StringNullableWithAggregatesFilter<"CustomField"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CustomField"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CustomField"> | Date | string
  }

  export type TimelineEventWhereInput = {
    AND?: TimelineEventWhereInput | TimelineEventWhereInput[]
    OR?: TimelineEventWhereInput[]
    NOT?: TimelineEventWhereInput | TimelineEventWhereInput[]
    id?: StringFilter<"TimelineEvent"> | string
    leadId?: StringFilter<"TimelineEvent"> | string
    type?: StringFilter<"TimelineEvent"> | string
    description?: StringFilter<"TimelineEvent"> | string
    date?: DateTimeFilter<"TimelineEvent"> | Date | string
    icon?: StringNullableFilter<"TimelineEvent"> | string | null
    metadata?: JsonNullableFilter<"TimelineEvent">
    lead?: XOR<LeadRelationFilter, LeadWhereInput>
  }

  export type TimelineEventOrderByWithRelationInput = {
    id?: SortOrder
    leadId?: SortOrder
    type?: SortOrder
    description?: SortOrder
    date?: SortOrder
    icon?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    lead?: LeadOrderByWithRelationInput
  }

  export type TimelineEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TimelineEventWhereInput | TimelineEventWhereInput[]
    OR?: TimelineEventWhereInput[]
    NOT?: TimelineEventWhereInput | TimelineEventWhereInput[]
    leadId?: StringFilter<"TimelineEvent"> | string
    type?: StringFilter<"TimelineEvent"> | string
    description?: StringFilter<"TimelineEvent"> | string
    date?: DateTimeFilter<"TimelineEvent"> | Date | string
    icon?: StringNullableFilter<"TimelineEvent"> | string | null
    metadata?: JsonNullableFilter<"TimelineEvent">
    lead?: XOR<LeadRelationFilter, LeadWhereInput>
  }, "id">

  export type TimelineEventOrderByWithAggregationInput = {
    id?: SortOrder
    leadId?: SortOrder
    type?: SortOrder
    description?: SortOrder
    date?: SortOrder
    icon?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    _count?: TimelineEventCountOrderByAggregateInput
    _max?: TimelineEventMaxOrderByAggregateInput
    _min?: TimelineEventMinOrderByAggregateInput
  }

  export type TimelineEventScalarWhereWithAggregatesInput = {
    AND?: TimelineEventScalarWhereWithAggregatesInput | TimelineEventScalarWhereWithAggregatesInput[]
    OR?: TimelineEventScalarWhereWithAggregatesInput[]
    NOT?: TimelineEventScalarWhereWithAggregatesInput | TimelineEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TimelineEvent"> | string
    leadId?: StringWithAggregatesFilter<"TimelineEvent"> | string
    type?: StringWithAggregatesFilter<"TimelineEvent"> | string
    description?: StringWithAggregatesFilter<"TimelineEvent"> | string
    date?: DateTimeWithAggregatesFilter<"TimelineEvent"> | Date | string
    icon?: StringNullableWithAggregatesFilter<"TimelineEvent"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"TimelineEvent">
  }

  export type ContractWhereInput = {
    AND?: ContractWhereInput | ContractWhereInput[]
    OR?: ContractWhereInput[]
    NOT?: ContractWhereInput | ContractWhereInput[]
    id?: StringFilter<"Contract"> | string
    leadId?: StringFilter<"Contract"> | string
    title?: StringFilter<"Contract"> | string
    amount?: FloatFilter<"Contract"> | number
    startDate?: DateTimeNullableFilter<"Contract"> | Date | string | null
    endDate?: DateTimeFilter<"Contract"> | Date | string
    status?: StringFilter<"Contract"> | string
    createdAt?: DateTimeFilter<"Contract"> | Date | string
    lead?: XOR<LeadRelationFilter, LeadWhereInput>
  }

  export type ContractOrderByWithRelationInput = {
    id?: SortOrder
    leadId?: SortOrder
    title?: SortOrder
    amount?: SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    lead?: LeadOrderByWithRelationInput
  }

  export type ContractWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ContractWhereInput | ContractWhereInput[]
    OR?: ContractWhereInput[]
    NOT?: ContractWhereInput | ContractWhereInput[]
    leadId?: StringFilter<"Contract"> | string
    title?: StringFilter<"Contract"> | string
    amount?: FloatFilter<"Contract"> | number
    startDate?: DateTimeNullableFilter<"Contract"> | Date | string | null
    endDate?: DateTimeFilter<"Contract"> | Date | string
    status?: StringFilter<"Contract"> | string
    createdAt?: DateTimeFilter<"Contract"> | Date | string
    lead?: XOR<LeadRelationFilter, LeadWhereInput>
  }, "id">

  export type ContractOrderByWithAggregationInput = {
    id?: SortOrder
    leadId?: SortOrder
    title?: SortOrder
    amount?: SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: ContractCountOrderByAggregateInput
    _avg?: ContractAvgOrderByAggregateInput
    _max?: ContractMaxOrderByAggregateInput
    _min?: ContractMinOrderByAggregateInput
    _sum?: ContractSumOrderByAggregateInput
  }

  export type ContractScalarWhereWithAggregatesInput = {
    AND?: ContractScalarWhereWithAggregatesInput | ContractScalarWhereWithAggregatesInput[]
    OR?: ContractScalarWhereWithAggregatesInput[]
    NOT?: ContractScalarWhereWithAggregatesInput | ContractScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Contract"> | string
    leadId?: StringWithAggregatesFilter<"Contract"> | string
    title?: StringWithAggregatesFilter<"Contract"> | string
    amount?: FloatWithAggregatesFilter<"Contract"> | number
    startDate?: DateTimeNullableWithAggregatesFilter<"Contract"> | Date | string | null
    endDate?: DateTimeWithAggregatesFilter<"Contract"> | Date | string
    status?: StringWithAggregatesFilter<"Contract"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Contract"> | Date | string
  }

  export type PracticeWhereInput = {
    AND?: PracticeWhereInput | PracticeWhereInput[]
    OR?: PracticeWhereInput[]
    NOT?: PracticeWhereInput | PracticeWhereInput[]
    id?: StringFilter<"Practice"> | string
    leadId?: StringFilter<"Practice"> | string
    title?: StringFilter<"Practice"> | string
    status?: StringFilter<"Practice"> | string
    createdAt?: DateTimeFilter<"Practice"> | Date | string
    lead?: XOR<LeadRelationFilter, LeadWhereInput>
  }

  export type PracticeOrderByWithRelationInput = {
    id?: SortOrder
    leadId?: SortOrder
    title?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    lead?: LeadOrderByWithRelationInput
  }

  export type PracticeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PracticeWhereInput | PracticeWhereInput[]
    OR?: PracticeWhereInput[]
    NOT?: PracticeWhereInput | PracticeWhereInput[]
    leadId?: StringFilter<"Practice"> | string
    title?: StringFilter<"Practice"> | string
    status?: StringFilter<"Practice"> | string
    createdAt?: DateTimeFilter<"Practice"> | Date | string
    lead?: XOR<LeadRelationFilter, LeadWhereInput>
  }, "id">

  export type PracticeOrderByWithAggregationInput = {
    id?: SortOrder
    leadId?: SortOrder
    title?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: PracticeCountOrderByAggregateInput
    _max?: PracticeMaxOrderByAggregateInput
    _min?: PracticeMinOrderByAggregateInput
  }

  export type PracticeScalarWhereWithAggregatesInput = {
    AND?: PracticeScalarWhereWithAggregatesInput | PracticeScalarWhereWithAggregatesInput[]
    OR?: PracticeScalarWhereWithAggregatesInput[]
    NOT?: PracticeScalarWhereWithAggregatesInput | PracticeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Practice"> | string
    leadId?: StringWithAggregatesFilter<"Practice"> | string
    title?: StringWithAggregatesFilter<"Practice"> | string
    status?: StringWithAggregatesFilter<"Practice"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Practice"> | Date | string
  }

  export type DocumentWhereInput = {
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    id?: StringFilter<"Document"> | string
    leadId?: StringFilter<"Document"> | string
    name?: StringFilter<"Document"> | string
    type?: StringFilter<"Document"> | string
    path?: StringFilter<"Document"> | string
    size?: IntNullableFilter<"Document"> | number | null
    uploadedAt?: DateTimeFilter<"Document"> | Date | string
    lead?: XOR<LeadRelationFilter, LeadWhereInput>
  }

  export type DocumentOrderByWithRelationInput = {
    id?: SortOrder
    leadId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    path?: SortOrder
    size?: SortOrderInput | SortOrder
    uploadedAt?: SortOrder
    lead?: LeadOrderByWithRelationInput
  }

  export type DocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    leadId?: StringFilter<"Document"> | string
    name?: StringFilter<"Document"> | string
    type?: StringFilter<"Document"> | string
    path?: StringFilter<"Document"> | string
    size?: IntNullableFilter<"Document"> | number | null
    uploadedAt?: DateTimeFilter<"Document"> | Date | string
    lead?: XOR<LeadRelationFilter, LeadWhereInput>
  }, "id">

  export type DocumentOrderByWithAggregationInput = {
    id?: SortOrder
    leadId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    path?: SortOrder
    size?: SortOrderInput | SortOrder
    uploadedAt?: SortOrder
    _count?: DocumentCountOrderByAggregateInput
    _avg?: DocumentAvgOrderByAggregateInput
    _max?: DocumentMaxOrderByAggregateInput
    _min?: DocumentMinOrderByAggregateInput
    _sum?: DocumentSumOrderByAggregateInput
  }

  export type DocumentScalarWhereWithAggregatesInput = {
    AND?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    OR?: DocumentScalarWhereWithAggregatesInput[]
    NOT?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Document"> | string
    leadId?: StringWithAggregatesFilter<"Document"> | string
    name?: StringWithAggregatesFilter<"Document"> | string
    type?: StringWithAggregatesFilter<"Document"> | string
    path?: StringWithAggregatesFilter<"Document"> | string
    size?: IntNullableWithAggregatesFilter<"Document"> | number | null
    uploadedAt?: DateTimeWithAggregatesFilter<"Document"> | Date | string
  }

  export type ReminderWhereInput = {
    AND?: ReminderWhereInput | ReminderWhereInput[]
    OR?: ReminderWhereInput[]
    NOT?: ReminderWhereInput | ReminderWhereInput[]
    id?: StringFilter<"Reminder"> | string
    leadId?: StringFilter<"Reminder"> | string
    title?: StringFilter<"Reminder"> | string
    datetime?: DateTimeFilter<"Reminder"> | Date | string
    completed?: BoolFilter<"Reminder"> | boolean
    emailSent?: BoolFilter<"Reminder"> | boolean
    createdAt?: DateTimeFilter<"Reminder"> | Date | string
    lead?: XOR<LeadRelationFilter, LeadWhereInput>
  }

  export type ReminderOrderByWithRelationInput = {
    id?: SortOrder
    leadId?: SortOrder
    title?: SortOrder
    datetime?: SortOrder
    completed?: SortOrder
    emailSent?: SortOrder
    createdAt?: SortOrder
    lead?: LeadOrderByWithRelationInput
  }

  export type ReminderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReminderWhereInput | ReminderWhereInput[]
    OR?: ReminderWhereInput[]
    NOT?: ReminderWhereInput | ReminderWhereInput[]
    leadId?: StringFilter<"Reminder"> | string
    title?: StringFilter<"Reminder"> | string
    datetime?: DateTimeFilter<"Reminder"> | Date | string
    completed?: BoolFilter<"Reminder"> | boolean
    emailSent?: BoolFilter<"Reminder"> | boolean
    createdAt?: DateTimeFilter<"Reminder"> | Date | string
    lead?: XOR<LeadRelationFilter, LeadWhereInput>
  }, "id">

  export type ReminderOrderByWithAggregationInput = {
    id?: SortOrder
    leadId?: SortOrder
    title?: SortOrder
    datetime?: SortOrder
    completed?: SortOrder
    emailSent?: SortOrder
    createdAt?: SortOrder
    _count?: ReminderCountOrderByAggregateInput
    _max?: ReminderMaxOrderByAggregateInput
    _min?: ReminderMinOrderByAggregateInput
  }

  export type ReminderScalarWhereWithAggregatesInput = {
    AND?: ReminderScalarWhereWithAggregatesInput | ReminderScalarWhereWithAggregatesInput[]
    OR?: ReminderScalarWhereWithAggregatesInput[]
    NOT?: ReminderScalarWhereWithAggregatesInput | ReminderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Reminder"> | string
    leadId?: StringWithAggregatesFilter<"Reminder"> | string
    title?: StringWithAggregatesFilter<"Reminder"> | string
    datetime?: DateTimeWithAggregatesFilter<"Reminder"> | Date | string
    completed?: BoolWithAggregatesFilter<"Reminder"> | boolean
    emailSent?: BoolWithAggregatesFilter<"Reminder"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Reminder"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: string | null
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: string | null
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantId?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LeadCreateInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadCreatetagsInput | string[]
    tenantId?: string | null
    timeline?: TimelineEventCreateNestedManyWithoutLeadInput
    contracts?: ContractCreateNestedManyWithoutLeadInput
    practices?: PracticeCreateNestedManyWithoutLeadInput
    documents?: DocumentCreateNestedManyWithoutLeadInput
    reminders?: ReminderCreateNestedManyWithoutLeadInput
    pipeline?: PipelineCreateNestedOneWithoutLeadsInput
    stage?: PipelineStageCreateNestedOneWithoutLeadsInput
  }

  export type LeadUncheckedCreateInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadCreatetagsInput | string[]
    pipelineId?: string | null
    stageId?: string | null
    tenantId?: string | null
    timeline?: TimelineEventUncheckedCreateNestedManyWithoutLeadInput
    contracts?: ContractUncheckedCreateNestedManyWithoutLeadInput
    practices?: PracticeUncheckedCreateNestedManyWithoutLeadInput
    documents?: DocumentUncheckedCreateNestedManyWithoutLeadInput
    reminders?: ReminderUncheckedCreateNestedManyWithoutLeadInput
  }

  export type LeadUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadUpdatetagsInput | string[]
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    timeline?: TimelineEventUpdateManyWithoutLeadNestedInput
    contracts?: ContractUpdateManyWithoutLeadNestedInput
    practices?: PracticeUpdateManyWithoutLeadNestedInput
    documents?: DocumentUpdateManyWithoutLeadNestedInput
    reminders?: ReminderUpdateManyWithoutLeadNestedInput
    pipeline?: PipelineUpdateOneWithoutLeadsNestedInput
    stage?: PipelineStageUpdateOneWithoutLeadsNestedInput
  }

  export type LeadUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadUpdatetagsInput | string[]
    pipelineId?: NullableStringFieldUpdateOperationsInput | string | null
    stageId?: NullableStringFieldUpdateOperationsInput | string | null
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    timeline?: TimelineEventUncheckedUpdateManyWithoutLeadNestedInput
    contracts?: ContractUncheckedUpdateManyWithoutLeadNestedInput
    practices?: PracticeUncheckedUpdateManyWithoutLeadNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutLeadNestedInput
    reminders?: ReminderUncheckedUpdateManyWithoutLeadNestedInput
  }

  export type LeadCreateManyInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadCreatetagsInput | string[]
    pipelineId?: string | null
    stageId?: string | null
    tenantId?: string | null
  }

  export type LeadUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadUpdatetagsInput | string[]
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LeadUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadUpdatetagsInput | string[]
    pipelineId?: NullableStringFieldUpdateOperationsInput | string | null
    stageId?: NullableStringFieldUpdateOperationsInput | string | null
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PipelineCreateInput = {
    id?: string
    name: string
    isDefault?: boolean
    tenantId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stages?: PipelineStageCreateNestedManyWithoutPipelineInput
    leads?: LeadCreateNestedManyWithoutPipelineInput
  }

  export type PipelineUncheckedCreateInput = {
    id?: string
    name: string
    isDefault?: boolean
    tenantId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stages?: PipelineStageUncheckedCreateNestedManyWithoutPipelineInput
    leads?: LeadUncheckedCreateNestedManyWithoutPipelineInput
  }

  export type PipelineUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stages?: PipelineStageUpdateManyWithoutPipelineNestedInput
    leads?: LeadUpdateManyWithoutPipelineNestedInput
  }

  export type PipelineUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stages?: PipelineStageUncheckedUpdateManyWithoutPipelineNestedInput
    leads?: LeadUncheckedUpdateManyWithoutPipelineNestedInput
  }

  export type PipelineCreateManyInput = {
    id?: string
    name: string
    isDefault?: boolean
    tenantId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PipelineUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PipelineUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PipelineStageCreateInput = {
    id?: string
    name: string
    color?: string
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    pipeline: PipelineCreateNestedOneWithoutStagesInput
    leads?: LeadCreateNestedManyWithoutStageInput
  }

  export type PipelineStageUncheckedCreateInput = {
    id?: string
    name: string
    color?: string
    order?: number
    pipelineId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    leads?: LeadUncheckedCreateNestedManyWithoutStageInput
  }

  export type PipelineStageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pipeline?: PipelineUpdateOneRequiredWithoutStagesNestedInput
    leads?: LeadUpdateManyWithoutStageNestedInput
  }

  export type PipelineStageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    pipelineId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leads?: LeadUncheckedUpdateManyWithoutStageNestedInput
  }

  export type PipelineStageCreateManyInput = {
    id?: string
    name: string
    color?: string
    order?: number
    pipelineId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PipelineStageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PipelineStageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    pipelineId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomFieldCreateInput = {
    id?: string
    name: string
    key: string
    type: string
    options?: NullableJsonNullValueInput | InputJsonValue
    entityType: string
    tenantId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomFieldUncheckedCreateInput = {
    id?: string
    name: string
    key: string
    type: string
    options?: NullableJsonNullValueInput | InputJsonValue
    entityType: string
    tenantId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomFieldUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    options?: NullableJsonNullValueInput | InputJsonValue
    entityType?: StringFieldUpdateOperationsInput | string
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomFieldUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    options?: NullableJsonNullValueInput | InputJsonValue
    entityType?: StringFieldUpdateOperationsInput | string
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomFieldCreateManyInput = {
    id?: string
    name: string
    key: string
    type: string
    options?: NullableJsonNullValueInput | InputJsonValue
    entityType: string
    tenantId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomFieldUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    options?: NullableJsonNullValueInput | InputJsonValue
    entityType?: StringFieldUpdateOperationsInput | string
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomFieldUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    options?: NullableJsonNullValueInput | InputJsonValue
    entityType?: StringFieldUpdateOperationsInput | string
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimelineEventCreateInput = {
    id?: string
    type: string
    description: string
    date?: Date | string
    icon?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    lead: LeadCreateNestedOneWithoutTimelineInput
  }

  export type TimelineEventUncheckedCreateInput = {
    id?: string
    leadId: string
    type: string
    description: string
    date?: Date | string
    icon?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type TimelineEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    lead?: LeadUpdateOneRequiredWithoutTimelineNestedInput
  }

  export type TimelineEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type TimelineEventCreateManyInput = {
    id?: string
    leadId: string
    type: string
    description: string
    date?: Date | string
    icon?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type TimelineEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type TimelineEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ContractCreateInput = {
    id?: string
    title: string
    amount?: number
    startDate?: Date | string | null
    endDate: Date | string
    status?: string
    createdAt?: Date | string
    lead: LeadCreateNestedOneWithoutContractsInput
  }

  export type ContractUncheckedCreateInput = {
    id?: string
    leadId: string
    title: string
    amount?: number
    startDate?: Date | string | null
    endDate: Date | string
    status?: string
    createdAt?: Date | string
  }

  export type ContractUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lead?: LeadUpdateOneRequiredWithoutContractsNestedInput
  }

  export type ContractUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractCreateManyInput = {
    id?: string
    leadId: string
    title: string
    amount?: number
    startDate?: Date | string | null
    endDate: Date | string
    status?: string
    createdAt?: Date | string
  }

  export type ContractUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PracticeCreateInput = {
    id?: string
    title: string
    status?: string
    createdAt?: Date | string
    lead: LeadCreateNestedOneWithoutPracticesInput
  }

  export type PracticeUncheckedCreateInput = {
    id?: string
    leadId: string
    title: string
    status?: string
    createdAt?: Date | string
  }

  export type PracticeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lead?: LeadUpdateOneRequiredWithoutPracticesNestedInput
  }

  export type PracticeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PracticeCreateManyInput = {
    id?: string
    leadId: string
    title: string
    status?: string
    createdAt?: Date | string
  }

  export type PracticeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PracticeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentCreateInput = {
    id?: string
    name: string
    type: string
    path: string
    size?: number | null
    uploadedAt?: Date | string
    lead: LeadCreateNestedOneWithoutDocumentsInput
  }

  export type DocumentUncheckedCreateInput = {
    id?: string
    leadId: string
    name: string
    type: string
    path: string
    size?: number | null
    uploadedAt?: Date | string
  }

  export type DocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    size?: NullableIntFieldUpdateOperationsInput | number | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lead?: LeadUpdateOneRequiredWithoutDocumentsNestedInput
  }

  export type DocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    size?: NullableIntFieldUpdateOperationsInput | number | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentCreateManyInput = {
    id?: string
    leadId: string
    name: string
    type: string
    path: string
    size?: number | null
    uploadedAt?: Date | string
  }

  export type DocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    size?: NullableIntFieldUpdateOperationsInput | number | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    size?: NullableIntFieldUpdateOperationsInput | number | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReminderCreateInput = {
    id?: string
    title: string
    datetime: Date | string
    completed?: boolean
    emailSent?: boolean
    createdAt?: Date | string
    lead: LeadCreateNestedOneWithoutRemindersInput
  }

  export type ReminderUncheckedCreateInput = {
    id?: string
    leadId: string
    title: string
    datetime: Date | string
    completed?: boolean
    emailSent?: boolean
    createdAt?: Date | string
  }

  export type ReminderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    datetime?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lead?: LeadUpdateOneRequiredWithoutRemindersNestedInput
  }

  export type ReminderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    datetime?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReminderCreateManyInput = {
    id?: string
    leadId: string
    title: string
    datetime: Date | string
    completed?: boolean
    emailSent?: boolean
    createdAt?: Date | string
  }

  export type ReminderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    datetime?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReminderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    datetime?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenantId?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenantId?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenantId?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type TimelineEventListRelationFilter = {
    every?: TimelineEventWhereInput
    some?: TimelineEventWhereInput
    none?: TimelineEventWhereInput
  }

  export type ContractListRelationFilter = {
    every?: ContractWhereInput
    some?: ContractWhereInput
    none?: ContractWhereInput
  }

  export type PracticeListRelationFilter = {
    every?: PracticeWhereInput
    some?: PracticeWhereInput
    none?: PracticeWhereInput
  }

  export type DocumentListRelationFilter = {
    every?: DocumentWhereInput
    some?: DocumentWhereInput
    none?: DocumentWhereInput
  }

  export type ReminderListRelationFilter = {
    every?: ReminderWhereInput
    some?: ReminderWhereInput
    none?: ReminderWhereInput
  }

  export type PipelineNullableRelationFilter = {
    is?: PipelineWhereInput | null
    isNot?: PipelineWhereInput | null
  }

  export type PipelineStageNullableRelationFilter = {
    is?: PipelineStageWhereInput | null
    isNot?: PipelineStageWhereInput | null
  }

  export type TimelineEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ContractOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PracticeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReminderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LeadCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    data?: SortOrder
    tags?: SortOrder
    pipelineId?: SortOrder
    stageId?: SortOrder
    tenantId?: SortOrder
  }

  export type LeadMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pipelineId?: SortOrder
    stageId?: SortOrder
    tenantId?: SortOrder
  }

  export type LeadMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pipelineId?: SortOrder
    stageId?: SortOrder
    tenantId?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type PipelineStageListRelationFilter = {
    every?: PipelineStageWhereInput
    some?: PipelineStageWhereInput
    none?: PipelineStageWhereInput
  }

  export type LeadListRelationFilter = {
    every?: LeadWhereInput
    some?: LeadWhereInput
    none?: LeadWhereInput
  }

  export type PipelineStageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LeadOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PipelineCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    isDefault?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PipelineMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    isDefault?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PipelineMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    isDefault?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type PipelineRelationFilter = {
    is?: PipelineWhereInput
    isNot?: PipelineWhereInput
  }

  export type PipelineStageCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    order?: SortOrder
    pipelineId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PipelineStageAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type PipelineStageMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    order?: SortOrder
    pipelineId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PipelineStageMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    order?: SortOrder
    pipelineId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PipelineStageSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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

  export type CustomFieldCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    key?: SortOrder
    type?: SortOrder
    options?: SortOrder
    entityType?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomFieldMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    key?: SortOrder
    type?: SortOrder
    entityType?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomFieldMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    key?: SortOrder
    type?: SortOrder
    entityType?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeadRelationFilter = {
    is?: LeadWhereInput
    isNot?: LeadWhereInput
  }

  export type TimelineEventCountOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    type?: SortOrder
    description?: SortOrder
    date?: SortOrder
    icon?: SortOrder
    metadata?: SortOrder
  }

  export type TimelineEventMaxOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    type?: SortOrder
    description?: SortOrder
    date?: SortOrder
    icon?: SortOrder
  }

  export type TimelineEventMinOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    type?: SortOrder
    description?: SortOrder
    date?: SortOrder
    icon?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ContractCountOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    title?: SortOrder
    amount?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ContractAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type ContractMaxOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    title?: SortOrder
    amount?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ContractMinOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    title?: SortOrder
    amount?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ContractSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
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

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type PracticeCountOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    title?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type PracticeMaxOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    title?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type PracticeMinOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    title?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DocumentCountOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    path?: SortOrder
    size?: SortOrder
    uploadedAt?: SortOrder
  }

  export type DocumentAvgOrderByAggregateInput = {
    size?: SortOrder
  }

  export type DocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    path?: SortOrder
    size?: SortOrder
    uploadedAt?: SortOrder
  }

  export type DocumentMinOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    path?: SortOrder
    size?: SortOrder
    uploadedAt?: SortOrder
  }

  export type DocumentSumOrderByAggregateInput = {
    size?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
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

  export type ReminderCountOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    title?: SortOrder
    datetime?: SortOrder
    completed?: SortOrder
    emailSent?: SortOrder
    createdAt?: SortOrder
  }

  export type ReminderMaxOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    title?: SortOrder
    datetime?: SortOrder
    completed?: SortOrder
    emailSent?: SortOrder
    createdAt?: SortOrder
  }

  export type ReminderMinOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    title?: SortOrder
    datetime?: SortOrder
    completed?: SortOrder
    emailSent?: SortOrder
    createdAt?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type LeadCreatetagsInput = {
    set: string[]
  }

  export type TimelineEventCreateNestedManyWithoutLeadInput = {
    create?: XOR<TimelineEventCreateWithoutLeadInput, TimelineEventUncheckedCreateWithoutLeadInput> | TimelineEventCreateWithoutLeadInput[] | TimelineEventUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: TimelineEventCreateOrConnectWithoutLeadInput | TimelineEventCreateOrConnectWithoutLeadInput[]
    createMany?: TimelineEventCreateManyLeadInputEnvelope
    connect?: TimelineEventWhereUniqueInput | TimelineEventWhereUniqueInput[]
  }

  export type ContractCreateNestedManyWithoutLeadInput = {
    create?: XOR<ContractCreateWithoutLeadInput, ContractUncheckedCreateWithoutLeadInput> | ContractCreateWithoutLeadInput[] | ContractUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: ContractCreateOrConnectWithoutLeadInput | ContractCreateOrConnectWithoutLeadInput[]
    createMany?: ContractCreateManyLeadInputEnvelope
    connect?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
  }

  export type PracticeCreateNestedManyWithoutLeadInput = {
    create?: XOR<PracticeCreateWithoutLeadInput, PracticeUncheckedCreateWithoutLeadInput> | PracticeCreateWithoutLeadInput[] | PracticeUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: PracticeCreateOrConnectWithoutLeadInput | PracticeCreateOrConnectWithoutLeadInput[]
    createMany?: PracticeCreateManyLeadInputEnvelope
    connect?: PracticeWhereUniqueInput | PracticeWhereUniqueInput[]
  }

  export type DocumentCreateNestedManyWithoutLeadInput = {
    create?: XOR<DocumentCreateWithoutLeadInput, DocumentUncheckedCreateWithoutLeadInput> | DocumentCreateWithoutLeadInput[] | DocumentUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutLeadInput | DocumentCreateOrConnectWithoutLeadInput[]
    createMany?: DocumentCreateManyLeadInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type ReminderCreateNestedManyWithoutLeadInput = {
    create?: XOR<ReminderCreateWithoutLeadInput, ReminderUncheckedCreateWithoutLeadInput> | ReminderCreateWithoutLeadInput[] | ReminderUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: ReminderCreateOrConnectWithoutLeadInput | ReminderCreateOrConnectWithoutLeadInput[]
    createMany?: ReminderCreateManyLeadInputEnvelope
    connect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
  }

  export type PipelineCreateNestedOneWithoutLeadsInput = {
    create?: XOR<PipelineCreateWithoutLeadsInput, PipelineUncheckedCreateWithoutLeadsInput>
    connectOrCreate?: PipelineCreateOrConnectWithoutLeadsInput
    connect?: PipelineWhereUniqueInput
  }

  export type PipelineStageCreateNestedOneWithoutLeadsInput = {
    create?: XOR<PipelineStageCreateWithoutLeadsInput, PipelineStageUncheckedCreateWithoutLeadsInput>
    connectOrCreate?: PipelineStageCreateOrConnectWithoutLeadsInput
    connect?: PipelineStageWhereUniqueInput
  }

  export type TimelineEventUncheckedCreateNestedManyWithoutLeadInput = {
    create?: XOR<TimelineEventCreateWithoutLeadInput, TimelineEventUncheckedCreateWithoutLeadInput> | TimelineEventCreateWithoutLeadInput[] | TimelineEventUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: TimelineEventCreateOrConnectWithoutLeadInput | TimelineEventCreateOrConnectWithoutLeadInput[]
    createMany?: TimelineEventCreateManyLeadInputEnvelope
    connect?: TimelineEventWhereUniqueInput | TimelineEventWhereUniqueInput[]
  }

  export type ContractUncheckedCreateNestedManyWithoutLeadInput = {
    create?: XOR<ContractCreateWithoutLeadInput, ContractUncheckedCreateWithoutLeadInput> | ContractCreateWithoutLeadInput[] | ContractUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: ContractCreateOrConnectWithoutLeadInput | ContractCreateOrConnectWithoutLeadInput[]
    createMany?: ContractCreateManyLeadInputEnvelope
    connect?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
  }

  export type PracticeUncheckedCreateNestedManyWithoutLeadInput = {
    create?: XOR<PracticeCreateWithoutLeadInput, PracticeUncheckedCreateWithoutLeadInput> | PracticeCreateWithoutLeadInput[] | PracticeUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: PracticeCreateOrConnectWithoutLeadInput | PracticeCreateOrConnectWithoutLeadInput[]
    createMany?: PracticeCreateManyLeadInputEnvelope
    connect?: PracticeWhereUniqueInput | PracticeWhereUniqueInput[]
  }

  export type DocumentUncheckedCreateNestedManyWithoutLeadInput = {
    create?: XOR<DocumentCreateWithoutLeadInput, DocumentUncheckedCreateWithoutLeadInput> | DocumentCreateWithoutLeadInput[] | DocumentUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutLeadInput | DocumentCreateOrConnectWithoutLeadInput[]
    createMany?: DocumentCreateManyLeadInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type ReminderUncheckedCreateNestedManyWithoutLeadInput = {
    create?: XOR<ReminderCreateWithoutLeadInput, ReminderUncheckedCreateWithoutLeadInput> | ReminderCreateWithoutLeadInput[] | ReminderUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: ReminderCreateOrConnectWithoutLeadInput | ReminderCreateOrConnectWithoutLeadInput[]
    createMany?: ReminderCreateManyLeadInputEnvelope
    connect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
  }

  export type LeadUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type TimelineEventUpdateManyWithoutLeadNestedInput = {
    create?: XOR<TimelineEventCreateWithoutLeadInput, TimelineEventUncheckedCreateWithoutLeadInput> | TimelineEventCreateWithoutLeadInput[] | TimelineEventUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: TimelineEventCreateOrConnectWithoutLeadInput | TimelineEventCreateOrConnectWithoutLeadInput[]
    upsert?: TimelineEventUpsertWithWhereUniqueWithoutLeadInput | TimelineEventUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: TimelineEventCreateManyLeadInputEnvelope
    set?: TimelineEventWhereUniqueInput | TimelineEventWhereUniqueInput[]
    disconnect?: TimelineEventWhereUniqueInput | TimelineEventWhereUniqueInput[]
    delete?: TimelineEventWhereUniqueInput | TimelineEventWhereUniqueInput[]
    connect?: TimelineEventWhereUniqueInput | TimelineEventWhereUniqueInput[]
    update?: TimelineEventUpdateWithWhereUniqueWithoutLeadInput | TimelineEventUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: TimelineEventUpdateManyWithWhereWithoutLeadInput | TimelineEventUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: TimelineEventScalarWhereInput | TimelineEventScalarWhereInput[]
  }

  export type ContractUpdateManyWithoutLeadNestedInput = {
    create?: XOR<ContractCreateWithoutLeadInput, ContractUncheckedCreateWithoutLeadInput> | ContractCreateWithoutLeadInput[] | ContractUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: ContractCreateOrConnectWithoutLeadInput | ContractCreateOrConnectWithoutLeadInput[]
    upsert?: ContractUpsertWithWhereUniqueWithoutLeadInput | ContractUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: ContractCreateManyLeadInputEnvelope
    set?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    disconnect?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    delete?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    connect?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    update?: ContractUpdateWithWhereUniqueWithoutLeadInput | ContractUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: ContractUpdateManyWithWhereWithoutLeadInput | ContractUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: ContractScalarWhereInput | ContractScalarWhereInput[]
  }

  export type PracticeUpdateManyWithoutLeadNestedInput = {
    create?: XOR<PracticeCreateWithoutLeadInput, PracticeUncheckedCreateWithoutLeadInput> | PracticeCreateWithoutLeadInput[] | PracticeUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: PracticeCreateOrConnectWithoutLeadInput | PracticeCreateOrConnectWithoutLeadInput[]
    upsert?: PracticeUpsertWithWhereUniqueWithoutLeadInput | PracticeUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: PracticeCreateManyLeadInputEnvelope
    set?: PracticeWhereUniqueInput | PracticeWhereUniqueInput[]
    disconnect?: PracticeWhereUniqueInput | PracticeWhereUniqueInput[]
    delete?: PracticeWhereUniqueInput | PracticeWhereUniqueInput[]
    connect?: PracticeWhereUniqueInput | PracticeWhereUniqueInput[]
    update?: PracticeUpdateWithWhereUniqueWithoutLeadInput | PracticeUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: PracticeUpdateManyWithWhereWithoutLeadInput | PracticeUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: PracticeScalarWhereInput | PracticeScalarWhereInput[]
  }

  export type DocumentUpdateManyWithoutLeadNestedInput = {
    create?: XOR<DocumentCreateWithoutLeadInput, DocumentUncheckedCreateWithoutLeadInput> | DocumentCreateWithoutLeadInput[] | DocumentUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutLeadInput | DocumentCreateOrConnectWithoutLeadInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutLeadInput | DocumentUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: DocumentCreateManyLeadInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutLeadInput | DocumentUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutLeadInput | DocumentUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type ReminderUpdateManyWithoutLeadNestedInput = {
    create?: XOR<ReminderCreateWithoutLeadInput, ReminderUncheckedCreateWithoutLeadInput> | ReminderCreateWithoutLeadInput[] | ReminderUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: ReminderCreateOrConnectWithoutLeadInput | ReminderCreateOrConnectWithoutLeadInput[]
    upsert?: ReminderUpsertWithWhereUniqueWithoutLeadInput | ReminderUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: ReminderCreateManyLeadInputEnvelope
    set?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    disconnect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    delete?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    connect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    update?: ReminderUpdateWithWhereUniqueWithoutLeadInput | ReminderUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: ReminderUpdateManyWithWhereWithoutLeadInput | ReminderUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: ReminderScalarWhereInput | ReminderScalarWhereInput[]
  }

  export type PipelineUpdateOneWithoutLeadsNestedInput = {
    create?: XOR<PipelineCreateWithoutLeadsInput, PipelineUncheckedCreateWithoutLeadsInput>
    connectOrCreate?: PipelineCreateOrConnectWithoutLeadsInput
    upsert?: PipelineUpsertWithoutLeadsInput
    disconnect?: PipelineWhereInput | boolean
    delete?: PipelineWhereInput | boolean
    connect?: PipelineWhereUniqueInput
    update?: XOR<XOR<PipelineUpdateToOneWithWhereWithoutLeadsInput, PipelineUpdateWithoutLeadsInput>, PipelineUncheckedUpdateWithoutLeadsInput>
  }

  export type PipelineStageUpdateOneWithoutLeadsNestedInput = {
    create?: XOR<PipelineStageCreateWithoutLeadsInput, PipelineStageUncheckedCreateWithoutLeadsInput>
    connectOrCreate?: PipelineStageCreateOrConnectWithoutLeadsInput
    upsert?: PipelineStageUpsertWithoutLeadsInput
    disconnect?: PipelineStageWhereInput | boolean
    delete?: PipelineStageWhereInput | boolean
    connect?: PipelineStageWhereUniqueInput
    update?: XOR<XOR<PipelineStageUpdateToOneWithWhereWithoutLeadsInput, PipelineStageUpdateWithoutLeadsInput>, PipelineStageUncheckedUpdateWithoutLeadsInput>
  }

  export type TimelineEventUncheckedUpdateManyWithoutLeadNestedInput = {
    create?: XOR<TimelineEventCreateWithoutLeadInput, TimelineEventUncheckedCreateWithoutLeadInput> | TimelineEventCreateWithoutLeadInput[] | TimelineEventUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: TimelineEventCreateOrConnectWithoutLeadInput | TimelineEventCreateOrConnectWithoutLeadInput[]
    upsert?: TimelineEventUpsertWithWhereUniqueWithoutLeadInput | TimelineEventUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: TimelineEventCreateManyLeadInputEnvelope
    set?: TimelineEventWhereUniqueInput | TimelineEventWhereUniqueInput[]
    disconnect?: TimelineEventWhereUniqueInput | TimelineEventWhereUniqueInput[]
    delete?: TimelineEventWhereUniqueInput | TimelineEventWhereUniqueInput[]
    connect?: TimelineEventWhereUniqueInput | TimelineEventWhereUniqueInput[]
    update?: TimelineEventUpdateWithWhereUniqueWithoutLeadInput | TimelineEventUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: TimelineEventUpdateManyWithWhereWithoutLeadInput | TimelineEventUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: TimelineEventScalarWhereInput | TimelineEventScalarWhereInput[]
  }

  export type ContractUncheckedUpdateManyWithoutLeadNestedInput = {
    create?: XOR<ContractCreateWithoutLeadInput, ContractUncheckedCreateWithoutLeadInput> | ContractCreateWithoutLeadInput[] | ContractUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: ContractCreateOrConnectWithoutLeadInput | ContractCreateOrConnectWithoutLeadInput[]
    upsert?: ContractUpsertWithWhereUniqueWithoutLeadInput | ContractUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: ContractCreateManyLeadInputEnvelope
    set?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    disconnect?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    delete?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    connect?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    update?: ContractUpdateWithWhereUniqueWithoutLeadInput | ContractUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: ContractUpdateManyWithWhereWithoutLeadInput | ContractUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: ContractScalarWhereInput | ContractScalarWhereInput[]
  }

  export type PracticeUncheckedUpdateManyWithoutLeadNestedInput = {
    create?: XOR<PracticeCreateWithoutLeadInput, PracticeUncheckedCreateWithoutLeadInput> | PracticeCreateWithoutLeadInput[] | PracticeUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: PracticeCreateOrConnectWithoutLeadInput | PracticeCreateOrConnectWithoutLeadInput[]
    upsert?: PracticeUpsertWithWhereUniqueWithoutLeadInput | PracticeUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: PracticeCreateManyLeadInputEnvelope
    set?: PracticeWhereUniqueInput | PracticeWhereUniqueInput[]
    disconnect?: PracticeWhereUniqueInput | PracticeWhereUniqueInput[]
    delete?: PracticeWhereUniqueInput | PracticeWhereUniqueInput[]
    connect?: PracticeWhereUniqueInput | PracticeWhereUniqueInput[]
    update?: PracticeUpdateWithWhereUniqueWithoutLeadInput | PracticeUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: PracticeUpdateManyWithWhereWithoutLeadInput | PracticeUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: PracticeScalarWhereInput | PracticeScalarWhereInput[]
  }

  export type DocumentUncheckedUpdateManyWithoutLeadNestedInput = {
    create?: XOR<DocumentCreateWithoutLeadInput, DocumentUncheckedCreateWithoutLeadInput> | DocumentCreateWithoutLeadInput[] | DocumentUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutLeadInput | DocumentCreateOrConnectWithoutLeadInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutLeadInput | DocumentUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: DocumentCreateManyLeadInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutLeadInput | DocumentUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutLeadInput | DocumentUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type ReminderUncheckedUpdateManyWithoutLeadNestedInput = {
    create?: XOR<ReminderCreateWithoutLeadInput, ReminderUncheckedCreateWithoutLeadInput> | ReminderCreateWithoutLeadInput[] | ReminderUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: ReminderCreateOrConnectWithoutLeadInput | ReminderCreateOrConnectWithoutLeadInput[]
    upsert?: ReminderUpsertWithWhereUniqueWithoutLeadInput | ReminderUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: ReminderCreateManyLeadInputEnvelope
    set?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    disconnect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    delete?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    connect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    update?: ReminderUpdateWithWhereUniqueWithoutLeadInput | ReminderUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: ReminderUpdateManyWithWhereWithoutLeadInput | ReminderUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: ReminderScalarWhereInput | ReminderScalarWhereInput[]
  }

  export type PipelineStageCreateNestedManyWithoutPipelineInput = {
    create?: XOR<PipelineStageCreateWithoutPipelineInput, PipelineStageUncheckedCreateWithoutPipelineInput> | PipelineStageCreateWithoutPipelineInput[] | PipelineStageUncheckedCreateWithoutPipelineInput[]
    connectOrCreate?: PipelineStageCreateOrConnectWithoutPipelineInput | PipelineStageCreateOrConnectWithoutPipelineInput[]
    createMany?: PipelineStageCreateManyPipelineInputEnvelope
    connect?: PipelineStageWhereUniqueInput | PipelineStageWhereUniqueInput[]
  }

  export type LeadCreateNestedManyWithoutPipelineInput = {
    create?: XOR<LeadCreateWithoutPipelineInput, LeadUncheckedCreateWithoutPipelineInput> | LeadCreateWithoutPipelineInput[] | LeadUncheckedCreateWithoutPipelineInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutPipelineInput | LeadCreateOrConnectWithoutPipelineInput[]
    createMany?: LeadCreateManyPipelineInputEnvelope
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
  }

  export type PipelineStageUncheckedCreateNestedManyWithoutPipelineInput = {
    create?: XOR<PipelineStageCreateWithoutPipelineInput, PipelineStageUncheckedCreateWithoutPipelineInput> | PipelineStageCreateWithoutPipelineInput[] | PipelineStageUncheckedCreateWithoutPipelineInput[]
    connectOrCreate?: PipelineStageCreateOrConnectWithoutPipelineInput | PipelineStageCreateOrConnectWithoutPipelineInput[]
    createMany?: PipelineStageCreateManyPipelineInputEnvelope
    connect?: PipelineStageWhereUniqueInput | PipelineStageWhereUniqueInput[]
  }

  export type LeadUncheckedCreateNestedManyWithoutPipelineInput = {
    create?: XOR<LeadCreateWithoutPipelineInput, LeadUncheckedCreateWithoutPipelineInput> | LeadCreateWithoutPipelineInput[] | LeadUncheckedCreateWithoutPipelineInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutPipelineInput | LeadCreateOrConnectWithoutPipelineInput[]
    createMany?: LeadCreateManyPipelineInputEnvelope
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type PipelineStageUpdateManyWithoutPipelineNestedInput = {
    create?: XOR<PipelineStageCreateWithoutPipelineInput, PipelineStageUncheckedCreateWithoutPipelineInput> | PipelineStageCreateWithoutPipelineInput[] | PipelineStageUncheckedCreateWithoutPipelineInput[]
    connectOrCreate?: PipelineStageCreateOrConnectWithoutPipelineInput | PipelineStageCreateOrConnectWithoutPipelineInput[]
    upsert?: PipelineStageUpsertWithWhereUniqueWithoutPipelineInput | PipelineStageUpsertWithWhereUniqueWithoutPipelineInput[]
    createMany?: PipelineStageCreateManyPipelineInputEnvelope
    set?: PipelineStageWhereUniqueInput | PipelineStageWhereUniqueInput[]
    disconnect?: PipelineStageWhereUniqueInput | PipelineStageWhereUniqueInput[]
    delete?: PipelineStageWhereUniqueInput | PipelineStageWhereUniqueInput[]
    connect?: PipelineStageWhereUniqueInput | PipelineStageWhereUniqueInput[]
    update?: PipelineStageUpdateWithWhereUniqueWithoutPipelineInput | PipelineStageUpdateWithWhereUniqueWithoutPipelineInput[]
    updateMany?: PipelineStageUpdateManyWithWhereWithoutPipelineInput | PipelineStageUpdateManyWithWhereWithoutPipelineInput[]
    deleteMany?: PipelineStageScalarWhereInput | PipelineStageScalarWhereInput[]
  }

  export type LeadUpdateManyWithoutPipelineNestedInput = {
    create?: XOR<LeadCreateWithoutPipelineInput, LeadUncheckedCreateWithoutPipelineInput> | LeadCreateWithoutPipelineInput[] | LeadUncheckedCreateWithoutPipelineInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutPipelineInput | LeadCreateOrConnectWithoutPipelineInput[]
    upsert?: LeadUpsertWithWhereUniqueWithoutPipelineInput | LeadUpsertWithWhereUniqueWithoutPipelineInput[]
    createMany?: LeadCreateManyPipelineInputEnvelope
    set?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    disconnect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    delete?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    update?: LeadUpdateWithWhereUniqueWithoutPipelineInput | LeadUpdateWithWhereUniqueWithoutPipelineInput[]
    updateMany?: LeadUpdateManyWithWhereWithoutPipelineInput | LeadUpdateManyWithWhereWithoutPipelineInput[]
    deleteMany?: LeadScalarWhereInput | LeadScalarWhereInput[]
  }

  export type PipelineStageUncheckedUpdateManyWithoutPipelineNestedInput = {
    create?: XOR<PipelineStageCreateWithoutPipelineInput, PipelineStageUncheckedCreateWithoutPipelineInput> | PipelineStageCreateWithoutPipelineInput[] | PipelineStageUncheckedCreateWithoutPipelineInput[]
    connectOrCreate?: PipelineStageCreateOrConnectWithoutPipelineInput | PipelineStageCreateOrConnectWithoutPipelineInput[]
    upsert?: PipelineStageUpsertWithWhereUniqueWithoutPipelineInput | PipelineStageUpsertWithWhereUniqueWithoutPipelineInput[]
    createMany?: PipelineStageCreateManyPipelineInputEnvelope
    set?: PipelineStageWhereUniqueInput | PipelineStageWhereUniqueInput[]
    disconnect?: PipelineStageWhereUniqueInput | PipelineStageWhereUniqueInput[]
    delete?: PipelineStageWhereUniqueInput | PipelineStageWhereUniqueInput[]
    connect?: PipelineStageWhereUniqueInput | PipelineStageWhereUniqueInput[]
    update?: PipelineStageUpdateWithWhereUniqueWithoutPipelineInput | PipelineStageUpdateWithWhereUniqueWithoutPipelineInput[]
    updateMany?: PipelineStageUpdateManyWithWhereWithoutPipelineInput | PipelineStageUpdateManyWithWhereWithoutPipelineInput[]
    deleteMany?: PipelineStageScalarWhereInput | PipelineStageScalarWhereInput[]
  }

  export type LeadUncheckedUpdateManyWithoutPipelineNestedInput = {
    create?: XOR<LeadCreateWithoutPipelineInput, LeadUncheckedCreateWithoutPipelineInput> | LeadCreateWithoutPipelineInput[] | LeadUncheckedCreateWithoutPipelineInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutPipelineInput | LeadCreateOrConnectWithoutPipelineInput[]
    upsert?: LeadUpsertWithWhereUniqueWithoutPipelineInput | LeadUpsertWithWhereUniqueWithoutPipelineInput[]
    createMany?: LeadCreateManyPipelineInputEnvelope
    set?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    disconnect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    delete?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    update?: LeadUpdateWithWhereUniqueWithoutPipelineInput | LeadUpdateWithWhereUniqueWithoutPipelineInput[]
    updateMany?: LeadUpdateManyWithWhereWithoutPipelineInput | LeadUpdateManyWithWhereWithoutPipelineInput[]
    deleteMany?: LeadScalarWhereInput | LeadScalarWhereInput[]
  }

  export type PipelineCreateNestedOneWithoutStagesInput = {
    create?: XOR<PipelineCreateWithoutStagesInput, PipelineUncheckedCreateWithoutStagesInput>
    connectOrCreate?: PipelineCreateOrConnectWithoutStagesInput
    connect?: PipelineWhereUniqueInput
  }

  export type LeadCreateNestedManyWithoutStageInput = {
    create?: XOR<LeadCreateWithoutStageInput, LeadUncheckedCreateWithoutStageInput> | LeadCreateWithoutStageInput[] | LeadUncheckedCreateWithoutStageInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutStageInput | LeadCreateOrConnectWithoutStageInput[]
    createMany?: LeadCreateManyStageInputEnvelope
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
  }

  export type LeadUncheckedCreateNestedManyWithoutStageInput = {
    create?: XOR<LeadCreateWithoutStageInput, LeadUncheckedCreateWithoutStageInput> | LeadCreateWithoutStageInput[] | LeadUncheckedCreateWithoutStageInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutStageInput | LeadCreateOrConnectWithoutStageInput[]
    createMany?: LeadCreateManyStageInputEnvelope
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PipelineUpdateOneRequiredWithoutStagesNestedInput = {
    create?: XOR<PipelineCreateWithoutStagesInput, PipelineUncheckedCreateWithoutStagesInput>
    connectOrCreate?: PipelineCreateOrConnectWithoutStagesInput
    upsert?: PipelineUpsertWithoutStagesInput
    connect?: PipelineWhereUniqueInput
    update?: XOR<XOR<PipelineUpdateToOneWithWhereWithoutStagesInput, PipelineUpdateWithoutStagesInput>, PipelineUncheckedUpdateWithoutStagesInput>
  }

  export type LeadUpdateManyWithoutStageNestedInput = {
    create?: XOR<LeadCreateWithoutStageInput, LeadUncheckedCreateWithoutStageInput> | LeadCreateWithoutStageInput[] | LeadUncheckedCreateWithoutStageInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutStageInput | LeadCreateOrConnectWithoutStageInput[]
    upsert?: LeadUpsertWithWhereUniqueWithoutStageInput | LeadUpsertWithWhereUniqueWithoutStageInput[]
    createMany?: LeadCreateManyStageInputEnvelope
    set?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    disconnect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    delete?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    update?: LeadUpdateWithWhereUniqueWithoutStageInput | LeadUpdateWithWhereUniqueWithoutStageInput[]
    updateMany?: LeadUpdateManyWithWhereWithoutStageInput | LeadUpdateManyWithWhereWithoutStageInput[]
    deleteMany?: LeadScalarWhereInput | LeadScalarWhereInput[]
  }

  export type LeadUncheckedUpdateManyWithoutStageNestedInput = {
    create?: XOR<LeadCreateWithoutStageInput, LeadUncheckedCreateWithoutStageInput> | LeadCreateWithoutStageInput[] | LeadUncheckedCreateWithoutStageInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutStageInput | LeadCreateOrConnectWithoutStageInput[]
    upsert?: LeadUpsertWithWhereUniqueWithoutStageInput | LeadUpsertWithWhereUniqueWithoutStageInput[]
    createMany?: LeadCreateManyStageInputEnvelope
    set?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    disconnect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    delete?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    update?: LeadUpdateWithWhereUniqueWithoutStageInput | LeadUpdateWithWhereUniqueWithoutStageInput[]
    updateMany?: LeadUpdateManyWithWhereWithoutStageInput | LeadUpdateManyWithWhereWithoutStageInput[]
    deleteMany?: LeadScalarWhereInput | LeadScalarWhereInput[]
  }

  export type LeadCreateNestedOneWithoutTimelineInput = {
    create?: XOR<LeadCreateWithoutTimelineInput, LeadUncheckedCreateWithoutTimelineInput>
    connectOrCreate?: LeadCreateOrConnectWithoutTimelineInput
    connect?: LeadWhereUniqueInput
  }

  export type LeadUpdateOneRequiredWithoutTimelineNestedInput = {
    create?: XOR<LeadCreateWithoutTimelineInput, LeadUncheckedCreateWithoutTimelineInput>
    connectOrCreate?: LeadCreateOrConnectWithoutTimelineInput
    upsert?: LeadUpsertWithoutTimelineInput
    connect?: LeadWhereUniqueInput
    update?: XOR<XOR<LeadUpdateToOneWithWhereWithoutTimelineInput, LeadUpdateWithoutTimelineInput>, LeadUncheckedUpdateWithoutTimelineInput>
  }

  export type LeadCreateNestedOneWithoutContractsInput = {
    create?: XOR<LeadCreateWithoutContractsInput, LeadUncheckedCreateWithoutContractsInput>
    connectOrCreate?: LeadCreateOrConnectWithoutContractsInput
    connect?: LeadWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type LeadUpdateOneRequiredWithoutContractsNestedInput = {
    create?: XOR<LeadCreateWithoutContractsInput, LeadUncheckedCreateWithoutContractsInput>
    connectOrCreate?: LeadCreateOrConnectWithoutContractsInput
    upsert?: LeadUpsertWithoutContractsInput
    connect?: LeadWhereUniqueInput
    update?: XOR<XOR<LeadUpdateToOneWithWhereWithoutContractsInput, LeadUpdateWithoutContractsInput>, LeadUncheckedUpdateWithoutContractsInput>
  }

  export type LeadCreateNestedOneWithoutPracticesInput = {
    create?: XOR<LeadCreateWithoutPracticesInput, LeadUncheckedCreateWithoutPracticesInput>
    connectOrCreate?: LeadCreateOrConnectWithoutPracticesInput
    connect?: LeadWhereUniqueInput
  }

  export type LeadUpdateOneRequiredWithoutPracticesNestedInput = {
    create?: XOR<LeadCreateWithoutPracticesInput, LeadUncheckedCreateWithoutPracticesInput>
    connectOrCreate?: LeadCreateOrConnectWithoutPracticesInput
    upsert?: LeadUpsertWithoutPracticesInput
    connect?: LeadWhereUniqueInput
    update?: XOR<XOR<LeadUpdateToOneWithWhereWithoutPracticesInput, LeadUpdateWithoutPracticesInput>, LeadUncheckedUpdateWithoutPracticesInput>
  }

  export type LeadCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<LeadCreateWithoutDocumentsInput, LeadUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: LeadCreateOrConnectWithoutDocumentsInput
    connect?: LeadWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type LeadUpdateOneRequiredWithoutDocumentsNestedInput = {
    create?: XOR<LeadCreateWithoutDocumentsInput, LeadUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: LeadCreateOrConnectWithoutDocumentsInput
    upsert?: LeadUpsertWithoutDocumentsInput
    connect?: LeadWhereUniqueInput
    update?: XOR<XOR<LeadUpdateToOneWithWhereWithoutDocumentsInput, LeadUpdateWithoutDocumentsInput>, LeadUncheckedUpdateWithoutDocumentsInput>
  }

  export type LeadCreateNestedOneWithoutRemindersInput = {
    create?: XOR<LeadCreateWithoutRemindersInput, LeadUncheckedCreateWithoutRemindersInput>
    connectOrCreate?: LeadCreateOrConnectWithoutRemindersInput
    connect?: LeadWhereUniqueInput
  }

  export type LeadUpdateOneRequiredWithoutRemindersNestedInput = {
    create?: XOR<LeadCreateWithoutRemindersInput, LeadUncheckedCreateWithoutRemindersInput>
    connectOrCreate?: LeadCreateOrConnectWithoutRemindersInput
    upsert?: LeadUpsertWithoutRemindersInput
    connect?: LeadWhereUniqueInput
    update?: XOR<XOR<LeadUpdateToOneWithWhereWithoutRemindersInput, LeadUpdateWithoutRemindersInput>, LeadUncheckedUpdateWithoutRemindersInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
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
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
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
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
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
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
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

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
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
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
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

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type TimelineEventCreateWithoutLeadInput = {
    id?: string
    type: string
    description: string
    date?: Date | string
    icon?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type TimelineEventUncheckedCreateWithoutLeadInput = {
    id?: string
    type: string
    description: string
    date?: Date | string
    icon?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type TimelineEventCreateOrConnectWithoutLeadInput = {
    where: TimelineEventWhereUniqueInput
    create: XOR<TimelineEventCreateWithoutLeadInput, TimelineEventUncheckedCreateWithoutLeadInput>
  }

  export type TimelineEventCreateManyLeadInputEnvelope = {
    data: TimelineEventCreateManyLeadInput | TimelineEventCreateManyLeadInput[]
    skipDuplicates?: boolean
  }

  export type ContractCreateWithoutLeadInput = {
    id?: string
    title: string
    amount?: number
    startDate?: Date | string | null
    endDate: Date | string
    status?: string
    createdAt?: Date | string
  }

  export type ContractUncheckedCreateWithoutLeadInput = {
    id?: string
    title: string
    amount?: number
    startDate?: Date | string | null
    endDate: Date | string
    status?: string
    createdAt?: Date | string
  }

  export type ContractCreateOrConnectWithoutLeadInput = {
    where: ContractWhereUniqueInput
    create: XOR<ContractCreateWithoutLeadInput, ContractUncheckedCreateWithoutLeadInput>
  }

  export type ContractCreateManyLeadInputEnvelope = {
    data: ContractCreateManyLeadInput | ContractCreateManyLeadInput[]
    skipDuplicates?: boolean
  }

  export type PracticeCreateWithoutLeadInput = {
    id?: string
    title: string
    status?: string
    createdAt?: Date | string
  }

  export type PracticeUncheckedCreateWithoutLeadInput = {
    id?: string
    title: string
    status?: string
    createdAt?: Date | string
  }

  export type PracticeCreateOrConnectWithoutLeadInput = {
    where: PracticeWhereUniqueInput
    create: XOR<PracticeCreateWithoutLeadInput, PracticeUncheckedCreateWithoutLeadInput>
  }

  export type PracticeCreateManyLeadInputEnvelope = {
    data: PracticeCreateManyLeadInput | PracticeCreateManyLeadInput[]
    skipDuplicates?: boolean
  }

  export type DocumentCreateWithoutLeadInput = {
    id?: string
    name: string
    type: string
    path: string
    size?: number | null
    uploadedAt?: Date | string
  }

  export type DocumentUncheckedCreateWithoutLeadInput = {
    id?: string
    name: string
    type: string
    path: string
    size?: number | null
    uploadedAt?: Date | string
  }

  export type DocumentCreateOrConnectWithoutLeadInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutLeadInput, DocumentUncheckedCreateWithoutLeadInput>
  }

  export type DocumentCreateManyLeadInputEnvelope = {
    data: DocumentCreateManyLeadInput | DocumentCreateManyLeadInput[]
    skipDuplicates?: boolean
  }

  export type ReminderCreateWithoutLeadInput = {
    id?: string
    title: string
    datetime: Date | string
    completed?: boolean
    emailSent?: boolean
    createdAt?: Date | string
  }

  export type ReminderUncheckedCreateWithoutLeadInput = {
    id?: string
    title: string
    datetime: Date | string
    completed?: boolean
    emailSent?: boolean
    createdAt?: Date | string
  }

  export type ReminderCreateOrConnectWithoutLeadInput = {
    where: ReminderWhereUniqueInput
    create: XOR<ReminderCreateWithoutLeadInput, ReminderUncheckedCreateWithoutLeadInput>
  }

  export type ReminderCreateManyLeadInputEnvelope = {
    data: ReminderCreateManyLeadInput | ReminderCreateManyLeadInput[]
    skipDuplicates?: boolean
  }

  export type PipelineCreateWithoutLeadsInput = {
    id?: string
    name: string
    isDefault?: boolean
    tenantId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stages?: PipelineStageCreateNestedManyWithoutPipelineInput
  }

  export type PipelineUncheckedCreateWithoutLeadsInput = {
    id?: string
    name: string
    isDefault?: boolean
    tenantId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stages?: PipelineStageUncheckedCreateNestedManyWithoutPipelineInput
  }

  export type PipelineCreateOrConnectWithoutLeadsInput = {
    where: PipelineWhereUniqueInput
    create: XOR<PipelineCreateWithoutLeadsInput, PipelineUncheckedCreateWithoutLeadsInput>
  }

  export type PipelineStageCreateWithoutLeadsInput = {
    id?: string
    name: string
    color?: string
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    pipeline: PipelineCreateNestedOneWithoutStagesInput
  }

  export type PipelineStageUncheckedCreateWithoutLeadsInput = {
    id?: string
    name: string
    color?: string
    order?: number
    pipelineId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PipelineStageCreateOrConnectWithoutLeadsInput = {
    where: PipelineStageWhereUniqueInput
    create: XOR<PipelineStageCreateWithoutLeadsInput, PipelineStageUncheckedCreateWithoutLeadsInput>
  }

  export type TimelineEventUpsertWithWhereUniqueWithoutLeadInput = {
    where: TimelineEventWhereUniqueInput
    update: XOR<TimelineEventUpdateWithoutLeadInput, TimelineEventUncheckedUpdateWithoutLeadInput>
    create: XOR<TimelineEventCreateWithoutLeadInput, TimelineEventUncheckedCreateWithoutLeadInput>
  }

  export type TimelineEventUpdateWithWhereUniqueWithoutLeadInput = {
    where: TimelineEventWhereUniqueInput
    data: XOR<TimelineEventUpdateWithoutLeadInput, TimelineEventUncheckedUpdateWithoutLeadInput>
  }

  export type TimelineEventUpdateManyWithWhereWithoutLeadInput = {
    where: TimelineEventScalarWhereInput
    data: XOR<TimelineEventUpdateManyMutationInput, TimelineEventUncheckedUpdateManyWithoutLeadInput>
  }

  export type TimelineEventScalarWhereInput = {
    AND?: TimelineEventScalarWhereInput | TimelineEventScalarWhereInput[]
    OR?: TimelineEventScalarWhereInput[]
    NOT?: TimelineEventScalarWhereInput | TimelineEventScalarWhereInput[]
    id?: StringFilter<"TimelineEvent"> | string
    leadId?: StringFilter<"TimelineEvent"> | string
    type?: StringFilter<"TimelineEvent"> | string
    description?: StringFilter<"TimelineEvent"> | string
    date?: DateTimeFilter<"TimelineEvent"> | Date | string
    icon?: StringNullableFilter<"TimelineEvent"> | string | null
    metadata?: JsonNullableFilter<"TimelineEvent">
  }

  export type ContractUpsertWithWhereUniqueWithoutLeadInput = {
    where: ContractWhereUniqueInput
    update: XOR<ContractUpdateWithoutLeadInput, ContractUncheckedUpdateWithoutLeadInput>
    create: XOR<ContractCreateWithoutLeadInput, ContractUncheckedCreateWithoutLeadInput>
  }

  export type ContractUpdateWithWhereUniqueWithoutLeadInput = {
    where: ContractWhereUniqueInput
    data: XOR<ContractUpdateWithoutLeadInput, ContractUncheckedUpdateWithoutLeadInput>
  }

  export type ContractUpdateManyWithWhereWithoutLeadInput = {
    where: ContractScalarWhereInput
    data: XOR<ContractUpdateManyMutationInput, ContractUncheckedUpdateManyWithoutLeadInput>
  }

  export type ContractScalarWhereInput = {
    AND?: ContractScalarWhereInput | ContractScalarWhereInput[]
    OR?: ContractScalarWhereInput[]
    NOT?: ContractScalarWhereInput | ContractScalarWhereInput[]
    id?: StringFilter<"Contract"> | string
    leadId?: StringFilter<"Contract"> | string
    title?: StringFilter<"Contract"> | string
    amount?: FloatFilter<"Contract"> | number
    startDate?: DateTimeNullableFilter<"Contract"> | Date | string | null
    endDate?: DateTimeFilter<"Contract"> | Date | string
    status?: StringFilter<"Contract"> | string
    createdAt?: DateTimeFilter<"Contract"> | Date | string
  }

  export type PracticeUpsertWithWhereUniqueWithoutLeadInput = {
    where: PracticeWhereUniqueInput
    update: XOR<PracticeUpdateWithoutLeadInput, PracticeUncheckedUpdateWithoutLeadInput>
    create: XOR<PracticeCreateWithoutLeadInput, PracticeUncheckedCreateWithoutLeadInput>
  }

  export type PracticeUpdateWithWhereUniqueWithoutLeadInput = {
    where: PracticeWhereUniqueInput
    data: XOR<PracticeUpdateWithoutLeadInput, PracticeUncheckedUpdateWithoutLeadInput>
  }

  export type PracticeUpdateManyWithWhereWithoutLeadInput = {
    where: PracticeScalarWhereInput
    data: XOR<PracticeUpdateManyMutationInput, PracticeUncheckedUpdateManyWithoutLeadInput>
  }

  export type PracticeScalarWhereInput = {
    AND?: PracticeScalarWhereInput | PracticeScalarWhereInput[]
    OR?: PracticeScalarWhereInput[]
    NOT?: PracticeScalarWhereInput | PracticeScalarWhereInput[]
    id?: StringFilter<"Practice"> | string
    leadId?: StringFilter<"Practice"> | string
    title?: StringFilter<"Practice"> | string
    status?: StringFilter<"Practice"> | string
    createdAt?: DateTimeFilter<"Practice"> | Date | string
  }

  export type DocumentUpsertWithWhereUniqueWithoutLeadInput = {
    where: DocumentWhereUniqueInput
    update: XOR<DocumentUpdateWithoutLeadInput, DocumentUncheckedUpdateWithoutLeadInput>
    create: XOR<DocumentCreateWithoutLeadInput, DocumentUncheckedCreateWithoutLeadInput>
  }

  export type DocumentUpdateWithWhereUniqueWithoutLeadInput = {
    where: DocumentWhereUniqueInput
    data: XOR<DocumentUpdateWithoutLeadInput, DocumentUncheckedUpdateWithoutLeadInput>
  }

  export type DocumentUpdateManyWithWhereWithoutLeadInput = {
    where: DocumentScalarWhereInput
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyWithoutLeadInput>
  }

  export type DocumentScalarWhereInput = {
    AND?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    OR?: DocumentScalarWhereInput[]
    NOT?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    id?: StringFilter<"Document"> | string
    leadId?: StringFilter<"Document"> | string
    name?: StringFilter<"Document"> | string
    type?: StringFilter<"Document"> | string
    path?: StringFilter<"Document"> | string
    size?: IntNullableFilter<"Document"> | number | null
    uploadedAt?: DateTimeFilter<"Document"> | Date | string
  }

  export type ReminderUpsertWithWhereUniqueWithoutLeadInput = {
    where: ReminderWhereUniqueInput
    update: XOR<ReminderUpdateWithoutLeadInput, ReminderUncheckedUpdateWithoutLeadInput>
    create: XOR<ReminderCreateWithoutLeadInput, ReminderUncheckedCreateWithoutLeadInput>
  }

  export type ReminderUpdateWithWhereUniqueWithoutLeadInput = {
    where: ReminderWhereUniqueInput
    data: XOR<ReminderUpdateWithoutLeadInput, ReminderUncheckedUpdateWithoutLeadInput>
  }

  export type ReminderUpdateManyWithWhereWithoutLeadInput = {
    where: ReminderScalarWhereInput
    data: XOR<ReminderUpdateManyMutationInput, ReminderUncheckedUpdateManyWithoutLeadInput>
  }

  export type ReminderScalarWhereInput = {
    AND?: ReminderScalarWhereInput | ReminderScalarWhereInput[]
    OR?: ReminderScalarWhereInput[]
    NOT?: ReminderScalarWhereInput | ReminderScalarWhereInput[]
    id?: StringFilter<"Reminder"> | string
    leadId?: StringFilter<"Reminder"> | string
    title?: StringFilter<"Reminder"> | string
    datetime?: DateTimeFilter<"Reminder"> | Date | string
    completed?: BoolFilter<"Reminder"> | boolean
    emailSent?: BoolFilter<"Reminder"> | boolean
    createdAt?: DateTimeFilter<"Reminder"> | Date | string
  }

  export type PipelineUpsertWithoutLeadsInput = {
    update: XOR<PipelineUpdateWithoutLeadsInput, PipelineUncheckedUpdateWithoutLeadsInput>
    create: XOR<PipelineCreateWithoutLeadsInput, PipelineUncheckedCreateWithoutLeadsInput>
    where?: PipelineWhereInput
  }

  export type PipelineUpdateToOneWithWhereWithoutLeadsInput = {
    where?: PipelineWhereInput
    data: XOR<PipelineUpdateWithoutLeadsInput, PipelineUncheckedUpdateWithoutLeadsInput>
  }

  export type PipelineUpdateWithoutLeadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stages?: PipelineStageUpdateManyWithoutPipelineNestedInput
  }

  export type PipelineUncheckedUpdateWithoutLeadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stages?: PipelineStageUncheckedUpdateManyWithoutPipelineNestedInput
  }

  export type PipelineStageUpsertWithoutLeadsInput = {
    update: XOR<PipelineStageUpdateWithoutLeadsInput, PipelineStageUncheckedUpdateWithoutLeadsInput>
    create: XOR<PipelineStageCreateWithoutLeadsInput, PipelineStageUncheckedCreateWithoutLeadsInput>
    where?: PipelineStageWhereInput
  }

  export type PipelineStageUpdateToOneWithWhereWithoutLeadsInput = {
    where?: PipelineStageWhereInput
    data: XOR<PipelineStageUpdateWithoutLeadsInput, PipelineStageUncheckedUpdateWithoutLeadsInput>
  }

  export type PipelineStageUpdateWithoutLeadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pipeline?: PipelineUpdateOneRequiredWithoutStagesNestedInput
  }

  export type PipelineStageUncheckedUpdateWithoutLeadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    pipelineId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PipelineStageCreateWithoutPipelineInput = {
    id?: string
    name: string
    color?: string
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    leads?: LeadCreateNestedManyWithoutStageInput
  }

  export type PipelineStageUncheckedCreateWithoutPipelineInput = {
    id?: string
    name: string
    color?: string
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    leads?: LeadUncheckedCreateNestedManyWithoutStageInput
  }

  export type PipelineStageCreateOrConnectWithoutPipelineInput = {
    where: PipelineStageWhereUniqueInput
    create: XOR<PipelineStageCreateWithoutPipelineInput, PipelineStageUncheckedCreateWithoutPipelineInput>
  }

  export type PipelineStageCreateManyPipelineInputEnvelope = {
    data: PipelineStageCreateManyPipelineInput | PipelineStageCreateManyPipelineInput[]
    skipDuplicates?: boolean
  }

  export type LeadCreateWithoutPipelineInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadCreatetagsInput | string[]
    tenantId?: string | null
    timeline?: TimelineEventCreateNestedManyWithoutLeadInput
    contracts?: ContractCreateNestedManyWithoutLeadInput
    practices?: PracticeCreateNestedManyWithoutLeadInput
    documents?: DocumentCreateNestedManyWithoutLeadInput
    reminders?: ReminderCreateNestedManyWithoutLeadInput
    stage?: PipelineStageCreateNestedOneWithoutLeadsInput
  }

  export type LeadUncheckedCreateWithoutPipelineInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadCreatetagsInput | string[]
    stageId?: string | null
    tenantId?: string | null
    timeline?: TimelineEventUncheckedCreateNestedManyWithoutLeadInput
    contracts?: ContractUncheckedCreateNestedManyWithoutLeadInput
    practices?: PracticeUncheckedCreateNestedManyWithoutLeadInput
    documents?: DocumentUncheckedCreateNestedManyWithoutLeadInput
    reminders?: ReminderUncheckedCreateNestedManyWithoutLeadInput
  }

  export type LeadCreateOrConnectWithoutPipelineInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutPipelineInput, LeadUncheckedCreateWithoutPipelineInput>
  }

  export type LeadCreateManyPipelineInputEnvelope = {
    data: LeadCreateManyPipelineInput | LeadCreateManyPipelineInput[]
    skipDuplicates?: boolean
  }

  export type PipelineStageUpsertWithWhereUniqueWithoutPipelineInput = {
    where: PipelineStageWhereUniqueInput
    update: XOR<PipelineStageUpdateWithoutPipelineInput, PipelineStageUncheckedUpdateWithoutPipelineInput>
    create: XOR<PipelineStageCreateWithoutPipelineInput, PipelineStageUncheckedCreateWithoutPipelineInput>
  }

  export type PipelineStageUpdateWithWhereUniqueWithoutPipelineInput = {
    where: PipelineStageWhereUniqueInput
    data: XOR<PipelineStageUpdateWithoutPipelineInput, PipelineStageUncheckedUpdateWithoutPipelineInput>
  }

  export type PipelineStageUpdateManyWithWhereWithoutPipelineInput = {
    where: PipelineStageScalarWhereInput
    data: XOR<PipelineStageUpdateManyMutationInput, PipelineStageUncheckedUpdateManyWithoutPipelineInput>
  }

  export type PipelineStageScalarWhereInput = {
    AND?: PipelineStageScalarWhereInput | PipelineStageScalarWhereInput[]
    OR?: PipelineStageScalarWhereInput[]
    NOT?: PipelineStageScalarWhereInput | PipelineStageScalarWhereInput[]
    id?: StringFilter<"PipelineStage"> | string
    name?: StringFilter<"PipelineStage"> | string
    color?: StringFilter<"PipelineStage"> | string
    order?: IntFilter<"PipelineStage"> | number
    pipelineId?: StringFilter<"PipelineStage"> | string
    createdAt?: DateTimeFilter<"PipelineStage"> | Date | string
    updatedAt?: DateTimeFilter<"PipelineStage"> | Date | string
  }

  export type LeadUpsertWithWhereUniqueWithoutPipelineInput = {
    where: LeadWhereUniqueInput
    update: XOR<LeadUpdateWithoutPipelineInput, LeadUncheckedUpdateWithoutPipelineInput>
    create: XOR<LeadCreateWithoutPipelineInput, LeadUncheckedCreateWithoutPipelineInput>
  }

  export type LeadUpdateWithWhereUniqueWithoutPipelineInput = {
    where: LeadWhereUniqueInput
    data: XOR<LeadUpdateWithoutPipelineInput, LeadUncheckedUpdateWithoutPipelineInput>
  }

  export type LeadUpdateManyWithWhereWithoutPipelineInput = {
    where: LeadScalarWhereInput
    data: XOR<LeadUpdateManyMutationInput, LeadUncheckedUpdateManyWithoutPipelineInput>
  }

  export type LeadScalarWhereInput = {
    AND?: LeadScalarWhereInput | LeadScalarWhereInput[]
    OR?: LeadScalarWhereInput[]
    NOT?: LeadScalarWhereInput | LeadScalarWhereInput[]
    id?: StringFilter<"Lead"> | string
    firstName?: StringFilter<"Lead"> | string
    lastName?: StringFilter<"Lead"> | string
    email?: StringFilter<"Lead"> | string
    status?: StringFilter<"Lead"> | string
    createdAt?: DateTimeFilter<"Lead"> | Date | string
    updatedAt?: DateTimeFilter<"Lead"> | Date | string
    data?: JsonNullableFilter<"Lead">
    tags?: StringNullableListFilter<"Lead">
    pipelineId?: StringNullableFilter<"Lead"> | string | null
    stageId?: StringNullableFilter<"Lead"> | string | null
    tenantId?: StringNullableFilter<"Lead"> | string | null
  }

  export type PipelineCreateWithoutStagesInput = {
    id?: string
    name: string
    isDefault?: boolean
    tenantId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    leads?: LeadCreateNestedManyWithoutPipelineInput
  }

  export type PipelineUncheckedCreateWithoutStagesInput = {
    id?: string
    name: string
    isDefault?: boolean
    tenantId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    leads?: LeadUncheckedCreateNestedManyWithoutPipelineInput
  }

  export type PipelineCreateOrConnectWithoutStagesInput = {
    where: PipelineWhereUniqueInput
    create: XOR<PipelineCreateWithoutStagesInput, PipelineUncheckedCreateWithoutStagesInput>
  }

  export type LeadCreateWithoutStageInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadCreatetagsInput | string[]
    tenantId?: string | null
    timeline?: TimelineEventCreateNestedManyWithoutLeadInput
    contracts?: ContractCreateNestedManyWithoutLeadInput
    practices?: PracticeCreateNestedManyWithoutLeadInput
    documents?: DocumentCreateNestedManyWithoutLeadInput
    reminders?: ReminderCreateNestedManyWithoutLeadInput
    pipeline?: PipelineCreateNestedOneWithoutLeadsInput
  }

  export type LeadUncheckedCreateWithoutStageInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadCreatetagsInput | string[]
    pipelineId?: string | null
    tenantId?: string | null
    timeline?: TimelineEventUncheckedCreateNestedManyWithoutLeadInput
    contracts?: ContractUncheckedCreateNestedManyWithoutLeadInput
    practices?: PracticeUncheckedCreateNestedManyWithoutLeadInput
    documents?: DocumentUncheckedCreateNestedManyWithoutLeadInput
    reminders?: ReminderUncheckedCreateNestedManyWithoutLeadInput
  }

  export type LeadCreateOrConnectWithoutStageInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutStageInput, LeadUncheckedCreateWithoutStageInput>
  }

  export type LeadCreateManyStageInputEnvelope = {
    data: LeadCreateManyStageInput | LeadCreateManyStageInput[]
    skipDuplicates?: boolean
  }

  export type PipelineUpsertWithoutStagesInput = {
    update: XOR<PipelineUpdateWithoutStagesInput, PipelineUncheckedUpdateWithoutStagesInput>
    create: XOR<PipelineCreateWithoutStagesInput, PipelineUncheckedCreateWithoutStagesInput>
    where?: PipelineWhereInput
  }

  export type PipelineUpdateToOneWithWhereWithoutStagesInput = {
    where?: PipelineWhereInput
    data: XOR<PipelineUpdateWithoutStagesInput, PipelineUncheckedUpdateWithoutStagesInput>
  }

  export type PipelineUpdateWithoutStagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leads?: LeadUpdateManyWithoutPipelineNestedInput
  }

  export type PipelineUncheckedUpdateWithoutStagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leads?: LeadUncheckedUpdateManyWithoutPipelineNestedInput
  }

  export type LeadUpsertWithWhereUniqueWithoutStageInput = {
    where: LeadWhereUniqueInput
    update: XOR<LeadUpdateWithoutStageInput, LeadUncheckedUpdateWithoutStageInput>
    create: XOR<LeadCreateWithoutStageInput, LeadUncheckedCreateWithoutStageInput>
  }

  export type LeadUpdateWithWhereUniqueWithoutStageInput = {
    where: LeadWhereUniqueInput
    data: XOR<LeadUpdateWithoutStageInput, LeadUncheckedUpdateWithoutStageInput>
  }

  export type LeadUpdateManyWithWhereWithoutStageInput = {
    where: LeadScalarWhereInput
    data: XOR<LeadUpdateManyMutationInput, LeadUncheckedUpdateManyWithoutStageInput>
  }

  export type LeadCreateWithoutTimelineInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadCreatetagsInput | string[]
    tenantId?: string | null
    contracts?: ContractCreateNestedManyWithoutLeadInput
    practices?: PracticeCreateNestedManyWithoutLeadInput
    documents?: DocumentCreateNestedManyWithoutLeadInput
    reminders?: ReminderCreateNestedManyWithoutLeadInput
    pipeline?: PipelineCreateNestedOneWithoutLeadsInput
    stage?: PipelineStageCreateNestedOneWithoutLeadsInput
  }

  export type LeadUncheckedCreateWithoutTimelineInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadCreatetagsInput | string[]
    pipelineId?: string | null
    stageId?: string | null
    tenantId?: string | null
    contracts?: ContractUncheckedCreateNestedManyWithoutLeadInput
    practices?: PracticeUncheckedCreateNestedManyWithoutLeadInput
    documents?: DocumentUncheckedCreateNestedManyWithoutLeadInput
    reminders?: ReminderUncheckedCreateNestedManyWithoutLeadInput
  }

  export type LeadCreateOrConnectWithoutTimelineInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutTimelineInput, LeadUncheckedCreateWithoutTimelineInput>
  }

  export type LeadUpsertWithoutTimelineInput = {
    update: XOR<LeadUpdateWithoutTimelineInput, LeadUncheckedUpdateWithoutTimelineInput>
    create: XOR<LeadCreateWithoutTimelineInput, LeadUncheckedCreateWithoutTimelineInput>
    where?: LeadWhereInput
  }

  export type LeadUpdateToOneWithWhereWithoutTimelineInput = {
    where?: LeadWhereInput
    data: XOR<LeadUpdateWithoutTimelineInput, LeadUncheckedUpdateWithoutTimelineInput>
  }

  export type LeadUpdateWithoutTimelineInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadUpdatetagsInput | string[]
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    contracts?: ContractUpdateManyWithoutLeadNestedInput
    practices?: PracticeUpdateManyWithoutLeadNestedInput
    documents?: DocumentUpdateManyWithoutLeadNestedInput
    reminders?: ReminderUpdateManyWithoutLeadNestedInput
    pipeline?: PipelineUpdateOneWithoutLeadsNestedInput
    stage?: PipelineStageUpdateOneWithoutLeadsNestedInput
  }

  export type LeadUncheckedUpdateWithoutTimelineInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadUpdatetagsInput | string[]
    pipelineId?: NullableStringFieldUpdateOperationsInput | string | null
    stageId?: NullableStringFieldUpdateOperationsInput | string | null
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    contracts?: ContractUncheckedUpdateManyWithoutLeadNestedInput
    practices?: PracticeUncheckedUpdateManyWithoutLeadNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutLeadNestedInput
    reminders?: ReminderUncheckedUpdateManyWithoutLeadNestedInput
  }

  export type LeadCreateWithoutContractsInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadCreatetagsInput | string[]
    tenantId?: string | null
    timeline?: TimelineEventCreateNestedManyWithoutLeadInput
    practices?: PracticeCreateNestedManyWithoutLeadInput
    documents?: DocumentCreateNestedManyWithoutLeadInput
    reminders?: ReminderCreateNestedManyWithoutLeadInput
    pipeline?: PipelineCreateNestedOneWithoutLeadsInput
    stage?: PipelineStageCreateNestedOneWithoutLeadsInput
  }

  export type LeadUncheckedCreateWithoutContractsInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadCreatetagsInput | string[]
    pipelineId?: string | null
    stageId?: string | null
    tenantId?: string | null
    timeline?: TimelineEventUncheckedCreateNestedManyWithoutLeadInput
    practices?: PracticeUncheckedCreateNestedManyWithoutLeadInput
    documents?: DocumentUncheckedCreateNestedManyWithoutLeadInput
    reminders?: ReminderUncheckedCreateNestedManyWithoutLeadInput
  }

  export type LeadCreateOrConnectWithoutContractsInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutContractsInput, LeadUncheckedCreateWithoutContractsInput>
  }

  export type LeadUpsertWithoutContractsInput = {
    update: XOR<LeadUpdateWithoutContractsInput, LeadUncheckedUpdateWithoutContractsInput>
    create: XOR<LeadCreateWithoutContractsInput, LeadUncheckedCreateWithoutContractsInput>
    where?: LeadWhereInput
  }

  export type LeadUpdateToOneWithWhereWithoutContractsInput = {
    where?: LeadWhereInput
    data: XOR<LeadUpdateWithoutContractsInput, LeadUncheckedUpdateWithoutContractsInput>
  }

  export type LeadUpdateWithoutContractsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadUpdatetagsInput | string[]
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    timeline?: TimelineEventUpdateManyWithoutLeadNestedInput
    practices?: PracticeUpdateManyWithoutLeadNestedInput
    documents?: DocumentUpdateManyWithoutLeadNestedInput
    reminders?: ReminderUpdateManyWithoutLeadNestedInput
    pipeline?: PipelineUpdateOneWithoutLeadsNestedInput
    stage?: PipelineStageUpdateOneWithoutLeadsNestedInput
  }

  export type LeadUncheckedUpdateWithoutContractsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadUpdatetagsInput | string[]
    pipelineId?: NullableStringFieldUpdateOperationsInput | string | null
    stageId?: NullableStringFieldUpdateOperationsInput | string | null
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    timeline?: TimelineEventUncheckedUpdateManyWithoutLeadNestedInput
    practices?: PracticeUncheckedUpdateManyWithoutLeadNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutLeadNestedInput
    reminders?: ReminderUncheckedUpdateManyWithoutLeadNestedInput
  }

  export type LeadCreateWithoutPracticesInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadCreatetagsInput | string[]
    tenantId?: string | null
    timeline?: TimelineEventCreateNestedManyWithoutLeadInput
    contracts?: ContractCreateNestedManyWithoutLeadInput
    documents?: DocumentCreateNestedManyWithoutLeadInput
    reminders?: ReminderCreateNestedManyWithoutLeadInput
    pipeline?: PipelineCreateNestedOneWithoutLeadsInput
    stage?: PipelineStageCreateNestedOneWithoutLeadsInput
  }

  export type LeadUncheckedCreateWithoutPracticesInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadCreatetagsInput | string[]
    pipelineId?: string | null
    stageId?: string | null
    tenantId?: string | null
    timeline?: TimelineEventUncheckedCreateNestedManyWithoutLeadInput
    contracts?: ContractUncheckedCreateNestedManyWithoutLeadInput
    documents?: DocumentUncheckedCreateNestedManyWithoutLeadInput
    reminders?: ReminderUncheckedCreateNestedManyWithoutLeadInput
  }

  export type LeadCreateOrConnectWithoutPracticesInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutPracticesInput, LeadUncheckedCreateWithoutPracticesInput>
  }

  export type LeadUpsertWithoutPracticesInput = {
    update: XOR<LeadUpdateWithoutPracticesInput, LeadUncheckedUpdateWithoutPracticesInput>
    create: XOR<LeadCreateWithoutPracticesInput, LeadUncheckedCreateWithoutPracticesInput>
    where?: LeadWhereInput
  }

  export type LeadUpdateToOneWithWhereWithoutPracticesInput = {
    where?: LeadWhereInput
    data: XOR<LeadUpdateWithoutPracticesInput, LeadUncheckedUpdateWithoutPracticesInput>
  }

  export type LeadUpdateWithoutPracticesInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadUpdatetagsInput | string[]
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    timeline?: TimelineEventUpdateManyWithoutLeadNestedInput
    contracts?: ContractUpdateManyWithoutLeadNestedInput
    documents?: DocumentUpdateManyWithoutLeadNestedInput
    reminders?: ReminderUpdateManyWithoutLeadNestedInput
    pipeline?: PipelineUpdateOneWithoutLeadsNestedInput
    stage?: PipelineStageUpdateOneWithoutLeadsNestedInput
  }

  export type LeadUncheckedUpdateWithoutPracticesInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadUpdatetagsInput | string[]
    pipelineId?: NullableStringFieldUpdateOperationsInput | string | null
    stageId?: NullableStringFieldUpdateOperationsInput | string | null
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    timeline?: TimelineEventUncheckedUpdateManyWithoutLeadNestedInput
    contracts?: ContractUncheckedUpdateManyWithoutLeadNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutLeadNestedInput
    reminders?: ReminderUncheckedUpdateManyWithoutLeadNestedInput
  }

  export type LeadCreateWithoutDocumentsInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadCreatetagsInput | string[]
    tenantId?: string | null
    timeline?: TimelineEventCreateNestedManyWithoutLeadInput
    contracts?: ContractCreateNestedManyWithoutLeadInput
    practices?: PracticeCreateNestedManyWithoutLeadInput
    reminders?: ReminderCreateNestedManyWithoutLeadInput
    pipeline?: PipelineCreateNestedOneWithoutLeadsInput
    stage?: PipelineStageCreateNestedOneWithoutLeadsInput
  }

  export type LeadUncheckedCreateWithoutDocumentsInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadCreatetagsInput | string[]
    pipelineId?: string | null
    stageId?: string | null
    tenantId?: string | null
    timeline?: TimelineEventUncheckedCreateNestedManyWithoutLeadInput
    contracts?: ContractUncheckedCreateNestedManyWithoutLeadInput
    practices?: PracticeUncheckedCreateNestedManyWithoutLeadInput
    reminders?: ReminderUncheckedCreateNestedManyWithoutLeadInput
  }

  export type LeadCreateOrConnectWithoutDocumentsInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutDocumentsInput, LeadUncheckedCreateWithoutDocumentsInput>
  }

  export type LeadUpsertWithoutDocumentsInput = {
    update: XOR<LeadUpdateWithoutDocumentsInput, LeadUncheckedUpdateWithoutDocumentsInput>
    create: XOR<LeadCreateWithoutDocumentsInput, LeadUncheckedCreateWithoutDocumentsInput>
    where?: LeadWhereInput
  }

  export type LeadUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: LeadWhereInput
    data: XOR<LeadUpdateWithoutDocumentsInput, LeadUncheckedUpdateWithoutDocumentsInput>
  }

  export type LeadUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadUpdatetagsInput | string[]
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    timeline?: TimelineEventUpdateManyWithoutLeadNestedInput
    contracts?: ContractUpdateManyWithoutLeadNestedInput
    practices?: PracticeUpdateManyWithoutLeadNestedInput
    reminders?: ReminderUpdateManyWithoutLeadNestedInput
    pipeline?: PipelineUpdateOneWithoutLeadsNestedInput
    stage?: PipelineStageUpdateOneWithoutLeadsNestedInput
  }

  export type LeadUncheckedUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadUpdatetagsInput | string[]
    pipelineId?: NullableStringFieldUpdateOperationsInput | string | null
    stageId?: NullableStringFieldUpdateOperationsInput | string | null
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    timeline?: TimelineEventUncheckedUpdateManyWithoutLeadNestedInput
    contracts?: ContractUncheckedUpdateManyWithoutLeadNestedInput
    practices?: PracticeUncheckedUpdateManyWithoutLeadNestedInput
    reminders?: ReminderUncheckedUpdateManyWithoutLeadNestedInput
  }

  export type LeadCreateWithoutRemindersInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadCreatetagsInput | string[]
    tenantId?: string | null
    timeline?: TimelineEventCreateNestedManyWithoutLeadInput
    contracts?: ContractCreateNestedManyWithoutLeadInput
    practices?: PracticeCreateNestedManyWithoutLeadInput
    documents?: DocumentCreateNestedManyWithoutLeadInput
    pipeline?: PipelineCreateNestedOneWithoutLeadsInput
    stage?: PipelineStageCreateNestedOneWithoutLeadsInput
  }

  export type LeadUncheckedCreateWithoutRemindersInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadCreatetagsInput | string[]
    pipelineId?: string | null
    stageId?: string | null
    tenantId?: string | null
    timeline?: TimelineEventUncheckedCreateNestedManyWithoutLeadInput
    contracts?: ContractUncheckedCreateNestedManyWithoutLeadInput
    practices?: PracticeUncheckedCreateNestedManyWithoutLeadInput
    documents?: DocumentUncheckedCreateNestedManyWithoutLeadInput
  }

  export type LeadCreateOrConnectWithoutRemindersInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutRemindersInput, LeadUncheckedCreateWithoutRemindersInput>
  }

  export type LeadUpsertWithoutRemindersInput = {
    update: XOR<LeadUpdateWithoutRemindersInput, LeadUncheckedUpdateWithoutRemindersInput>
    create: XOR<LeadCreateWithoutRemindersInput, LeadUncheckedCreateWithoutRemindersInput>
    where?: LeadWhereInput
  }

  export type LeadUpdateToOneWithWhereWithoutRemindersInput = {
    where?: LeadWhereInput
    data: XOR<LeadUpdateWithoutRemindersInput, LeadUncheckedUpdateWithoutRemindersInput>
  }

  export type LeadUpdateWithoutRemindersInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadUpdatetagsInput | string[]
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    timeline?: TimelineEventUpdateManyWithoutLeadNestedInput
    contracts?: ContractUpdateManyWithoutLeadNestedInput
    practices?: PracticeUpdateManyWithoutLeadNestedInput
    documents?: DocumentUpdateManyWithoutLeadNestedInput
    pipeline?: PipelineUpdateOneWithoutLeadsNestedInput
    stage?: PipelineStageUpdateOneWithoutLeadsNestedInput
  }

  export type LeadUncheckedUpdateWithoutRemindersInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadUpdatetagsInput | string[]
    pipelineId?: NullableStringFieldUpdateOperationsInput | string | null
    stageId?: NullableStringFieldUpdateOperationsInput | string | null
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    timeline?: TimelineEventUncheckedUpdateManyWithoutLeadNestedInput
    contracts?: ContractUncheckedUpdateManyWithoutLeadNestedInput
    practices?: PracticeUncheckedUpdateManyWithoutLeadNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutLeadNestedInput
  }

  export type TimelineEventCreateManyLeadInput = {
    id?: string
    type: string
    description: string
    date?: Date | string
    icon?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ContractCreateManyLeadInput = {
    id?: string
    title: string
    amount?: number
    startDate?: Date | string | null
    endDate: Date | string
    status?: string
    createdAt?: Date | string
  }

  export type PracticeCreateManyLeadInput = {
    id?: string
    title: string
    status?: string
    createdAt?: Date | string
  }

  export type DocumentCreateManyLeadInput = {
    id?: string
    name: string
    type: string
    path: string
    size?: number | null
    uploadedAt?: Date | string
  }

  export type ReminderCreateManyLeadInput = {
    id?: string
    title: string
    datetime: Date | string
    completed?: boolean
    emailSent?: boolean
    createdAt?: Date | string
  }

  export type TimelineEventUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type TimelineEventUncheckedUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type TimelineEventUncheckedUpdateManyWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ContractUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractUncheckedUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractUncheckedUpdateManyWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PracticeUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PracticeUncheckedUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PracticeUncheckedUpdateManyWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    size?: NullableIntFieldUpdateOperationsInput | number | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentUncheckedUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    size?: NullableIntFieldUpdateOperationsInput | number | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentUncheckedUpdateManyWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    size?: NullableIntFieldUpdateOperationsInput | number | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReminderUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    datetime?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReminderUncheckedUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    datetime?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReminderUncheckedUpdateManyWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    datetime?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PipelineStageCreateManyPipelineInput = {
    id?: string
    name: string
    color?: string
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeadCreateManyPipelineInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadCreatetagsInput | string[]
    stageId?: string | null
    tenantId?: string | null
  }

  export type PipelineStageUpdateWithoutPipelineInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leads?: LeadUpdateManyWithoutStageNestedInput
  }

  export type PipelineStageUncheckedUpdateWithoutPipelineInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leads?: LeadUncheckedUpdateManyWithoutStageNestedInput
  }

  export type PipelineStageUncheckedUpdateManyWithoutPipelineInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadUpdateWithoutPipelineInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadUpdatetagsInput | string[]
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    timeline?: TimelineEventUpdateManyWithoutLeadNestedInput
    contracts?: ContractUpdateManyWithoutLeadNestedInput
    practices?: PracticeUpdateManyWithoutLeadNestedInput
    documents?: DocumentUpdateManyWithoutLeadNestedInput
    reminders?: ReminderUpdateManyWithoutLeadNestedInput
    stage?: PipelineStageUpdateOneWithoutLeadsNestedInput
  }

  export type LeadUncheckedUpdateWithoutPipelineInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadUpdatetagsInput | string[]
    stageId?: NullableStringFieldUpdateOperationsInput | string | null
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    timeline?: TimelineEventUncheckedUpdateManyWithoutLeadNestedInput
    contracts?: ContractUncheckedUpdateManyWithoutLeadNestedInput
    practices?: PracticeUncheckedUpdateManyWithoutLeadNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutLeadNestedInput
    reminders?: ReminderUncheckedUpdateManyWithoutLeadNestedInput
  }

  export type LeadUncheckedUpdateManyWithoutPipelineInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadUpdatetagsInput | string[]
    stageId?: NullableStringFieldUpdateOperationsInput | string | null
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LeadCreateManyStageInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadCreatetagsInput | string[]
    pipelineId?: string | null
    tenantId?: string | null
  }

  export type LeadUpdateWithoutStageInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadUpdatetagsInput | string[]
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    timeline?: TimelineEventUpdateManyWithoutLeadNestedInput
    contracts?: ContractUpdateManyWithoutLeadNestedInput
    practices?: PracticeUpdateManyWithoutLeadNestedInput
    documents?: DocumentUpdateManyWithoutLeadNestedInput
    reminders?: ReminderUpdateManyWithoutLeadNestedInput
    pipeline?: PipelineUpdateOneWithoutLeadsNestedInput
  }

  export type LeadUncheckedUpdateWithoutStageInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadUpdatetagsInput | string[]
    pipelineId?: NullableStringFieldUpdateOperationsInput | string | null
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    timeline?: TimelineEventUncheckedUpdateManyWithoutLeadNestedInput
    contracts?: ContractUncheckedUpdateManyWithoutLeadNestedInput
    practices?: PracticeUncheckedUpdateManyWithoutLeadNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutLeadNestedInput
    reminders?: ReminderUncheckedUpdateManyWithoutLeadNestedInput
  }

  export type LeadUncheckedUpdateManyWithoutStageInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    tags?: LeadUpdatetagsInput | string[]
    pipelineId?: NullableStringFieldUpdateOperationsInput | string | null
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use LeadCountOutputTypeDefaultArgs instead
     */
    export type LeadCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LeadCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PipelineCountOutputTypeDefaultArgs instead
     */
    export type PipelineCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PipelineCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PipelineStageCountOutputTypeDefaultArgs instead
     */
    export type PipelineStageCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PipelineStageCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LeadDefaultArgs instead
     */
    export type LeadArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LeadDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PipelineDefaultArgs instead
     */
    export type PipelineArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PipelineDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PipelineStageDefaultArgs instead
     */
    export type PipelineStageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PipelineStageDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CustomFieldDefaultArgs instead
     */
    export type CustomFieldArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CustomFieldDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TimelineEventDefaultArgs instead
     */
    export type TimelineEventArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TimelineEventDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ContractDefaultArgs instead
     */
    export type ContractArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ContractDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PracticeDefaultArgs instead
     */
    export type PracticeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PracticeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DocumentDefaultArgs instead
     */
    export type DocumentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DocumentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ReminderDefaultArgs instead
     */
    export type ReminderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReminderDefaultArgs<ExtArgs>

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