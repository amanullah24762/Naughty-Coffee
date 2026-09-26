"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, ArrowRight, Coffee, MapPin, Clock3, Menu, X, Plus, Instagram, Heart, Check, Mail } from "lucide-react";

const photo = (id: string, width = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
const images = {
  hero: photo("photo-1442512595331-e89e73853f31", 2400),
  barista: photo("photo-1445116572660-236099ec97a0"),
  espresso: photo("photo-1510707577719-ae7c14805e3a", 700),
  latte: photo("photo-1461023058943-07fcbe16d735", 700),
  cappuccino: photo("photo-1572442388796-11668a67e53d", 700),
  cold: photo("photo-1517701604599-bb29b565090c", 700),
  signature: photo("photo-1541167760496-1628856ab772", 700),
  cafe: photo("photo-1554118811-1e0d58224f24", 1800),
  beans: photo("photo-1447933601403-0c6688de566e", 800),
  interior: photo("photo-1501339847302-ac426a4a7cbb", 900),
  pour: photo("photo-1495474472287-4d71bcdd2085", 900),
};

const products = [
  { name: "The Espresso", type: "The classics", note: "Small cup. Big personality.", detail: "A concentrated, full-bodied espresso with a rich crema and a beautifully lingering finish. Served as a double shot.", image: images.espresso, tag: "BOLD & BEAUTIFUL" },
  { name: "Velvet Latte", type: "The classics", note: "Your softer side, in a cup.", detail: "Our house espresso meets silky steamed milk. Balanced, mellow, and made for taking your time. Ask your barista about milk alternatives.", image: images.latte, tag: "SMOOTH OPERATOR" },
  { name: "Cappuccino", type: "The classics", note: "A perfectly foamy affair.", detail: "Rich espresso, steamed milk, and a generous cloud of microfoam. The classic coffee ritual, beautifully done.", image: images.cappuccino, tag: "THE DAILY RITUAL" },
  { name: "Cold & Naughty", type: "Over ice", note: "Chill out. Stir things up.", detail: "Chilled coffee poured over ice for a refreshing, smooth sip. Enjoy it black or with a splash of your preferred milk.", image: images.cold, tag: "STAY COOL" },
  { name: "The Naughty One", type: "Signature sips", note: "A little sweet. A little trouble.", detail: "Our proposal for a house signature: espresso, silky milk, and a little caramel sweetness. A playful twist on your everyday coffee.", image: images.signature, tag: "HOUSE SIGNATURE" },
];
type Product = typeof products[number];
type Dialog = { kind: "product"; product: Product } | { kind: "image"; src: string; alt: string } | { kind: "contact" } | null;

function Wordmark({ light = false }: { light?: boolean }) {
  return <a href="#home" className={`wordmark ${light ? "light" : ""}`} aria-label="Naughty Coffee home"><span>naughty<span className="logo-dot">®</span></span><small>C O F F E E</small></a>;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="eyebrow"><span />{children}</div>;
}

export default function Homepage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [category, setCategory] = useState("All coffee");
  const [dialog, setDialog] = useState<Dialog>(null);
  const [saved, setSaved] = useState<string[]>([]);
  const modalRef = useRef<HTMLDialogElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.1 });
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const scroll = () => {
      if (reduced.matches || frame) return;
      frame = requestAnimationFrame(() => {
        heroRef.current?.style.setProperty("--parallax", `${Math.min(window.scrollY * 0.22, 200)}px`);
        frame = 0;
      });
    };
    window.addEventListener("scroll", scroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("scroll", scroll); cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    if (dialog) { modalRef.current?.showModal(); document.body.style.overflow = "hidden"; }
    else { modalRef.current?.close(); document.body.style.overflow = ""; }
    return () => { document.body.style.overflow = ""; };
  }, [dialog]);

  const closeMenu = () => setMobileOpen(false);
  return <>
    <a href="#main" className="skip-link">Skip to content</a>
    <header className="header">
      <div className="header-inner">
        <Wordmark />
        <nav aria-label="Main navigation" className={mobileOpen ? "navigation open" : "navigation"}>
          <a href="#about" onClick={closeMenu}>Our story</a><a href="#menu" onClick={closeMenu}>The coffee</a><a href="#experience" onClick={closeMenu}>The experience</a><a href="#visit" onClick={closeMenu}>Find us</a>
        </nav>
        <a href="#visit" className="button header-cta">Come get naughty <ArrowUpRight size={16} /></a>
        <button className="mobile-toggle" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X /> : <Menu />}</button>
      </div>
    </header>

    <main id="main">
      <section id="home" className="hero" ref={heroRef}>
        <img className="hero-image" src={images.hero} alt="Freshly brewed coffee in a warm, sunlit café" fetchPriority="high" />
        <div className="hero-shade" />
        <div className="hero-content container">
          <div className="hero-eyebrow"><span /> SERIOUS COFFEE. NOT-SO-SERIOUS PEOPLE.</div>
          <h1>Good coffee.<br />A little <em>attitude.</em></h1>
          <p>For the early birds. The late talkers.<br />And everyone with a taste for something real.</p>
          <div className="hero-actions"><a className="button button-cream" href="#menu">View menu <ArrowUpRight size={18} /></a><a href="#visit" className="hero-visit">Visit us <ArrowUpRight size={18} /></a></div>
        </div>
        <div className="coffee-stamp"><span>GOOD DAYS START WITH</span><Coffee size={34} strokeWidth={1.3} /><strong>a little naughty</strong><span>FRESHLY BREWED · ALWAYS</span></div>
        <div className="hero-bottom container"><span>CRAFTED WITH CARE. SERVED WITH CHARACTER.</span><a href="#about">TAKE A LITTLE SCROLL <ArrowDown size={16} /></a></div>
      </section>

      <div className="ticker" aria-label="Good beans. Better days. A little naughty."><div><span>GOOD BEANS.</span><span className="asterisk">✳</span><span>BETTER DAYS.</span><span className="asterisk">✳</span><span>A LITTLE NAUGHTY.</span><span className="asterisk">✳</span><span>ALWAYS GOOD COFFEE.</span><span className="asterisk">✳</span></div></div>

      <section id="about" className="about section container">
        <div className="about-image reveal"><img src={images.barista} alt="Warm café counter with carefully arranged coffee equipment" loading="lazy" /><div className="image-caption"><span>A LITTLE CUP.</span><span>A WHOLE LOT OF SOUL.</span></div><div className="about-badge">100%<span>good energy</span><Coffee size={22} /></div></div>
        <div className="about-copy reveal"><Eyebrow>MORE THAN A COFFEE FIX</Eyebrow><h2>Life’s too short<br />for <em>boring coffee.</em></h2><p>We believe a great cup of coffee can turn your whole day around. And a great place to drink it? Even better.</p><p>Welcome to Naughty Coffee. A little escape from the everyday, where thoughtfully crafted coffee meets good conversation, easy mornings, and your kind of people.</p><a href="#experience" className="text-link">A taste of our world <ArrowUpRight size={19} /></a><div className="about-note"><span className="handwritten">Made with love. And a little mischief.</span><Heart size={22} strokeWidth={1.3} /></div></div>
      </section>

      <section id="menu" className="menu-section section">
        <div className="container">
          <div className="section-heading reveal"><div><Eyebrow>YOUR NEXT GOOD HABIT</Eyebrow><h2>Meet your <em>daily fix.</em></h2></div><p>Beautiful beans. Thoughtful brewing.<br />Something for whatever mood you’re in.</p></div>
          <div className="menu-toolbar"><div className="filters" role="group" aria-label="Filter coffee menu">{["All coffee", "The classics", "Over ice", "Signature sips"].map(item => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}</button>)}</div><span className="menu-note">GOOD TASTE COMES NATURALLY <Coffee size={16} /></span></div>
          <div className="product-grid">{products.filter(item => category === "All coffee" || item.type === category).map((product, i) => <article className="product-card" key={product.name} style={{ animationDelay: `${i * 65}ms` }}><button className="product-image" onClick={() => setDialog({ kind: "product", product })} aria-label={`Discover ${product.name}`}><img src={product.image} alt={product.name} loading="lazy" /><span className="product-tag">{product.tag}</span><span className="product-plus"><Plus size={19} /></span></button><div className="product-info"><button onClick={() => setDialog({ kind: "product", product })}><h3>{product.name}</h3></button><p>{product.note}</p></div></article>)}</div>
          <p className="menu-footnote">A little preview of what’s brewing. Ask in-store for the full menu and today’s specials.</p>
        </div>
      </section>

      <section id="experience" className="experience">
        <img src={images.cafe} alt="Inviting café interior with plants, warm lighting, and comfortable seating" loading="lazy" /><div className="experience-overlay" />
        <div className="container experience-content reveal"><Eyebrow>STAY A LITTLE LONGER</Eyebrow><h2>Your coffee.<br />Your corner.<br /><em>Your kind of place.</em></h2><p>Come for the coffee. Stay for the feeling.<br />There’s a seat here with your name on it.</p><a href="#visit" className="button button-cream">Make yourself at home <ArrowUpRight size={18} /></a></div>
        <div className="experience-features container"><div><Coffee /><span>Craft in every cup<small>Freshly made. Never rushed.</small></span></div><div><Heart /><span>Room to slow down<small>Cozy corners. Good company.</small></span></div><div><span className="feature-spark">✳</span><span>A little everyday magic<small>Your new favourite ritual.</small></span></div></div>
      </section>

      <section id="gallery" className="gallery-section section container">
        <div className="section-heading reveal"><div><Eyebrow>LITTLE MOMENTS. GOOD COMPANY.</Eyebrow><h2>The <em>naughty</em> side of life.</h2></div><span className="gallery-label"><Instagram size={18} /> THROUGH OUR LENS</span></div>
        <div className="gallery-grid">{[{ src: images.pour, alt: "Coffee shared over a slow morning", label: "A moment for you" }, { src: images.interior, alt: "Sunlit seating and warm café textures", label: "Find your corner" }, { src: images.beans, alt: "Fresh roasted coffee beans", label: "Where it all begins" }, { src: images.signature, alt: "Artfully poured latte", label: "Love at first sip" }].map((item, i) => <button key={item.src} className={`gallery-item gallery-${i} reveal`} onClick={() => setDialog({ kind: "image", ...item })} aria-label={`Enlarge image: ${item.alt}`}><img src={item.src} alt={item.alt} loading="lazy" /><span>{item.label}<ArrowUpRight size={22} /></span></button>)}</div>
        <div className="gallery-caption"><span>COFFEE LOOKS GOOD ON YOU.</span><span className="handwritten">Make a little time for the good stuff.</span></div>
      </section>

      <section id="visit" className="visit-section section"><div className="container visit-grid"><div className="visit-copy reveal"><Eyebrow>YOUR TABLE IS WAITING</Eyebrow><h2>Follow the<br /><em>good coffee.</em></h2><p>Take a break from the usual.<br />We’ll take care of the coffee.</p><div className="visit-details"><div><MapPin size={20} /><span>Find our little corner<small>Street address & city coming soon</small></span></div><div><Clock3 size={20} /><span>Good mornings. Better afternoons.<small>Opening hours to be announced</small></span></div></div><button className="button" onClick={() => setDialog({ kind: "contact" })}>Let’s talk coffee <ArrowUpRight size={18} /></button></div><div className="map-placeholder reveal" aria-label="Illustrated map placeholder. Café location to be confirmed."><div className="map-block block-one" /><div className="map-block block-two" /><div className="map-block block-three" /><div className="map-block block-four" /><div className="map-road road-one" /><div className="map-road road-two" /><div className="map-road road-three" /><div className="map-park" /><span className="map-street">GOOD COMPANY LANE</span><span className="map-street second-street">COFFEE CORNER</span><div className="map-pin"><Coffee size={28} /><span>YOU BELONG HERE</span></div><div className="map-card"><div><strong>Your next favourite spot.</strong><span>Location details coming soon</span></div><MapPin size={24} /></div><span className="map-disclaimer">ILLUSTRATED MAP · LOCATION PLACEHOLDER</span></div></div></section>

      <section className="last-call"><div className="container"><span>A LITTLE NAUGHTY. A LOT TO LOVE.</span><a href="#menu">See you over coffee.<ArrowUpRight /></a></div></section>
    </main>

    <footer><div className="container"><div className="footer-top"><Wordmark light /><p>Good coffee. Good people.<br />A little attitude.</p><nav aria-label="Footer navigation"><a href="#about">Our story</a><a href="#menu">The coffee</a><a href="#visit">Visit us</a></nav><div className="socials"><button onClick={() => setDialog({ kind: "contact" })} aria-label="Instagram availability"><Instagram size={19} /></button><button onClick={() => setDialog({ kind: "contact" })} aria-label="Contact Naughty Coffee"><Mail size={19} /></button></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Naughty Coffee. All good things reserved.</span><span>BREWED WITH LOVE & A LITTLE MISCHIEF. <Heart size={12} /></span></div></div></footer>

    <dialog ref={modalRef} className={`modal ${dialog?.kind === "image" ? "image-modal" : ""}`} onCancel={() => setDialog(null)} onClick={e => { if (e.target === e.currentTarget) setDialog(null); }} aria-labelledby="dialog-title"><button className="modal-close" onClick={() => setDialog(null)} aria-label="Close dialog"><X size={22} /></button>{dialog?.kind === "product" && <><img className="modal-product-image" src={dialog.product.image} alt={dialog.product.name} /><div className="modal-copy"><Eyebrow>{dialog.product.tag}</Eyebrow><h2 id="dialog-title">{dialog.product.name}</h2><p>{dialog.product.detail}</p><button className="button" onClick={() => setSaved(current => current.includes(dialog.product.name) ? current.filter(name => name !== dialog.product.name) : [...current, dialog.product.name])}>{saved.includes(dialog.product.name) ? <><Check size={17} /> Saved to your favourites</> : <><Heart size={17} /> Save for your visit</>}</button><small className="modal-note">A sample menu for this brand concept. Availability, ingredients, and prices to be confirmed in-store.</small></div></>}{dialog?.kind === "image" && <><img className="lightbox-image" src={dialog.src} alt={dialog.alt} /><p id="dialog-title" className="lightbox-caption">{dialog.alt}</p></>}{dialog?.kind === "contact" && <div className="modal-copy contact-copy"><Coffee size={35} strokeWidth={1.3} /><Eyebrow>LET’S TALK COFFEE</Eyebrow><h2 id="dialog-title">Good things<br />are <em>brewing.</em></h2><p>This homepage is a Naughty Coffee brand concept. Contact details, social accounts, and our café location will be added once confirmed.</p><button className="button" onClick={() => { setDialog(null); document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" }); }}>Explore the coffee <ArrowRight size={17} /></button></div>}</dialog>
  </>;
}
