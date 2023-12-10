export interface IUserData {
  login: string;
  repos_url: string;
  avatar_url: string;
  bio: string;
}

export interface IUserRepos {
  name: string;
  html_url: string;
  description: string;
  id: number;
}

export interface IStarredRepos {
  id: number;
  name: string;
  description: string;
  owner: IOwner
}

export interface IOwner {
  login: string;
  avatar_url: string;
}
