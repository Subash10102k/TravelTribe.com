const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://subash10oct2k:E2N1q3E7LZELpyLK@cluster0.pnm1tkn.mongodb.net/travel_tribe?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(() => {
    console.log(`connection successful`);
}).catch((e)=>{
    console.log(`no connection`);
});
// require('./db');
