/**
 * Über mich – Bettina Kahmann
 */
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { useSEO } from "@/hooks/useSEO";

const C = {
  pink: "#993a74", terraLight: "#C17B52", terraDark: "#8c492e",
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

export default function UeberMich() {
  useSEO({
    title: "Bettina Kahmann – Yogalehrerin & Präventionsexpertin | beVital InsideOut",
    description: "Bettina Kahmann aus der Wedemark: Yogalehrerin, Präventionsexpertin (§20 SGB V), Ernährungsberaterin und Personal Trainerin. Über 20 Jahre Erfahrung. Online-Studio seit 2020.",
    keywords: "Bettina Kahmann, Yogalehrerin Wedemark, Präventionsexpertin, Ernährungsberaterin, Personal Trainerin, beVital InsideOut",
    ogTitle: "Bettina Kahmann – Yogalehrerin & Präventionsexpertin | beVital InsideOut",
    ogDescription: "Yogalehrerin, Präventionsexpertin und Personal Trainerin aus der Wedemark. Über 20 Jahre Erfahrung. Online-Studio seit 2020.",
  });
  return (
    <Layout>
      {/* Hero */}
      <div className="pt-36 pb-16 px-6 lg:px-20" style={{ background: C.terraDark }}>
        <div className="max-w-3xl">
          <Reveal>
            <div className="text-[0.68rem] font-semibold tracking-[0.25em] uppercase mb-4 flex items-center gap-3" style={{ color: C.creamOnDark }}>
              <span className="w-6 h-[1.5px]" style={{ background: C.creamOnDark }} />Über mich
            </div>
            <h1 className="font-normal leading-[1.05] mb-4 text-white"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem,5vw,4.5rem)" }}>
              Ich bin Bettina –<br />
              <em style={{ fontStyle: "italic", color: C.terraOnDark }}>seit 20 Jahren an deiner Seite.</em>
            </h1>
            <p className="text-base font-light leading-relaxed max-w-xl" style={{ color: "rgba(255,255,255,0.55)" }}>
              Yogalehrerin, Präventionsexpertin und Ernährungsberaterin aus der Wedemark bei Hannover.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Split: Bild + Text */}
      <div className="px-6 lg:px-20 py-20" style={{ background: C.cream }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <Reveal>
            <div className="rounded-2xl overflow-hidden aspect-[4/5] relative"
              style={{ background: C.creamDark }}>
              <img
                src="/manus-storage/bettina-studio_71644f77.png"
                alt="Bettina Kahmann – Yogalehrerin und Präventionsexpertin aus der Wedemark"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6"
                style={{ background: "linear-gradient(to top, rgba(28,31,46,0.85) 0%, transparent 100%)" }}>
                <div className="text-white font-semibold text-lg" style={{ fontFamily: "var(--font-display)" }}>Bettina Kahmann</div>
                <div className="text-white/60 text-xs tracking-widest uppercase mt-1">Wedemark bei Hannover</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div>
              <div className="text-[0.68rem] font-semibold tracking-[0.25em] uppercase mb-4 flex items-center gap-3" style={{ color: C.terraLight }}>
                <span className="w-6 h-[1.5px]" style={{ background: C.terraLight }} />Mein Weg
              </div>
              <h2 className="font-normal leading-[1.1] mb-6" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3vw,2.6rem)", color: C.text }}>
                Kein Leistungsdruck.<br />Keine leeren Versprechen.
              </h2>
              <div className="space-y-4 text-base font-light leading-relaxed" style={{ color: C.textMuted }}>
                <p>Seit über 20 Jahren arbeite ich mit Menschen, die aus Stress, Überforderung und dauerhafter Anspannung raus wollen. Mein Schwerpunkt liegt auf der Regulation des Nervensystems – über Körper, Atem und klare, strukturierte Anleitung.</p>
                <p>Ich arbeite mit Frauen, die beruflich und privat stark eingespannt sind, viel Verantwortung tragen und oft nicht mehr richtig abschalten können.</p>
                <p>Ich unterrichte Hatha Yoga, Yin Yoga und AROHA – ruhig, präzise und ohne Leistungsdruck. Ich integriere alltagstaugliche Routinen, die sich realistisch umsetzen lassen.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Qualifikationen */}
      <div className="px-6 lg:px-20 py-20" style={{ background: C.creamDark }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <div className="text-[0.68rem] font-semibold tracking-[0.25em] uppercase mb-3 flex items-center justify-center gap-3" style={{ color: C.terraLight }}>
                <span className="w-6 h-[1.5px]" style={{ background: C.terraLight }} />Qualifikationen<span className="w-6 h-[1.5px]" style={{ background: C.terraLight }} />
              </div>
              <h2 className="font-normal" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3vw,2.6rem)", color: C.text }}>
                Was ich mitbringe
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "🧘", title: "Yogalehrerin", desc: "Hatha Yoga, Yin Yoga, AROHA – über 20 Jahre Unterrichtserfahrung" },
              { icon: "🏥", title: "Präventionsexpertin §20 SGB V", desc: "Zertifizierte Kurse mit Krankenkassen-Zuschuss (ZPP)" },
              { icon: "🥗", title: "Ernährungsberaterin", desc: "Alltagstaugliche Ernährungsberatung ohne Diät-Dogmen" },
              { icon: "💪", title: "Personal Trainerin", desc: "Individuelle Einzel-Begleitung online und vor Ort" },
              { icon: "🧘", title: "AROHA-Trainerin", desc: "Ausdauertraining und Stressabbau – Bewegung, die Freude macht" },
              { icon: "🌿", title: "Aromaberaterin", desc: "Zertifizierte Aromaberaterin – ätherische Öle als alltagstaugliche Ergänzung" },
              { icon: "🌐", title: "Online-Studio-Inhaberin", desc: "beVital InsideOut seit März 2020 – 400+ Videos, Live-Kurse" },
            ].map((q, i) => (
              <Reveal key={q.title} delay={i * 80}>
                <div className="rounded-xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ background: "white", borderColor: C.creamDeep }}>
                  <div className="text-3xl mb-4">{q.icon}</div>
                  <h3 className="font-semibold text-base mb-2" style={{ fontFamily: "var(--font-display)", color: C.text }}>{q.title}</h3>
                  <p className="text-sm font-light leading-relaxed" style={{ color: C.textMuted }}>{q.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Schwerpunkte */}
      <div className="px-6 lg:px-20 py-20" style={{ background: C.terraDark }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <div className="text-[0.68rem] font-semibold tracking-[0.25em] uppercase mb-3 flex items-center justify-center gap-3" style={{ color: C.creamOnDark }}>
                <span className="w-6 h-[1.5px]" style={{ background: C.creamOnDark }} />Meine Haltung<span className="w-6 h-[1.5px]" style={{ background: C.creamOnDark }} />
              </div>
              <h2 className="font-normal text-white" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3vw,2.6rem)" }}>
                Klar. Direkt. Ohne Umwege.
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Keine Esoterik", icon: "✗", color: C.creamOnDark },
              { label: "Keine Überforderung", icon: "✗", color: C.creamOnDark },
              { label: "Keine leeren Versprechen", icon: "✗", color: C.creamOnDark },
              { label: "Klare Struktur", icon: "✓", color: C.sage },
              { label: "Direkte Anleitung", icon: "✓", color: C.sage },
              { label: "Lösungen, die im Alltag funktionieren", icon: "✓", color: C.sage },
            ].map((h, i) => (
              <Reveal key={h.label} delay={i * 70}>
                <div className="flex items-center gap-4 rounded-xl px-6 py-4 border"
                  style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}>
                  <span className="text-lg font-bold w-6 text-center" style={{ color: h.color }}>{h.icon}</span>
                  <span className="text-base font-light text-white">{h.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial Martina */}
      <div className="px-6 lg:px-20 py-16" style={{ background: C.creamDark }}>
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-[0.68rem] font-semibold tracking-[0.25em] uppercase mb-8 flex items-center justify-center gap-3" style={{ color: C.terraLight }}>
              <span className="w-6 h-[1.5px]" style={{ background: C.terraLight }} />
              Das sagen Teilnehmerinnen
              <span className="w-6 h-[1.5px]" style={{ background: C.terraLight }} />
            </div>
            <div className="rounded-xl p-8 border" style={{ background: "white", borderColor: C.creamDeep }}>
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="text-sm" style={{ color: C.terraLight }}>★</span>
                ))}
              </div>
              <p className="text-base font-light leading-relaxed italic mb-6" style={{ color: C.textMuted }}>
                „Ich bin sehr froh, dass ich auf dein Yoga-Angebot aufmerksam geworden bin. Für mich ist es genau die richtige Mischung aus Forderung und Entspannung. Der kontinuierliche Fokus auf die Bandhas ist für mich neu und sehr effektiv – ich merke, dass ich die Übungen nochmal ganz anders ausführen kann. Die Untermalung der Stunde mit ätherischen Ölen, insbesondere bei der Endentspannung, finde ich sehr schön und besonders. Vielen Dank für deine tolle Anleitung und Begleitung!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold text-white flex-shrink-0" style={{ background: C.pink }}>M</div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: C.text }}>Martina</div>
                  <div className="text-xs" style={{ color: C.textMuted }}>Yoga · Teilnehmerin</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 lg:px-20 py-16" style={{ background: C.cream }}>
        <Reveal>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-normal mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3vw,2.6rem)", color: C.text }}>
              Bereit für den ersten Schritt?
            </h2>
            <p className="text-base font-light mb-8" style={{ color: C.textMuted }}>
              Schau dir die Kurse an oder schreib mir direkt.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/kurse" className="btn-pill btn-pink">Zu den Kursen →</a>
              <a href="/kontakt" className="btn-pill" style={{ background: "transparent", border: `1.5px solid ${C.pink}`, color: C.pink }}>Kontakt aufnehmen</a>
            </div>
          </div>
        </Reveal>
      </div>
    </Layout>
  );
}
