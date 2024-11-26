import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Explorer from './components/Explorer';


const App = () => {
  return (
    <>
      <Header />
      <main>
        <Explorer />
      </main>
      <Footer />
    </>
  );
};

export default App;
