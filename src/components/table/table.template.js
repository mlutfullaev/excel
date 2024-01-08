const CODES = {
  A: 65,
  Z: 90,
};

function createCell() {
  return `
    <div class="cell" contenteditable=""></div>
  `;
}

function createColl(content) {
  return `<div class="column">${content}</div>`;
}

function createRow(content, index = '') {
  return `
    <div class="row">
      <div class="row-info">${index}</div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

const toChar = (index) => String.fromCharCode(CODES.A + index);

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const colls = new Array(colsCount)
      .fill('')
      .map((_, index) => createColl(toChar(index)))
      .join('');
  rows.push(createRow(colls));

  for (let rowI = 0; rowI < rowsCount; rowI++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(createCell)
        .join('');
    rows.push(createRow(cells, rowI + 1));
  }

  return rows.join('');
}
