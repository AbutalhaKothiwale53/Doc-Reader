import React, { useState } from "react";
import "../App.css";
import axios from "axios";

const FileUpoad = () => {
 
    const [file, setFile] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState("");

  const inputHandler = (e) => {
    setFile(e.target.files[0]);
  };
  const handleUpload = () => {
    if (!file) {
      setProgress(prevState => {
        return {...prevState, started: true}
      })
      alert("No Files Selected! Please Select a file");
      return;
    }

    const fd = new FormData();
    fd.append("file", file);
    setMsg("Uploading...");
  };

  axios
    .post("http://httpbin.org/post", {
      onUploadProgress: (ProgressEvent) => {
        setProgress(prevState => {
          return {...prevState, pc: ProgressEvent.progress*100 }
        });
        console.log(ProgressEvent.progress * 100);
      },
      headers: {
        CustomHeader: "value",
      },
    })
    .then((res) => {
      setMsg("Upload Success");
      console.log(res.data);
    })
    .catch((err) => {
      setMsg("Error");
      console.log(err);
    });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Upload Files</h1>
        <input onChange={inputHandler} type="file" /> <br />
        <button type="submit" onClick={handleUpload}>
          Upload
        </button>
      </header>

      {progress.started && <progress max="100" value={progress.pc}></progress>}
      {msg && <span>{msg}</span>}
    </div>
  );
  
}

export default FileUpoad