require('dotenv').config();
const http = require('http');
const app = require('./app');
const config = require('./config/index');
const mongoose = require('mongoose');
const log = require('./log');
const io = require('./chat/io');

// init server instance
const server = http.createServer(app);

//Database Connection 
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser:true,useCreateIndex:true} );
mongoose.connection.on('connected',()=>{
console.log('Connected');
} );
mongoose.connection.on('error',(err)=>{
console.log('error on connection ' +err);
} );

// connect to services
io(server);

// start server
server.listen(config.server.port, err => {
  if (err) {
    log.err('server', 'could not start listening', err.message || err);
    process.exit();
  }
  log.log('env', `app starting in "${config.env}" mode...`);
  log.log('server', `Express server is listening on ${config.server.port}...`);
 
});
