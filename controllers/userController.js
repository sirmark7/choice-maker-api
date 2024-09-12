import {User} from '../model/index.js';
import bcrypt from 'bcrypt';

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { name, personalId, password, role, } = req.body;
    const image=req.file
    console.log(req.file);
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, personalId, password: hashedPassword, role,logo });
    res.status(201).json({message:'success',data:newUser});
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

// Get a user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  try {
    const { name, role,personalId } = req.body;
       const image=req.file

    const userExist = await User.findByPk(req.params.id);

    if (!userExist) return res.status(404).json({ error: 'User not found' });
    const user=userExist.dataValues
  
    const updates= {
       name : name? name:  user.name,
    role : role? role:  user.role,
    personalId:personalId?personalId:user.personalId,
    logo : image.filename? image.filename: user.logo,
    }
 
    // console.log('hello',updates);
      const updateUser =await User.update(updates, { where: { id: req.params.id } });
    
    res.status(200).json({data:updateUser,message:'success'});
  } catch (error) {
    res.status(500).json({ error: 'Error updating user',errors: error });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully',data:user });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};
