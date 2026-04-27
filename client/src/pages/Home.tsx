/**
 * beVital InsideOut - Startseite
 * Design nach Referenz-HTML: Split-Hero, Stats, Intro-Karte, Angebote-Grid,
 * Über mich, Testimonials, Gratis-Guides (3 Karten), RESET-Sektion, Mallorca, Footer
 *
 * Farbpalette: Pink #993A74 . TerraLight #C17B52 . TerraDark #8C492E
 *              Sage #7A9E7E . Cream #FAF6F1 . CreamDark #F0E8DE
 * Schriften: Cormorant Garamond (Headlines) . DM Sans (Body)
 * KEINE schwarzen oder nachtblauen Farben
 */
import { useState, useEffect, useRef } from "react";
import Layout from "@/components/Layout";
import { useSEO } from "@/hooks/useSEO";

// --- Farb-Tokens ------------------------------------------------------------
const C = {
  pink:        "#993A74",
  pinkDark:    "#7a2d5c",
  terraLight:  "#C17B52",
  terraDark:   "#8C492E",
  sage:        "#7A9E7E",
  sageDark:    "#5a7d5e",
  cream:       "#FAF6F1",
  creamDark:   "#F0E8DE",
  creamDeep:   "#e2d5c8",
  dark:        "#1a1510",
  text:        "#3a2e24",
  textLight:   "#7a6a5a",
  terraLight2: "#f5ece6",
};

// --- Reveal-Animation --------------------------------------------------------
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(24px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// --- Section-Tag (Eyebrow) ---------------------------------------------------
function SectionTag({
  children,
  center = false,
  color = C.terraLight,
}: {
  children: React.ReactNode;
  center?: boolean;
  color?: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 mb-4 ${center ? "justify-center" : ""}`}
      style={{
        fontSize: "0.72rem",
        fontWeight: 500,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color,
      }}
    >
      <span
        style={{ width: 24, height: 1, background: color, flexShrink: 0 }}
      />
      {children}
      {center && (
        <span style={{ width: 24, height: 1, background: color, flexShrink: 0 }} />
      )}
    </div>
  );
}

// --- Haupt-Komponente --------------------------------------------------------
export default function Home() {
  useSEO({
    title: "beVital InsideOut – Yoga & Nervensystem | Bettina Kahmann",
    description: "Yoga in der Wedemark & online mit Bettina Kahmann. Hatha Yoga, Yin Yoga, AROHA, Präventionskurse §20 SGB V und Yoga-Retreats auf Mallorca. Nervensystem regulieren, Stress abbauen.",
    keywords: "Yoga Wedemark, Yoga Hannover online, Yin Yoga online, Präventionskurs Yoga Krankenkasse, Hatha Yoga Hannover, Nervensystem regulieren Yoga, AROHA Training",
    ogTitle: "beVital InsideOut – Yoga & Nervensystem | Bettina Kahmann",
    ogDescription: "Yoga, Atemarbeit und Nervensystem-Regulation. Präventionskurse §20 SGB V, Online-Studio & Yoga-Retreats auf Mallorca mit Bettina Kahmann.",
  });
  return (
    <Layout>
      {/* ==============================================================
          HERO - Split-Layout: Text links / Bild rechts
      ============================================================== */}
      <section
        style={{
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          paddingTop: 80,
          background: C.cream,
          position: "relative",
          overflow: "hidden",
        }}
        className="hero-split"
      >
        {/* Radiale Hintergrund-Akzente */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 600,
            height: 600,
            background: `radial-gradient(circle, rgba(153,58,116,0.07) 0%, transparent 70%)`,
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -100,
            width: 400,
            height: 400,
            background: `radial-gradient(circle, rgba(122,158,126,0.09) 0%, transparent 70%)`,
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />

        {/* Linke Seite - Text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "5rem 3rem 5rem 6rem",
            position: "relative",
            zIndex: 2,
          }}
          className="hero-content-left"
        >
          <div
            style={{
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: C.terraLight,
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
              animation: "fadeUp 0.8s ease 0.1s both",
            }}
          >
            <span style={{ width: 30, height: 1, background: C.terraLight }} />
            Yoga · Atemarbeit · Nervensystem
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.8rem, 5vw, 4.2rem)",
              fontWeight: 300,
              lineHeight: 1.1,
              color: C.dark,
              marginBottom: "1.8rem",
              animation: "fadeUp 0.8s ease 0.25s both",
            }}
          >
            Dein Körper<br />
            weiß, wie sich<br />
            <em style={{ fontStyle: "italic", color: C.pink }}>Ruhe anfühlt.</em>
          </h1>

          <p
            style={{
              fontSize: "1.05rem",
              fontWeight: 300,
              lineHeight: 1.7,
              color: C.textLight,
              maxWidth: 420,
              marginBottom: "2.5rem",
              animation: "fadeUp 0.8s ease 0.4s both",
            }}
          >
            Ich zeige dir, wie du ihn daran erinnerst - mit Yoga, Atemarbeit
            und gezielter Nervensystem-Regulation. Vor Ort in der Wedemark und
            online.
          </p>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              animation: "fadeUp 0.8s ease 0.55s both",
            }}
          >
            <a
              href="/angebote"
              className="btn-pill btn-pink"
            >
              Meine Angebote
            </a>
            <a
              href="https://bettinakahmann43364.activehosted.com/f/27"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill btn-outline-terra"
            >
              Gratis Starter-Guide
            </a>
          </div>
        </div>

        {/* Rechte Seite - Bettina Yoga-Pose */}
        <div
          style={{ position: "relative", overflow: "hidden" }}
          className="hero-image-right"
        >
          <img
            src="/manus-storage/bettina-yoga-dancer_60cb41a2.jpg"
            alt="Bettina Kahmann in Yoga-Pose – Yogalehrerin aus der Wedemark"
            style={{
              width: "100%",
              height: "100%",
              minHeight: 600,
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "2rem 2.5rem",
              background: `linear-gradient(to top, rgba(140,73,46,0.75) 0%, transparent 100%)`,
            }}
          >
            <div
              style={{
                color: "rgba(250,246,241,0.9)",
                fontFamily: "var(--font-display)",
                fontSize: "1rem",
                fontStyle: "italic",
                fontWeight: 300,
                borderLeft: `2px solid ${C.terraLight}`,
                paddingLeft: "1rem",
              }}
            >
              Bettina Kahmann · Yogalehrerin &amp; Präventionsexpertin
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================
          STATS - TerraDark Hintergrund
      ============================================================== */}
      <section
        style={{
          background: C.terraDark,
          padding: "4rem 6rem",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "2rem",
          textAlign: "center",
        }}
        className="stats-grid"
      >
        {[
          { n: "3.000+", l: "Frauen begleitet" },
          { n: "20+",    l: "Jahre Erfahrung" },
          { n: "400+",   l: "Online-Videos" },
          { n: "§20",    l: "Krankenkasse" },
        ].map((s, i) => (
          <Reveal key={s.l} delay={i * 80}>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(3rem, 5vw, 4.5rem)",
                  fontWeight: 300,
                  color: C.terraLight,
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}
              >
                {s.n}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 400,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {s.l}
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ==============================================================
          INTRO - Split: Text + Zitat-Karte
      ============================================================== */}
      <section
        style={{
          padding: "7rem 6rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6rem",
          alignItems: "center",
          background: C.cream,
        }}
        className="intro-split"
      >
        <Reveal>
          <div>
            <SectionTag>Warum beVital InsideOut</SectionTag>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 300,
                lineHeight: 1.2,
                color: C.dark,
                marginBottom: "1.5rem",
              }}
            >
              Erschöpfung ist kein<br />
              <em style={{ fontStyle: "italic", color: C.pink }}>
                Charakterfehler.
              </em>
            </h2>
            <p
              style={{
                fontSize: "1rem",
                fontWeight: 300,
                lineHeight: 1.8,
                color: C.textLight,
                marginBottom: "1.2rem",
              }}
            >
              Du funktionierst. Du organisierst. Du hältst zusammen. Und
              irgendwo dabei bist du dir selbst abhanden gekommen.
            </p>
            <p
              style={{
                fontSize: "1rem",
                fontWeight: 300,
                lineHeight: 1.8,
                color: C.textLight,
                marginBottom: "1.2rem",
              }}
            >
              Stress, Schlafprobleme, Verspannungen - das sind keine Schwächen.
              Das sind Signale eines Nervensystems, das zu lange unter Dauerstrom
              stand.
            </p>
            <p
              style={{
                fontSize: "1rem",
                fontWeight: 300,
                lineHeight: 1.8,
                color: C.textLight,
                marginBottom: "2rem",
              }}
            >
              Genau da setze ich an. Nicht mit Wellness-Ritualen, sondern mit
              wirksamen Methoden, die dein Nervensystem wirklich regulieren.
            </p>
            <a href="/angebote" className="btn-pill btn-pink">
              Wie das geht
            </a>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div style={{ position: "relative" }}>
            {/* Zitat-Karte mit TerraDark-Hintergrund und Rahmen-Effekt */}
            <div
              style={{
                background: C.terraDark,
                padding: "3rem",
                borderRadius: 2,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -10,
                  right: -10,
                  left: 10,
                  bottom: 10,
                  border: `1px solid ${C.terraLight}`,
                  borderRadius: 2,
                  zIndex: -1,
                }}
              />
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.4rem",
                  fontStyle: "italic",
                  fontWeight: 300,
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.85)",
                  marginBottom: "1.5rem",
                }}
              >
                „Ich habe nach der ersten Woche gemerkt, dass ich abends
                tatsächlich abschalten kann. Das kannte ich kaum noch."
              </p>
              <div
                style={{
                  fontSize: "0.8rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: C.terraLight,
                }}
              >
                Nicole - Mitglied im LIVE Yoga Studio
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ==============================================================
          ANGEBOTE - Grid mit featured Karte
      ============================================================== */}
      <section
        id="angebote"
        style={{ background: C.creamDark, padding: "7rem 6rem" }}
        className="angebote-section"
      >
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <SectionTag center>Meine Angebote</SectionTag>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 300,
                color: C.dark,
                marginTop: "0.5rem",
              }}
            >
              Finde deinen{" "}
              <em style={{ fontStyle: "italic", color: C.pink }}>Einstieg.</em>
            </h2>
          </div>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
            maxWidth: 1200,
            margin: "0 auto",
          }}
          className="angebote-grid"
        >
          {[
            {
              nr: "01",
              icon: "🎬",
              title: "LIVE Yoga Studio",
              desc: "Live-Sessions per Zoom + 400+ On-Demand-Videos. Hatha, Yin, Atemarbeit - wann du willst, wie du willst.",
              link: "https://bettina-kahmann.coachy.net/lp/bettina-kahmann-1/",
              cta: "Zum Studio →",
              featured: true,
              iconBg: C.terraLight,
            },
            {
              nr: "02",
              icon: "🏥",
              title: "Präventionskurse §20",
              desc: "Zertifizierte Kurse, die deine Krankenkasse bis zu 100% erstattet. Online und vor Ort in der Wedemark.",
              link: "/kurse?tab=praevention",
              cta: "Jetzt anmelden →",
              featured: false,
              iconBg: C.terraLight,
            },
            {
              nr: "03",
              icon: "🌿",
              title: "Retreat Mallorca",
              desc: "5 Tage für dich. Yoga, Sonne, Stille. Max. 4 Frauen. Auf Mallorca, weit weg vom Alltag.",
              link: "/kontakt",
              cta: "Anfragen →",
              featured: false,
              iconBg: C.sage,
            },
            {
              nr: "04",
              icon: "🧘",
              title: "Offene Kurse",
              desc: "Hatha Yoga, Yin Yoga, AROHA - vor Ort in der Wedemark und live online. Drop-in, kein Abo.",
              link: "/kurse",
              cta: "Kursplan →",
              featured: false,
              iconBg: C.pink,
            },
            {
              nr: "05",
              icon: "✨",
              title: "Blissful Balance – 21 Tage Balance",
              desc: "Kurzprogramm: 21 Tage - körperlich, mental, innerlich. Yoga, Atem und Struktur in deinem Tempo.",
              link: "https://bettina-kahmann.coachy.net/lp/blissful-balance-3/",
              cta: "Zum Kurs →",
              featured: false,
              iconBg: C.pink,
            },
            {
              nr: "06",
              icon: "👤",
              title: "Personal Training",
              desc: "Individuelle Begleitung. Yoga, Atemarbeit, Ernährung - auf dich abgestimmt. 1:1 mit Bettina.",
              link: "/angebote",
              cta: "Anfragen →",
              featured: false,
              iconBg: "#7a6a9e",
            },
          ].map((a, i) => (
            <Reveal key={a.nr} delay={i * 80}>
              <div
                style={{
                  background: a.featured ? C.terraDark : C.cream,
                  padding: "2.5rem",
                  borderRadius: 2,
                  borderTop: a.featured ? "none" : `3px solid transparent`,
                  position: "relative",
                  overflow: "hidden",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s",
                  cursor: "pointer",
                }}
                className={a.featured ? "angebot-featured" : "angebot-card-hover"}
              >
                {/* Nummer */}
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "3.5rem",
                    fontWeight: 300,
                    color: a.featured
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(153,58,116,0.08)",
                    position: "absolute",
                    top: "1.5rem",
                    right: "1.5rem",
                    lineHeight: 1,
                  }}
                >
                  {a.nr}
                </div>

                {/* Icon */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    background: a.iconBg,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.5rem",
                    fontSize: "1.3rem",
                  }}
                >
                  {a.icon}
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.6rem",
                    fontWeight: 400,
                    color: a.featured ? "white" : C.dark,
                    marginBottom: "0.8rem",
                  }}
                >
                  {a.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.92rem",
                    fontWeight: 300,
                    lineHeight: 1.7,
                    color: a.featured ? "rgba(255,255,255,0.6)" : C.textLight,
                    marginBottom: "1.5rem",
                    flex: 1,
                  }}
                >
                  {a.desc}
                </p>
                <a
                  href={a.link}
                  target={a.link.startsWith("http") ? "_blank" : undefined}
                  rel={a.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: a.featured ? C.terraLight : C.pink,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    transition: "gap 0.2s",
                  }}
                >
                  {a.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ==============================================================
          ÜBER MICH - Split mit Bild-Platzhalter + Badge
      ============================================================== */}
      <section
        id="ueber"
        style={{
          padding: "7rem 6rem",
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: "6rem",
          alignItems: "center",
          background: C.cream,
        }}
        className="ueber-split"
      >
        <Reveal>
          <div style={{ position: "relative" }}>
            {/* Portrait-Foto */}
            <img
              src="/manus-storage/bettina-portrait_9faa3b45.jpg"
              alt="Bettina Kahmann – Yogalehrerin und Präventionsexpertin aus der Wedemark"
              style={{
                width: "100%",
                aspectRatio: "3/4",
                objectFit: "cover",
                objectPosition: "center top",
                borderRadius: 2,
                display: "block",
              }}
            />
            {/* Badge */}
            <div
              style={{
                position: "absolute",
                bottom: "-1.5rem",
                right: "-1.5rem",
                background: C.pink,
                color: "white",
                padding: "1.5rem",
                textAlign: "center",
                minWidth: 130,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2.5rem",
                  fontWeight: 300,
                  lineHeight: 1,
                  display: "block",
                }}
              >
                20+
              </span>
              <span
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  opacity: 0.85,
                }}
              >
                Jahre Erfahrung
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div>
            <SectionTag>Über mich</SectionTag>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 300,
                lineHeight: 1.2,
                color: C.dark,
                marginBottom: "1.5rem",
                marginTop: "0.5rem",
              }}
            >
              Ich bin Bettina -<br />
              <em style={{ fontStyle: "italic", color: C.pink }}>
                keine Yogalehrerin von der Stange.
              </em>
            </h2>
            <p
              style={{
                fontSize: "1rem",
                fontWeight: 300,
                lineHeight: 1.8,
                color: C.textLight,
                marginBottom: "1.2rem",
              }}
            >
              Ich unterrichte seit über 20 Jahren Bewegung. Was mich antreibt:
              nicht die perfekte Pose, sondern die Wirkung im Alltag.
            </p>
            <p
              style={{
                fontSize: "1rem",
                fontWeight: 300,
                lineHeight: 1.8,
                color: C.textLight,
                marginBottom: "1.2rem",
              }}
            >
              Als zertifizierte Präventionsexpertin (§20 SGB V) und
              Ernährungsberaterin arbeite ich mit Frauen, die erschöpft sind
              und das Gefühl haben, nicht mehr richtig abschalten zu können.
            </p>
            <p
              style={{
                fontSize: "1rem",
                fontWeight: 300,
                lineHeight: 1.8,
                color: C.textLight,
                marginBottom: "2rem",
              }}
            >
              Mein Ansatz: Nervensystem regulieren, Körper stabilisieren, Kraft
              aufbauen. Ohne Esoterik. Ohne leere Versprechen.
            </p>

            {/* Credentials */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "2rem" }}>
              {[
                "Yoga-Lehrerin",
                "Präventionsexpertin §20 SGB V",
                "Yin Yoga",
                "Hatha Yoga",
                "AROHA",
                "Ernährungsberaterin",
                "Personal Trainerin",
                "Aromaberaterin",
              ].map((c) => (
                <span
                  key={c}
                  style={{
                    background: C.creamDark,
                    border: `1px solid rgba(153,58,116,0.15)`,
                    padding: "0.4rem 1rem",
                    borderRadius: 2,
                    fontSize: "0.78rem",
                    fontWeight: 400,
                    color: C.text,
                    letterSpacing: "0.04em",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>

            <a href="/ueber-mich" className="btn-pill btn-pink">
              Mehr über mich →
            </a>
          </div>
        </Reveal>
      </section>

      {/* ==============================================================
          KURSPLAN - Aktuelle Termine
      ============================================================== */}
      <section
        id="kursplan"
        style={{ background: C.creamDark, padding: "7rem 6rem" }}
        className="kursplan-section"
      >
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <SectionTag center>Aktuelle Termine</SectionTag>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 300,
                color: C.dark,
                marginTop: "0.5rem",
              }}
            >
              Komm einfach.{" "}
              <em style={{ fontStyle: "italic", color: C.pink }}>Kein Abo.</em>
            </h2>
          </div>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2rem",
            maxWidth: 1200,
            margin: "0 auto",
          }}
          className="kursplan-grid"
        >
          {/* Vor Ort: Sport- und Tanzhaus Elze */}
          <Reveal delay={0}>
            <div
              style={{
                background: "white",
                borderRadius: 2,
                borderTop: `3px solid ${C.terraDark}`,
                padding: "2rem",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: C.terraDark,
                  marginBottom: "0.5rem",
                }}
              >
                Vor Ort
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.3rem",
                  fontWeight: 400,
                  color: C.dark,
                  marginBottom: "0.4rem",
                }}
              >
                Sport- und Tanzhaus Elze
              </h3>
              <div
                style={{
                  fontSize: "0.78rem",
                  color: C.textLight,
                  marginBottom: "1.5rem",
                }}
              >
                Blau-Gelb Elze
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", flex: 1 }}>
                {[
                  { tag: "Di", time: "18:00 - 19:15", title: "Hatha Yoga meets Yin", sub: "Starke & Balance", href: "https://www.fyndery.de/_/kurs/6262/yoga-fuer-strahlende-ausrichtung-kraftvolle-sequenz-trifft-auf-achtsame-tiefe/?ref=7239" },
                  { tag: "Di", time: "19:30 - 20:30", title: "YIN Yoga", sub: "Stressabbau, Entspannung & Flexibilitat", href: "https://www.fyndery.de/wedemark/kurs/34173/finde-ruhe-kraft-und-balance-mit-yin-yoga-fuer-mehr-achtsamkeit-im-alltag/?ref=7239" },
                  { tag: "Do", time: "18:15 - 19:30", title: "Yoga fur Manner & Frauen", sub: "Kraft, Beweglichkeit, Fokus", href: "https://www.fyndery.de/_/kurs/30709/staerke-aufbauen-und-entspannen/?ref=7239" },
                ].map((k, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.8rem", alignItems: "flex-start" }}>
                    <div
                      style={{
                        background: C.terraDark,
                        color: "white",
                        fontSize: "0.65rem",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        padding: "0.3rem 0.6rem",
                        borderRadius: 2,
                        flexShrink: 0,
                        marginTop: "0.15rem",
                      }}
                    >
                      {k.tag}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.75rem", color: C.terraLight, fontWeight: 500, marginBottom: "0.1rem" }}>{k.time} Uhr</div>
                      <a href={k.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.9rem", fontWeight: 500, color: C.dark, textDecoration: "underline", textUnderlineOffset: "3px" }}>{k.title}</a>
                      <div style={{ fontSize: "0.78rem", color: C.textLight }}>{k.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Vor Ort: YAP */}
          <Reveal delay={100}>
            <div
              style={{
                background: "white",
                borderRadius: 2,
                borderTop: `3px solid ${C.sage}`,
                padding: "2rem",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: C.sage,
                  marginBottom: "0.5rem",
                }}
              >
                Vor Ort
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.3rem",
                  fontWeight: 400,
                  color: C.dark,
                  marginBottom: "0.4rem",
                }}
              >
                YAP - YOUR Active Place
              </h3>
              <div
                style={{
                  fontSize: "0.78rem",
                  color: C.textLight,
                  marginBottom: "1.5rem",
                }}
              >
                Hopershof
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", flex: 1 }}>
                {[
                  { tag: "Mi", time: "18:00 - 18:50", title: "AROHA", sub: "Ausdauertraining & Stressabbau", href: "https://www.fyndery.de/online/kurs/14759/effektiver-gesundheitskurs-fuer-straffere-muskeln-und-innere-balance/?ref=7239" },
                ].map((k, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.8rem", alignItems: "flex-start" }}>
                    <div
                      style={{
                        background: C.sage,
                        color: "white",
                        fontSize: "0.65rem",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        padding: "0.3rem 0.6rem",
                        borderRadius: 2,
                        flexShrink: 0,
                        marginTop: "0.15rem",
                      }}
                    >
                      {k.tag}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.75rem", color: C.terraLight, fontWeight: 500, marginBottom: "0.1rem" }}>{k.time} Uhr</div>
                      <a href={k.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.9rem", fontWeight: 500, color: C.dark, textDecoration: "underline", textUnderlineOffset: "3px" }}>{k.title}</a>
                      <div style={{ fontSize: "0.78rem", color: C.textLight }}>{k.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Live Online */}
          <Reveal delay={200}>
            <div
              style={{
                background: C.terraDark,
                borderRadius: 2,
                padding: "2rem",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: C.terraLight,
                  marginBottom: "0.5rem",
                }}
              >
                Live Online
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.3rem",
                  fontWeight: 400,
                  color: "white",
                  marginBottom: "0.4rem",
                }}
              >
                Zoom
              </h3>
              <div
                style={{
                  fontSize: "0.78rem",
                  color: "rgba(250,246,241,0.5)",
                  marginBottom: "1.5rem",
                }}
              >
                Von zu Hause aus
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", flex: 1 }}>
                {[
                  { tag: "Di", time: "9:00 - 9:50", title: "FaszienFit Yoga", sub: "Mobilitat, Starke & Balance", href: "https://www.fyndery.de/online/kurs/16842/faszien-yoga-fuer-dein-ganzheitliches-wohlbefinden/?ref=7239" },
                  { tag: "Mi", time: "19:30 - 20:30", title: "YIN Yoga", sub: "Entspannung, Loslassen & Flexibilitat", href: "https://www.fyndery.de/online/kurs/6261/yin-yoga-live-online/?ref=7239" },
                  { tag: "So", time: "9:00 - 10:00", title: "Morning Energy Yoga", sub: "Power & Energie, Aktivierung", href: "https://www.fyndery.de/online/kurs/16133/morning-energy-yoga-ist-eine-vitalisierende-online-yogastunde/?ref=7239" },
                ].map((k, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.8rem", alignItems: "flex-start" }}>
                    <div
                      style={{
                        background: "rgba(255,255,255,0.15)",
                        color: C.terraLight,
                        fontSize: "0.65rem",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        padding: "0.3rem 0.6rem",
                        borderRadius: 2,
                        flexShrink: 0,
                        marginTop: "0.15rem",
                        border: `1px solid rgba(193,123,82,0.3)`,
                      }}
                    >
                      {k.tag}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.75rem", color: C.terraLight, fontWeight: 500, marginBottom: "0.1rem" }}>{k.time} Uhr</div>
                      <a href={k.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.9rem", fontWeight: 500, color: "white", textDecoration: "underline", textUnderlineOffset: "3px" }}>{k.title}</a>
                      <div style={{ fontSize: "0.78rem", color: "rgba(250,246,241,0.55)" }}>{k.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={300}>
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <a
              href="https://www.fyndery.de/yoga-by-bettina/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill btn-pink"
            >
              Kurs buchen (Fyndery) -&gt;
            </a>
          </div>
        </Reveal>

        {/* Hansefit-Hinweis */}
        <Reveal delay={400}>
          <div
            style={{
              maxWidth: 720,
              margin: "2.5rem auto 0",
              background: "white",
              borderRadius: 2,
              borderLeft: `4px solid ${C.sage}`,
              padding: "1.4rem 2rem",
              display: "flex",
              alignItems: "flex-start",
              gap: "1.2rem",
            }}
          >
            <div
              style={{
                fontSize: "1.6rem",
                lineHeight: 1,
                flexShrink: 0,
                marginTop: "0.1rem",
              }}
            >
              &#128200;
            </div>
            <div>
              <div
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: C.sage,
                  marginBottom: "0.4rem",
                }}
              >
                Hansefit-Mitglied?
              </div>
              <p style={{ fontSize: "0.95rem", fontWeight: 400, color: C.dark, marginBottom: "0.4rem" }}>
                Dann sparst du sofort.
              </p>
              <p style={{ fontSize: "0.85rem", fontWeight: 300, color: C.textLight, lineHeight: 1.6 }}>
                Als Hansefit-Verbundpartnerin biete ich viele Kurse kostenlos oder
                vergunstigt an. Bei Kursen, Events und Workshops bekommst du
                zusatzlich 12 EUR Rabatt. Meine Live-Online-Kurse findest du unter{" "}
                <strong style={{ color: C.dark }}>Yoga by Bettina Kahmann</strong>.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ==============================================================
          TESTIMONIALS - TerraDark Hintergrund, linker Border
      ============================================================== */}
      <section
        style={{ background: C.terraDark, padding: "7rem 6rem" }}
        className="testimonials-section"
      >
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <SectionTag center color={C.terraLight}>
              Das sagen meine Teilnehmerinnen
            </SectionTag>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 300,
                color: "white",
                marginTop: "0.5rem",
              }}
            >
              Echte Worte.{" "}
              <em style={{ fontStyle: "italic", color: C.terraLight }}>
                Echte Wirkung.
              </em>
            </h2>
          </div>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
            maxWidth: 1200,
            margin: "0 auto",
          }}
          className="testimonials-grid"
        >
          {[
            {
              quote:
                "Die regelmäßige Yoga-Praxis bei dir im Yoga-Club trägt erheblich zu meinem Wohlbefinden und zur körperlichen Fitness bei. Die Asanas in den Stunden sind so vielseitig von dir ausgewählt und sprechen wirklich alle Bereiche an. Ich bin glücklich, Yoga durch dich für mich entdeckt zu haben.",
              name: "Monika",
              kurs: "LIVE Yoga Studio Online",
            },
            {
              quote:
                "Seitdem ich selbst Yogalehrerin bin, schaffen es nur noch wenige, mich wirklich im Yoga abzuholen – aber du gehörst definitiv dazu! Deine wundervolle Ausstrahlung und deine besondere Art zu unterrichten machen deinen Unterricht zu etwas ganz Besonderem.",
              name: "Nicole",
              kurs: "Yoga · Teilnehmerin",
            },
            {
              quote:
                "Durch deine Authentizität sowie herzliche, ruhige, freundliche Ausstrahlung kann ich mich gut auf deine Angebote einlassen. Das Nachspüren am Ende ist mir heilig – es gibt mir ein Gefühl des Friedens. Ich würde dich jedem empfehlen, der neugierig auf Yoga und AROHA ist.",
              name: "Anette",
              kurs: "Yoga & AROHA",
            },
          ].map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div
                style={{
                  background: C.cream,
                  borderLeft: `3px solid ${C.terraLight}`,
                  padding: "2.5rem",
                  borderRadius: 2,
                  transition: "all 0.3s",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    fontSize: "2.5rem",
                    color: C.terraLight,
                    fontFamily: "var(--font-display)",
                    lineHeight: 0.5,
                    marginBottom: "1rem",
                  }}
                >
                  "
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.15rem",
                    fontStyle: "italic",
                    fontWeight: 300,
                    lineHeight: 1.7,
                    color: C.text,
                    marginBottom: "1.5rem",
                    flex: 1,
                  }}
                >
                  {t.quote}
                </p>
                <div>
                  <div
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: 400,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: C.terraLight,
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: C.textLight,
                      marginTop: "0.2rem",
                    }}
                  >
                    {t.kurs}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ==============================================================
          GRATIS GUIDES - 3 Download-Karten
      ============================================================== */}
      <section
        id="freebook"
        style={{ background: C.cream, padding: "7rem 6rem" }}
        className="guides-section"
      >
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <SectionTag center>Gratis für dich</SectionTag>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 300,
                color: C.dark,
                marginTop: "0.5rem",
              }}
            >
              Drei Einstiege.{" "}
              <em style={{ fontStyle: "italic", color: C.pink }}>
                Such dir deinen aus.
              </em>
            </h2>
          </div>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.5rem",
            maxWidth: 900,
            margin: "0 auto",
          }}
          className="guides-grid"
        >
          {/* Guide 1 - Atemtechniken (featured, TerraDark) */}
          <Reveal delay={0}>
            <div
              style={{
                background: C.terraDark,
                padding: "2.5rem",
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "1.2rem" }}>🌬️</div>
              <div
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: C.terraLight,
                  marginBottom: "0.8rem",
                }}
              >
                Empfohlen
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  fontWeight: 400,
                  color: "white",
                  marginBottom: "0.8rem",
                }}
              >
                7 Atemtechniken
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.6)",
                  marginBottom: "1.5rem",
                  flex: 1,
                }}
              >
                Sieben Techniken, die dein Nervensystem sofort regulieren. Für
                den Moment, wenn der Stress zu groß ist.
              </p>
              {/* Keyword-Box */}
              <div
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: `1px solid rgba(193,123,82,0.3)`,
                  padding: "1rem",
                  borderRadius: 2,
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.72rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: C.terraLight,
                    marginBottom: "0.3rem",
                  }}
                >
                  Dein Download
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.3rem",
                    color: "white",
                    fontStyle: "italic",
                  }}
                >
                  PDF · Sofort verfügbar
                </div>
              </div>
              <a
                href="https://bettinakahmann43364.activehosted.com/f/31"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: C.terraLight,
                  color: "white",
                  padding: "0.9rem 1.5rem",
                  textAlign: "center",
                  textDecoration: "none",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  borderRadius: 2,
                  transition: "all 0.3s",
                  display: "block",
                }}
              >
                Jetzt gratis sichern
              </a>
            </div>
          </Reveal>

          {/* Guide 2 - Yoga Starter (Cream, Pink-Border oben) */}
          <Reveal delay={100}>
            <div
              style={{
                background: "white",
                padding: "2.5rem",
                borderRadius: 2,
                borderTop: `3px solid ${C.pink}`,
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "1.2rem" }}>🧘</div>
              <div
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: C.textLight,
                  marginBottom: "0.8rem",
                }}
              >
                Für Einsteigerinnen
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  fontWeight: 400,
                  color: C.dark,
                  marginBottom: "0.8rem",
                }}
              >
                Yoga Starter-Guide
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: C.textLight,
                  marginBottom: "1.5rem",
                  flex: 1,
                }}
              >
                Du möchtest mit Yoga anfangen - aber weißt nicht wie? 7 Tage,
                was Yoga wirklich kann. Ohne Vorkenntnisse, ohne Ausrüstung.
              </p>
              <div
                style={{
                  background: C.creamDark,
                  border: `1px solid rgba(153,58,116,0.15)`,
                  padding: "1rem",
                  borderRadius: 2,
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.72rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: C.pink,
                    marginBottom: "0.3rem",
                  }}
                >
                  Dein Download
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.3rem",
                    color: C.dark,
                    fontStyle: "italic",
                  }}
                >
                  PDF · Sofort verfügbar
                </div>
              </div>
              <a
                href="https://bettinakahmann43364.activehosted.com/f/27"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: C.pink,
                  color: "white",
                  padding: "0.9rem 1.5rem",
                  textAlign: "center",
                  textDecoration: "none",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  borderRadius: 2,
                  display: "block",
                }}
              >
                Jetzt gratis sichern
              </a>
            </div>
          </Reveal>

          {/* Guide 3 - Krankenkassen-Kompass (Cream, Sage-Border oben) */}
          <Reveal delay={200}>
            <div
              style={{
                background: "white",
                padding: "2.5rem",
                borderRadius: 2,
                borderTop: `3px solid ${C.sage}`,
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "1.2rem" }}>💊</div>
              <div
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: C.textLight,
                  marginBottom: "0.8rem",
                }}
              >
                Geld zurück
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  fontWeight: 400,
                  color: C.dark,
                  marginBottom: "0.8rem",
                }}
              >
                Krankenkassen-Kompass
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: C.textLight,
                  marginBottom: "1.5rem",
                  flex: 1,
                }}
              >
                Wie du bis zu 100% Erstattung von deiner Krankenkasse bekommst -
                Schritt für Schritt erklärt.
              </p>
              <div
                style={{
                  background: C.creamDark,
                  border: `1px solid rgba(122,158,126,0.3)`,
                  padding: "1rem",
                  borderRadius: 2,
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.72rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: C.sage,
                    marginBottom: "0.3rem",
                  }}
                >
                  Dein Download
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.3rem",
                    color: C.dark,
                    fontStyle: "italic",
                  }}
                >
                  PDF · Sofort verfügbar
                </div>
              </div>
              <a
                href="https://bettinakahmann43364.activehosted.com/f/25"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: C.sage,
                  color: "white",
                  padding: "0.9rem 1.5rem",
                  textAlign: "center",
                  textDecoration: "none",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  borderRadius: 2,
                  display: "block",
                }}
              >
                Jetzt gratis sichern
              </a>
            </div>
          </Reveal>

          {/* Guide 4 - Nervensystem (Pink-Border oben) */}
          <Reveal delay={300}>
            <div
              style={{
                background: "white",
                padding: "2.5rem",
                borderRadius: 2,
                borderTop: `3px solid ${C.pink}`,
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "1.2rem" }}>&#129504;</div>
              <div
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: C.textLight,
                  marginBottom: "0.8rem",
                }}
              >
                Nervensystem
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  fontWeight: 400,
                  color: C.dark,
                  marginBottom: "0.8rem",
                }}
              >
                Nervensystem-Guide
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: C.textLight,
                  marginBottom: "1.5rem",
                  flex: 1,
                }}
              >
                Verstehe, warum du nicht abschalten kannst - und was du
                konkret dagegen tun kannst. Sofort umsetzbar.
              </p>
              <div
                style={{
                  background: C.creamDark,
                  border: `1px solid rgba(153,58,116,0.15)`,
                  padding: "1rem",
                  borderRadius: 2,
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.72rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: C.pink,
                    marginBottom: "0.3rem",
                  }}
                >
                  Dein Download
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.3rem",
                    color: C.dark,
                    fontStyle: "italic",
                  }}
                >
                  PDF · Sofort verfügbar
                </div>
              </div>
              <a
                href="https://bettinakahmann43364.activehosted.com/f/21"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: C.pink,
                  color: "white",
                  padding: "0.9rem 1.5rem",
                  textAlign: "center",
                  textDecoration: "none",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  borderRadius: 2,
                  display: "block",
                }}
              >
                Jetzt gratis sichern
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==============================================================
          RESET-SEKTION - Split: Mini-Kurs + 8-Wochen-Programm
      ============================================================== */}
      <section
        style={{ background: C.creamDark, padding: "7rem 6rem" }}
        className="reset-section"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "center",
            maxWidth: 1200,
            margin: "0 auto",
          }}
          className="reset-grid"
        >
          {/* Links - Mini-Kurs */}
          <Reveal>
            <div>
              <SectionTag>Kostenloser Einstieg</SectionTag>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  fontWeight: 300,
                  lineHeight: 1.15,
                  color: C.dark,
                  marginBottom: "1.5rem",
                }}
              >
                5 Tage RESET -<br />
                <em style={{ fontStyle: "italic", color: C.pink }}>
                  kostenlos starten.
                </em>
              </h2>
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: 300,
                  lineHeight: 1.8,
                  color: C.textLight,
                  marginBottom: "1rem",
                }}
              >
                Du schläfst - und wachst trotzdem müde auf. Das ist kein Zeichen
                von Schwäche. Das ist ein überlastetes Nervensystem.
              </p>
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: 300,
                  lineHeight: 1.8,
                  color: C.textLight,
                  marginBottom: "2rem",
                }}
              >
                In 5 kurzen Videos zeige ich dir, was in deinem Körper gerade
                passiert - und was wirklich hilft.
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.8rem",
                  marginBottom: "2rem",
                }}
              >
                {[
                  "Tag 1: Atmen und ankommen",
                  "Tag 2: Warum du müde bist, obwohl du geschlafen hast",
                  "Tag 3: Eine Übung. Auf der Couch. Heute Abend.",
                  "Tag 4: Was sich verändert, wenn du aufhörst zu funktionieren",
                  "Tag 5: Was jetzt - und warum RESET dein nächster Schritt ist",
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.8rem",
                      fontSize: "0.92rem",
                      fontWeight: 300,
                      color: C.text,
                    }}
                  >
                    <span style={{ color: C.pink, fontWeight: 500 }}>→</span>
                    {item}
                  </div>
                ))}
              </div>

              <a href="/minikurs" className="btn-pill btn-pink">
                Jetzt kostenlos starten →
              </a>
            </div>
          </Reveal>

          {/* Rechts - 8-Wochen RESET */}
          <Reveal delay={150}>
            <div
              style={{
                background: C.terraDark,
                padding: "3.5rem",
                borderRadius: 2,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Hintergrund-Zahl */}
              <div
                style={{
                  position: "absolute",
                  top: "-1rem",
                  right: "-1rem",
                  fontFamily: "var(--font-display)",
                  fontSize: "12rem",
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.04)",
                  lineHeight: 1,
                  pointerEvents: "none",
                }}
              >
                8
              </div>

              <div
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 500,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: "1rem",
                }}
              >
                Das vollständige Programm
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2rem",
                  fontWeight: 300,
                  color: "white",
                  marginBottom: "0.5rem",
                  lineHeight: 1.2,
                }}
              >
                RESET -<br />
                <em style={{ fontStyle: "italic" }}>8 Wochen.</em>
              </h3>
              <p
                style={{
                  fontSize: "0.92rem",
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.65)",
                  marginBottom: "2rem",
                }}
              >
                Strukturiert. Begleitet. Mit mir. 8 Wochen Nervensystem-Regulation
                - damit Ruhe, Klarheit und Energie dein neuer Normalzustand werden.
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  marginBottom: "2.5rem",
                }}
              >
                {[
                  { icon: "🧘", title: "Wöchentliche Yoga-Einheiten", sub: "Hatha & Yin - live und on demand" },
                  { icon: "🌬️", title: "Atemarbeit & Nervensystem", sub: "Gezielte Techniken, die sofort wirken" },
                  { icon: "👤", title: "Persönliche Begleitung", sub: "Mit Bettina - nicht alleine" },
                ].map((item) => (
                  <div
                    key={item.title}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "1rem",
                      padding: "1rem",
                      background: "rgba(255,255,255,0.07)",
                      borderRadius: 2,
                    }}
                  >
                    <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <div
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: 500,
                          color: "white",
                          marginBottom: "0.2rem",
                        }}
                      >
                        {item.title}
                      </div>
                      <div
                        style={{
                          fontSize: "0.78rem",
                          fontWeight: 300,
                          color: "rgba(255,255,255,0.5)",
                        }}
                      >
                        {item.sub}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="https://reset-warteliste.lovable.app/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "white",
                  color: C.terraDark,
                  padding: "1rem 2rem",
                  textDecoration: "none",
                  fontSize: "0.83rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  borderRadius: 2,
                  display: "inline-block",
                  transition: "all 0.3s",
                }}
              >
                Auf die Warteliste →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==============================================================
          MALLORCA - Dunkelgrün, Split-Layout
      ============================================================== */}
      <section
        id="mallorca"
        style={{
          background: "linear-gradient(135deg, #1a3a2e 0%, #0d2018 100%)",
          padding: "7rem 6rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "center",
        }}
        className="mallorca-section"
      >
        <Reveal>
          <div>
            <SectionTag color="#8ec6a0">Retreat Mallorca</SectionTag>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 300,
                color: "white",
                lineHeight: 1.2,
                marginBottom: "1.5rem",
                marginTop: "0.5rem",
              }}
            >
              5 Tage.<br />
              4 Frauen.<br />
              <em style={{ fontStyle: "italic", color: "#8ec6a0" }}>
                Kein Alltag.
              </em>
            </h2>
            <p
              style={{
                fontSize: "1rem",
                fontWeight: 300,
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.65)",
                marginBottom: "1.2rem",
              }}
            >
              Yoga, Atemarbeit, Stille und Sonne. Mein Retreat auf Mallorca ist
              kein Urlaub mit Yoga-Einheit - es ist eine echte Auszeit, die
              etwas verändert.
            </p>
            <p
              style={{
                fontSize: "1rem",
                fontWeight: 300,
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.65)",
                marginBottom: "2rem",
              }}
            >
              Kleine Gruppe, persönliche Begleitung, ruhige Lage in Santanyí.
              Alles, was dein Nervensystem braucht.
            </p>

            {/* Details-Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5rem",
                marginBottom: "2rem",
              }}
            >
              {[
                { label: "Dauer", value: "5 Tage · 4 Nächte" },
                { label: "Gruppe", value: "Max. 4 Frauen" },
                { label: "Ort", value: "Santanyí, Mallorca" },
                { label: "Termin", value: "Herbst 2025" },
              ].map((d) => (
                <div
                  key={d.label}
                  style={{ borderLeft: `2px solid #8ec6a0`, paddingLeft: "1rem" }}
                >
                  <div
                    style={{
                      fontSize: "0.7rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#8ec6a0",
                      marginBottom: "0.2rem",
                    }}
                  >
                    {d.label}
                  </div>
                  <div
                    style={{ fontSize: "0.95rem", color: "white", fontWeight: 300 }}
                  >
                    {d.value}
                  </div>
                </div>
              ))}
            </div>

            <a href="/retreat" className="btn-pill btn-pink">
              Mehr erfahren →
            </a>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div
            style={{
              borderRadius: 2,
              minHeight: 480,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <img
              src="/manus-storage/retreat_mallorca_9fd4c4ff.jpg"
              alt="Bettina Yoga Retreat Mallorca"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: 480 }}
            />
          </div>
        </Reveal>
      </section>

      {/* ==============================================================
          FAQ
      ============================================================== */}
      <section
        style={{ background: C.cream, padding: "7rem 6rem" }}
        className="faq-section"
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <SectionTag center>Häufige Fragen</SectionTag>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  fontWeight: 300,
                  color: C.dark,
                  marginTop: "0.5rem",
                }}
              >
                Deine Fragen -{" "}
                <em style={{ fontStyle: "italic", color: C.pink }}>
                  meine Antworten.
                </em>
              </h2>
            </div>
          </Reveal>
          <FaqList />
        </div>
      </section>

      {/* ==============================================================
          INSTAGRAM CTA
      ============================================================== */}
      <section
        style={{ background: C.creamDark, padding: "5rem 6rem" }}
        className="instagram-section"
      >
        <Reveal>
          <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
            <SectionTag center>Instagram</SectionTag>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                fontWeight: 300,
                color: C.dark,
                marginBottom: "1rem",
                marginTop: "0.5rem",
              }}
            >
              Kurze Impulse für deinen Alltag
            </h2>
            <p
              style={{
                fontSize: "1rem",
                fontWeight: 300,
                lineHeight: 1.7,
                color: C.textLight,
                marginBottom: "2rem",
              }}
            >
              Atemübungen, Yoga-Tipps und Einblicke - für Frauen, die raus aus
              dem Dauerstress wollen.
            </p>
            <a
              href="https://instagram.com/be_vital_insideout"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill btn-pink"
            >
              @be_vital_insideout →
            </a>
          </div>
        </Reveal>
      </section>

      {/* Responsive CSS */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          .hero-split {
            grid-template-columns: 1fr !important;
          }
          .hero-content-left {
            padding: 3rem 1.5rem 2rem !important;
          }
          .hero-image-right {
            display: none !important;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            padding: 3rem 1.5rem !important;
          }
          .intro-split,
          .ueber-split,
          .reset-grid,
          .mallorca-section {
            grid-template-columns: 1fr !important;
            padding: 4rem 1.5rem !important;
            gap: 3rem !important;
          }
          .angebote-section,
          .testimonials-section,
          .guides-section,
          .kursplan-section,
          .reset-section,
          .faq-section,
          .instagram-section {
            padding: 4rem 1.5rem !important;
          }
          .angebote-grid,
          .testimonials-grid,
          .guides-grid,
          .kursplan-grid {
            grid-template-columns: 1fr !important;
          }
        }

        .angebot-card-hover:hover {
          border-top-color: #993A74 !important;
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.08);
        }
        .angebot-featured:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.15);
        }
      `}</style>
    </Layout>
  );
}

// --- FAQ-Akkordeon -----------------------------------------------------------
function FaqList() {
  const [open, setOpen] = useState<number | null>(null);
  const C2 = {
    text: "#3a2e24",
    textLight: "#7a6a5a",
    pink: "#993A74",
    cream: "#FAF6F1",
    creamDark: "#F0E8DE",
    creamDeep: "#e2d5c8",
  };
  const faqs = [
    {
      q: "Brauche ich Vorkenntnisse?",
      a: "Nein. Alle offenen Kurse und Präventionskurse sind für Einsteiger geeignet. Kein bestimmtes Fitnesslevel nötig.",
    },
    {
      q: "Wie funktioniert die Krankenkassen-Erstattung?",
      a: "Du buchst den Präventionskurs und bezahlst die Gebühr. Nach Kursabschluss bekommst du eine Teilnahmebescheinigung. Die reichst du bei deiner Krankenkasse ein - die meisten erstatten 80-100%.",
    },
    {
      q: "Kann ich einfach so einsteigen?",
      a: "Ja. Offene Kurse sind Drop-in - du buchst deinen Platz über Fyndery und kommst einfach. Kein Abo, kein Vertrag.",
    },
    {
      q: "Was ist der Unterschied zwischen Hatha und Yin Yoga?",
      a: "Hatha Yoga kombiniert Kraft und Beweglichkeit - aktiver, strukturierter. Yin Yoga ist passiv und tief - lange gehaltene Positionen für Faszien und Nervensystem.",
    },
    {
      q: "Wie buche ich einen Kurs?",
      a: "Über den Button 'Kurs buchen' - der führt direkt zu Fyndery, meiner Buchungsplattform. Dort siehst du alle verfügbaren Termine.",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {faqs.map((f, i) => (
        <Reveal key={i} delay={i * 60}>
          <div
            style={{
              borderRadius: 2,
              overflow: "hidden",
              border: `1px solid ${C2.creamDeep}`,
              background: "white",
            }}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1.25rem 1.5rem",
                textAlign: "left",
                background: open === i ? C2.creamDark : "white",
                border: "none",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              <span
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  color: C2.text,
                  paddingRight: "1rem",
                }}
              >
                {f.q}
              </span>
              <span
                style={{
                  fontSize: "1.2rem",
                  color: C2.pink,
                  flexShrink: 0,
                  transition: "transform 0.2s",
                  transform: open === i ? "rotate(45deg)" : "none",
                }}
              >
                +
              </span>
            </button>
            {open === i && (
              <div
                style={{
                  padding: "0 1.5rem 1.25rem",
                  borderTop: `1px solid ${C2.creamDeep}`,
                }}
              >
                <p
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 300,
                    lineHeight: 1.7,
                    color: C2.textLight,
                    paddingTop: "1rem",
                  }}
                >
                  {f.a}
                </p>
              </div>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
