const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
require('dotenv').config()

const app = express();

var corsOptions = {orgins:"http://localhost:9000"};

app.use(cors(corsOptions));

app.use(bodyparser.json());

app.use(bodyparser.urlencoded({extended:true}));

const db = require("./app/models/index");
db.mongoose.connect(db.url,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("Connected to database....");
}).catch(err=>{
    console.log("Can't connect database",err);
    process.exit();
});

app.get('/',(req,res)=>{
    res.json({message:"Welcome to My Application"});
});


require("./app/routes/tutorial.routes")(app);


app.listen(9000,()=>{
    console.log(`Server Start on http://localhost:${9000}`);
});