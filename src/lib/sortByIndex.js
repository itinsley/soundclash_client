const sortByIdDescending = (collection) =>
  collection.sort((a, b) => b.index - a.index);
const sortByIdAscending = (collection) =>
  collection.sort((a, b) => a.index - b.index);

const sortByIndex = {
  asc: sortByIdAscending,
  desc: sortByIdDescending,
};
export default sortByIndex;
