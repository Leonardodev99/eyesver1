import jwt from 'jsonwebtoken';
import Seguradora from '../models/Seguradora';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ errors: ['Login required'] });
  }

  const [, token] = authorization.split(' ');

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET_SEGURADORA);
    const seguradora = await Seguradora.findOne({ where: { id: dados.id, email: dados.email } });

    if (!seguradora) {
      return res.status(401).json({ errors: ['Usuário inválido'] });
    }

    req.seguradoraId = dados.id;
    req.seguradoraEmail = dados.email;
    req.seguradora = seguradora;
    req.user = {
      id: req.seguradoraId,
      email: req.seguradoraEmail
    };

    return next(); 
  } catch (e) {
    return res.status(401).json({ errors: ['Token expirado ou inválido'] });
  }
};




















/*import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario';

//middlawere que verifica o token do usuario afim de dar autorizacao a determinada pagina da aplicacao
export default async (req, res, next) => {
  const { authorization } = req.headers;

  if(!authorization) {
    return res.status(401).json({
      errors: ['Login required'],
    });
  }


  const [, token] = authorization.split(' ');

  try{
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;
    
    //Verificar se o email ainda existe

    const usuario = await Usuario.findOne({
      where: {
        id,
        email,
      },
    });

    if(!usuario) {
      return res.status(401).json({
        errors: ['Usuario invalido'],
      });
    }
    /*const usuario = await Usuario.findOne({ where: { id } }); // Verifica apenas pelo ID

    if (!usuario || usuario.email !== email) { // Verifica se o email do usuário corresponde ao do token
      return res.status(401).json({ errors: ['Usuário inválido'] });
    }*/



    /*req.usuarioId = id;
    req.usuarioEmail = email;
   /* req.user = {
      id: req.usuarioId,
      email: req.usuarioEmail
    };
    return next();

  } catch(e) {
    return res.status(401).json({
      errors: ['Token expirado ou invalido'],
    });
  }
};*/
