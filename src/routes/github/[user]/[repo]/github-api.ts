import type { paths } from "@octokit/openapi-types";

type Fetch = typeof fetch;
type OrgRepoResponse =
  paths["/repos/{owner}/{repo}"]["get"]["responses"]["200"]["content"]["application/json"];

export class GithubApi {
  constructor(
    private token: string | undefined,
    // private fetch: Fetch
  ) {}

  async getRepository(user: String, repo: string) {
    const headers: HeadersInit = {
      "User-Agent": "Qwik Workshop",
      "X-Github-Api-Version": "2022-11-28",
    };

    if (this.token) {
      headers["Authorization"] = "Bearer" + this.token;
    }

    const response = await fetch(
      `https://api.github.com/repos/${user}/${repo}`,
      {
        headers,
      }
    );
    const repository = (await response.json()) as OrgRepoResponse;
    return repository;
  }
}
