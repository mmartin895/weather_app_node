const express=require('express')
const path=require('path')
const hbs=require('hbs')
const viewsPath=path.join(__dirname,'../templates/views')
const partPath=path.join(__dirname,'../templates/partials')
const app=express()
//console.log(__dirname)
//console.log(path.join(__dirname,'..','/public'))
app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partPath)
app.use(express.static(path.join(__dirname,'..','/public')))
const geocode=require('./utils/geocode')
const weathercode=require('./utils/weathercode')

app.get('/weather',(req,res)=>{
    geocode(req.query.address,(err,data)=>{
        //console.log(req.query.address)
        if(err){
                res.send({error:err})
        }
        else{
                var {longitude,lattitude,location}=data
                weathercode(longitude,lattitude,(err,data)=>{
                    if(err){
                        res.send({error:err})
                    }
                    else{
                        data.location=location
                        data.address=req.query.address
                        res.send(data)
                    }
                })
        }
    })
})
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Martin '
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About page',
        name:'Martin '
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help page",
        help:'This is the help page',
        name:'Martin '
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404err',{
        title: "404 Page",
        message:"Help article not found!",
        name:'Martin '
    })
})
app.get('*',(req,res)=>{
    res.render('404err',{
        title: "404 Page",
        message:"Page not found!",
        name:'Martin '
    })
})

app.listen(3000,()=>{
    console.log("Server has started!")
})