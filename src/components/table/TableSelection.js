export class TableSelection {
  static className = 'selected';

  constructor() {
    this.group = [];
    this.current = null;
  }

  select($el) {
    this.group.push($el);
    $el.focus().addClass(TableSelection.className);
    this.current = $el;
  }

  clear() {
    this.group.forEach((item) => {
      item.removeClass(TableSelection.className);
    });
    this.group = [];
  }

  selectGroup($group = []) {
    this.clear();
    // this.group = $group;
    $group.forEach(($el) => this.select($el));
  }
}
