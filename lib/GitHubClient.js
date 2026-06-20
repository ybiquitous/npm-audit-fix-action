import { getOctokit } from "@actions/github";

export default class GitHubClient {
  /**
   * @param {{ token: string, repository: string }} params
   */
  constructor({ token, repository }) {
    const [owner, repo] = repository.split("/", 2);
    if (!owner || !repo) {
      throw new TypeError(`invalid repository: "${repository}"`);
    }
    this.octokit = getOctokit(token);
    this.owner = owner;
    this.repo = repo;
  }

  /**
   * @template T
   * @param {Record<string, unknown> | undefined} params
   * @returns {T}
   */
  #scoped(params = {}) {
    return /** @type {T} */ ({ owner: this.owner, repo: this.repo, ...params });
  }

  /** @param {OctokitParams<Octokit["rest"]["repos"]["get"]>} params */
  getRepository(params = {}) {
    return this.octokit.rest.repos.get(this.#scoped(params));
  }

  /** @param {OctokitParams<Octokit["rest"]["pulls"]["list"]>} params */
  listPullRequest(params) {
    return this.octokit.rest.pulls.list(this.#scoped(params));
  }

  /** @param {OctokitParams<Octokit["rest"]["pulls"]["create"]>} params */
  createPullRequest(params) {
    return this.octokit.rest.pulls.create(this.#scoped(params));
  }

  /** @param {OctokitParams<Octokit["rest"]["pulls"]["update"]>} params */
  updatePullRequest(params) {
    return this.octokit.rest.pulls.update(this.#scoped(params));
  }

  /** @param {OctokitParams<Octokit["rest"]["issues"]["addLabels"]>} params */
  addLabels(params) {
    return this.octokit.rest.issues.addLabels(this.#scoped(params));
  }

  /** @param {OctokitParams<Octokit["rest"]["issues"]["addAssignees"]>} params */
  addAssignees(params) {
    return this.octokit.rest.issues.addAssignees(this.#scoped(params));
  }

  /** @param {OctokitParams<Octokit["rest"]["git"]["getRef"]>} params */
  getRef(params) {
    return this.octokit.rest.git.getRef(this.#scoped(params));
  }

  /** @param {OctokitParams<Octokit["rest"]["git"]["createRef"]>} params */
  createRef(params) {
    return this.octokit.rest.git.createRef(this.#scoped(params));
  }

  /** @param {OctokitParams<Octokit["rest"]["git"]["updateRef"]>} params */
  updateRef(params) {
    return this.octokit.rest.git.updateRef(this.#scoped(params));
  }

  /** @param {OctokitParams<Octokit["rest"]["git"]["createTree"]>} params */
  createTree(params) {
    return this.octokit.rest.git.createTree(this.#scoped(params));
  }

  /** @param {OctokitParams<Octokit["rest"]["git"]["createCommit"]>} params */
  createCommit(params) {
    return this.octokit.rest.git.createCommit(this.#scoped(params));
  }
}
