import { sqliteTable, text, integer, primaryKey } from "drizzle-orm/sqlite-core";
export const personalNotes = sqliteTable("personal_notes", {
  userId: text("user_id").notNull(),
  id: text("id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  strokes: text("strokes").notNull(),
  revision: integer("revision").notNull(),
  updatedAt: text("updated_at").notNull(),
}, table => [primaryKey({columns:[table.userId, table.id]})]);
export const studySpaces = sqliteTable("study_spaces", {
  id: text("id").primaryKey(),
  state: text("state").notNull(),
  revision: integer("revision").notNull().default(0),
  updatedAt: text("updated_at").notNull(),
});

export const catalogueSubjects = sqliteTable("catalogue_subjects", {
 id: text("id").primaryKey(), name: text("name").notNull(), short: text("short").notNull(), color: text("color").notNull(), group: text("group_name").notNull(), position: integer("position").notNull(),
});
export const catalogueTopics = sqliteTable("catalogue_topics", {
 id: text("id").primaryKey(), subject: text("subject_id").notNull().references(() => catalogueSubjects.id), name: text("name").notNull(), summary: text("summary").notNull(), position: integer("position").notNull(),
});
export const catalogueSources = sqliteTable("catalogue_sources", {
 id: text("id").primaryKey(), title: text("title").notNull(), publisher: text("publisher").notNull(), url: text("url").notNull(), accessedAt: text("accessed_at").notNull(),
});
export const catalogueQuestions = sqliteTable("catalogue_questions", {
 id: text("id").primaryKey(), topic: text("topic_id").notNull().references(() => catalogueTopics.id), level: text("level").notNull(), prompt: text("prompt").notNull().unique(), options: text("options").notNull(), answer: integer("answer").notNull(), explanation: text("explanation").notNull(), source: text("source_id").references(() => catalogueSources.id), position: integer("position").notNull(),
});
export const catalogueReleases = sqliteTable("catalogue_releases", {
 id: text("id").primaryKey(), createdAt: text("created_at").notNull(),
});

export const bookMarks=sqliteTable('book_marks',{
 userId:text('user_id').notNull(),bookId:text('book_id').notNull(),id:text('id').notNull(),data:text('data').notNull(),createdAt:text('created_at').notNull(),
},t=>[primaryKey({columns:[t.userId,t.bookId,t.id]})]);
export const bookReading=sqliteTable('book_reading',{
 userId:text('user_id').notNull(),bookId:text('book_id').notNull(),page:integer('page').notNull(),
},t=>[primaryKey({columns:[t.userId,t.bookId]})]);
export const studyDocuments=sqliteTable('study_documents',{
 userId:text('user_id').notNull(),id:text('id').notNull(),data:text('data').notNull(),revision:integer('revision').notNull(),updatedAt:text('updated_at').notNull(),
},t=>[primaryKey({columns:[t.userId,t.id]})]);
export const toolAttempts=sqliteTable('tool_attempts',{
 userId:text('user_id').notNull(),id:text('id').notNull(),data:text('data').notNull(),revision:integer('revision').notNull(),updatedAt:text('updated_at').notNull(),
},t=>[primaryKey({columns:[t.userId,t.id]})]);
export const studyTimers=sqliteTable('study_timers',{
 userId:text('user_id').primaryKey(),elapsed:integer('elapsed').notNull(),startedAt:integer('started_at'),revision:integer('revision').notNull(),
});
export const tutorUsage=sqliteTable('tutor_usage',{
 userId:text('user_id').notNull(),day:text('day').notNull(),count:integer('count').notNull(),
},t=>[primaryKey({columns:[t.userId,t.day]})]);

export const drawingNotebooks = sqliteTable("drawing_notebooks", {
 userId: text("user_id").notNull(),
 id: text("id").notNull(),
 title: text("title").notNull(),
 subject: text("subject").notNull(),
 questionId: text("question_id"),
 data: text("data").notNull(),
 revision: integer("revision").notNull(),
 updatedAt: text("updated_at").notNull(),
},table=>[primaryKey({columns:[table.userId,table.id]})]);
