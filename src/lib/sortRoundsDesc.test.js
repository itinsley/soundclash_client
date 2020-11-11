import sortRoundsDesc from "./sortRoundsDesc";

const rounds = [{ index: 1 }, { index: 4 }, { index: 3 }];

it("reverse sorts rounds by index", () => {
  const sorted = sortRoundsDesc(rounds);
  expect(rounds[0].index).toEqual(4);
  expect(rounds[1].index).toEqual(3);
  expect(rounds[2].index).toEqual(1);
});
