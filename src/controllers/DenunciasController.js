import Denuncia from "../models/Denuncias";
import Usuario from "../models/Usuario";


class DenunciasController {
  //store -- criar conta
  async store(req, res){
    try {
        // Obtenha o ID do usuário logado
        const usuarioId = req.user.id; 
        if(!usuarioId){
          return res.status(400).json({
            errors: ['ID nao encontrado'],
          });

        }

       

        // Crie um novo objeto de denúncia com os dados da requisição e o usuárioId
        const novaDenuncia = await Denuncia.create({
          nomeProprietario: req.body.nomeProprietario,
          biProprietario: req.body.biProprietario,
          enderecoProprietario: req.body.enderecoProprietario,
          emailProprietario: req.body.emailProprietario,
          telefoneProprietario: req.body.telefoneProprietario,
          localIncidente: req.body.localIncidente,
          dataIncidente: req.body.dataIncidente,
          matriculaVeiculo: req.body.matriculaVeiculo,
          corVeiculo: req.body.corVeiculo,
          marcaVeiculo: req.body.marcaVeiculo,
          comentario: req.body.comentario,
          estadoDenuncia: req.body.estadoDenuncia,
          usuarioId: usuarioId // Define o usuárioId da denúncia
        });
        const usuario = await Usuario.findByPk(usuarioId);
        //const novaDenuncia = await Denuncia.create(req.body);

  
        return res.json(novaDenuncia);
     
  }catch (e) {
    console.log(e)
    let errors = [];
    if(e.errors) {
      errors = e.errors.map((err) => err.message);
    }else {
      errors = ["Erro ao criar denúncia."];
    }

    return res.status(400).json({ errors });

  }
}

//index --> lista todos os usuarios
  async index(req, res){
    try {
     // const denuncias = await Denuncias.findAll({ attributes: ['id', 'username', 'email', 'telefone']});
      const denuncias = await Denuncia.findAll();
      return res.json(denuncias);
    }catch (e) {
      console.log(e);
      return res.json(null);
    }
  }

  //show --> listar um usuario
  async show(req, res){
    try {

     /* const usuarioId = req.params.id;
      
      const denuncia = await Denuncia.findOne({ where: { usuarioId }});
      //const { id, username, email, telefone} = usuario;
      return res.json(denuncia);*/
      const { id } = req.params.id;
      const denuncia = await Denuncia.findOne(id);

      if(!denuncia) {
        return res.status(404).json({ error: 'Denúncia não encontrada' });
      }
      return res.json(denuncia);
    }catch (e) {
      console.log(e)
      return res.json(null);
    }
  }

  //minhas denuncias
  async minhasDenuncias(req, res) {
    try {
      const { usuarioId } = req;
      const denuncias = await Denuncia.findAll({
        where: {
          usuarioId: usuarioId,
        },
      });

      return res.json(denuncias);

    } catch(error) {
      return res.status(500).json({ error: 'Erro ao buscar suas denuncias'});
    }

  }

  //update
  async update(req, res){
    try {

      const { id } = req.params;
      const { estadoDenuncia } = req.body;
     
      if(!id) {
        return res.status(400).json({
          errors: ['ID nao fornecido'],
        });
      } 

      if(isNaN(id)) {

        return res.status(400).json({
          errors: ['ID invalido'],
        });

      }

       const denuncia = await Denuncia.findByPk(id);

      if(!denuncia) {
        return res.status(404).json({
          errors: ['Denuncia nao encontrada'],
        });
      }

       // Atualiza apenas o campo "estado da denuncia"
    await Denuncia.update({ estadoDenuncia }, { where: { id } });

    // Busca a denúncia novamente para retornar os dados atualizados
    const denunciaAtualizada = await Denuncia.findByPk(id);

    return res.json(denunciaAtualizada);


      /*await Denuncia.update(req.body, { where: { id }});
      //const { username, email, telefone} = novosDados;
      const denunciaAtualizada = await Denuncia.findByPk(id);
      
      return res.json(denunciaAtualizada);*/ 

    }catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map(err => err.message),
      });
    }
  }

  //Delete
  async delete(req, res){
    try {
      
      const { id } = req.params;
     
      if(!id) {
        return res.status(400).json({
          errors: ['ID nao fornecido'],
        });
      } 

      if(isNaN(id)) {

        return res.status(400).json({
          errors: ['ID invalido'],
        });

      }

       const denuncia = await Denuncia.findByPk(req.usuarioId);

      if(!denuncia) {
        return res.status(404).json({
          errors: ['Usuario nao existe'],
        });
      }

      await denuncia.destroy();

      return res.json(null);
    }catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message),
      });
    }
  }


}

export default new DenunciasController();
