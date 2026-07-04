import { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "../dashboard.css";

function Dashboard() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadPDF = async () => {
    if (!file) {
      alert("Please choose a PDF first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://127.0.0.1:8000/upload",
        formData
      );

      if (res.data.error) {
        alert(res.data.error);
      } else {
        setSummary(res.data.summary);
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    if (!summary) {
      alert("No report available.");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Nexus AI Report", 20, 20);

    doc.setFontSize(11);

    const lines = doc.splitTextToSize(summary, 170);

    doc.text(lines, 20, 35);

    doc.save("Nexus_AI_Report.pdf");
  };

  const copyReport = async () => {
    if (!summary) {
      alert("No report available.");
      return;
    }

    await navigator.clipboard.writeText(summary);

    alert("Report copied!");
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="dashboard">

      <div className="topbar">

        <h1>🧠 Nexus AI Dashboard</h1>

        <button onClick={logout}>
          Logout
        </button>

      </div>

      <div className="cards">

        <div className="card">
          <h3>Documents</h3>
          <h2>{file ? 1 : 0}</h2>
        </div>

        <div className="card">
          <h3>AI Analysis</h3>
          <h2>{summary ? 1 : 0}</h2>
        </div>

        <div className="card">
          <h3>Status</h3>
          <h2>{loading ? "Running..." : "Ready ✅"}</h2>
        </div>

      </div>

      <div className="uploadBox">

        <h2>Upload PDF</h2>

        <label className="uploadArea">

          <input
            hidden
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <div className="uploadContent">

            <h1>📄</h1>

            <h3>Click to Upload PDF</h3>

            <p>Supported Format : PDF</p>

            {file && (
              <p className="filename">
                ✅ {file.name}
              </p>
            )}

          </div>

        </label>

        <button
          className="analyzeBtn"
          onClick={uploadPDF}
        >
          🚀 Analyze PDF
        </button>

      </div>

      {loading && (

        <div className="loadingBox">

          <h3>🧠 Reading document...</h3>

          <h3>⚡ Understanding content...</h3>

          <h3>📄 Generating summary...</h3>

          <h3>🎯 Finding key insights...</h3>

        </div>

      )}

      {summary && (

        <div className="resultBox">

          <div className="resultHeader">

            <h2>AI Analysis</h2>

            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >

              <button
                className="downloadBtn"
                onClick={downloadReport}
              >
                ⬇ Download
              </button>

              <button
                className="downloadBtn"
                onClick={copyReport}
              >
                📋 Copy
              </button>

            </div>

          </div>

          <pre>{summary}</pre>

        </div>

      )}

    </div>
  );
}

export default Dashboard;