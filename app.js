const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const path = require('path'); // Add this line

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
    
// Serve static files from the "public" directory
app.use(express.static(__dirname+ '/public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post("/",function(req,res){
    const query = req.body.cityName;
    const apikey = "916be72c8dad37bdc1eb967dc8c4b14d"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apikey +"&units="+unit ;
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const wd = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const icon =  weatherData.weather[0].icon;
            const imageurl = "https://openweathermap.org/img/wn/"+ icon + "@2x.png"
            res.write("<p> weather condition is: "+ wd + "<p>")
            res.write("<h1> Temprature is: "+ temp + "</h1>")
            res.write("<img src="+imageurl+">")
            res.send();
    });  
});  
});

app.listen(3000,function(){
    console.log("server is running on port 3000");
});