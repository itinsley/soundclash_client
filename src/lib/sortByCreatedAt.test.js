import sortByCreatedAt from "./sortByCreatedAt";

const collection = [
  { name: "second", created_at: "2001-01-01T00:00:02.350Z" },
  { name: "third", created_at: "2001-01-01T00:00:03.350Z" },
  { name: "first", created_at: "2001-01-01T00:00:01.350Z" },
];

it("sorts objects by index ascending", () => {
  const sorted = sortByCreatedAt.asc(collection);
  expect(sorted[0].name).toEqual("first");
  expect(sorted[1].name).toEqual("second");
  expect(sorted[2].name).toEqual("third");
});

it("sorts objects by index descending", () => {
  const sorted = sortByCreatedAt.desc(collection);
  expect(sorted[0].name).toEqual("third");
  expect(sorted[1].name).toEqual("second");
  expect(sorted[2].name).toEqual("first");
});
