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
            Powering AI Solutions Worldwide
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From our headquarters in Hyderabad, we deliver cutting-edge AI and computer vision 
            solutions to clients across the globe, transforming industries and driving innovation.
          </p>
        </div>
        
        <Suspense fallback={<GlobeLoader />}>
          <Globe3D />
        </Suspense>
        
        {/* Additional info cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="glass-card p-6 rounded-xl text-center tilt-card">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Global Support Coverage</div>
          </div>
          <div className="glass-card p-6 rounded-xl text-center tilt-card">
            <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-sm text-muted-foreground">Service Uptime</div>
          </div>
          <div className="glass-card p-6 rounded-xl text-center tilt-card">
            <div className="text-3xl font-bold text-primary mb-2">3</div>
            <div className="text-sm text-muted-foreground">Regional Offices</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobeSection;
