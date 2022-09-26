import '../scss/App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Portfolio from './Portfolio';
import SigninUser from './admin/SigninUser';
import SignupUser from './admin/SignupUser';
import AdminPanel from './admin/AdminPanel';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/portfolio-admin" element={<AdminPanel itemType="project" />} />
      <Route path="/portfolio-admin/projects" element={<AdminPanel itemType="project" />} />
      <Route path="/portfolio-admin/tools" element={<AdminPanel itemType="tool" />} />
      <Route path="/portfolio-admin/profile" element={<AdminPanel itemType="profile" />} />
      <Route path="/portfolio-admin/signin" element={<SigninUser />} />
      <Route path="/portfolio-admin/signup" element={<SignupUser />} />
      <Route path="/portfolio-admin/confirm/:confCode" element={<SigninUser />} />
      <Route path="*" element={<Portfolio />} />
    </Routes>
  </BrowserRouter>
);

export default App;
