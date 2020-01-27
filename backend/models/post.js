const mongoose = require('mongoose')
const postSchema = mongoose.Schema({
  title : {type : String , required : true},
  content : {type : String , required : true}
});

//mongoDb Connection
mongoose.connect('mongodb://localhost:27017/meandb', { useNewUrlParser: true })
    .then(()=>{
      console.log("Connected to local MongoDb")
    })
    .catch(()=>{
      console.log("Connection Failed")
    })

//creating post model at the backend
module.exports = mongoose.model('Post',postSchema);
