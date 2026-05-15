/* CLAF Digital — vanilla JS, no React, no Babel */
(function () {
  'use strict';

  // ----- 1. Navbar scroll state -----
  var nav = document.querySelector('.nav');
  var onScroll = function () {
    if (window.scrollY > 60) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ----- 2. Reveal on view -----
  var revealed = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });
    revealed.forEach(function (el) { io.observe(el); });
  } else {
    revealed.forEach(function (el) { el.classList.add('in'); });
  }

  // ----- 3. Count-up numbers -----
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var target = parseFloat(el.getAttribute('data-count'));
        var prefix = el.getAttribute('data-prefix') || '';
        var suffix = el.getAttribute('data-suffix') || '';
        var start = performance.now();
        var dur = 1500;
        var step = function (t) {
          var p = Math.min(1, (t - start) / dur);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = prefix + Math.round(target * eased).toLocaleString('en-US') + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        co.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { co.observe(el); });
  } else {
    counters.forEach(function (el) {
      var p = el.getAttribute('data-prefix') || '';
      var s = el.getAttribute('data-suffix') || '';
      el.textContent = p + parseFloat(el.getAttribute('data-count')).toLocaleString('en-US') + s;
    });
  }

  // ----- 4. Bar chart in Card D -----
  var barTargets = [26, 38, 32, 60, 92];
  var bars = document.querySelectorAll('.b-d-chart .bar');
  if (bars.length && 'IntersectionObserver' in window) {
    var bo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        bars.forEach(function (bar, i) {
          setTimeout(function () { bar.style.height = barTargets[i] + '%'; }, 200 + i * 100);
        });
        bo.disconnect();
      });
    }, { threshold: 0.3 });
    bo.observe(bars[0].parentElement);
  } else {
    bars.forEach(function (bar, i) { bar.style.height = barTargets[i] + '%'; });
  }

  // ----- 5. ROI calculator -----
  var $ = function (s) { return document.querySelector(s); };
  var fmt$ = function (n) { return '$' + Math.round(n).toLocaleString('en-US'); };
  var sliders = [
    { el: $('#s-consultas'), out: $('#o-consultas'), fmt: function (v) { return v; } },
    { el: $('#s-ticket'),    out: $('#o-ticket'),    fmt: function (v) { return '$' + v; } },
    { el: $('#s-tasa'),      out: $('#o-tasa'),      fmt: function (v) { return v + '%'; } },
  ];
  var paintSlider = function (s) {
    var min = +s.el.min, max = +s.el.max, val = +s.el.value;
    var pct = ((val - min) / (max - min)) * 100;
    s.el.style.setProperty('--p', pct + '%');
    s.out.textContent = s.fmt(val);
  };
  var calcROI = function () {
    var c = +$('#s-consultas').value;
    var t = +$('#s-ticket').value;
    var r = +$('#s-tasa').value;
    var monthly = Math.round(c * t * (r / 100));
    $('#roi-big').textContent = fmt$(monthly);
    $('#roi-formula').textContent = c + ' consultas × $' + t + ' × ' + r + '%';
    $('#roi-ann').textContent = fmt$(monthly * 12);
  };
  sliders.forEach(function (s) {
    if (!s.el) return;
    paintSlider(s);
    s.el.addEventListener('input', function () { paintSlider(s); calcROI(); });
  });
  calcROI();

  // ----- 6. iPhone-style voice demo player -----
  var aud = $('#demo-audio');
  var iphone = $('#iphone');
  var ipPlayBtn = $('#ip-play');
  var ipSub = $('#ip-sub');
  var ipTime = $('#ip-time');
  var ipFill = $('#ip-progress-fill');
  if (aud && iphone && ipPlayBtn) {
    var fmtTime = function (s) {
      if (!isFinite(s)) return '00:00';
      var m = Math.floor(s / 60), x = Math.floor(s % 60);
      return ('0' + m).slice(-2) + ':' + ('0' + x).slice(-2);
    };
    var paintTime = function () {
      var dur = aud.duration || 0;
      ipTime.textContent = fmtTime(aud.currentTime) + ' / ' + fmtTime(dur);
    };
    var paintProgress = function () {
      var dur = aud.duration || 0;
      var pct = dur > 0 ? (aud.currentTime / dur) : 0;
      ipFill.style.width = (pct * 100) + '%';
      paintTime();
    };
    var resetProgress = function () {
      ipFill.style.width = '0%';
      paintTime();
    };
    ipPlayBtn.addEventListener('click', function (e) {
      e.preventDefault();
      if (aud.paused) {
        aud.play().catch(function () {
          if (ipSub) ipSub.textContent = 'Subí assets/demo-voz.mp3';
        });
      } else {
        aud.pause();
      }
    });
    aud.addEventListener('play', function () {
      iphone.classList.add('playing');
      if (ipSub) ipSub.textContent = 'Reproduciendo...';
    });
    aud.addEventListener('pause', function () {
      iphone.classList.remove('playing');
      if (ipSub) ipSub.textContent = 'Tocá para escuchar';
    });
    aud.addEventListener('ended', function () {
      iphone.classList.remove('playing');
      if (ipSub) ipSub.textContent = 'Tocá para escuchar';
      aud.currentTime = 0;
      resetProgress();
    });
    aud.addEventListener('timeupdate', paintProgress);
    aud.addEventListener('loadedmetadata', paintTime);
    paintTime();
  }

  // ----- 7. (Phone simulator removed) -----

  // ----- 8. Year in footer -----
  var y = $('#year');
  if (y) y.textContent = new Date().getFullYear();
})();
