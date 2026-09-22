const { MongoClient } = require("mongodb");
 
/*MONGODB_URI=mongodb://USERNAME:PASSWORD@HOST:PORT/DATABASE*/
 
const uri =
    "mongodb://user_453w236z7:p453w236z7@db01.dbhost.dev:5050/db_453w236z7";
 
const client = new MongoClient(uri);
 
async function main() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
 
        const db = client.db("db_453w236z7");
 
        const students = db.collection("students");
 
        const student = {
            name: "Aruna",
            rollNo: 5,
            department: "IT",
            age: 19
        };
 
        const result = await students.insertOne(student);
 
        console.log("Student inserted successfully");
        console.log("Inserted ID:", result.insertedId);
 
    } catch (error) {
        console.log("Error:", error);
 
    } finally {
        await client.close();
    }
}
 
main();