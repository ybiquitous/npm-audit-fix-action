const { exec } = require("@actions/exec");
const github = require("@actions/github");
const newAdvisories = require("./utils/advisories");
const capitalize = require("./utils/capitalize");

/**
 * @param {string} name
 */
const npmPackage = name => `[${name}](https://npm.im/${name})`;

/**
 * @param {Advisory} advisory
 */
const buildDetail = ({ title, severity, url }) =>
  `**[${capitalize(severity)}]** ${title} ([ref](${url}))`;

/**
 * @param {Fix} fix
 * @param {Advisories} advisories
 */
const buildDetails = (fix, advisories) => {
  const header = [];
  header.push("| Package | Version | Detail |");
  header.push("| ------- | ------- | ------ |");

  const lines = [];

  if (fix.updated.length) {
    lines.push("");
    lines.push("### Updated");
    lines.push("");
    lines.push(...header);
    fix.updated.forEach(({ name, version, previousVersion }) => {
      const advisory = advisories.find(name, previousVersion);
      const detail = advisory ? buildDetail(advisory) : "-";
      lines.push(`| ${npmPackage(name)} | \`${previousVersion}\` → \`${version}\` | ${detail} |`);
    });
  }
  if (fix.added.length) {
    lines.push("");
    lines.push("### Added");
    lines.push("");
    lines.push(...header);
    fix.added.forEach(({ name, version }) => {
      const advisory = advisories.find(name, version);
      const detail = advisory ? buildDetail(advisory) : "-";
      lines.push(`| ${npmPackage}) | \`${version}\` | ${detail} |`);
    });
  }
  if (fix.removed.length) {
    lines.push("");
    lines.push("### Removed");
    lines.push("");
    lines.push(...header);
    fix.removed.forEach(({ name, version }) => {
      const advisory = advisories.find(name, version);
      const detail = advisory ? buildDetail(advisory) : "-";
      lines.push(`| ${npmPackage}) | \`${version}\` | ${detail} |`);
    });
  }

  lines.push("");
  lines.push(
    "*This pull request is created by [ybiquitous/npm-audit-fix-action](https://github.com/ybiquitous/npm-audit-fix-action).*"
  );

  return lines;
};

/**
 * @param {{
 *  audit: AuditReport,
 *  fix: Fix,
 *  token: string,
 *  branch: string,
 *  defaultBranch: string,
 *  commitTitle: string,
 *  repository: string,
 *  actor: string,
 *  email: string,
 * }} params
 */
module.exports = async function createPullRequest({
  audit,
  fix,
  token,
  branch,
  defaultBranch,
  commitTitle,
  repository,
  actor,
  email,
}) {
  const advisories = newAdvisories(audit);

  const commitBody = buildDetails(fix, advisories)
    .join("\n")
    .trim();
  const commitMessage = `${commitTitle}\n\n${commitBody}`;
  const remote = `https://${actor}:${token}@github.com/${repository}.git`;
  const [owner, repo] = repository.split("/");

  await exec("git", ["config", "user.name", actor]);
  await exec("git", ["config", "user.email", email]);
  await exec("git", ["add", "package-lock.json"]);
  await exec("git", ["commit", "--message", commitMessage]);
  await exec("git", ["checkout", "-B", branch]);
  await exec("git", ["push", remote, `HEAD:${branch}`]);

  const octokit = new github.GitHub(token);
  const { data: pullRequest } = await octokit.pulls.create({
    owner,
    repo,
    title: commitTitle,
    body: commitBody,
    head: branch,
    base: defaultBranch,
  });
  console.log(`The pull request was created successfully: ${pullRequest.html_url}`);
};
