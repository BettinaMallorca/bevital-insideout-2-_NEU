/**
 * beVital InsideOut – Shared Layout
 * KEINE schwarzen oder nachtblauen Farben – nur beVital-Palette
 * TerraDark #8C492E als "dunkle" Farbe · Sage #7A9E7E als Kontrast
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const C = {
  pink:       "#993A74",
  pinkDark:   "#7a2d5c",
  terraLight: "#C17B52",
  terraDark:  "#8C492E",
  sage:       "#7A9E7E",
  sageDark:   "#5a7d5e",
  cream:      "#FAF6F1",
  creamDark:  "#F0E8DE",
  creamDeep:  "#e2d5c8",
  text:       "#3d2b22",
  textMuted:  "#8a6e62",
};

const NAV_LINKS = [
  { href: "/",           label: "Start" },
  { href: "/kurse",      label: "Kurse" },
  { href: "/minikurs",   label: "Mini-Kurs" },
  { href: "/angebote",   label: "Angebote" },
  { href: "/retreat",    label: "Retreat" },
  { href: "/ueber-mich", label: "Über mich" },
  { href: "/kontakt",    label: "Kontakt" },
  { href: "/studio",     label: "Mein Studio" },
];

function ProgressBar() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setWidth(Math.min(pct, 100));
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 h-[3px] z-[60] transition-all duration-75"
      style={{ width: `${width}%`, background: `linear-gradient(90deg, ${C.pink}, ${C.terraLight})` }} />
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <>
      <ProgressBar />
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-between px-6 lg:px-16 transition-all duration-300`}
        style={{
          background: scrolled ? `${C.cream}f5` : `${C.cream}e0`,
          backdropFilter: "blur(12px)",
          borderBottom: scrolled ? `1px solid ${C.creamDeep}` : `1px solid ${C.creamDeep}`,
          boxShadow: scrolled ? "0 2px 20px rgba(140,73,46,0.08)" : "none",
        }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <span className="font-normal text-xl tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: C.text }}>
            beVital <em className="not-italic" style={{ fontStyle: "italic", color: C.pink }}>InsideOut</em>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((l) => {
            const active = location === l.href;
            return (
              <Link key={l.href} href={l.href}
                className="text-[0.68rem] font-semibold tracking-widest uppercase transition-all duration-200"
                style={{
                  color: active ? C.pink : C.textMuted,
                  textDecoration: "none",
                  borderBottom: active ? `2px solid ${C.pink}` : "2px solid transparent",
                  paddingBottom: "2px",
                }}>
                {l.label}
              </Link>
            );
          })}
          <a href="https://www.fyndery.de/yoga-by-bettina/" target="_blank" rel="noopener noreferrer"
            className="btn-pill btn-pink" style={{ fontSize: "0.65rem", padding: "0.55rem 1.4rem" }}>
            Kurs buchen
          </a>
        </div>

        {/* Mobile burger */}
        <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menü"
          style={{ color: C.text, background: "transparent", border: "none" }}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-20 left-0 right-0 z-40 flex flex-col border-b shadow-xl"
          style={{ background: C.cream, borderColor: C.creamDeep }}>
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href}
              className="px-6 py-4 text-sm font-semibold tracking-widest uppercase border-b transition-colors"
              style={{
                color: C.text,
                borderColor: `${C.creamDeep}80`,
                textDecoration: "none",
                background: location === l.href ? C.creamDark : "transparent",
              }}>
              {l.label}
            </Link>
          ))}
          <a href="https://www.fyndery.de/yoga-by-bettina/" target="_blank" rel="noopener noreferrer"
            className="mx-4 my-4 btn-pill btn-pink text-center" style={{ fontSize: "0.65rem" }}>
            Kurs buchen
          </a>
        </div>
      )}
    </>
  );
}

export function Footer() {
  return (
    <footer style={{ background: C.terraDark }} className="px-6 lg:px-20 pt-16 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b"
        style={{ borderColor: "rgba(250,246,241,0.12)" }}>

        {/* Brand */}
        <div>
          <div className="font-normal text-xl mb-4"
            style={{ fontFamily: "var(--font-display)", color: C.cream }}>
            beVital <em style={{ fontStyle: "italic", color: C.terraLight }}>InsideOut</em>
          </div>
          <p className="text-sm font-light leading-relaxed mb-5"
            style={{ color: "rgba(250,246,241,0.45)", maxWidth: "260px" }}>
            Yoga, Atemarbeit und Nervensystem-Regulation. Vor Ort in der Wedemark und online.
          </p>
          <a href="https://instagram.com/be_vital_insideout" target="_blank" rel="noopener noreferrer"
            className="text-xs font-semibold tracking-widest uppercase transition-colors"
            style={{ color: "rgba(250,246,241,0.35)", textDecoration: "none" }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = C.terraLight)}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(250,246,241,0.35)")}>
            IG @be_vital_insideout
          </a>
        </div>

        {/* Standorte */}
        <div>
          <h4 className="text-[0.65rem] font-semibold tracking-widest uppercase mb-5"
            style={{ color: C.terraLight }}>Vor Ort</h4>
          <div>
            <div className="text-[0.6rem] font-semibold tracking-widest uppercase mb-1" style={{ color: "rgba(250,246,241,0.3)" }}>Elze</div>
            <a
              href="https://maps.google.com/?q=Kuckucksweg+90,+30900+Wedemark"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-light leading-relaxed block transition-colors"
              style={{ color: "rgba(250,246,241,0.38)", textDecoration: "none" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = C.cream)}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(250,246,241,0.38)")}>
              Sport- und Tanzhaus<br />
              Kuckucksweg 90<br />
              30900 Wedemark-Elze
            </a>
          </div>
        </div>

        {/* Seiten */}
        <div>
          <h4 className="text-[0.65rem] font-semibold tracking-widest uppercase mb-5"
            style={{ color: C.terraLight }}>Seiten</h4>
          <ul className="space-y-3">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href}
                  className="text-sm font-light transition-colors"
                  style={{ color: "rgba(250,246,241,0.38)", textDecoration: "none" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = C.cream)}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(250,246,241,0.38)")}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kontakt & Rechtliches */}
        <div>
          <h4 className="text-[0.65rem] font-semibold tracking-widest uppercase mb-5"
            style={{ color: C.terraLight }}>Kontakt & Rechtliches</h4>
          <ul className="space-y-3">
            {[
              { l: "Kurse buchen", href: "https://www.fyndery.de/yoga-by-bettina/" },
              { l: "Online-Studio", href: "https://bevital-insideout.lovable.app" },
              { l: "Instagram", href: "https://instagram.com/be_vital_insideout" },
              { l: "Impressum", href: "/impressum" },
              { l: "Datenschutz", href: "/datenschutz" },
              { l: "AGB", href: "/agb" },
            ].map((item) => (
              <li key={item.l}>
                <a href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="text-sm font-light transition-colors"
                  style={{ color: "rgba(250,246,241,0.38)", textDecoration: "none" }}
                  onMouseEnter={e => ((e.target as HTMLElement).style.color = C.cream)}
                  onMouseLeave={e => ((e.target as HTMLElement).style.color = "rgba(250,246,241,0.38)")}>
                  {item.l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-3 pt-6">
        <p className="text-xs" style={{ color: "rgba(250,246,241,0.2)" }}>
          © 2026 Bettina Kahmann · beVital InsideOut · Wedemark bei Hannover
        </p>
      </div>
    </footer>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: C.cream }}>
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
