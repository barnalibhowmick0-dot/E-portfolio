import React, {useEffect, useMemo, useRef, useState} from 'react'
import {createRoot} from 'react-dom/client'
import {Canvas, useFrame} from '@react-three/fiber'
import {OrbitControls, Stars, Line, Html} from '@react-three/drei'
import {motion, AnimatePresence} from 'framer-motion'
import {
  Map as MapLibreMap,
  Marker,
  Popup,
  NavigationControl
} from 'maplibre-gl'

import 'maplibre-gl/dist/maplibre-gl.css'
import {ArrowUpRight, ChevronDown, Download, Github, Linkedin, Mail, MapPin, Menu, X, ExternalLink, FileText, Layers3, Satellite, Database, Code2, Send, Sparkles, Compass, BriefcaseBusiness, BookOpen, Terminal, MousePointer2} from 'lucide-react'

import InteractiveGeoBackground from "./components/InteractiveGeoBackground";
import './styles/app.css'
import {experiences, projects, fieldwork, skills, education} from './data/content'

const themes=['dark','light','neural','matrix','times']
// GitHub Pages-safe asset paths
const assetUrl = (path) =>
  `${import.meta.env.BASE_URL}${String(path).replace(/^\/+/, '')}`;

function Globe({activeSkill,setActiveSkill}){
  const group = useRef();

  useFrame((_, delta) => {
    if(group.current){
      group.current.rotation.y += delta * 0.08;
    }
  });

  const points = useMemo(
    () =>
      skills.map((s, i) => {
        const phi = Math.acos(
          -1 + (2 * i + 1) / skills.length
        );

        const theta =
          Math.sqrt(skills.length * Math.PI) * phi;

        return {
          x: 2.25 * Math.cos(theta) * Math.sin(phi),
          y: 2.25 * Math.cos(phi),
          z: 2.25 * Math.sin(theta) * Math.sin(phi),
          ...s
        };
      }),
    []
  );

  return (
    <group ref={group}>

      {/* Main wireframe globe */}
      <mesh>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial
          color="#0b1730"
          wireframe
          transparent
          opacity={0.28}
        />
      </mesh>

      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[2.18, 24, 24]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.035}
        />
      </mesh>

      {/* Latitude rings */}
      {Array.from({length: 8}).map((_, i) => (
        <mesh
          key={`lat${i}`}
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, (i - 3.5) * 0.52, 0]}
        >
          <torusGeometry
            args={[
              Math.sqrt(
                Math.max(
                  0,
                  2.2 ** 2 -
                    ((i - 3.5) * 0.52) ** 2
                )
              ),
              0.008,
              8,
              64
            ]}
          />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.2}
          />
        </mesh>
      ))}

      {/* Longitude rings */}
      {Array.from({length: 12}).map((_, i) => (
        <mesh
          key={`lon${i}`}
          rotation={[0, i * Math.PI / 12, 0]}
        >
          <torusGeometry
            args={[2.2, 0.006, 8, 64]}
          />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.15}
          />
        </mesh>
      ))}

      {/* Skill icons */}
      {points.map((p) => (
        <group
          key={p.name}
          position={[p.x, p.y, p.z]}
        >
          <Html
            center
            distanceFactor={5}
            style={{
              pointerEvents: "auto"
            }}
          >
            <button
              className={`skill-orbit-icon ${
                activeSkill === p.name ? "active" : ""
              }`}
              onClick={() => setActiveSkill(p.name)}
              aria-label={`Show ${p.name} details`}
            >
              <img
                src={assetUrl(p.icon)}
                alt={p.name}
              />
            </button>
          </Html>
        </group>
      ))}

    </group>
  );
}

function ThemePicker({theme,setTheme}){const [open,setOpen]=useState(false); return <div className="theme-picker"><button className="theme-trigger" onClick={()=>setOpen(!open)}>◐ <span>{theme.toUpperCase()}</span><ChevronDown size={15}/></button><AnimatePresence>{open&&<motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} className="theme-menu">{themes.map(t=><button key={t} className={theme===t?'active':''} onClick={()=>{setTheme(t);setOpen(false)}}><span className={'theme-dot '+t}/>{t.toUpperCase()}</button>)}</motion.div>}</AnimatePresence></div>}

function Nav({active,setActive,theme,setTheme}){const [mobile,setMobile]=useState(false); const items=['Home','About','Skills','Experiences','Projects','Fieldwork','Contact']; const go=id=>{document.getElementById(id.toLowerCase())?.scrollIntoView({behavior:'smooth'});setActive(id);setMobile(false)}; useEffect(()=>{const obs=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&setActive(e.target.id.charAt(0).toUpperCase()+e.target.id.slice(1))),{rootMargin:'-40% 0px -50%'});items.forEach(i=>{const el=document.getElementById(i.toLowerCase());if(el)obs.observe(el)});return()=>obs.disconnect()},[]); return <header className="nav-wrap"><nav className="nav"><a className="brand signature-brand" href="#home" onClick={e=>{e.preventDefault();go('Home')}}>
  Barnali Bhowmick
</a><div className={'nav-links '+(mobile?'show':'')}>{items.map(i=><button className={active===i?'active':''} key={i} onClick={()=>go(i)}>{i}</button>)}</div><div className="nav-actions"><ThemePicker theme={theme} setTheme={setTheme}/><button className="mobile-toggle" onClick={()=>setMobile(!mobile)}>{mobile?<X/>:<Menu/>}</button></div></nav></header>}

function SectionHeading({eyebrow,title,children}){return <div className="section-head"><div><div className="eyebrow">{eyebrow}</div><h2>{title}</h2></div>{children}</div>}
function ImagePlaceholder({src,label,className=''}){return <div className={'image-placeholder '+className}>{src?<img src={src} alt={label}/>:<><div className="placeholder-grid"/><span><MousePointer2 size={14}/> {label}</span></>}</div>}

function Home(){return <section id="home" className="section hero"><div className="hero-grid"/><div className="hero-copy"><div className="status">
  <span className="pulse"/>
  LOOKING AT THE WORLD THROUGH A SPATIAL LENS
</div><p className="hero-kicker">GEOSPATIAL • GIS • REMOTE SENSING · SPATIAL ANALYSIS · GEOAI · CODE</p><h1><span>Barnali</span><strong>Bhowmick</strong></h1><p className="hero-lede"> I’m interested in the clues that landscapes leave behind. I like turning those clues and spatial questions into something you can see, analyse and act on, with remote sensing at the core, and GIS, code and GeoAI helping me go further.</p><div className="hero-cta"><a className="btn primary" href="#projects">Explore my work <ArrowUpRight size={17}/></a><a className="btn ghost" href="/documents/Barnali_Resume.pdf" target="_blank"><Download size={16}/> Resume</a></div><div className="hero-meta"><span><MapPin size={14}/> Pune, Maharashtra</span><span>2025—2027</span><span>GIS × ENVIRONMENT × DATA</span></div></div><div className="hero-visual"><div className="coordinate focus-note">
  <span>CURRENTLY EXPLORING</span>
  <strong>Remote Sensing</strong>
  <strong>GeoAI + Spatial Analysis</strong>
</div><div className="profile-flip">
  <div className="profile-flip-inner">

    <div className="profile-flip-front">
      <img
        src={`${import.meta.env.BASE_URL}images/profile/profile-front.jpg`}
        alt="Barnali Bhowmick"
      />
    </div>

    <div className="profile-flip-back">
      <img
        src={`${import.meta.env.BASE_URL}images/profile/profile-back.jpg`}
        alt="Barnali Bhowmick"
      />
    </div>

  </div>
</div><div className="orbit-card"><span>FROM PIXELS TO PATTERNS</span><strong>Earth Observation → Spatial Insight</strong></div></div><div className="scroll-cue">SCROLL TO EXPLORE <ChevronDown size={15}/></div></section>}

function latLonToVector3(lat, lon, radius = 1.82) {
  const latRad = lat * Math.PI / 180;
  const lonRad = lon * Math.PI / 180;

  return [
    radius * Math.cos(latRad) * Math.cos(lonRad),
    radius * Math.sin(latRad),
    radius * Math.cos(latRad) * Math.sin(lonRad),
  ];
}

function educationArc(start, end, lift = 0.12, steps = 32) {
  const points = [];

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;

    const x = start[0] * (1 - t) + end[0] * t;
    const y = start[1] * (1 - t) + end[1] * t;
    const z = start[2] * (1 - t) + end[2] * t;

    const length = Math.sqrt(x * x + y * y + z * z);

    const scale =
      (1.82 + lift * Math.sin(Math.PI * t)) / length;

    points.push([
      x * scale,
      y * scale,
      z * scale
    ]);
  }

  return points;
}

const educationLocations = [
  {
    id: "graduation",
    short: "GRADUATION",
    degree: "BA (Hons.) · Geography",
    place:
      "Shyama Prasad Mukherji College, University of Delhi",
    city: "New Delhi",
    period: "2022—2025",

    lat: 28.672864,
    lon: 77.127531,
  },

  {
    id: "masters",
    short: "MASTER'S",
    degree: "MSc · Geoinformatics",
    place:
      "Bharati Vidyapeeth Institute of Environment Education and Research",
    city: "Pune",
    period: "2025—2027",

    lat: 18.5204,
    lon: 73.8567,
  },
];

function EducationGlobe({ selected, setSelected }) {
  const group = useRef();

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.035;
    }
  });

  const points = useMemo(
    () =>
      educationLocations.map((location) => ({
        ...location,
        position: latLonToVector3(
          location.lat,
          location.lon
        ),
      })),
    []
  );

  const arc = useMemo(
    () =>
      educationArc(
        points[0].position,
        points[1].position
      ),
    [points]
  );

  return (
    <group
      ref={group}
      rotation={[0, -0.35, 0]}
    >

      {/* Globe */}
      <mesh>
        <sphereGeometry args={[1.78, 28, 20]} />

        <meshBasicMaterial
          color="#0b1730"
          wireframe
          transparent
          opacity={0.42}
        />
      </mesh>

      {/* Very subtle globe interior */}
      <mesh>
        <sphereGeometry args={[1.77, 24, 16]} />

        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.025}
        />
      </mesh>

      {/* Delhi → Pune connection */}
      <Line
        points={arc}
        color="#22d3ee"
        transparent
        opacity={0.8}
        lineWidth={1.2}
      />

      {/* Location markers */}
      {points.map((location) => (
        <group
          key={location.id}
          position={location.position}
        >

          {/* Main marker */}
          <mesh
            scale={
              selected === location.id
                ? 1.18
                : 1
            }
            onClick={(event) => {
              event.stopPropagation();
              setSelected(location.id);
            }}
          >
            <sphereGeometry
              args={[0.075, 16, 16]}
            />

            <meshBasicMaterial
              color="#22d3ee"
            />
          </mesh>

          {/* Marker glow */}
          <mesh>
            <sphereGeometry
              args={[0.13, 16, 16]}
            />

            <meshBasicMaterial
              color="#22d3ee"
              transparent
              opacity={
                selected === location.id
                  ? 0.18
                  : 0.08
              }
            />
          </mesh>

          {/* City label */}
          <Html
            position={[0, 0.17, 0]}
            center
            distanceFactor={5}
            style={{
              pointerEvents: "none"
            }}
          >
            <span className="education-marker-label">
              {location.city}
            </span>
          </Html>

        </group>
      ))}

    </group>
  );
}

function EducationMap() {
  const [selected, setSelected] =
    useState("masters");

  const selectedLocation =
    educationLocations.find(
      (location) =>
        location.id === selected
    ) || educationLocations[1];

  return (
    <div className="education-map">

      <div className="education-map-top">
        <span>
          EDUCATION / LOCATION
        </span>

        <span>
          DELHI → PUNE
        </span>
      </div>

      <div className="education-globe">

        <Canvas
          camera={{
            position: [0, 0, 5.4],
            fov: 42
          }}
          dpr={[1, 2]}
        >

          <ambientLight intensity={1} />

          <EducationGlobe
            selected={selected}
            setSelected={setSelected}
          />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableDamping
            dampingFactor={0.08}
          />

        </Canvas>

        <div className="education-map-hint">
          DRAG · SELECT A LOCATION
        </div>

      </div>

      <div className="education-location-card">

        <span>
          {selectedLocation.short}
        </span>

        <strong>
          {selectedLocation.city}
        </strong>

        <small>
          {selectedLocation.degree}
          {" · "}
          {selectedLocation.period}
        </small>

      </div>

      <div className="education-location-buttons">

        {educationLocations.map(
          (location) => (

            <button
              key={location.id}
              type="button"
              className={
                selected === location.id
                  ? "active"
                  : ""
              }
              onClick={() =>
                setSelected(location.id)
              }
            >

              <span>
                {location.short}
              </span>

              <strong>
                {location.city}
              </strong>

            </button>

          )
        )}

      </div>

    </div>
  );
}

function About(){return <section id="about" className="section"><SectionHeading eyebrow="01 / THE PERSON BEHIND THE MAP" title="Beyond the map."/><div className="about-layout"><div className="about-story"><p className="lead">I am an MSc Geoinformatics student and BA (Hons) Geography graduate, passionate about using GIS, remote sensing and spatial data analysis to solve real-world environmental challenges.</p><p>My goal is to apply geospatial technologies for climate change research, sustainable planning and data-driven decision-making.</p><div className="identity-grid"><div><span>FOCUS</span><b>GIS + Remote Sensing</b></div><div><span>APPROACH</span><b>Maps → Data → Insight</b></div><div><span>CURRENTLY</span><b>MSc Geoinformatics</b></div><div><span>BASE</span><b>Pune, Maharashtra</b></div></div></div><div className="about-card">

  <div className="card-top">
    <span>GEO ID / 2026</span>
    <Compass size={20}/>
  </div>

  <EducationMap />

  <div className="education-list">{education.map(e=><div className="edu" key={e.degree}><div><span>{e.period}</span><h3>{e.degree}</h3><p>{e.institute}</p></div><span className="edu-tag">EDUCATION</span></div>)}</div></div></div></section>}

function Skills(){
  const [active, setActive] = useState(null);

  return (
    <section
      id="skills"
      className="section skills-section"
    >

      <SectionHeading
        eyebrow="02 / TOOLKIT"
        title="My skills, in orbit."
      />

      <div className="skills-layout">

        {/* LEFT: 3D SKILL GLOBE */}
        <div className="globe-wrap">

          <Canvas
            camera={{
              position: [0, 0, 6.8],
              fov: 45
            }}
          >

            <ambientLight intensity={1} />

            <Stars
              radius={10}
              depth={8}
              count={900}
              factor={1.4}
              fade
            />

            <Globe
              activeSkill={active}
              setActiveSkill={setActive}
            />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate={false}
            />

          </Canvas>

          <div className="globe-label">
            DRAG TO EXPLORE
          </div>

        </div>

        {/* RIGHT: SKILL INFORMATION */}
        <div className="skill-info">

          <div className="skill-intro">

            <span className="eyebrow">
              INTERACTIVE TOOLKIT
            </span>

            <h3>
              {active || "Click a skill"}
            </h3>

            <p>
              {active
                ? skills.find(
                    s => s.name === active
                  )?.desc
                : "Click any skill icon on the globe to explore how I use it across spatial analysis, programming and geospatial workflows."}
            </p>

          </div>

          {/* SKILL BUTTONS */}
          <div className="skill-chips">

            {skills.map(s => (
              <button
                key={s.name}
                className={
                  active === s.name
                    ? "selected"
                    : ""
                }
                onClick={() =>
                  setActive(s.name)
                }
              >
                <span>
                  {s.symbol}
                </span>

                {s.name}
              </button>
            ))}

          </div>

          {/* SKILL CATEGORIES */}
          <div className="skill-categories">

            <span>
              <Layers3 />
              GEOSPATIAL
            </span>

            <span>
              <Satellite />
              REMOTE SENSING
            </span>

            <span>
              <Code2 />
              PROGRAMMING
            </span>

            <span>
              <Database />
              DATA
            </span>

          </div>

        </div>

      </div>

    </section>
  );
}

function Experiences(){return <section id="experiences" className="section"><SectionHeading eyebrow="03 / EXPERIENCE" title="Where I learned by doing."/><div className="timeline">{experiences.map((e,i)=><motion.article key={e.org} className="experience-row" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{delay:i*.08}}><div className="time-col"><span>0{i+1}</span><b>{e.date}</b></div><div className="experience-card"><div className="experience-visual"><ImagePlaceholder label={e.imageLabel}/><div className="visual-stamp">{e.type}</div></div><div className="experience-copy"><div className="eyebrow">{e.type}</div><h3>{e.role}</h3><h4>{e.org}</h4><p>{e.summary}</p><ul>{e.points.map(p=><li key={p}>{p}</li>)}</ul>{e.proof&&<a className="text-link" href={e.proof} target="_blank">View completion letter <ExternalLink size={14}/></a>}</div></div></motion.article>)}</div></section>}

function Projects(){const [filter,setFilter]=useState('ALL'); const [selected,setSelected]=useState(null); const cats=['ALL','GIS','REMOTE SENSING','WEBGIS','ENVIRONMENT','DATA VISUALIZATION']; const visible=filter==='ALL'?projects:projects.filter(p=>p.categories.includes(filter)); return <section id="projects" className="section"><SectionHeading eyebrow="04 / SELECTED WORK" title="Projects that became maps." ><a className="btn ghost small" href="https://github.com/barnalibhowmick0-dot" target="_blank"><Github size={15}/> All GitHub</a></SectionHeading><div className="filters">{cats.map(c=><button key={c} className={filter===c?'active':''} onClick={()=>setFilter(c)}>{c}</button>)}</div><div className="projects-grid">{visible.map((p,i)=><motion.article layout key={p.title} className="project-card" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:i*.04}} onClick={()=>setSelected(p)}><div className="project-art"><div className="map-lines"/><span>{String(i+1).padStart(2,'0')}</span><div className="project-art-label">{p.art}</div></div><div className="project-body"><div className="project-top"><span>{p.categories[0]}</span><ArrowUpRight size={17}/></div><h3>{p.title}</h3><p>{p.description}</p><div className="tools">{p.tools.map(t=><span key={t}>{t}</span>)}</div></div></motion.article>)}</div><AnimatePresence>{selected&&<motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setSelected(null)}><motion.div className="project-modal" initial={{y:30,scale:.98}} animate={{y:0,scale:1}} exit={{y:30,scale:.98}} onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setSelected(null)}><X/></button><div className="modal-art"><div className="map-lines"/></div><div className="modal-content"><span className="eyebrow">PROJECT / {selected.categories[0]}</span><h2>{selected.title}</h2><p>{selected.description}</p><div className="modal-columns"><div><h4>TOOLS</h4><div className="tools">{selected.tools.map(t=><span key={t}>{t}</span>)}</div></div><div><h4>APPROACH</h4><p>{selected.approach}</p></div></div><div className="modal-actions"><a className="btn primary" href={selected.github} target="_blank"><Github size={16}/> GitHub</a>{selected.live&&<a className="btn ghost" href={selected.live} target="_blank">Live project <ExternalLink size={16}/></a>}</div></div></motion.div></motion.div>}</AnimatePresence></section>}

function Fieldwork(){return <section id="fieldwork" className="section field-section"><SectionHeading eyebrow="05 / HANDSON FIELD EXPERIENCES" title="Come into the field."/><div className="field-intro"><p>Maps become more meaningful when they meet the ground. This is where I will document field visits, observations, primary data collection, photographs and the practical lessons behind the outputs.</p><span>FIELD JOURNAL / 2026</span></div><div className="field-grid">{fieldwork.map((f,i)=><article className="field-card" key={f.title}><ImagePlaceholder label={f.imageLabel}/><div className="field-caption"><span>FIELD NOTE {String(i+1).padStart(3,'0')}</span><h3>{f.title}</h3><p>{f.note}</p><div className="field-meta"><span><MapPin size={13}/> {f.location}</span><span>{f.date}</span></div></div></article>)}</div></section>}

function Contact(){const [sent,setSent]=useState(false); const submit=e=>{e.preventDefault();const fd=new FormData(e.currentTarget); const subject=encodeURIComponent('Portfolio enquiry for Barnali Bhowmick'); const body=encodeURIComponent(`Name: ${fd.get('name')}\n\n${fd.get('message')}`); window.location.href=`mailto:barnalibhowmick0@gmail.com?subject=${subject}&body=${body}`; setSent(true)}; return <section id="contact" className="section contact-section"><div className="contact-panel"><div className="contact-copy"><span className="eyebrow">06 / CONTACT</span><h2>Let's map what's next.</h2><p>Have a geospatial problem, research opportunity, internship or collaboration in mind? I would love to hear from you.</p><div className="contact-links"><a href="mailto:barnalibhowmick0@gmail.com"><Mail/> barnalibhowmick0@gmail.com</a><a href="https://github.com/barnalibhowmick0-dot" target="_blank"><Github/> GitHub</a><a href="https://www.linkedin.com/in/b-bhowmick-2005-/" target="_blank"><Linkedin/> LinkedIn</a></div></div><form className="contact-form" onSubmit={submit}><label>YOUR NAME<input name="name" required placeholder="Your name"/></label><label>YOUR MESSAGE<textarea name="message" required rows="5" placeholder="Tell me a little about the opportunity..."/></label><button className="btn primary" type="submit"><Send size={16}/> Send enquiry</button>{sent&&<small>Your email client should open with the message prepared.</small>}</form></div></section>}

function App(){
  const [theme,setTheme]=useState(localStorage.getItem('barnali-theme')||'dark');

  const [active,setActive]=useState('Home');

  useEffect(()=>{
    document.documentElement.dataset.theme=theme;
    localStorage.setItem('barnali-theme',theme);
  },[theme]);

  useEffect(()=>{
    const fn=e=>{
      if(e.key.toLowerCase()==='m')
        document.getElementById('projects')?.scrollIntoView({behavior:'smooth'});
    };

    window.addEventListener('keydown',fn);

    return()=>window.removeEventListener('keydown',fn);
  },[]);

  return (
    <div className="app">
      <InteractiveGeoBackground/>

      <Nav
        active={active}
        setActive={setActive}
        theme={theme}
        setTheme={setTheme}
      />

      <main>
        <Home/>
        <About/>
        <Skills/>
        <Experiences/>
        <Projects/>
        <Fieldwork/>
        <Contact/>
      </main>

      <footer>
        <div>
          <b>BARNALI BHOWMICK</b>
          <span>MSc Geoinformatics · GIS · Remote Sensing · Spatial Analysis</span>
        </div>

        <span>BUILT WITH CURIOSITY, DATA & MAPS · 2026</span>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App/>)
