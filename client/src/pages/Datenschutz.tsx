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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2
        className="text-xs font-semibold tracking-widest uppercase mb-3"
        style={{ color: C.terraLight }}
      >
        {title}
      </h2>
      <div className="space-y-3 text-sm font-light leading-relaxed" style={{ color: C.textMuted }}>
        {children}
      </div>
    </div>
  );
}

export default function Datenschutz() {
  useSEO({
    title: "Datenschutz | beVital InsideOut – Bettina Kahmann",
    description: "Datenschutzerklärung von beVital InsideOut – Bettina Kahmann.",
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
            className="font-normal mb-12"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem,5vw,4rem)",
              color: C.text,
              lineHeight: 1.05,
            }}
          >
            Datenschutz
          </h1>

          <div className="space-y-10">
            <p className="text-sm font-light leading-relaxed" style={{ color: C.textMuted }}>
              Wir freuen uns ueber Ihr Interesse. Datenschutz hat einen besonders hohen Stellenwert
              fuer Bettina Kahmann. Eine Nutzung der Internetseiten ist grundsaetzlich ohne Angabe
              personenbezogener Daten moeglich. Sofern besondere Services in Anspruch genommen
              werden sollen, kann eine Verarbeitung personenbezogener Daten erforderlich werden.
              Ist keine gesetzliche Grundlage vorhanden, holen wir eine Einwilligung ein.
            </p>

            <Section title="1. Begriffsbestimmungen">
              <p>
                Die Datenschutzerklaerung beruht auf den Begrifflichkeiten der
                Datenschutz-Grundverordnung (DS-GVO). Nachfolgend werden die wesentlichen Begriffe
                erlaeutert:
              </p>
              <ul className="space-y-2 pl-4">
                <li><strong style={{ color: C.text }}>Personenbezogene Daten:</strong> Alle Informationen, die sich auf eine identifizierte oder identifizierbare natuerliche Person beziehen (Name, Adresse, E-Mail, Telefon etc.).</li>
                <li><strong style={{ color: C.text }}>Verarbeitung:</strong> Jeder Vorgang im Zusammenhang mit personenbezogenen Daten (Erheben, Speichern, Verwenden, Loeschen etc.).</li>
                <li><strong style={{ color: C.text }}>Einwilligung:</strong> Freiwillige, informierte und eindeutige Willensbekundung der betroffenen Person.</li>
                <li><strong style={{ color: C.text }}>Verantwortlicher:</strong> Die natuerliche oder juristische Person, die ueber Zwecke und Mittel der Verarbeitung entscheidet.</li>
              </ul>
            </Section>

            <Section title="2. Verantwortliche">
              <div
                className="rounded-xl p-6 border-l-4"
                style={{ background: C.creamDark, borderColor: C.pink }}
              >
                <p>Bettina Kahmann</p>
                <p>Auf dem grossen Kampe 29</p>
                <p>30900 Wedemark, Deutschland</p>
                <p className="mt-2">Tel.: 05130 960543</p>
                <p>
                  E-Mail:{" "}
                  <a href="mailto:Bettinakahmann@me.com" style={{ color: C.pink }}>
                    Bettinakahmann@me.com
                  </a>
                </p>
                <p>
                  Website:{" "}
                  <a href="https://www.bettina-kahmann.com" target="_blank" rel="noopener noreferrer" style={{ color: C.pink }}>
                    www.bettina-kahmann.com
                  </a>
                </p>
              </div>
            </Section>

            <Section title="3. Erfassung allgemeiner Daten">
              <p>
                Die Internetseite erfasst bei jedem Aufruf allgemeine Daten und Informationen, die
                in Logfiles gespeichert werden. Erfasst werden: verwendete Browsertypen und
                Versionen, Betriebssystem, Referrer-Seite, aufgerufene Unterseiten, Datum und
                Uhrzeit des Zugriffs, IP-Adresse sowie der Internet-Service-Provider.
              </p>
              <p>
                Diese Daten werden ausschliesslich zu statistischen Zwecken ausgewertet und nicht
                an Dritte weitergegeben. Sie werden getrennt von personenbezogenen Daten
                gespeichert.
              </p>
            </Section>

            <Section title="4. Registrierung">
              <p>
                Betroffene Personen koennen sich auf der Internetseite unter Angabe personenbezogener
                Daten registrieren. Die Daten werden ausschliesslich fuer interne Zwecke erhoben und
                gespeichert. Eine Weitergabe an Dritte erfolgt grundsaetzlich nicht.
              </p>
              <p>
                Registrierte Personen koennen ihre Daten jederzeit aendern oder loeschen lassen.
                Auf Anfrage erteilt Bettina Kahmann jederzeit Auskunft ueber gespeicherte Daten.
              </p>
            </Section>

            <Section title="5. Newsletter">
              <p>
                Der Newsletter kann nur mit gueltiger E-Mail-Adresse und expliziter Registrierung
                empfangen werden. Die Anmeldung erfolgt im Double-Opt-In-Verfahren. Die erhobenen
                Daten werden ausschliesslich fuer den Newsletterversand genutzt und nicht an Dritte
                weitergegeben.
              </p>
              <p>
                Das Abonnement kann jederzeit ueber den Abmeldelink im Newsletter oder direkt auf
                der Website gekuendigt werden.
              </p>
            </Section>

            <Section title="6. Kontaktformular">
              <p>
                Personenbezogene Daten, die per E-Mail oder Kontaktformular uebermittelt werden,
                werden automatisch gespeichert und ausschliesslich fuer die Bearbeitung der Anfrage
                genutzt. Eine Weitergabe an Dritte erfolgt nicht.
              </p>
            </Section>

            <Section title="7. Routinemaessige Loeschung">
              <p>
                Personenbezogene Daten werden nur so lange gespeichert, wie es zur Erreichung des
                Speicherungszwecks erforderlich ist oder gesetzliche Vorschriften dies verlangen.
                Nach Wegfall des Speicherungszwecks werden die Daten routinemaessig geloescht oder
                gesperrt.
              </p>
            </Section>

            <Section title="8. Rechte der betroffenen Person">
              <p>Jede betroffene Person hat folgende Rechte:</p>
              <ul className="space-y-2 pl-4">
                <li><strong style={{ color: C.text }}>Auskunftsrecht:</strong> Unentgeltliche Auskunft ueber gespeicherte Daten.</li>
                <li><strong style={{ color: C.text }}>Berichtigungsrecht:</strong> Unverzuegliche Berichtigung unrichtiger Daten.</li>
                <li><strong style={{ color: C.text }}>Loeschungsrecht:</strong> Loeschung der Daten, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</li>
                <li><strong style={{ color: C.text }}>Einschraenkungsrecht:</strong> Einschraenkung der Verarbeitung unter bestimmten Voraussetzungen.</li>
                <li><strong style={{ color: C.text }}>Widerspruchsrecht:</strong> Widerspruch gegen die Verarbeitung aus persoenlichen Gruenden.</li>
                <li><strong style={{ color: C.text }}>Beschwerderecht:</strong> Beschwerde bei einer Datenschutzaufsichtsbehoerde.</li>
              </ul>
              <p>
                Zur Ausuebung dieser Rechte wenden Sie sich direkt an:{" "}
                <a href="mailto:Bettinakahmann@me.com" style={{ color: C.pink }}>
                  Bettinakahmann@me.com
                </a>
              </p>
            </Section>

            <Section title="9. Datenschutz bei Bewerbungen">
              <p>
                Bewerbungsdaten werden ausschliesslich zur Bearbeitung des Bewerbungsverfahrens
                genutzt. Nach Abschluss des Verfahrens werden die Daten geloescht, sofern keine
                gesetzlichen Aufbewahrungspflichten bestehen.
              </p>
            </Section>

            <Section title="10. Rechtsgrundlage">
              <p>
                Soweit eine Einwilligung vorliegt, ist Art. 6 Abs. 1 lit. a DS-GVO die
                Rechtsgrundlage. Fuer die Erfuellung eines Vertrags gilt Art. 6 Abs. 1 lit. b
                DS-GVO. Zur Erfuellung rechtlicher Verpflichtungen gilt Art. 6 Abs. 1 lit. c
                DS-GVO. Fuer berechtigte Interessen gilt Art. 6 Abs. 1 lit. f DS-GVO.
              </p>
            </Section>

            <Section title="11. Aktualitaet">
              <p>
                Diese Datenschutzerklaerung ist aktuell gueltig. Durch die Weiterentwicklung der
                Website oder aufgrund geaenderter gesetzlicher Vorgaben kann eine Anpassung
                erforderlich werden.
              </p>
            </Section>
          </div>
        </div>
      </section>
    </Layout>
  );
}
