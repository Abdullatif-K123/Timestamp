// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res)=>{
  let currentDate = req.params.date; 
  let timestamp = Date.parse(req.params.date);
  let reg = /^\d+$/;
  if(currentDate ==  null){
     let now = new Date(); 
     let obj = {
        unix: now.getTime(),
        utc:  now.toUTCString()
     }
     res.send(obj);
  }   
  else if(isNaN(timestamp) && !(reg.test(req.params.date))){
     let obj = {
        error: "Invalid Date"
     };
     res.send(obj);
  }
  else{
  if(reg.test(req.params.date)){
    let sec = req.params.date/1000;
    let ms =  new Date(sec*1000); 
    let se = ms.toUTCString();
    let obj = {
       unix: parseInt(req.params.date),
       utc: se
    }
    res.send(obj);
  }
  else{
  let date = new Date(req.params.date); 
  let uni =  new Date(req.params.date).getTime();
  let utc =  date.toUTCString();
     let objec = { 
        unix: uni,
        utc: utc
     }; 
     res.send(objec);
    } 
    }
});
 

//d listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
