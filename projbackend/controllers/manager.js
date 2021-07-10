const { json } = require("body-parser");

const Manager = require("../models/manager")


exports.getUserById = (req, res, next, id) => {
  Manager.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB"
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req,res)=>{
    req.removeID.salt = undefined
    req.removeID.encry_password = undefined
    req.removeID.createdAt = undefined
    req.removeID.updatedAt = undefined
    return res.json(req.removeID)
}

exports.updateUser = (req,res)=>{
  console.log(req.body)
    Manager.findByIdAndUpdate({_id : req.removeID._id},{$set : req.body},{new : true,useFindAndModify:false,},
    (err,user)=>{
      if(err || !user){
        return res.status(400).json({
          err : "permission Denied"
        })
      }
      console.log(user)
      user.encry_password = undefined;
      user.salt = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;
      return res.json(user)
    }
  )
}

exports.removeUser = (req,res)=>{
  let manager = req.removeID
  manager.remove((err,removedManager)=>{
    if(err || !removedManager){
      return res.status(400).json({
          err : "Can't Able To Delete"
      })
  }
  return res.json({
    Massage:`${removedManager.firstname}${removedManager.lastname} is Deleted SuccessFully`
  })
  })
}

exports.removeById = (req,res,next,id)=>{
  Manager.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB"
      });
    }
    req.removeID = user;
    next();
  });
}


exports.getAllManager = (req,res)=>{
    
  let limit = parseInt(req.query.limit) ? req.query.limit : 30
  let sortby = req.query.sortby ? req.query.sortby : "createdAt"

  Manager.find()
  .sort([[sortby,"asc"]])
  .limit(limit)
  .exec((err,manager)=>{
      if(err || !manager){
          return res.status(400).json({
              err : "Database Dont Have User"
          })
      }
      manager.map((managers,index)=>{
        managers.encry_password = undefined;
        managers.salt = undefined;
        managers.createdAt = undefined;
        managers.updatedAt = undefined;
      })
      return res.json(manager)
  })
}