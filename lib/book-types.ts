export type BookHint={bookId:string;title:string;section:string;pdfPage:number;printedPage?:string;guidance:string};
export type BookReference={id:string;title:string;author:string;filename:string;pages:number;sha256?:string|null};
export type UserBook={id:string;title:string;filename:string;bytes:number;reference_id:string|null;created_at:string;status:string};
