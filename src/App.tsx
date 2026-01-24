import { Layout } from './components/layout/Layout';

function App() {
  return (
    <Layout>
      <div className="space-y-32 pb-20">
        <section id="home" className="h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-30 animate-pulse" />
          <div className="z-10 text-center">
            <h1 className="text-6xl font-bold mb-4">
              <span className="text-gradient">Abhishek Sinha</span>
            </h1>
            <p className="text-xl text-muted mb-8">Full Stack & Mobile Developer</p>
            <div className="flex gap-4 justify-center">
               <button className="px-6 py-3 bg-primary/10 border border-primary/50 rounded-lg text-primary hover:bg-primary/20 transition-all font-medium backdrop-blur-sm">View Projects</button>
               <button className="px-6 py-3 border border-white/10 rounded-lg hover:bg-white/5 transition-all font-medium backdrop-blur-sm">Contact Me</button>
            </div>
          </div>
        </section>

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
