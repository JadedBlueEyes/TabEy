// import Sortable from 'sortablejs';

// const moment = require('moment');
const moment = require('moment-timezone');
console.log('loaded');

const fields = ['tabTitle', 'clockFmt', 'clockEnabled', 'subFmt', 'subEnabled', 'invertColours', 'scale', 'timezone'
];

const defaultOpts = {
  tabTitle: 'New Tab',
  clockFmt: 'LTS',
  clockEnabled: 'on',
  subFmt: 'dddd[,] Do MMMM',
  subEnabled: 'on',
  invertColours: '',
  scale: '1.0',
  timezone: moment.tz.guess()
};
const colourPalette = [
  'ff8c00', 'e81123', 'd13438', 'c30052', 'bf0077', '9a0089', '881798', '744da9',
  '10893e', '107c10', '018574', '2d7d9a', '0063b1', '6b69d6', '8e8cd8', '8764b8',
  '038387', '486860', '525e54', '7e735f', '4c4a48', '515c6b', '4a5459'
];

const saveOptions = e => {
  e.preventDefault();
  let t = {};
  fields.forEach((n) => {
    t[n] = document.getElementById(n).value || defaultOpts[n] || '';
  });

  browser.storage.sync.set(t);
};

const restoreOptions = _ => {
  browser.storage.sync.get(fields)
    .then(options => {
      console.log(options);
      fields.forEach((n) => {
        let el = document.getElementById(n);
        let type = el.getAttribute('type');
        if (type === 'checkbox') {
          el.checked = Boolean(options[n] || defaultOpts[n] || '');
        } else { el.value = options[n] || defaultOpts[n] || ''; }
      });
    });
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('form').addEventListener('submit', saveOptions);

// var fragment = new DocumentFragment()

// colourPalette.forEach(function (c) {
//   var li = document.createElement('option');
//   li.style.color = c;
//   li.value = c;
//   fragment.appendChild(li);
// });

// document.addEventListener('DOMContentLoaded', () => {
//   document.getElementById('colour').appendChild(fragment);
// });
