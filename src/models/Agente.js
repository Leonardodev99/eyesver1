import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcrypt';

export default class Agente extends Model {
  static init(sequelize) {
    super.init({
      //VALIDANDO OS CAMPOS

      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo nome deve ter entre 3 a 255 caracteres',
          }
        }
      },
      username: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo usename deve ter entre 3 a 255 caracteres',
          }
        }
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email ja existe'
        },
        validate: {
          isEmail: {
            msg: 'Email invalido',
          }
        }
      },
      nip: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'Campo de numero de identificacao policial deve ser inteiro',
          }
        }

      },
      telefone: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'Campo telefone deve conter numeros inteiros',
          }
          
        }
      },
      endereco: {
        type: Sequelize.TEXT,
        defaultValue: '',
        validate: {
          len: {
            args: [4, 300],
            msg: 'Campo endereco deve conter entre 4 a 300 caracteres'

          }
        }
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },

      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [8, 20],
            msg: 'Campo senha deve conter 8 a 20 caracteres',
        }
        }
      },

    }, {
      sequelize,
      modelName:'Agente'
    });

    this.addHook('beforeSave', async agente => {
      if(agente.password) {
        agente.password_hash = await bcrypt.hash(agente.password, 8);
      }

    });

    return this;
  }

  /*static associate(models) {
    this.hasMany(models.Receitas, { foreignKey: 'usuarioId' });
  }*/

  passwordIsValid(password) {
    return bcrypt.compare(password, this.password_hash)
  }
}
