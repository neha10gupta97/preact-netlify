import { h } from 'preact';
import { Link } from 'preact-router';
import { usePrerenderData } from '@preact/prerender-data-provider';
import style from './style';

const books = (props) => {
  console.log(props);
  const [data, isLoading] = usePrerenderData(props);
  return (
    <div class={style.pageBlogs}>
      <h1 class={style.pageTitle}>My Books</h1>
      {getBooksListing(data, isLoading)}
    </div>
  );
};

function getBooksListing(data, isLoading) {
  if (isLoading) {
    return (
      <article class={style.loadingPlaceholder}>
        <h2 class={`${style.blogtitle} loading`}>&nbsp;</h2>
        <div class={`${style.loadingBody} loading`}>&nbsp;</div>
        <div class={`${style.loadingBody} loading`}>&nbsp;</div>
        <div class={`${style.loadingBody} loading`}>&nbsp;</div>
      </article>
    );
  }
  if (data && data.data) {
    const { data: books } = data;
    return (
      <>
        {books.edges.map((book) => (
          <Link href={`/book/${book.id}`}>
            <article>
              <h2>{book.details.title}</h2>
              <div>
                <span class={style.tag}>{book.details.author}</span>
              </div>
            </article>
          </Link>
        ))}
      </>
    );
  }
}

export default books;
