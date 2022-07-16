const express = require('express');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const postCtrl = require('../controllers/post');

const router = express.Router();

router.post('/', auth, multer,  postCtrl.postMessage);
router.get('/:id', auth, postCtrl.getOneMessage);
router.put('/:id', auth, multer, postCtrl.modifyMessage);
router.delete('/:id', auth, postCtrl.deleteMessage);
router.get('/' + '', auth, postCtrl.getAllMessages);
router.post("/:id/like", auth, postCtrl.likeMessage);

module.exports = router;