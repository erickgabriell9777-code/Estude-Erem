-- Applied via Supabase migration erem_private_books_v1. Existing D1 study state is preserved.
create table public.erem_backend_access (id text primary key, token_hash text not null check(length(token_hash)=64));
create table public.erem_book_references (
 id text primary key, title text not null, author text not null, filename text not null,
 pages integer not null check(pages>0), sha256 text unique check(length(sha256)=64)
);
create table public.erem_books (
 id uuid primary key, owner_id text not null, title text not null check(length(title) between 1 and 160),
 filename text not null, path text not null unique, bytes bigint not null check(bytes>0 and bytes<=52428800),
 reference_id text references public.erem_book_references(id), status text not null check(status in ('pending','ready')),
 created_at timestamptz not null default now()
);
create index erem_books_owner_created on public.erem_books(owner_id,created_at desc);
create index erem_books_reference on public.erem_books(reference_id);
create table public.erem_book_questions (
 id text primary key, book_id text not null references public.erem_book_references(id), question jsonb not null,
 pdf_page integer not null check(pdf_page>0), printed_page text, section text not null, guidance text not null
);
create index erem_book_questions_book on public.erem_book_questions(book_id);
alter table public.erem_backend_access enable row level security;
alter table public.erem_book_references enable row level security;
alter table public.erem_books enable row level security;
alter table public.erem_book_questions enable row level security;
-- Sites authenticates readers; the Edge Function checks a server-only capability
-- before using its service credential. Browser roles cannot read these tables.
revoke all on public.erem_backend_access,public.erem_book_references,public.erem_books,public.erem_book_questions from anon,authenticated;
grant select on public.erem_backend_access,public.erem_book_references,public.erem_book_questions to service_role;
grant select,insert,update,delete on public.erem_books to service_role;
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('erem-private-books','erem-private-books',false,52428800,array['application/pdf']);
