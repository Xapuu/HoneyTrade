const authCheck = require('../middleware/auth-check');


const publicRoutes = require('../routes/public/publicRoutes');
const authUsersRouter = require('../routes/auth-user/authUsers-router');
const adminRoutes = require('../routes/admin/admin-router');
const buyerRoutes = require('../routes/buyer/buyer-router');


module.exports = app => {


    app.use([...publicRoutes]);

    app.use('/user', authCheck.userAuth)
    app.use('/user', [...authUsersRouter]);
    
    app.use('/buyer', authCheck.buyerAuth);
    app.use('/buyer', [...buyerRoutes]);

    app.use('/admin', authCheck.adminAuth);
    app.use('/admin', [...adminRoutes]);



    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};