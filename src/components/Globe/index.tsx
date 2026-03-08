import { lazy, Suspense } from 'react';

const Globe3D = lazy(() => import('./Globe3D'));

const GlobeLoader = () => (
  <div className="w-full h-[500px] md:h-[600px] rounded-2xl bg-gradient-to-b from-background to-primary/5 flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
      <p className="text-muted-foreground">Loading 3D Globe...</p>
    </div>
  </div>
);

const GlobeSection = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Global Reach
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Presence Across India & Beyond
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            With our registered office in Haryana and chair offices in Noida and Kolkata,
            we deliver AI and computer vision solutions to clients across India and internationally.
          </p>
        </div>
        
        <Suspense fallback={<GlobeLoader />}>
          <Globe3D />
        </Suspense>
        
        {/* Additional info cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="glass-card p-6 rounded-xl text-center">
            <div className="text-lg font-bold text-primary mb-1">Registered Office</div>
            <div className="text-sm text-muted-foreground">166A, Village Malra Sarai, Lawan, Mahendragarh - 123029, Haryana</div>
          </div>
          <div className="glass-card p-6 rounded-xl text-center">
            <div className="text-lg font-bold text-primary mb-1">Chair Office — Noida</div>
            <div className="text-sm text-muted-foreground">14th Avenue, Gaur City, Noida, Uttar Pradesh</div>
          </div>
          <div className="glass-card p-6 rounded-xl text-center">
            <div className="text-lg font-bold text-primary mb-1">Chair Office — Kolkata</div>
            <div className="text-sm text-muted-foreground">69, S K Deb Road, Ujjas Condovelle, Building 20, Flat 101, Kolkata - 700048</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobeSection;
