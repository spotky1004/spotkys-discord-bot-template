class SItemGenerator {
    constructor(options) {
        this.itemConstructor = options.itemConstructor;
        this.items = {};
    }
    generate(name) {
        const itemData = {
            name,
        };
        this.items[name] = new this.itemConstructor({
            data: itemData,
            parent: this,
        });
    }
}
class SItem {
    constructor(options) {
        this.parent = options.parent;
    }
}
class ItemGenerator {
    constructor(options) {
        this.itemConstructor = options.itemConstructor;
        this.items = {};
    }
    generate(name) {
        const itemData = {
            name,
        };
        this.items[name] = new this.itemConstructor({
            data: itemData,
            parent: this,
        });
    }
}
class Item {
    constructor(options) {
        this.parent = options.parent;
    }
}
export {};
