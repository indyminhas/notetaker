const util = require("util");
const fs = require("fs");
const path = require("path");
const jsond = (path.resolve(__dirname, "./db.json"));
const readfileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class dbFunction{
    async readNotes(){
        try {
        const notes = await readfileAsync(jsond, "utf8")
        return notes ? JSON.parse(notes) : [];

        } catch (err){
        console.log("Can't read file", err)
        }
    }

    async writeNotes(noteArr){
        try{
        await writeFileAsync(jsond, JSON.stringify(noteArr), "utf8")
        } catch(e) {
        console.log("error: ", e)
        }
    }
 }

 //one class instance needed
 module.exports = new dbFunction();