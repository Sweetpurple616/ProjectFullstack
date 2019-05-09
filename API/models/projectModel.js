var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var projectModel = new Schema({
    
    title: {
        type: String
    },

    description: {
        type: String
    },
    
    catergory: {
        type: String
    },
    ongoing:{
        type: Boolean, default:true
    },
    
});

module.exports= mongoose.model('Project', projectModel);