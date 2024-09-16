export const generateImageLinks = (count) => {
  const imageLinks = [];
  for (let i = 0; i < count; i++) {
    const randomHeight = Math.floor(Math.random() * (900 - 300 + 1)) + 300;
    imageLinks.push(`https://picsum.photos/${randomHeight}`);
  }
  return imageLinks;
};