import { useState } from "react";
import api from "./api/api";

function Dev() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");

  const ALLOWED_TYPES = ["image/png", "image/jpg", "image/jpeg"];
  const MAX_SIZE = 5 * 1024 * 1024;

  const handleChange = (e) => {
    const files = e.target.files[0];

    if (!ALLOWED_TYPES.includes(files.type))
      alert("Please enter only PNG or JPG files");
    else if (files.size > MAX_SIZE) alert("File too big");
    else setFile(files);
  };

  const handleSubmit = async () => {
    const data = new FormData();

    if (file !== null) {
      try {
        data.append("file", file);

        const response = await api.post("/dev", data);
        console.log(response);
        alert("success");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please Select A File");
    }
  };
  return (
    <div>
      <input type="file" onChange={handleChange} />
      <input
        type="text"
        name=""
        id=""
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSubmit}>Upload</button>
    </div>
  );
}

export default Dev;
