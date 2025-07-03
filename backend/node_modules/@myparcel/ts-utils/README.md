# TypeScript Utilities

This is a collection of TypeScript utilities that we reuse across all TS projects.

[![npm](https://img.shields.io/npm/v/@myparcel/ts-utils?labelColor=27272A&logoColor=FFFFFF&style=for-the-badge&color=CC3534&logo=npm)](https://www.npmjs.com/package/@myparcel/ts-utils/)
[![Coverage Status](https://img.shields.io/codecov/c/github/myparcelnl/ts-utils?logo=codecov&style=for-the-badge)](https://codecov.io/gh/myparcelnl/ts-utils)

## Installation

**Using Yarn**

```bash
yarn add @myparcel/ts-utils
```

**Using pnpm**

```bash
pnpm add @myparcel/ts-utils
```

**Using npm**

```bash
npm install @myparcel/ts-utils
```

> ⚠️ Note: You can install this package as a dev dependency if you only use the types.

## Contents

### [Type guards](src/type-guards)

#### [isEnumValue](src/type-guards/isEnumValue.ts)

Type guard for checking if a value is a key of the given enum.

```ts
import {isEnumValue} from '@myparcel/ts-utils';

enum MyEnum {
  A = 'A',
  B = 'B',
}

const value = 'A';

if (isEnumValue(MyEnum, value)) {
  // value is of type MyEnum.A
}
```

#### [isInArray](src/type-guards/isInArray.ts)

Type guard which checks if given value is inside an array.

```ts
import {isInArray} from '@myparcel/ts-utils';

const value = 'A'; // value is of type 'A'

isInArray(value, ['A', 'B']) // true
```

#### [isOfType](src/type-guards/isOfType.ts)

Type guard for checking if an object value is of a specific type by checking if a given K exists.

```ts
import {isOfType} from '@myparcel/ts-utils';

interface BaseObject {
  a: string;
  b: number;
}

interface ObjectWithC extends BaseObject {
  c: string;
}

const value = {
  a: 'a',
  b: 1,
  c: 'c',
};

if (isOfType<ObjectWithC>(value, 'c')) {
  // value is of type ObjectWithC
}
```

### [Types](src/types)

### [Utils](src/utils)

#### [asyncEvery](src/utils/asyncEvery.ts)

Returns true if every element in the array satisfies the provided predicate.

```ts
import {asyncEvery} from '@myparcel/ts-utils';

await asyncEvery([1, 2, 3, 4, 5], async (value) => value > 0); // true
await asyncEvery([1, 2, 3, 4, 5], async (value) => value > 1); // false
```

#### [asyncSome](src/utils/asyncSome.ts)

Returns true if some element in the array satisfies the provided predicate.

```ts
import {asyncSome} from '@myparcel/ts-utils';

await asyncSome([1, 2, 3, 4, 5], async (value) => value > 4); // true
await asyncSome([1, 2, 3, 4, 5], async (value) => value > 5); // false
```

#### [toArray](src/utils/toArray.ts)

Converts a value to an array. If the value is already an array, it will be returned as is.

```ts
import {toArray} from '@myparcel/ts-utils';

toArray('plain value'); // ['plain value']

toArray(['already an array']); // ['already an array']
```
