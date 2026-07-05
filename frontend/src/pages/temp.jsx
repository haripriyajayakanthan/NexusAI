import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (
    <div className="app">

      <nav className="navbar">

        <div className="logo">
          🧠 Nexus AI
        </div>

        <div className="nav-links">

          <a href="#">Home</a>
          <a href="#">Features</a>
          <a href="#">About</a>

          <button
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

        </div>

      </nav>

      <section className="hero">

        <div className="hero-left">

          <span className="badge">
            🚀 AI Powered Document Intelligence
          </span>

          <h1>
            Read.
            <br />
            Reason.
            <br />
            <span>Act.</span>
          </h1>

          <p>
            Upload any PDF and let Nexus AI understand,
            summarize, extract insights and generate
            actionable results instantly.
          </p>

          <button
            className="start-btn"
            onClick={() => navigate("/login")}
          >
            Get Started →
          </button>

        </div>

        <div className="hero-right">

          <div className="terminal">

            <div className="terminal-header">

              <div className="circle red"></div>
              <div className="circle yellow"></div>
              <div className="circle green"></div>

            </div>

            <div className="terminal-body">

              <p>📄 Uploading report.pdf</p>
              <p>🧠 AI Reading...</p>
              <p>⚡ Extracting Insights...</p>
              <p>✅ Summary Ready</p>
              <p>🎯 Action Plan Generated</p>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;