// // // // const multer = require("multer");
// // // // const path = require("path");
// // // // const fs = require("fs");

// // // // // Folder path
// // // // const uploadDir = path.join(__dirname, "../uploads");

// // // // // Ensure the uploads folder exists
// // // // if (!fs.existsSync(uploadDir)) {
// // // //   fs.mkdirSync(uploadDir);
// // // // }

// // // // // Configure storage
// // // // const storage = multer.diskStorage({
// // // //   destination: function (req, file, cb) {
// // // //     cb(null, uploadDir); // Now guaranteed to exist
// // // //   },
// // // //   filename: function (req, file, cb) {
// // // //     const ext = path.extname(file.originalname);
// // // //     cb(null, Date.now() + ext);
// // // //   },
// // // // });

// // // // // File filter for images
// // // // const fileFilter = (req, file, cb) => {
// // // //   if (file.mimetype.startsWith("image")) {
// // // //     cb(null, true);
// // // //   } else {
// // // //     cb(new Error("Only image files are allowed!"), false);
// // // //   }
// // // // };

// // // // const upload = multer({ storage, fileFilter });

// // // // module.exports = upload;



// // // const multer = require("multer");
// // // const path = require("path");
// // // const fs = require("fs");

// // // // Create uploads folder if it doesn't exist
// // // const uploadDir = path.join(__dirname, "../uploads");
// // // if (!fs.existsSync(uploadDir)) {
// // //   fs.mkdirSync(uploadDir);
// // // }

// // // // Configure storage
// // // const storage = multer.diskStorage({
// // //   destination: function (req, file, cb) {
// // //     cb(null, uploadDir);
// // //   },
// // //   filename: function (req, file, cb) {
// // //     const ext = path.extname(file.originalname);
// // //     cb(null, Date.now() + ext);
// // //   },
// // // });

// // // // Allow only images
// // // const fileFilter = (req, file, cb) => {
// // //   if (file.mimetype.startsWith("image")) {
// // //     cb(null, true);
// // //   } else {
// // //     cb(new Error("Only image files are allowed!"), false);
// // //   }
// // // };

// // // const upload = multer({ storage, fileFilter });

// // // module.exports = upload;


// // // middleware/upload.js
// // const multer = require('multer');
// // const path = require('path');

// // // Set up storage engine
// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, 'uploads/');
// //   },
// //   filename: function (req, file, cb) {
// //     cb(null, Date.now() + path.extname(file.originalname));
// //   }
// // });

// // // Filter file types
// // const fileFilter = (req, file, cb) => {
// //   if (file.mimetype.startsWith('image')) {
// //     cb(null, true);
// //   } else {
// //     cb('Images only!', false);
// //   }
// // };

// // const upload = multer({
// //   storage: storage,
// //   fileFilter: fileFilter
// // });

// // module.exports = upload;

// // middleware/upload.js
// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage });

// module.exports = upload;



// middleware/upload.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // folder where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // e.g. 159024343.png
  },
});

const upload = multer({ storage });

module.exports = upload;
