const fs = require('fs');
const path = require("path");

const tpl_vue = `<template>
    <div>
    </div>
</template>
<script>
    export default {
        data() {
                return {
                }
            },
            methods: {
            }
    }
</script>`;

const tpl_js = name => `
mui.init();
mui.plusReady(() => {
    const App=require('./vue/${name}')
    new vue({
        el: '#app',
        render: h => h(App)
    });
});`

const log = e => e && console.log(e);

module.exports = {
    clean: function(dir, pattern) {
        fs.readdirSync(dir).forEach(f => {
            if(!pattern || pattern.test(f))
                fs.unlink(path.resolve(dir, f), log);
        });
    },
    vue: function(f) {
        fs.writeFileSync(f, tpl_vue, {
            encoding: 'utf8'
        });
    },
    js: function(f, vue) {
        fs.writeFileSync(f, tpl_js(vue), {
            encoding: 'utf8'
        });
    }
}