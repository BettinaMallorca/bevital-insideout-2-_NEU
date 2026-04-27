/**
 * beVital Studio – Mitgliederbereich
 * Dashboard, Kursübersicht, Video-Player
 */
import { useState, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import Layout from "@/components/Layout";

const C = {
  pink: "#993a74", pinkDark: "#7a2d5c",
  terraLight: "#C17B52", terraDark: "#8c492e",
  sage: "#7A9E7E", cream: "#FAF6F1", creamDark: "#f0e8de", creamDeep: "#e2d5c8",
  text: "#3d2b22", textMuted: "#8a6e62",
};

// ── Reveal-Animation ────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [visible, setVisible] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!ref) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.05 });
    obs.observe(ref);
    return () => obs.disconnect();
  }, [ref]);
  return (
    <div ref={setRef} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

// ── Vimeo Player ────────────────────────────────────────────────────
// Unterstuetzt:
//   - Reine ID: "1180851060"
//   - ID/Hash:  "1180851060/41a1f3f917"
//   - Vollstaendige URL: "https://vimeo.com/1180851060/41a1f3f917?share=copy..."
function parseVimeoSrc(input: string): string {
  // Vollstaendige URL
  if (input.startsWith("http")) {
    try {
      const url = new URL(input);
      // Pfad: /1180851060/41a1f3f917
      const parts = url.pathname.replace(/^\//, "").split("/");
      const id = parts[0];
      const hash = parts[1];
      if (hash) {
        return `https://player.vimeo.com/video/${id}?h=${hash}&title=0&byline=0&portrait=0&color=993a74`;
      }
      return `https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0&color=993a74`;
    } catch {
      return `https://player.vimeo.com/video/${input}?title=0&byline=0&portrait=0&color=993a74`;
    }
  }
  // ID/Hash Format: "1180851060/41a1f3f917"
  if (input.includes("/")) {
    const [id, hash] = input.split("/");
    return `https://player.vimeo.com/video/${id}?h=${hash}&title=0&byline=0&portrait=0&color=993a74`;
  }
  // Reine ID
  return `https://player.vimeo.com/video/${input}?title=0&byline=0&portrait=0&color=993a74`;
}

function VimeoPlayer({ vimeoId, title }: { vimeoId: string; title: string }) {
  const src = parseVimeoSrc(vimeoId);
  return (
    <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, background: "#8c492e", borderRadius: "12px", overflow: "hidden" }}>
      <iframe
        src={src}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title={title}
      />
    </div>
  );
}

// ── Login-Seite ─────────────────────────────────────────────────────
function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: C.creamDark }}>
      <div className="max-w-md w-full text-center">
        <Reveal>
          <div className="mb-8">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: C.pink }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h1 className="text-3xl font-normal mb-3" style={{ fontFamily: "var(--font-display)", color: C.text }}>
              Mitgliederbereich
            </h1>
            <p className="text-base font-light leading-relaxed" style={{ color: C.textMuted }}>
              Melde dich an, um auf deine Kurse zuzugreifen.
            </p>
          </div>
          <div className="rounded-2xl p-8 shadow-sm" style={{ background: "white" }}>
            <a
              href={getLoginUrl()}
              className="btn-pill btn-pink w-full block text-center mb-4"
            >
              Anmelden →
            </a>
            <p className="text-xs font-light" style={{ color: C.textMuted }}>
              Du hast noch keinen Zugang? Schreib mir an{" "}
              <a href="mailto:info@bettina-kahmann.com" style={{ color: C.pink }}>
                info@bettina-kahmann.com
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

// ── Kurs-Karte ──────────────────────────────────────────────────────
function CourseCard({ membership, onOpen }: { membership: any; onOpen: () => void }) {
  const course = membership.course;
  if (!course) return null;

  const categoryColor = course.category === "Regulation" ? C.sage
    : course.category === "Kraft" ? C.terraDark
    : course.category === "Präsenz" ? C.terraLight
    : C.pink;

  return (
    <Reveal>
      <div
        className="rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        style={{ background: "white", borderColor: C.creamDeep }}
        onClick={onOpen}
      >
        {/* Farbiger Header */}
        <div className="h-32 flex items-center justify-center relative" style={{ background: categoryColor }}>
          <div className="text-5xl">
            {course.title.includes("Blissful") ? "🌸"
              : course.title.includes("RESET") ? "🔄"
              : course.title.includes("Studio") || course.title.includes("Yoga") ? "🧘"
              : "📚"}
          </div>
          {membership.isActive && (
            <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold text-white"
              style={{ background: "rgba(255,255,255,0.25)" }}>
              Aktiv
            </div>
          )}
          {!membership.isActive && (
            <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold"
              style={{ background: "rgba(0,0,0,0.4)", color: "white" }}>
              Abgelaufen
            </div>
          )}
        </div>

        <div className="p-6">
          {course.category && (
            <div className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: categoryColor }}>
              {course.category}
            </div>
          )}
          <h3 className="text-xl font-normal mb-2" style={{ fontFamily: "var(--font-display)", color: C.text }}>
            {course.title}
          </h3>
          {course.description && (
            <p className="text-sm font-light leading-relaxed mb-4" style={{ color: C.textMuted }}>
              {course.description.substring(0, 100)}{course.description.length > 100 ? "…" : ""}
            </p>
          )}
          <div className="flex items-center justify-between">
            <div className="text-xs font-light" style={{ color: C.textMuted }}>
              {membership.isActive
                ? `Noch ${membership.daysLeft} Tage`
                : `Abgelaufen`}
            </div>
            {membership.isActive && (
              <button className="btn-pill text-xs px-4 py-2" style={{ background: categoryColor, color: "white" }}>
                Öffnen →
              </button>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// ── Kurs-Detail-Ansicht ─────────────────────────────────────────────
function CourseDetail({ courseId, courseTitle, onBack }: { courseId: number; courseTitle: string; onBack: () => void }) {
  const [activeLesson, setActiveLesson] = useState<any>(null);
  const lessonsQuery = trpc.studio.lessons.byCourse.useQuery({ courseId });
  const progressQuery = trpc.studio.lessons.myProgress.useQuery();
  const markComplete = trpc.studio.lessons.markComplete.useMutation({
    onSuccess: () => progressQuery.refetch(),
  });

  const completedIds = new Set(progressQuery.data?.map(p => p.lessonId) || []);

  return (
    <div className="min-h-screen" style={{ background: C.cream }}>
      {/* Header */}
      <div className="px-6 lg:px-20 py-8" style={{ background: C.terraDark }}>
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-light mb-4 opacity-70 hover:opacity-100 transition-opacity" style={{ color: "white" }}>
          ← Zurück zum Dashboard
        </button>
        <h1 className="text-2xl font-normal text-white" style={{ fontFamily: "var(--font-display)" }}>
          {courseTitle}
        </h1>
      </div>

      <div className="px-6 lg:px-20 py-10 max-w-6xl mx-auto">
        {/* Video-Player */}
        {activeLesson && (
          <div className="mb-10">
            <Reveal>
              <div className="rounded-2xl overflow-hidden shadow-lg mb-4">
                <VimeoPlayer vimeoId={activeLesson.vimeoId} title={activeLesson.title} />
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-normal mb-1" style={{ fontFamily: "var(--font-display)", color: C.text }}>
                    {activeLesson.title}
                  </h2>
                  {activeLesson.description && (
                    <p className="text-sm font-light" style={{ color: C.textMuted }}>{activeLesson.description}</p>
                  )}
                </div>
                {!completedIds.has(activeLesson.id) && (
                  <button
                    onClick={() => markComplete.mutate({ lessonId: activeLesson.id })}
                    className="btn-pill text-sm flex-shrink-0"
                    style={{ background: C.sage, color: "white" }}
                  >
                    ✓ Als gesehen markieren
                  </button>
                )}
                {completedIds.has(activeLesson.id) && (
                  <div className="px-4 py-2 rounded-full text-sm font-medium" style={{ background: `${C.sage}20`, color: C.sage }}>
                    ✓ Gesehen
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        )}

        {/* Lektionsliste */}
        <div>
          <h3 className="text-lg font-semibold mb-4" style={{ color: C.text }}>
            {lessonsQuery.data?.length || 0} Lektionen
          </h3>

          {lessonsQuery.isLoading && (
            <div className="text-center py-10" style={{ color: C.textMuted }}>Wird geladen…</div>
          )}

          {lessonsQuery.error && (
            <div className="rounded-xl p-6 text-center" style={{ background: `${C.terraLight}15`, color: C.terraDark }}>
              Kein Zugang zu diesem Kurs.
            </div>
          )}

          <div className="flex flex-col gap-3">
            {lessonsQuery.data?.map((lesson, i) => {
              const isDone = completedIds.has(lesson.id);
              const isActive = activeLesson?.id === lesson.id;
              return (
                <Reveal key={lesson.id} delay={i * 40}>
                  <div
                    className="rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-all duration-200 hover:shadow-md"
                    style={{
                      background: isActive ? `${C.pink}12` : "white",
                      border: `1px solid ${isActive ? C.pink : C.creamDeep}`,
                    }}
                    onClick={() => lesson.vimeoId && setActiveLesson(lesson)}
                  >
                    {/* Nummer / Häkchen */}
                    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold"
                      style={{ background: isDone ? C.sage : isActive ? C.pink : C.creamDark, color: isDone || isActive ? "white" : C.textMuted }}>
                      {isDone ? "✓" : i + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate" style={{ color: C.text }}>{lesson.title}</div>
                      {lesson.description && (
                        <div className="text-xs font-light truncate" style={{ color: C.textMuted }}>{lesson.description}</div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      {lesson.durationMin && (
                        <span className="text-xs font-light" style={{ color: C.textMuted }}>{lesson.durationMin} Min.</span>
                      )}
                      {lesson.vimeoId && (
                        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: isActive ? C.pink : C.creamDark }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill={isActive ? "white" : C.textMuted}>
                            <polygon points="5,3 19,12 5,21" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Haupt-Dashboard ─────────────────────────────────────────────────
function Dashboard({ user }: { user: any }) {
  const [activeCourse, setActiveCourse] = useState<{ id: number; title: string } | null>(null);
  const membershipsQuery = trpc.studio.memberships.mine.useQuery();
  const { logout } = useAuth();

  if (activeCourse) {
    return (
      <CourseDetail
        courseId={activeCourse.id}
        courseTitle={activeCourse.title}
        onBack={() => setActiveCourse(null)}
      />
    );
  }

  const activeMemberships = membershipsQuery.data?.filter(m => m.isActive) || [];
  const expiredMemberships = membershipsQuery.data?.filter(m => !m.isActive) || [];

  return (
    <div className="min-h-screen" style={{ background: C.cream }}>
      {/* Header */}
      <div className="px-6 lg:px-20 py-10" style={{ background: C.terraDark }}>
        <Reveal>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: `${C.terraLight}` }}>
                Mitgliederbereich
              </div>
              <h1 className="text-3xl font-normal text-white" style={{ fontFamily: "var(--font-display)" }}>
                Willkommen{user?.name ? `, ${user.name.split(" ")[0]}` : ""}
              </h1>
              <p className="text-sm font-light mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>
                {activeMemberships.length} aktiver {activeMemberships.length === 1 ? "Kurs" : "Kurse"}
              </p>
            </div>
            <button
              onClick={logout}
              className="text-sm font-light px-4 py-2 rounded-full border transition-all hover:bg-white/10"
              style={{ color: "rgba(255,255,255,0.7)", borderColor: "rgba(255,255,255,0.2)" }}
            >
              Abmelden
            </button>
          </div>
        </Reveal>
      </div>

      <div className="px-6 lg:px-20 py-10 max-w-6xl mx-auto">
        {membershipsQuery.isLoading && (
          <div className="text-center py-20" style={{ color: C.textMuted }}>Kurse werden geladen…</div>
        )}

        {!membershipsQuery.isLoading && membershipsQuery.data?.length === 0 && (
          <Reveal>
            <div className="text-center py-20 rounded-2xl" style={{ background: "white" }}>
              <div className="text-5xl mb-4">🧘</div>
              <h2 className="text-xl font-normal mb-2" style={{ fontFamily: "var(--font-display)", color: C.text }}>
                Noch kein Kurs freigeschaltet
              </h2>
              <p className="text-sm font-light mb-6" style={{ color: C.textMuted }}>
                Schreib Bettina direkt an, um einen Kurs zu buchen.
              </p>
              <a href="mailto:info@bettina-kahmann.com" className="btn-pill btn-pink">
                Kurs anfragen →
              </a>
            </div>
          </Reveal>
        )}

        {/* Aktive Kurse */}
        {activeMemberships.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-semibold mb-5" style={{ color: C.text }}>Deine Kurse</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {activeMemberships.map((m, i) => (
                <CourseCard
                  key={m.id}
                  membership={m}
                  onOpen={() => m.course && setActiveCourse({ id: m.course.id, title: m.course.title })}
                />
              ))}
            </div>
          </div>
        )}

        {/* Abgelaufene Kurse */}
        {expiredMemberships.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-5" style={{ color: C.textMuted }}>Abgelaufene Kurse</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 opacity-60">
              {expiredMemberships.map((m) => (
                <CourseCard key={m.id} membership={m} onOpen={() => {}} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Haupt-Export ────────────────────────────────────────────────────
export default function Studio() {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: C.cream }}>
        <div className="text-center">
          <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin mx-auto mb-4"
            style={{ borderColor: C.pink, borderTopColor: "transparent" }} />
          <p className="text-sm font-light" style={{ color: C.textMuted }}>Wird geladen…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <Dashboard user={user} />;
}
