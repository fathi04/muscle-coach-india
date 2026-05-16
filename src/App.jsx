// client/src/App.jsx
import Home from './pages/Home';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';

function App() {
  const path = window.location.pathname;
  
  if (path === '/admin') {
    return <Admin />;
  }
  
  if (path === '/dashboard') {
    return <Dashboard />;
  }
  
  return <Home />;
}

export default App;