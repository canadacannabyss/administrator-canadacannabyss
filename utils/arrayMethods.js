export const tagsArrayToString = (tagsArray) => {
  let tagsString = '';
  tagsArray.map((tag, i) => {
    if (i + 1 === tagsArray.length) {
      tagsString += tag.tagName;
    } else {
      tagsString += `${tag.tagName}, `;
    }
  });
  return tagsString;
};

export const categoriesArrayToString = (categoriesArray) => {
  let categoriesString = '';
  categoriesArray.map((category, i) => {
    if (i + 1 === categoriesArray.length) {
      categoriesString += category.categoryName;
    } else {
      categoriesString += `${category.categoryName}, `;
    }
  });
  return categoriesString;
};
