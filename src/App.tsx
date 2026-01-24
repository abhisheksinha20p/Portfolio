import { Layout } from './components/layout/Layout';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Services } from './components/sections/Services';
import { Projects } from './components/sections/Projects';
import { Contact } from './components/sections/Contact';

function App() {
  return (
    <Layout>
      <div className="space-y-0 pb-20">
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Contact />
      </div>
    </Layout>
  );
}

export default App;
