const express = require('express');
const router = express.Router();
const validateCourse = require('../validations/courses');

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
];

router.get('/', (req, res) => {
    res.send(courses);
});

router.get('/:id', (req, res) => {
    let course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The given ID was not found.');
    res.send(course);
});

router.post('/', (req, res) => {
   const { error } = validateCourse(req.body);
   if(error) return res.status(400).send(error.details[0].message);
   
   const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(courses);
});

router.put('/:id', (req, res) => {
   let course = courses.find(c => c.id === parseInt(req.params.id));
   if(!course) return res.status(404).send('Course ID was not found.')
   
   const { error } = validateCourse(req.body);
   if(error) return res.status(400).send(error.details[0].message);
    
   course.name = req.body.name;
   res.send(courses);
});

router.delete('/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course ID was not found.')
     
    const index  = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(courses);
 });


module.exports = router;