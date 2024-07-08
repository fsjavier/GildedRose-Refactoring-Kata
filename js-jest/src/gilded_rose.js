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

  decreaseQuality(item) {
    return item.quality - 1;
  }

  increaseQuality(item) {
    return item.quality + 1;
  }

  decreaseSellIn(item) {
    return item.sellIn - 1;
  }

  updateAgedBrie(item) {
    if (item.quality < 50) item.quality = this.increaseQuality(item);
  }

  updateBackStagePasses(item) {
    if (item.quality < 50) {
      item.quality = this.increaseQuality(item);

      if (item.sellIn < 11) {
        item.quality = this.increaseQuality(item);
      }
      if (item.sellIn < 6) {
        item.quality = this.increaseQuality(item);
      }
    }
  }

  updateDefaultItem(item) {
    if (item.quality > 0) item.quality = this.decreaseQuality(item);
  }

  updateItemQuality(item) {
    const { name: itemName } = item;

    switch (itemName) {
      case AGED_BRIE:
        this.updateAgedBrie(item);
        break;
      case BACKSTAGE_PASSES:
        this.updateBackStagePasses(item);
        break;
      case SULFURAS:
        break;
      default:
        this.updateDefaultItem(item);
    }
  }

  handleExpiration(item) {
    const { name: itemName } = item;

    if (item.sellIn < 0) {
      switch (itemName) {
        case AGED_BRIE:
          this.updateAgedBrie(item);
          break;
        case BACKSTAGE_PASSES:
          item.quality = 0;
          break;
        case SULFURAS:
          break;
        default:
          this.updateDefaultItem(item);
      }
    }
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      const { name: itemName } = item;

      this.updateItemQuality(item);

      if (itemName != SULFURAS) {
        item.sellIn = this.decreaseSellIn(item);
      }

      this.handleExpiration(item);
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
