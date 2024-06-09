import { Router } from "express";
import tokenSeguradoraController from '../controllers/TokenSeguradoraController';

const router = new Router();

router.post('/', tokenSeguradoraController.store);

export default router;
