import Layout from "@/components/Layout";
import { useSEO } from "@/hooks/useSEO";

const C = {
  pink:       "#993A74",
  terraLight: "#C17B52",
  terraDark:  "#8C492E",
  cream:      "#FAF6F1",
  creamDark:  "#F0E8DE",
  creamDeep:  "#e2d5c8",
  text:       "#2a1f1a",
  textMuted:  "#6b5a52",
};

function Section({ nr, title, children }: { nr: string; title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2
        className="text-xs font-semibold tracking-widest uppercase mb-3 flex items-center gap-3"
        style={{ color: C.terraLight }}
      >
        <span style={{ color: C.terraLight }}>{nr}.</span> {title}
      </h2>
      <div className="text-sm font-light leading-relaxed space-y-3" style={{ color: C.textMuted }}>
        {children}
      </div>
    </div>
  );
}

export default function AGB() {
  useSEO({
    title: "AGB | beVital InsideOut – Bettina Kahmann",
    description: "Allgemeine Geschäftsbedingungen von beVital InsideOut – Bettina Kahmann, Yogalehrerin aus der Wedemark.",
  });
  return (
    <Layout>
      <section style={{ background: C.cream, minHeight: "100vh" }} className="px-6 lg:px-20 py-24">
        <div className="max-w-3xl mx-auto">
          <div
            className="text-[0.68rem] font-semibold tracking-[0.25em] uppercase mb-3 flex items-center gap-3"
            style={{ color: C.terraLight }}
          >
            <span className="w-6 h-[1.5px]" style={{ background: C.terraLight }} />
            Rechtliches
          </div>

          <h1
            className="font-normal mb-3"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem,5vw,4rem)",
              color: C.text,
              lineHeight: 1.05,
            }}
          >
            AGB
          </h1>
          <p className="text-sm font-light mb-12" style={{ color: C.textMuted }}>
            Allgemeine Geschaeftsbedingungen und Teilnahmebedingungen von BK-Balance, Bettina Kahmann
          </p>

          <div className="space-y-10">
            <Section nr="1" title="Anmeldung">
              <p>
                Die Anmeldung zu den Angeboten von BK-Balance, Bettina Kahmann kann telefonisch,
                per WhatsApp oder per E-Mail erfolgen. Eine verbindliche Teilnahme kommt erst mit
                der Bestaetigung durch BK-Balance, Bettina Kahmann zustande.
              </p>
            </Section>

            <Section nr="2" title="Kursangebot und Aenderungen">
              <p>
                BK-Balance, Bettina Kahmann behaelt sich das Recht vor, Kurszeiten oder
                Veranstaltungsorte in zumutbarem Rahmen zu aendern. Alle Aenderungen werden
                rechtzeitig auf der Website bekannt gegeben.
              </p>
            </Section>

            <Section nr="3" title="Gesundheitliche Voraussetzungen und Haftung">
              <p>
                TeilnehmerInnen sind verpflichtet, gesundheitliche Einschraenkungen, Erkrankungen
                oder eine Schwangerschaft vor Kursbeginn mitzuteilen. Bei schwerwiegenden
                gesundheitlichen Problemen ist eine Teilnahme nur mit aerztlicher Genehmigung
                moeglich. Die Entscheidung ueber eine Teilnahme trifft letztlich die Kursleitung.
              </p>
              <p>
                Alle Kurse und Leistungen erfolgen auf eigene Verantwortung. BK-Balance, Bettina
                Kahmann schliesst jegliche Haftung aus, sofern kein grob fahrlaessiges oder
                vorsaetzliches Verschulden vorliegt. Eine Berufshaftpflichtversicherung besteht zur
                Abdeckung gesetzlicher Haftungsansprueche.
              </p>
            </Section>

            <Section nr="4" title="Zahlungsbedingungen">
              <p>
                <strong style={{ color: C.text }}>Kurse &amp; Mitgliedschaften:</strong> Die
                Kursgebuehr ist vor Kursbeginn in voller Hoehe zu entrichten. Zahlungen erfolgen
                bar, per PayPal oder Ueberweisung. Ausgefallene Stunden werden nach Moeglichkeit
                nachgeholt.
              </p>
              <p>
                <strong style={{ color: C.text }}>Einzelsitzungen &amp; Workshops:</strong>{" "}
                Personal Trainings sind am jeweiligen Termin bar oder nach Absprache per Rechnung
                zu zahlen. Workshops sind im Voraus zu begleichen. Eine Rechnung oder Quittung kann
                auf Wunsch ausgestellt werden.
              </p>
            </Section>

            <Section nr="5" title="Stornierungen und Terminabsagen">
              <p>
                Eine Absage eines Kurses, Workshops oder Personal Trainings weniger als 24 Stunden
                vor dem Termin fuehrt zur vollen Berechnung der Gebuehr.
              </p>
              <p>
                Bei Abbruch eines mehrwoechigen Kurses besteht kein Anspruch auf Erstattung. Eine
                Uebertragung des Platzes auf eine andere Person ist jedoch nach Absprache moeglich.
              </p>
            </Section>

            <Section nr="6" title="Nachholen von Kursstunden">
              <p>
                Nach Absprache kann eine verpasste Kursstunde in einem anderen Kurs nachgeholt
                werden.
              </p>
            </Section>

            <Section nr="7" title="Ersatzleistungen und Verspaetungen">
              <p>
                Muss BK-Balance, Bettina Kahmann einen Termin absagen, besteht kein Anspruch auf
                Schadensersatz. Ein Ersatztermin wird jedoch angeboten.
              </p>
              <p>
                Verspaetungen seitens BK-Balance werden ausgeglichen. KundInnen haben bei eigener
                Verspaetung jedoch keinen Anspruch auf Nachholung.
              </p>
            </Section>

            <Section nr="8" title="Zuschuesse durch Krankenkassen">
              <p>
                Hatha-Yoga-Kurse koennen nach &sect;20 Abs. 1 SGB V von gesetzlichen Krankenkassen
                gefoerdert werden. Die Entscheidung liegt im Ermessen der jeweiligen Krankenkasse.
                Bei mindestens 80% Teilnahme kann eine Teilnahmebestaetigung fuer die Krankenkasse
                ausgestellt werden.
              </p>
            </Section>

            <Section nr="9" title="Datenschutz">
              <p>
                Persoenliche Daten werden ausschliesslich zur Verwaltung der gebuchten Leistungen
                genutzt und ohne ausdrueckliche Einwilligung nicht an Dritte weitergegeben.
              </p>
            </Section>

            <Section nr="10" title="Haftung">
              <p>
                Fuer den Verlust oder die Beschaedigung von Gegenstaenden der TeilnehmerInnen,
                insbesondere von Kleidung, Wertgegenstaenden und Geld, wird die Haftung fuer den
                Fall einfacher Fahrlaessigkeit ausgeschlossen.
              </p>
              <p>
                BK-Balance, Bettina Kahmann haftet nicht fuer vom Mitglied/Kunden ausschliesslich
                selbst verschuldete Unfaelle. Fuer gesundheitliche Schaeden durch unsachgemaesse
                Geraetebenutzung wird ebenfalls keine Haftung uebernommen.
              </p>
              <p>
                Bei Ausfall des Betriebes aus Gruenden, die BK-Balance nicht zu vertreten hat,
                besteht kein ueber die Beitragsrueckzahlung hinausgehender Anspruch auf
                Ersatzstunden oder Schadenersatz.
              </p>
              <div
                className="rounded-xl p-5 border-l-4 mt-4"
                style={{ background: C.creamDark, borderColor: C.terraLight }}
              >
                <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: C.terraLight }}>
                  Aerztliches Attest erforderlich bei:
                </p>
                <p>
                  Schwangerschaft, kuenstliche Befruchtungen, oestrogenbedingten Krebserkrankungen,
                  akuter Endometriose, Bluthochdruck, Thrombose, Herz- und/oder Arterienproblemen,
                  frischen Wunden, Kunstprothesen, Diabetes, Epilepsie, Entzuendungen, akuter
                  Migraene, Herzschrittmacher, Tumoren, kuenstlichen Implantaten sowie jeglicher
                  Art von koerperlichen Schmerzen.
                </p>
                <p className="mt-2">
                  Mit der Anmeldung erklaert der Kunde, dass er sportgesund ist.
                </p>
              </div>
            </Section>

            <Section nr="11" title="Salvatorische Klausel">
              <p>
                Sollte eine Bestimmung dieser AGB unwirksam sein, bleibt die Gueltigkeit der
                uebrigen Bestimmungen unberuehrt.
              </p>
            </Section>
          </div>
        </div>
      </section>
    </Layout>
  );
}
