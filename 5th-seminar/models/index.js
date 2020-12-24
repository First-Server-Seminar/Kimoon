const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.Like = require('./like')(sequelize, Sequelize);

/** 1 : N   User : Post */
db.User.hasMany(db.Post, { onDelete: 'cascade' });  //같이 삭제된다.
db.Post.belongsTo(db.User);

/** N: M    User : Post => Like. Like를 통해서 N:M으로 연결되는 관계 */
db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
db.Post.belongsToMany(db.User, { through: 'Like', as: 'Liker' });

module.exports = db;
