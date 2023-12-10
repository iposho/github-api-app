export interface IUserRepo {
  name: string;
  html_url: string;
  description: string;
  id: number;
  full_name: string;
}

export interface IStarredRepo {
  id: number;
  name: string;
  description: string;
  full_name: string;
  owner: IOwner
}

export interface IOwner {
  login: string;
  avatar_url: string;
}

export interface IBranch {
  commit: ICommit;
  name: string;
}

export interface ICommit {
  sha: string;
}
