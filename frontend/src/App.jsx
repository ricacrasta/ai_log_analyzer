import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("log", file);

    const res = await axios.post("http://localhost:5000/upload", formData);
    setResult(res.data);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">AI Log Analyzer</h1>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button
        onClick={uploadFile}
        className="bg-blue-500 text-white px-4 py-2 mt-2"
      >
        Upload
      </button>

      {result && (
        <div className="mt-4">
          <h2>Summary</h2>
          <p>{result.summary}</p>

          <h2>Similar Issue</h2>
          <p>{result.similar}</p>

          <h2>Fix Suggestion</h2>
          <p>{result.fix}</p>
        </div>
      )}
    </div>
  );
}