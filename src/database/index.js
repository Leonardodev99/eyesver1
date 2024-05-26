import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Usuario from '../models/Usuario';
import Agente from '../models/Agente'
import Denuncia from '../models/Denuncias';

const models = [Usuario, Agente, Denuncia];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
