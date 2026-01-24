import { Layout } from './components/layout/Layout';
import { Hero } from './components/sections/Hero';

function App() {
  return (
    <Layout>
      <div className="space-y-32 pb-20">
        <Hero />

        <section id="about" className="min-h-screen container mx-auto px-4 flex items-center justify-center">
          <h2 className="text-4xl font-bold">About Section</h2>
        </section>
        
        <section id="skills" className="min-h-screen container mx-auto px-4 flex items-center justify-center">
           <h2 className="text-4xl font-bold">Skills Section</h2>
        </section>

         <section id="services" className="min-h-screen container mx-auto px-4 flex items-center justify-center">
           <h2 className="text-4xl font-bold">Services Section</h2>
        </section>

         <section id="projects" className="min-h-screen container mx-auto px-4 flex items-center justify-center">
           <h2 className="text-4xl font-bold">Projects Section</h2>
        </section>

         <section id="contact" className="min-h-screen container mx-auto px-4 flex items-center justify-center">
           <h2 className="text-4xl font-bold">Contact Section</h2>
        </section>
      </div>
    </Layout>
  );
}

export default App;
