import { Router } from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';

const router = Router();

router.get('/status', AppController.getStatus);

router.get('/stats', AppController.getStats);

router.post('/users', UsersController.postNew);
//post new
router.get('/connect', AuthController.getConnect);
// connect
router.get('/disconnect', AuthController.getDisconnect);
// disconnect
router.get('/users/me', UsersController.getMe);
// getme
router.post('/files', FilesController.postUpload);
// upload
router.get('/files/:id', FilesController.getShow);
//FilesController.getIndex
router.get('/files', FilesController.getIndex);
// FilesController.putPublish
router.put('/files/:id/publish', FilesController.putPublish);
// FilesController.putUnpublish
router.put('/files/:id/unpublish', FilesController.putUnpublish);
// FilesController.getFile
router.get('/files/:id/data', FilesController.getFile);

// exports
module.exports = router;
