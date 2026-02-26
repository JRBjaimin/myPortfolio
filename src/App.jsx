import './index.css';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Contact from './sections/Contact';

function App() {
  return (
    <>
      {/* Hairline column grid — the signature mindjoin background */}
      <div className="page-grid" aria-hidden="true" >
        <div className="page-grid__col" />
        <div className="page-grid__col" />
        <div className="page-grid__col" />
        <div className="page-grid__col" />
      </div>

      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </>
  );
}

export default App;
