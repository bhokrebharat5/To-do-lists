const express = require('express');
const multer  = require('multer');
const { 
  handleUserLogout, 
  handleGetUserProfile,
  handleUserEditProfile
} = require('../controllers/users');

const { 
  handleTaskLists,
  handleAddNewTask,
  handleEditSingleTask,
  handleDeleteSingleTask,
  handleUpdateSingleTask,
  handleViewSingleTask
} = require('../controllers/task');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
  })
  
  const upload = multer({ storage: storage })

//page url
router.get('/', handleTaskLists);


//handle logout process
router.get('/logout', handleUserLogout );

//handle edit profile process
router.get('/userEdit', handleGetUserProfile);
router.post('/editProfile', upload.single('profileImage'), handleUserEditProfile);


//handle task process

router.get('/task/add', (req, res)=>{
  res.render('task-add', {status:true, msg:''})
});
router.post('/task/create', handleAddNewTask);

router.get('/task/view/:id', handleViewSingleTask );
router.get('/task/edit/:id', handleEditSingleTask );
router.post('/task/update/:id', handleUpdateSingleTask );

router.get('/task/delete/:id', handleDeleteSingleTask );



module.exports = router;