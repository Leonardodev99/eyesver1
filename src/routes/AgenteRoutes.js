import { Router } from "express";
import AgenteController from "../controllers/AgenteController";
import loginAgenteRequired from "../middlewares/loginAgenteRequired";
//import loginRequired from "../middlewares/loginRequired";

const router = new Router();

//Para o usuario criar conta nao precisa esta logado
router.post('/', AgenteController.store);

//Para o usuario a tualizar os dados ou eliminar a sua conta ele precisa esta logado
router.put('/', loginAgenteRequired,AgenteController.update);
//router.delete('/', UsersAgentController.delete);

export default router;
