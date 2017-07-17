var express = require('express');
var app = express();
var io = require('socket.io')();
var mysql      = require('mysql');
var validator = require('express-validator');
var session = require('express-session');
var path = require('path');
var logger = require('morgan');
var reload = require('reload');
var expressHbs = require('express-handlebars');
var bodyParser = require('body-parser');

/**
  * Task: Connect Mysql
  * Author: Remy Nguyen
  * Date created: 2017/03/24 14:00 PM
  * @return
  */
var connection = mysql.createConnection({
    host     : 'blog.app',
    user     : 'homestead',
    password : 'secret',
    database : 'blog'
});
connection.connect(function(error){
  if(!!error){
    console.log('error: '+error);
  }else{
    console.log('Connected');
  }
});
/**
  * Task: Router
  * Author: Remy Nguyen
  * Date created: 2017/03/24 14:00 PM
  * @return
  */
app.use(require('./routes/router'));
// app.use(require('./routes/index'));
/**
  * Task: Setting
  * Author: Remy Nguyen
  * Date created: 2017/03/24 14:00 PM
  * @return
  */
app.set('port',process.env.PORT || 4444 );
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/**
  * Task: View Engine Setup
  * Author: Remy Nguyen
  * Date created: 2017/03/24 14:00 PM
  * @return
  */
app.engine('.hbs', expressHbs({
  defaultLayout: 'master',
  extname: '.hbs',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));
app.set('views', path.join(__dirname,'views'));
app.set('view engine', '.hbs');
app.locals.siteTitle = 'SocketIO Demo';
app.use(express.static(path.join(__dirname, 'public')));

/**
  * Task: Connect SocketIO and Server
  * Author: Remy Nguyen
  * Date created: 2017/03/24 14:00 PM
  * @return
  */
var server = app.listen(app.get('port'),function(){
  console.log(`Listening on port http://localhost:${app.get('port')}`);
});
io.attach(server);
io.on('connection',(socket) =>{
  /**
    * Task: Settup user connect SocketIO
    * Author: Remy Nguyen
    * Date created: 2017/03/24 14:00 PM
    * @return
    */
  console.log(`User Connected ${socket.id}`);
  socket.on('disconnect',()=>{
    console.log(`User Disconnect ${socket.id}`);
  });
  /**
    * Task: Handing SocketIO
    * Author: Remy Nguyen
    * Date created: 2017/03/24 14:00 PM
    * @return
    */
    socket.on('sendData', (data)=>{
      console.log(`${socket.id} send data : ${data}`);
      // io.emit('messages',data);
      // io.sockets.emit('messages',data);
      socket.broadcast.emit('messages',data);
      // io.to('asdsadsad').emit();
    });


});


reload(server,app);
