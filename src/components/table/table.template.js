export const CODES = {
  A: 65,
  Z: 90,
};

function createCell(_, col) {
  return `
    <div
      data-col="${col}"
      class="cell"
      contenteditable=""></div>
  `;
}

function createCol(content) {
  return `
   <div
     class="column"
     data-index="${content.charCodeAt(0) - CODES.A}"
     data-type="resizable">
       ${content}
     <div class="col-resize" data-resize="col"></div>
   </div>`;
}

function createRow(content, index = '') {
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${index
        ? index + '<div class="row-resize" data-resize="row"></div>'
        : ''}
      </div>
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
      .map((_, index) => createCol(toChar(index)))
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
