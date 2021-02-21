
/*
fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})
*/
var prvi=document.querySelector('#one')
var drugi=document.querySelector('#two')
//prvi.textContent="Nesto je anpsiano"

var forma=document.querySelector('form')
var search=document.querySelector('input')
forma.addEventListener('submit',(event)=>{
    prvi.textContent="Loading..."
    prvi.textContent=""
    event.preventDefault()
    var location=search.value
    //console.log(location)
    var url="/weather?address="+location
    console.log(url)
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error)
                prvi.textContent=data.error
                drugi.textContent=""
                
            }
            else{
                prvi.textContent="Location: "+data.location
                drugi.textContent="Temperature: "+data.temperature+", Feels like: "+data.feelsLike
                console.log(data)
            }
        })
    })
})