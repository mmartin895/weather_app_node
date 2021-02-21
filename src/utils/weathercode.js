const request=require('request')
const weathercode=(longitude,lattitude,callback)=>{
    var cordinates=lattitude+","+longitude
    const url="http://api.weatherstack.com/current?access_key=0633dd6bfe27041555c4b6437d9b1fc9&query="+cordinates+"&units=m"
    //console.log(url)
    request({
        url:url,
        json:true
    },(error,response)=>{
        if(!error){
            if(response.body.error){
                //console.log("ERROR: "+response.body.error.info)
                callback("ERROR: "+response.body.error.info)
            }
            else{
                var data=response.body.current
                var temp=data.temperature
                var feelsLike=data.feelslike
                
                var value={
                    feelsLike:feelsLike,
                    temperature:temp,
                    location: data.location
                }
                //console.log(value)
                //console.log("It is "+temp+" degrees and it feels like "+feelsLike+" deggres"+" and the weather is "+data.weather_descriptions[0])
                callback(undefined,value)
            }
        }
        else callback("Unable to connect to weather service!")

    })

}
module.exports=weathercode