import React , {useState, useEffect} from 'react';
import {FaCamera} from  'react-icons/fa'
import axios from 'axios'
import './Upload.css'

const Upload = () => {

    const [resultText, setResultText] = useState(null);
    const [file, setFile] = useState(null);
    const [error, setError] = useState(false)


    if (file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
    }
    const ScanImg = async() => {
        
    if (file) {
        const data = new FormData();
        
        
        data.append("file", file);
    
        const res = await axios.post("http://localhost:5000/img-upload", data);
        console.log(res.data);
        setResultText(res.data);
        setFile(null);
        setError(false)
          }

          else {
             setError(true)
          }
    }
return (
    
    
<div className="upload-page">
    <div className="upload-section">
       <div className="img-upload">
    <label  htmlFor="fileInput">
 Select Image
                      <i className="writeIcon"> <FaCamera /></i>  
    <input type="file" className="file-input" style={{display: "none"}}  id ="fileInput"  name="file" onChange={(e) => setFile(e.target.files[0])}/>
                    </label>

      {file && ( <img src={URL.createObjectURL(file)} className="writeImg"  alt=""/>)}
</div>

<button className="submit-button" onClick={ScanImg}>Scan </button>
    </div>
    {error && <p className="error">Please select a photo</p>}
    <div className="results-section">
        <textarea className="text-result" value={resultText} />
    </div>
</div>
   

)
}
export default Upload;