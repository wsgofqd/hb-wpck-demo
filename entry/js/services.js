const server = "http://192.168.62.165:8080/daily";
mui.extend(mui.ajaxSettings, {
    processData: true,
    cache: false,
    dataType: 'json',
    timeout:6000,
    beforeSend: (xhr, settings) => {
        let url = server + settings.url;
        settings.url = url;
    },
    error: (err,type,xhr,settings) => {
        mui.alert('连接不到服务器');
        console.log("type："+type);
        console.log("url:"+settings.url);
    }
});

function net(url, type, data, success, config) {
    if(mui.isFunction(data)) {
        config = success;
        success = data || mui.noop;
    }
    mui.ajax(url, mui.extend({
        type,
        data,
        success
    }, config));
}
const ajax = {
    get: (url, data, success, config) => net(url, 'get', data, success, config),
    post: (url, data, success, config) => net(url, 'post', data, success, config)
};

export const loginService = {
    login: (user, callback) => ajax.get('/login/login', user, callback)

};

export const userService = {
    find: (data, callback) => ajax.post('/user/find', data, callback),
    bindqq: (data, callback) => ajax.post('/user/bindqq', data, callback)
}