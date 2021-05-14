const express = require('express')
const Student = require('../model/student')
const router = express()
router.get('/student', async (req, res)=>{
    const studentlist = await Student.find()
    if (!studentlist) {
        res.status(500).json({
            success: false,
            message: "No student in the class"
        })
    }
    res.status(200).json(studentlist)
    })

//get student by id
router.get('/student/:id', async (req, res)=>{
    const studentid = await Student.findById(req.params.id)
    if(!studentid){
    res.status(500).json({
        success: false,
        message: "the student cannot be found"
    })
}
    res.status(200).json(studentid)
})

//insert new catergory
router.post('/student', async (req, res) => {
    const student = new Student({
        fullname: req.body.fullname,
        class: req.body.class,
        photo: req.body.photo,
        studentid: req.body.studentid,
        dob: req.body.dob,
        address: req.body.address
    })
    const students= await student.save()

    if(!students)
    return res.status(404).send('student cannot be created')

    res.send(students)
    
})

//update student
router.put('/student/:id', async(req, res) => {
    const updatestudent= await Student.findByIdAndUpdate(
        req.params.id,
        {
        fullname: req.body.fullname,
        class: req.body.class,
        photo: req.body.photo,
        studentid: req.body.studentid,
        dob: req.body.dob,
        address: req.body.address
        },
        {
            new:true
        }
    )
    if(!updatestudent){
        res.status(500).json({
            success: false,
            message: "the student cannot be found"
        })
    }else{
        res.send(updatestudent)
    }
   
})


//delete student
router.delete('/student/:id', async(req, res) => {
    const student = await Student.findByIdAndRemove(req.params.id)
    .then(student => {if(student){
       return res.status(200).json({
           success: true,
           message: "the student is deleted"
       })
    }else{
        return res.status(200).json({
            success: false,
            message: "the student cannot be found"
        })
    }
    }).catch(err=>{
          return res.status(400).json({
            success: false,
            error: err})
    }) })
    

module.exports = router;