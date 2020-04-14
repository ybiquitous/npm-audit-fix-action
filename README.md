[![test](https://github.com/ybiquitous/npm-audit-fix-action/workflows/test/badge.svg)](https://github.com/ybiquitous/npm-audit-fix-action/actions)

# `npm audit fix` Action

This action runs [`npm audit fix`](https://docs.npmjs.com/cli/audit) and creates a pull request.

## Usage

For example, you can add a new workflow via [`.github/workflows/npm-audit-fix.yml`](.github/workflows/npm-audit-fix.yml):

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
      - uses: ybiquitous/npm-audit-fix-action@master
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          # branch: "npm-audit-fix"
          # default_branch: "master"
          # commit_title: "chore(deps): npm audit fix"
```

## Screenshot

![A pull request](screenshot.png)

## License

[MIT](LICENSE) © Masafumi Koba
