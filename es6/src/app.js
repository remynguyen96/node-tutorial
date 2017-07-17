/* eslint-disable no-console */

import express from 'express';
import constants from './config/constants';
import './config/database';
import middlewareConfig from './config/middleware';

import apiRoutes from './modules';

const app = express();

// NOTE: Setup Middleware
middlewareConfig(app);

// NOTE: Setup Router
apiRoutes(app);



// NOTE: User reduce with array
// const names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
// const countedNames = names.reduce((allNames, value, index, arr) => {
//   if (value in allNames) {
//     allNames[value]++;
//   }
//   else {
//     allNames[value] = 1;
//   }
//   return allNames;
// }, {});

// NOTE: Part 1
// const test1 = 'demo';
// const test2 = {
//   a: 'demo 1',
//   b: 'demo 2',
//   c: 'demo 3',
//   d: 'demo 4',
// };
// const test = [test1,test2];
// for(const i in test2) {
//   console.log(test2[i]);
// }
// for(const i of test) {
//   console.log(i);
// }

// NOTE: Part2
// function greeting(name) {
//   return {
//     sayHi() {
//       console.log(`Say Hi ${name}`);
//     },
//     sayBye() {
//       console.log(`Say Bye ${name}`);
//     }
//   }
// }
// const {sayHi: hi, sayBye: bye} = greeting('Remy Nguyen');
// hi();
// NOTE: Part4
// const [x,y,z] = [1,2,4,5,6,7,8];

// const {length : len} = 'asdsadsadbc';
// console.log(len);

// const [x,...y] = 'abc';
// console.log(x);
// console.log(y);

// function log(x){
//   console.log(x);
//   return 'yes';
// }
// const [ x=log('hello') ] = [];
// const [ x=log('hello') ] = [123213];

// NOTE: Part5
// function* gen(input){
//   const netIN = yield(input);
//   yield(netIN);
// };
// const it = gen('Init');
// console.log(it.next());
// console.log(it.next('NextInput'));

// function* allNumber(){
//   for (let n= 0; ; n++) {
//     yield(n);
//   }
// }
// const [x,y,z] = allNumber();
// console.log(x);
// console.log(y);
// console.log(z);

// function* bookRepo(number) {
//   const list = [
//     {title : 'List 1'},
//     {title : 'List 2'},
//     {title : 'List 3'},
//     {title : 'List 4'},
//     {title : 'List 5'},
//   ];
//   let out = [];
//   for (const item of list) {
//     out.push(item);
//     if(out.length >= number) {
//       number = yield out;
//       out = [];
//     }
//   }
//   yield out;
// }

// const repo = bookRepo(2);
// console.log(repo.next());
// console.log(repo.next(2));
// console.log(repo.next(2));



// import fs from 'fs';
// const readFileNew = filename =>
//   new Promise((resolve, reject) => {
//     fs.readFile(filename, 'utf8', (err, result) => {
//       if (err) return reject(err);
//       resolve(result.toString());
//     });
//   });
// readFileNew('./src/message.txt').then(
//   result => console.log(result),
//   err => console.log(err),
// );

// NOTE: Setup Server
app.listen(constants.PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`
      Server running on port : ${constants.PORT}
      -----------------------------
      Running on ${process.env.NODE_ENV}
      -----------------------------
    `);
  }
});

// yarn add -D babel-preset-env babel-plugin-transform-object-rest-spread
// yarn add -D webpack babel-core babel-loader webpack-node-externals
// yarn add -D eslint eslint-config-equimper
// yarn add mongoose body-parser helmet compression && yarn add -D morgan
