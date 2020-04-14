const { exec } = require("@actions/exec");
const hostedGitInfo = require("hosted-git-info");

/**
 * @typedef {{ name: string, url: string, type: string }} UrlInfo
 */

/**
 * @type {Map<string, UrlInfo>}
 */
const cache = new Map();

/**
 * @param {string} packageName
 * @returns {Promise<UrlInfo | null>}
 */
async function fetchUrl(packageName) {
  const cached = cache.get(packageName);
  if (cached) {
    return cached;
  }

  let stdout = "";
  await exec("npm", ["view", packageName, "repository.url"], {
    listeners: {
      stdout: (data) => {
        stdout += data.toString();
      },
    },
    silent: true,
  });
  stdout = stdout.trim();

  if (!stdout) {
    console.log(`No repository URL for '${packageName}'`);
    return null;
  }

  const url = hostedGitInfo.fromUrl(stdout);
  if (!url) {
    console.log(`No repository URL for '${packageName}'`);
    return null;
  }
  const urlInfo = { name: packageName, url: url.browse(), type: url.type };

  cache.set(packageName, urlInfo);

  return urlInfo;
}

/**
 * @param {string[]} packageNames
 * @returns {Promise<Map<string, UrlInfo>>}
 */
module.exports = async function packageRepoUrls(packageNames) {
  const allUrls = await Promise.all(packageNames.map(fetchUrl));

  /**
   * @type {Map<string, UrlInfo>}
   */
  const map = new Map();
  for (const url of allUrls) {
    if (url) {
      map.set(url.name, url);
    }
  }
  return map;
};
