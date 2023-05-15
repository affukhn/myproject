const userModel = require('../model/EmpolyeesModel.js')
const user=require('../model/EmpolyeesModel.js')

// const index=(req,res)=>{
//     console.log("hello")
//     // const result=await userModel.find({})
//     // console.log(result,"===result")
//     // res.status(200).json(result)
// }
const index=(req,res)=>{
    user.find().then((response)=>{
        console.log(response)
         res.status(200).json(
            response
        )
   
    }
    ).catch((err) =>         {
        return res.status(500).json('something went wrong')
    })
}

const show=(req,res,next)=>{
    let UserId=user.findById(req.body.id)
    // console.log(UserId)
    
    user.findById(req.body.id).then((response)=>
    {
        console.log(response)
             return res.status(200).json({
                response
             })
    }).catch(()=>{
        return res.status(500).json('something went wrong')
    })
}

const update=(req,res,next)=>{
    let UserId= user.find({name:req.body.name})

    let userModel= new user(
        {
           name:req.body.name,
           department: req.body.department
        })
   
    user.findByIdAndUpdate(UserId,{$set:res.body}).then((response)=>
    {
             return res.status(200).json({
                response
             })
    }).catch(()=>{

        return res.status(500).json('something went wrong')
    })
}


const Delete=(req,res,next)=>{
    let UserId= user.find({name:req.body.name})
   
    user.findByIdAndDelete(UserId).then((response)=>
    {
             return res.status(200).json({
                response
             })
    }).catch(()=>{
        return res.status(500).json('something went wrong')
    })
}

const store=(req,res,next)=>{
   console.log(req.files,"___________")
     let userModel= new user(
     {
        name:req.body.name,
        department: req.body.department
     })

     if(req.files)
     {
        
        let path = ''
        req.files.forEach((files,index,arr)=>
         {
          path= path+files.path + ','  
        });
        
        path=path.substring(0,path.lastIndexOf(","))
        console.log(path)
        userModel.avatar=path
     }

     userModel.save().then((response)=>
     {
        
              return res.status(200).json({
                 response
              })
     }).catch(()=>{
         return res.status(500).json('something went wrong')
     })
 
}

module.exports={
    show,
    index,
    update,
    Delete,
    store
}