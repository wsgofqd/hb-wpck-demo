<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">设置</h1>
        </header>
        <div class="mui-content">
            <ul class="mui-table-view mui-table-view-chevron">
                <li class="mui-table-view-cell">
                    <a href="#lock" class="mui-navigate-right">修改密码</a>
                </li>
            </ul>
            <ul class="mui-table-view">
                <li class="mui-table-view-cell" style="text-align: center;">
                    <a href='#' @tap='exit'>退出</a>
                </li>
            </ul>
        </div>
        <div id="exit" class="mui-popover mui-popover-action mui-popover-bottom">
            <ul class="mui-table-view">
                <li class="mui-table-view-cell">
                    <a href="#" @tap="logout">注销</a>
                </li>
                <li class="mui-table-view-cell">
                    <a href="#" @tap="quit">退出</a>
                </li>
            </ul>
            <ul class="mui-table-view">
                <li class="mui-table-view-cell">
                    <a href="#exit"><b>取消</b></a>
                </li>
            </ul>
        </div>
    </div>

</template>
<script>
    import app from 'app'
    const showLogin = () => app.createState({}, () => mui.openWindow('login.html'));
    export default {
        data() {
                return {}
            },
            methods: {
                exit() {
                    if(mui.os.ios) {
                        showLogin();
                    } else
                        mui('#exit').popover('toggle');
                },
                logout: showLogin,
                quit() {
                    plus.runtime.quit();
                }
            }
    }
</script>