const router = require('express').Router();
let User = require('../models/user.model');
let Exercise = require('../models/exercise.model');
const auth = require('../middleware/auth');

router.get('/users', auth, (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error '+err));
});

router.post('/add_user', auth ,(req, res) => {
    const username = req.body.username;
    // console.log(req.body.username);
    const newUser = new User({username});
            
    newUser.save()
        .then(() => res.json('User added'))
        .catch(err => res.status(400).json('Error: '+err));
});

router.post('/update_user/:id', auth ,(req, res) => {

    User.findById(req.params.id)
        .then(user => {

            user.username = req.body.username;

            user.save()
                .then(() => res.json('User modified!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json(err));

});

router.get('/user/:id', auth ,(req, res) => {

    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json(err));

});

router.get('/delete_user/:id', auth ,(req, res) => {
    
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));

});

router.get('/exercises', auth ,(req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error:' + err))
});

router.post('/add_exercise', auth ,(req, res) => {
    const username = req.body.username; 
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({username, description, duration, date});

    newExercise.save()
        .then(() => res.json('Exercise added'))
        .catch(err => res.status(400).json('Error: ' + err));
 
});

router.get('/exercise/:id', auth ,(req, res) => {

    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));

});

router.get('/delete_exercise/:id', auth ,(req, res) => {

    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted'))
        .catch(err => res.status(400).json('Error: ' + err));

});

router.post('/update_exercise/:id', auth ,(req, res) => {

    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;