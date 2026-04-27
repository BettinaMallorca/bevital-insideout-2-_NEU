/**
 * Angebote – Alle Angebote im Überblick
 */
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { useSEO } from "@/hooks/useSEO";

const C = {
  pink: "#993a74", pinkDark: "#7a2d5c",
  terraLight: "#C17B52", terraDark: "#8c492e",
  sage: "#7A9E7E", cream: "#FAF6F1", creamDark: "#f0e8de", creamDeep: "#e2d5c8",
  text: "#3d2b22", textMuted: "#8a6e62", creamOnDark: "#FAF6F1", terraOnDark: "#e8b896",
};

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [visible, setVisible] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!ref) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.08 });
    obs.observe(ref);
    return () => obs.disconnect();
  }, [ref]);
  return (
    <div ref={setRef} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)", transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

const ANGEBOTE = [
  {
    icon: "🧘",
    title: "Offene Kurse",
    sub: "Drop-in jederzeit",
    color: C.pink,
    preis: "Einzelstunde buchbar",
    highlights: ["Hatha Yoga, Yin Yoga, AROHA, FaszienFit", "Vor Ort in Elze & Höpershof", "Live Online über Zoom", "Kein Abo, kein Vertrag"],
    beschreibung: "Offene Kurse ohne Verpflichtung. Komm, wenn du kannst – wöchentlich oder unregelmäßig. Einstieg jederzeit möglich.",
    cta: "Kursplan ansehen",
    href: "/kurse",
    extern: false,
  },
  {
    icon: "🏥",
    title: "Präventionskurse §20",
    sub: "Krankenkasse zahlt",
    color: C.terraDark,
    preis: "Bis 100% Erstattung",
    highlights: ["8 Wochen strukturierter Kurs", "ZPP-zertifiziert nach §20 SGB V", "Präsenz Wedemark + Live Online", "Kleine Gruppen, klare Struktur"],
    beschreibung: "Zertifizierte Präventionskurse – deine Krankenkasse erstattet bis zu 100% der Kursgebühr. Hatha Yoga und Yin Yoga.",
    cta: "Zu den Präventionskursen",
    href: "/kurse?tab=praevention",
    extern: false,
  },
  {
    icon: "📱",
    title: "LIVE Yoga Studio",
    sub: "Online-Mitgliedschaft",
    color: C.sage,
    preis: "125 € / 2 Monate",
    highlights: ["16 Live-Sessions in 2 Monaten", "400+ Videos on demand", "Yoga, Faszien, Pilates, Atemarbeit", "Flexible Nutzung von zu Hause"],
    beschreibung: "Das Online-Studio für alle, die flexibel bleiben wollen. Live dabei sein oder die Videothek nutzen – wann immer du Zeit hast.",
    cta: "Zum Online-Studio",
    href: "https://bettina-kahmann.coachy.net/lp/bettina-kahmann-1/",
    extern: true,
  },
  {
    icon: "💪",
    title: "Personal Training",
    sub: "Individuelle Begleitung",
    color: C.terraLight,
    preis: "Kostenloses Erstgespräch",
    highlights: ["1:1 – auf dich abgestimmt", "Online oder vor Ort in Wedemark", "Körper, Atem, Nervensystem", "Klare Struktur, direkte Anleitung"],
    beschreibung: "Individuelle Einheiten, die auf deinen Körper und deinen Alltag abgestimmt sind. Kein Standard-Programm – sondern genau das, was du brauchst.",
    cta: "Erstgespräch buchen",
    href: "/kontakt",
    extern: false,
  },
  {
    icon: "🔄",
    title: "RESET – 8 Wochen",
    sub: "Strukturiertes Programm",
    color: C.pink,
    preis: "Warteliste offen",
    highlights: ["8 Wochen intensives Programm", "Yoga + Atem + Nervensystem", "Kleine Gruppe, enge Begleitung", "Nächster Start: auf Anfrage"],
    beschreibung: "Das RESET-Programm kombiniert Yoga, Atemarbeit und Nervensystem-Regulation zu einem strukturierten 8-Wochen-Weg.",
    cta: "Auf Warteliste",
    href: "https://reset-warteliste.lovable.app/",
    extern: true,
  },
  {
    icon: "🌴",
    title: "Retreat Mallorca",
    sub: "Santanyí · Auf Anfrage",
    color: C.terraDark,
    preis: "Auf Anfrage",
    highlights: ["Intensiv-Tage auf Mallorca", "Yoga, Natur, Stille, Gemeinschaft", "Kleines Ferienhaus in Santanyí", "Begrenzte Teilnehmerinnenzahl"],
    beschreibung: "Yoga-Retreat auf Mallorca – in Bettinas eigenem Ferienhaus in Santanyí. Kleine Gruppe, intensive Tage, echte Auszeit.",
    cta: "Anfragen",
    href: "/kontakt",
    extern: false,
  },

  {
    icon: "⚖️",
    title: "Blissful Balance – 21 Tage Balance",
    sub: "Kurzprogramm",
    color: C.terraLight,
    preis: "Auf Anfrage",
    highlights: ["21 Tage strukturiertes Programm", "Täglich umsetzbare Impulse", "Körper, Geist & Ernährung", "Für Einsteiger geeignet"],
    beschreibung: "21 Tage – täglich ein klarer Impuls. Kein Aufwand, kein Druck. Nur ein kleiner Schritt pro Tag, der sich summiert.",
    cta: "Zum Kurs",
    href: "https://bettina-kahmann.coachy.net/lp/blissful-balance-3/",
    extern: true,
  },
];

export default function Angebote() {
  useSEO({
    title: "Angebote: Online-Studio, Retreat & Präventionskurse | beVital InsideOut",
    description: "LIVE Yoga Studio online, Yoga-Retreat Mallorca, RESET-Programm und Präventionskurse §20 SGB V. Nervensystem regulieren mit Bettina Kahmann – flexibel von zu Hause oder vor Ort.",
    keywords: "Online Yoga Studio, Yoga Retreat Mallorca, RESET Programm, Präventionskurs online, Nervensystem regulieren, beVital InsideOut",
    ogTitle: "Angebote: Online-Studio, Retreat & Präventionskurse | beVital InsideOut",
    ogDescription: "LIVE Yoga Studio online, Yoga-Retreat Mallorca und Präventionskurse §20 SGB V mit Bettina Kahmann.",
  });
  return (
    <Layout>
      {/* Hero */}
      <div className="pt-36 pb-16 px-6 lg:px-20" style={{ background: C.terraDark }}>
        <div className="max-w-3xl">
          <Reveal>
            <div className="text-[0.68rem] font-semibold tracking-[0.25em] uppercase mb-4 flex items-center gap-3" style={{ color: C.creamOnDark }}>
              <span className="w-6 h-[1.5px]" style={{ background: C.creamOnDark }} />Angebote
            </div>
            <h1 className="font-normal leading-[1.05] mb-4 text-white"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem,5vw,4.5rem)" }}>
              Alle Angebote –<br />
              <em style={{ fontStyle: "italic", color: C.terraOnDark }}>finde deinen Weg.</em>
            </h1>
            <p className="text-base font-light leading-relaxed max-w-xl" style={{ color: "rgba(255,255,255,0.55)" }}>
              Von offenen Kursen bis zum intensiven Retreat. Alles ist darauf ausgelegt, deinen Alltag zu entlasten – nicht zu erweitern.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Angebots-Grid */}
      <div className="px-6 lg:px-20 py-20" style={{ background: C.cream }}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {ANGEBOTE.map((a, i) => (
            <Reveal key={a.title} delay={i * 60}>
              <div className="rounded-xl overflow-hidden border flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ background: "white", borderColor: C.creamDeep }}>
                <div className="h-2" style={{ background: a.color }} />
                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">{a.icon}</span>
                    <span className="text-[0.62rem] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                      style={{ background: `${a.color}18`, color: a.color }}>{a.preis}</span>
                  </div>
                  <h3 className="font-semibold text-xl mb-1" style={{ fontFamily: "var(--font-display)", color: C.text }}>{a.title}</h3>
                  <div className="text-xs font-medium tracking-widest uppercase mb-4" style={{ color: a.color }}>{a.sub}</div>
                  <p className="text-sm font-light leading-relaxed mb-5 flex-1" style={{ color: C.textMuted }}>{a.beschreibung}</p>
                  <div className="flex flex-col gap-2 mb-6">
                    {a.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2 text-sm font-light">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: a.color }} />
                        <span style={{ color: C.text }}>{h}</span>
                      </div>
                    ))}
                  </div>
                  <a href={a.href} target={a.extern ? "_blank" : undefined} rel={a.extern ? "noopener noreferrer" : undefined}
                    className="btn-pill w-full text-center text-xs block"
                    style={{ background: a.color, color: "white" }}>
                    {a.cta} →
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Retreat Testimonial */}
      <div className="px-6 lg:px-20 py-16" style={{ background: C.creamDark }}>
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-[0.68rem] font-semibold tracking-[0.25em] uppercase mb-8 flex items-center justify-center gap-3" style={{ color: C.terraLight }}>
              <span className="w-6 h-[1.5px]" style={{ background: C.terraLight }} />
              Stimmen aus dem Retreat
              <span className="w-6 h-[1.5px]" style={{ background: C.terraLight }} />
            </div>
            <div className="rounded-xl p-8 border" style={{ background: "white", borderColor: C.creamDeep }}>
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="text-sm" style={{ color: C.terraLight }}>★</span>
                ))}
              </div>
              <p className="text-base font-light leading-relaxed italic mb-6" style={{ color: C.textMuted }}>
                „Mallorca, eine der schönsten Inseln überhaupt, und dort ein Yogaretreat zu erleben – einfach nur wunderschön. Ich durfte dies schon zum zweiten Mal erleben. Yoga, Breathwork, Meditation, gute Gespräche, tolle Badebuchten und gutes Essen haben diese Woche zu einem wirklich besonderen Erlebnis werden lassen."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold text-white flex-shrink-0" style={{ background: C.sage }}>H</div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: C.text }}>Heidi</div>
                  <div className="text-xs" style={{ color: C.textMuted }}>Retreat Mallorca · 2× Teilnehmerin</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 lg:px-20 py-16" style={{ background: C.terraDark }}>
        <Reveal>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-normal mb-4 text-white" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3vw,2.6rem)" }}>
              Nicht sicher, was zu dir passt?
            </h2>
            <p className="text-base font-light mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
              Schreib mir direkt – ich helfe dir, das richtige Angebot zu finden.
            </p>
            <a href="/kontakt" className="btn-pill btn-pink">Kontakt aufnehmen →</a>
          </div>
        </Reveal>
      </div>
    </Layout>
  );
}
