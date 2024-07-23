import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import './Media-queries.css';
import Topbar from './components/body/Topbar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className='main-container'>
      <Sidebar />
      <div className='main-content'>
        <div className='content-container'>
          <Topbar />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
