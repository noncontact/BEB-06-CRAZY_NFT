const path = require("path");
const fs = require("fs");
const os = require("os");

const sourcePath = path.join(__dirname, "..", "..", "/.env"); // 프로젝트 환경에 맞게 경로를 설정

const readEnvVars = () => fs.readFileSync(sourcePath, "utf-8").split(os.EOL);

exports.getEnvValue = (key) => {
  // find the line that contains the key (exact match)
  const matchedLine = readEnvVars().find((line) => line.split("=")[0] === key);
  console.log(matchedLine);
  // split the line (delimiter is '=') and return the item at index 2
  return matchedLine !== undefined ? matchedLine.split("=")[1] : null;
};

exports.setEnvValue = (key, value) => {
  // read file from hdd & split if from a linebreak to a array
  const ENV_VARS = fs.readFileSync(sourcePath, "utf8").split(os.EOL);

  // find the env we want based on the key
  const target = ENV_VARS.indexOf(
    ENV_VARS.find((line) => {
      return line.match(new RegExp(key));
    })
  );

  // replace the key/value with the new value
  ENV_VARS.splice(target, 1, `${key}=${value}`);

  // write everything back to the file system
  fs.writeFileSync("./.env", ENV_VARS.join(os.EOL));
};

// 사용예 : getEnvValue ('DB_NAME'); -> DB_NAME 이라는 키값으로 define 된 값을 return;
// 사용예 : setEnvValue ('DB_NAME', 'test_db'); -> DB_NAME 이라는 키값에 test_db 라는 값으로 write;
