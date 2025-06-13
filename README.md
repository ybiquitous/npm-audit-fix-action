[![Test](https://github.com/ybiquitous/npm-audit-fix-action/actions/workflows/test.yml/badge.svg)](https://github.com/ybiquitous/npm-audit-fix-action/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/ybiquitous/npm-audit-fix-action/graph/badge.svg?token=lcWzWUkwEy)](https://codecov.io/gh/ybiquitous/npm-audit-fix-action)

# `npm audit fix` Action

This action runs [`npm audit fix`](https://docs.npmjs.com/cli/audit) and creates a pull request.

## Usage

For example, you can add this action by creating [`.github/workflows/npm-audit-fix.yml`](.github/workflows/npm-audit-fix.yml):

```yaml
name: npm audit fix

on:
  schedule:
    - cron: "0 0 * * *"
  workflow_dispatch:

jobs:
  npm-audit-fix:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
      - uses: ybiquitous/npm-audit-fix-action@v7
```

### Inputs

| Name             | Description                                   | Default                                        |
| ---------------- | --------------------------------------------- | ---------------------------------------------- |
| `github_token`   | GitHub token.                                 | `${{ github.token }}`                          |
| `github_user`    | GitHub user name for commit changes.          | `${{ github.actor }}`                          |
| `github_email`   | GitHub user email for commit changes.         | `${{ github.actor }}@users.noreply.github.com` |
| `branch`         | Created branch.                               | `npm-audit-fix-action/fix`                     |
| `default_branch` | Default branch.                               | Auto-detected.                                 |
| `commit_title`   | Commit message and pull request title.        | `build(deps): npm audit fix`                   |
| `labels`         | Labels for pull request (comma-separated).    | `dependencies, javascript, security`           |
| `assignees`      | Assignees for pull request (comma-separated). | n/a                                            |
| `npm_args`       | Arguments for the `npm` command.              | n/a                                            |
| `path`           | Path to the project root directory.           | `.`                                            |

See [`action.yml`](action.yml).

### Outputs

| Name               | Description                      |
| ------------------ | -------------------------------- |
| `pull_request_url` | URL of the created pull request. |
| `branch_name`      | Name of the created branch.      |

See [`action.yml`](action.yml).

### Using a personal access token

If you want to run your CI with pull requests created by this action, you may need to set your [personal access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) instead of the GitHub's default token:

For example:

```yaml
with:
  github_token: ${{ secrets.PERSONAL_ACCESS_TOKEN }}
```

The reason is that the default token does not have enough permissions to trigger CI.
See also the [GitHub document](https://docs.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token#permissions-for-the-github_token) about the token permissions.

## Screenshot

![A pull request created by npm-audit-fix-action](screenshot.png)

## License

[MIT](LICENSE) © Masafumi Koba
