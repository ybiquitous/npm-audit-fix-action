# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.1.7](https://github.com/ybiquitous/npm-audit-fix-action/compare/v2.1.6...v2.1.7) (2021-04-05)

### Bug Fixes

- **deps:** bump hosted-git-info from 3.0.8 to 4.0.0 ([#341](https://github.com/ybiquitous/npm-audit-fix-action/issues/341)) ([8050e4d](https://github.com/ybiquitous/npm-audit-fix-action/commit/8050e4d05350a9f82af82708a3a55cc3fee6d226))
- **deps:** bump hosted-git-info from 4.0.0 to 4.0.2 ([#350](https://github.com/ybiquitous/npm-audit-fix-action/issues/350)) ([eb8f0bb](https://github.com/ybiquitous/npm-audit-fix-action/commit/eb8f0bbd3285f2aef0b9fa68f8f83b3e7dbf8bf3))

### [2.1.6](https://github.com/ybiquitous/npm-audit-fix-action/compare/v2.1.5...v2.1.6) (2021-01-11)

### Bug Fixes

- **deps:** bump npm from 6.14.8 to 6.14.11 ([#305](https://github.com/ybiquitous/npm-audit-fix-action/issues/305)) ([96f6523](https://github.com/ybiquitous/npm-audit-fix-action/commit/96f652301ced43bcd20bfa7458fe175ad83c69b7))

### [2.1.5](https://github.com/ybiquitous/npm-audit-fix-action/compare/v2.1.4...v2.1.5) (2020-10-19)

### Bug Fixes

- **deps:** bump hosted-git-info from 3.0.5 to 3.0.7 ([#256](https://github.com/ybiquitous/npm-audit-fix-action/issues/256)) ([7b275b4](https://github.com/ybiquitous/npm-audit-fix-action/commit/7b275b48342dda47d3a664590b885eaa7a06cc15))
- **deps-dev:** bump eslint-config-ybiquitous from 12.0.0 to 12.1.0 ([#249](https://github.com/ybiquitous/npm-audit-fix-action/issues/249)) ([cb67358](https://github.com/ybiquitous/npm-audit-fix-action/commit/cb673587f1d00d9b40eddc8ad2776080a7fb8627))

### [2.1.4](https://github.com/ybiquitous/npm-audit-fix-action/compare/v2.1.3...v2.1.4) (2020-09-29)

### Bug Fixes

- **deps:** bump @actions/core from 1.2.5 to 1.2.6 ([#243](https://github.com/ybiquitous/npm-audit-fix-action/issues/243)) ([58898fd](https://github.com/ybiquitous/npm-audit-fix-action/commit/58898fdc94d58c01adad6b87f351f6bff1f941a7))

### [2.1.3](https://github.com/ybiquitous/npm-audit-fix-action/compare/v2.1.2...v2.1.3) (2020-09-15)

### Bug Fixes

- **deps:** bump node-fetch from 2.6.0 to 2.6.1 ([#229](https://github.com/ybiquitous/npm-audit-fix-action/issues/229)) ([5a78a75](https://github.com/ybiquitous/npm-audit-fix-action/commit/5a78a75656e3ed632bbd9537df48a87ad015e08a))

### [2.1.2](https://github.com/ybiquitous/npm-audit-fix-action/compare/v2.1.1...v2.1.2) (2020-09-08)

### Bug Fixes

- use `info()` of `@actions/core` instead of `console.log()` ([#227](https://github.com/ybiquitous/npm-audit-fix-action/issues/227)) ([4941c8b](https://github.com/ybiquitous/npm-audit-fix-action/commit/4941c8b418e8e567a4eaa7b757b0b6ae39ffc3be))

### [2.1.1](https://github.com/ybiquitous/npm-audit-fix-action/compare/v2.1.0...v2.1.1) (2020-08-19)

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

### [1.3.3](https://github.com/ybiquitous/npm-audit-fix-action/compare/v1.3.2...v1.3.3) (2020-07-22)

### Bug Fixes

- **deps:** bump npm from 6.14.6 to 6.14.7 ([#167](https://github.com/ybiquitous/npm-audit-fix-action/issues/167)) ([239201b](https://github.com/ybiquitous/npm-audit-fix-action/commit/239201b71b5360303a98aa2d1bf6d8a556f9bad2))

### [1.3.2](https://github.com/ybiquitous/npm-audit-fix-action/compare/v1.3.1...v1.3.2) (2020-07-17)

### [1.3.1](https://github.com/ybiquitous/npm-audit-fix-action/compare/v1.3.0...v1.3.1) (2020-07-17)

## [1.3.0](https://github.com/ybiquitous/npm-audit-fix-action/compare/v1.2.3...v1.3.0) (2020-07-17)

### Features

- add labels option ([#153](https://github.com/ybiquitous/npm-audit-fix-action/issues/153)) ([ebce344](https://github.com/ybiquitous/npm-audit-fix-action/commit/ebce344964256fabfe4c9dc26cd8870d1a148401))
- show the number of packages in PR body ([#161](https://github.com/ybiquitous/npm-audit-fix-action/issues/161)) ([7011bef](https://github.com/ybiquitous/npm-audit-fix-action/commit/7011befd69f57cc0948773a5132958db0b5ec653))
- split column for repo link in PR body ([#163](https://github.com/ybiquitous/npm-audit-fix-action/issues/163)) ([42afd87](https://github.com/ybiquitous/npm-audit-fix-action/commit/42afd87a78ee34ea45985a8186f79b9065073517))

### [1.2.3](https://github.com/ybiquitous/npm-audit-fix-action/compare/v1.2.2...v1.2.3) (2020-07-14)

### Bug Fixes

- **deps:** bump hosted-git-info from 3.0.4 to 3.0.5 ([#148](https://github.com/ybiquitous/npm-audit-fix-action/issues/148)) ([573c38a](https://github.com/ybiquitous/npm-audit-fix-action/commit/573c38a73208c01574faab7e6c21a1a44e638e98))

### [1.2.2](https://github.com/ybiquitous/npm-audit-fix-action/compare/v1.2.1...v1.2.2) (2020-07-12)

### Bug Fixes

- bump npm from 6.14.5 to 6.14.6 ([#145](https://github.com/ybiquitous/npm-audit-fix-action/issues/145)) ([bcb7298](https://github.com/ybiquitous/npm-audit-fix-action/commit/bcb72984423b923d25e33da29caf4bedd0bd2e66))

### [1.2.1](https://github.com/ybiquitous/npm-audit-fix-action/compare/v1.2.0...v1.2.1) (2020-07-04)

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

### [1.0.1](https://github.com/ybiquitous/npm-audit-fix-action/compare/v1.0.0...v1.0.1) (2020-05-05)

### Bug Fixes

- bump npm from 6.14.4 to 6.14.5 ([#93](https://github.com/ybiquitous/npm-audit-fix-action/issues/93)) ([e08e379](https://github.com/ybiquitous/npm-audit-fix-action/commit/e08e37904ace0c1db85fb54cf685d948486b5b6b))

## 1.0.0 (2020-04-14)

Initial release.
