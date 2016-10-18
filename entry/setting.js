mui.init();
mui.plusReady(() => {
    const App = require('./vue/setting');
    new vue({
        el: '#app',
        render: h => h(App)
    });
});