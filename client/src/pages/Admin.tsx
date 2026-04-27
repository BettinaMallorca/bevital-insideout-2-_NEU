/**
 * beVital Admin – Kurse, Lektionen und Mitgliedschaften verwalten
 */
import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";

const C = {
  pink: "#993a74", pinkDark: "#7a2d5c",
  terraLight: "#C17B52", terraDark: "#8c492e",
  sage: "#7A9E7E", cream: "#FAF6F1", creamDark: "#f0e8de", creamDeep: "#e2d5c8",
  text: "#3d2b22", textMuted: "#8a6e62",
};

function Badge({ active }: { active: boolean }) {
  return (
    <span className="px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: active ? `${C.sage}20` : `${C.terraLight}20`, color: active ? C.sage : C.terraLight }}>
      {active ? "Aktiv" : "Abgelaufen"}
    </span>
  );
}

// ── Tab: Mitgliedschaften ───────────────────────────────────────────
function MembershipsTab() {
  const membershipsQuery = trpc.studio.memberships.listAll.useQuery();
  const usersQuery = trpc.studio.users.list.useQuery();
  const coursesQuery = trpc.studio.courses.listAll.useQuery();
  const createMutation = trpc.studio.memberships.create.useMutation({ onSuccess: () => membershipsQuery.refetch() });
  const extendMutation = trpc.studio.memberships.extend.useMutation({ onSuccess: () => membershipsQuery.refetch() });
  const toggleMutation = trpc.studio.memberships.toggleRevoke.useMutation({ onSuccess: () => membershipsQuery.refetch() });

  const [form, setForm] = useState({ userId: 0, courseId: 0, accessDays: 60, note: "" });
  const [extendId, setExtendId] = useState<number | null>(null);
  const [extendDays, setExtendDays] = useState(30);

  return (
    <div>
      {/* Neue Mitgliedschaft */}
      <div className="rounded-2xl p-6 mb-8" style={{ background: "white", border: `1px solid ${C.creamDeep}` }}>
        <h3 className="font-semibold mb-4" style={{ color: C.text }}>Neue Mitgliedschaft vergeben</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider block mb-1" style={{ color: C.textMuted }}>Kundin</label>
            <select
              className="w-full rounded-lg px-3 py-2 text-sm border"
              style={{ borderColor: C.creamDeep, color: C.text }}
              value={form.userId}
              onChange={e => setForm(f => ({ ...f, userId: Number(e.target.value) }))}
            >
              <option value={0}>Kundin wählen…</option>
              {usersQuery.data?.map(u => (
                <option key={u.id} value={u.id}>{u.name || u.email || `User #${u.id}`}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider block mb-1" style={{ color: C.textMuted }}>Kurs</label>
            <select
              className="w-full rounded-lg px-3 py-2 text-sm border"
              style={{ borderColor: C.creamDeep, color: C.text }}
              value={form.courseId}
              onChange={e => setForm(f => ({ ...f, courseId: Number(e.target.value) }))}
            >
              <option value={0}>Kurs wählen…</option>
              {coursesQuery.data?.map(c => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider block mb-1" style={{ color: C.textMuted }}>Zugangsdauer (Tage)</label>
            <input
              type="number"
              min={1}
              className="w-full rounded-lg px-3 py-2 text-sm border"
              style={{ borderColor: C.creamDeep, color: C.text }}
              value={form.accessDays}
              onChange={e => setForm(f => ({ ...f, accessDays: Number(e.target.value) }))}
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider block mb-1" style={{ color: C.textMuted }}>Notiz (optional)</label>
            <input
              type="text"
              placeholder="z.B. 2 Monate Mitgliedschaft"
              className="w-full rounded-lg px-3 py-2 text-sm border"
              style={{ borderColor: C.creamDeep, color: C.text }}
              value={form.note}
              onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
            />
          </div>
        </div>
        <button
          onClick={() => {
            if (!form.userId || !form.courseId) return alert("Bitte Kundin und Kurs wählen");
            createMutation.mutate(form);
            setForm({ userId: 0, courseId: 0, accessDays: 60, note: "" });
          }}
          className="btn-pill text-sm"
          style={{ background: C.pink, color: "white" }}
          disabled={createMutation.isPending}
        >
          {createMutation.isPending ? "Wird gespeichert…" : "Zugang vergeben →"}
        </button>
      </div>

      {/* Mitgliedschafts-Tabelle */}
      <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${C.creamDeep}` }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: C.creamDark }}>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider" style={{ color: C.textMuted }}>Kundin</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider" style={{ color: C.textMuted }}>Kurs</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider" style={{ color: C.textMuted }}>Status</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider" style={{ color: C.textMuted }}>Läuft ab</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider" style={{ color: C.textMuted }}>Notiz</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider" style={{ color: C.textMuted }}>Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {membershipsQuery.isLoading && (
                <tr><td colSpan={6} className="px-4 py-8 text-center" style={{ color: C.textMuted }}>Wird geladen…</td></tr>
              )}
              {membershipsQuery.data?.map((m, i) => (
                <tr key={m.id} style={{ background: i % 2 === 0 ? "white" : C.cream, borderTop: `1px solid ${C.creamDeep}` }}>
                  <td className="px-4 py-3 font-medium" style={{ color: C.text }}>
                    {m.user?.name || m.user?.email || `User #${m.userId}`}
                  </td>
                  <td className="px-4 py-3" style={{ color: C.text }}>{m.course?.title || `Kurs #${(m as any).courseId}`}</td>
                  <td className="px-4 py-3"><Badge active={m.isActive} /></td>
                  <td className="px-4 py-3 text-xs" style={{ color: C.textMuted }}>
                    {new Date(m.expiresAt).toLocaleDateString("de-DE")}
                    {m.isActive && <span className="ml-1" style={{ color: C.sage }}>({m.daysLeft}d)</span>}
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: C.textMuted }}>{m.note || "–"}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Verlängern */}
                      {extendId === m.id ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            min={1}
                            value={extendDays}
                            onChange={e => setExtendDays(Number(e.target.value))}
                            className="w-16 rounded px-2 py-1 text-xs border"
                            style={{ borderColor: C.creamDeep }}
                          />
                          <button
                            onClick={() => { extendMutation.mutate({ id: m.id, additionalDays: extendDays }); setExtendId(null); }}
                            className="text-xs px-2 py-1 rounded-full"
                            style={{ background: C.sage, color: "white" }}
                          >+{extendDays}d</button>
                          <button onClick={() => setExtendId(null)} className="text-xs px-2 py-1 rounded-full" style={{ background: C.creamDeep, color: C.textMuted }}>✕</button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setExtendId(m.id)}
                          className="text-xs px-3 py-1 rounded-full"
                          style={{ background: `${C.sage}20`, color: C.sage }}
                        >Verlängern</button>
                      )}
                      {/* Sperren/Entsperren */}
                      <button
                        onClick={() => toggleMutation.mutate({ id: m.id, revoke: !m.isRevoked })}
                        className="text-xs px-3 py-1 rounded-full"
                        style={{ background: m.isRevoked ? `${C.sage}20` : `${C.terraLight}20`, color: m.isRevoked ? C.sage : C.terraLight }}
                      >
                        {m.isRevoked ? "Entsperren" : "Sperren"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Tab: Kurse & Lektionen ──────────────────────────────────────────
function CoursesTab() {
  const coursesQuery = trpc.studio.courses.listAll.useQuery();
  const createCourse = trpc.studio.courses.create.useMutation({ onSuccess: () => coursesQuery.refetch() });
  const updateCourse = trpc.studio.courses.update.useMutation({ onSuccess: () => coursesQuery.refetch() });
  const deleteCourse = trpc.studio.courses.delete.useMutation({ onSuccess: () => coursesQuery.refetch() });

  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const lessonsQuery = trpc.studio.lessons.byCourseAdmin.useQuery(
    { courseId: selectedCourse! },
    { enabled: !!selectedCourse }
  );
  const createLesson = trpc.studio.lessons.create.useMutation({ onSuccess: () => lessonsQuery.refetch() });
  const updateLesson = trpc.studio.lessons.update.useMutation({ onSuccess: () => lessonsQuery.refetch() });
  const deleteLesson = trpc.studio.lessons.delete.useMutation({ onSuccess: () => lessonsQuery.refetch() });

  const [courseForm, setCourseForm] = useState({ title: "", description: "", category: "", sortOrder: 0, isPublished: true });
  const [lessonForm, setLessonForm] = useState({ title: "", description: "", vimeoId: "", durationMin: 0, sortOrder: 0 });
  const [editingLesson, setEditingLesson] = useState<any>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Linke Spalte: Kurse */}
      <div>
        <h3 className="font-semibold mb-4" style={{ color: C.text }}>Kurse</h3>

        {/* Neuer Kurs */}
        <div className="rounded-2xl p-5 mb-5" style={{ background: "white", border: `1px solid ${C.creamDeep}` }}>
          <h4 className="text-sm font-semibold mb-3" style={{ color: C.textMuted }}>Neuer Kurs</h4>
          <div className="flex flex-col gap-2 mb-3">
            <input type="text" placeholder="Titel" className="rounded-lg px-3 py-2 text-sm border" style={{ borderColor: C.creamDeep }}
              value={courseForm.title} onChange={e => setCourseForm(f => ({ ...f, title: e.target.value }))} />
            <input type="text" placeholder="Kategorie (z.B. Regulation)" className="rounded-lg px-3 py-2 text-sm border" style={{ borderColor: C.creamDeep }}
              value={courseForm.category} onChange={e => setCourseForm(f => ({ ...f, category: e.target.value }))} />
            <textarea placeholder="Beschreibung" rows={2} className="rounded-lg px-3 py-2 text-sm border resize-none" style={{ borderColor: C.creamDeep }}
              value={courseForm.description} onChange={e => setCourseForm(f => ({ ...f, description: e.target.value }))} />
          </div>
          <button
            onClick={() => { createCourse.mutate(courseForm); setCourseForm({ title: "", description: "", category: "", sortOrder: 0, isPublished: true }); }}
            className="btn-pill text-sm" style={{ background: C.pink, color: "white" }}
          >Kurs erstellen →</button>
        </div>

        {/* Kursliste */}
        <div className="flex flex-col gap-3">
          {coursesQuery.data?.map(c => (
            <div key={c.id}
              className="rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all"
              style={{ background: selectedCourse === c.id ? `${C.pink}12` : "white", border: `1px solid ${selectedCourse === c.id ? C.pink : C.creamDeep}` }}
              onClick={() => setSelectedCourse(c.id)}
            >
              <div>
                <div className="font-medium text-sm" style={{ color: C.text }}>{c.title}</div>
                <div className="text-xs" style={{ color: C.textMuted }}>{c.category || "Keine Kategorie"} · {c.isPublished ? "Veröffentlicht" : "Entwurf"}</div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={e => { e.stopPropagation(); updateCourse.mutate({ id: c.id, isPublished: !c.isPublished }); }}
                  className="text-xs px-2 py-1 rounded-full"
                  style={{ background: c.isPublished ? `${C.sage}20` : `${C.terraLight}20`, color: c.isPublished ? C.sage : C.terraLight }}
                >{c.isPublished ? "Aktiv" : "Entwurf"}</button>
                <button
                  onClick={e => { e.stopPropagation(); if (confirm("Kurs löschen?")) deleteCourse.mutate({ id: c.id }); }}
                  className="text-xs px-2 py-1 rounded-full"
                  style={{ background: `${C.terraLight}20`, color: C.terraLight }}
                >✕</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rechte Spalte: Lektionen */}
      <div>
        <h3 className="font-semibold mb-4" style={{ color: C.text }}>
          {selectedCourse ? `Lektionen: ${coursesQuery.data?.find(c => c.id === selectedCourse)?.title}` : "Kurs wählen"}
        </h3>

        {selectedCourse && (
          <>
            {/* Neue Lektion */}
            <div className="rounded-2xl p-5 mb-5" style={{ background: "white", border: `1px solid ${C.creamDeep}` }}>
              <h4 className="text-sm font-semibold mb-3" style={{ color: C.textMuted }}>
                {editingLesson ? "Lektion bearbeiten" : "Neue Lektion"}
              </h4>
              <div className="flex flex-col gap-2 mb-3">
                <input type="text" placeholder="Titel" className="rounded-lg px-3 py-2 text-sm border" style={{ borderColor: C.creamDeep }}
                  value={editingLesson ? editingLesson.title : lessonForm.title}
                  onChange={e => editingLesson ? setEditingLesson((l: any) => ({ ...l, title: e.target.value })) : setLessonForm(f => ({ ...f, title: e.target.value }))} />
                <input type="text" placeholder="Vimeo-Link (z.B. https://vimeo.com/123456789/abc) oder ID" className="rounded-lg px-3 py-2 text-sm border" style={{ borderColor: C.creamDeep }}
                  value={editingLesson ? editingLesson.vimeoId || "" : lessonForm.vimeoId}
                  onChange={e => editingLesson ? setEditingLesson((l: any) => ({ ...l, vimeoId: e.target.value })) : setLessonForm(f => ({ ...f, vimeoId: e.target.value }))} />
                <div className="flex gap-2">
                  <input type="number" placeholder="Dauer (Min.)" className="rounded-lg px-3 py-2 text-sm border flex-1" style={{ borderColor: C.creamDeep }}
                    value={editingLesson ? editingLesson.durationMin || "" : lessonForm.durationMin || ""}
                    onChange={e => editingLesson ? setEditingLesson((l: any) => ({ ...l, durationMin: Number(e.target.value) })) : setLessonForm(f => ({ ...f, durationMin: Number(e.target.value) }))} />
                  <input type="number" placeholder="Reihenfolge" className="rounded-lg px-3 py-2 text-sm border flex-1" style={{ borderColor: C.creamDeep }}
                    value={editingLesson ? editingLesson.sortOrder : lessonForm.sortOrder}
                    onChange={e => editingLesson ? setEditingLesson((l: any) => ({ ...l, sortOrder: Number(e.target.value) })) : setLessonForm(f => ({ ...f, sortOrder: Number(e.target.value) }))} />
                </div>
                <textarea placeholder="Beschreibung (optional)" rows={2} className="rounded-lg px-3 py-2 text-sm border resize-none" style={{ borderColor: C.creamDeep }}
                  value={editingLesson ? editingLesson.description || "" : lessonForm.description || ""}
                  onChange={e => editingLesson ? setEditingLesson((l: any) => ({ ...l, description: e.target.value })) : setLessonForm(f => ({ ...f, description: e.target.value }))} />
              </div>
              <div className="flex gap-2">
                {editingLesson ? (
                  <>
                    <button
                      onClick={() => { updateLesson.mutate({ id: editingLesson.id, ...editingLesson }); setEditingLesson(null); }}
                      className="btn-pill text-sm" style={{ background: C.sage, color: "white" }}
                    >Speichern →</button>
                    <button onClick={() => setEditingLesson(null)} className="btn-pill text-sm" style={{ background: C.creamDark, color: C.textMuted }}>Abbrechen</button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      createLesson.mutate({ ...lessonForm, courseId: selectedCourse });
                      setLessonForm({ title: "", description: "", vimeoId: "", durationMin: 0, sortOrder: 0 });
                    }}
                    className="btn-pill text-sm" style={{ background: C.pink, color: "white" }}
                  >Lektion hinzufügen →</button>
                )}
              </div>
            </div>

            {/* Lektionsliste */}
            <div className="flex flex-col gap-2">
              {lessonsQuery.data?.map((l, i) => (
                <div key={l.id} className="rounded-xl p-3 flex items-center gap-3"
                  style={{ background: "white", border: `1px solid ${C.creamDeep}` }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                    style={{ background: C.creamDark, color: C.textMuted }}>{i + 1}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate" style={{ color: C.text }}>{l.title}</div>
                    <div className="text-xs" style={{ color: C.textMuted }}>
                      {l.vimeoId ? `Vimeo: ${l.vimeoId}` : "Kein Video"} {l.durationMin ? `· ${l.durationMin} Min.` : ""}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => setEditingLesson(l)} className="text-xs px-2 py-1 rounded-full"
                      style={{ background: `${C.sage}20`, color: C.sage }}>✏</button>
                    <button onClick={() => { if (confirm("Lektion löschen?")) deleteLesson.mutate({ id: l.id }); }}
                      className="text-xs px-2 py-1 rounded-full" style={{ background: `${C.terraLight}20`, color: C.terraLight }}>✕</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Tab: Kundinnen ──────────────────────────────────────────────────
function UsersTab() {
  const usersQuery = trpc.studio.users.list.useQuery();
  const setRole = trpc.studio.users.setRole.useMutation({ onSuccess: () => usersQuery.refetch() });

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${C.creamDeep}` }}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: C.creamDark }}>
              <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider" style={{ color: C.textMuted }}>Name</th>
              <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider" style={{ color: C.textMuted }}>E-Mail</th>
              <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider" style={{ color: C.textMuted }}>Rolle</th>
              <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider" style={{ color: C.textMuted }}>Registriert</th>
              <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider" style={{ color: C.textMuted }}>Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {usersQuery.isLoading && (
              <tr><td colSpan={5} className="px-4 py-8 text-center" style={{ color: C.textMuted }}>Wird geladen…</td></tr>
            )}
            {usersQuery.data?.map((u, i) => (
              <tr key={u.id} style={{ background: i % 2 === 0 ? "white" : C.cream, borderTop: `1px solid ${C.creamDeep}` }}>
                <td className="px-4 py-3 font-medium" style={{ color: C.text }}>{u.name || "–"}</td>
                <td className="px-4 py-3 text-xs" style={{ color: C.textMuted }}>{u.email || "–"}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold"
                    style={{ background: u.role === "admin" ? `${C.pink}20` : `${C.sage}20`, color: u.role === "admin" ? C.pink : C.sage }}>
                    {u.role === "admin" ? "Admin" : "Mitglied"}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs" style={{ color: C.textMuted }}>
                  {new Date(u.createdAt).toLocaleDateString("de-DE")}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => setRole.mutate({ userId: u.id, role: u.role === "admin" ? "user" : "admin" })}
                    className="text-xs px-3 py-1 rounded-full"
                    style={{ background: `${C.terraLight}20`, color: C.terraLight }}
                  >
                    {u.role === "admin" ? "Zu Mitglied" : "Zu Admin"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Haupt-Export ────────────────────────────────────────────────────
export default function Admin() {
  const { user, loading, isAuthenticated } = useAuth();
  const [tab, setTab] = useState<"memberships" | "courses" | "users">("memberships");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: C.cream }}>
        <div className="w-10 h-10 rounded-full border-2 animate-spin mx-auto"
          style={{ borderColor: C.pink, borderTopColor: "transparent" }} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: C.creamDark }}>
        <div className="text-center">
          <p className="mb-4" style={{ color: C.textMuted }}>Bitte anmelden</p>
          <a href={getLoginUrl()} className="btn-pill btn-pink">Anmelden →</a>
        </div>
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: C.creamDark }}>
        <div className="text-center">
          <p className="text-lg font-normal mb-2" style={{ color: C.text }}>Kein Zugriff</p>
          <p className="text-sm" style={{ color: C.textMuted }}>Dieser Bereich ist nur für Admins.</p>
          <a href="/studio" className="btn-pill btn-pink mt-4 inline-block">Zum Studio →</a>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "memberships" as const, label: "Mitgliedschaften" },
    { id: "courses" as const, label: "Kurse & Lektionen" },
    { id: "users" as const, label: "Kundinnen" },
  ];

  return (
    <div className="min-h-screen" style={{ background: C.cream }}>
      {/* Header */}
      <div className="px-6 lg:px-20 py-8" style={{ background: C.terraDark }}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: C.terraLight }}>Admin</div>
            <h1 className="text-2xl font-normal text-white" style={{ fontFamily: "var(--font-display)" }}>
              beVital Studio verwalten
            </h1>
          </div>
          <a href="/studio" className="text-sm font-light px-4 py-2 rounded-full border"
            style={{ color: "rgba(255,255,255,0.7)", borderColor: "rgba(255,255,255,0.2)" }}>
            ← Zum Studio
          </a>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-6 flex-wrap">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                background: tab === t.id ? "white" : "rgba(255,255,255,0.15)",
                color: tab === t.id ? C.terraDark : "rgba(255,255,255,0.8)",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 lg:px-20 py-10 max-w-7xl mx-auto">
        {tab === "memberships" && <MembershipsTab />}
        {tab === "courses" && <CoursesTab />}
        {tab === "users" && <UsersTab />}
      </div>
    </div>
  );
}
