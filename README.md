# func-pool

[![Build Status](https://travis-ci.org/Runjuu/func-pool.svg?branch=master)](https://travis-ci.org/Runjuu/func-pool)
[![Coverage Status](https://coveralls.io/repos/github/Runjuu/func-pool/badge.svg?branch=master)](https://coveralls.io/github/Runjuu/func-pool?branch=master)
[![npm version](https://badge.fury.io/js/func-pool.svg)](https://www.npmjs.com/package/func-pool)
[![Total downloads](https://img.shields.io/npm/dt/func-pool.svg)](https://www.npmjs.com/package/func-pool)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md#pull-requests)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

> Execute functions sequentially and modify (add, delete, sort) the order of execution when needed

## Install
```console
npm i func-pool
```

## Quick Examples
```js
import FuncPool from 'func-pool';
const funcPool = new FuncPool();

function hello() { console.log('hello'); }
function goodbye() { console.log('goodbye'); }

funcPool.autoRun([hello, goodbye]);
funcPool.update();
// print 'hello'
// print 'goodbye'

funcPool.removeFromAutoRun(goodbye);
funcPool.update();
// print 'hello'

funcPool.autoRun(goodbye);
funcPool.update();
// print 'goodbye'
// print 'hello'

funcPool.clear();
funcPool.update();
// print nothing
```

## Methods

### autoRun(Function | Array\<Function\>)
`autoRun` accept a function or an array of functions and will add to the update queue

### removeFromAutoRun(Function | Array\<Function\>)
`removeFromAutoRun` accept a function or an array of functions and will remove the corresponding method from the update queue

### update(): Promise\<Array\>
Call the `update` method will call the function in the queue in sequence and return a Promise Object

### clear()
clear update queue
