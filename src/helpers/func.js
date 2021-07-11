const cloudinary = require("../config/cloudinary");
const { FOLDER, LIMIT_SIZE, } = require("../config/common");

const uploadCloudDinary = (
  { path },
  callbackSuccess = () => { },
  callbackFailed = () => { }
) => {
  const uniqueFilename = new Date().toISOString();

  cloudinary.uploader.upload(
    path,
    { public_id: `${FOLDER}/${uniqueFilename}`, tags: `${FOLDER}`, resource_type: "video", chunk_size: LIMIT_SIZE, }, // directory and tags are optional
    function (err, image) {
      if (err) return callbackFailed(err);
      console.log("file uploaded to Cloudinary");
      // remove file from server
      const fs = require("fs");
      fs.unlinkSync(path);
      // return image details
      callbackSuccess(image);
    }
  );
};

module.exports = {
  uploadCloudDinary,
};
