import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import UserProfile from './pages/UserProfile';
import StarredRepos from './pages/StarredRepos';
import RepositoryDetails from './pages/RepositoryDetails';

import Layout from './components/Layout';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/:username/:repoName" element={<RepositoryDetails />} />
        <Route path="/:username/starred" element={<StarredRepos />} />
        <Route path="/:username" element={<UserProfile />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Layout>
  );
}

export default App;
