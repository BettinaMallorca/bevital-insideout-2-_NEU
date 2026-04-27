/**
 * Kontakt – Kontaktformular und Kontaktdaten
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

export default function Kontakt() {
  useSEO({
    title: "Kontakt | beVital InsideOut – Bettina Kahmann",
    description: "Schreib Bettina Kahmann direkt an – Fragen zu Yoga-Kursen, Präventionskursen, dem Online-Studio oder dem Retreat auf Mallorca. Yoga in der Wedemark & online.",
    keywords: "Kontakt Yoga Wedemark, Bettina Kahmann Kontakt, beVital InsideOut Kontakt, Yoga Anfrage",
    ogTitle: "Kontakt | beVital InsideOut – Bettina Kahmann",
    ogDescription: "Fragen zu Kursen, Online-Studio oder Retreat? Schreib Bettina direkt an.",
  });
  const [form, setForm] = useState({ name: "", email: "", thema: "", nachricht: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Anfrage: ${form.thema || "Kontakt"}`);
    const body = encodeURIComponent(`Name: ${form.name}\nE-Mail: ${form.email}\nThema: ${form.thema}\n\n${form.nachricht}`);
    window.location.href = `mailto:mail@bettina-kahmann.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <Layout>
      {/* Hero */}
      <div className="pt-36 pb-16 px-6 lg:px-20" style={{ background: C.terraDark }}>
        <div className="max-w-3xl">
          <Reveal>
            <div className="text-[0.68rem] font-semibold tracking-[0.25em] uppercase mb-4 flex items-center gap-3" style={{ color: C.creamOnDark }}>
              <span className="w-6 h-[1.5px]" style={{ background: C.creamOnDark }} />Kontakt
            </div>
            <h1 className="font-normal leading-[1.05] mb-4 text-white"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem,5vw,4.5rem)" }}>
              Schreib mir –<br />
              <em style={{ fontStyle: "italic", color: C.terraOnDark }}>ich antworte persönlich.</em>
            </h1>
            <p className="text-base font-light leading-relaxed max-w-xl" style={{ color: "rgba(255,255,255,0.55)" }}>
              Fragen zu Kursen, Präventionskursen, Personal Training oder dem Retreat auf Mallorca – ich bin direkt erreichbar.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Kontakt-Bereich */}
      <div className="px-6 lg:px-20 py-20" style={{ background: C.cream }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16">

          {/* Kontaktdaten */}
          <Reveal className="lg:col-span-2">
            <div>
              <div className="text-[0.68rem] font-semibold tracking-[0.25em] uppercase mb-6 flex items-center gap-3" style={{ color: C.terraLight }}>
                <span className="w-6 h-[1.5px]" style={{ background: C.terraLight }} />Direkt erreichbar
              </div>
              <div className="space-y-6 mb-10">
                {[
                  { icon: "✉️", label: "E-Mail", value: "mail@bettina-kahmann.com", href: "mailto:mail@bettina-kahmann.com" },
                  { icon: "📍", label: "Vor Ort · Elze", value: "Sport- und Tanzhaus · Kuckucksweg 90 · 30900 Wedemark-Elze", href: "https://maps.google.com/?q=Kuckucksweg+90,+30900+Wedemark" },
                  { icon: "📸", label: "Instagram", value: "@be_vital_insideout", href: "https://instagram.com/be_vital_insideout" },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-lg"
                      style={{ background: C.creamDark }}>{c.icon}</div>
                    <div>
                      <div className="text-[0.65rem] font-semibold tracking-widest uppercase mb-1" style={{ color: C.textMuted }}>{c.label}</div>
                      {c.href ? (
                        <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined}
                          className="text-sm font-medium transition-colors"
                          style={{ color: C.pink, textDecoration: "none" }}>
                          {c.value}
                        </a>
                      ) : (
                        <div className="text-sm font-medium" style={{ color: C.text }}>{c.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Schnell-Links */}
              <div className="text-[0.68rem] font-semibold tracking-[0.25em] uppercase mb-4 flex items-center gap-3" style={{ color: C.terraLight }}>
                <span className="w-6 h-[1.5px]" style={{ background: C.terraLight }} />Schnell buchen
              </div>
              <div className="flex flex-col gap-3">
                <a href="https://www.fyndery.de/yoga-by-bettina/" target="_blank" rel="noopener noreferrer"
                  className="btn-pill btn-pink text-xs text-center">
                  Kurs buchen (Fyndery) →
                </a>
                <a href="https://bevital-insideout.lovable.app" target="_blank" rel="noopener noreferrer"
                  className="btn-pill text-xs text-center"
                  style={{ background: C.sage, color: "white" }}>
                  Online-Studio →
                </a>
                <a href="https://reset-warteliste.lovable.app/" target="_blank" rel="noopener noreferrer"
                  className="btn-pill text-xs text-center"
                  style={{ background: C.terraDark, color: "white" }}>
                  RESET Warteliste →
                </a>
              </div>
            </div>
          </Reveal>

          {/* Formular */}
          <Reveal delay={150} className="lg:col-span-3">
            <div className="rounded-2xl p-8 border" style={{ background: "white", borderColor: C.creamDeep }}>
              {sent ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">✉️</div>
                  <h3 className="font-semibold text-xl mb-2" style={{ fontFamily: "var(--font-display)", color: C.text }}>
                    Dein E-Mail-Programm öffnet sich
                  </h3>
                  <p className="text-sm font-light" style={{ color: C.textMuted }}>
                    Schick die Nachricht ab – ich melde mich persönlich bei dir.
                  </p>
                  <button onClick={() => setSent(false)} className="btn-pill btn-pink mt-6 text-xs">
                    Neue Anfrage
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="text-[0.68rem] font-semibold tracking-[0.25em] uppercase mb-6 flex items-center gap-3" style={{ color: C.terraLight }}>
                    <span className="w-6 h-[1.5px]" style={{ background: C.terraLight }} />Nachricht schreiben
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[0.65rem] font-semibold tracking-widest uppercase mb-2" style={{ color: C.textMuted }}>Name *</label>
                      <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="Dein Name"
                        className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                        style={{ background: C.cream, border: `1.5px solid ${C.creamDeep}`, color: C.text }}
                        onFocus={e => (e.target.style.borderColor = C.pink)}
                        onBlur={e => (e.target.style.borderColor = C.creamDeep)} />
                    </div>
                    <div>
                      <label className="block text-[0.65rem] font-semibold tracking-widest uppercase mb-2" style={{ color: C.textMuted }}>E-Mail *</label>
                      <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="deine@email.de"
                        className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                        style={{ background: C.cream, border: `1.5px solid ${C.creamDeep}`, color: C.text }}
                        onFocus={e => (e.target.style.borderColor = C.pink)}
                        onBlur={e => (e.target.style.borderColor = C.creamDeep)} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[0.65rem] font-semibold tracking-widest uppercase mb-2" style={{ color: C.textMuted }}>Thema</label>
                    <select value={form.thema} onChange={e => setForm({ ...form, thema: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                      style={{ background: C.cream, border: `1.5px solid ${C.creamDeep}`, color: form.thema ? C.text : C.textMuted }}
                      onFocus={e => (e.target.style.borderColor = C.pink)}
                      onBlur={e => (e.target.style.borderColor = C.creamDeep)}>
                      <option value="">Worum geht es?</option>
                      <option value="Offene Kurse">Offene Kurse</option>
                      <option value="Präventionskurs §20">Präventionskurs §20 SGB V</option>
                      <option value="Personal Training">Personal Training</option>
                      <option value="RESET-Programm">RESET – 8 Wochen</option>
                      <option value="Retreat Mallorca">Retreat Mallorca</option>
                      <option value="Online-Studio">Online-Studio</option>
                      <option value="Sonstiges">Sonstiges</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[0.65rem] font-semibold tracking-widest uppercase mb-2" style={{ color: C.textMuted }}>Nachricht *</label>
                    <textarea required value={form.nachricht} onChange={e => setForm({ ...form, nachricht: e.target.value })}
                      placeholder="Was möchtest du wissen oder anfragen?"
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all resize-none"
                      style={{ background: C.cream, border: `1.5px solid ${C.creamDeep}`, color: C.text }}
                      onFocus={e => (e.target.style.borderColor = C.pink)}
                      onBlur={e => (e.target.style.borderColor = C.creamDeep)} />
                  </div>
                  <button type="submit" className="btn-pill btn-pink w-full text-sm">
                    Nachricht senden →
                  </button>
                  <p className="text-[0.65rem] text-center" style={{ color: C.textMuted }}>
                    Dein E-Mail-Programm öffnet sich. Ich antworte persönlich.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Testimonials */}
      <div className="px-6 lg:px-20 py-20" style={{ background: C.creamDark }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-[0.68rem] font-semibold tracking-[0.25em] uppercase mb-10 flex items-center justify-center gap-3" style={{ color: C.terraLight }}>
              <span className="w-6 h-[1.5px]" style={{ background: C.terraLight }} />
              Das sagen meine Teilnehmerinnen
              <span className="w-6 h-[1.5px]" style={{ background: C.terraLight }} />
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                quote: "Die regelmäßige Yoga-Praxis bei dir im Yoga-Club trägt erheblich zu meinem Wohlbefinden und zur körperlichen Fitness bei. Die Asanas in den Stunden sind so vielseitig von dir ausgewählt und sprechen wirklich alle Bereiche an. Ich bin glücklich, Yoga durch dich für mich entdeckt zu haben.",
                name: "Monika",
                kurs: "LIVE Yoga Studio Online",
              },
              {
                quote: "Bettina ist eine Powerfrau und strahlt gleichzeitig eine wahnsinnige Wärme aus. In deinen Stunden schaffst du es mir einen Raum zu öffnen, wo ich ganz bei mir ankommen kann. Ich liebe deine Vielseitigkeit. Dein Wissen ist echt Wahnsinn.",
                name: "Jeanette",
                kurs: "LIVE Yoga Studio Online",
              },
              {
                quote: "Du bist eine der motivierendsten Frauen, die ich kenne. Durch deine herzliche, offene und einfühlsame Art ist es eine Freude, mit dir die Yogapraxis zu erfahren und das eigene Leben zu bereichern. Jede Einheit ist ein Erlebnis für sich.",
                name: "Heidi",
                kurs: "Yoga & Meditation",
              },
              {
                quote: "Die Yoga-Einheiten, die du mir und den Yoginis anbietest, sind sehr wertvoll für mich. Ich fühle mich jedes Mal danach wieder in meiner Kraft und gestärkt für den Alltag. Als Camperin ist das Online-Angebot maßgeschneidert – ich kann meine Matte überall ausrollen. Das Retreat kann ich ebenfalls sehr empfehlen. Vielen Dank für die letzten 5 Jahre mit dir.",
                name: "Petra",
                kurs: "Online Yoga & Retreat",
              },
            ].map((t, i) => (
              <Reveal key={t.name} delay={i * 100}>
                <div className="rounded-xl p-7 border flex flex-col h-full" style={{ background: "white", borderColor: C.creamDeep }}>
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className="text-sm" style={{ color: C.terraLight }}>★</span>
                    ))}
                  </div>
                  <p className="text-sm font-light leading-relaxed flex-1 mb-5 italic" style={{ color: C.textMuted }}>
                    „{t.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold text-white flex-shrink-0"
                      style={{ background: C.pink }}>{t.name[0]}</div>
                    <div>
                      <div className="text-sm font-semibold" style={{ color: C.text }}>{t.name}</div>
                      <div className="text-xs" style={{ color: C.textMuted }}>{t.kurs}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
