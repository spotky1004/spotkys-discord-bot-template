interface SItemGeneratorOptions<I extends typeof SItem> {
  itemConstructor: I;
}
class SItemGenerator<I extends typeof SItem> {
  itemConstructor: I;
  items: Record<string, I["prototype"]>;

  constructor(options: SItemGeneratorOptions<I>) {
    this.itemConstructor = options.itemConstructor;
    this.items = {};
  }
  
  generate(name: string) {
    const itemData: SItemData = {
      name,
    };

    this.items[name] = new this.itemConstructor({
      data: itemData,
      parent: this,
    });
  }
}

interface SItemData {
  name: string;
}
interface SItemOptions<T extends SItemData, P extends SItemGenerator<typeof SItem>> {
  parent: P;
  data: T;
}
class SItem<T extends SItemData, P extends SItemGenerator<typeof SItem>> {
  parent: P;

  constructor(options: SItemOptions<T, P>) {
    this.parent = options.parent;
  }
}



interface ItemGeneratorOptions<I extends typeof Item> {
  itemConstructor: I;
}
class ItemGenerator<I extends typeof Item> {
  itemConstructor: I;
  items: Record<string, I["prototype"]>;

  constructor(options: ItemGeneratorOptions<I>) {
    this.itemConstructor = options.itemConstructor;
    this.items = {};
  }
  
  generate(name: string) {
    const itemData: ItemData = {
      name,
    };

    this.items[name] = new this.itemConstructor({
      data: itemData,
      parent: this,
    });
  }
}

interface ItemData {
  name: string;
}
interface ItemOptions<T extends ItemData, P extends ItemGenerator<typeof Item>> {
  parent: P;
  data: T;
}
class Item<T extends ItemData, P extends ItemGenerator<typeof Item>> {
  parent: P;

  constructor(options: ItemOptions<T, P>) {
    this.parent = options.parent;
  }
}



// interface CandyGeneratorOptions extends SItemGeneratorOptions<typeof Candy> {
// }
// class CandyGenerator extends SItemGenerator<typeof Candy> {
//   constructor(options: CandyGeneratorOptions) {
//     super(options);
//   }
// }

// interface CandyData extends SItemData {
//   color: string;
// }
// interface CandyOptions extends SItemOptions<CandyData, CandyGenerator> {
// }
// class Candy extends SItem<CandyData, CandyGenerator> {
//   constructor(options: CandyOptions) {
//     super(options);
//     new this.parent.itemConstructor({
//       data: {
//         name: "s",
//         color: "s"
//       },
//       parent: new CandyGenerator({itemConstructor: Candy})
//     })
//   }
// }

export {};
