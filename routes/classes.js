const express = require('express')
const classSchema = require('../model/classes')
const router = express()
router.get('/classes', async (req, res)=>{
    const categorylist = await classSchema.find()
    res.json(categorylist)
    if (!categorylist) {
        res.status(500).json({
            success: false,
            message: "no classes"
        })
    }
    })

//get classes by id
router.get('/classes/:id', async (req, res)=>{
    const classid = await classSchema.findById(req.params.id)
    if(!classid){
    res.status(500).json({
        success: false,
        message: "the classes cannot be found"
    })
}
    res.status(200).json(classid)
})

//insert new catergory
router.post('/classes', async (req, res) => {
    const classes = new classSchema({
        classname: req.body.classname,
        classlevel: req.body.classlevel,
        classgroup: req.body.classgroup,
        classhead: req.body.classhead
    })
    categories= await classes.save()

    if(!categories)
    return res.status(404).send('classes cannot be created')

    res.send(categories)
    
})

//update classes
router.put('/classes/:id', async(req, res) => {
    const updateclasses= await classSchema.findByIdAndUpdate(
        req.params.id,
        {
            classname: req.body.classname,
            classlevel: req.body.classlevel,
            classgroup: req.body.classgroup,
            classhead: req.body.classhead
        },
        {
            new:true
        }
    )
    if(!updateclasses){
        res.status(500).json({
            success: false,
            message: "the classes cannot be found"
        })
    }else{
        res.send(updateclasses)
    }
   
})





//delete classes
router.delete('/classes/:id', async(req, res) => {
    const classes = await classSchema.findByIdAndRemove(req.params.id)
    .then(classes => {if(classes){
       return res.status(200).json({
           success: true,
           message: "the classes is deleted"
       })
    }else{
        return res.status(200).json({
            success: false,
            message: "the classes cannot be found"
        })
    }
    }).catch(err=>{
          return res.status(400).json({
            success: false,
            error: err})
    }) })
    

//filter classes

router.get('/toms', async (req, res)=>{
    let classlevels= {}
    if(req.query.classlevel){
        const filters = {classlevel: req.query.classlevel.split(',')}
    }   
    const inputClasslevel = await classSchema.find('classlevels')
if (!inputClasslevel) {
    res.status(500).json({
        success: false,
        message: "No classlevel found "
    })
}

res.status(200).json({data: inputClasslevel})
})       

//filter classes

    // router.get('/toms', async (req,res) => {
    //     const match = {}
    
    //     if(req.query.classlevels){
    //         match.classlevels = req.query.classlevels === 'true'
    //     }
    //     try {
    //         await req.classSchema.populate({ path:'classlevel',match}).execPopulate()
    //         res.send(req.classSchema.posts)
    //     } catch (error) {
    //         res.status(500).send()
    //     }
    // })




module.exports = router;