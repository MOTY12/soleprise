const express = require('express')
const Category = require('../model/categories')
const router = express()
router.get('/category', async (req, res)=>{
    const categorylist = await Category.find()
    res.json(categorylist)
    if (!categorylist) {
        res.status(500).json({
            success: false,
            message: "no category"
        })
    }
    })

//get category by id
router.get('/category/:id', async (req, res)=>{
    const categoryid = await Category.findById(req.params.id)
    if(!categoryid){
    res.status(500).json({
        success: false,
        message: "the category cannot be found"
    })
}
    res.status(200).json(categoryid)
})

//insert new catergory
router.post('/category', async (req, res) => {
    const category = new Category({
        name: req.body.name
    })
    categories= await category.save()

    if(!categories)
    return res.status(404).send('category cannot be created')

    res.send(categories)
    
})

//update category
router.put('/category/:id', async(req, res) => {
    const updatecategory= await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name
        },
        {
            new:true
        }
    )
    if(!updatecategory){
        res.status(500).json({
            success: false,
            message: "the category cannot be found"
        })
    }else{
        res.send(updatecategory)
    }
   
})


//delete category
router.delete('/category/:id', async(req, res) => {
    const category = await Category.findByIdAndRemove(req.params.id)
    .then(category => {if(category){
       return res.status(200).json({
           success: true,
           message: "the category is deleted"
       })
    }else{
        return res.status(200).json({
            success: false,
            message: "the category cannot be found"
        })
    }
    }).catch(err=>{
          return res.status(400).json({
            success: false,
            error: err})
    }) })
    

module.exports = router;