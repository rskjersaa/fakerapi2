const {faker, FakerError, Faker } =require ('@faker-js/faker');
const express = require('express');
const app = express();
const PORT = 8000;

app.get('/api/',(req ,res)=> {
    res.json ({msg:"Hello World"})

})
app.listen(PORT, ()=> {console.log (`server is up and running on Port: ${PORT}`)})

//Middleware need these in server files for post requests
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const createUser = ()=> {
    return{
        _id:faker.datatype.uuid(),
        first_name:faker.name.firstName(),
        last_name:faker.name.lastName(),
        email:faker.internet.email(),
        password:faker.internet.password(),
        phone_number:faker.phone.number()
    }
}
const createCompany = ()=> {
    return{
        _id:faker.datatype.uuid(),
        name:faker.name.fullName(),
        address:{
            street:faker.address.street(),
            city:faker.address.city(),
            state:faker.address.state(),
            zip:faker.address.zipCode(),
            country:faker.address.country()
        }
    }
}
app.get('/api/users/new',(req, res)=>{  
    user=createUser()
    res.json(user)

})
app.get('/user/:word', (req,res)=>{
    const word = req.params.word
    res.json(word)
})

app.post('/adduser', (req,res)=> {
    console.log(req.body)
})
app.get('/api/company/new', (req,res) => {
    const company = createCompany()
    res.json(company)
})
app.get('/api/user/company', (req,res)=>{
    const company = createCompany();
    const user = createUser();
    const bothUserAndCompany = {
        bothuser: user,
        bothcompany: company
    };
    res.json(bothUserAndCompany);
    
})