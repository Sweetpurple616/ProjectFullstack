var projectController = function(Project){
    var post = function(req,res){
        var project = new Project(req.body);

        if(!req.body.title){
            res.status(400);
            res.send('title is required');
        }
        else{

                project.save();
                res.status(201);
                res.send(project);
                }
    }
    var get = function(req,res){
    
        var query = {};

        if(req.query.catergory){
            query.catergory = req.query.catergory;
        }
        Project.find(query, function(err,projects){
            if(err)
                res.status(500).send(err);
            else
            var returnProjects = [];
            projects.forEach(function(element, index, array){
                var newProject = element.toJSON();
                newProject._links= {};
                newProject._links.self =  { 'href': 'http://' + req.headers.host + '/api/projects/' + newProject._id}
                newProject._links.collection = {'href' : 'http://' + req.headers.host + '/api/projects'}
                returnProjects.push(newProject);
            })
            var json = {
                "items":returnProjects,
                "_links": {
                    "self":{
                    "href" : "http://128.199.60.110:8000/api/projects"
                }
                  
                }, 
                "pagination": {
                    "currentPage":1,
                    "currentItems":35,
                }
                }




                res.json(json);
        });
    }
    return {
        post:post,
        get:get
    }

}

module.exports = projectController;