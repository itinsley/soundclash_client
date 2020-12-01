import sortByIndex from "./sortByIndex";

const rounds = [{ index: 1 }, { index: 4 }, { index: 3 }];

it("sorts objects by index ascending", () => {
  const sorted = sortByIndex.desc(rounds);
  expect(sorted[0].index).toEqual(4);
  expect(sorted[1].index).toEqual(3);
  expect(sorted[2].index).toEqual(1);
});

it("sorts objects by index ascending", () => {
  const sorted = sortByIndex.asc(rounds);
  expect(sorted[0].index).toEqual(1);
  expect(sorted[1].index).toEqual(3);
  expect(sorted[2].index).toEqual(4);
});
