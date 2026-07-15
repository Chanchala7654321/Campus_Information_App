const mongoose = require('mongoose');
const Campus = require('./models/Campus');
const School = require('./models/School');
const Student = require('./models/Student');

async function test() {
  await mongoose.connect('mongodb://localhost:27017/campus_info');
  console.log("Connected to DB");

  const results = await Campus.aggregate([
    {
      $lookup: {
        from: 'schools',
        localField: '_id',
        foreignField: 'campus_id',
        as: 'campusSchools'
      }
    },
    {
      $lookup: {
        from: 'students',
        localField: 'campusSchools._id',
        foreignField: 'school_id',
        as: 'campusStudents'
      }
    },
    {
      $project: {
        name: 1,
        schoolCount: { $size: '$campusSchools' },
        studentCount: { $size: '$campusStudents' }
      }
    }
  ]);

  console.log(JSON.stringify(results, null, 2));
  process.exit();
}

test();
