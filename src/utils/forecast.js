const request=require('request')

const forecast=(longitue,latitude,callback)=> {
    const url='http://api.weatherstack.com/current?access_key=9fd8b8499ebd4bc5837b67df3af7b7cc&query='+longitue+','+latitude
    request({ url :url },(error,{body}={})=>{
        const data=JSON.parse(body)
        if(error){
           callback('Unable to connect to weather API',undefined)
        }else if(data.error){
            callback(data.error.info,undefined)
        }
        else{
           callback(undefined,'It is currently '+data.current.temperature+' degrees out, But feel like '+data.current.feelslike+' degree')
        }
        
    })
}

module.exports=forecast