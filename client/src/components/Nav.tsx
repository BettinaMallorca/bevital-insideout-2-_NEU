import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const C = {
  pink:      "#993a74",
  terra:     "#C17B52",
  cream:     "#FAF6F1",
  creamDeep: "#e2d5c8",
  night:     "#1C1F2E",
  text:      "#2a1f1a",
  textMuted: "#6b5a52",
};

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#angebote", label: "Angebote" },
    { href: "#aroha",    label: "AROHA" },
    { href: "#about",    label: "Über mich" },
    { href: "#reset",    label: "RESET" },
    { href: "#mallorca", label: "Mallorca" },
  ];

  return (
    <>
      <ProgressBar />
      <nav className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 lg:px-14 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl shadow-sm border-b"
          : "bg-transparent"
      }`}
        style={scrolled ? { background: `${C.cream}f5`, borderColor: C.creamDeep } : {}}>

        <a href="#" className="font-display text-xl font-medium tracking-tight"
          style={{ fontFamily: "var(--font-display)", color: C.text }}>
          beVital{" "}
          <em className="not-italic" style={{ fontStyle: "italic", color: C.pink }}>InsideOut</em>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href}
              className="text-xs font-semibold tracking-widest uppercase transition-colors"
              style={{ color: C.textMuted }}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = C.pink)}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = C.textMuted)}>
              {l.label}
            </a>
          ))}
          <a href="#guides" className="btn-pill btn-pink text-xs">Gratis Guide</a>
        </div>

        {/* Mobile burger */}
        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menü"
          style={{ color: C.text }}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 border-b shadow-lg flex flex-col"
          style={{ background: C.cream, borderColor: C.creamDeep }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              className="px-6 py-4 text-sm font-semibold tracking-widest uppercase border-b transition-colors"
              style={{ color: C.text, borderColor: `${C.creamDeep}80` }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "#f0e8de")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}>
              {l.label}
            </a>
          ))}
          <a href="#guides" onClick={() => setMenuOpen(false)}
            className="mx-4 my-4 btn-pill btn-pink text-center text-xs">
            Gratis Guide
          </a>
        </div>
      )}
    </>
  );
}

function ProgressBar() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setWidth(pct);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 h-[3px] z-[60] transition-all duration-75"
      style={{ width: `${width}%`, background: `linear-gradient(90deg, #993a74, #C17B52)` }} />
  );
}
