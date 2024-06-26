class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class StandardItem extends Item {
  decreaseSellIn() {
    this.sellIn--;
  }

  decreaseQuality(amount = 1) {
    if (this.quality <= 0) return;
    this.quality = this.quality - amount;
  }

  increaseQuality(amount = 1) {
    if (this.quality >= 50) return;
    this.quality = this.quality + amount;
  }

  update() {
    this.decreaseSellIn();
    this.sellIn < 0 ? this.decreaseQuality(2) : this.decreaseQuality();
  }
}

class AgedBrie extends StandardItem {
  update() {
    this.decreaseSellIn();
    this.sellIn < 0 ? this.increaseQuality(2) : this.increaseQuality();
  }
}

class Sulfuras extends StandardItem {
  constructor(name, sellIn) {
    super(name, sellIn, 80);
  }
  update() {}
}

class BackstagePass extends StandardItem {
  update() {
    this.decreaseSellIn();

    if (this.sellIn < 0) {
      this.quality = 0;
      return;
    }

    this.increaseQuality();
    if (this.sellIn < 10) this.increaseQuality();
    if (this.sellIn < 5) this.increaseQuality();
  }
}

class ConjuredItem extends StandardItem {
  update() {
    this.decreaseSellIn();
    this.sellIn < 0 ? this.decreaseQuality(4) : this.decreaseQuality(2);
  }
}

class CreateItem {
  static addItem(item) {
    switch (item.name) {
      case "Aged Brie":
        return new AgedBrie(item.name, item.sellIn, item.quality);
      case "Sulfuras, Hand of Ragnaros":
        return new Sulfuras(item.name, item.sellIn);
      case "Backstage passes to a TAFKAL80ETC concert":
        return new BackstagePass(item.name, item.sellIn, item.quality);
      case item.name.startsWith("Conjured") ? item.name : null:
        return new ConjuredItem(item.name, item.sellIn, item.quality);
      default:
        return new StandardItem(item.name, item.sellIn, item.quality);
    }
  }
}

class Shop {
  constructor(items = []) {
    this.items = items.map((item) => CreateItem.addItem(item));
  }

  updateQuality() {
    this.items.forEach((item) => item.update());
    return this.items;
  }
}

// updateQuality() {
//   for (let i = 0; i < this.items.length; i++) {
//     if (
//       this.items[i].name != "Aged Brie" &&
//       this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
//     ) {
//       if (this.items[i].quality > 0) {
//         if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
//           this.items[i].quality = this.items[i].quality - 1;
//         }
//       }
//     } else {
//       if (this.items[i].quality < 50) {
//         this.items[i].quality = this.items[i].quality + 1;
//         if (
//           this.items[i].name == "Backstage passes to a TAFKAL80ETC concert"
//         ) {
//           if (this.items[i].sellIn < 11) {
//             if (this.items[i].quality < 50) {
//               this.items[i].quality = this.items[i].quality + 1;
//             }
//           }
//           if (this.items[i].sellIn < 6) {
//             if (this.items[i].quality < 50) {
//               this.items[i].quality = this.items[i].quality + 1;
//             }
//           }
//         }
//       }
//     }
//     if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
//       this.items[i].sellIn = this.items[i].sellIn - 1;
//     }
//     if (this.items[i].sellIn < 0) {
//       if (this.items[i].name != "Aged Brie") {
//         if (
//           this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
//         ) {
//           if (this.items[i].quality > 0) {
//             if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
//               this.items[i].quality = this.items[i].quality - 1;
//             }
//           }
//         } else {
//           this.items[i].quality =
//             this.items[i].quality - this.items[i].quality;
//         }
//       } else {
//         if (this.items[i].quality < 50) {
//           this.items[i].quality = this.items[i].quality + 1;
//         }
//       }
//     }
//   }

//   return this.items;
// }
// }

module.exports = {
  Item,
  Shop,
};
