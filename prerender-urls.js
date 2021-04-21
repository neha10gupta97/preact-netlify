const { generateFileList } = require('./src/crawler');
const { join } = require('path');
const fs = require('fs');
const parseMD = require('parse-md').default;

const [blogs] = generateFileList(join(__dirname, 'content')).nodes;
console.log(blogs);
const [books] = generateFileList(join(__dirname, 'content')).nodes;

module.exports = () => {
  const pages = [
    {
      url: '/',
      seo: {
        cover: '/assets/profile.jpg',
      },
    },
    { url: '/contact/' },
    { url: '/contact/success' },
  ];

  // adding blogs list posts page
  pages.push({
    url: '/blogs/',
    data: blogs,
  });

  // adding all blog pages
  pages.push(
    ...blogs.edges.map((blog) => {
      let data;
      if (blog.format === 'md') {
        const { content } = parseMD(fs.readFileSync(join('content', 'blog', blog.id), 'utf-8'));
        data = content;
      } else {
        data = fs
          .readFileSync(join('content', 'blog', blog.id), 'utf-8')
          .replace(/---(.*(\r)?\n)*---/, '');
      }
      return {
        url: `/blog/${blog.id}`,
        seo: blog.details,
        data: {
          details: blog.details,
          content: data,
        },
      };
    })
  );

  //   pages.push({
  //     url: '/books/',
  //     data: books,
  //   });

  //   // adding all blog pages
  //   pages.push(
  //     ...books.edges.map((book) => {
  //       let data;
  //       if (book.format === 'md') {
  //         const { content } = parseMD(fs.readFileSync(join('content', 'book', book.id), 'utf-8'));
  //         data = content;
  //       } else {
  //         data = fs
  //           .readFileSync(join('content', 'book', book.id), 'utf-8')
  //           .replace(/---(.*(\r)?\n)*---/, '');
  //       }
  //       return {
  //         url: `/book/${book.id}`,
  //         seo: book.details,
  //         data: {
  //           details: book.details,
  //           content: data,
  //         },
  //       };
  //     })
  //   );

  return pages;
};
