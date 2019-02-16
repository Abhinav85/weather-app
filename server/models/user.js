const {mongoose} = require('./../db/mongoose')

var user = mongoose.model('user',{
    name : {
        type : 'String',
        require : true,
        minLength : 1
    },
    password : {
        type : 'String',
        require : true,
        minLength : 6
    },
    email : {
        type : 'String',
        require : true,
        minLength : 1
    }
})

module.exports = {user};