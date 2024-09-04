import User from '../model/userModel.js';
import jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt';
import authValidator from '../middlewares/authValidator.js'

export const registerUser =async(req,res)=>{
    
 
    const {error,value}= authValidator.validate(req.body)
   
    //  const {logo}=req.file
     if(error){
            throw new Error(error)
        }
  const { name, personalId, password} = value;
    if(!name || !personalId || !password){
      throw new Error('All feilds are required')
    }
  try {

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name:name, 
      personalId:personalId,
      password: hashedPassword,
      role:'student'
    });
 
    
  const result =  await User.create(newUser.dataValues);
    res.status(201).json({ statusCode:201, message: 'User registered successfully',data:result });
  } catch (error) {
    res.status(500).json({statusCode:500, error: error });
  }

}

export const registerAdmin = async (req, res) => {
    
    const {error,value}= authValidator.validate(req.body)
   
    //  const {logo}=req.file
     if(error){
            throw new Error(error)
        }
  const { name, personalId, password} = value;
    if(!name || !personalId || !password){
      throw new Error('All feilds are required')
    }
  try {

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name:name, 
      personalId:personalId,
      password: hashedPassword,
      role:'admin'
    });
 
    
  const result =  await User.create(newUser.dataValues);
    res.status(201).json({ statusCode:201, message: 'User registered successfully',data:result });
  } catch (error) {
    res.status(500).json({statusCode:500, error: error });
  }
};


export const loginUser=async(req,res)=>{
    try { 
        
        const {error,value}= authValidator.validate(req.body)
    if(error){
        console.log(value);
        res.status(200).json("Check your credentials")
    }

// console.log(values);

        const {password,personalId}=value
        const result = await User.findOne({where:{personalId:personalId}})
        const userExists =result.dataValues

        console.log(userExists);
        if(!userExists){
            res.status(400).json("user does not exist")
            return;
        }
        console.log(password);
        
        const isMatch = await bcrypt.compare(password, userExists?.password);

    if (!isMatch) return res.status(400).json({statusCode:400, message: 'Invalid credentials' });

        const token =jwt.sign(userExists,process.env.JWT_SECRET.toString())
        res.status(200).json({user:userExists, token:token})
 
    } catch (error) {
        console.log(error);    
    }
}


