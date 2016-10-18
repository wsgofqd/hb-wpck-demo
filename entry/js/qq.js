export default {
    get() {
            if(mui.os.android) {
                var main = plus.android.runtimeMainActivity();
                var packageManager = main.getPackageManager();
                var PackageManager = plus.android.importClass(packageManager)
                try {
                    return packageManager.getPackageInfo("com.tencent.mobileqq", PackageManager.GET_ACTIVITIES);
                } catch(e) {}
            } else {
                const TencentOAuth = plus.ios.import("TencentOAuth");
                return TencentOAuth.iphoneQQInstalled();
            }
        },
        login(callback) {
            plus.oauth.getServices(services => {
                    const auth = services.filter(s => s.id == 'qq')[0];
                    const waiting = plus.nativeUI.showWaiting();
                    auth.login(() => {
                        waiting.close();
                        plus.nativeUI.toast("登录认证成功");
                        auth.getUserInfo(() => {
                            callback(auth.authResult.openid);
                        }, e => plus.nativeUI.toast("获取用户信息失败：" + e.message));
                    });
                },
                e => mui.toast("获取登录认证失败：" + e.message)
            );
        }
};