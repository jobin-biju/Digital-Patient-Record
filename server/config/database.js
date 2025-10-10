var mongoose=require('mongoose')

function database(){
    mongoose.connect("mongodb://localhost:27017/DPR")
    .then(()=>{
        console.log("successfull");})
    .catch(err=>{
        console.log(err);   
    })
}
module.exports=database