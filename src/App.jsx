import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';
import Header from './components/Header';
import UserForm from './components/UserForm';


const App = () => {
  return (
    <>
      <Header />
      <UserForm />
      <Footer />
    </>
  );
};

export default App;
