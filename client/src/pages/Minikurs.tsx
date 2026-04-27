/**
 * Mini-Kurs – 5 Tage Nervensystem
 * Kostenloser Einstieg → führt zum RESET-Programm
 */
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { useSEO } from "@/hooks/useSEO";

const C = {
  pink: "#993a74", pinkDark: "#7a2d5c",
  terraLight: "#C17B52", terraDark: "#8c492e",
  sage: "#7A9E7E",
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

const VIDEOS = [
  {
    tag: "Tag 01",
    title: "Dein erster Reset: Atmen und ankommen",
    desc: "Kurze Erklärung – dann sofort Praxis. Du spürst nach 10 Minuten den Unterschied. Kein Vorwissen nötig, keine Matte.",
    meta: ["⏱ ca. 10 Min", "🧘 Erklärung + Praxis"],
    locked: false,
    vimeoId: "1184115243",
  },
  {
    tag: "Tag 02",
    title: "Warum du müde bist, obwohl du geschlafen hast",
    desc: "Was in deinem Nervensystem gerade wirklich passiert – und warum Ausruhen, Urlaub und Schlafen allein nicht mehr reichen.",
    meta: ["⏱ ca. 6 Min", "🎧 Ton an"],
    locked: true,
  },
  {
    tag: "Tag 03",
    title: "Eine Übung. Auf der Couch. Heute Abend.",
    desc: "Yin-Position im Liegen + verlängerte Ausatmung. Vagusnerv-Aktivierung ohne Equipment. Du spürst: das ist mehr als Entspannung.",
    meta: ["⏱ ca. 10 Min", "🧘 Geführte Praxis"],
    locked: true,
  },
  {
    tag: "Tag 04",
    title: "Was sich verändert, wenn du aufhörst zu funktionieren",
    desc: "Echte Erfahrungen aus meinen Kursen. Was sich nach 4 und 8 Wochen zeigt – Schlaf, Schmerzen, Gedankenkarussell, Energie.",
    meta: ["⏱ ca. 5 Min"],
    locked: true,
  },
  {
    tag: "Tag 05",
    title: "Was jetzt? – Und warum RESET dein nächster Schritt ist",
    desc: "Du weißt jetzt, was möglich ist. Ich erkläre, was 8 Wochen RESET daraus machen – und ob es zu dir passt.",
    meta: ["⏱ ca. 5 Min"],
    locked: true,
  },
];

export default function Minikurs() {
  useSEO({
    title: "5 Tage Nervensystem-Mini-Kurs – Kostenlos | beVital InsideOut",
    description: "Kostenloser 5-Tage-Mini-Kurs: Nervensystem regulieren mit Yoga und Atemarbeit. 5 kurze Videos, sofort umsetzbar. Kein Vorwissen nötig. Mit Bettina Kahmann.",
    keywords: "Nervensystem regulieren kostenlos, Mini-Kurs Yoga, Atemarbeit Kurs, Stress abbauen online, beVital InsideOut",
    ogTitle: "5 Tage Nervensystem-Mini-Kurs – Kostenlos | beVital InsideOut",
    ogDescription: "5 kurze Videos, sofort umsetzbar. Nervensystem regulieren mit Yoga und Atemarbeit – kostenlos mit Bettina Kahmann.",
  });
  return (
    <Layout>
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="pt-36 pb-20 px-6 lg:px-20 relative overflow-hidden" style={{ background: C.terraDark }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 30% 60%, rgba(153,58,116,0.22) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(193,123,82,0.15) 0%, transparent 55%)" }} />
        <div className="relative z-10 max-w-3xl">
          <Reveal>
            <div className="text-[0.68rem] font-semibold tracking-[0.25em] uppercase mb-4 flex items-center gap-3" style={{ color: C.creamOnDark }}>
              <span className="w-6 h-[1.5px]" style={{ background: C.creamOnDark }} />Kostenloser Minikurs · beVital InsideOut
            </div>
            <h1 className="font-normal leading-[1.05] mb-4 text-white"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem,5vw,4.5rem)" }}>
              5 Tage Nervensystem –<br />
              <em style={{ fontStyle: "italic", color: C.terraOnDark }}>dein Einstieg.</em>
            </h1>
            <p className="text-base font-light leading-relaxed max-w-xl" style={{ color: "rgba(255,255,255,0.55)" }}>
              Für Frauen, die merken, dass Erschöpfung kein Charakterfehler ist.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── INTRO ─────────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-20 py-16" style={{ background: C.cream }}>
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <div className="space-y-4 text-base font-light leading-relaxed mb-8" style={{ color: C.textMuted }}>
              <p>Du schläfst – und wachst trotzdem müde auf.<br />Die Erholung kommt langsamer als früher.<br />Das Gefühl, nie wirklich anzukommen, kennt sich vertraut an.</p>
              <p className="font-medium" style={{ color: C.text }}>Das ist kein Zeichen von Schwäche.<br />Das ist ein überlastetes Nervensystem.</p>
              <p>In 5 kurzen Videos zeige ich dir, was in deinem Körper gerade passiert – und was wirklich hilft. Direkt. Ohne Theorie, die du vergisst.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── OPTIN ─────────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-20 pb-16" style={{ background: C.cream }}>
        <Reveal>
          <div className="max-w-lg mx-auto rounded-2xl p-10 border shadow-lg text-center"
            style={{ background: "white", borderColor: `${C.pink}20` }}>
            <h2 className="font-normal text-2xl mb-2" style={{ fontFamily: "var(--font-display)", color: C.text }}>
              Starte deinen 5 Tage RESET
            </h2>
            <p className="text-sm font-light mb-8" style={{ color: C.textMuted }}>
              5 Videos. 5 Tage. Kostenlos – und du merkst sofort, ob es wirkt.
            </p>
            {/* ActiveCampaign Formular */}
            <div className="ac-form-wrapper mb-4">
              <div className="_form_33"></div>
              <script src="https://bettinakahmann43364.activehosted.com/f/embed.php?id=33" charSet="utf-8" async></script>
            </div>
            <p className="text-[0.65rem]" style={{ color: "rgba(42,34,32,0.35)" }}>Kein Spam. Kein Risiko. Jederzeit abmeldbar.</p>
          </div>
        </Reveal>
      </section>

      {/* ── VIDEOS ────────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-20 py-20" style={{ background: "white" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <div className="text-[0.68rem] font-semibold tracking-[0.25em] uppercase mb-3 flex items-center justify-center gap-3" style={{ color: C.terraLight }}>
                <span className="w-6 h-[1.5px]" style={{ background: C.terraLight }} />Der Kurs · 5 Videos<span className="w-6 h-[1.5px]" style={{ background: C.terraLight }} />
              </div>
              <h2 className="font-normal" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3vw,2.8rem)", color: C.text }}>
                Was dich erwartet
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {VIDEOS.map((v, i) => (
              <Reveal key={v.tag} delay={i * 80}>
                <div className={`rounded-xl overflow-hidden border transition-all duration-300 ${!v.locked ? "hover:-translate-y-1 hover:shadow-xl" : "opacity-80"}`}
                  style={{ background: C.cream, borderColor: C.creamDeep }}>
                  {/* Video-Embed oder Locked */}
                  <div className="relative w-full" style={{ paddingBottom: "56.25%", background: C.terraDark }}>
                    {!v.locked && v.vimeoId ? (
                      <iframe
                        src={`https://player.vimeo.com/video/${v.vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479`}
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                        title={v.title}
                      />
                    ) : (
                      <>
                        {/* Placeholder */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center"
                          style={{ background: `linear-gradient(135deg, ${C.terraDark} 0%, #3d2e2a 100%)` }}>
                          <div className="w-14 h-14 rounded-full border-2 flex items-center justify-center mb-3"
                            style={{ borderColor: "rgba(250,246,241,0.2)" }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(250,246,241,0.4)"><path d="M8 5v14l11-7z" /></svg>
                          </div>
                        </div>
                        {/* Locked overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center"
                          style={{ background: "rgba(42,34,32,0.55)" }}>
                          <div className="text-3xl mb-2">🔒</div>
                          <div className="text-[0.6rem] font-semibold tracking-widest uppercase"
                            style={{ color: "rgba(250,246,241,0.55)" }}>Folgt per E-Mail · {v.tag}</div>
                        </div>
                      </>
                    )}
                  </div>
                  {/* Info */}
                  <div className="p-6">
                    <div className="text-[0.65rem] font-semibold tracking-widest uppercase mb-2" style={{ color: C.terraLight }}>{v.tag}</div>
                    <h3 className="font-medium text-base mb-2 leading-snug" style={{ fontFamily: "var(--font-display)", color: C.text }}>
                      „{v.title}"
                    </h3>
                    <p className="text-xs font-light leading-relaxed mb-4" style={{ color: C.textMuted }}>{v.desc}</p>
                    <div className="flex flex-wrap gap-3">
                      {v.meta.map((m) => (
                        <span key={m} className="text-[0.62rem] font-medium" style={{ color: "rgba(42,34,32,0.38)" }}>{m}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA → RESET ───────────────────────────────────────────────── */}
      <section className="px-6 lg:px-20 py-24 relative overflow-hidden" style={{ background: C.pink }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(193,123,82,0.3) 0%, transparent 60%)" }} />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <Reveal>
            <h2 className="font-normal leading-[1.1] mb-4 text-white"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3.2rem)" }}>
              Bereit für den nächsten Schritt?
            </h2>
            <p className="text-base font-light mb-10 leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
              RESET ist mein 8-Wochen-Programm zur Nervensystem-Regulation. Strukturiert. Begleitet. Mit mir.
            </p>
            <a href="https://reset-warteliste.lovable.app/" target="_blank" rel="noopener noreferrer"
              className="btn-pill inline-block"
              style={{ background: "white", color: C.pink, fontWeight: 600 }}>
              Auf die Warteliste →
            </a>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
