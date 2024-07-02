"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// lib/index.js
var import_node_process3 = __toESM(require("node:process"), 1);
var core2 = __toESM(require("@actions/core"), 1);
var import_exec7 = require("@actions/exec");

// lib/packageRepoUrls.js
var import_core = require("@actions/core");
var import_exec = require("@actions/exec");
var import_hosted_git_info = __toESM(require("hosted-git-info"), 1);
var cache = /* @__PURE__ */ new Map();
async function fetchUrl(packageName) {
  const cached = cache.get(packageName);
  if (cached) {
    return cached;
  }
  const {
    exitCode,
    stdout: origStdout,
    stderr
  } = await (0, import_exec.getExecOutput)("npm", ["view", packageName, "repository.url"], {
    silent: true,
    ignoreReturnCode: true
  });
  if (exitCode !== 0 && !stderr.includes("code E404")) {
    throw new Error(`stderr: ${stderr}`);
  }
  const stdout = origStdout.trim();
  if (stdout === "") {
    (0, import_core.info)(`No repository URL for '${packageName}'`);
    return null;
  }
  const url = import_hosted_git_info.default.fromUrl(stdout);
  if (!url) {
    (0, import_core.info)(`No repository URL for '${packageName}'`);
    return null;
  }
  const urlInfo = { name: packageName, url: url.browse(), type: url.type };
  cache.set(packageName, urlInfo);
  return urlInfo;
}
async function packageRepoUrls(packageNames) {
  const allUrls = await Promise.all(packageNames.map(fetchUrl));
  const map = {};
  for (const url of allUrls) {
    if (url) {
      map[url.name] = url;
    }
  }
  return map;
}

// lib/utils/capitalize.js
function capitalize(str) {
  if (typeof str === "string") {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return "";
}

// lib/utils/semverToNumber.js
function semverToNumber(version) {
  return version.split(".").slice(0, 3).reverse().map((str) => parseInt(str, 10)).reduce((sum, num, idx) => {
    const added = num * 10 ** (idx * 2) || 0;
    return sum + added;
  }, 0);
}

// lib/utils/splitPackageName.js
function splitPackageName(packageName) {
  const [location, name] = packageName.split(":", 2);
  if (name && location) {
    return { name, fullName: packageName, location: name === location ? null : location };
  }
  throw new TypeError(`invalid package: "${packageName}"`);
}

// lib/aggregateReport.js
function byNameAndVersion(a, b) {
  const res = a.name.localeCompare(b.name);
  if (res > 0) {
    return 1;
  }
  if (res < 0) {
    return -1;
  }
  return semverToNumber(a.version) - semverToNumber(b.version);
}
function getAuditInfo(audit2, name) {
  const info4 = audit2.get(name);
  const severity = info4 == null ? null : capitalize(info4.severity);
  const title = info4 == null ? null : info4.title;
  const url = info4 == null ? null : info4.url;
  return { severity, title, url };
}
async function aggregateReport(audit2, beforePackages, afterPackages) {
  const added = [];
  afterPackages.forEach((version, pkgName) => {
    if (!beforePackages.has(pkgName)) {
      const { name, location } = splitPackageName(pkgName);
      added.push({ name, location, version });
    }
  });
  added.sort(byNameAndVersion);
  const removed = [];
  beforePackages.forEach((version, pkgName) => {
    if (!afterPackages.has(pkgName)) {
      const { name, location } = splitPackageName(pkgName);
      removed.push({ name, location, version, ...getAuditInfo(audit2, name) });
    }
  });
  removed.sort(byNameAndVersion);
  const updated = [];
  afterPackages.forEach((version, pkgName) => {
    const previousVersion = beforePackages.get(pkgName);
    if (version !== previousVersion && previousVersion != null) {
      const { name, location } = splitPackageName(pkgName);
      updated.push({
        name,
        location,
        version,
        previousVersion,
        ...getAuditInfo(audit2, name)
      });
    }
  });
  updated.sort(byNameAndVersion);
  const allPackageNames = Array.from(
    /* @__PURE__ */ new Set([
      ...added.map((e) => e.name),
      ...updated.map((e) => e.name),
      ...removed.map((e) => e.name)
    ])
  );
  const packageCount = allPackageNames.length;
  const packageUrls = await packageRepoUrls(allPackageNames);
  return { added, removed, updated, packageCount, packageUrls };
}

// lib/audit.js
var import_exec2 = require("@actions/exec");

// lib/npmArgs.js
var import_core2 = require("@actions/core");
function npmArgs(...args) {
  const defaultArgs = ((0, import_core2.getInput)("npm_args") ?? "").split(/\s+/u).filter(Boolean);
  return [...args, ...defaultArgs, "--ignore-scripts", "--no-progress"];
}

// lib/audit.js
async function audit(execFn = import_exec2.getExecOutput) {
  const { stdout } = await execFn("npm", npmArgs("audit", "--json"), {
    ignoreReturnCode: true
  });
  const { vulnerabilities } = JSON.parse(stdout);
  if (vulnerabilities != null && typeof vulnerabilities === "object") {
    const map = /* @__PURE__ */ new Map();
    for (const { name, severity, via } of Object.values(vulnerabilities)) {
      if (Array.isArray(via)) {
        const [viaFirst] = via;
        const { title, url } = viaFirst;
        if (typeof title === "string" && typeof url === "string") {
          map.set(name, { name, severity, title, url });
        } else if (typeof viaFirst === "string") {
        } else {
          throw new Error(`"via" of "${name}" is invalid: ${JSON.stringify(via)}`);
        }
      } else {
        throw new Error('"via" is not an array');
      }
    }
    return map;
  }
  throw new Error('"vulnerabilities" is missing');
}

// lib/auditFix.js
var import_core3 = require("@actions/core");
var import_exec3 = require("@actions/exec");
async function auditFix() {
  const { exitCode, stderr } = await (0, import_exec3.getExecOutput)("npm", npmArgs("audit", "fix"), {
    ignoreReturnCode: true
  });
  if (stderr.includes("npm ERR!")) {
    throw new Error("Unexpected error occurred");
  }
  if (exitCode !== 0) {
    (0, import_core3.warning)(stderr);
  }
}

// lib/buildCommitBody.js
function buildCommitBody({ updated, added, removed }) {
  const lines = [];
  lines.push("Summary:");
  lines.push(`- Updated packages: ${updated.length}`);
  lines.push(`- Added packages: ${added.length}`);
  lines.push(`- Removed packages: ${removed.length}`);
  lines.push("");
  const vulnerabilities = /* @__PURE__ */ new Set();
  for (const entry of [...updated, ...added, ...removed]) {
    if ("severity" in entry && "title" in entry && "url" in entry) {
      const { name, severity, title, url } = entry;
      if (severity != null && title != null && url != null) {
        vulnerabilities.add(`- ${name}: "${title}" (${url})`);
      }
    }
  }
  if (vulnerabilities.size > 0) {
    lines.push("Fixed vulnerabilities:");
    lines.push(...Array.from(vulnerabilities));
  } else {
    lines.push("No fixed vulnerabilities.");
  }
  return lines.map((line) => `${line}
`).join("");
}

// lib/constants.js
var PACKAGE_NAME = "ybiquitous/npm-audit-fix-action";
var PACKAGE_URL = "https://github.com/ybiquitous/npm-audit-fix-action";
var NPM_VERSION = "10";

// lib/buildPullRequestBody.js
var EMPTY = "-";
var npmPackage = (name, version, location) => {
  let result = `[${name}](https://www.npmjs.com/package/${name}/v/${version})`;
  if (location != null) {
    result += ` (\`${location}\`)`;
  }
  return result;
};
var buildTableRow = (...items) => `| ${items.join(" | ")} |`;
var repoLink = (report, name) => {
  const url = report.packageUrls[name];
  return url ? `[${url.type}](${url.url})` : EMPTY;
};
var versionLabel = (version) => `\`${version}\``;
var detail = ({ severity, title, url }) => {
  if (severity != null && title != null && url != null) {
    return `**[${severity}]** ${title} ([ref](${url}))`;
  }
  return EMPTY;
};
function buildPullRequestBody(report, npmVersion) {
  const header = [];
  header.push("| Package | Version | Source | Detail |");
  header.push("|:--------|:-------:|:------:|:-------|");
  const lines = [];
  lines.push(
    `This pull request fixes the vulnerable packages via npm [${npmVersion}](https://github.com/npm/cli/releases/tag/v${npmVersion}).`
  );
  if (report.updated.length > 0) {
    lines.push("");
    lines.push("<details open>");
    lines.push(`<summary><strong>Updated (${report.updated.length})</strong></summary>`);
    lines.push("");
    lines.push(...header);
    report.updated.forEach(({ name, version, location, previousVersion, severity, title, url }) => {
      lines.push(
        buildTableRow(
          npmPackage(name, version, location),
          `${versionLabel(previousVersion)} \u2192 ${versionLabel(version)}`,
          repoLink(report, name),
          detail({ severity, title, url })
        )
      );
    });
    lines.push("");
    lines.push("</details>");
  }
  if (report.added.length > 0) {
    lines.push("");
    lines.push("<details open>");
    lines.push(`<summary><strong>Added (${report.added.length})</strong></summary>`);
    lines.push("");
    lines.push(...header);
    report.added.forEach(({ name, version, location }) => {
      lines.push(
        buildTableRow(
          npmPackage(name, version, location),
          versionLabel(version),
          repoLink(report, name),
          detail({})
        )
      );
    });
    lines.push("");
    lines.push("</details>");
  }
  if (report.removed.length > 0) {
    lines.push("");
    lines.push("<details open>");
    lines.push(`<summary><strong>Removed (${report.removed.length})</strong></summary>`);
    lines.push("");
    lines.push(...header);
    report.removed.forEach(({ name, version, location, severity, title, url }) => {
      lines.push(
        buildTableRow(
          npmPackage(name, version, location),
          versionLabel(version),
          repoLink(report, name),
          detail({ severity, title, url })
        )
      );
    });
    lines.push("");
    lines.push("</details>");
  }
  lines.push("");
  lines.push("***");
  lines.push("");
  lines.push(`Created by [${PACKAGE_NAME}](${PACKAGE_URL})`);
  return lines.join("\n").trim();
}

// lib/createOrUpdatePullRequest.js
var import_core4 = require("@actions/core");
var import_exec4 = require("@actions/exec");
var github = __toESM(require("@actions/github"), 1);

// lib/utils/splitRepo.js
function splitRepo(repository) {
  const [owner, repo] = repository.split("/", 2);
  if (owner && repo) {
    return { owner, repo };
  }
  throw new TypeError(`invalid repository: "${repository}"`);
}

// lib/createOrUpdatePullRequest.js
async function createOrUpdatePullRequest({
  token,
  branch,
  baseBranch,
  title,
  pullBody,
  commitBody,
  repository,
  author,
  email,
  labels
}) {
  const remote = `https://${author}:${token}@github.com/${repository}.git`;
  const { owner, repo } = splitRepo(repository);
  const octokit = github.getOctokit(token);
  const pulls = await octokit.rest.pulls.list({
    owner,
    repo,
    state: "open",
    base: baseBranch,
    sort: "updated",
    direction: "desc",
    per_page: 100
  });
  const pull = pulls.data.find(({ head }) => head.ref === branch);
  await (0, import_exec4.exec)("git", ["config", "user.name", author]);
  await (0, import_exec4.exec)("git", ["config", "user.email", email]);
  await (0, import_exec4.exec)("git", ["add", "package-lock.json"]);
  await (0, import_exec4.exec)("git", ["commit", "--message", `${title}

${commitBody}`]);
  await (0, import_exec4.exec)("git", ["checkout", "-B", branch]);
  await (0, import_exec4.exec)("git", ["push", "--force", remote, `HEAD:${branch}`]);
  if (pull) {
    await octokit.rest.pulls.update({
      owner,
      repo,
      pull_number: pull.number,
      title,
      body: pullBody
    });
    (0, import_core4.info)(`The pull request was updated successfully: ${pull.html_url}`);
  } else {
    const newPull = await octokit.rest.pulls.create({
      owner,
      repo,
      title,
      body: pullBody,
      head: branch,
      base: baseBranch
    });
    (0, import_core4.info)(`The pull request was created successfully: ${newPull.data.html_url}`);
    const newLabels = await octokit.rest.issues.addLabels({
      owner,
      repo,
      issue_number: newPull.data.number,
      labels
    });
    (0, import_core4.info)(`The labels were added successfully: ${newLabels.data.map((l) => l.name).join(", ")}`);
  }
}

// lib/getDefaultBranch.js
var import_github = require("@actions/github");
async function getDefaultBranch({ token, repository }) {
  const octokit = (0, import_github.getOctokit)(token);
  const res = await octokit.rest.repos.get(splitRepo(repository));
  return res.data.default_branch;
}

// lib/listPackages.js
var import_node_process = __toESM(require("node:process"), 1);
var import_exec5 = require("@actions/exec");
async function listPackages(options = {}) {
  const cwd = options.cwd || import_node_process.default.cwd();
  const { exitCode, stdout, stderr } = await (0, import_exec5.getExecOutput)(
    "npm",
    npmArgs("ls", "--parseable", "--long", "--all", "--package-lock-only"),
    {
      ignoreReturnCode: true,
      ...options,
      cwd
    }
  );
  if (exitCode !== 0 && !stderr.includes("npm ERR! missing:")) {
    throw new Error(`"npm ls" failed`);
  }
  const packages = /* @__PURE__ */ new Map();
  stdout.split("\n").filter((line) => line.trim().length !== 0).map((line) => line.replace(`${cwd}/node_modules/`, "")).forEach((line) => {
    const versionSeparatorPosition = line.lastIndexOf("@");
    if (versionSeparatorPosition === line.length - 1) {
      return;
    }
    const name = line.slice(0, versionSeparatorPosition);
    const version = line.slice(versionSeparatorPosition + 1);
    packages.set(name, version);
  });
  return packages;
}

// lib/updateNpm.js
var import_node_process2 = __toESM(require("node:process"), 1);
var core = __toESM(require("@actions/core"), 1);
var import_exec6 = require("@actions/exec");
async function updateNpm(version) {
  const cmdArgs = npmArgs("install", "--global", `npm@${version}`);
  try {
    await (0, import_exec6.exec)("npm", cmdArgs);
  } catch (error2) {
    core.error(String(error2));
    await (0, import_exec6.exec)("sudo", ["npm", ...cmdArgs]);
  }
  const { stdout: actualVersion } = await (0, import_exec6.getExecOutput)("npm", ["--version"]);
  await (0, import_exec6.exec)("sudo", ["chown", "-R", `${import_node_process2.default.env["USER"]}:`, `${import_node_process2.default.env["HOME"]}/.config`]);
  return actualVersion.trim();
}

// lib/utils/commaSeparatedList.js
function commaSeparatedList(str) {
  return str.split(",").map((s) => s.trim()).filter(Boolean);
}

// lib/index.js
async function filesChanged() {
  try {
    const exitCode = await (0, import_exec7.exec)("git", ["diff", "--exit-code"]);
    return exitCode === 0;
  } catch (err) {
    return false;
  }
}
function getFromEnv(name) {
  const value = import_node_process3.default.env[name];
  if (value) {
    return value;
  }
  throw new Error(`Not found '${name}' in the environment variables`);
}
async function run() {
  core2.info(`Running on Node.js ${import_node_process3.default.version}`);
  core2.addPath(import_node_process3.default.execPath.replace(/\/node$/u, ""));
  const npmVersion = await core2.group(`Update npm to ${NPM_VERSION}`, () => updateNpm(NPM_VERSION));
  await core2.group("Show runtime info", async () => {
    await (0, import_exec7.exec)("npm", ["version"]);
  });
  await core2.group("Install user packages", async () => {
    await (0, import_exec7.exec)("npm", npmArgs("ci"));
  });
  const auditReport = await core2.group("Get audit report", async () => {
    const res = await audit();
    core2.info(JSON.stringify(res, null, 2));
    return res;
  });
  const beforePackages = await core2.group("List packages before", () => listPackages());
  await core2.group("Fix vulnerabilities", () => auditFix());
  await core2.group("Re-install user packages", async () => {
    await (0, import_exec7.exec)("npm", npmArgs("ci"));
  });
  const afterPackages = await core2.group("List packages after", () => listPackages());
  const report = await core2.group("Aggregate report", async () => {
    const res = await aggregateReport(auditReport, beforePackages, afterPackages);
    core2.info(JSON.stringify(res, null, 2));
    return res;
  });
  if (report.packageCount === 0) {
    core2.info("No update.");
    return;
  }
  const changed = await core2.group("Check file changes", filesChanged);
  if (changed) {
    core2.info("No file changes.");
    return;
  }
  await core2.group("Create or update a pull request", async () => {
    const token = core2.getInput("github_token");
    const repository = getFromEnv("GITHUB_REPOSITORY");
    let baseBranch = core2.getInput("default_branch");
    if (!baseBranch) {
      baseBranch = await getDefaultBranch({ token, repository });
    }
    const author = core2.getInput("github_user");
    const email = core2.getInput("github_email");
    return createOrUpdatePullRequest({
      branch: core2.getInput("branch"),
      token,
      baseBranch,
      title: core2.getInput("commit_title"),
      pullBody: buildPullRequestBody(report, npmVersion),
      commitBody: buildCommitBody(report),
      repository,
      author,
      email,
      labels: commaSeparatedList(core2.getInput("labels"))
    });
  });
}
run().catch((e) => core2.setFailed(e.message));
