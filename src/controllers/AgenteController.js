import Agente from "../models/Agente";

class AgenteController {
  //store -- criar conta
  async store(req, res){
    try {
      const novoUsuario = await Agente.create(req.body);
      return res.json(novoUsuario);
  } catch (e) {

    console.log(e);
    return res.status(400).json({
      errors: e.errors.map(err => err.message)
    });

  }
  }

//index --> lista todos os usuarios
  async index(req, res){
    try {
      const usuarios = await Agente.findAll({ attributes: ['id', 'username', 'email', 'telefone']});
      return res.json(usuarios);
    }catch (e) {
      return res.json(null);
    }
  }

  //show --> listar um usuario
  async show(req, res){
    try {
      
      const usuario = await Agente.findByPk(req.params.id);
      const { id, username, email, telefone} = usuario;
      return res.json({ id, username, email, telefone});
    }catch (e) {
      return res.json(null);
    }
  }

  //update
  async update(req, res){
    try {

     /* const { id } = req.params;
     
      if(!id) {
        return res.status(400).json({
          errors: ['ID nao fornecido'],
        });
      } 

      if(isNaN(id)) {

        return res.status(400).json({
          errors: ['ID invalido'],
        });

      }*/

       const usuario = await Agente.findByPk(req.usuarioId);

      if(!usuario) {
        return res.status(404).json({
          errors: ['Usuario nao existe'],
        });
      }

      const novosDados = await usuario.update(req.body);
      const { nome, username, email, telefone, nip, endereco } = novosDados;
      
      return res.json({ nome, username, email, telefone, nip, endereco }); 

    }catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message),
      });
    }
  }

  //Delete
  async delete(req, res){
    try {
      
      /*const { id } = req.params;
     
      if(!id) {
        return res.status(400).json({
          errors: ['ID nao fornecido'],
        });
      } 

      if(isNaN(id)) {

        return res.status(400).json({
          errors: ['ID invalido'],
        });

      }*/

       const usuario = await Agente.findByPk(req.usuarioId);

      if(!usuario) {
        return res.status(404).json({
          errors: ['Usuario nao existe'],
        });
      }

      await usuario.destroy();

      return res.json(null);
    }catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message),
      });
    }
  }


}

export default new AgenteController();
