import type { Question } from "./study-data";
export type Catalogue = {
 books?: import("./book-types").BookReference[];
 subjects: {id:string;name:string;short:string;color:string;group:string}[];
 topics: {id:string;subject:string;name:string;summary:string}[];
 questions: Question[];
 sources: {id:string;title:string;publisher:string;url:string;accessedAt:string}[];
};
