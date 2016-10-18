<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <h1 class="mui-title">标题</h1>
            <button type='button' class=" mui-pull-right mui-btn-link" @tap="showSetting"><span class="mui-icon mui-icon-gear"></span></button>
        </header>
        <div class="mui-content">
            <ul class="mui-table-view">
                <li class="mui-table-view-cell mui-collapse">
                    <a class="mui-navigate-right" href="#">面板1</a>
                    <div class="mui-collapse-content">
                        <p>面板1子内容</p>
                    </div>
                </li>
                <li class="mui-table-view-cell mui-collapse">
                    <a class="mui-navigate-right" href="#">面板</a>
                    <div class="mui-collapse-content">
                        <p>面板2子内容</p>
                    </div>
                </li>
                <li class="mui-table-view-cell mui-collapse">
                    <a class="mui-navigate-right" href="#">面板3</a>
                    <div class="mui-collapse-content">
                        <p>面板3子内容</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        methods: {
            showSetting() {
                mui.openWindow({
                    url: 'setting.html',
                    id: 'setting.html'
                })
            }
        }
    }
</script>