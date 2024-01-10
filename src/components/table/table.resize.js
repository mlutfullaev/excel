import {$} from '@core/dom';

export function tableResize(event, $root) {
  const type = event.target.dataset.resize;
  if (!type) return;
  const $target = $(event.target);
  const $parent = $target.closest('[data-type="resizable"]');
  const coords = $parent.getCoords();
  let value;

  if (type === 'col') {
    $target.css({opacity: 1, bottom: '-100vh'});
  } else {
    $target.css({opacity: 1});
  }

  document.onmousemove = (e) => {
    if (type === 'col') {
      const delta = e.pageX - coords.right;
      value = coords.width + delta;

      $parent.css({width: value + 'px'});
    } else {
      const delta = e.pageY - coords.bottom;
      const value = coords.height + delta;

      $parent.css({height: value + 'px'});
    }
  };

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;
    if (type === 'col') {
      $root.findAll(`[data-col="${$parent.data.index}"]`)
          .forEach((cell) => cell.style.width = value + 'px');
      $target.css({opacity: null, bottom: 0});
    } else {
      $target.css({opacity: null, right: 0});
    }
  };
}

