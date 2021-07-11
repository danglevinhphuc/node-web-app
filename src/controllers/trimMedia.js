const express = require("express");
const router = express();

const { ROOT_FOLDER, MP3 } = require("../config/common");
const { trimMp3 } = require('../helpers/resizeMedia')
const { uploadCloudDinary } = require("../helpers/func");

const renderOutput = () => {
    const uniqueFilename = new Date().toISOString();
    return `${ROOT_FOLDER}/${uniqueFilename}.${MP3}`
}

router.post("/trim-mp3", async (req, res) => {
    const body = req.body
    const { start, end, url } = body
    if (!url) throw new Error('Url empty')
    const path = renderOutput()
    const objectData = {
        input: url,
        start,
        end,
        output: path
    }
    console.log({ objectData })
    await trimMp3(objectData)
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

module.exports = router;
