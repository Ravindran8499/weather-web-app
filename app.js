
const express = require("express");
const https = require("https");
const app = express();
const PORT = 3000;
const bodyParser = require("body-parser")



app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");

});


app.post("/",function(req,res){
    const querry =  req.body.cityName;
    const apiKey = "b3f43f5b2cefe8615d1830b779e19c3a"; 

    const unit = "metric"; 

    const URL = "https://api.openweathermap.org/data/2.5/weather?q="+querry+"&appid="+apiKey+"&units="+unit+"";
    https.get(URL,function(response){
        console.log("Status code: "+response.statusCode);
        
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const description  = weatherData.weather[0].description;
            const temperature = weatherData.main.temp;
            const pressure = weatherData.main.pressure;
            const humidity = weatherData.main.humidity;
            const mintemp = weatherData.main.temp_min; 
            const maxtemp =  weatherData.main.temp_max;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<p>The weather is currently: "+description+" </p>")
            res.write("<p>Temperature :"+temperature+" </p>");
            res.write("<p>Minimum Temperature :"+mintemp+" </p>"); 
            res.write("<p>Maximum Temperature :"+maxtemp+" </p>"); 
            res.write("<p>Pressure: "+pressure+"</p>");
            res.write("<p>Humidity: "+humidity+"</p> ");  
            res.write("<img src="+ imageURL +">")
            res.send();         
        });
    
    });




});







app.listen(PORT,function(){
    console.log("Server is open at PORt NO: "+PORT);
});
