const mongoose = require ('mongoose');

// todolist database name
mongoose.connect('mongodb://localhost/todolist',{useUnifiedTopology: true, useNewUrlParser:true});

// acuire connection
const db = mongoose.connection;

// error 
db.on('error',console.error.bind(console,'error connecting to db'));

// successful connection
db.once('open', function(){
    console.log('Success');
});
