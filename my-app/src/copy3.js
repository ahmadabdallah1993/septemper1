require('dotenv').config();
const express = require('express');
const cors = require('cors');
const server = express();

const pokData = require('./pokemon.json');


server.use(cors());


const PORT= process.env.PORT || 3001;




// http://localhost:3000/
server.get('/', (req,res) =>{
    res.send('home route')
})

// http://localhost:3000/test
server.get('/test', (req,res) =>{
    console.log('testroute'); //at the termenal
    res.send('hi from the test route'); //at the test page
})


// // http://localhost:3000/g
// server.get('/g',(req,res) => {
//     let pokName = pokData.results.map( (item) =>{
//         return item.name;
//     })
//     // res.send(pokName);
//     // console.log(pokName)
// })


// http://localhost:3000/getPokemonNames?name=pokename
server.get('/getPokemonNames', (req,res) => {
    console.log('hiiiiiiiii poke');
    console.log(req.query.name);
    const result = pokData.results.find( item =>{
        if(item.name === req.query.name){
            return item;
        }
    })
   
    res.send(result);  //******* important************//
})


server.get('/*',(req,res) =>{
    res.send('page not found');
})

server.listen(PORT, () =>{
    console.log(`hello i am listening on this ${PORT}`);
})



// ################ PORT=3001 at .env