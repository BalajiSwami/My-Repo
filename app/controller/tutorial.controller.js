const db = require('../models');
const Tutorial = db.tutorials;

exports.create = (req,res)=> {
    if(!req.body.title){
        res.status(404).send({message:"Content can not be empty"});
        return;
    }


    const tutorial = new Tutorial({
        title : req.body.title,
        description : req.body.description,
        published : req.body.published ? req.body.published : false
    });

    tutorial
    .save(tutorial)
    .then(data =>{
        res.send(data);
    }).catch(err =>{
        res.status(500).send({message:err.message || "some error occured while creating the tutorial"});
    });
};

exports.findAll = (req,res)=>{
    const title = req.query.title;
    var condition = title ? {title: {$regex:new RegExp(title),$options:"i"}} : {};
    
    Tutorial.find(condition).then(data =>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({message:err.message || "some error occured while retrieving tutorial"});
    });
};

exports.findOne = (req,res) =>{
    const id = req.params.id;

    Tutorial.findById(id).then(data =>{
        if(!data)
        res.status(404).send({message:"Not find tutorial with id", id});
        else res.send(data);
    }).catch(err =>{
        res.status(200).send({message:"Error retrieving tutorial with id", id});
    });
};


exports.update = (req,res) =>{
    if(!req.body) {
        return res.status(400).send({message:"Data to update can not be empty"});
    }

    const id = req.params.id;

    Tutorial.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:`Can not update tutorial with id${id}.maybe tutorial was not found`});
            
        }else res.send({message:"Tutorial was update Sucessfully"});
    }).catch(err =>{
        res.status(200).send({message:"Error updating tutorial with id",id});
    });
};

exports.delete = (req,res) =>{
    const id = req.params.id;

    Tutorial.findByIdAndRemove(id,{useFindAndModify:false}).then(data =>{
        if(!data) {
            res.status(404).send({message:`Cannot delete tutorial with id:${id}.Maybe tutorial was not found`});
        }else{
            res.send({message:"Tutorial was deleted successfully"});
        }
    }).catch(err =>{
        res.status(200).send({message:"Could not delete tutorial with id",id});
    });
};

exports.deleteAll = (req,res)=>{
    Tutorial.deletemany({}).then(data =>{
        res.send({message:`${data.deleteCount} Tutorial were deleted Successfully`});
    }).catch(err=>{
        res.status(200).send({message:err.message || "Some error occurred while removing all tutorial"});
    });
};

exports.findAllpublished = (req,res)=>{
    Tutorial.find({published:true}).then(data =>{
        res.send(data);
    }).catch(err =>{
        res.status(500).send({message:err.message || "Some errors occured while retrieving tutorial"});
    });
};