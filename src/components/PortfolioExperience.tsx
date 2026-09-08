import { lazy, Suspense, useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { ArrowDown, ArrowUpRight, BarChart3, Code2, Database, FileText, Folder, Github, Linkedin, Mail, Moon, Pause, Play, Smile, Sparkles, Sun } from "lucide-react";
import Lenis from "lenis";
import { dataAnalysisProjects, webDevelopmentProjects } from "@/data/projectsData";
import "./portfolio-experience.css";

const ContactSection = lazy(() => import("./ContactSection"));
const email = "mailto:khennyphresh@gmail.com";
const colors = ["#f9c9de", "#8fd0ff", "#ffac88", "#b7ebcf", "#c7b6ff", "#c6ef63"];
const skills = ["Data analysis", "SQL", "Power BI", "React", "TypeScript", "Excel", "Storytelling", "Dashboards", "Problem solving", "Web development", "Data validation"];
const services = [
  ["From raw data to decisions", "Data Analysis"], ["Components, interfaces, detail", "Frontend"],
  ["Interactive business insights", "Dashboards"], ["Queries, models, integrity", "SQL"],
  ["Clear stories behind the numbers", "Visualization"], ["Less repetition, more impact", "Automation"],
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

function StickerPlayground({ reduced }: { reduced: boolean }) {
  const area = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = area.current;
    if (!container || reduced) return;
    let disposed = false;
    let cleanup = () => {};
    void import("matter-js").then(({ default: Matter }) => {
      if (disposed) return;
      const { Engine, Bodies, Body, Composite, Constraint } = Matter;
      const engine = Engine.create({ enableSleeping: true });
      engine.gravity.y = 1.1;
      const stickers = Array.from(container.querySelectorAll<HTMLElement>(".pe-sticker"));
      let width = container.clientWidth;
      let height = container.clientHeight;
      const walls = [Bodies.rectangle(width / 2, height + 100, width * 3, 200, { isStatic: true }), Bodies.rectangle(-100, height / 2, 200, height * 6, { isStatic: true }), Bodies.rectangle(width + 100, height / 2, 200, height * 6, { isStatic: true })];
      const bodies = stickers.map((el, i) => {
        const body = Bodies.rectangle(Math.max(el.offsetWidth / 2, (i + .5) / stickers.length * width), -80 - i * 55, el.offsetWidth, el.offsetHeight, { chamfer: { radius: el.offsetHeight / 2 }, restitution: .45, friction: .35, frictionAir: .02 });
        Body.setAngle(body, Math.sin(i * 7) * .3);
        return body;
      });
      Composite.add(engine.world, [...walls, ...bodies]);
      container.classList.add("has-physics");
      let drag: Matter.Constraint | null = null;
      let activePointer: number | null = null;
      const point = (event: PointerEvent) => { const rect = container.getBoundingClientRect(); return { x: event.clientX - rect.left, y: event.clientY - rect.top }; };
      const down = (event: PointerEvent) => {
        const el = (event.target as HTMLElement).closest<HTMLElement>(".pe-sticker");
        if (!el || activePointer !== null) return;
        const body = bodies[stickers.indexOf(el)];
        if (!body) return;
        activePointer = event.pointerId;
        container.setPointerCapture(event.pointerId);
        Matter.Sleeping.set(body, false);
        drag = Constraint.create({ pointA: point(event), bodyB: body, stiffness: .2, damping: .1, length: 0 });
        Composite.add(engine.world, drag);
      };
      const move = (event: PointerEvent) => { if (drag && event.pointerId === activePointer) drag.pointA = point(event); };
      const up = () => { if (drag) Composite.remove(engine.world, drag); drag = null; activePointer = null; };
      container.addEventListener("pointerdown", down);
      container.addEventListener("pointermove", move);
      container.addEventListener("pointerup", up);
      container.addEventListener("pointercancel", up);
      container.addEventListener("lostpointercapture", up);
      const resize = new ResizeObserver(() => {
        const nextWidth = container.clientWidth;
        const nextHeight = container.clientHeight;
        if (nextWidth === width && nextHeight === height) return;
        Body.scale(walls[0], nextWidth / width, 1);
        Body.setPosition(walls[0], { x: nextWidth / 2, y: nextHeight + 100 });
        Body.setPosition(walls[2], { x: nextWidth + 100, y: nextHeight / 2 });
        bodies.forEach((body, i) => { Body.setPosition(body, { x: Math.min(nextWidth - stickers[i].offsetWidth / 2, Math.max(stickers[i].offsetWidth / 2, body.position.x * nextWidth / width)), y: Math.min(body.position.y, nextHeight - 60) }); Matter.Sleeping.set(body, false); });
        width = nextWidth; height = nextHeight;
      });
      resize.observe(container);
      let frame = 0;
      let previous = performance.now();
      const animate = (time: number) => {
        if (!document.hidden && container.getBoundingClientRect().bottom > 0) {
          // The first RAF timestamp can predate performance.now(); a negative
          // physics step puts newly created bodies to sleep before they fall.
          Engine.update(engine, Math.max(1, Math.min(time - previous, 1000 / 60)));
          stickers.forEach((el, i) => { const body = bodies[i]; el.style.transform = `translate(${body.position.x - el.offsetWidth / 2}px, ${body.position.y - el.offsetHeight / 2}px) rotate(${body.angle}rad)`; });
        }
        previous = time;
        frame = requestAnimationFrame(animate);
      };
      frame = requestAnimationFrame(animate);
      cleanup = () => {
        cancelAnimationFrame(frame); resize.disconnect();
        container.removeEventListener("pointerdown", down); container.removeEventListener("pointermove", move); container.removeEventListener("pointerup", up); container.removeEventListener("pointercancel", up); container.removeEventListener("lostpointercapture", up);
        Composite.clear(engine.world, false); Engine.clear(engine);
        container.classList.remove("has-physics"); stickers.forEach(el => el.style.removeProperty("transform"));
      };
    });
    return () => { disposed = true; cleanup(); };
  }, [reduced]);
  return <div ref={area} className="pe-playground" aria-hidden="true">{skills.map((skill, i) => <span className="pe-sticker" key={skill} style={{ background: colors[i % colors.length] }}>{skill} {i % 3 === 0 ? <Sparkles /> : i % 3 === 1 ? <Database /> : <Code2 />}</span>)}{[Code2, Smile, BarChart3, Sparkles, Database, ArrowUpRight].map((Icon, i) => <span className="pe-sticker pe-chip" key={i} style={{ background: colors[(i + 3) % colors.length] }}><Icon /></span>)}</div>;
}

function ProjectGallery({ reduced }: { reduced: boolean }) {
  const gallery = useRef<HTMLDivElement>(null);
  const galleryOffset = useRef(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const el = gallery.current;
    if (!el || reduced) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>(".pe-gallery-card"));
    let frame = 0, previous = performance.now();
    const animate = (time: number) => {
      const width = window.innerWidth >= 640 ? 520 : 330;
      const spacing = width + 16;
      const total = spacing * cards.length;
      const center = el.clientWidth / 2;
      if (!paused && !el.matches(":hover, :focus-within") && !document.hidden) galleryOffset.current = (galleryOffset.current + 52 * Math.min(time - previous, 50) / 1000) % total;
      previous = time;
      cards.forEach((card, i) => {
        const x = ((i * spacing - galleryOffset.current) % total + total) % total - spacing + center;
        const distance = (x - center) / Math.max(center, 1);
        card.style.width = `${width}px`;
        card.style.transform = `translate3d(${x - width / 2}px,-50%,0) perspective(1200px) rotateY(${Math.max(-22, Math.min(22, -24 * distance))}deg) scale(${Math.max(.85, 1 - .12 * Math.abs(distance))})`;
        card.style.zIndex = `${1000 - Math.round(Math.abs(x - center))}`;
      });
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(frame); cards.forEach(card => card.removeAttribute("style")); };
  }, [paused, reduced]);
  return <section className={`pe-gallery ${reduced ? "is-static" : ""}`} aria-label="Project previews"><div ref={gallery} className="pe-gallery-track">{webDevelopmentProjects.slice(0, 6).map(project => <div className="pe-gallery-card" key={project.id}><img src={project.image} alt={`${project.title} preview`} loading="eager" /></div>)}</div>{!reduced && <button className="pe-gallery-pause" onClick={() => setPaused(!paused)} aria-label={paused ? "Play project gallery" : "Pause project gallery"}>{paused ? <Play /> : <Pause />}</button>}</section>;
}

function Expertise({ reduced }: { reduced: boolean }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = section.current, row = track.current;
    if (!el || !row || reduced) return;
    const query = window.matchMedia("(min-width: 900px)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const distance = Math.max(0, row.scrollWidth - window.innerWidth + 48);
      el.style.height = query.matches ? `${window.innerHeight + distance}px` : "auto";
      row.style.transform = query.matches ? `translateX(-${Math.min(distance, Math.max(0, -el.getBoundingClientRect().top))}px)` : "none";
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update(); window.addEventListener("scroll", schedule, { passive: true }); window.addEventListener("resize", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); el.style.removeProperty("height"); row.style.removeProperty("transform"); };
  }, [reduced]);
  const entries = [
    ["01 / ANALYZE", "Data & business intelligence", "Turning raw data into actionable insights with Excel, SQL and Power BI. From KPI tracking to operational reporting, I help teams make informed decisions.", "Excel · SQL · Power BI", Database],
    ["02 / BUILD", "Interfaces people use", "Responsive, accessible web applications built with React and TypeScript. Thoughtful interfaces for healthcare, education, food and everyday services.", "React · TypeScript · Tailwind CSS", Code2],
    ["03 / IMPROVE", "Better systems, better outcomes", "From automated nursing rotas to patient data validation, I build tools that reduce manual work and improve the quality of everyday operations.", "Automation · Validation · Healthcare", Sparkles],
    ["04 / KEEP LEARNING", "Curiosity meets craft", "ALX Africa certified in data analysis and software engineering. I bring analytical thinking and attention to detail to every project.", "Problem solving · Continuous learning", Smile],
  ] as const;
  return <section id="skills" ref={section} className={`pe-expertise ${reduced ? "is-static" : ""}`}><div className="pe-expertise-sticky"><div className="pe-section-title"><p className="pe-eyebrow">Experience & expertise</p><h2>The journey so far</h2></div><div className="pe-expertise-viewport"><div ref={track} className="pe-expertise-track">{entries.map(([label, title, body, tags, Icon], i) => <article className="pe-expertise-item" key={label}><span className="pe-timeline-label">{label}</span><span className="pe-timeline-dot" /><div className="pe-expertise-card" style={{ "--tone": colors[i], "--tilt": `${i % 2 ? 2 : -2}deg` } as CSSProperties}><Icon /><h3>{title}</h3><p>{body}</p><small>{tags}</small></div></article>)}</div></div></div></section>;
}

export default function PortfolioExperience() {
  const reduced = useReducedMotion();
  const { resolvedTheme, setTheme } = useTheme();
  const dark = resolvedTheme === "dark";
  const root = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("Web development");
  const [contactOpen, setContactOpen] = useState(() => window.location.hash === "#contact-form-panel");
  const openContactForm = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    // Let the form render before scrolling, instead of Lenis handling a hidden anchor.
    event.stopPropagation();
    setContactOpen(true);
    window.history.replaceState(window.history.state, "", "#contact-form-panel");
    requestAnimationFrame(() => {
      const panel = document.getElementById("contact-form-panel");
      (panel?.querySelector("form") ?? panel)?.scrollIntoView({
        behavior: reduced ? "instant" : "smooth", block: "start",
      });
    });
  };
  const [word, setWord] = useState(0);
  useEffect(() => {
    if (!contactOpen) return;
    const panel = document.getElementById("contact-form-panel");
    if (!panel) return;
    const revealLoadedForm = () => {
      const input = panel.querySelector<HTMLInputElement>("form input");
      if (!input) return;
      input.form?.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" });
      input.focus({ preventScroll: true });
      observer.disconnect();
    };
    const observer = new MutationObserver(revealLoadedForm);
    observer.observe(panel, { childList: true, subtree: true });
    revealLoadedForm();
    return () => observer.disconnect();
  }, [contactOpen, reduced]);
  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => setWord(value => (value + 1) % 3), 2200);
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, anchors: { offset: -100 } });
    let frame = 0;
    const tick = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(tick); };
    frame = requestAnimationFrame(tick);
    return () => { clearInterval(timer); cancelAnimationFrame(frame); lenis.destroy(); };
  }, [reduced]);
  useEffect(() => {
    const words = Array.from(root.current?.querySelectorAll<HTMLElement>(".pe-word") ?? []);
    let frame = 0;
    const update = () => {
      frame = 0;
      words.forEach((el, i) => {
        const rect = el.parentElement!.getBoundingClientRect();
        const progress = reduced ? 1 : Math.max(0, Math.min(1, (window.innerHeight * .88 - rect.top) / Math.max(rect.height, 180) * 1.6 - i / words.length * .65));
        el.style.setProperty("--reveal", `${progress}`);
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update(); window.addEventListener("scroll", schedule, { passive: true }); window.addEventListener("resize", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, [reduced]);
  useEffect(() => {
    if (reduced) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: .08 });
    root.current?.querySelectorAll(".pe-reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [reduced, filter]);
  const selected = filter === "Web development" ? webDevelopmentProjects : dataAnalysisProjects;
  const statement = "My work spans across data analysis, business intelligence, and frontend development, transforming complex problems into clear insights and intuitive, accessible digital experiences.";
  return <div className="portfolio-experience" ref={root}>
    <a className="pe-skip" href="#work">Skip to projects</a>
    <header className="pe-nav"><nav aria-label="Main navigation"><a href="#top" className="pe-monogram" aria-label="Ekene Okoli, back to top">eo.</a><a href="#work"><Folder />Work</a><a href="#about"><Smile />About</a><a href="/Ekene_Okoli_Resume.pdf" target="_blank" rel="noreferrer"><FileText />Resume</a><a href="#contact-form-panel" onClick={openContactForm} className="pe-nav-contact" aria-label="Get in touch" aria-expanded={contactOpen} aria-controls="contact-form-panel"><span>Get in Touch</span><Mail /></a></nav></header>
    <main>
      <section id="top" className="pe-hero"><div className="pe-guides" aria-hidden="true"><i /><i /><i /></div><div className="pe-hero-content"><p className="pe-greeting">Hey, I’m <img src="/headshot.png" alt="" /> Ekene</p><h1 aria-label="Creative data analyst and frontend developer"><span>Creative</span><span className="pe-orange">Devel<button className="pe-theme-switch" role="switch" aria-checked={dark} aria-label={`Switch to ${dark ? "light" : "dark"} mode`} onClick={() => setTheme(dark ? "light" : "dark")}><span>{dark ? <Moon /> : <Sun />}</span></button>per &</span><span>Data analyst</span></h1><p className="pe-hero-description">Turning complex data into <strong>clear business insights</strong><br className="pe-desktop-break" /> and building <strong>interfaces people love to use.</strong></p></div><StickerPlayground reduced={reduced} /></section>
      <ProjectGallery reduced={reduced} />
      <section className="pe-container pe-services" aria-labelledby="services-heading"><div><h2 id="services-heading" className="pe-service-label">What I do</h2><div className="pe-service-stack">{services.map(([caption, title], i) => <div key={title} className={`pe-service-card pe-service-${i}`} style={{ background: colors[i] }}><small>{caption}</small><h3>{title}</h3></div>)}</div></div><p className="pe-statement">{statement.split(" ").map((text, i) => <span key={i}><span className="pe-word">{text}</span>{" "}</span>)}</p></section>
      <section id="work" className="pe-container pe-work"><span id="projects" className="pe-anchor" /><div className="pe-work-heading pe-reveal"><div><p className="pe-eyebrow">Selected works</p><h2>Case studies</h2></div><p>A selection of the dashboards, platforms, and digital experiences I’ve built. Explore the thinking and work behind each project.</p></div><div className="pe-filters" aria-label="Project categories">{["Web development", "Data analysis"].map(label => <button key={label} aria-pressed={filter === label} onClick={() => setFilter(label)}>{label}</button>)}</div><div className="pe-project-grid">{selected.map((project, i) => <Link className="pe-project pe-reveal" to={`/project/${project.id}`} key={project.id}><div className="pe-project-image" style={{ "--tone": colors[i % colors.length] } as CSSProperties}>{"image" in project ? <img src={project.image as string} alt={`${project.title} website`} loading="lazy" /> : <div className="pe-data-preview"><div className="pe-dashboard-top"><project.icon /><span>{project.tools[0]} / ANALYTICS</span></div><strong>{project.metric.value}</strong><span>{project.metric.label}</span><div className="pe-bars" aria-hidden="true">{[42, 65, 48, 80, 62, 93, 75, 100].map((height, j) => <i key={j} style={{ height: `${Math.max(20, height - (i * 7 + j * 3) % 28)}%` }} />)}</div></div>}<span className="pe-project-view">View project <ArrowUpRight /></span></div><div className="pe-project-caption"><h3>{project.title}</h3><ArrowUpRight /></div><p>{project.tools.slice(0, 3).join(" · ")}</p></Link>)}</div></section>
      <section id="about" className="pe-container pe-about pe-reveal"><div><p className="pe-eyebrow">About me</p><h2>Data analyst & frontend developer with <em>4+ years</em> at the intersection of data, business, and technology.</h2><div className="pe-personality">{["Problem solver", "Creative thinker", "Systems thinker", "Detail obsessed"].map((label, i) => <span key={label} style={{ background: colors[(i + 4) % colors.length] }}>{label}</span>)}</div><p className="pe-bio">I’m Ekene Okoli, a Data Analyst and Frontend Developer specializing in the intersection of data engineering and interactive UI design. With deep expertise in SQL, Power BI, React, and TypeScript, I build data-driven web applications that make complex metrics easy to understand. My focus is delivering scalable technical solutions that turn raw data into clear, actionable business strategies.</p><a className="pe-text-link" href="/Ekene_Okoli_Resume.pdf" target="_blank" rel="noreferrer">More about my experience <ArrowUpRight /></a></div><figure className="pe-polaroid"><span /><span /><img src="/headshot.png" alt="Ekene Okoli" loading="lazy" /><figcaption>Ekene Okoli / Lagos, Nigeria</figcaption></figure></section>
      <Expertise reduced={reduced} />
      <section className="pe-container pe-impact pe-reveal"><p className="pe-eyebrow">The work, in numbers</p><h2>Thoughtful work.<br /><em>Real impact.</em></h2><div className="pe-impact-grid">{[["4+", "Years of experience"], ["15+", "Projects delivered"], ["15%", "Operational efficiency increase"]].map(([value, label]) => <div key={label}><strong>{value}</strong><p>{label}</p></div>)}</div></section>
      <footer id="contact" className="pe-container pe-footer"><p className="pe-eyebrow">Have something in mind?</p><h2>Let’s make<br /><span className="pe-changing-word" key={reduced ? "static" : word}>{["great", "useful", "better"][reduced ? 0 : word]}</span> things<span className="pe-orange">.</span></h2><div className="pe-footer-row"><div><a className="pe-email" href={email}>khennyphresh@gmail.com <ArrowUpRight /></a><div className="pe-socials"><a href="https://linkedin.com/in/ekene-okoli" aria-label="LinkedIn" target="_blank" rel="noreferrer"><Linkedin /></a><a href="https://github.com/khennyyb" aria-label="GitHub" target="_blank" rel="noreferrer"><Github /></a><button aria-expanded={contactOpen} aria-controls="contact-form-panel" onClick={openContactForm}>Send a message <Mail /></button></div></div><a href="#contact-form-panel" onClick={openContactForm} className="pe-touch-ring" aria-label="Get in touch" aria-expanded={contactOpen} aria-controls="contact-form-panel"><svg viewBox="0 0 100 100" aria-hidden="true"><defs><path id="pe-ring" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" /></defs><text textLength="232" lengthAdjust="spacing"><textPath href="#pe-ring"> GET IN TOUCH • GET IN TOUCH • </textPath></text></svg><span><ArrowUpRight /></span></a><p className="pe-footer-note">Ready to discuss your project?<br />I’d <em>love</em> to <em>hear</em> about it.</p></div><div id="contact-form-panel" hidden={!contactOpen}>{contactOpen && <Suspense fallback={<p>Loading contact form…</p>}><ContactSection /></Suspense>}</div><div className="pe-footer-bottom"><span>© {new Date().getFullYear()} Ekene Okoli.</span><span>All rights reserved</span><a href="#top">Back to top <ArrowDown /></a></div></footer>
    </main>
  </div>;
}
