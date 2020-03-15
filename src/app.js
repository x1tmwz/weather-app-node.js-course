const path = require('path')
const express = require('express')
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//setup handlebars engine and views locations
app.set('view engine', 'hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath);


//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index',{
        title:'Weather',
        name:'Tomer meyer'
        
    });
    
})
app.get('/about', (req, res) => {
    res.render('about',{
        title:'About',
        name:'Tomer meyer'
    });
    
})
app.get('/help', (req, res) => {
    res.render('help',{
        title:'Help page',
        message:'call this number for help 0585702289',
        name:'Tomer meyer'
    });
})



app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            error:'you must enter a adress'
        })
    }
    geocode(address,(error,{lat,long,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(lat,long,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecastData,
                location
            })
        })
    })
    
})
app.get('/help/*',(req,res)=>{
    res.render('notFound',{
        title:'404',
        error:'Help article not Found',
        name:'Tomer meyer'
    })
    

})
app.get('*',(req,res)=>{
    res.render('notFound',{
        title:'404',
        error:'Page Not Found Status 404',
        name:'Tomer meyer'
    })
    

})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})