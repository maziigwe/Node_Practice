const express = require("express");
const router = express.Router();

const courses = [
  { id: 1, courseTitle: "Course 1" },
  { id: 2, courseTitle: "Course 2" },
  { id: 3, courseTitle: "Course 3" },
];
router.get("/", (req, res) => {
  res.send(courses);
});
router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course not found!");
  res.send(course);
});

router.get("/:id/:title", (req, res) => {
  // res.send(req.params);
  return res.send(req.query);
});

router.post("/", (req, res) => {
  // Input validation
  const { error } = validateCourse(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    courseTitle: req.body.name,
  };
  courses.push(course);
  return res.status(201).send(course);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  //Check if course with the 'id' exists
  const course = courses.find((c) => c.id === parseInt(id));
  if (!course) return res.status(404).send("Course not found!");

  // Input validation
  const { error } = validateCourse(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  // Update resource
  course.courseTitle = name;
  return res.send(course);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  //Check if course with the 'id' exists
  const course = courses.find((c) => c.id === parseInt(id));
  if (!course) return res.status(404).send("Course not found!");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  return res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(course, schema);
}

module.exports = router;
