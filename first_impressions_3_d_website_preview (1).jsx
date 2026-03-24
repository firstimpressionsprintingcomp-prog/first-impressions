import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const linkClass = (path) => `cursor-pointer ${location.pathname===path?"text-green-600 font-semibold":""}`;

  return (
    <header className="flex items-center justify-between px-8 py-4 border-b bg-white sticky top-0">
      <Link to="/" className="flex gap-3 items-center">
        <div className="h-10 w-10 bg-green-600 text-white flex items-center justify-center rounded-full font-bold">FI</div>
        <span className="font-semibold">First Impressions</span>
      </Link>
      <div className="flex gap-6 text-sm">
        <Link to="/" className={linkClass("/")}>Home</Link>
        <Link to="/services" className={linkClass("/services")}>Who We Serve</Link>
        <Link to="/process" className={linkClass("/process")}>Process</Link>
        <Link to="/pricing" className={linkClass("/pricing")}>Pricing</Link>
        <Link to="/about" className={linkClass("/about")}>About</Link>
        <Link to="/contact" className={linkClass("/contact")}>Quote</Link>
      </div>
    </header>
  );
}

function Footer(){
  return (
    <footer className="mt-16 border-t p-8 text-center text-sm text-gray-600">
      <p className="font-semibold">First Impressions</p>
      <p>3D Printing & Additive Manufacturing Services</p>
      <p className="mt-2">Anderson, Indiana</p>
      <p>Email: contact@firstimpressions3d.com</p>
    </footer>
  );
}

function Home(){
  return (
    <section className="p-10 text-center">
      <motion.h1 initial={{opacity:0}} animate={{opacity:1}} className="text-4xl font-bold">
        Additive Manufacturing Made Easy
      </motion.h1>
      <p className="mt-4 text-gray-600">Upload STL files and get instant estimates.</p>
    </section>
  );
}

function Pricing(){
  return (
    <section className="p-10 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Pricing</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 border rounded-xl">
          <h3 className="font-semibold mb-2">Base Pricing</h3>
          <p className="text-sm text-gray-600">$10 per estimated unit (based on file size)</p>
          <p className="mt-2">Minimum Order: $20</p>
        </div>
        <div className="p-6 border rounded-xl">
          <h3 className="font-semibold mb-2">Material Multipliers</h3>
          <ul className="text-sm text-gray-600">
            <li>PLA: 1x</li>
            <li>ABS: 1.2x</li>
            <li>PETG: 1.3x</li>
            <li>Nylon: 1.6x</li>
          </ul>
        </div>
        <div className="p-6 border rounded-xl">
          <h3 className="font-semibold mb-2">Rush Orders</h3>
          <p className="text-sm text-gray-600">+50% for expedited turnaround</p>
        </div>
      </div>
    </section>
  );
}

function Contact(){
  const [files,setFiles]=useState([]);
  const [material,setMaterial]=useState("PLA");
  const [rush,setRush]=useState(false);
  const [price,setPrice]=useState(0);

  const materialRates={ PLA:1, ABS:1.2, PETG:1.3, Nylon:1.6 };

  useEffect(()=>{
    let base=0;
    files.forEach(f=>{
      const volumeEstimate=f.size/1000000;
      base+=volumeEstimate*10;
    });
    base*=materialRates[material] || 1;
    if(rush) base*=1.5;
    if(base>0 && base<20) base=20;
    setPrice(Math.round(base));
  },[files,material,rush]);

  const handleFiles=(e)=>{
    const selected=Array.from(e.target.files);
    setFiles(selected);
  };

  return (
    <section className="p-10 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Request a Quote</h2>

      <form 
        action="https://formspree.io/f/xwvrgnll" 
        method="POST" 
        encType="multipart/form-data"
        className="grid gap-4"
      >
        <input name="name" placeholder="Name" required className="p-3 border rounded"/>
        <input name="email" type="email" placeholder="Email" required className="p-3 border rounded"/>

        <select name="material" value={material} onChange={e=>setMaterial(e.target.value)} className="p-3 border rounded">
          {Object.keys(materialRates).map(m=>(<option key={m}>{m}</option>))}
        </select>

        <label className="flex items-center gap-2">
          <input type="checkbox" name="rush" checked={rush} onChange={()=>setRush(!rush)}/>
          Rush Order (+50%)
        </label>

        <input 
          type="file" 
          name="files" 
          multiple 
          accept=".stl" 
          onChange={handleFiles} 
          className="p-2 border rounded"
        />

        {files.length>0 && (
          <div className="bg-gray-100 p-3 rounded">
            <p className="font-medium">Files:</p>
            {files.map((f,i)=>(<p key={i}>{f.name}</p>))}
          </div>
        )}

        {price>0 && (
          <div className="bg-green-100 p-3 rounded text-green-700">
            Estimated Price: ${price}
          </div>
        )}

        <input type="hidden" name="_subject" value="New 3D Print Quote Request" />

        <button type="submit" className="bg-green-600 text-white py-3 rounded">
          Submit Quote
        </button>
      </form>
    </section>
  );
}

function Layout(){
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/pricing" element={<Pricing/>} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App(){
  return (
    <Router>
      <Layout />
    </Router>
  );
}
