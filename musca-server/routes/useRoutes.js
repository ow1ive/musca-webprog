import express from 'express';
import {
  createUser,
  deleteUser,
  getUsers,
  loginUser,
  updateUser,
} from '../controllers/userController.js';

const router = express.Router();

router.route('/').get(getUsers).post(createUser);
router.route('/:id').put(updateUser).delete(deleteUser);
router.post('/login', loginUser);

export default router;
