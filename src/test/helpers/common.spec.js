const { renderOutput, removeFile } = require('../../helpers/common')
const fs = require('fs')
test('renderOutput return string name with type mp3', () => {
    expect(typeof renderOutput('mp3')).toBe('string');
});

test('removeFile remove file', () => {
    const path = './my_file.txt'
    fs.createWriteStream(path);

    expect(removeFile()).toBe(false);
    expect(removeFile(path)).toBe(true);
});