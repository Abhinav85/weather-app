const {mongoose} = require('./../db/mongoose')

var location  = mongoose.model('searched_location',{
    name : {
        type : 'String',
        require : true,
        minLength : 1
    },
    coord : {
        type : 'Object'
    },
    weather : {
        type : 'Object'
    },
    main : {
        type : 'Object'
    }
});

module.exports = {location}