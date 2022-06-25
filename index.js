const express = require('express');
//  extracting Schema
const List = require('./models/list.js');
const port = 7000;

// database connecting 
const db = require('./config/mongoose');
const app = express();

// setting up view engine
app.set('view engine', 'ejs');
app.set('views','./views');

// since data received from user is encode we need a parse
// middleware
app.use(express.urlencoded());

// it find out folder assests in directory
// it contains css images fonts folder
app.use(express.static('assests'));

// show data
app.get('/',function (req,res){
    List.find({},function(err,list){
        if(err){
            console.log(err);
            return;
        }
        return res.render('home',{
            lists : list
        });
    })
});

// add-data
app.post('/create-list',function(req,res){
    
    // pushing into db
    List.create({
        description : req.body.description,
        category : req.body.category,
        duedate : req.body.duedate
    },function(err,newList){
        if(err){
            console.log(err);
            return;
        }
        console.log(newList);
        return res.redirect('back');
    });
})

// delete data
app.post('/delete-list', function(req,res){
    console.log(req.body);
    // getting each element form body
    Object.keys(req.body).forEach(function(key) {
        console.log(key);
        List.findByIdAndDelete(key, function(err) {
            
            if (err) {
                console.log('Error in deleting an item from database', err);
                return;
            }
            console.log('item is deleted');
        });
    });
    return res.redirect('back');
})

app.listen(port, function(err){
    if(err){
        console.log(`Error : ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
});