import { Router } from 'express';
import * as appController from '../controllers/app.controller';

const router = Router();

router.get('/', appController.getMain);

export default router;