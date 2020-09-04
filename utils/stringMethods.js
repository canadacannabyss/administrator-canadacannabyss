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

export const editCategoriesToArray = (categoriesArray) => {
  let categoriesString = '';
  categoriesArray.map((category, i) => {
    if (i + 1 === categoriesArray.length) {
      categoriesString += category.categoryName;
    } else {
      categoriesString += `${category.categoryName}, `;
    }
  });

  const tempCategories = categoriesString.split(',');
  tempCategories.map((category, i) => {
    tempCategories[i] = tempCategories[i].trim();
  });
  return tempCategories;
};

export const editTagsToArray = (tagsArray) => {
  let tagsString = '';
  tagsArray.map((tag, i) => {
    if (i + 1 === tagsArray.length) {
      tagsString += tag.tagName;
    } else {
      tagsString += `${tag.tagName}, `;
    }
  });

  const tempTags = tagsString.split(',');
  tempTags.map((tag, i) => {
    tempTags[i] = tempTags[i].trim();
  });
  return tempTags;
};
