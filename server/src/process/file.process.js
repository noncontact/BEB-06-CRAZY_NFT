const fs = require("fs");
const cmd = require("node-cmd");
const path = require("path");
const { NFTStorage, File } = require("nft.storage");
import { filesFromPath } from "files-from-path";

const token = process.env.NFT_STORAGE_API_KEY;

exports.writeJson = async (file_path, metadata) => {
  try {
    fs.writeFileSync(file_path, JSON.stringify(metadata, null, 2));

    return "success";
  } catch (err) {
    return err;
  }
};

exports.run = () => {
  try {
    cmd.run(
      // 실행할 노드 실행 파일
      `node ${basePath}/hashilip_engine/index.js`,
      function (error, success, stderr) {
        if (error) {
          console.log("ERROR 발생 :\n\n", error);
        } else {
          console.log("SUCCESS :\n\n", success);
        }
      }
    );
  } catch (err) {
    return err;
  }
};

exports.filesReplace = (pathDir) => {
  try {
    var files = fs.readdirSync(`${pathDir}/json`); // 디렉토리를 읽어온다
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      const file_name = path.basename(file, path.extname(file));
      // 확장자가 json일 경우 읽어 내용 출력
      if (path.extname(file) === ".json_") {
        console.log("data = ", file);
        const asis = `${pathDir}/json` + "/" + file;
        const tobe = `${pathDir}/json` + "/" + file_name + ".json";
        fs.rename(asis, tobe, function (err) {
          if (err) {
            console.log("rename error : " + asis + " => " + tobe);
          } else {
            console.log("renamed complete : " + asis + " => " + tobe);
          }
        });
      }
    }
    return "success";
  } catch (err) {
    return err;
  }
};

exports.makeFolder = async (dirPath) => {
  try {
    if (!fs.existsSync(dirPath)) {
      //await fs.mkdirSync(dir);
      //await fs.mkdir(path.dirname(dir), { recursive: true });
      const isExists = fs.existsSync(dirPath);
      if (!isExists) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
    }
    return "success";
  } catch (err) {
    return err;
  }
};

exports.filesMove = async (srcDir, trgDir) => {
  try {
    var files = await fs.readdirSync(`${srcDir}`); // 디렉토리를 읽어온다
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      const oldPath = `${srcDir}` + "/" + file;
      const newPath = `${trgDir}` + "/" + file;
      //await fs.mkdir(path.dirname(newPath), { recursive: true });
      //await this.makeFolder(newPath);
      // console.log(oldPath);
      // console.log(newPath);
      await fs.rename(oldPath, newPath, function (err) {
        if (err) {
          console.log("rename error : " + oldPath + " => " + newPath);
        } else {
          console.log("renamed complete : " + oldPath + " => " + newPath);
        }
      });
    }
    return "success";
  } catch (err) {
    return err;
  }
};

exports.getLayersOrder = async (layerDir) => {
  try {
    let layerArry = [];
    fs.readdirSync(layerDir, { withFileTypes: true }).forEach((p) => {
      const dir = p.name;
      if (p.isDirectory()) {
        console.log(dir);
        let layerObj = new Object();
        layerObj.name = dir;
        layerArry.push(layerObj);
      }
    });
    console.log(layerArry);
    return layerArry;
  } catch (err) {
    return err;
  }
};

exports.ipfs_dir_upload = async (dir_path) => {
  // you'll probably want more sophisticated argument parsing in a real app
  try {
    const directoryPath = dir_path;
    console.log(directoryPath);
    const files = filesFromPath(directoryPath, {
      pathPrefix: path.resolve(directoryPath), // see the note about pathPrefix below
      hidden: true, // use the default of false if you want to ignore files that start with '.'
    });

    const storage = new NFTStorage({ token });

    console.log(`storing file(s) from ${path}`);
    const cid = await storage.storeDirectory(files);
    console.log({ cid });

    const status = await storage.status(cid);
    console.log(status);
    return cid;
  } catch (err) {
    return err;
  }
};
