mui.init();
mui.plusReady(() => {
      const App = require('./vue/user.bind');
    new vue({
        el: '#app',
        render: h => h(App)
    });
});