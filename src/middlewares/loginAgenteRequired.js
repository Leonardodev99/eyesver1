import jwt from 'jsonwebtoken';
import Agente from '../models/Agente';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ errors: ['Login required'] });
  }

  const [, token] = authorization.split(' ');

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET_AGENT);
    const agente = await Agente.findOne({ where: { id: dados.id, email: dados.email } });

    if (!agente) {
      return res.status(401).json({ errors: ['Agente inválido'] });
    }

    req.usuarioId = dados.id; 
    req.usuarioEmail = dados.email; 
    req.usuario = agente; // Armazena o agente em req.usuario

    return next();
  } catch (e) {
    return res.status(401).json({ errors: ['Token expirado ou inválido'] });
  }
};





















/*import jwt from 'jsonwebtoken';
import Agente from '../models/Agente';

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
    const dados = jwt.verify(token, process.env.TOKEN_SECRET_AGENT);
    const { id, email } = dados;
    
    //Verificar se o email ainda existe

    const usuario = await Agente.findOne({
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



    req.usuarioId = id;
    req.usuarioEmail = email;
    return next();

  } catch(e) {
    return res.status(401).json({
      errors: ['Token expirado ou invalido'],
    });
  }
};*/
