const request=require('request')

const geocode=(address,callback)=> {
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic293dGhhbWluaSIsImEiOiJja2t3ZnRna3QwazdsMm5vNHJmaDR6bmJjIn0.a7leM4Ei-1pNiyvHyVHJXA'
    request({ url ,json:true },(error,{body}={})=>{
        if(error){
           callback('unable to connect to geocoding API',undefined)
        }else if(body.features.length ===0){
           callback('please specify valid place',undefined)
        }
        else
        {
            callback(undefined,{
            latitude : body.features[0].center[1],
            longitude  :body.features[0].center[0],
            location : body.features[0].place_name})
           // console.log(undefined,'Latitude :'+response.body.features[0].center[1]+'longitude:'+response.body.features[0].center[0])
        }
     })
}

module.exports=geocode