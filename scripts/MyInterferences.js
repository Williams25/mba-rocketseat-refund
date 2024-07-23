class MyInterferences extends AllCategories {
  constructor({ title, value, id, category }) {
    super();
    this.title = title;
    this.value = value;
    this.id = id;
    this.category = category;
  }

  getCategory() {
    return this.category;
  }
  getTitle() {
    return this.title;
  }
  getValue() {
    return this.value;
  }
  getId() {
    return this.id;
  }
  getCategory() {
    return this.allCategories[this.category].label;
  }
  getCategoryImg() {
    return this.allCategories[this.category].img;
  }
}
