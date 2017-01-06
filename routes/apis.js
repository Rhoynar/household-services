var express=require('express');
var router=express.Router();
var mongojs=require('mongojs');
//var db=mongojs('mongodb://localhost:27017/rhoynar')


router.get('/campaign',function(req,res,next){
  res.send('Apis Page');
    // db.clients.find(function(err,clientDocs){
    //     if(err){
    //         res.send(err);    
    //     }
    //     res.json(clientDocs);
    // });
})

module.exports=router;