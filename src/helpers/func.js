const cloudinary = require("../config/cloudinary");
const { FOLDER, LIMIT_SIZE, } = require("../config/common");
const { removeFile } = require("./common");

const uploadCloudDinary = (
  { path },
  callbackSuccess = () => { },
  callbackFailed = () => { }
) => {
  const uniqueFilename = new Date() / 1;

  cloudinary.uploader.upload(
    path,
    { public_id: `${FOLDER}/${uniqueFilename}`, tags: `${FOLDER}`, resource_type: "video", chunk_size: LIMIT_SIZE, discard_original_filename: true }, // directory and tags are optional
    function (err, image) {
      if (err) return callbackFailed(err);
      console.log("file uploaded to Cloudinary");
      // remove file from server
      removeFile(path)
      // return image details
      callbackSuccess(image);
    }
  );
};

module.exports = {
  uploadCloudDinary,
};
