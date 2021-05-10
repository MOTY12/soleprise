const express = require('express')
const shopSchema = require('../model/shop')
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
  

//insert new shop 
router.post('/shop', uploadOptions.single('storeimage'), async (req, res) => {
    const file = req.file 
    if(!file) return res.status(400).send('No image is uploaded, upload a image ')       
    const fileName = req.file.filename
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`

//inpput to the shop data

        const shop = new shopSchema({
            storeimage: `${basePath}${fileName}`,
            storename: req.body.storename,
            storeOwner: req.body.storeOwner,
            storenumber: req.body.storenumber,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            location: req.body.location,
            category: req.body.category
       
        })
       const shops= await shop.save()
        if(!shops)
        return res.status(404).send({message: 'shop cannot be created'})
        res.send({data: shops})
        
    })


//update shop
router.put('/shop/:id', uploadOptions.single('storeimage'), async(req, res) => {
 
    const file = req.file 
    if(!file) return res.status(400).send('No image is uploaded, upload a image ')       
    const fileName = req.file.filename
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`
    const updateshop= await shopSchema.findByIdAndUpdate(
        req.params.id,
        {
            storeimage: `${basePath}${fileName}`,
            storename: req.body.storename,
            storeOwner: req.body.storeOwner,
            storenumber: req.body.storenumber,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            location: req.body.location,
            category: req.body.category
        },
        {
            new:true
        }
    )
    if(!updateshop){
        res.status(500).json({
            success: false,
            message: "the shop cannot be found"
        })
    }else{
        res.send(updateshop)
    }
   
})




// get new shop
router.get('/shop', async (req, res)=>{
    const shoplist = await shopSchema.find()
    //.populate('category', 'name')
if (!shoplist) {
    res.status(500).json({
        message: "No shop found "
    })
}

res.status(200).json({data: shoplist})
})        

router.get('/shop/:id', async(req,res)=>{
    const shopid = await shopSchema.findById(req.params.id).populate('category', 'name')
    if(!shopid){
    res.status(500).json({
        success: false,
        message: "No data for the shop requested"
    })
}
    res.status(200).json({data: shopid})
})





//delete shop
router.delete('/shop/:id', async(req, res) => {
    const shop = await shopSchema.findByIdAndRemove(req.params.id)
    .then(shop => {if(shop){
       return res.status(200).json({
           success: true,
           message: "Successfully deleted"
       })
    }else{
        return res.status(200).json({
            success: false,
            message: "the shop cannot be found"
        })
    }
    }).catch(err=>{
          return res.status(400).json({
            success: false,
            error: err})
    }) })


//search for shop
router.get('/shop/search', async(req, res)=>{
    const searchfield=req.query.storename
    shopSchema.find({storename:{$regex: searchfield, options:'$i'}})
    .then(data=>{
        res.send(data)
    })
})

    

module.exports=router