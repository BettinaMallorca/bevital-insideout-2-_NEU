import Layout from "@/components/Layout";
import { useSEO } from "@/hooks/useSEO";

const C = {
  pink:       "#993A74",
  terraLight: "#C17B52",
  terraDark:  "#8C492E",
  sage:       "#7A9E7E",
  cream:      "#FAF6F1",
  creamDark:  "#F0E8DE",
  creamDeep:  "#e2d5c8",
  text:       "#2a1f1a",
  textMuted:  "#6b5a52",
};

export default function Impressum() {
  useSEO({
    title: "Impressum | beVital InsideOut – Bettina Kahmann",
    description: "Impressum von beVital InsideOut – Bettina Kahmann, Yogalehrerin und Präventionsexpertin aus der Wedemark.",
  });
  return (
    <Layout>
      <section style={{ background: C.cream, minHeight: "100vh" }} className="px-6 lg:px-20 py-24">
        <div className="max-w-3xl mx-auto">
          {/* Eyebrow */}
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
            Impressum
          </h1>

          <div
            className="space-y-8 text-sm font-light leading-relaxed"
            style={{ color: C.textMuted }}
          >
            <div>
              <h2
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: C.terraLight }}
              >
                Verantwortlich fuer die Website
              </h2>
              <p>Bettina Kahmann</p>
              <p>Auf dem grossen Kampe 29</p>
              <p>30900 Wedemark</p>
              <p className="mt-2">Tel: +49 (0) 5130 960 543</p>
              <p>
                Internet:{" "}
                <a
                  href="https://www.bettina-kahmann.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: C.pink }}
                >
                  www.bettina-kahmann.com
                </a>
              </p>
            </div>

            <div>
              <h2
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: C.terraLight }}
              >
                Steuerliche Angaben
              </h2>
              <p>Finanzamt Burgdorf</p>
              <p>Steuer-Nr. 16/121/18345</p>
              <p className="mt-2">
                Umsatzsteuer-Identifikationsnummer gemaess &sect;27 a Umsatzsteuergesetz:
                DE323625068
              </p>
            </div>

            <div>
              <h2
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: C.terraLight }}
              >
                Inhalt der Internetpraesenz
              </h2>
              <p>
                Bettina Kahmann uebernimmt keinerlei Gewaehr fuer die Aktualitaet, Korrektheit,
                Vollstaendigkeit oder Qualitaet der bereitgestellten Informationen.
                Haftungsansprueche gegen Bettina Kahmann, welche sich auf Schaeden materieller oder
                ideeller Art beziehen, die durch die Nutzung oder Nichtnutzung der dargebotenen
                Informationen bzw. durch die Nutzung fehlerhafter und unvollstaendiger Informationen
                verursacht wurden, sind grundsaetzlich ausgeschlossen, sofern von Bettina Kahmann
                kein nachweislich vorsaetzliches oder grob fahrlassiges Verschulden vorliegt. Alle
                Angebote sind freibleibend und unverbindlich. Bettina Kahmann behaelt sich
                ausdruecklich vor, Teile der Seiten oder das gesamte Angebot ohne gesonderte
                Ankuendigung zu veraendern, zu ergaenzen, zu loeschen oder die Veroeffentlichung
                zeitweise oder endgueltig einzustellen.
              </p>
            </div>

            <div>
              <h2
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: C.terraLight }}
              >
                Externe Links
              </h2>
              <p>
                Bettina Kahmann uebernimmt keine Haftung fuer die Inhalte und die Nutzung ihrer
                Links auf externe Websites. Fuer die Inhalte der verlinkten Seiten sind
                ausschliesslich deren Betreiber verantwortlich. Dies gilt auch fuer den Fall, dass
                beim Aufenthalt auf externe Websites eingekauft wird und/oder Dienstleistungen und
                Produkte bezogen werden. Regressansprueche bestehen nur gegenueber dem fraglichen
                Anbieter.
              </p>
              <p className="mt-3">
                Alle Texte und Bilder fremder Quellen hat Bettina Kahmann jeweils nach bestem
                Wissen gekennzeichnet. Nicht immer waren die Quellen bzw. deren Autoren klar
                ersichtlich. Wenn die Quellen dennoch genutzt wurden, dienen sie ausdruecklich der
                zusaetzlichen Information und werden von Bettina Kahmann nicht in Besitz genommen.
                Die Rechte der UrheberInnen sollen unberuehrt bleiben.
              </p>
            </div>

            <div>
              <h2
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: C.terraLight }}
              >
                Speicherung von Zugriffsdaten
              </h2>
              <p>
                Bei jeder Anforderung einer Datei aus dieser Internetpraesenz werden Zugriffsdaten
                gespeichert. Jeder Datensatz besteht aus: der Seite, von der aus die Datei
                angefordert wurde, dem Namen der Datei, dem Datum und Uhrzeit der Anforderung, der
                uebertragenen Datenmenge, dem Zugriffsstatus sowie einer Beschreibung des
                verwendeten Webbrowsers. Die gespeicherten Daten werden ausschliesslich zu
                statistischen Zwecken ausgewertet; eine Weitergabe an Dritte findet nicht statt.
              </p>
            </div>

            <div>
              <h2
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: C.terraLight }}
              >
                Personenbezogene Daten
              </h2>
              <p>
                Innerhalb dieser Internetpraesenz besteht die Moeglichkeit, personenbezogene Daten
                zu uebermitteln. Hinsichtlich Ihrer personenbezogenen Daten weisen wir darauf hin,
                dass diese nach Massgabe der anwendbaren Datenschutzbestimmungen gespeichert
                und/oder uebertragen werden. Im uebrigen werden personenbezogene Daten absolut
                vertraulich behandelt und nur mit gesonderter Zustimmung an Dritte weitergeleitet.
              </p>
              <p className="mt-3">
                Wir weisen Sie ausdruecklich darauf hin, dass der Datenschutz in offenen Netzen wie
                dem Internet nach dem derzeitigen Stand der Technik nicht vollstaendig gewaehrleistet
                werden kann.
              </p>
            </div>

            <div>
              <h2
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: C.terraLight }}
              >
                Urheber- und Kennzeichenrecht
              </h2>
              <p>
                Bettina Kahmann ist bestrebt, die Urheberrechte der verwendeten Grafiken,
                Tondokumente, Videosequenzen und Texte zu beachten. Alle innerhalb des
                Internetangebotes genannten und ggf. durch Dritte geschuetzten Marken- und
                Warenzeichen unterliegen uneingeschraenkt den Bestimmungen des jeweils gueltigen
                Kennzeichenrechts. Das Copyright fuer veroeffentlichte, von Bettina Kahmann selbst
                erstellte Objekte bleibt allein bei Bettina Kahmann. Eine Vervielfaeltigung oder
                Verwendung ohne ausdrueckliche Zustimmung ist nicht gestattet.
              </p>
            </div>

            <div>
              <h2
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: C.terraLight }}
              >
                Rechtswirksamkeit
              </h2>
              <p>
                Sofern Teile oder einzelne Formulierungen dieses Textes der geltenden Rechtslage
                nicht, nicht mehr oder nicht vollstaendig entsprechen sollten, bleiben die uebrigen
                Teile in ihrem Inhalt und ihrer Gueltigkeit davon unberuehrt.
              </p>
            </div>

            <div
              className="rounded-xl p-6 border-l-4"
              style={{ background: C.creamDark, borderColor: C.pink }}
            >
              <h2
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: C.terraLight }}
              >
                Kontakt
              </h2>
              <p>Bettina Kahmann</p>
              <p>Auf dem grossen Kampe 29</p>
              <p>30900 Wedemark</p>
              <p className="mt-2">Tel.: 05130 / 960 543</p>
              <p>
                E-Mail:{" "}
                <a href="mailto:bettinakahmann@me.com" style={{ color: C.pink }}>
                  bettinakahmann@me.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
