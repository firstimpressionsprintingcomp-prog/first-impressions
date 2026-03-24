
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Header(){
  return (
    <header style={{display:"flex",justifyContent:"space-between",padding:"16px",borderBottom:"1px solid #ddd"}}>
      <Link to="/">First Impressions</Link>
      <div style={{display:"flex",gap:"15px"}}>
        <Link to="/">Home</Link>
        <Link to="/pricing">Pricing</Link>
        <Link to="/contact">Quote</Link>
      </div>
    </header>
  );
}

function Home(){
  return (
    <div style={{padding:"40px",textAlign:"center"}}>
      <h1>Additive Manufacturing Made Easy</h1>
      <p>Upload STL files and get instant estimates.</p>
    </div>
  );
}

function Pricing(){
  return (
    <div style={{padding:"40px"}}>
      <h2>Pricing</h2>
      <p>Simple pricing based on file size + materials.</p>
    </div>
  );
}

function Contact(){
  return (
    <div style={{padding:"40px"}}>
      <h2>Request a Quote</h2>
      <form action="https://formspree.io/f/xwvrgnll" method="POST" encType="multipart/form-data">
        <input name="name" placeholder="Name" required /><br/><br/>
        <input name="email" type="email" placeholder="Email" required /><br/><br/>
        <input type="file" name="files" multiple /><br/><br/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default function App(){
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/pricing" element={<Pricing/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Routes>
    </Router>
  );
}
