import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RepositoryDetails: React.FC = () => {
  const { repoName, username } = useParams();
  console.log(repoName);
  const [repo, setRepo] = useState<any>({});
  const [branches, setBranches] = useState<any[]>([]);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${username}/${repoName}`)
      .then((response) => response.json())
      .then((data) => setRepo(data))
      .catch((error) => console.error('Error fetching repo data', error));

    fetch(`https://api.github.com/repos/${username}/${repoName}/branches`)
      .then((response) => response.json())
      .then((data) => setBranches(data))
      .catch((error) => console.error('Error fetching repo branches data', error));
  }, [username, repoName]);

  return (
    <div>
      <h1>{repo.name}</h1>
      <p>
        Owner:
        {repo.owner?.login}
      </p>
      <h2>Branches</h2>
      <ul>
        {branches.map((branch) => (
          <li key={branch.name}>{branch.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RepositoryDetails;
