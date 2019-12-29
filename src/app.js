const moment = require('moment');
let cfg = false;
let clock = document.getElementById('clock');
let sub = document.getElementById('clock-sub');

function configure () {
  shouldConfigure = false;
  console.log(cfg);
  cfg.scale = cfg.scale || '1';
  document.title = cfg.tabTitle;
  if (cfg.invertColours) {
    document.body.classList.add('invert');
  }
  if (cfg.clockEnabled) {
    clock.style.display = 'block';
    updateClock();
    setInterval(updateClock, 500);
  }
  if (cfg.subEnabled) {
    sub.style.display = 'block';
    updateSub();
    setInterval(updateSub, 500);
  }
  updScale();
}
function updScale () {
  // let h = (document.getElementById('clock-container').getBoundingClientRect().height / document.documentElement.clientHeight);
  // let w = (Math.max(document.getElementById('clock-sub').getBoundingClientRect().width, document.getElementById('clock').getBoundingClientRect().width) / document.documentElement.clientWidth);

  // while (h < 0.20 || h > 0.95) {
  //   console.log(h);
  //   if (h > 0.95 || w > 1.2) {
  //     cfg.scale = String(Number(cfg.scale) - 0.1);
  //   } else if (h < 0.20) {
  //     cfg.scale = String(Number(cfg.scale) + 0.1);
  //   }

  //   console.log(cfg.scale);
  document.body.style.transform = 'scale(' + String(cfg.scale) + ')';
  //   h = (document.getElementById('clock-container').getBoundingClientRect().height / document.documentElement.clientHeight);
  //   // w = (Math.max(document.getElementById('clock-sub').getBoundingClientRect().width, document.getElementById('clock').getBoundingClientRect().width) / document.documentElement.clientWidth);
  //   // w = 1
  // }
}
function updateClock () {
  clock.textContent = moment().format(cfg.clockFmt);
}
function updateSub () {
  sub.textContent = moment().format(cfg.subFmt);
}
browser.storage.sync.get(['tabTitle', 'clockFmt', 'clockEnabled', 'subFmt', 'subEnabled', 'invertColours',
  'scale'
]).then((cfgResponse) => {
  cfg = cfgResponse;
  if (docReady) { configure(); } else { shouldConfigure = true; }
});
let docReady = false;
let shouldConfigure = false;
document.addEventListener('DOMContentLoaded', () => {
  clock = document.getElementById('clock');
  sub = document.getElementById('clock-sub');
  docReady = true;
  document.getElementById('hidden-config-floating').addEventListener('click', () => browser.runtime.openOptionsPage());
  if (shouldConfigure) { configure(); }
});
