const { ROOT_FOLDER, MP3 } = require("../config/common");
const fs = require("fs");
const renderOutput = (type = MP3) => {
    const uniqueFilename = new Date().toISOString();
    return `${ROOT_FOLDER}/${uniqueFilename}.${type}`
}

const removeFile = (path) => {
    if (!path) return
    fs.unlinkSync(path);
}

module.exports = {
    renderOutput,
    removeFile
};
