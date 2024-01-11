import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {tableResize} from '@/components/table/table.resize';
import {TableSelection} from '@/components/table/TableSelection';
import {range} from '@core/utils';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      listeners: ['mousedown', 'keydown', 'input'],
      name: 'Table',
      ...options,
    });
  }

  toHTML() {
    return createTable(20);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const $cell = this.$root.find('[data-id="0:0"]');
    this.selectCell($cell);
    this.$on('formula:input', (text) => {
      this.selection.current.text(text);
    });
    this.$on('formula:enter', () => {
      this.selection.current.focus();
    });
  }

  selectCell($cell) {
    this.selection.clear();
    this.selection.select($cell);
    this.$emit('table:select', $cell);
  }

  onMousedown = (event) => {
    const $target = $(event.target);
    if ($target.data.resize) {
      tableResize(event, this.$root);
    } else if ($target.data.type === 'cell') {
      if (event.shiftKey) {
        const target = $target.id(true);
        const current = this.selection.current.id(true);

        const cols = range(current.col, target.col);
        const rows = range(current.row, target.row);
        const ids = cols.reduce((acc, col) => {
          rows.forEach((row) => acc.push(`${row}:${col}`));
          return acc;
        }, []);

        const $cells = ids.map((id) => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
      }
    }
  };

  onKeydown(event) {
    const keys = [
      'Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
    ];
    const {key}= event;
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const coords = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, coords));
      if ($next.$el) {
        this.selectCell($next);
      }
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target));
  }
}

function nextSelector(key, {row, col}) {
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++;
      break;
    case 'Tab':
    case 'ArrowRight':
      col++;
      break;
    case 'ArrowLeft':
      if (col > 0) {
        col--;
      }
      break;
    case 'ArrowUp':
      if (row > 0) {
        row--;
      }
      break;
  }

  return `[data-id="${row}:${col}"]`;
}
