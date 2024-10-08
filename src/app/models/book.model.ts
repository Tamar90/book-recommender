export class Book {
  id?: string;
  title?: string;
  authors: string[];
  coverImageUrl?: string;
  publishYear?: number;
  subjects?: string[];
  description?: string;
  isHovered?: boolean = false;
  cover_i?: string;
  genre?: string;


  constructor(data: any) {
    this.id = data.key || null;
    this.title = data.title || null;
    this.authors = data.author_name || [];
    this.coverImageUrl = data.cover_i ? `https://covers.openlibrary.org/b/id/${data.cover_i}-M.jpg` : undefined;
    this.publishYear = data.first_publish_year || null;
    this.subjects = data.subjects || null;
    this.description = typeof data.description === 'string' ? data.description : data.description?.value || null;
    this.cover_i = data.cover_i || null;
    this.genre = data.genre || null;
  }
}
