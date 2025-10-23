## [7.3.0](https://github.com/ybiquitous/npm-audit-fix-action/compare/v7.2.0...v7.3.0) (2025-08-12)

### Features

- update Node.js version from 20 to 24 ([#1060](https://github.com/ybiquitous/npm-audit-fix-action/issues/1060)) ([5bb5992](https://github.com/ybiquitous/npm-audit-fix-action/commit/5bb59927ff2fe904a63cbb47323773285f254c6c))

### Bug Fixes

- **deps:** bump hosted-git-info from 8.1.0 to 9.0.0 ([#1054](https://github.com/ybiquitous/npm-audit-fix-action/issues/1054)) ([1a19213](https://github.com/ybiquitous/npm-audit-fix-action/commit/1a19213231da355548e9df08842609d3d460bfe2))

## [7.2.0](https://github.com/ybiquitous/npm-audit-fix-action/compare/v7.1.5...v7.2.0) (2025-06-13)

### Features

- add outputs `pull_request_url` and `branch_name` ([#1037](https://github.com/ybiquitous/npm-audit-fix-action/issues/1037)) ([80f95ea](https://github.com/ybiquitous/npm-audit-fix-action/commit/80f95ea65a929bc72c792682744cfa7e1dea0442))
- change `github_email` input default to include `github.actor_id` ([#1041](https://github.com/ybiquitous/npm-audit-fix-action/issues/1041)) ([33bcfb8](https://github.com/ybiquitous/npm-audit-fix-action/commit/33bcfb80219b986edd0fc0d2706d7eec8d5ffeb3))

### Bug Fixes

- **deps:** bump @actions/github from 6.0.0 to 6.0.1 ([#1028](https://github.com/ybiquitous/npm-audit-fix-action/issues/1028)) ([fc41e94](https://github.com/ybiquitous/npm-audit-fix-action/commit/fc41e946d43f88aed6b21d41413514a68ca37f59))

## [7.1.5](https://github.com/ybiquitous/npm-audit-fix-action/compare/v7.1.4...v7.1.5) (2025-04-16)

### Bug Fixes

- also commit `package.json` ([#1019](https://github.com/ybiquitous/npm-audit-fix-action/issues/1019)) ([44071c4](https://github.com/ybiquitous/npm-audit-fix-action/commit/44071c4c112929a1285327f0a636ee8b8c68a166))

## [7.1.4](https://github.com/ybiquitous/npm-audit-fix-action/compare/v7.1.3...v7.1.4) (2025-04-05)

## [7.1.3](https://github.com/ybiquitous/npm-audit-fix-action/compare/v7.1.2...v7.1.3) (2025-04-05)

### Bug Fixes

- prepare for publishing on marketplace ([#1012](https://github.com/ybiquitous/npm-audit-fix-action/issues/1012)) ([b9ccd30](https://github.com/ybiquitous/npm-audit-fix-action/commit/b9ccd30dffa96e50f7949a00370a8b2fc68605b0))

## [7.1.2](https://github.com/ybiquitous/npm-audit-fix-action/compare/v7.1.1...v7.1.2) (2025-04-05)

### Bug Fixes

- run ESM code without compilation to CJS ([#1010](https://github.com/ybiquitous/npm-audit-fix-action/issues/1010)) ([8dfd00c](https://github.com/ybiquitous/npm-audit-fix-action/commit/8dfd00c9d5f6b9683ad55f6bf7c816eab66e97b6))

## [7.1.1](https://github.com/ybiquitous/npm-audit-fix-action/compare/v7.1.0...v7.1.1) (2025-03-18)

### Bug Fixes

- polish message in pull request body ([#1004](https://github.com/ybiquitous/npm-audit-fix-action/issues/1004)) ([658a8f2](https://github.com/ybiquitous/npm-audit-fix-action/commit/658a8f26405720bd4e7771d4016eb2092b6d7830))

## [7.1.0](https://github.com/ybiquitous/npm-audit-fix-action/compare/v7.0.0...v7.1.0) (2025-02-18)

### Features

- add action run link to generated pull request body ([#988](https://github.com/ybiquitous/npm-audit-fix-action/issues/988)) ([d878b05](https://github.com/ybiquitous/npm-audit-fix-action/commit/d878b050fbda25f08517cab910ef317a2a5cdee5))
- show notice message for generated pull requests ([#990](https://github.com/ybiquitous/npm-audit-fix-action/issues/990)) ([af716c7](https://github.com/ybiquitous/npm-audit-fix-action/commit/af716c737c24a4bf741c9c3254f72a58c2c9081d))
- simplify information on pull request body and commit message ([#993](https://github.com/ybiquitous/npm-audit-fix-action/issues/993)) ([7df900b](https://github.com/ybiquitous/npm-audit-fix-action/commit/7df900b5efeb6e1b708a14355296c4ac266c5411))

### Bug Fixes

- **deps:** npm audit fix ([#994](https://github.com/ybiquitous/npm-audit-fix-action/issues/994)) ([1924d2b](https://github.com/ybiquitous/npm-audit-fix-action/commit/1924d2becdf6a3b74681136a0f74278a2cbf0111))
- prevent linebreaks between versions in pull request body's table ([#991](https://github.com/ybiquitous/npm-audit-fix-action/issues/991)) ([9c62a4c](https://github.com/ybiquitous/npm-audit-fix-action/commit/9c62a4c99c9314f270ac33d9254c3b34c44f5589))
- prevent too long column in pull request body's table ([#992](https://github.com/ybiquitous/npm-audit-fix-action/issues/992)) ([ba410c0](https://github.com/ybiquitous/npm-audit-fix-action/commit/ba410c0d07046cdda11971da323dbc0cc9ffb9b0))

## [7.0.0](https://github.com/ybiquitous/npm-audit-fix-action/compare/v6.3.2...v7.0.0) (2025-02-17)

### ⚠ BREAKING CHANGES

- bump npm from 10 to 11 (#981)

### Features

- bump npm from 10 to 11 ([#981](https://github.com/ybiquitous/npm-audit-fix-action/issues/981)) ([6e5777d](https://github.com/ybiquitous/npm-audit-fix-action/commit/6e5777d49766d81797353408b3e01aeb317acbc6))

### Bug Fixes

- **deps:** bump @octokit/request-error from 5.0.1 to 5.1.1 ([#979](https://github.com/ybiquitous/npm-audit-fix-action/issues/979)) ([a621c97](https://github.com/ybiquitous/npm-audit-fix-action/commit/a621c977e25e0da126409a6302b0fdc517e94dc5))

## [6.3.1](https://github.com/ybiquitous/npm-audit-fix-action/compare/v6.3.0...v6.3.1) (2025-01-28)

### Bug Fixes

- **deps:** bump undici from 5.28.4 to 5.28.5 ([#973](https://github.com/ybiquitous/npm-audit-fix-action/issues/973)) ([6a398dc](https://github.com/ybiquitous/npm-audit-fix-action/commit/6a398dc72b2408bdb1372fb5ba8d58bcedc4d4d1))

## [6.3.0](https://github.com/ybiquitous/npm-audit-fix-action/compare/v6.2.0...v6.3.0) (2025-01-07)

### Features

- add custom project path support ([#963](https://github.com/ybiquitous/npm-audit-fix-action/issues/963)) ([ae95078](https://github.com/ybiquitous/npm-audit-fix-action/commit/ae950783bc2f7fb8d060ccce1a31efb8e3ba37b2))

## [6.2.0](https://github.com/ybiquitous/npm-audit-fix-action/compare/v6.1.5...v6.2.0) (2025-01-06)

### Features

- add PR assignees support ([#957](https://github.com/ybiquitous/npm-audit-fix-action/issues/957)) ([a63f993](https://github.com/ybiquitous/npm-audit-fix-action/commit/a63f993bb1362a2818a7cae4ac5244252682437a))

## [6.1.5](https://github.com/ybiquitous/npm-audit-fix-action/compare/v6.1.4...v6.1.5) (2024-11-25)

### Bug Fixes

- **deps:** bump hosted-git-info from 8.0.0 to 8.0.2 ([#947](https://github.com/ybiquitous/npm-audit-fix-action/issues/947)) ([8bbc5ec](https://github.com/ybiquitous/npm-audit-fix-action/commit/8bbc5ec44220c71d510cc83f951e0130fcd6bb68))

## [6.1.4](https://github.com/ybiquitous/npm-audit-fix-action/compare/v6.1.3...v6.1.4) (2024-10-07)

### Bug Fixes

- **deps:** bump @actions/core from 1.10.1 to 1.11.1 ([#928](https://github.com/ybiquitous/npm-audit-fix-action/issues/928)) ([a9e0572](https://github.com/ybiquitous/npm-audit-fix-action/commit/a9e05728fdb6b91372aa0767b2eef23de2cf9835))

## [6.1.3](https://github.com/ybiquitous/npm-audit-fix-action/compare/v6.1.2...v6.1.3) (2024-09-10)

### Bug Fixes

- **deps:** bump hosted-git-info from 7.0.2 to 8.0.0 ([#919](https://github.com/ybiquitous/npm-audit-fix-action/issues/919)) ([04d3a9d](https://github.com/ybiquitous/npm-audit-fix-action/commit/04d3a9d06278fa33c395bad1629592ce936f73a0))

## [6.1.2](https://github.com/ybiquitous/npm-audit-fix-action/compare/v6.1.1...v6.1.2) (2024-05-30)

### Bug Fixes

- always overwrite branch even if PR were already closed ([#885](https://github.com/ybiquitous/npm-audit-fix-action/issues/885)) ([32a5730](https://github.com/ybiquitous/npm-audit-fix-action/commit/32a573034104a051b38c979825217548dbb743e3)), closes [#884](https://github.com/ybiquitous/npm-audit-fix-action/issues/884)
- **deps-dev:** bump esbuild from 0.20.2 to 0.21.2 ([#877](https://github.com/ybiquitous/npm-audit-fix-action/issues/877)) ([cc2990e](https://github.com/ybiquitous/npm-audit-fix-action/commit/cc2990e638a078c620263cc526499315304fc720))
- **deps:** bump hosted-git-info from 7.0.1 to 7.0.2 ([#874](https://github.com/ybiquitous/npm-audit-fix-action/issues/874)) ([17cc5ac](https://github.com/ybiquitous/npm-audit-fix-action/commit/17cc5ac124dfc94ec7ade7be5c62fbe6b3db6b59))

## [6.1.1](https://github.com/ybiquitous/npm-audit-fix-action/compare/v6.1.0...v6.1.1) (2024-04-04)

### Bug Fixes

- **deps:** bump undici from 5.28.3 to 5.28.4 ([#866](https://github.com/ybiquitous/npm-audit-fix-action/issues/866)) ([e8a0fe3](https://github.com/ybiquitous/npm-audit-fix-action/commit/e8a0fe3546d5c9d247b6d74d0b994980d51c7239))

## [6.1.0](https://github.com/ybiquitous/npm-audit-fix-action/compare/v6.0.0...v6.1.0) (2024-03-02)

### Features

- add `npm_args` input ([#855](https://github.com/ybiquitous/npm-audit-fix-action/issues/855)) ([7c5b5ed](https://github.com/ybiquitous/npm-audit-fix-action/commit/7c5b5ede01196365225d89d478dd158efc020afd))

## [6.0.0](https://github.com/ybiquitous/npm-audit-fix-action/compare/v5.2.1...v6.0.0) (2023-12-19)

### ⚠ BREAKING CHANGES

- bump npm from 9 to 10 (#834)

### Features

- bump npm from 9 to 10 ([#834](https://github.com/ybiquitous/npm-audit-fix-action/issues/834)) ([09aebbb](https://github.com/ybiquitous/npm-audit-fix-action/commit/09aebbbe992833b0a89a0287efe5b4c1517d7d5f))

### Bug Fixes

- **deps:** bump @actions/github from 5.1.1 to 6.0.0 ([#813](https://github.com/ybiquitous/npm-audit-fix-action/issues/813)) ([b52066e](https://github.com/ybiquitous/npm-audit-fix-action/commit/b52066e9dcdc56e0608de2fcab3b4c556f737624))

## [5.2.0](https://github.com/ybiquitous/npm-audit-fix-action/compare/v5.1.0...v5.2.0) (2023-09-02)

### Features

- update Node.js from 16 to 20 ([#783](https://github.com/ybiquitous/npm-audit-fix-action/issues/783)) ([2822425](https://github.com/ybiquitous/npm-audit-fix-action/commit/2822425c674c4c7baa2458a120e923518cb49a9f))

### Bug Fixes

- **deps:** bump hosted-git-info from 6.1.1 to 7.0.0 ([#778](https://github.com/ybiquitous/npm-audit-fix-action/issues/778)) ([ad19ede](https://github.com/ybiquitous/npm-audit-fix-action/commit/ad19ede846c9ff87c6254931d7e97b22409a3769))
- running Node.js version when using `exec()` ([#785](https://github.com/ybiquitous/npm-audit-fix-action/issues/785)) ([df73363](https://github.com/ybiquitous/npm-audit-fix-action/commit/df7336323c52b99640faa80dba8828f0a1770257))

## [5.1.0](https://github.com/ybiquitous/npm-audit-fix-action/compare/v5.0.0...v5.1.0) (2023-07-07)

### Features

- add audit info to removed dependencies ([#754](https://github.com/ybiquitous/npm-audit-fix-action/issues/754)) ([f4d683d](https://github.com/ybiquitous/npm-audit-fix-action/commit/f4d683dd74cc23828bee414e6fae4557394aa4cd))

### Bug Fixes

- **deps:** update all dependencies and CJS build ([#751](https://github.com/ybiquitous/npm-audit-fix-action/issues/751)) ([548d3bc](https://github.com/ybiquitous/npm-audit-fix-action/commit/548d3bced148b1f7555266d30c429988580aa83f))

## [5.0.0](https://github.com/ybiquitous/npm-audit-fix-action/compare/v4.0.13...v5.0.0) (2023-01-07)

### ⚠ BREAKING CHANGES

- npm 9 has some breaking changes, but they may not affect. See the release note:
  https://github.com/npm/cli/releases/tag/v9.0.0

### Features

- bump npm from 8 to 9 ([#747](https://github.com/ybiquitous/npm-audit-fix-action/issues/747)) ([64f1ed7](https://github.com/ybiquitous/npm-audit-fix-action/commit/64f1ed72ec7b7208cbb40db9cab2b2e54ee3903e))

### Bug Fixes

- `permissions.contents` from `read` to `write` ([#740](https://github.com/ybiquitous/npm-audit-fix-action/issues/740)) ([51df826](https://github.com/ybiquitous/npm-audit-fix-action/commit/51df826f04ee841a77c7b38b8bb9c59e9f845820))

## [4.0.12](https://github.com/ybiquitous/npm-audit-fix-action/compare/v4.0.11...v4.0.12) (2022-11-08)

### Bug Fixes

- **deps:** bump hosted-git-info from 6.0.0 to 6.1.1 ([#700](https://github.com/ybiquitous/npm-audit-fix-action/issues/700)) ([d86ffbc](https://github.com/ybiquitous/npm-audit-fix-action/commit/d86ffbc47826054a5853cb4f71de60080fa2cba4))

## [4.0.11](https://github.com/ybiquitous/npm-audit-fix-action/compare/v4.0.10...v4.0.11) (2022-10-18)

### Bug Fixes

- **deps:** bump hosted-git-info from 5.1.0 to 6.0.0 ([#689](https://github.com/ybiquitous/npm-audit-fix-action/issues/689)) ([5124076](https://github.com/ybiquitous/npm-audit-fix-action/commit/51240765702c79bd2216e9b70cc73574caaa59b5))

## [4.0.10](https://github.com/ybiquitous/npm-audit-fix-action/compare/v4.0.9...v4.0.10) (2022-10-04)

### Bug Fixes

- **deps:** bump @actions/core from 1.9.1 to 1.10.0 ([#679](https://github.com/ybiquitous/npm-audit-fix-action/issues/679)) ([b67bafc](https://github.com/ybiquitous/npm-audit-fix-action/commit/b67bafc1967fd0992a662936d16363e949780f14))
- **deps:** bump @actions/github from 5.1.0 to 5.1.1 ([#678](https://github.com/ybiquitous/npm-audit-fix-action/issues/678)) ([2e8d0a3](https://github.com/ybiquitous/npm-audit-fix-action/commit/2e8d0a3807b31f246dd09c070f494eada51a7c32))

## [4.0.9](https://github.com/ybiquitous/npm-audit-fix-action/compare/v4.0.8...v4.0.9) (2022-09-27)

### Bug Fixes

- **deps:** bump @actions/github from 5.0.3 to 5.1.0 ([#669](https://github.com/ybiquitous/npm-audit-fix-action/issues/669)) ([5ee3539](https://github.com/ybiquitous/npm-audit-fix-action/commit/5ee35397861cee7bd3347d2b6133caab3214eb41))

## [4.0.8](https://github.com/ybiquitous/npm-audit-fix-action/compare/v4.0.7...v4.0.8) (2022-08-16)

### Bug Fixes

- **deps-dev:** bump esbuild from 0.14.49 to 0.14.50 ([#630](https://github.com/ybiquitous/npm-audit-fix-action/issues/630)) ([4ae5520](https://github.com/ybiquitous/npm-audit-fix-action/commit/4ae5520b7f63e448474823af53256e29be78f513))
- **deps:** bump @actions/core from 1.9.0 to 1.9.1 ([#637](https://github.com/ybiquitous/npm-audit-fix-action/issues/637)) ([5562ff3](https://github.com/ybiquitous/npm-audit-fix-action/commit/5562ff398c7d19cfae7c3fd69ea4c3de6445b9fa))
- **deps:** bump hosted-git-info from 5.0.0 to 5.1.0 ([#645](https://github.com/ybiquitous/npm-audit-fix-action/issues/645)) ([61691eb](https://github.com/ybiquitous/npm-audit-fix-action/commit/61691eb2eab77b003f99a98f15eb6125814e7f15))

## [4.0.7](https://github.com/ybiquitous/npm-audit-fix-action/compare/v4.0.6...v4.0.7) (2022-07-04)

### Bug Fixes

- retry `sudo npm install npm` ([#620](https://github.com/ybiquitous/npm-audit-fix-action/issues/620)) ([a8ac4d8](https://github.com/ybiquitous/npm-audit-fix-action/commit/a8ac4d89b5d5e92b586304b351524d4cf0092d4d))

## [4.0.6](https://github.com/ybiquitous/npm-audit-fix-action/compare/v4.0.5...v4.0.6) (2022-06-21)

### Bug Fixes

- **deps:** bump esbuild from 0.14.43 to 0.14.47 ([#608](https://github.com/ybiquitous/npm-audit-fix-action/issues/608)) ([0e82d26](https://github.com/ybiquitous/npm-audit-fix-action/commit/0e82d2676041340a23c9e47195304e55e80beeb2))

## [4.0.5](https://github.com/ybiquitous/npm-audit-fix-action/compare/v4.0.4...v4.0.5) (2022-05-31)

### Bug Fixes

- **deps:** bump @actions/core from 1.8.0 to 1.8.2 ([#576](https://github.com/ybiquitous/npm-audit-fix-action/issues/576)) ([14c7cad](https://github.com/ybiquitous/npm-audit-fix-action/commit/14c7cadbdcca01855d399cf5420628b9983753ea))
- **deps:** bump @actions/github from 5.0.1 to 5.0.3 ([#577](https://github.com/ybiquitous/npm-audit-fix-action/issues/577)) ([6e5df58](https://github.com/ybiquitous/npm-audit-fix-action/commit/6e5df580b28c6d3e2a621e4bb17a76ff5db0e8ff))

## [4.0.4](https://github.com/ybiquitous/npm-audit-fix-action/compare/v4.0.3...v4.0.4) (2022-05-10)

### Bug Fixes

- **deps:** bump @actions/core from 1.7.0 to 1.8.0 ([#571](https://github.com/ybiquitous/npm-audit-fix-action/issues/571)) ([5c44b6d](https://github.com/ybiquitous/npm-audit-fix-action/commit/5c44b6d339ea56693533f666400259ad39cb6290))

## [4.0.3](https://github.com/ybiquitous/npm-audit-fix-action/compare/v4.0.2...v4.0.3) (2022-05-02)

### Bug Fixes

- **deps:** bump @actions/core from 1.6.0 to 1.7.0 ([#554](https://github.com/ybiquitous/npm-audit-fix-action/issues/554)) ([2427c57](https://github.com/ybiquitous/npm-audit-fix-action/commit/2427c57861062dad788227c9bacdb030853e2d80))

## [4.0.2](https://github.com/ybiquitous/npm-audit-fix-action/compare/v4.0.1...v4.0.2) (2022-04-04)

### Bug Fixes

- **deps:** bump @actions/github from 5.0.0 to 5.0.1 ([#546](https://github.com/ybiquitous/npm-audit-fix-action/issues/546)) ([fd4bb7c](https://github.com/ybiquitous/npm-audit-fix-action/commit/fd4bb7c3c65e3632fdbf4aad184a5f9ce6242f98))
- **deps:** bump hosted-git-info from 4.1.0 to 5.0.0 ([#537](https://github.com/ybiquitous/npm-audit-fix-action/issues/537)) ([786112a](https://github.com/ybiquitous/npm-audit-fix-action/commit/786112a774d0dcfa97353d121df59bbeaec07555))

## [4.0.1](https://github.com/ybiquitous/npm-audit-fix-action/compare/v4.0.0...v4.0.1) (2022-03-15)

### Bug Fixes

- **deps-dev:** bump esbuild from 0.14.25 to 0.14.27 ([#533](https://github.com/ybiquitous/npm-audit-fix-action/issues/533)) ([d335bad](https://github.com/ybiquitous/npm-audit-fix-action/commit/d335bad06c5fd15611dfd75eb3d8ffc90f7f3570))

## [4.0.0](https://github.com/ybiquitous/npm-audit-fix-action/compare/v3.4.1...v4.0.0) (2022-03-03)

### ⚠ BREAKING CHANGES

- **deps:** Node.js 16 is the active LTS version.

### Features

- **deps:** bump Node.js image from 12 to 16 ([#521](https://github.com/ybiquitous/npm-audit-fix-action/issues/521)) ([06b2f07](https://github.com/ybiquitous/npm-audit-fix-action/commit/06b2f07dc6306a113fe3e523cb11733544d44331))

### Bug Fixes

- **deps:** bump hosted-git-info from 4.0.2 to 4.1.0 ([#516](https://github.com/ybiquitous/npm-audit-fix-action/issues/516)) ([0ffe8c0](https://github.com/ybiquitous/npm-audit-fix-action/commit/0ffe8c0c4b3efb2672744dde6547bc2d809dbf07))
- **deps:** bump node-fetch from 2.6.1 to 2.6.7 ([#520](https://github.com/ybiquitous/npm-audit-fix-action/issues/520)) ([b6edd66](https://github.com/ybiquitous/npm-audit-fix-action/commit/b6edd66136f47d49faf47d82ee7d06264aa6ffaa))
- migrate `@vercel/ncc` to `esbuild` ([#524](https://github.com/ybiquitous/npm-audit-fix-action/issues/524)) ([2e01d05](https://github.com/ybiquitous/npm-audit-fix-action/commit/2e01d05414d449a53511a3db64e3527b29404f17))

## [3.4.1](https://github.com/ybiquitous/npm-audit-fix-action/compare/v3.4.0...v3.4.1) (2021-10-16)

### Bug Fixes

- remove duplicate lines in commit body ([#507](https://github.com/ybiquitous/npm-audit-fix-action/issues/507)) ([242a4c2](https://github.com/ybiquitous/npm-audit-fix-action/commit/242a4c2c2bccb1f74ce197980f2149269e8a1553))

## [3.4.0](https://github.com/ybiquitous/npm-audit-fix-action/compare/v3.3.0...v3.4.0) (2021-10-16)

### Features

- **deps:** bump npm from 7 to 8 ([#506](https://github.com/ybiquitous/npm-audit-fix-action/issues/506)) ([5f38573](https://github.com/ybiquitous/npm-audit-fix-action/commit/5f3857374aae4bed1dfea86aa7b1fc6e3a0652f0))

## [3.3.0](https://github.com/ybiquitous/npm-audit-fix-action/compare/v3.2.5...v3.3.0) (2021-10-11)

### Features

- add configurable user and email ([#501](https://github.com/ybiquitous/npm-audit-fix-action/issues/501)) ([b5611f8](https://github.com/ybiquitous/npm-audit-fix-action/commit/b5611f8fc30e23f645932d5d897dd02195a000d1))

### Bug Fixes

- allow npm@8 ([#498](https://github.com/ybiquitous/npm-audit-fix-action/issues/498)) ([5bfc9cc](https://github.com/ybiquitous/npm-audit-fix-action/commit/5bfc9ccefd3648187ffdf9022053f46ab578c05b))

## [3.2.4](https://github.com/ybiquitous/npm-audit-fix-action/compare/v3.2.3...v3.2.4) (2021-07-17)

### Bug Fixes

- **deps:** migrate @zeit/ncc to @vercel/ncc ([#449](https://github.com/ybiquitous/npm-audit-fix-action/issues/449)) ([1b8aec2](https://github.com/ybiquitous/npm-audit-fix-action/commit/1b8aec2e239b749b66994206442d653ba764bb6b))

## [3.2.3](https://github.com/ybiquitous/npm-audit-fix-action/compare/v3.2.2...v3.2.3) (2021-06-29)

### Bug Fixes

- sub dependencies ([#439](https://github.com/ybiquitous/npm-audit-fix-action/issues/439)) ([5d970e8](https://github.com/ybiquitous/npm-audit-fix-action/commit/5d970e8568ca278d79ad619a1bfc4dca7352e88f))

## [3.2.2](https://github.com/ybiquitous/npm-audit-fix-action/compare/v3.2.1...v3.2.2) (2021-06-21)

## [3.2.1](https://github.com/ybiquitous/npm-audit-fix-action/compare/v3.2.0...v3.2.1) (2021-06-10)

### Bug Fixes

- warning for requiring CJS module ([#428](https://github.com/ybiquitous/npm-audit-fix-action/issues/428)) ([b28deb7](https://github.com/ybiquitous/npm-audit-fix-action/commit/b28deb7ab5c0073c5dda43a8b5622368ef13f84d))

## [3.2.0](https://github.com/ybiquitous/npm-audit-fix-action/compare/v3.1.6...v3.2.0) (2021-05-24)

### Features

- migrate to ESM ([#417](https://github.com/ybiquitous/npm-audit-fix-action/issues/417)) ([625c6d7](https://github.com/ybiquitous/npm-audit-fix-action/commit/625c6d7b609a9dcf3c15b5d2c49edaa520e01857))

### Bug Fixes

- output warning when `npm audit fix` returns non-zero ([#415](https://github.com/ybiquitous/npm-audit-fix-action/issues/415)) ([9480f3a](https://github.com/ybiquitous/npm-audit-fix-action/commit/9480f3a2f633fe4ba29d0abb55cce851b501980a)), closes [#410](https://github.com/ybiquitous/npm-audit-fix-action/issues/410)

## [3.1.6](https://github.com/ybiquitous/npm-audit-fix-action/compare/v3.1.5...v3.1.6) (2021-05-18)

### Bug Fixes

- ignore return code of `npm audit fix` ([#410](https://github.com/ybiquitous/npm-audit-fix-action/issues/410)) ([38f4153](https://github.com/ybiquitous/npm-audit-fix-action/commit/38f4153b92126206f8dd15e04a892c4dc06af860))

## [3.1.5](https://github.com/ybiquitous/npm-audit-fix-action/compare/v3.1.4...v3.1.5) (2021-05-17)

### Bug Fixes

- **deps:** bump @actions/github from 4.0.0 to 5.0.0 ([#407](https://github.com/ybiquitous/npm-audit-fix-action/issues/407)) ([606a6fc](https://github.com/ybiquitous/npm-audit-fix-action/commit/606a6fcb6dfa18ea6fa45d160f1764c9c443ef89))

## [3.1.4](https://github.com/ybiquitous/npm-audit-fix-action/compare/v3.1.3...v3.1.4) (2021-05-10)

### Bug Fixes

- re-run `npm ci` for more accurate diff list ([#406](https://github.com/ybiquitous/npm-audit-fix-action/issues/406)) ([1f9a52c](https://github.com/ybiquitous/npm-audit-fix-action/commit/1f9a52ca5303da1a397dbbb6c77d6cc1db0162ce))

## [3.1.3](https://github.com/ybiquitous/npm-audit-fix-action/compare/v3.1.2...v3.1.3) (2021-05-10)

### Bug Fixes

- `npm ls` parsing ([#405](https://github.com/ybiquitous/npm-audit-fix-action/issues/405)) ([8ea9d50](https://github.com/ybiquitous/npm-audit-fix-action/commit/8ea9d5000d302c139de145f29a603519a1318acf))

## [3.1.2](https://github.com/ybiquitous/npm-audit-fix-action/compare/v3.1.1...v3.1.2) (2021-05-06)

### Bug Fixes

- usage of `workflow_dispatch` ([#398](https://github.com/ybiquitous/npm-audit-fix-action/issues/398)) ([e455638](https://github.com/ybiquitous/npm-audit-fix-action/commit/e45563804571118fee228410b5a4214e8225adf8))

## [3.1.1](https://github.com/ybiquitous/npm-audit-fix-action/compare/v3.1.0...v3.1.1) (2021-04-21)

### Bug Fixes

- author email for noreply ([#393](https://github.com/ybiquitous/npm-audit-fix-action/issues/393)) ([004e98e](https://github.com/ybiquitous/npm-audit-fix-action/commit/004e98e08e193cdeda449bd6f15bdd315af7bbff))

## [3.1.0](https://github.com/ybiquitous/npm-audit-fix-action/compare/v3.0.1...v3.1.0) (2021-04-21)

### Features

- update default `labels` parameter ([#390](https://github.com/ybiquitous/npm-audit-fix-action/issues/390)) ([ef459f9](https://github.com/ybiquitous/npm-audit-fix-action/commit/ef459f9e8c9291b377836c3d6210b0d5a6c4ee85))

## [3.0.1](https://github.com/ybiquitous/npm-audit-fix-action/compare/v3.0.0...v3.0.1) (2021-04-09)

### Bug Fixes

- fix an error when `via` is unexpected ([#375](https://github.com/ybiquitous/npm-audit-fix-action/issues/375)) ([d829d1e](https://github.com/ybiquitous/npm-audit-fix-action/commit/d829d1e80fee3575e45ea733f7772257c1cd1039)), closes [#374](https://github.com/ybiquitous/npm-audit-fix-action/issues/374)

## [3.0.0](https://github.com/ybiquitous/npm-audit-fix-action/compare/v2.1.12...v3.0.0) (2021-04-05)

### ⚠ BREAKING CHANGES

- **deps:** The audit report format has been changed since npm 7.

### Features

- add version to npmjs.com link ([#373](https://github.com/ybiquitous/npm-audit-fix-action/issues/373)) ([50e55a3](https://github.com/ybiquitous/npm-audit-fix-action/commit/50e55a3f5e0c8a4576b4fbb680099b28fc655fbb))
- **deps:** bump npm from 6.14.11 to 7 ([#317](https://github.com/ybiquitous/npm-audit-fix-action/issues/317)) ([46f8a79](https://github.com/ybiquitous/npm-audit-fix-action/commit/46f8a79e7819bcec7fcecd5baa9f267b73e0bc99))
- improve PR body ([#368](https://github.com/ybiquitous/npm-audit-fix-action/issues/368)) ([c7aa57e](https://github.com/ybiquitous/npm-audit-fix-action/commit/c7aa57eaa91adebf1341cb630cd35cb8015b2489))

### Bug Fixes

- **actions:** fix releasing ([75eb03a](https://github.com/ybiquitous/npm-audit-fix-action/commit/75eb03aaf046c521bce1126ac768708c12d6844c))
- bugfix ([#367](https://github.com/ybiquitous/npm-audit-fix-action/issues/367)) ([35cc9be](https://github.com/ybiquitous/npm-audit-fix-action/commit/35cc9be45f671141c787cbfcea508046bb40aded))
- incorrect updated packages list ([#372](https://github.com/ybiquitous/npm-audit-fix-action/issues/372)) ([7c502cc](https://github.com/ybiquitous/npm-audit-fix-action/commit/7c502ccbcf54561a1979e9ac6eabe62af139e77b))
- remove needless `npm install` ([#371](https://github.com/ybiquitous/npm-audit-fix-action/issues/371)) ([6f268a5](https://github.com/ybiquitous/npm-audit-fix-action/commit/6f268a508986758b6af3541e49a2777842cf81f4))

## [2.1.11](https://github.com/ybiquitous/npm-audit-fix-action/compare/v2.1.10...v2.1.11) (2021-04-05)

### Bug Fixes

- **actions:** fix releasing ([222416c](https://github.com/ybiquitous/npm-audit-fix-action/commit/222416c72907b9e3696bc81aab99273a2f67f61a))

## [2.1.10](https://github.com/ybiquitous/npm-audit-fix-action/compare/v2.1.9...v2.1.10) (2021-04-05)

### Bug Fixes

- **actions:** fix releasing ([cc5f387](https://github.com/ybiquitous/npm-audit-fix-action/commit/cc5f387da2e7a8c88da35dced7e1a4e45c298cf8))

## [2.1.9](https://github.com/ybiquitous/npm-audit-fix-action/compare/v2.1.8...v2.1.9) (2021-04-05)

### Bug Fixes

- **actions:** fix releasing ([#365](https://github.com/ybiquitous/npm-audit-fix-action/issues/365)) ([be44457](https://github.com/ybiquitous/npm-audit-fix-action/commit/be444570f3df1ce1bc172d3605bbf12d4427d402))

## [2.1.8](https://github.com/ybiquitous/npm-audit-fix-action/compare/v2.1.7...v2.1.8) (2021-04-05)

### Reverts

- Revert "ci(actions): change trigger event for update-dist (#361)" ([a88fc76](https://github.com/ybiquitous/npm-audit-fix-action/commit/a88fc76dd26efaf7f33f14146d105ae4638ceb78)), closes [#361](https://github.com/ybiquitous/npm-audit-fix-action/issues/361)

## [2.1.7](https://github.com/ybiquitous/npm-audit-fix-action/compare/v2.1.6...v2.1.7) (2021-04-05)

### Bug Fixes

- **deps:** bump hosted-git-info from 3.0.8 to 4.0.0 ([#341](https://github.com/ybiquitous/npm-audit-fix-action/issues/341)) ([8050e4d](https://github.com/ybiquitous/npm-audit-fix-action/commit/8050e4d05350a9f82af82708a3a55cc3fee6d226))
- **deps:** bump hosted-git-info from 4.0.0 to 4.0.2 ([#350](https://github.com/ybiquitous/npm-audit-fix-action/issues/350)) ([eb8f0bb](https://github.com/ybiquitous/npm-audit-fix-action/commit/eb8f0bbd3285f2aef0b9fa68f8f83b3e7dbf8bf3))

## [2.1.6](https://github.com/ybiquitous/npm-audit-fix-action/compare/v2.1.5...v2.1.6) (2021-01-11)

### Bug Fixes

- **deps:** bump npm from 6.14.8 to 6.14.11 ([#305](https://github.com/ybiquitous/npm-audit-fix-action/issues/305)) ([96f6523](https://github.com/ybiquitous/npm-audit-fix-action/commit/96f652301ced43bcd20bfa7458fe175ad83c69b7))

## [2.1.5](https://github.com/ybiquitous/npm-audit-fix-action/compare/v2.1.4...v2.1.5) (2020-10-19)

### Bug Fixes

- **deps-dev:** bump eslint-config-ybiquitous from 12.0.0 to 12.1.0 ([#249](https://github.com/ybiquitous/npm-audit-fix-action/issues/249)) ([cb67358](https://github.com/ybiquitous/npm-audit-fix-action/commit/cb673587f1d00d9b40eddc8ad2776080a7fb8627))
- **deps:** bump hosted-git-info from 3.0.5 to 3.0.7 ([#256](https://github.com/ybiquitous/npm-audit-fix-action/issues/256)) ([7b275b4](https://github.com/ybiquitous/npm-audit-fix-action/commit/7b275b48342dda47d3a664590b885eaa7a06cc15))

## [2.1.4](https://github.com/ybiquitous/npm-audit-fix-action/compare/v2.1.3...v2.1.4) (2020-09-29)

### Bug Fixes

- **deps:** bump @actions/core from 1.2.5 to 1.2.6 ([#243](https://github.com/ybiquitous/npm-audit-fix-action/issues/243)) ([58898fd](https://github.com/ybiquitous/npm-audit-fix-action/commit/58898fdc94d58c01adad6b87f351f6bff1f941a7))

## [2.1.3](https://github.com/ybiquitous/npm-audit-fix-action/compare/v2.1.2...v2.1.3) (2020-09-15)

### Bug Fixes

- **deps:** bump node-fetch from 2.6.0 to 2.6.1 ([#229](https://github.com/ybiquitous/npm-audit-fix-action/issues/229)) ([5a78a75](https://github.com/ybiquitous/npm-audit-fix-action/commit/5a78a75656e3ed632bbd9537df48a87ad015e08a))

## [2.1.2](https://github.com/ybiquitous/npm-audit-fix-action/compare/v2.1.1...v2.1.2) (2020-09-08)

### Bug Fixes

- use `info()` of `@actions/core` instead of `console.log()` ([#227](https://github.com/ybiquitous/npm-audit-fix-action/issues/227)) ([4941c8b](https://github.com/ybiquitous/npm-audit-fix-action/commit/4941c8b418e8e567a4eaa7b757b0b6ae39ffc3be))

## [2.1.1](https://github.com/ybiquitous/npm-audit-fix-action/compare/v2.1.0...v2.1.1) (2020-08-19)

### Bug Fixes

- **deps:** bump npm from 6.14.7 to 6.14.8 ([#216](https://github.com/ybiquitous/npm-audit-fix-action/issues/216)) ([cd3d5ec](https://github.com/ybiquitous/npm-audit-fix-action/commit/cd3d5ec7bcdd6dd37686da44de7ddd4bf5c30ac4))

## [2.1.0](https://github.com/ybiquitous/npm-audit-fix-action/compare/v2.0.0...v2.1.0) (2020-08-12)

### Features

- improve commit body ([#205](https://github.com/ybiquitous/npm-audit-fix-action/issues/205)) ([223f2bb](https://github.com/ybiquitous/npm-audit-fix-action/commit/223f2bbbf29cb35dd4c9353c425ce53b2e1321ec))

## [2.0.0](https://github.com/ybiquitous/npm-audit-fix-action/compare/v1.3.3...v2.0.0) (2020-08-05)

### ⚠ BREAKING CHANGES

- with.github_token is no longer required and env.GITHUB_TOKEN is ignored.

### Features

- add `github_token` default and remove `env.GITHUB_TOKEN` ([#186](https://github.com/ybiquitous/npm-audit-fix-action/issues/186)) ([8bfd346](https://github.com/ybiquitous/npm-audit-fix-action/commit/8bfd3462e5c7e3f4e39785a03d3e1e975dd4b252))
- change default branch from `master` to `main` ([#190](https://github.com/ybiquitous/npm-audit-fix-action/issues/190)) ([135de4c](https://github.com/ybiquitous/npm-audit-fix-action/commit/135de4ce82cb3827c4748bb30159ea2efbbe3500)), closes [#175](https://github.com/ybiquitous/npm-audit-fix-action/issues/175)
- set default branch automatically ([#192](https://github.com/ybiquitous/npm-audit-fix-action/issues/192)) ([8ab3e33](https://github.com/ybiquitous/npm-audit-fix-action/commit/8ab3e335273ae2aabda3e563ed6a7e77b89b9c75))

### Bug Fixes

- **deps:** bump npm from 6.14.6 to 6.14.7 ([#167](https://github.com/ybiquitous/npm-audit-fix-action/issues/167)) ([239201b](https://github.com/ybiquitous/npm-audit-fix-action/commit/239201b71b5360303a98aa2d1bf6d8a556f9bad2))

### Reverts

- Revert "ci(actions): use `$default-branch` macro" (#170) ([da55314](https://github.com/ybiquitous/npm-audit-fix-action/commit/da55314e2205e37201cd8f5af74f813883c5af7c)), closes [#170](https://github.com/ybiquitous/npm-audit-fix-action/issues/170)

## [1.3.2](https://github.com/ybiquitous/npm-audit-fix-action/compare/v1.3.1...v1.3.2) (2020-07-17)

## [1.3.1](https://github.com/ybiquitous/npm-audit-fix-action/compare/v1.3.0...v1.3.1) (2020-07-17)

## [1.3.0](https://github.com/ybiquitous/npm-audit-fix-action/compare/v1.2.3...v1.3.0) (2020-07-17)

### Features

- add labels option ([#153](https://github.com/ybiquitous/npm-audit-fix-action/issues/153)) ([ebce344](https://github.com/ybiquitous/npm-audit-fix-action/commit/ebce344964256fabfe4c9dc26cd8870d1a148401))
- show the number of packages in PR body ([#161](https://github.com/ybiquitous/npm-audit-fix-action/issues/161)) ([7011bef](https://github.com/ybiquitous/npm-audit-fix-action/commit/7011befd69f57cc0948773a5132958db0b5ec653))
- split column for repo link in PR body ([#163](https://github.com/ybiquitous/npm-audit-fix-action/issues/163)) ([42afd87](https://github.com/ybiquitous/npm-audit-fix-action/commit/42afd87a78ee34ea45985a8186f79b9065073517))

## [1.2.3](https://github.com/ybiquitous/npm-audit-fix-action/compare/v1.2.2...v1.2.3) (2020-07-14)

### Bug Fixes

- **deps:** bump hosted-git-info from 3.0.4 to 3.0.5 ([#148](https://github.com/ybiquitous/npm-audit-fix-action/issues/148)) ([573c38a](https://github.com/ybiquitous/npm-audit-fix-action/commit/573c38a73208c01574faab7e6c21a1a44e638e98))

## [1.2.2](https://github.com/ybiquitous/npm-audit-fix-action/compare/v1.2.1...v1.2.2) (2020-07-12)

### Bug Fixes

- bump npm from 6.14.5 to 6.14.6 ([#145](https://github.com/ybiquitous/npm-audit-fix-action/issues/145)) ([bcb7298](https://github.com/ybiquitous/npm-audit-fix-action/commit/bcb72984423b923d25e33da29caf4bedd0bd2e66))

## [1.2.1](https://github.com/ybiquitous/npm-audit-fix-action/compare/v1.2.0...v1.2.1) (2020-07-04)

### Bug Fixes

- make file and git dependencies work ([#141](https://github.com/ybiquitous/npm-audit-fix-action/issues/141)) ([b6f6339](https://github.com/ybiquitous/npm-audit-fix-action/commit/b6f6339ec0443c762892cc12906b603382ab23b5))

## [1.2.0](https://github.com/ybiquitous/npm-audit-fix-action/compare/v1.1.0...v1.2.0) (2020-06-29)

### Features

- improve pull request body ([#130](https://github.com/ybiquitous/npm-audit-fix-action/issues/130)) ([c7db305](https://github.com/ybiquitous/npm-audit-fix-action/commit/c7db305ed292b072027d09962b34bc23be8e4c8a))

## [1.1.0](https://github.com/ybiquitous/npm-audit-fix-action/compare/v1.0.1...v1.1.0) (2020-05-10)

### Features

- change default `branch` ([#100](https://github.com/ybiquitous/npm-audit-fix-action/issues/100)) ([ff7d6f9](https://github.com/ybiquitous/npm-audit-fix-action/commit/ff7d6f9fe15eceaf0388981706a402c7a7babb60))
- change default `commit_title` ([#95](https://github.com/ybiquitous/npm-audit-fix-action/issues/95)) ([e4e2515](https://github.com/ybiquitous/npm-audit-fix-action/commit/e4e251509e698cb1e1e01d6f458c706c8ce7930c))
- support `GITHUB_TOKEN` env var ([#99](https://github.com/ybiquitous/npm-audit-fix-action/issues/99)) ([689486f](https://github.com/ybiquitous/npm-audit-fix-action/commit/689486f58af3b9d748d297e674cbe51d0ef12637))

### Bug Fixes

- duplicated packages shown ([#105](https://github.com/ybiquitous/npm-audit-fix-action/issues/105)) ([ca2b1c6](https://github.com/ybiquitous/npm-audit-fix-action/commit/ca2b1c6e686e6915fc5c25302b10802ba00d5abb))

## [1.0.1](https://github.com/ybiquitous/npm-audit-fix-action/compare/v1.0.0...v1.0.1) (2020-05-05)

### Bug Fixes

- bump npm from 6.14.4 to 6.14.5 ([#93](https://github.com/ybiquitous/npm-audit-fix-action/issues/93)) ([e08e379](https://github.com/ybiquitous/npm-audit-fix-action/commit/e08e37904ace0c1db85fb54cf685d948486b5b6b))

### Reverts

- Revert "ci: action test on master branch" ([0b7508f](https://github.com/ybiquitous/npm-audit-fix-action/commit/0b7508f5bee344aaeb8628e09e776384eabfefcb))

## [1.0.0](https://github.com/ybiquitous/npm-audit-fix-action/compare/5cd7651e8e526332be12e9c99bdfc390d6d67ca4...v1.0.0) (2020-04-14)

### Features

- add link to author in PR body ([5cd7651](https://github.com/ybiquitous/npm-audit-fix-action/commit/5cd7651e8e526332be12e9c99bdfc390d6d67ca4))
- add repo lint for package ([#34](https://github.com/ybiquitous/npm-audit-fix-action/issues/34)) ([137d190](https://github.com/ybiquitous/npm-audit-fix-action/commit/137d190366e428779952276a4e0df089f653165d))
- bump npm from 6.13.7 to 6.14.1 ([#20](https://github.com/ybiquitous/npm-audit-fix-action/issues/20)) ([92de0fb](https://github.com/ybiquitous/npm-audit-fix-action/commit/92de0fbcd51e8db0f8d49a672e4bedf57841f2b4))
- read `NPM_VERSION` from `package.json` ([#14](https://github.com/ybiquitous/npm-audit-fix-action/issues/14)) ([bfbf2c1](https://github.com/ybiquitous/npm-audit-fix-action/commit/bfbf2c147a7d027185cf762497f9251e456ba8b6))
- update pull request if exist ([#49](https://github.com/ybiquitous/npm-audit-fix-action/issues/49)) ([4b6cf27](https://github.com/ybiquitous/npm-audit-fix-action/commit/4b6cf27f5a498d1d9d087a8ca608d4caf09088aa))

### Bug Fixes

- bump npm from 6.14.1 to 6.14.2 ([#36](https://github.com/ybiquitous/npm-audit-fix-action/issues/36)) ([ad6cf59](https://github.com/ybiquitous/npm-audit-fix-action/commit/ad6cf59c74b04e45bc66a0b87c343a0232a55acb))
- bump npm from 6.14.2 to 6.14.3 ([#42](https://github.com/ybiquitous/npm-audit-fix-action/issues/42)) ([9ab2f5f](https://github.com/ybiquitous/npm-audit-fix-action/commit/9ab2f5fdcc9e2885fa381c4fcd6a3fa36083eadd))
- bump npm from 6.14.3 to 6.14.4 ([#67](https://github.com/ybiquitous/npm-audit-fix-action/issues/67)) ([88c3ff8](https://github.com/ybiquitous/npm-audit-fix-action/commit/88c3ff88c80b5428cdfdc7e758cc143cac5cc9d6))
- check a file change ([#24](https://github.com/ybiquitous/npm-audit-fix-action/issues/24)) ([bf7b066](https://github.com/ybiquitous/npm-audit-fix-action/commit/bf7b066cd11e8a6a324efa4e6d0c61dc04876fba))
- consider no repository URL ([#56](https://github.com/ybiquitous/npm-audit-fix-action/issues/56)) ([5d508a9](https://github.com/ybiquitous/npm-audit-fix-action/commit/5d508a9af35dfdab3ce8bb9666b20b5472da7749))
- error "npm update check failed" ([#22](https://github.com/ybiquitous/npm-audit-fix-action/issues/22)) ([a473e22](https://github.com/ybiquitous/npm-audit-fix-action/commit/a473e22ba44346bc330b866a02f81677dd7415aa))
- generate package-lock.json if not exists ([#17](https://github.com/ybiquitous/npm-audit-fix-action/issues/17)) ([c0bbe65](https://github.com/ybiquitous/npm-audit-fix-action/commit/c0bbe65f7db8601040ab756fa62efd75ed5e3573))
- handle `git diff` exit code ([#25](https://github.com/ybiquitous/npm-audit-fix-action/issues/25)) ([13679aa](https://github.com/ybiquitous/npm-audit-fix-action/commit/13679aadad23a2133661e5a2b2d1b3797c950636))
- invalid pull request body ([#19](https://github.com/ybiquitous/npm-audit-fix-action/issues/19)) ([744b299](https://github.com/ybiquitous/npm-audit-fix-action/commit/744b29973d6f0aac9b85e7e22c6a05886c260b86))
- remove package duplication in PR body ([#71](https://github.com/ybiquitous/npm-audit-fix-action/issues/71)) ([79e9ea5](https://github.com/ybiquitous/npm-audit-fix-action/commit/79e9ea5489614933a996f2297fc0b63c109417b4))
- replace `npm config set` with direct CLI options ([#18](https://github.com/ybiquitous/npm-audit-fix-action/issues/18)) ([cacdfdc](https://github.com/ybiquitous/npm-audit-fix-action/commit/cacdfdc9cc8d1a687f759f279610399a4ef8be74))
- shorten wordy link text in PR body ([#28](https://github.com/ybiquitous/npm-audit-fix-action/issues/28)) ([366e986](https://github.com/ybiquitous/npm-audit-fix-action/commit/366e9860824104bdf5543aa85b82926fc5d6ca61))
- sort packages by name ([#45](https://github.com/ybiquitous/npm-audit-fix-action/issues/45)) ([afa88a6](https://github.com/ybiquitous/npm-audit-fix-action/commit/afa88a6bb2a76a4dc8380c44a4db7907afdd676f))
