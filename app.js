const express = require('express');
const mongoosse = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();

const app = express();
const port = 3000;

//import router 
const userRouter = require('./routers/user')
const productRouter = require('./routers/Product');
const cartRouter  =  require('./routers/CartItem')
const orderRouter = require('./routers/Order')

app.use(express.json());


//connect roter
app.use('/user',userRouter);
app.use('/product',productRouter);
app.use('/cart',cartRouter);
app.use('/order',orderRouter)

app.get("/", (req, res) => {
    try {
        console.log("hi this project were runnig succsessfuly");
    
        res.send("Hello World");
    }
    catch (error) {
        res.status(500).send("Internal Server Error",error);
    }

})


app.listen(port,()=>{
    mongoosse.connect('mongodb://127.0.0.1:27017/E-COMMERCE').then(()=>{
        console.log('the server is runnig');  
    })
    .catch((Error)=>{
        console.log('error connect to the database',Error);
        
    })
})