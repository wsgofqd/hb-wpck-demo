import app from 'app'

mui.init();
mui.plusReady(() => {
    let App =require( './vue/login')
    app.doubleExit();
    new vue({
        el: '#app',
        render: h => h(App)
    });
});