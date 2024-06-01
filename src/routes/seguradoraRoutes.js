import { Router } from "express";
import SeguradoraController from "../controllers/SeguradoraController";

//import loginRequired from "../middlewares/loginRequired";

const router = new Router();

//Para o usuario criar conta nao precisa esta logado
router.post('/', SeguradoraController.store);

//Para o usuario a tualizar os dados ou eliminar a sua conta ele precisa esta logado
/*router.put('/', loginRequired, UsersController.update);
router.delete('/', loginRequired, UsersController.delete);*/

export default router;
