import 'reflect-metadata';

import './container';
import './infra/knex';

import createServer from './infra/http/server';

createServer();
