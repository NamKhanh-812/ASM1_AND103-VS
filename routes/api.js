const express = require('express');
const router = express.Router();


// khai bao model 
const StudentModel = require('../model/students');

router.get('/', (req, res) => {
    res.send('vào api mobile');
})

// get danh sach student và tìm theo mã sv 
router.get('/students', async (req, res) => {

    const { masv } = req.query;
    if (!masv) {
        const students = await StudentModel.find();
        console.log(students);
        res.send(students);
    } else {
        try {
            const student = await StudentModel.findOne({ masv: masv });
            if (!student) {
                return res.status(404).send("Không tìm thấy sinh viên");
            }
            console.log(student);
            res.send(student);
        } catch (error) {
            console.error(error);
            res.status(500).send("Lỗi server");
        }
    }
})

// add student 
router.post('/students/add', async (req, res) => {
    try {
        const data = req.body;
        const student = new StudentModel({
            masv: data.masv,
            name: data.name,
            point: data.point,
            avatar: data.avatar
        });

        const result = await student.save();

        if (result) {
            res.json({
                "status": "200",
                "messenger": "Add student success",
                "data": result
            })
        } else {
            res.json({
                "status": "400",
                "messenger": "Add student fail",
                "data": []
            })
        }
    } catch (err) {
        console.log(err)
    }
});


// delete student
router.delete('/students/delete/:id', async (req, res) => {
    const { id } = req.params;
    const result = await StudentModel.deleteOne({ _id: id });
    if (result) {
        res.json({
            "status": "200",
            "messenger": "Delete student success",
            "data": result
        })
    } else {
        res.json({
            "status": "400",
            "messenger": "Delete fail",
            "data": []
        })
    }
});

// update student
router.put('/students/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        let UpdateStudent = await StudentModel.findById(id);
        let result = null;
        if (UpdateStudent) {
            UpdateStudent.name = data.name ?? UpdateStudent.name;
            UpdateStudent.masv = data.masv ?? UpdateStudent.masv;
            UpdateStudent.point = data.point ?? UpdateStudent.point;
            UpdateStudent.avatar = data.avatar ?? UpdateStudent.avatar;
            result = await UpdateStudent.save();
        }

        if (result) {
            res.json({
                "status": "200",
                "messenger": "Update student success",
                "data": result
            })
        } else {
            res.json({
                "status": "400",
                "messenger": "Update fail",
                "data": []
            })
        }

    } catch (error) {
        console.log(error);
    }
})

module.exports = router;