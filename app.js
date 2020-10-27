const express=require("express");
const { request } = require("http");
const app=express();
const mongoose = require('mongoose');
const bodyparser=require("body-parser");
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const port=80;
const path=require("path");

// DEFINE MONGOOSE SCHEME
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
});

var Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'));  // For Serving Static Files
app.use(express.urlencoded());


// PUG SPECIFIC STUFF
app.set('view engine','pug'); // set template engine as pug
app.set('views',path.join(__dirname,'views')); // Set the view directory

// ENDPOINTS
app.get('/', (req, res)=>{
    
    const params = { };
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    
    const params = { };
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.send("This item has been saved to the database")
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse")
    });

})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});


