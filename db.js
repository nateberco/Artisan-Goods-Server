const Sequelize = require('sequelize');
const sequelize = new Sequelize('artisan-goods', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function(){
        console.log('Connect to artisan-goods postgre database');
    },
    function(err){
        console.log(err);
    }
);

module.exports = sequelize;