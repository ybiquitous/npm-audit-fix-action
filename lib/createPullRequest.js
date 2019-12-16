const exec = require("@actions/exec");
const github = require("@actions/github");
const newAdvisories = require("./utils/advisories");
const capitalize = require("./utils/capitalize");

module.exports = async function createPullRequest({
  audit,
  fix,
  token,
  defaultBranch,
  commitTitle,
  repo,
  actor,
  email,
}) {
  const advisories = newAdvisories(audit);

  const buildDetail = (title, severity, url) => {
    return title ? `**[${capitalize(severity)}]** ${title} ([ref](${url}))` : "-";
  };
  const npmPackage = name => `[${name}](https://npm.im/${name})`;

  const buildDetails = () => {
    const header = [];
    header.push("|Package|Version|Detail|");
    header.push("|-------|-------|------|");

    const lines = [];
    lines.push("### Updated");
    lines.push("");
    lines.push(...header);
    fix.updated.forEach(({ name, version, previousVersion }) => {
      const { title, severity, url } = advisories.find(name, previousVersion);
      const detail = buildDetail(title, severity, url);
      lines.push(`| ${npmPackage} | \`${previousVersion}\` → \`${version}\` | ${detail} |`);
    });
    lines.push("");
    lines.push("### Added");
    lines.push("");
    lines.push(...header);
    fix.added.forEach(({ name, version }) => {
      const { title, severity, url } = advisories.find(name, version);
      const detail = buildDetail(title, severity, url);
      lines.push(`| ${npmPackage}) | \`${version}\` | ${detail} |`);
    });
    lines.push("");
    lines.push("### Removed");
    lines.push("");
    lines.push(...header);
    fix.removed.forEach(({ name, version }) => {
      const { title, severity, url } = advisories.find(name, version);
      const detail = buildDetail(title, severity, url);
      lines.push(`| ${npmPackage}) | \`${version}\` | ${detail} |`);
    });

    return lines;
  };

  const commitBody = buildDetails().join("\n");
  const commitMessage = `${commitTitle}\n\n${commitBody}`;
  const branch = "npm-audit-fix";
  const remote = `https://${actor}:${token}@github.com/${repo}.git`;

  await exec.exec("git", ["config", "user.name", actor]);
  await exec.exec("git", ["config", "user.email", email]);
  await exec.exec("git", ["add", "package-lock.json"]);
  await exec.exec("git", ["commit", "--message", commitMessage]);
  await exec.exec("git", ["checkout", "-B", branch]);
  await exec.exec("git", ["push", remote, `HEAD:${branch}`]);

  const octokit = new github.GitHub(token);
  const [owner, repoName] = repo.split("/");
  const { data: pullRequest } = await octokit.pulls.create({
    owner: owner,
    repo: repoName,
    title: commitTitle,
    body: commitBody,
    head: branch,
    base: defaultBranch,
  });
  console.log(`Successfully created: ${pullRequest.html_url}`);
};
