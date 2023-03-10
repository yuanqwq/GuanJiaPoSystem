module.exports = async (req,fn) =>{
    try{
        await fn();
    }catch(err){
        console.log(err);
        req.fail(err);
    }
}