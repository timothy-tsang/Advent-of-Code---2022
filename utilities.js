const fsPromise = require("fs/promises");

async function readTextInput(path) {
    try {
        return await fsPromise.readFile(path, { encoding: "utf8" });
    }
    catch (err) {
        console.error(err);
    }
}

module.exports = {
    readTextInput
};