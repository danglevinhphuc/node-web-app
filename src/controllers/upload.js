const express = require("express");
const router = express();

const multer = require("multer");
const { ROOT_FOLDER, MP3 } = require("../config/common");
const { removeFile } = require("../helpers/common");
const { uploadCloudDinary } = require("../helpers/func");
const { handleFileOtherMp3 } = require('../helpers/resizeMedia')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${ROOT_FOLDER}/`);
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.originalname);
    },
});

router.post("/upload", (req, res) => {
    const upload = multer({ storage }).single("file");
    upload(req, res, async function (err) {
        if (err) {
            return res.send(err);
        }
        console.log("file uploaded to server");

        let path = req.file.path;
        if (req.file.originalname.indexOf(MP3) === -1) {
            path = await handleFileOtherMp3(req.file)
            removeFile(req.file.path)
        }
        if (!path) { throw new Error('File wrong') }
        if (!req.file) { throw new Error('File empty') }

        return uploadCloudDinary(
            { path },
            (data) => {
                return res.json(data);
            },
            (err) => {
                return res.send(err);
            }
        );
    });
});

module.exports = router;
