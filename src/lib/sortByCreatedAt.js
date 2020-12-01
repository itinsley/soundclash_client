const sortDescending = (collection) =>
  collection.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
const sortAscending = (collection) =>
  collection.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

const sortByCreatedAt = {
  asc: sortAscending,
  desc: sortDescending,
};
export default sortByCreatedAt;
