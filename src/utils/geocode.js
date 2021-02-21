const request=require('request')
const geocode=(address,callback)=>{
    address=encodeURIComponent(address)
    var geoURL="https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoibW9raTEyMyIsImEiOiJja2w4bzdqeHMwaHRpMndydnFneTVobjJiIn0._d8QuFLU8WsKf_LDEdEbkA"
    request({
        url:geoURL,
        json:true
    },(error,response)=>{
        if(!error){
            if(!response.body.features || response.body.features.length<1){
                callback("Wrong query params for location! Try smtn else.")
            }
            else{
               
                var lattitude=response.body.features[0].center[1]
                var longitude=response.body.features[0].center[0]
                var location=response.body.features[0].place_name
                //console.log(location)
                var data={
                    lattitude:lattitude,
                    longitude:longitude,
                    location:location
                }
                callback(undefined,data)
                //console.log("Lattitude is "+data.features[0].center[1]+" and longitude is "+data.features[0].center[0])
            }
        }
        else{
            callback("Unable to connect to  GEO service")
        }
    })
}
module.exports=geocode