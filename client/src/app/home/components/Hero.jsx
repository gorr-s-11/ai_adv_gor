export const Hero = () => {
    return (
    <section className="hero">
        <h2 className="hero-title">Welcome Home</h2>
        <p className="hero-text">
          Build something beautiful with Next.js and clean CSS.
        </p>
        <div className="hero-buttons">
          <button className="btn btn-primary">Get Started</button>
          <button className="btn btn-secondary">Learn More</button>
        </div>

      <div className="cards">
        <div className="card">
          <h3>Fast</h3>
          <p>Optimized performance out of the box.</p>
        </div>
        <div className="card">
          <h3>Simple</h3>
          <p>Clean APIs and easy to reason about.</p>
        </div>
        <div className="card">
          <h3>Scalable</h3>
          <p>Grows with your project, from small to large.</p>
        </div>
        </div>
      
      </section>

    );

};