const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Dishes = require('./models/dishes');

const url = 'mongodb://127.0.0.1:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((database) => {

    console.log('Connected correctly to server');

    var newDish = Dishes({
        name: 'Uthappizza',
        description: 'some description'
    });

    newDish.save()
        .then((dish) => {
            console.log(dish);

            return Dishes.find({}).exec();
        })
        .then((dishes) => {
            console.log(dishes);

            return database.connection.db.collection('dishes').drop();
        })
        .then(() => {
            return database.connection.close();
        })
        .catch((err) => {
            console.log(err);
        });

});