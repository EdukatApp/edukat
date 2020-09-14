import Knex from 'knex';

import appConfig from '~/config/app';

const tableName = 'types';

export async function up({ schema }: Knex): Promise<void> {
  await schema.createTable(tableName, (table) => {
    table.string('id', appConfig.idLength).primary();
    table.string('name').notNullable();
    table.string('permissions').notNullable();
    table.timestamps();
  });
}

export async function down({ schema }: Knex): Promise<void> {
  await schema.dropTable(tableName);
}
