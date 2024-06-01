import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcrypt';

export default class Usuario extends Model {
  static init(sequelize) {
    super.init({
      //VALIDANDO OS CAMPOS

      name: {
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
      telefone: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'Campo telefone deve conter numeros inteiros',
          }
          
        },
      },
      nif: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'Campo nif deve conter numeros inteiros',
          }
          
        },
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
      modelName:'Usuario'
    });

    this.addHook('beforeSave', async usuario => {
      if(usuario.password) {
        usuario.password_hash = await bcrypt.hash(usuario.password, 8);
      }

    });

    return this;
  }

  static associate(models) {
    this.hasMany(models.Denuncias, { foreignKey: 'usuarioId' });
  }

  passwordIsValid(password) {
    return bcrypt.compare(password, this.password_hash)
  }
}
