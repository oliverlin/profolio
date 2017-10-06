import anime from 'animejs'
import $ from 'webpack-zepto'

anime({
  targets: 'div.target',
  translateX: [
    { value: 100, duration: 1200 },
    { value: 0, duration: 800 }
  ],
  rotate: '1turn',
  backgroundColor: '#FFF',
  duration: 6000,
  loop: false
})
anime({
  targets: '.shape .stx',
  duration: 1500,
  strokeDashoffset: [anime.setDashoffset, 0],
  // strokeDashoffset: {
  //   value: [anime.setDashoffset, 0],
  //   duration: 6000,
  //   delay: function(el, i, t) { return 700 + ( i * 100 ); },
  //   easing: 'easeOutQuart'
  // },
  easing: 'easeInOutSine',
  delay: function(el, i) { return i * 250 },
  direction: 'alternate',
  loop: false
})
