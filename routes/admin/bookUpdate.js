const express = require('express');
const multer = require('multer');
const upload = require('../../middleware/uploadImage');
const Books = require('../../Models/Books');
const BooksImage = require('../../Models/BooksImage');
const path = require('path');
const fs = require('fs');
const jwtaccess = require('../../middleware/authaccess');
const { authenticate } = require('../../middleware/authenticateAdmin');

const router = express.Router();


router.post('/addbook', jwtaccess, upload.single('img'), async (req, res) => {
    try {
      if (!authenticate(req.userid)) {
        return res.status(400).json({ status: -10 });
      }
  
      if (!req.body.title || !req.body.author || !req.body.language || !req.body.publication) {
        return res.status(400).json({ status: -1, message: 'All required fields must be provided' });
      }
      const book = new Books({
        title: req.body.title,
        author: req.body.author,
        language: req.body.language,
        publication: req.body.publication,
        category: req.body.category,
        url: req.body.url
      });
      const savedBook = await book.save();
  
      if (!req.file) {
        return res.status(400).json({ status: -3, message: 'Image file is required' });
      }
  
      const imgPath = path.join(__dirname, '../uploads', req.file.filename);
      const imgData = fs.readFileSync(imgPath);
  
      await BooksImage.create({
        title: req.body.title,
        bookId: savedBook._id,
        img: {
          data: imgData,
          contentType: req.file.mimetype
        }
      });
  
      fs.unlinkSync(imgPath);
  
      res.json({ status: 0, message: 'Book and image saved successfully' });
    } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).json({ status: -2, error: error.message });
    }
  });

router.post('/update/image',jwtaccess,upload.single('img'),async (req,res)=>{
    try {
        if(!authenticate(req.userid)){
            return res.status(400).json({status : -10});
        }
        await BooksImage.findOneAndUpdate({bookId:req.headers.id},{
            img: {
                
                data: fs.readFileSync(path.join(__dirname, '../uploads', req.file.filename)),
                contentType: 'image/png'
            }
        });
        fs.unlinkSync(path.join(__dirname, '../uploads', req.file.filename));
        res.status(200).json({status:0});
    } catch (error) {
        res.status(500).json({status:-1});
    }
})

router.post('/update/data',jwtaccess,async(req,res)=>{
    try {
        if(!authenticate(req.userid)){
            return res.status(400).json({status : -10});
        }
        await Books.findByIdAndUpdate({_id:req.headers.id},{
            language: req.body.language,
            publication: req.body.publication,
            category: req.body.category,
        });
        res.status(200).json({status:0});
    } catch (error) {
        res.status(500).json({status:-1});
    }
})

router.post('/deletebook',jwtaccess,async(req,res)=>{
  try {
    
    const userid = req.userid;
    await Books.findOneAndRemove({ _id: req.body.id, userId: userid });
    res.json({ status: 0 });
  } catch (error) {
    res.json({ status: -2 });
  }
});



module.exports = router;
