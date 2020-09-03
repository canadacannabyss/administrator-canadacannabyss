import slugify from 'slugify';

export const slugifyString = (string) => slugify(string).toLowerCase();

export const categoriesToArray = (categories) => {
  const tempCategories = categories.split(',');
  tempCategories.map((category, i) => {
    tempCategories[i] = tempCategories[i].trim();
  });
  return tempCategories;
};

export const tagsToArray = (tags) => {
  const tempTags = tags.split(',');
  tempTags.map((tag, i) => {
    tempTags[i] = tempTags[i].trim();
  });
  return tempTags;
};
