const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: 'images/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});
const uploader = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const supportedImage = /png|jpg/;

    const extension = path.extname(file.originalname);
    console.log(extension);
    if (supportedImage.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error('must be jpg or png'));
    }
  },
  limit: {
    fileSize: 500000,
  },
});
// const uploader = multer({
//   dest: 'images/',
//   fileFilter: (req, file, cb) => {
//     const supportedImage = /png|jpg/;

//     const extension = path.extname(file.originalname);
//     console.log(extension);
//     if (supportedImage.test(extension)) {
//       cb(null, true);
//     } else {
//       cb(new Error('must be jpg or png'));
//     }
//   },
//   limit: {
//     fileSize: 500000,
//   },
// });
module.exports = uploader;
