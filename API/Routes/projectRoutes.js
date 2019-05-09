var express = require('express');

var routes = function(Project){
    var projectRouter = express.Router();

    var projectController = require('../Controllers/projectController.js')(Project)

    projectRouter.route('/')
        .post(projectController.post)
        .get(projectController.get)
        .options(function(req, res){
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, ContentType, Accept");
            res.header('Allow', 'GET,POST,OPTIONS');
            res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
            res.sendStatus(200);
        })

    projectRouter.use('/:projectId', function(req,res,next){
        Project.findById(req.params.projectId, function(err,project){
    
            if(err)
                res.status(500).send(err);
            else if(project)
            {
                req.project = project;
                next();
            }
            else
            {
                res.status(404).send('no project found')
            }   
        });
    });
    projectRouter.route('/:projectId')
        .options(function(req, res){
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, ContentType, Accept");
            res.header('Allow', 'GET,PUT,PATCH,DELETE,OPTIONS');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,DELETE,OPTIONS');
            res.sendStatus(200);
        })

        .get(function(req,res,){
            var returnProject = req.project.toJSON();
            returnProject._links = {};
            returnProject._links.self =  { "href": 'http://' + req.headers.host + '/api/projects/' + returnProject._id}
            returnProject._links.collection = {'href' : 'http://' + req.headers.host + '/api/projects'}
            res.json(returnProject); 

           
        }) 
        .put(function(req,res){
            
            if (req.body.title){ 
            req.project.title = req.body.title;
            req.project.description = req.body.description;
            req.project.catergory = req.body.catergory;
            req.project.ongoing = req.body.ongoing;
            req.project.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.project);
                }

            });
        } else {
            res.status(400);
            res.send('title is required');
        }
        
            })
        .patch(function(req,res){
            if(req.body.id)
                delete req.body._id;

            for(var p in req.body){

                req.project[p] = req.body[p];
            }
            req.project.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.project);
                }

            });
        })
        .delete(function(req,res){
            req.project.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Remove');
                }
            });            
        })


        return projectRouter;
};

module.exports = routes;