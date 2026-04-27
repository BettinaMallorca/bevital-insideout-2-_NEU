/**
 * beVital Retreat Mallorca – Eigene Seite
 * Farben: beVital-Palette (Pink #993A74, TerraLight #C17B52, TerraDark #8C492E, Sage #7A9E7E, Cream #FAF6F1, CreamDark #F0E8DE)
 */
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { useSEO } from "@/hooks/useSEO";

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
  text:       "#2a1f1a",
  textMuted:  "#6b5a52",
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

function Eyebrow({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div className={`text-[0.68rem] font-semibold tracking-[0.25em] uppercase mb-3 flex items-center gap-3 ${center ? "justify-center" : ""}`} style={{ color: C.terraLight }}>
      <span className="w-6 h-[1.5px]" style={{ background: C.terraLight }} />{children}{center && <span className="w-6 h-[1.5px]" style={{ background: C.terraLight }} />}
    </div>
  );
}

const PROGRAMM = [
  {
    icon: "🧘",
    titel: "Tägliche Yoga-Sessions (Hatha & Yin)",
    beschreibung: "Klar angeleitet, ruhig aufgebaut. Für Stabilität, Beweglichkeit und echte Präsenz im Körper.",
    farbe: C.pink,
  },
  {
    icon: "🌬️",
    titel: "Geführte Atemsessions",
    beschreibung: "Konkrete Techniken, die dein Nervensystem runterfahren und dir sofort mehr Ruhe geben.",
    farbe: C.sage,
  },
  {
    icon: "🌿",
    titel: "Nervensystem-Reset & Regulation",
    beschreibung: "Du lernst, Spannungen bewusst zu lösen und wieder in einen stabilen Zustand zu kommen.",
    farbe: C.sageDark,
  },
  {
    icon: "🌺",
    titel: "Ätherische Öle & Aromatherapie",
    beschreibung: "Gezielter Einsatz für Entspannung, Fokus und emotionale Balance – direkt in deinen Alltag übertragbar.",
    farbe: C.terraLight,
  },
  {
    icon: "🍽️",
    titel: "Frische, gesunde Mahlzeiten",
    beschreibung: "Leicht, nährend, klar. Essen, das dich unterstützt – nicht belastet.",
    farbe: C.terraDark,
  },
  {
    icon: "🌿",
    titel: "Marktbesuch in Santanyí",
    beschreibung: "Gemeinsam über den Wochenmarkt, lokale Produkte entdecken, kleine Verkostungen – entspannt, ohne Druck.",
    farbe: C.sage,
  },
  {
    icon: "🌴",
    titel: "Ausflug nach Palma de Mallorca",
    beschreibung: "Altstadt, kleine Cafés, ein Hauch Kultur – bewusst gewählt, nicht durchgetaktet.",
    farbe: C.terraLight,
  },
  {
    icon: "🏝️",
    titel: "Freie Zeit für dich",
    beschreibung: "Pool, Sonne, Rückzug. Integration statt Dauerprogramm.",
    farbe: C.pink,
  },
];

export default function Retreat() {
  useSEO({
    title: "Yoga-Retreat Mallorca Herbst 2026 | beVital InsideOut",
    description: "5 Tage Yoga-Retreat auf Mallorca nahe Santaný – max. 4 Frauen, Herbst 2026. Hatha Yoga, Yin Yoga, Atemarbeit und Nervensystem-Regulation mit Bettina Kahmann. Frühbucherpreis ab 1.522 €.",
    keywords: "Yoga Retreat Mallorca, Yoga Retreat Herbst 2026, Yoga Retreat kleine Gruppe, Nervensystem Retreat, Bettina Kahmann Retreat, beVital Retreat",
    ogTitle: "Yoga-Retreat Mallorca Herbst 2026 – 5 Tage, max. 4 Frauen | beVital InsideOut",
    ogDescription: "5 Tage Yoga, Atemarbeit und Nervensystem-Regulation auf Mallorca. Kleine Gruppe, persönliche Begleitung. Frühbucherpreis ab 1.522 €.",
  });
  return (
    <Layout>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-end pb-20 overflow-hidden">
        <img
          src="/manus-storage/retreat_mallorca_9fd4c4ff.jpg"
          alt="beVital Retreat Mallorca"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, rgba(140,73,46,0.82) 0%, rgba(140,73,46,0.45) 60%, transparent 100%)` }} />

        <div className="relative z-10 px-6 lg:px-20 max-w-3xl">
          <Reveal>
            <Eyebrow>Retreat · Mallorca · Herbst 2026</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-normal leading-[1.02] mb-6"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem,6vw,5.5rem)", color: C.cream }}>
              beVital Retreat<br />
              <em style={{ fontStyle: "italic", color: C.terraLight }}>Mallorca.</em>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-base font-light leading-relaxed mb-8 max-w-lg" style={{ color: "rgba(250,246,241,0.75)" }}>
              5 Tage · max. 4 Frauen · Komfortabel & stilvoll.<br />
              Yoga, Atemarbeit, Stille und Sonne – in Santanyí.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <a href="mailto:mail@bettina-kahmann.com?subject=Retreat%20Mallorca%20Anfrage" className="btn-pill btn-pink">
              Jetzt anfragen →
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-20 py-10 border-b" style={{ background: C.terraDark, borderColor: "rgba(250,246,241,0.1)" }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { n: "5", l: "Tage" },
            { n: "4", l: "Max. Frauen" },
            { n: "8", l: "Programmpunkte" },
            { n: "Herbst", l: "2026" },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 80}>
              <div className="text-center">
                <div className="font-normal text-3xl mb-1" style={{ fontFamily: "var(--font-display)", color: C.terraLight }}>{s.n}</div>
                <div className="text-[0.65rem] font-semibold tracking-widest uppercase" style={{ color: "rgba(250,246,241,0.4)" }}>{s.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PROGRAMM ──────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-20 py-24" style={{ background: C.cream }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <Eyebrow center>Was dich erwartet</Eyebrow>
              <h2 className="font-normal" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,3.5vw,3rem)", color: C.text }}>
                Das Programm
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROGRAMM.map((p, i) => (
              <Reveal key={p.titel} delay={i * 60}>
                <div className="rounded-xl p-7 border flex items-start gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ background: "white", borderColor: C.creamDeep }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-xl"
                    style={{ background: `${p.farbe}18` }}>
                    {p.icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold mb-1.5" style={{ color: p.farbe }}>{p.titel}</div>
                    <div className="text-sm font-light leading-relaxed" style={{ color: C.textMuted }}>{p.beschreibung}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREISE ────────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-20 py-24" style={{ background: C.creamDark }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <Eyebrow center>Investition</Eyebrow>
              <h2 className="font-normal" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,3.5vw,3rem)", color: C.text }}>
                Preise & Leistungen
              </h2>
            </div>
          </Reveal>
          {/* Frühbucher-Banner */}
          <Reveal>
            <div className="rounded-xl p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4"
              style={{ background: C.pink }}>
              <div>
                <div className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "rgba(250,246,241,0.7)" }}>Frühbucherpreis</div>
                <div className="text-base font-light" style={{ color: C.cream }}>Spare 15 % – gültig bis 2 Monate vor Retreat-Beginn</div>
              </div>
              <a href="mailto:mail@bettina-kahmann.com?subject=Retreat%20Mallorca%20Fr%C3%BChbucher" className="btn-pill whitespace-nowrap" style={{ background: C.cream, color: C.pink, border: "none" }}>Jetzt sichern →</a>
            </div>
          </Reveal>

          {/* Preiskarten */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[
              {
                typ: "Einzelzimmer",
                icon: "🛏️",
                preis: "1.947 €",
                normalpreis: "2.290 €",
                highlight: true,
              },
              {
                typ: "Doppelzimmer",
                icon: "🛏️🛏️",
                preis: "1.522 €",
                normalpreis: "1.790 €",
                highlight: false,
              },
            ].map((p, i) => (
              <Reveal key={p.typ} delay={i * 100}>
                <div className={`rounded-xl overflow-hidden border ${p.highlight ? "shadow-xl" : ""}`}
                  style={{ background: "white", borderColor: p.highlight ? C.pink : C.creamDeep }}>
                  {p.highlight && <div className="h-1.5" style={{ background: C.pink }} />}
                  <div className="p-8 text-center">
                    <div className="text-3xl mb-4">{p.icon}</div>
                    <div className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: C.textMuted }}>{p.typ}</div>
                    <div className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3" style={{ background: C.creamDark, color: C.pink }}>Frühbucherpreis</div>
                    <div className="font-normal text-5xl mb-1" style={{ fontFamily: "var(--font-display)", color: C.pink }}>{p.preis}</div>
                    <div className="text-sm line-through mb-1" style={{ color: C.textMuted }}>{p.normalpreis}</div>
                    <div className="text-xs font-light" style={{ color: C.textMuted }}>pro Person · bei Buchung bis 2 Monate vor Retreat</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Leistungen */}
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl p-6 border" style={{ background: "white", borderColor: C.creamDeep }}>
                <div className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: C.sage }}>Inklusive</div>
                <ul className="space-y-2">
                  {[
                    "Unterkunft in einer ruhigen, stilvollen Finca nahe Santanyí",
                    "Tägliches Frühstück",
                    "Alle Programmpunkte",
                    "Ausflüge & Fahrten vor Ort",
                    "Marktbesuch in Santanyí",
                    "Ausflug nach Palma de Mallorca",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm font-light" style={{ color: C.textMuted }}>
                      <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: C.sage }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl p-6 border" style={{ background: "white", borderColor: C.creamDeep }}>
                <div className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: C.terraLight }}>Nicht inklusive</div>
                <ul className="space-y-2">
                  {[
                    "Flug",
                    "Transfer",
                    "Mittagessen",
                    "Abendessen",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm font-light" style={{ color: C.textMuted }}>
                      <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: C.terraLight }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Hinweis kleine Gruppe */}
          <Reveal>
            <div className="rounded-xl p-6 border text-center" style={{ background: C.terraDark, borderColor: C.terraDark }}>
              <p className="text-base font-light leading-relaxed" style={{ color: C.cream }}>
                <strong style={{ color: C.terraLight }}>Kleine Gruppe. Maximal 4 Frauen.</strong><br />
                Persönliche Begleitung über die gesamten 5 Tage – beVital Retreat. Kein Massenformat.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── GALERIE ───────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-20 py-24" style={{ background: C.creamDark }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <Eyebrow center>Eindrücke</Eyebrow>
              <h2 className="font-normal" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,3.5vw,3rem)", color: C.text }}>
                5 Tage Mallorca –
                <em style={{ fontStyle: "italic", color: C.terraLight }}> so sieht es aus.</em>
              </h2>
            </div>
          </Reveal>

          {/* Masonry-ähnliches Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { src: "/manus-storage/IMG_8517_f283dfbc.webp", alt: "Yoga-Session am Meer – Atemübungen mit Blick auf die Bucht", span: "col-span-2 row-span-2" },
              { src: "/manus-storage/IMG_9583_39397e4e.webp", alt: "Das Ferienhaus mit Pool und Terrasse", span: "" },
              { src: "/manus-storage/IMG_5953_a50590c5.webp", alt: "Villa mit Pool und Palme", span: "" },
              { src: "/manus-storage/IMG_8147_e3f3a467.webp", alt: "Bettina – Yoga am Meer in Mallorca", span: "" },
              { src: "/manus-storage/IMG_2689_940ba92d.webp", alt: "Yoga-Session am Pool", span: "" },
              { src: "/manus-storage/IMG_8199_22194595.webp", alt: "Picknick am Strand bei Sonnenuntergang", span: "" },
              { src: "/manus-storage/IMG_8473_9e811497.webp", alt: "Gruppe an der Bucht", span: "" },
              { src: "/manus-storage/IMG_9795_eccf1f06.webp", alt: "Altstadt Santanyí", span: "" },
              { src: "/manus-storage/IMG_86142_dec3d3b8.webp", alt: "Türkisblaue Bucht mit Segelbooten", span: "" },
              { src: "/manus-storage/IMG_3167_f7931300.webp", alt: "Cala Llombards – türkisblaues Wasser mit Palmen", span: "" },
              { src: "/manus-storage/IMG_6526_9deeabd2.webp", alt: "Villa von außen im Sonnenlicht", span: "" },
            ].map((img, i) => (
              <Reveal key={i} delay={i * 60} className={img.span}>
                <div className={`overflow-hidden rounded-xl ${img.span.includes('row-span-2') ? 'h-full min-h-[320px]' : 'aspect-square'}`}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ───────────────────────────────────────────────── */}
      <section className="px-6 lg:px-20 py-24" style={{ background: C.terraDark }}>
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <div className="text-[0.68rem] font-semibold tracking-[0.25em] uppercase mb-6 flex items-center justify-center gap-3" style={{ color: C.terraLight }}>
              <span className="w-6 h-[1.5px]" style={{ background: C.terraLight }} />Stimme einer Teilnehmerin<span className="w-6 h-[1.5px]" style={{ background: C.terraLight }} />
            </div>
            <blockquote className="font-normal text-xl leading-relaxed mb-6 italic"
              style={{ fontFamily: "var(--font-display)", color: "rgba(250,246,241,0.85)" }}>
              „Mallorca, eine der schönsten Inseln überhaupt, und dort ein Yogaretreat zu erleben – einfach nur magisch und wunderschön. Ich durfte dies alles schon zum zweiten Mal erleben."
            </blockquote>
            <div className="text-sm font-semibold tracking-widest uppercase" style={{ color: C.terraLight }}>
              Heidi · 2× Retreat-Teilnehmerin
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-20 py-24" style={{ background: C.cream }}>
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <Eyebrow center>Interesse?</Eyebrow>
            <h2 className="font-normal mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,3.5vw,3rem)", color: C.text }}>
              Nur 4 Plätze.<br />
              <em style={{ fontStyle: "italic", color: C.terraLight }}>Schreib mir direkt.</em>
            </h2>
            <p className="text-base font-light leading-relaxed mb-8" style={{ color: C.textMuted }}>
              Fragen zum Programm, zur Unterkunft oder zum Ablauf – ich beantworte alles persönlich.
            </p>
            <a href="mailto:mail@bettina-kahmann.com?subject=Retreat%20Mallorca%20Anfrage" className="btn-pill btn-pink">
              Anfrage senden →
            </a>
          </Reveal>
        </div>
      </section>

    </Layout>
  );
}
