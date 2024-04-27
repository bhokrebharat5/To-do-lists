const Task = require('../models/task');

async function handleTaskLists( req, res ) {

    if(!req.user._id) return res.redirect('/user/login');

    const taskLists = await Task.find({
        createdBy:req.user._id
    })
    res.render('dashboard', {taskLists});
}

async function handleAddNewTask( req, res ) {

    var postData = [];
    var titleLen = req.body.title.length;
    var descriptionLen = req.body.description.length;


    if( !req.body.title || !req.body.description ) return res.render('task-add', {status:false, msg:'Please enter the all field'})

    if( Array.isArray(req.body.title) ) {
        for (var i = 0; i < titleLen; i++) {

            if( req.body.title[i] && req.body.description[i]) {
                postData.push({
                    title: req.body.title[i],
                    description: req.body.description[i],
                    createdBy: req.user._id
                });
            }else {
                return res.render('task-add', {status:false, msg:'Please enter the all field'});
            }
        }
    }else {
        postData.push({
            title: req.body.title,
            description: req.body.description,
            createdBy: req.user._id
        });
    }

    Task.create( postData );

    return res.render('task-add', {status:true, msg:'Successfully Created task'} );
}

async function handleEditSingleTask( req, res ) {

    const id = req.params.id;

    if(!id) return res.redirect('/');

    var task = await Task.findById(id);

    res.render('task-edit',{task});
}

async function handleDeleteSingleTask( req, res ) {
    const id = req.params.id;

    if(!id) return res.redirect('/');
    
    var deleted = await Task.findOneAndDelete({_id: id});
    res.redirect('/');
}

async function handleUpdateSingleTask( req, res ) {
    const id = req.params.id;
    const title = req.body.title;
    const description = req.body.description;

    if(!id ) return res.redirect('/');

    var task = await Task.findById(id);
    if( !title || !description ) return res.render('task-edit', {task:task, status:false, msg:'Please enter the all field'})

    await Task.findByIdAndUpdate({_id:id},{
        title,
        description
    })

    return res.redirect('/');   
}

async function handleViewSingleTask( req, res ) {

    const id = req.params.id;
    if( !req.user._id ) res.redirect('/');

    var task = await Task.findById(id);

    res.render('task-view',{task});
}

module.exports = {
    handleTaskLists,
    handleAddNewTask,
    handleEditSingleTask,
    handleDeleteSingleTask,
    handleUpdateSingleTask,
    handleViewSingleTask
}