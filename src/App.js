import './App.css';
import { QRCodeCanvas } from 'qrcode.react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function App() {
  const [generatingData,setGeneratingData] = useState('qr-code-generator');
  //rtg means ready to generate
  const [rtg,setRtg] = useState('');
  const downloadQRCode = () => {
    // Generate download with use canvas and stream
    const canvas = document.getElementById("qr-gen");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${generatingData}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  const generateQrCode = () =>{
    sessionStorage.setItem('rtg',JSON.stringify(rtg));
    setGeneratingData(rtg);
  }
  useEffect(()=>{
    const session  =   sessionStorage.getItem('rtg');
    setGeneratingData(JSON.parse(session));
  },[]);
  return (
    <div className="App">
      <Container>
     <h3>Qr Code Generator</h3>
     <div className='m-4'>
     <QRCodeCanvas id="qr-gen" value={generatingData}/>
     <br />
     </div>
     <button className='btn btn-success' onClick={downloadQRCode}>
          Download QR Code
        </button>
    <div className='mt-4'>
    

      <Row >
        <Col md={4} ></Col>
        <Col xs={12} md={4}  >
        <InputGroup className="mb-3">
        <Form.Control
          placeholder="Generate qr code"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={e=>setRtg(e.target.value)}
        />
        <button className='btn btn-primary' onClick={generateQrCode}>Generate</button>
      </InputGroup>
        </Col>
        <Col md={4} ></Col>

      </Row>

    </div>
    </Container>
    </div> 
  );
}

export default App;
