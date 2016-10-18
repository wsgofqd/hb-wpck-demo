<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <h1 class="mui-title">个人信息</h1>
        </header>
        <div class="mui-content">
            <form class="mui-input-group">
                <div class="mui-input-row ">
                    <input type="email" class="mui-input-clear" placeholder="电子邮件地址" v-model='user.email'>
                </div>
                <div class="mui-input-row">
                    <input type="password" placeholder="密码" v-model='user.passwd'>
                </div>
            </form>
            <div class="mui-content-padded">
                <button type="button" class="mui-btn mui-btn-block mui-btn-primary" @tap="bind">绑定</button>
            </div>
        </div>
    </div>
</template>
<script>
    import app from 'app'
    import {
        userService
    } from '../js/services'

    var self = plus.webview.currentWebview();
    export default {
        data() {
                return {
                    user: {
                        email: '',
                        passwd: '',
                        qqid: self.qqid
                    }
                }
            },
            methods: {
                bind() {
                    userService.bindqq(this.user, rt => {
                        rt.success ? app.createState(rt.user, app.toMain) : mui.alert("电子邮件或密码错误，不能绑定")
                    });
                }
            }
    }
</script>