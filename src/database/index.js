import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Usuario from '../models/Usuario';
import Agente from '../models/Agente'
import Denuncia from '../models/Denuncias';
import Seguradora from '../models/Seguradora';

const models = [Usuario, Agente, Denuncia, Seguradora];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
