const { s3Bucket, awsAccessKey, awsSecretAccessKey, s3Permission } = require('./awsS3config');
const fs = require('fs');
const AWS = require('aws-sdk');

var s3 = new AWS.S3({
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecretAccessKey
});

const remove_local_file = (file) => {
    fs.unlink(file.path, function (err) {
        if (err) {
            console.log(err);
        }
    });
}


function uploadToS3(file, album, companyId) {
    let promise = new Promise((resolved, rejected) => {
        var s3File = {
            Bucket: s3Bucket + '/' + album + '/' + companyId,
            Key: file.originalname,
            ContentType: file.mimetype,
            Body: fs.createReadStream(file.path),
            ACL: s3Permission
        };

        s3.upload(s3File, function (error, response) {
            if (error) {
                console.log("s3 error", error);
                remove_local_file(file);
                rejected(error);
            } else {
                s3Url = response.Location;
                remove_local_file(file);
                resolved(s3Url);
            }
        });
    });
    return promise;
};

module.exports = uploadToS3;
