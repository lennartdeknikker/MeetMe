function remove(req, res) {
    var id = req.params.id;
    console.log(id);
    db.collection('information').deleteOne({
        _id: new mongo.ObjectID(id)
    }, done);

    function done(err, data) {
        if (err) {
            next(err);
        } else {
            res.json({
                status: 'ok'
            });
        }
    }
}

module.exports = remove;