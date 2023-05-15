const UserModel = require("../model/UserModel")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req,res,next)=>{
    bcrypt.hash(req.body.password,10,function(err,hashpass){
        if(err)
        {
            res.status(500).json({error:err})
        }

        let user= new UserModel({
            name:req.body.name,
            phone:req.body.phone,
            email:req.body.email,
            password:hashpass
        })
    
        user.save().then(user =>{ 
            res.json({ message:"user added successful"})
        }).catch(err=>{ 
            res.json(err)
        })
    })
    

   
}

const login=async(req,res)=>
{
    try{
        let userName =req.body.userName
     let  userPassword= req.body.UserPassword
        const user=await UserModel.findOne({name:userName}).lean()
         if(!user){
            throw 'there is no user'
         }
         console.log(user.password)
         console.log(userPassword)
        
            const result = await bcrypt.compare(userPassword,user.password);
            if(result){
            
                    let token = jwt.sign({name:user.name},'verySecretValue',{ expiresIn : '30s'})
                    let refreshtoken =jwt.sign({name:user.name},'refreshtokensecret',{ expiresIn : '48hr'})
                    res.json({
                        message:'login successfull',
                        token,
                        refreshtoken
                    })

            }
            else{
                res.json({message:'password does not match! '})
            }
        
    }catch(err){
               res.json({message:'something went wrong'})
    }
    // var userName =req.body.userName
    // var userPassword= req.body.userPassword
    // // console.error(UserModel.findOne({$or:[{name:userName},{password:userPassword}]}))
    // UserModel.findOne({$or:[{name:userName},{email:userName}]})
    // .then(user=>{
         
    //     if(user)
    //     {
    //     bcrypt.compare(userPassword,user.password,function (err,result) {
    //         if(err)
    //         {
    //             res.json({
    //                 error:err
    //             })
    //             if(result)
    //             {
    //                 let token = jwt.sign({name:user.name},'verySecretValue',{ expiresIn : '1hr'})
    //                 res.json({
    //                     message:'login successfull',
    //                     token : token
    //                 })
    //             }else
    //             {
    //                 res.json({message:'password does not match! '})
    //             }
    //         }
    //     })
    //     }
    //     else{
    //         res.json({message:"no user found"})
    //     }
    // })

}
const refreshToken =(req,res,next)=>{
    console.log('hello')
    const refreshToken=req.body.refreshtoken
    jwt.verify(refreshToken,'refreshtokensecret',function(err,decode){
        if(err){
                    res.json({
                        error:err
                    })
                }
                 else{

                    let token=jwt.sign({name:decode.name},'thesecrettoken', {expiresIn:"60s"} )
                    let refreshToken =req.body.refreshtoken
                    res.status(400).json({
                        message:"Token refreshed successfull",
                        token,
                        refreshToken
                    })

                }

})
}
module.exports = {register,login,refreshToken}