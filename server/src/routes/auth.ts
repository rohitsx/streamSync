import express from 'express';
import { signup, login, validateToken } from '../services/authService';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/validate-token', validateToken);

export default router;