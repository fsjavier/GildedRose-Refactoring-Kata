const { Shop, Item } = require("../src/gilded_rose");

// describe("Gilded Rose", function() {
//   it("should foo", function() {
//     const gildedRose = new Shop([new Item("foo", 0, 0)]);
//     const items = gildedRose.updateQuality();
//     expect(items[0].name).toBe("fixme");
//   });
// });

describe("Gilded Rose is empty", () => {
  it("should be empty", () => {
    const gildedRose = new Shop();
    expect(gildedRose.items.length).toBe(0);
  });
});

describe("Gilded Rose with items", () => {
  let gildedRose;

  beforeEach(() => {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("+5 Dexterity Vest", 0, 15),
      new Item("+5 Dexterity Vest", 5, 0),
      new Item("Aged Brie", 2, 0),
      new Item("Aged Brie", 0, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 30),
      new Item("Conjured Mana Cake", 3, 6),
      new Item("Conjured Mana Cake", 0, 8),
    ];

    gildedRose = new Shop(items);
  });

  it("should degrade quality of a standard item by 1 before sell date", () => {
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(19);
    expect(gildedRose.items[0].sellIn).toBe(9);
  });

  it("should degrade quality of a standard item by 2 after sell date", () => {
    gildedRose.updateQuality();
    expect(gildedRose.items[1].quality).toBe(13);
    expect(gildedRose.items[1].sellIn).toBe(-1);
  });

  it("the quality of an item can't be lower than 0", () => {
    gildedRose.updateQuality();
    expect(gildedRose.items[2].quality).toBe(0);
    expect(gildedRose.items[2].sellIn).toBe(4);
  });

  it("should increase quality of Aged Brie as it gets older", () => {
    gildedRose.updateQuality();
    expect(gildedRose.items[3].quality).toBe(1);
    expect(gildedRose.items[3].sellIn).toBe(1);
  });

  it("should increase quality of Aged Brie by 2 after sell date", () => {
    gildedRose.updateQuality();
    expect(gildedRose.items[4].quality).toBe(2);
    expect(gildedRose.items[4].sellIn).toBe(-1);
  });

  it("should not decrease quality of Sulfuras", () => {
    gildedRose.updateQuality();
    expect(gildedRose.items[6].quality).toBe(80);
    expect(gildedRose.items[6].sellIn).toBe(0);
    expect(gildedRose.items[7].quality).toBe(80);
    expect(gildedRose.items[7].sellIn).toBe(-1);
  });

  it("should handle backstage passes correctly", () => {
    gildedRose.updateQuality();
    expect(gildedRose.items[8].quality).toBe(21);
    expect(gildedRose.items[9].quality).toBe(50);
    expect(gildedRose.items[10].quality).toBe(50);
    expect(gildedRose.items[11].quality).toBe(0);
  });

  it("should degrade quality of conjured items twice as fast", () => {
    gildedRose.updateQuality();
    expect(gildedRose.items[12].quality).toBe(4);
    expect(gildedRose.items[12].sellIn).toBe(2);
  });

  it("should degrade quality of conjured items by 4 after sell date", () => {
    gildedRose.updateQuality();
    expect(gildedRose.items[13].quality).toBe(4);
    expect(gildedRose.items[13].sellIn).toBe(-1);
  });
});
