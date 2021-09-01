
import './App.css';
import AuthProvider from './context/auth';
import User from './components/User.jsx'
// import SignInForm from './components/SignInForm.jsx'

function App() {
  return (
    <>
      <AuthProvider>
        <User />
      </AuthProvider>
    </>
  );
}

export default App;
