require("dotenv").config();

const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({

  employeeId: { type: String, required: true, unique: true },

  name: { type: String, required: true },

  department: { type: String, required: true },

  designation: { type: String, required: true },

  salary: { type: Number, required: true },

  experience: { type: Number, required: true },

  skills: { type: [String] },

  status: { type: String, required: true }

});

const Employee = mongoose.model("Employee", employeeSchema);

async function main() {

  try {

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    const employees = await Employee.insertMany([

      {
        employeeId: "E101",
        name: "Rahul",
        department: "IT",
        designation: "Developer",
        salary: 50000,
        experience: 3,
        skills: ["JavaScript", "Node.js"],
        status: "Active"
      },

      {
        employeeId: "E102",
        name: "Priya",
        department: "HR",
        designation: "HR Executive",
        salary: 45000,
        experience: 4,
        skills: ["Communication", "Recruitment"],
        status: "Active"
      },

      {
        employeeId: "E103",
        name: "Arun",
        department: "IT",
        designation: "Senior Developer",
        salary: 70000,
        experience: 6,
        skills: ["Java", "MongoDB"],
        status: "Active"
      },

      {
        employeeId: "E104",
        name: "Divya",
        department: "Finance",
        designation: "Accountant",
        salary: 55000,
        experience: 5,
        skills: ["Excel", "Accounting"],
        status: "Active"
      }

    ]);

    console.log("\nInserted Employees:");
    console.log(employees);

    const deptEmployees = await Employee.find({
      department: "IT",
      experience: { $gt: 3 }
    });

    console.log("\nIT Employees with experience greater than 3:");
    console.log(deptEmployees);

    const oneEmployee = await Employee.findOne({
      employeeId: "E101"
    });

    console.log("\nEmployee with ID E101:");
    console.log(oneEmployee);

    const selectedEmployees = await Employee.find(
      {},
      {
        name: 1,
        designation: 1,
        salary: 1,
        department: 1
      }
    );

    console.log("\nName, Designation, Salary and Department:");
    console.log(selectedEmployees);

    const updatedEmployee = await Employee.findOneAndUpdate(

      { employeeId: "E101" },

      {
        designation: "Senior Developer",
        salary: 60000
      },

      { new: true }

    );

    console.log("\nUpdated Employee:");
    console.log(updatedEmployee);

    const increasedSalary = await Employee.updateMany(

      { department: "IT" },

      { $mul: { salary: 1.10 } }

    );

    console.log("\nIT Employees salary increased by 10%:");
    console.log(increasedSalary);

    const salaryRange = await Employee.find({

      salary: {
        $gte: 50000,
        $lte: 80000
      }

    });

    console.log("\nEmployees with salary between 50000 and 80000:");
    console.log(salaryRange);

    const deletedEmployee = await Employee.findOneAndDelete({

      employeeId: "E104"

    });

    console.log("\nDeleted Employee:");
    console.log(deletedEmployee);

    const remainingEmployees = await Employee.find()
      .sort({ salary: -1 });

    console.log("\nRemaining Employees sorted by salary:");
    console.log(remainingEmployees);

  } catch (error) {

    console.log("Error:");
    console.log(error);

  } finally {

    await mongoose.connection.close();

    console.log("\nMongoDB connection closed");

  }

}

main();