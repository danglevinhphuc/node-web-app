
const childProcess = require('child_process')
const exc = (joinCmd) => {
    return new Promise((resolve, rejects) => {
        childProcess.exec(joinCmd, function (err) {
            console.log(err);
            if (err) {
                return rejects(err);
            }
            return resolve();
        });
    });
}


const trimMp3 = async ({ input, start, end, output }) => {
    //ffmpeg -ss 30 -t 70 -i file_example_MP3_5MG.mp3 -acodec copy output.mp3
    let cmd = ["ffmpeg", "-ss", start, '-t', end, '-i'];
    cmd.push(input);
    cmd.push('-acodec copy')
    cmd.push(output);
    const joinCmd = cmd.join(" ");
    console.log(joinCmd);
    return exc(joinCmd)
};

module.exports = {
    trimMp3,
};