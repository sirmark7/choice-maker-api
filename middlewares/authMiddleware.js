import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  
    const token = req.header('Authorization')?.split(' ')[1];

  try {
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET.toString() );   
    req.user = decoded;
    next();
  } catch (error) {
    
    
    res.status(400).json({ message: 'Invalid token.' });
  }
};

export const adminMiddleware = (req, res, next) => {
  
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  
  next();
};
export const studentMiddleware = (req, res, next) => {
  
  if (req.user.role !== 'student') {
    return res.status(403).json({ message: 'Access denied. Students only.' });
  }
  
  next();
};
