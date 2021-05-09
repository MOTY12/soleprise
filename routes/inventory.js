const express = require('express')
const inventorySchema = require('../model/inventory')
const router = express()
const multer = require('multer')






const FILE_TYPE_MAP={
     'image/png': 'png',
     'image/jpeg': 'jpeg',
     'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isVaild = FILE_TYPE_MAP[file.mimetype]
        let uploadError = new Error('invalid image type')
        if(isVaild){
            uploadError = null
        }
      cb(uploadError, './public/uploads')
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('_')
        const extension = FILE_TYPE_MAP[file.mimetype]
      cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
  })
   
  const uploadOptions = multer({ storage: storage })
  

//insert new inventory 
router.post('/product', uploadOptions.single('productimage'), async (req, res) => {
    const file = req.file 
    if(!file) return res.status(400).send('No image is uploaded, upload a image ')       
    const fileName = req.file.filename
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`

//inpput to the product data

        const inventory = new inventorySchema({
            productimage: `${basePath}${fileName}`,
            productname: req.body.productname,
            price: req.body.price,
            location: req.body.location,
            qty: req.body.qty,
            category: req.body.category,
            sku: req.body.sku,
            description: req.body.description
            
        })
       const inventories= await inventory.save()
        if(!inventories)
        return res.status(404).send({message: 'inventory cannot be created'})
        res.send({data: inventories})
        
    })


//update inventory
router.put('/product/:id', uploadOptions.single('productimage'), async(req, res) => {
 
    const file = req.file 
    if(!file) return res.status(400).send('No image is uploaded, upload a image ')       
    const fileName = req.file.filename
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`
    const updateproduct= await inventorySchema.findByIdAndUpdate(
        req.params.id,
        {
            productimage: `${basePath}${fileName}`,
            productname: req.body.productname,
            price: req.body.price,
            location: req.body.location,
            qty: req.body.qty,
            category: req.body.category,
            sku: req.body.sku,
            description: req.body.description
        },
        {
            new:true
        }
    )
    if(!updateproduct){
        res.status(500).json({
            success: false,
            message: "the product cannot be found"
        })
    }else{
        res.send(updateproduct)
    }
   
})




// get new inventory
router.get('/product', async (req, res)=>{
    const inventorylist = await inventorySchema.find().populate('category', 'name').populate('', '')
if (!inventorylist) {
    res.status(500).json({
        message: "No inventory found "
    })
}

res.status(200).json({data: inventorylist})
})        

router.get('/product/:id', async(req,res)=>{
    const inventoryid = await inventorySchema.findById(req.params.id).populate('category', 'name')
    if(!inventoryid){
    res.status(500).json({
        success: false,
        message: "No data for the inventory requested"
    })
}
    res.status(200).json({data: inventoryid})
})





//delete inventory
router.delete('/product/:id', async(req, res) => {
    const inventory = await inventorySchema.findByIdAndRemove(req.params.id)
    .then(inventory => {if(inventory){
       return res.status(200).json({
           success: true,
           message: "Successfully deleted"
       })
    }else{
        return res.status(200).json({
            success: false,
            message: "the inventory cannot be found"
        })
    }
    }).catch(err=>{
          return res.status(400).json({
            success: false,
            error: err})
    }) })


//search for product
router.get('/product/search', async(req, res)=>{
    const searchfield=req.query.product
    inventorySchema.find({product:{$regex: searchfield, options:'$i'}})
    .then(data=>{
        res.send(data)
    })
})

    
// //filter the product
// router.get('/product/filter', async (req, res)=>{
//     let filter= {}
//     if(req.query.categories){
//         const filter = {category: req.query.categories.split(',')}
//     }
//     const inputField = await inventorySchema.find('filter').populate('category', 'name')
// if (!inputField) {
//     res.status(500).json({
//         success: false,
//         message: "No field found "
//     })
// }

// res.status(200).json({data: inputField})
// })        


module.exports=router