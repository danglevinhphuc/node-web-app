const express = require("express");
const router = express();

const { trimMp3 } = require('../helpers/resizeMedia')
const { uploadCloudDinary } = require("../helpers/func");
const { renderOutput } = require("../helpers/common");
const ROOT_VIDEO_UPLOAD = 'video/upload'

const getUrlDownload = (data) => {
    if (!data) return ''
    return data.url.replace(ROOT_VIDEO_UPLOAD, `${ROOT_VIDEO_UPLOAD}/fl_attachment`)
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
            const newUrl = getUrlDownload(data)
            console.log(newUrl)
            return res.json(newUrl);
        },
        (err) => {
            return res.send(err);
        }
    );
});

module.exports = router;
