console.log("welcome")

const form=document.querySelector('form')
const search=document.querySelector('input')
const content1=document.querySelector('#first')
const content2=document.querySelector('#second')

content1.textContent=''

form.addEventListener('submit',(e)=>{
    e.preventDefault()

    content1.textContent="loading..."
    content2.textContent=""

    fetch('http://localhost:3000/weather?address='+search.value).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
           content1.textContent=data.error
        }
       content1.textContent=data.location
       content2.textContent=data.Data
    })
})
})