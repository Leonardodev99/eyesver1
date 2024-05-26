import Agente from '../models/Agente';
import jwt from 'jsonwebtoken';

//Verificar se o usuario existe na base de dados para poder logar

class TokenAgenteController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;
    //Se o usuario nao digitar nada
    if(!email || !password) {
      return res.status(401).json({
        errors: ['Credenciais invalidas'],
      });
    }

    const usuario = await Agente.findOne({ where: { email } });

  //Se o usuario existe
  if(!usuario) {
    return res.status(401).json({
      errors: ['Usuario nao existe'],
    });
  }

  if(!(await usuario.passwordIsValid(password))) {
    return res.status(401).json({
      errors: ['Senha invalida'],
    });
  }
// Criando token para o usuario
  const { id } = usuario;
  const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET_AGENT, {
    expiresIn: process.env.TOKEN_EXPIRATION,
  });

    return res.json({ token });

  }
  //Gerando o token para a recuperacao de senha
  async forgotPassword(req, res) {
    const { email } = req.body;

    /*try {

      //verificar se o usuario com o e-mail fornecido existe
      const usuario = await Usuario.findOne({ where: { email }});

      if(!usuario) {
        return res.status(404).json({ Message: 'Usuario nao encontrado '});
      }

      //Gerar o token de reuperacao de senha
      const resetToken = jwt.sign({ id: usuario.id }, process.env.RESET_TOKEN_SECRET, {
        expiresIn: '1h',
      });

      //Enviar e-mail com link de redifinicao de senha
      //Codigo para enviar e-mail aqui..

      return res.json({ message: 'E-mail de recuperacao de senha enviado com sucesso' });
    }catch (error) {
      return res.status(500).json({ massage: 'Ocorreu um erro ao processar a solicitacao' });
    }*/
  }

}

export default new TokenAgenteController();
