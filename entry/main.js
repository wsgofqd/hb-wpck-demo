import app from 'app'
mui.init();
mui.plusReady(() => {
    app.doubleExit();
    const App = require('./vue/main');
    new vue({
        el: '#app',
        render: h => h(App)
    });
});