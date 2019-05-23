const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const fs = require("fs");
const UUID = require("uuid/v4");

const googleCloudStorageConfig = {
  projectId: "trendylocale-1558366343100",
  keyFilename: "trendyLocale.json"
};

const googleCloudStorage = require("@google-cloud/storage")(
  googleCloudStorageConfig
);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

admin.initializeApp({
  credential: admin.credential.cert(require("./trendyLocale.json"))
});

//When changes are made to the function you must run firebase deploy in terminal again.
exports.imageStorage = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    if (
      !request.headers.authorization ||
      !request.headers.authorization.startsWith("Bearer ")
    ) {
      console.log("No Token Present");
      response.status(402).json({ error: "Unauthorized" });
      return;
    }
    let idToken;
    idToken = request.headers.authorization.split("Bearer ")[1];
    admin
      .auth()
      .verifyIdToken(idToken)
      // eslint-disable-next-line promise/always-return
      .then(decodedToken => {
        const body = JSON.parse(request.body);
        fs.writeFileSync(
          "/tmp/uploaded-image.jpg",
          body.image,
          "base64",
          err => {
            console.log(err);
            return response.status(500).json({ error: err });
          }
        );
        const bucket = googleCloudStorage.bucket(
          "trendylocale-1558366343100.appspot.com"
        );
        const uuid = UUID();
        bucket.upload(
          "/tmp/uploaded-image.jpg",
          {
            uploadType: "media",
            destination: "/locations/" + uuid + ".jpg",
            resumable: false,
            metadata: {
              metadata: {
                contentType: "media/jpeg",
                firebaseStorageDownloadTokens: uuid
              }
            }
          },
          (err, file) => {
            if (!err) {
              response.status(201).json({
                imageUrl:
                  "https//firebasestorage.googleapis.com/v0/b/" +
                  bucket.name +
                  "/o/" +
                  encodeURIComponent(file.name) +
                  "?alt=media&token=" +
                  uuid
              });
            } else {
              console.log(err);
              return response.status(500).json({ error: err });
            }
          }
        );
      })
      .catch(err => {
        console.log(err);
        response.status(403).json({ error: "Unauthorized" });
      });
  });
});
