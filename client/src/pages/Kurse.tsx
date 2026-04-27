/**
 * Kurse – Alle Kursangebote mit Terminen
 * Offene Kurse (Präsenz + Online) + Präventionskurse
 */
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { useSEO } from "@/hooks/useSEO";

const C = {
  pink: "#993a74", pinkDark: "#7a2d5c",
  terraLight: "#C17B52", terraDark: "#8c492e",
  sage: "#7A9E7E", sageDark: "#5a7d5e",
  cream: "#FAF6F1", creamDark: "#f0e8de", creamDeep: "#e2d5c8",
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

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[0.68rem] font-semibold tracking-[0.25em] uppercase mb-3 flex items-center gap-3" style={{ color: C.terraLight }}>
      <span className="w-6 h-[1.5px]" style={{ background: C.terraLight }} />{children}
    </div>
  );
}

// ─── Offene Kurse Daten ───────────────────────────────────────────────────────
const OFFENE_PRAESENZ = [
  {
    ort: "Sport- und Tanzhaus",
    zusatz: "Blau-Gelb Elze",
    icon: "🏛️",
    color: C.pink,
    tage: [
      {
        tag: "Dienstag",
        kurse: [
          { zeit: "18:00 – 19:15 Uhr", name: "Hatha Yoga meets Yin", sub: "Stärke & Balance", href: "https://www.fyndery.de/_/kurs/6262/yoga-fuer-strahlende-ausrichtung-kraftvolle-sequenz-trifft-auf-achtsame-tiefe/?ref=7239" },
          { zeit: "19:30 – 20:30 Uhr", name: "YIN Yoga", sub: "Stressabbau, Entspannung & Flexibilität", href: "https://www.fyndery.de/wedemark/kurs/34173/finde-ruhe-kraft-und-balance-mit-yin-yoga-fuer-mehr-achtsamkeit-im-alltag/?ref=7239" },
        ],
      },
      {
        tag: "Donnerstag",
        kurse: [
          { zeit: "18:15 – 19:30 Uhr", name: "Yoga für Männer & Frauen", sub: "Kraft, Beweglichkeit, Fokus", href: "https://www.fyndery.de/_/kurs/30709/staerke-aufbauen-und-entspannen/?ref=7239" },
        ],
      },
    ],
  },
  {
    ort: "YAP – Your Active Place",
    zusatz: "Höpershof",
    icon: "🏋️",
    color: C.terraDark,
    tage: [
      {
        tag: "Mittwoch",
        kurse: [
          { zeit: "18:00 – 18:50 Uhr", name: "AROHA", sub: "Ausdauertraining & Stressabbau", href: "https://www.fyndery.de/online/kurs/14759/effektiver-gesundheitskurs-fuer-straffere-muskeln-und-innere-balance/?ref=7239" },
        ],
      },
    ],
  },
];

const OFFENE_ONLINE = [
  {
    tag: "Dienstag",
    kurse: [{ zeit: "9:00 – 9:50 Uhr", name: "FaszienFit Yoga", sub: "Mobilität, Stärke & Balance", href: "https://www.fyndery.de/online/kurs/16842/faszien-yoga-fuer-dein-ganzheitliches-wohlbefinden/?ref=7239" }],
  },
  {
    tag: "Mittwoch",
    kurse: [{ zeit: "19:30 – 20:30 Uhr", name: "YIN Yoga", sub: "Entspannung, Loslassen & Flexibilität", href: "https://www.fyndery.de/online/kurs/6261/yin-yoga-live-online/?ref=7239" }],
  },
  {
    tag: "Sonntag",
    kurse: [{ zeit: "9:00 – 10:00 Uhr", name: "Morning Energy Yoga", sub: "Power & Energie, Aktivierung", href: "https://www.fyndery.de/online/kurs/16133/morning-energy-yoga-ist-eine-vitalisierende-online-yogastunde/?ref=7239" }],
  },
];

// ─── Präventionskurse Daten ───────────────────────────────────────────────────
const PRAEVENTION_PRAESENZ = [
  {
    name: "Hatha Yoga – Stressbewältigung",
    ort: "Wedemark (Elze)",
    format: "8 Wochen · 1× pro Woche · 90 Min.",
    zertifikat: "§20 SGB V",
    farbe: C.pink,
    highlights: ["Krankenkasse erstattet bis 100%", "Kleine Gruppe (max. 10 Pers.)", "Einstieg jederzeit möglich"],
    beschreibung: "Zertifizierter Präventionskurs nach §20 SGB V. Hatha Yoga zur Stressbewältigung – strukturiert, klar, wirksam. Vor Ort in der Wedemark.",
  },
  {
    name: "Yin Yoga – Entspannung & Regeneration",
    ort: "Wedemark (Elze)",
    format: "8 Wochen · 1× pro Woche · 75 Min.",
    zertifikat: "§20 SGB V",
    farbe: C.terraDark,
    highlights: ["Krankenkasse erstattet bis 100%", "Für Einsteiger geeignet", "Tiefenentspannung & Faszienarbeit"],
    beschreibung: "Yin Yoga für tiefe Entspannung und Regeneration. Zertifizierter Kurs nach §20 SGB V – deine Krankenkasse übernimmt die Kosten.",
  },
];

const PRAEVENTION_ONLINE = [
  {
    name: "Hatha Yoga – Stressbewältigung Online",
    ort: "Live über Zoom",
    format: "8 Wochen · 1× pro Woche · 90 Min.",
    zertifikat: "§20 SGB V",
    farbe: C.sage,
    highlights: ["Krankenkasse erstattet bis 100%", "Von zu Hause aus", "Aufzeichnung verfügbar"],
    beschreibung: "Derselbe zertifizierte Kurs – live über Zoom. Flexibel von zu Hause, mit persönlicher Begleitung durch Bettina.",
  },
  {
    name: "Yin Yoga – Entspannung Online",
    ort: "Live über Zoom",
    format: "8 Wochen · 1× pro Woche · 75 Min.",
    zertifikat: "§20 SGB V",
    farbe: C.sageDark,
    highlights: ["Krankenkasse erstattet bis 100%", "Kleine Gruppe online", "Interaktiv & persönlich"],
    beschreibung: "Yin Yoga live über Zoom – zertifiziert nach §20 SGB V. Entspannung und Regeneration, bequem von zu Hause.",
  },
];

export default function Kurse() {
  useSEO({
    title: "Yoga-Kurse & Präventionskurse §20 SGB V | beVital InsideOut",
    description: "Hatha Yoga, Yin Yoga, AROHA und FaszienFit in der Wedemark & online. Präventionskurse nach §20 SGB V – Krankenkasse zahlt bis zu 100%. Jetzt Platz sichern.",
    keywords: "Yoga Kurse Wedemark, Präventionskurs Yoga §20, Hatha Yoga Hannover, Yin Yoga online, AROHA Training, FaszienFit, Krankenkasse Yoga",
    ogTitle: "Yoga-Kurse & Präventionskurse §20 | beVital InsideOut – Bettina Kahmann",
    ogDescription: "Hatha Yoga, Yin Yoga, AROHA in der Wedemark & online. Präventionskurse §20 SGB V – Krankenkasse zahlt bis zu 100%.",
  });
  return (
    <Layout>
      {/* ── PAGE HERO ──────────────────────────────────────────────────── */}
      <div className="pt-36 pb-16 px-6 lg:px-20" style={{ background: C.terraDark }}>
        <div className="max-w-3xl">
          <Reveal>
            <div className="text-[0.68rem] font-semibold tracking-[0.25em] uppercase mb-4 flex items-center gap-3" style={{ color: C.creamOnDark }}>
              <span className="w-6 h-[1.5px]" style={{ background: C.creamOnDark }} />Kursangebot
            </div>
            <h1 className="font-normal leading-[1.05] mb-4 text-white"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem,5vw,4.5rem)" }}>
              Alle Kurse –<br />
              <em style={{ fontStyle: "italic", color: C.terraOnDark }}>finde deinen Einstieg.</em>
            </h1>
            <p className="text-base font-light leading-relaxed max-w-xl" style={{ color: "rgba(255,255,255,0.55)" }}>
              Offene Kurse zum Drop-in, zertifizierte Präventionskurse (§20 SGB V) und Live-Online-Angebote. Kein Vorkenntnisse nötig.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ── TAB NAVIGATION ─────────────────────────────────────────────── */}
      <TabSection />
    </Layout>
  );
}

function TabSection() {
  const searchParams = new URLSearchParams(window.location.search);
  const initialTab = searchParams.get("tab") === "praevention" ? "praevention" : "offen";
  const [tab, setTab] = useState<"offen" | "praevention">(initialTab);

  return (
    <div style={{ background: C.cream }}>
      {/* Tab bar */}
      <div className="sticky top-16 z-30 border-b px-6 lg:px-20 flex gap-0" style={{ background: C.cream, borderColor: C.creamDeep }}>
        {[
          { id: "offen", label: "Offene Kurse" },
          { id: "praevention", label: "Präventionskurse §20" },
        ].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id as any)}
            className="px-6 py-4 text-sm font-semibold tracking-widest uppercase border-b-2 transition-all duration-200"
            style={{
              color: tab === t.id ? C.pink : C.textMuted,
              borderColor: tab === t.id ? C.pink : "transparent",
              background: "transparent",
            }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── OFFENE KURSE ─────────────────────────────────────────────── */}
      {tab === "offen" && (
        <div className="py-16 px-6 lg:px-20">
          {/* Präsenz */}
          <Reveal>
            <div className="mb-10">
              <Eyebrow>Vor Ort</Eyebrow>
              <h2 className="font-normal leading-[1.1] mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3vw,2.8rem)", color: C.text }}>
                Kurse in der Wedemark
              </h2>
              <p className="text-base font-light" style={{ color: C.textMuted }}>
                Drop-in jederzeit möglich – kein Abo, kein Vertrag.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
            {OFFENE_PRAESENZ.map((loc, i) => (
              <Reveal key={loc.ort} delay={i * 100}>
                <div className="rounded-xl overflow-hidden border shadow-sm" style={{ background: "white", borderColor: C.creamDeep }}>
                  <div className="px-7 py-5 flex items-center gap-4" style={{ background: loc.color }}>
                    <span className="text-2xl">{loc.icon}</span>
                    <div>
                      <div className="text-white font-semibold text-base" style={{ fontFamily: "var(--font-display)" }}>{loc.ort}</div>
                      <div className="text-white/70 text-xs tracking-widest uppercase mt-0.5">{loc.zusatz}</div>
                    </div>
                  </div>
                  <div className="divide-y" style={{ borderColor: C.creamDark }}>
                    {loc.tage.map((d) => (
                      <div key={d.tag} className="px-7 py-5">
                        <div className="text-[0.65rem] font-bold tracking-widest uppercase mb-3 flex items-center gap-2" style={{ color: loc.color }}>
                          <span className="w-4 h-[1.5px]" style={{ background: loc.color }} />{d.tag}
                        </div>
                        <div className="flex flex-col gap-3">
                          {d.kurse.map((k) => (
                            <div key={k.name} className="flex items-start gap-4">
                              <div className="text-xs font-medium tabular-nums mt-0.5 flex-shrink-0 w-36" style={{ color: C.textMuted }}>{k.zeit}</div>
                              <div>
                                {k.href ? (
                                  <a href={k.href} target="_blank" rel="noopener noreferrer"
                                    className="text-sm font-semibold underline underline-offset-2 hover:opacity-75"
                                    style={{ color: loc.color }}>{k.name}</a>
                                ) : (
                                  <div className="text-sm font-semibold" style={{ color: C.text }}>{k.name}</div>
                                )}
                                <div className="text-xs font-light mt-0.5" style={{ color: C.textMuted }}>{k.sub}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-7 py-4 border-t" style={{ borderColor: C.creamDark, background: C.cream }}>
                    <button
                      onClick={() => document.getElementById('kurskalender')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                      className="btn-pill w-full text-center text-xs block"
                      style={{ background: loc.color, color: "white", cursor: "pointer" }}>
                      Platz sichern →
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Online */}
          <Reveal>
            <div className="mb-10">
              <Eyebrow>Live Online</Eyebrow>
              <h2 className="font-normal leading-[1.1] mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3vw,2.8rem)", color: C.text }}>
                Live über Zoom
              </h2>
              <p className="text-base font-light" style={{ color: C.textMuted }}>
                Interaktiv, live und persönlich – von überall aus.
              </p>
            </div>
          </Reveal>

          <div className="rounded-xl overflow-hidden border shadow-sm mb-10" style={{ background: "white", borderColor: C.creamDeep }}>
            <div className="px-7 py-5 flex items-center gap-4" style={{ background: C.sage }}>
              <span className="text-2xl">💻</span>
              <div>
                <div className="text-white font-semibold text-base" style={{ fontFamily: "var(--font-display)" }}>Live-Online über Zoom</div>
                <div className="text-white/70 text-xs tracking-widest uppercase mt-0.5">Interaktiv · Persönlich · Von überall</div>
              </div>
            </div>
            <div className="divide-y" style={{ borderColor: C.creamDark }}>
              {OFFENE_ONLINE.map((d) => (
                <div key={d.tag} className="px-7 py-5">
                  <div className="text-[0.65rem] font-bold tracking-widest uppercase mb-3 flex items-center gap-2" style={{ color: C.sage }}>
                    <span className="w-4 h-[1.5px]" style={{ background: C.sage }} />{d.tag}
                  </div>
                  <div className="flex flex-col gap-3">
                    {d.kurse.map((k) => (
                      <div key={k.name} className="flex items-start gap-4">
                        <div className="text-xs font-medium tabular-nums mt-0.5 flex-shrink-0 w-36" style={{ color: C.textMuted }}>{k.zeit}</div>
                        <div>
                          {k.href ? (
                            <a href={k.href} target="_blank" rel="noopener noreferrer"
                              className="text-sm font-semibold underline underline-offset-2 hover:opacity-75"
                              style={{ color: C.sage }}>{k.name}</a>
                          ) : (
                            <div className="text-sm font-semibold" style={{ color: C.text }}>{k.name}</div>
                          )}
                          <div className="text-xs font-light mt-0.5" style={{ color: C.textMuted }}>{k.sub}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-7 py-4 border-t" style={{ borderColor: C.creamDark, background: C.cream }}>
              <button
                onClick={() => document.getElementById('kurskalender')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="btn-pill btn-sage w-full text-center text-xs block"
                style={{ cursor: "pointer" }}>
                Online-Platz sichern →
              </button>
            </div>
          </div>

          {/* Fyndery Kalender */}
          <Reveal>
            <div className="mb-14">
              <div className="mb-8">
                <Eyebrow>Aktuelle Termine</Eyebrow>
                <h2 className="font-normal leading-[1.1] mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3vw,2.8rem)", color: C.text }}>
                  Direkt buchen
                </h2>
                <p className="text-base font-light" style={{ color: C.textMuted }}>
                  Alle verfügbaren Termine auf einen Blick – wähle deinen Kurs und sichere deinen Platz.
                </p>
              </div>
              <div id="kurskalender" className="rounded-xl overflow-hidden border p-4" style={{ background: "white", borderColor: C.creamDeep }}>
                <FynderyCalendar />
              </div>
            </div>
          </Reveal>

          {/* Drop-in Info */}
          <Reveal>
            <div className="rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
              style={{ background: C.terraDark }}>
              <div>
                <div className="text-[0.65rem] font-semibold tracking-widest uppercase mb-2" style={{ color: C.terraLight }}>
                  ✅ Drop-in jederzeit möglich
                </div>
                <p className="text-white font-light text-base leading-relaxed max-w-md">
                  Alle offenen Kurse sind ohne Anmeldung buchbar. Einfach Platz sichern und loslegen – kein Abo, kein Vertrag.
                </p>
              </div>
              <a href="https://www.fyndery.de/yoga-by-bettina/" target="_blank" rel="noopener noreferrer"
                className="btn-pill btn-pink flex-shrink-0">
                Jetzt buchen →
              </a>
            </div>
          </Reveal>
        </div>
      )}

      {/* ── PRÄVENTIONSKURSE ─────────────────────────────────────────── */}
      {tab === "praevention" && (
        <div className="py-16 px-6 lg:px-20">
          {/* Info-Banner */}
          <Reveal>
            <div className="rounded-xl p-8 mb-14 flex flex-col md:flex-row items-start gap-6"
              style={{ background: `${C.pink}12`, border: `1px solid ${C.pink}30` }}>
              <div className="text-4xl flex-shrink-0">🏥</div>
              <div>
                <div className="text-[0.65rem] font-semibold tracking-widest uppercase mb-2" style={{ color: C.pink }}>§20 SGB V – Krankenkasse zahlt</div>
                <h3 className="font-semibold text-lg mb-2" style={{ fontFamily: "var(--font-display)", color: C.text }}>
                  Bis zu 100% Erstattung durch deine Krankenkasse
                </h3>
                <p className="text-sm font-light leading-relaxed" style={{ color: C.textMuted }}>
                  Meine Präventionskurse sind nach §20 SGB V zertifiziert (ZPP). Die meisten gesetzlichen Krankenkassen erstatten 80–100% der Kursgebühr. Du buchst den Kurs, bezahlst ihn zunächst selbst und beantragst anschließend die Erstattung bei deiner Kasse.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Präsenz */}
          <Reveal>
            <div className="mb-10">
              <Eyebrow>Präsenz – Wedemark</Eyebrow>
              <h2 className="font-normal leading-[1.1] mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3vw,2.8rem)", color: C.text }}>
                Präventionskurse vor Ort
              </h2>
              <p className="text-base font-light" style={{ color: C.textMuted }}>
                8 Wochen, strukturiert, mit persönlicher Begleitung – in der Wedemark.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {PRAEVENTION_PRAESENZ.map((k, i) => (
              <Reveal key={k.name} delay={i * 100}>
                <PraeventionCard kurs={k} />
              </Reveal>
            ))}
          </div>

          {/* Online */}
          <Reveal>
            <div className="mb-10">
              <Eyebrow>Live Online – Zoom</Eyebrow>
              <h2 className="font-normal leading-[1.1] mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3vw,2.8rem)", color: C.text }}>
                Präventionskurse online
              </h2>
              <p className="text-base font-light" style={{ color: C.textMuted }}>
                Dieselbe Qualität – live über Zoom, von zu Hause aus.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
            {PRAEVENTION_ONLINE.map((k, i) => (
              <Reveal key={k.name} delay={i * 100}>
                <PraeventionCard kurs={k} />
              </Reveal>
            ))}
          </div>

          {/* Ablauf */}
          <Reveal>
            <div className="rounded-xl overflow-hidden border" style={{ borderColor: C.creamDeep }}>
              <div className="px-8 py-5 border-b" style={{ background: C.terraDark, borderColor: "rgba(255,255,255,0.08)" }}>
                <h3 className="font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>So funktioniert die Erstattung</h3>
              </div>
              <div className="divide-y" style={{ background: "white", borderColor: C.creamDark }}>
                {[
                  { n: "1", t: "Kurs buchen & bezahlen", d: "Du buchst deinen Präventionskurs und bezahlst die Kursgebühr." },
                  { n: "2", t: "Teilnahmebescheinigung erhalten", d: "Nach Kursabschluss erhältst du eine offizielle Bescheinigung von mir." },
                  { n: "3", t: "Bei Krankenkasse einreichen", d: "Du reichst die Bescheinigung bei deiner Krankenkasse ein." },
                  { n: "4", t: "Erstattung erhalten", d: "Die meisten Kassen erstatten 80–100% – direkt auf dein Konto." },
                ].map((s) => (
                  <div key={s.n} className="flex items-start gap-5 px-8 py-5">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-sm"
                      style={{ background: `${C.pink}18`, color: C.pink }}>{s.n}</div>
                    <div>
                      <div className="text-sm font-semibold mb-1" style={{ color: C.text }}>{s.t}</div>
                      <div className="text-sm font-light" style={{ color: C.textMuted }}>{s.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      )}
    </div>
  );
}

function FynderyCalendar() {
  return (
    <div>
      <iframe
        src="https://www.fyndery.de/book_course/calendar/7239/1/"
        frameBorder={0}
        style={{ width: "100%", minHeight: 600, border: "none" }}
        title="Kurskalender – Bettina Kahmann"
        loading="lazy"
      />
      <p className="text-xs text-center mt-3" style={{ color: C.textMuted }}>
        Probleme bei der Buchung? Tickets auch über{" "}
        <a
          href="https://www.fyndery.de/coach/7239/bettina-kahmann-yoga-by-bettina/?ref=7239"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: C.pink }}
        >
          diesen Link
        </a>{" "}
        buchbar.
      </p>
    </div>
  );
}

function PraeventionCard({ kurs }: { kurs: typeof PRAEVENTION_PRAESENZ[0] }) {
  return (
    <div className="rounded-xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{ background: "white", borderColor: C.creamDeep }}>
      <div className="h-3" style={{ background: kurs.farbe }} />
      <div className="p-7">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[0.62rem] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
            style={{ background: `${kurs.farbe}18`, color: kurs.farbe }}>{kurs.zertifikat}</span>
          <span className="text-[0.62rem] font-medium px-2.5 py-1 rounded-full"
            style={{ background: C.creamDark, color: C.textMuted }}>📍 {kurs.ort}</span>
        </div>
        <h3 className="font-semibold text-lg mb-1" style={{ fontFamily: "var(--font-display)", color: C.text }}>{kurs.name}</h3>
        <div className="text-xs font-medium mb-4" style={{ color: C.textMuted }}>{kurs.format}</div>
        <p className="text-sm font-light leading-relaxed mb-5" style={{ color: C.textMuted }}>{kurs.beschreibung}</p>
        <div className="flex flex-col gap-2 mb-6">
          {kurs.highlights.map((h) => (
            <div key={h} className="flex items-center gap-2 text-sm font-light">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: kurs.farbe }} />
              <span style={{ color: C.text }}>{h}</span>
            </div>
          ))}
        </div>
        <a href="mailto:bettinakahmann@me.com?subject=Anmeldung%20Pr%C3%A4ventionskurs"
          className="btn-pill w-full text-center text-xs block"
          style={{ background: kurs.farbe, color: "white" }}>
          Jetzt anmelden →
        </a>
      </div>
    </div>
  );
}
