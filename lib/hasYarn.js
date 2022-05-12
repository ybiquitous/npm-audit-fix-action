import fs from "fs";
import path from "path";

const hasYarn = (cwd = process.cwd()) => fs.existsSync(path.resolve(cwd, "yarn.lock"));

export default hasYarn;
