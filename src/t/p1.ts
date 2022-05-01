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



interface CandyGeneratorOptions extends ItemGeneratorOptions<typeof Candy> {
}
class CandyGenerator extends ItemGenerator<typeof Candy> {
  constructor(options: CandyGeneratorOptions) {
    super(options);
  }
}

interface CandyData extends ItemData {
  color: string;
}
interface CandyOptions extends ItemOptions<CandyData, CandyGenerator> {
}
class Candy extends Item<CandyData, CandyGenerator> {
  constructor(options: CandyOptions) {
    super(options);
    new this.parent.itemConstructor({
      data: {
        name: "s",
        color: "s"
      },
      parent: new CandyGenerator({itemConstructor: Candy})
    })
  }
}

export {};
