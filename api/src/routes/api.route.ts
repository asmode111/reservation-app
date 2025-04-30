import { Router } from 'express';
import * as apiController from '../controllers/api.controller';

const router = Router();

router.get('/guests', apiController.guestsAction);

export default router;