import { Router } from "express";

import DenunciasController from "../controllers/DenunciasController";

import loginRequired from "../middlewares/loginRequired";
import loginAgenteRequired from '../middlewares/loginAgenteRequired';

const router = new Router();

//Para o usuario criar conta nao precisa esta logado
router.post('/', loginRequired, DenunciasController.store);
router.get('/minhas', loginRequired, DenunciasController.minhasDenuncias);

//Para o usuario a tualizar os dados ou eliminar a sua conta ele precisa esta logado
router.get('/', loginAgenteRequired, DenunciasController.index);
router.get('/:id', loginAgenteRequired, DenunciasController.show)
router.put('/:id', loginAgenteRequired, DenunciasController.update);
//outer.get('/matricula/:matriculaVeiculo', DenunciasController.regitration);
router.post('/matricula', DenunciasController.regitration);

//router.delete('/', DenunciasController.delete);

export default router;
