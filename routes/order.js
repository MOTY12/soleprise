const express = require('express')
const Order = require('../model/order')
const OrderItem = require('../model/orderitems')
//const { route } = require('./user')
const router = express()

//get all other and soret by date order
router.get('/order', async (req, res)=>{
    const orderlist = await Order.find().populate({path: 'orderItems', populate: 'product'}).sort({'dateOrdered': -1})
    res.json(orderlist)
    if (!orderlist) {
        res.status(500).json({
            success: false
        })
    }
    })

//get all other and soret by date order
router.get('/order/:id', async (req, res)=>{
    const orderlist = await Order.findById(req.params.id).populate({path: 'orderItems', populate: 'product'})
    if (!orderlist) {
        res.status(500).json({
            success: false,
            message: "there is no order on the id "
        })
    }
    res.status(200).send(orderlist)
    })

router.post('/order', async (req, res) => {
    const orderItemIds = Promise.all(req.body.orderItems.map(async(orderItem) => {
        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product
        })
        
       newOrderItem = await newOrderItem.save()
        return newOrderItem._id

    }))

     orderItemIdsResolved = await orderItemIds


  const totalPrices = await Promise.all(orderItemIdsResolved.map(async (orderItemId) => {
        const orderItem = await OrderItem.findById().populate('product', 'price')
        const totalPrice = orderItem.product.price * orderItem.quantity
        return totalPrice
    }))

    const order = new Order({
        orderItems: orderItemIdsResolved,
        totalPrice: quantity
    })

const OrdeR = await order.save()
res.send(OrdeR)

   if(!Order){
       res.status(400).send('no order is created pls try again')
   }  
   
})

//update a order ststues
// //update category
// router.put('/order/:id', async(req, res) => {
//     const updateorder= await Order.findByIdAndUpdate(
//         req.params.id,
//         {
//             status: req.body.status,
//         },
//         {
//             new:true
//         }
//     )
//     if(!updateorder){
//         res.status(500).json({
//             success: false,
//             message: "The order is not updated"
//         })
//     }
//         res.send(updateorder)
    
   
// })


//delete category
router.delete('/order/:id', async(req, res) => {
    Order.findByIdAndRemove(req.params.id).then(async order => {
            if(order){
                await order.orderItems.map(async orderItem =>{
                await OrderItem.findByIdAndRemove(orderItem)
            })
            return res.Status(200).json({success: true, message: 'the order is deleted '})
        }else{
            return res.Status(404).json({success: false, message: 'the order is not deleted'})
        }
        }).catch(err=>{
            return res.status(400).json({
              success: false,
              error: err})
      }) })
    

module.exports = router;