const authRoutes = require('./auth');
const compInfoRoutes = require('./companyInformation');

const publicRoutes = [
    authRoutes,
    compInfoRoutes
];

module.exports = publicRoutes;