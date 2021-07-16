const mongoose = require('mongoose');

const connectDatabase =()=>{
    mongoose.connect(process.env.DB_LOCAL_URL,{
        useNewUrlParser:true,
        useFindAndModify:true,
        useCreateIndex:true,
        useUnifiedTopology: true
    }).then(con=>{
        console.log(`db connected host with ${con.connection.host}`)
    });
};

module.exports = connectDatabase;