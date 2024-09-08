import {User} from '../model/index.js';
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
  const { name, personalId, password, role} = value;
    if(!name || !personalId || !password){
      throw new Error('All feilds are required')
    }
  try {

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name:name, 
      personalId:personalId,
      password: hashedPassword,
      role:role?role:'admin'
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
        console.log(value);
        
    if(error){
        console.log(error);
        res.status(200).json("Check your credentials")
        return;
    }

// console.log(values);

        const {password,personalId}=value
        const userExists = await User.findOne({where:{personalId:personalId}})
        console.log(userExists);
        
        if(!userExists){
            res.status(400).json("user does not exist")
            return;
        }
          const user =userExists.dataValues
        
        const isMatch = await bcrypt.compare(password, user?.password);

    if (!isMatch) return res.status(400).json({statusCode:400, message: 'Invalid credentials' });

        const token =jwt.sign(user,process.env.JWT_SECRET.toString())
        delete userExists.password
        res.status(200).json({user, token:token})
 
    } catch (error) {
        console.log(error);    
    }
}


