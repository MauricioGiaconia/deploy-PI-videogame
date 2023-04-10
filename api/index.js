//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {PORT} = process.env;

const { pushAllGenres, pushAllPlatforms, pushAllStores, pushAllDevelopers } = require('./src/controllers/migrateAPItoDB.js');

// Syncing all the models at once.
// ACORDARSE DE PONER EL FORCE EN FALSE ASI NO SE REINICIA CADA VEZ QUE EL SV SE RESETEA
conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    pushAllGenres();
    pushAllPlatforms();
    pushAllDevelopers();
    pushAllStores();
    console.log('%s listening at ', PORT); 
    // eslint-disable-line no-console
  });
});
