import sequelize from '../src/services/db';

async function reset() {
	await sequelize.sync({ force: true });	
}

reset();