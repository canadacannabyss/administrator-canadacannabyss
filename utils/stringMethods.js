import slugify from 'slugify';

const slugifyString = (string) => slugify(string).toLowerCase();

export {
  slugifyString,
};
