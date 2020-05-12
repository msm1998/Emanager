//Install express server
const express = require('express');
const path = require('path');
// const express= require('express');
const bodyParser= require('body-parser');
const cors=require('cors');
const mongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://msm98:paras123@cluster0-4gnmc.mongodb.net/Employee?retryWrites=true&w=majority"
const dbName = "Employee"

const PORT = 3000;
const app = express();
app.use(bodyParser.json());

app.use(cors());
app.listen(process.env.PORT | PORT,()=>{
    mongoClient.connect(url,{useNewUrlParser:true},(error,client)=>{
        if(error){
            throw error;
        }
        db=client.db(dbName);
        collection=db.collection("employee");
        console.log("!connected to database" + dbName);
    });
    console.log("server is running on localhost:"+PORT);
});

app.get('/api',(req,res)=>{
    var pr
    collection.find({}).toArray((error,result)=>{
        if(error){
            return res.status(500).send(error);
        }
        res.send(result);
    });
    
})

app.get('/api/:id',function(req,res){
    console.log(req.params);
    collection.findOne({"id":req.params.id},(error,result)=>{
        if(error){
            return res.status(500).send(error);
        }
        res.send(result);
    });
})

app.delete('/api/delete/:id',function(req,res){
    collection.deleteOne({"id":req.params.id},(error,result)=>{
        if(error) throw error;
        else
            res.status(200).send({"message":"successfully deleted!"});
        console.log("deleted");


        // console.log(result.message);
    })
})

app.put('/api/update',function(req,res){
    console.log(req.body.id);
    collection.updateOne(
        {"id":req.body.id},{
        $set:{"firstName":req.body.firstName,
            "lastName":req.body.lastName,
            "email":req.body.email,
            "phone":req.body.phone,
            "age":req.body.age,
            "gender":req.body.gender,
            "level":req.body.level,
            "experience":req.body.experience,
            "salary":req.body.salary
        }},(error,result)=>{
            if(error){
                throw error;
            }
            return res.send(result);
        })
})

app.post('/api/add',function(req,res){
    collection.findOne({"id":req.body.id},(error,result)=>{
        if(error) throw error;
        if(result){
            res.status(400).send({"message":"user alredy exist"});
        }
        else{
            collection.insert(req.body,(error,result)=>{
                if(error) {
                    return res.status(500).send(error);
                }
                res.send(result.result);
            });
        }
    });
    // console.log(req.body.id);
    // res.status(200).send({"message":"recieved"});
})

// const app = express();
// document.writeln('<script type="text/javascrit" src="/server/server.js"> </script>')
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

app.get('/*', function(req,res) {
    
res.sendFile(path.resolve(__dirname+'/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);