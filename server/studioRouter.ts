/**
 * beVital InsideOut – Studio Router
 * Kurse, Lektionen, Mitgliedschaften, Admin-Verwaltung
 */
import { z } from "zod";
import { eq, and, desc, asc } from "drizzle-orm";
import { getDb } from "./db";
import { courses, lessons, memberships, lessonProgress, users } from "../drizzle/schema";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";

// ── Hilfsfunktion: Prüfe ob User aktive Mitgliedschaft für einen Kurs hat ──
async function hasActiveMembership(userId: number, courseId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  const now = new Date();
  const membership = await db
    .select()
    .from(memberships)
    .where(
      and(
        eq(memberships.userId, userId),
        eq(memberships.courseId as any, courseId)
      )
    )
    .limit(1);
  if (!membership.length) return false;
  const m = membership[0];
  if (m.isRevoked) return false;
  if (new Date(m.expiresAt) < now) return false;
  return true;
}

export const studioRouter = router({
  // ── Öffentlich: Kursliste (nur veröffentlichte) ──────────────────
  courses: router({
    list: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(courses)
        .where(eq(courses.isPublished, true))
        .orderBy(asc(courses.sortOrder));
    }),

    // Alle Kurse inkl. unveröffentlichte (nur Admin)
    listAll: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") throw new Error("Kein Zugriff");
      const db = await getDb();
      if (!db) return [];
      return db.select().from(courses).orderBy(asc(courses.sortOrder));
    }),

    // Kurs erstellen (Admin)
    create: protectedProcedure
      .input(z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        category: z.string().optional(),
        thumbnailUrl: z.string().optional(),
        sortOrder: z.number().default(0),
        isPublished: z.boolean().default(false),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new Error("Kein Zugriff");
        const db = await getDb();
        if (!db) throw new Error("Datenbank nicht verfügbar");
        await db.insert(courses).values(input);
        return { success: true };
      }),

    // Kurs aktualisieren (Admin)
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().min(1).optional(),
        description: z.string().optional(),
        category: z.string().optional(),
        thumbnailUrl: z.string().optional(),
        sortOrder: z.number().optional(),
        isPublished: z.boolean().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new Error("Kein Zugriff");
        const db = await getDb();
        if (!db) throw new Error("Datenbank nicht verfügbar");
        const { id, ...data } = input;
        await db.update(courses).set(data).where(eq(courses.id, id));
        return { success: true };
      }),

    // Kurs löschen (Admin)
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new Error("Kein Zugriff");
        const db = await getDb();
        if (!db) throw new Error("Datenbank nicht verfügbar");
        await db.delete(courses).where(eq(courses.id, input.id));
        return { success: true };
      }),
  }),

  // ── Lektionen ────────────────────────────────────────────────────
  lessons: router({
    // Lektionen eines Kurses (nur wenn Zugang vorhanden)
    byCourse: protectedProcedure
      .input(z.object({ courseId: z.number() }))
      .query(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) return [];
        // Admin sieht alles
        if (ctx.user.role !== "admin") {
          const access = await hasActiveMembership(ctx.user.id, input.courseId);
          if (!access) throw new Error("Kein Zugang zu diesem Kurs");
        }
        return db.select().from(lessons)
          .where(eq(lessons.courseId, input.courseId))
          .orderBy(asc(lessons.sortOrder));
      }),

    // Alle Lektionen eines Kurses (Admin)
    byCourseAdmin: protectedProcedure
      .input(z.object({ courseId: z.number() }))
      .query(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new Error("Kein Zugriff");
        const db = await getDb();
        if (!db) return [];
        return db.select().from(lessons)
          .where(eq(lessons.courseId, input.courseId))
          .orderBy(asc(lessons.sortOrder));
      }),

    // Lektion erstellen (Admin)
    create: protectedProcedure
      .input(z.object({
        courseId: z.number(),
        title: z.string().min(1),
        description: z.string().optional(),
        vimeoId: z.string().optional(),
        durationMin: z.number().optional(),
        sortOrder: z.number().default(0),
        isPublished: z.boolean().default(true),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new Error("Kein Zugriff");
        const db = await getDb();
        if (!db) throw new Error("Datenbank nicht verfügbar");
        await db.insert(lessons).values(input);
        return { success: true };
      }),

    // Lektion aktualisieren (Admin)
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        vimeoId: z.string().optional(),
        durationMin: z.number().optional(),
        sortOrder: z.number().optional(),
        isPublished: z.boolean().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new Error("Kein Zugriff");
        const db = await getDb();
        if (!db) throw new Error("Datenbank nicht verfügbar");
        const { id, ...data } = input;
        await db.update(lessons).set(data).where(eq(lessons.id, id));
        return { success: true };
      }),

    // Lektion löschen (Admin)
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new Error("Kein Zugriff");
        const db = await getDb();
        if (!db) throw new Error("Datenbank nicht verfügbar");
        await db.delete(lessons).where(eq(lessons.id, input.id));
        return { success: true };
      }),

    // Lektion als gesehen markieren
    markComplete: protectedProcedure
      .input(z.object({ lessonId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new Error("Datenbank nicht verfügbar");
        // Prüfen ob schon vorhanden
        const existing = await db.select().from(lessonProgress)
          .where(and(
            eq(lessonProgress.userId, ctx.user.id),
            eq(lessonProgress.lessonId, input.lessonId)
          )).limit(1);
        if (!existing.length) {
          await db.insert(lessonProgress).values({
            userId: ctx.user.id,
            lessonId: input.lessonId,
          });
        }
        return { success: true };
      }),

    // Fortschritt des Users
    myProgress: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(lessonProgress)
        .where(eq(lessonProgress.userId, ctx.user.id));
    }),
  }),

  // ── Mitgliedschaften ─────────────────────────────────────────────
  memberships: router({
    // Meine Mitgliedschaften (aktive Kurse)
    mine: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return [];
      const now = new Date();
      const myMemberships = await db.select().from(memberships)
        .where(eq(memberships.userId, ctx.user.id));

      // Kurse dazu laden
      const result = [];
      for (const m of myMemberships) {
        const course = await db.select().from(courses)
          .where(eq(courses.id, (m as any).courseId)).limit(1);
        const isActive = !m.isRevoked && new Date(m.expiresAt) > now;
        result.push({
          ...m,
          course: course[0] || null,
          isActive,
          daysLeft: isActive
            ? Math.ceil((new Date(m.expiresAt).getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
            : 0,
        });
      }
      return result;
    }),

    // Alle Mitgliedschaften (Admin)
    listAll: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") throw new Error("Kein Zugriff");
      const db = await getDb();
      if (!db) return [];
      const now = new Date();
      const allMemberships = await db.select({
        membership: memberships,
        user: users,
      })
        .from(memberships)
        .innerJoin(users, eq(memberships.userId, users.id))
        .orderBy(desc(memberships.createdAt));

      const result = [];
      for (const { membership: m, user: u } of allMemberships) {
        const course = await db.select().from(courses)
          .where(eq(courses.id, (m as any).courseId)).limit(1);
        const isActive = !m.isRevoked && new Date(m.expiresAt) > now;
        result.push({
          ...m,
          user: u,
          course: course[0] || null,
          isActive,
          daysLeft: isActive
            ? Math.ceil((new Date(m.expiresAt).getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
            : 0,
        });
      }
      return result;
    }),

    // Mitgliedschaft erstellen (Admin)
    create: protectedProcedure
      .input(z.object({
        userId: z.number(),
        courseId: z.number(),
        accessDays: z.number().min(1).default(60),
        note: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new Error("Kein Zugriff");
        const db = await getDb();
        if (!db) throw new Error("Datenbank nicht verfügbar");
        const startsAt = new Date();
        const expiresAt = new Date(startsAt.getTime() + input.accessDays * 24 * 60 * 60 * 1000);
        await db.insert(memberships).values({
          userId: input.userId,
          courseId: input.courseId,
          accessDays: input.accessDays,
          startsAt,
          expiresAt,
          note: input.note,
          isRevoked: false,
        } as any);
        return { success: true };
      }),

    // Mitgliedschaft verlängern (Admin)
    extend: protectedProcedure
      .input(z.object({
        id: z.number(),
        additionalDays: z.number().min(1),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new Error("Kein Zugriff");
        const db = await getDb();
        if (!db) throw new Error("Datenbank nicht verfügbar");
        const existing = await db.select().from(memberships)
          .where(eq(memberships.id, input.id)).limit(1);
        if (!existing.length) throw new Error("Mitgliedschaft nicht gefunden");
        const current = existing[0];
        const newExpiry = new Date(
          Math.max(new Date(current.expiresAt).getTime(), Date.now()) +
          input.additionalDays * 24 * 60 * 60 * 1000
        );
        await db.update(memberships)
          .set({ expiresAt: newExpiry, accessDays: current.accessDays + input.additionalDays })
          .where(eq(memberships.id, input.id));
        return { success: true };
      }),

    // Mitgliedschaft sperren/entsperren (Admin)
    toggleRevoke: protectedProcedure
      .input(z.object({ id: z.number(), revoke: z.boolean() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new Error("Kein Zugriff");
        const db = await getDb();
        if (!db) throw new Error("Datenbank nicht verfügbar");
        await db.update(memberships)
          .set({ isRevoked: input.revoke })
          .where(eq(memberships.id, input.id));
        return { success: true };
      }),
  }),

  // ── User-Verwaltung (Admin) ───────────────────────────────────────
  users: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") throw new Error("Kein Zugriff");
      const db = await getDb();
      if (!db) return [];
      return db.select().from(users).orderBy(desc(users.createdAt));
    }),

    setRole: protectedProcedure
      .input(z.object({ userId: z.number(), role: z.enum(["user", "admin"]) }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new Error("Kein Zugriff");
        const db = await getDb();
        if (!db) throw new Error("Datenbank nicht verfügbar");
        await db.update(users)
          .set({ role: input.role })
          .where(eq(users.id, input.userId));
        return { success: true };
      }),
  }),
});
