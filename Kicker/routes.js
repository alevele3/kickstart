const routes = require('next-routes')();

routes
.add('/campaigns/new', '/campaigns/new')
.add('/campaigns/:address', '/campaigns/show');
//routes.add('...','...');

module.exports = routes;
