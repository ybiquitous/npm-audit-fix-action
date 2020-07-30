[![test](https://github.com/ybiquitous/npm-audit-fix-action/workflows/test/badge.svg)](https://github.com/ybiquitous/npm-audit-fix-action/actions)

# `npm audit fix` Action

This action runs [`npm audit fix`](https://docs.npmjs.com/cli/audit) and creates a pull request.

## Usage

For example, you can add this action by creating `.github/workflows/npm-audit-fix.yml` as follows:

```yaml
name: npm audit fix

on:
  schedule:
    - cron: 0 0 * * * # Runs at 00:00 UTC every day

jobs:
  run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: ybiquitous/npm-audit-fix-action@v1
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          # branch: "npm-audit-fix-action/fix"
          # default_branch: "master"
          # commit_title: "build(deps): npm audit fix"
          # labels: "dependencies, security"
        # or
        # env:
        #   GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Here is a [sample](.github/workflows/npm-audit-fix.yml).

## Screenshot

![A pull request created by npm-audit-fix-action](screenshot.png)

## License

[MIT](LICENSE) © Masafumi Koba
