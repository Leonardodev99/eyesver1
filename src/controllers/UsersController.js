import Usuario from "../models/Usuario";

class UsersController {
  //store -- criar conta
  async store(req, res){
    try {
      const novoUsuario = await Usuario.create(req.body);
      return res.json(novoUsuario);
  }catch (e) {
    return res.status(400).json({
      errors: e.errors.map(err => err.message)
    });
  }
  }

//index --> lista todos os usuarios
  async index(req, res){
    try {
      const usuarios = await Usuario.findAll({ attributes: ['id', 'username', 'email', 'telefone']});
      return res.json(usuarios);
    }catch (e) {
      return res.json(null);
    }
  }

  //show --> listar um usuario
  async show(req, res){
    try {
      
      const usuario = await Usuario.findByPk(req.params.id);
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

       const usuario = await Usuario.findByPk(req.usuarioId);

      if(!usuario) {
        return res.status(404).json({
          errors: ['Usuario nao existe'],
        });
      }

      const novosDados = await usuario.update(req.body);
      const { username, email, telefone} = novosDados;
      
      return res.json({ username, email, telefone}); 

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

       const usuario = await Usuario.findByPk(req.usuarioId);

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

export default new UsersController();
