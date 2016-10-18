<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <h1 class="mui-title">登录</h1>
        </header>
        <div class="mui-content">
            <form id='login-form' class="mui-input-group">
                <div class="mui-input-row">
                    <label>账号</label>
                    <input id='account' type="text" v-model='user.account' class="mui-input-clear mui-input" placeholder="请输入电子邮件">
                </div>
                <div class="mui-input-row">
                    <label>密码</label>
                    <input id='password' type="password" class="mui-input-clear mui-input" v-model="user.passwd" placeholder="请输入密码">
                </div>
            </form>

            <div class="mui-content-padded">
                <button id='login' class="mui-btn mui-btn-block mui-btn-primary" @tap="login">登录</button>
            </div>
            <div class="mui-content-padded oauth-area" v-if="qq">
                <button type="button" class="oauth-btn" style="background-image: url('images/qq.png');" @tap='qqLogin'></button>
            </div>
        </div>
    </div>
</template>
<style>
    .oauth-area {
        position: absolute;
        bottom: 20px;
        left: 0px;
        text-align: center;
        width: 100%;
        padding: 0px;
        margin: 0px;
    }

    .oauth-area .oauth-btn {
        display: inline-block;
        width: 50px;
        height: 50px;
        background-size: 30px 30px;
        background-position: center center;
        background-repeat: no-repeat;
        margin: 0px 20px;
        /*-webkit-filter: grayscale(100%); */
        border: solid 1px #ddd;
        border-radius: 25px;
    }

    .oauth-area .oauth-btn:active {
        border: solid 1px #aaa;
    }
</style>

<script>
    import app from 'app'
    import qq from '../js/qq'
    import {
        loginService,
        userService
    } from '../js/services'

    const bindAccount = (qqid) => {
        mui.prompt('请输入您的邮箱地址', '@itshixun.com', '账户绑定I', ['确定'], e => {});
    }
    export default {
        data() {
                return {
                    user: {
                        account: 'wangshg@itshixun.com',
                        passwd: '111111'
                    },
                    qq: !!qq.get()
                }
            },
            methods: {
                login() {
                    loginService.login(this.user, rt => {
                        rt.success ? app.createState(rt.user, app.toMain) : mui.alert('账号或密码错误');
                    });
                },
                qqLogin() {
                    qq.login(qqid => {
                        userService.find({
                            qqid
                        }, rt => {
                            rt.user ? app.createState(rt.user, app.toMain) : mui.openWindow({
                                url: 'user.bind.html',
                                id: 'user.bind.html',
                                extras: {
                                    qqid
                                }
                            });
                        });
                    });
                }
            }

    };
</script>