const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();

// ✅ Tambah User
exports.createUser = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const {email, password} = req.body;
    try {
      const user = await admin.auth().createUser({email, password});
      res.status(200).send({uid: user.uid, email: user.email});
    } catch (error) {
      res.status(400).send({error: error.message});
    }
  });
});

// ✅ Blokir/Unblokir
exports.toggleBlockUser = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const {uid, disabled} = req.body;
    try {
      await admin.auth().updateUser(uid, {disabled});
      res.status(200).send({success: true});
    } catch (error) {
      res.status(400).send({error: error.message});
    }
  });
});

// ✅ Hapus User
exports.deleteUser = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const {uid} = req.body;
    try {
      await admin.auth().deleteUser(uid);
      res.status(200).send({success: true});
    } catch (error) {
      res.status(400).send({error: error.message});
    }
  });
});
