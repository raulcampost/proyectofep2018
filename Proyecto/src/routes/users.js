const router = require('express-promise-router')();
const mongojs = require('mongojs');
const db2 = mongojs('mongodb://raul:00025416ad712ecb@ds141633.mlab.com:41633/proyectofep', ['users']);


//rutas para users

// Single user
router.get('/users', (req, res, next) => {
    db2.users.find((err, tasks) => {
        if (err) return next(err);
        res.json(tasks);
    });
});

router.get('/users/:auth', (req, res, next) => {
    db2.users.find({auth:req.params.auth},(err, tasks) => {
        if (err) return next(err);
        res.json(tasks);
    });
});

router.get('/users/:id', (req, res, next) => {
    db2.users.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, user) => {
        if (err) return next(err);
        res.json(user);
    });
});

// Add a user
router.post('/users', (req, res, next) => {
    const users = req.body;
    if(!users.user){
        res.status(400).json({
            'error': 'Bad Data'
        });
    } else {
        db2.users.save(users, (err, user) => {
            if (err) return next(err);
            res.json(user);
        });
    }
});

// Delete user
router.delete('/users/:id', (req, res, next) => {
    db2.users.remove({_id: mongojs.ObjectId(req.params.id)}, (err, user) => {
        if(err){ res.send(err); }
        res.json(user);
    });
})

module.exports = router;