'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.createTable('denuncias', { 
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        nome_proprietario: {
          type: Sequelize.STRING,
          allowNull: false
        },
        bi_proprietario: {
          type: Sequelize.STRING,
          allowNull: false
        },
        endereco_proprietario: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        email_proprietario: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        telefone_proprietario: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        local_incidente: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        data_incidente: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        matricula_veiculo: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        cor_veiculo: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        marca_veiculo: {
          type: Sequelize.STRING,
          allowNull: false
        },
        comentario: {
          type: Sequelize.TEXT
        },
        estado_denuncia: {
          type: Sequelize.STRING,
          allowNull: false
        },
        usuario_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'usuarios',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false

        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false
        }

      });
     
     
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};