import multer from 'multer';
import path from 'path';

// Set up storage for uploaded files
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const{originalname, mimetype} =file;
    cb(null, `${Date.now()}-${originalname}`);
  },
  destination: (req, file, cb) => {
    
    cb(null, path.join(__dirname,'../uploads'));  // Save uploads in 'uploads/' directory
  
  },

});

const upload = multer({ storage });

export default upload;
