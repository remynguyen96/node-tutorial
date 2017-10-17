import express from 'express';
import './config/database';
import constants from './config/constants';
import middleware from './config/middleware';
import Routes from './modules';
import path from 'path';
import request from 'request';
import Promise from 'bluebird';
import * as fs from 'fs';
// const fsPromise = Promise.promisify(fs);
// import events from 'events';
// let eventEmitter = new events.EventEmitter();
// eventEmitter.on(('demo'), () => {
//   console.log('good')
// });
// eventEmitter.emit('demo')

const app = express();
// NOTE: Setup Middleware
middleware(app);
const views = path.join(__dirname, './views/');
// NOTE: Setup Router
app.use('/', express.static('src/public'))
app.use('/api', Routes);

app.get('/', (req, res) => {
  return res.sendFile(views + 'demoPage.html');
});

// const URL = 'http://anythingjs.com';
// const URL = 'https://jsonplaceholder.typicode.com/photos/5';
// const getHTML = (url, callback) => {
//   request(url, (err, res, body) => {
//     if (err || res.statusCode != 200) {
//       return callback('Has error');
//     }
//     callback(null, body);
//   });
// }
// const getHTMLAsync = Promise.promisify(getHTML);
// app.get('/promise', (req, res) => {
//   getHTMLAsync(URL).then(html => {
//     // console.log(html);
//     // return res.send(JSON.stringify(html))
//     return res.send(html)
//   }).catch(err => {
//     return res.status(400).json({error: String(err)});
//   });
// });
//
// let files = path.join(__dirname, './public/text.txt');
// let readFile = fs.readFile(files, 'utf8', (err, file) => {
//   if(err) {
//     console.log('errror '+ err);
//   } else {
//     console.log(file);
//   }
// });
// const fsPromise2 = Promise.promisifyAll(require('fs'));
// fs.readFileSync(files, 'utf8').then((file) => {
//     console.log(file);
// }).catch(err => console.log(err))
// let demo = fsPromise.readFileSync(files, 'utf8');
// console.log(demo);
// let demo = fsPromise.readFileAsync(files, 'utf8');
// console.log(demo);

/*fs.readFileAsync = function(filename) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filename, function(err, data){
      if (err)
        reject(err);
      else
        resolve(data);
    });
  });
};*/
// NOTE: Setup Server
app.listen(constants.PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(` Server Running On Port : ${constants.PORT} With ${process.env.NODE_ENV}`);
  }
});