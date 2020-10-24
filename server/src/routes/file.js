const path = require('path');
const fs = require('fs');
const { isLoggedIn } = require("../middleware/auth");
const Files = require('../model/File');
 
const getFiles = (req) => {
  if(req.role === "admin") return  Files.find();
  else return Files.find({email: req.email});
};

const file = (app) => {
  app.post("/api/upload", isLoggedIn, (req, res) => {
    if (req.files == undefined) {
        return res.json({success: false, message: 'You must select a file.'});
    } else {
      let doc = {
        email: req.email,
        file: req.files.file.data,
        fileName: req.files.file.name
      };
      let files = new Files(doc);
      files.save(doc)
      .then(resp => {
        return res.send({success: true, message: 'File has been uploaded.'});
      })
      .catch(err => {
        return res.send({success: false, message: 'File upload failed.'});
      });
    }
  });

  app.get("/api/files", isLoggedIn, (req, res) => {
    getFiles(req)     
    .then(docs => {
      let modifyDoc = docs.map(doc => {
        let obj = {};
        obj['fileName'] = doc['fileName'];
        obj['email'] = doc['email'];
        return obj;
      });
      res.send({
        success: true,
        files: modifyDoc
      });
    })
    .catch(err => {
      res.send({success: false, message: "Failed to fetch files"});
    });
  });

  app.get("/api/download/:fileName",  (req, res) => {
    let fileName = req.params.fileName;
    Files.findOne({fileName})
    .then(doc => {
      const filePath = path.join(__dirname, '../', '../', fileName);
      const createStream = fs.createWriteStream(fileName);
      createStream.write(doc.file);
      createStream.end();
      createStream.on('finish', () => {
        res.download(filePath, fileName, () => {
          fs.unlinkSync(filePath);
        });
      });
    })
    .catch(err => {
      return res.send({success: false, message: 'File download failed'});
    });
  })
};

module.exports = file;
