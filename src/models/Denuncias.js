import Sequelize, { Model } from 'sequelize';

export default class Denuncia extends Model {
  static init(sequelize) {
    super.init(
      {
       
        nomeProprietario: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
                args: [3, 255],
                msg: 'Nome do proprietario deve conter entre 3 a 255 caracteres',
            },
            //is: /^[a-zA-Z\s]+$/,
             // msg: 'O nome do proprietario deve conter letras',
            
          },
        },
        biProprietario: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [14],
              msg: 'O bilhete de identidade deve conter 14 caracteres'
            },
            isAlphanumeric: {
              args: true,
              msg: 'O bilhete de idientidade de conter caracteres alfanumericos'
            }
          }
        },
        enderecoProprietario: {
          type: Sequelize.TEXT,
          defaultValue: '',
          validate: {
            len: {
                args: [10, 300],
                msg: 'O endereco do proprietario deve conter entre 3 a 255 caracteres',
            }
          }
        },
        emailProprietario: {
          type: Sequelize.STRING,
          defaultValue: '',
          unique: {
            msg: 'Email já existe',
          },
          validate: {
            isEmail: {
              msg: 'Email inválido',
            },
          },
        },
        telefoneProprietario: {
          type: Sequelize.STRING,
          defaultValue: '',
          unique: {
            msg: 'Telefone já existe',
          },
          validate: {
            isNumeric: {
              msg: 'Telefone deve conter apenas números',
            },
            len: {
              args: [9],
              msg: 'Telefone deve ter 9 dígitos',
            },
          },
        },
        localIncidente: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
                args: [10, 255],
                msg: 'O local do incidente deve ter entre 10 e 255 caracteres', 
            }
          },
        },
        dataIncidente: {
          type: Sequelize.DATEONLY,
          defaultValue: Sequelize.NOW,
          isDate: {
            msg: 'Data invalida. Use o formato YYYY-MM-DD',
          }
        },
        matriculaVeiculo: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
                args: [5, 11],
                msg: 'Nome deve conter entre 5 a 11 caracteres',
            },
          },
          unique: {
            msg: 'Matrícula já existe',
          },
        },
        corVeiculo: {
          type: Sequelize.STRING,
           defaultValue: '',
          validate: {
            len: {
                args: [4, 15],
                msg: 'A cor do veiculo deve conter entre 4 a 15 caracteres',
            }
          }
        },
        marcaVeiculo: {
          type: Sequelize.STRING,
          validate: {
            len: {
                args: [4, 30],
                msg: 'A matricula do veiculo deve conter entre 4 a 15 caracteres',
            }
          }
        },
        comentario: {
          type: Sequelize.TEXT,
          defaultValue: '',
          validate: {
            len: {
              args: [0, 500],
              msg: 'O comentario deve conter no maximo 500 caracteres'
            }
          }
        },
        estadoDenuncia: {
          type: Sequelize.STRING,
          defaultValue: 'Pendente',
          validate: {
            isAllowedUpadate(value) {
              if(value!== 'Pendente' && value!== 'Investigacao' && value!== 'Resolvido') {
                throw new Error('Estado da denúncia inválido para atualização.');
              }
            }
          }
        },
        usuarioId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'usuarios',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      {
        sequelize,
        modelName: 'Denuncias',
      },
      
   
    );

   

    // Aqui você pode adicionar hooks, associações, etc., se necessário.

    return this;
  }
}
