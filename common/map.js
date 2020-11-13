// 地图路径规划 经纬度 城市名称
export  openMapRoute(lat, lon, cityName) {
    var url = '';
    if (plus.os.name == 'Android') {
        var hasBaiduMap = plus.runtime.isApplicationExist({
            pname: 'com.baidu.BaiduMap',
            action: 'baidumap://'
        });
        var hasAmap = plus.runtime.isApplicationExist({
            pname: 'com.autonavi.minimap',
            action: 'androidamap://'
        });
        var urlBaiduMap = 'baidumap://map/marker?location=' + lat + ',' + lon + '&title=' + cityName + '&src=婚梯';
        var urlAmap = 'androidamap://viewMap?sourceApplication=婚梯&poiname=' + cityName + '&lat=' + lat + '&lon=' + lon +
            '&dev=0';
        if (hasAmap && hasBaiduMap) {
            plus.nativeUI.actionSheet({
                title: '选择地图应用',
                cancel: '取消',
                buttons: [{
                    title: '百度地图'
                }, {
                    title: '高德地图'
                }]
            }, function(e) {
                switch (e.index) {
                    case 1:
                        plus.runtime.openURL(urlBaiduMap);
                        break;
                    case 2:
                        plus.runtime.openURL(urlAmap);
                        break;
                }
            });
        } else if (hasAmap) {
            plus.runtime.openURL(urlAmap);
        } else if (hasBaiduMap) {
            plus.runtime.openURL(urlBaiduMap);
        } else {
            url = 'geo:' + lat + ',' + lon + '?q=%e6%95%b0%e5%ad%97%e5%a4%a9%e5%a0%82';
            plus.runtime.openURL(url); //如果是国外应用，应该优先使用这个，会启动google地图。这个接口不能统一坐标系，进入百度地图时会有偏差
        }
    } else {
        // iOS上获取本机是否安装了百度高德地图，需要在manifest里配置，在manifest.json文件app-plus->distribute->apple->urlschemewhitelist节点下添加（如urlschemewhitelist:["iosamap","baidumap"]）
        plus.nativeUI.actionSheet({
            title: '选择地图应用',
            cancel: '取消',
            buttons: [{
                title: 'Apple地图'
            }, {
                title: '百度地图'
            }, {
                title: '高德地图'
            }]
        }, function(e) {
            console.log('e.index: ' + e.index);
            switch (e.index) {
                case 1:
                    url = 'http://maps.apple.com/?q=%e6%95%b0%e5%ad%97%e5%a4%a9%e5%a0%82&ll=' + lat + ',' + lon +
                        '&spn=0.008766,0.019441';
                    break;
                case 2:
                    url = 'baidumap://map/marker?location=' + lat + ',' + lon + '&title=' + cityName + '&src=婚梯';
                    break;
                case 3:
                    url = 'iosamap://viewMap?sourceApplication=婚梯&poiname=' + cityName + '&lat=' + lat + '&lon=' + lon + '&dev=0';
                    break;
                default:
                    break;
            }
            if (url != '') {
                plus.runtime.openURL(url, function(e) {
                    plus.nativeUI.alert('本机未安装指定的地图应用');
                });
            }
        });
    }
},