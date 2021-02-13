const hbs=require('hbs')
const path=require('path')
const express=require('express')
const request=require('request')
const geocode=require('../src/utils/geocode')
const forecast=require('../src/utils/forecast')

//console.log(__dirname,__filename)
const url=path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../templete/views')
const partialpath=path.join(__dirname,'../templete/partials')
const app=express()

const port=process.env.PORT || 3000

app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)

app.use(express.static(url))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'SolaiSowthamini'
    })
})

app.get('',(req,res)=>{
    res.send("<h1>hello everyone !</h1>")
})

 app.get('/help',(req,res)=>{
    console.log(req.query)
     res.render('help',{
        title:'Help',
         name:'solai',
         age:26
     })
 })

 app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'solai'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
       return res.send({
             errormessage:'Please provide Address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
         return res.send({error:error})
        }
         forecast(latitude, longitude, (error, forecastdata) =>{
           if(error){
            return res.send({error:error})}
           res.send({
            title:'Weather',
            Location : location,
            Data     : forecastdata,
            address:req.query.address})
         })
      })
})
app.get('/help/*',(req,res)=>{
    
    res.render('articlenotfound',{
        name:'solai',
        title:'404',
        errorMsg:'Help article was not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        name:'solai',
        title:'404',
        errorMsg:'Page Not found'
    })
})

app.listen(port,()=>{
    console.log("server startup on port" + port )
})