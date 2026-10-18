import seed from './book-seed.json';
import type {Question} from './study-data';
import type {BookReference} from './book-types';
export const bookReferences:BookReference[]=seed.books;
export type BookRecord=typeof seed.records[number];
export function referencedQuestions(records:BookRecord[],books:BookReference[]):Question[]{
 return records.map(r=>({...r.question,bookHint:{bookId:r.book_id,title:books.find(b=>b.id===r.book_id)?.title??'Livro de referência',section:r.section,pdfPage:r.pdf_page,printedPage:r.printed_page??undefined,guidance:r.guidance}} as Question));
}
export const bookQuestions=referencedQuestions(seed.records,bookReferences);
