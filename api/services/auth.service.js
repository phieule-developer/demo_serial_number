let userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
module.exports={
    login:async (user_name,password)=>{
        return new Promise(async (resolve,reject)=>{
            let check = await userModel.findOne({user_name});

            if(check){
                if(bcrypt.compareSync(password,check.password)){
                    resolve(check);
                }else{
                    reject("Tên tài khoản hoặc mật khẩu không chính xác");
                }
            }else{
                reject("Tên tài khoản hoặc mật khẩu không chính xác");
            }
        })
    },
    register:async body=>{
       let ans = await userModel.create(body);
       return ans;
    },
    check_email:async email=>{
        return new Promise(async (resolve,reject)=>{
            let check = await userModel.findOne({email,status:{$ne:-1}});
            if(check){
                reject("Email đã tồn tại");
            }else{
                resolve(true);
            }
        }); 
    },
    check_password:async (password,confirm_password)=>{
        return new Promise(async (resolve,reject)=>{
            if(password == confirm_password){
                resolve(true);
            }else{
                reject("Mật khẩu và xác thực mật khẩu không trùng khớp");
            }
        })  
    }
}