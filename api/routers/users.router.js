const express = require("express");
const router = express.Router();


router.get('/',(req, res) => {
  const {limit,offset}= req.query;
  if(!limit || !offset){
    res.status(400).send('Bad request');
  }else{
   res.json({limit: limit,offset: offset});
  }
})

module.exports = router;
