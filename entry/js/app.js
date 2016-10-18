export default {
    /**
     * 获取当前状态
     **/
    getState() {
            var stateText = localStorage.getItem('$state') || "{}";
            return JSON.parse(stateText);
        },
        createState(user, callback) {
            var state = getState();
            state.email = user.email;
            state.name = user.name;
            state.qqid = user.qqid;
            setState(state);
            return callback();
        },

        /**
         * 设置当前状态
         **/
        setState(state) {
            state = state || {};
            localStorage.setItem('$state', JSON.stringify(state));
        },

        /**
         * 获取应用本地配置
         **/
        setSettings(settings) {
            settings = settings || {};
            localStorage.setItem('$settings', JSON.stringify(settings));
        },

        /**
         * 设置应用本地配置
         **/
        getSettings() {
            var settingsText = localStorage.getItem('$settings') || "{}";
            return JSON.parse(settingsText);
        },

        doubleExit() {
            var backButtonPress = 0;
            mui.back = function(event) {
                backButtonPress++;
                if(backButtonPress > 1) {
                    plus.runtime.quit();
                } else {
                    mui.toast('再按一次退出应用');
                }
                setTimeout(() => backButtonPress = 0, 800);
                return false;
            };
        },

        toMain() {
            const win = mui.openWindow('main.html');
            mui.closeOpened(win);
        }
}
//export default {
//  getState,
//  setState,
//  createState,
//  getSettings,
//  setSettings,
//  toMain,
//  doubleExit
//}