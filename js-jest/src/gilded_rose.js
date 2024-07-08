class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const SULFURAS = "Sulfuras, Hand of Ragnaros";
const AGED_BRIE = "Aged Brie";
const BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert";
class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      const { name: itemName, quality: itemQuality, sellIn: itemSellIn } = item;

      if (itemName != AGED_BRIE && itemName != BACKSTAGE_PASSES) {
        if (itemQuality > 0) {
          if (itemName != SULFURAS) {
            item.quality = item.quality - 1;
          }
        }
      } else {
        if (itemQuality < 50) {
          item.quality = item.quality + 1;
          if (itemName == BACKSTAGE_PASSES) {
            if (itemSellIn < 11) {
              if (item.quality < 50) {
                item.quality = item.quality + 1;
              }
            }
            if (itemSellIn < 6) {
              if (item.quality < 50) {
                item.quality = item.quality + 1;
              }
            }
          }
        }
      }
      if (itemName != SULFURAS) {
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < 0) {
        if (itemName != AGED_BRIE) {
          if (itemName != BACKSTAGE_PASSES) {
            if (itemQuality > 0) {
              if (itemName != SULFURAS) {
                item.quality = item.quality - 1;
              }
            }
          } else {
            item.quality = item.quality - item.quality;
          }
        } else {
          if (itemQuality < 50) {
            item.quality = item.quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
