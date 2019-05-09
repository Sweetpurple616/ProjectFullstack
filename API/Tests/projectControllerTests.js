var should = require('should'),
    sinon = require('sinon');

describe('Project Controller Tests', function(){
    describe('Post', function(){
        it('should not allow an empty title on post', function(){
            var Project = function(project){this.save = function(){}};

            var req = {
                body: {
                    "title": 'Hoi'
                }
            }
            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            }
            var projectController = require('../controllers/projectController')(Project);

            projectController.post(req,res)
            res.status.calledWith(400).should.equal(true, 'Bad status' + res.status.args[0][0])
            res.send.calledWith('Title is required').should.equal(true)
        })
    })
})