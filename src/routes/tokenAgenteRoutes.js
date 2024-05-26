import { Router } from "express";
import tokenAgenteController from '../controllers/TokenAgenteController';

const router = new Router();

router.post('/', tokenAgenteController.store);

export default router;
