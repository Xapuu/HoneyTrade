const authRoutes = require('./auth-routes');
const compInfoRoutes = require('./companyInformation-routes');
const productRoutes = require('./product-routes');
const partnersRoutes = require('./partners-routes');
const reviewRoutes = require('./review-routes');



const publicRoutes = [
    authRoutes,
    compInfoRoutes,
    productRoutes,
    partnersRoutes,
    reviewRoutes
];

module.exports = publicRoutes;