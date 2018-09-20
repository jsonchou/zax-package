export default {
    proEnv(val, ...args) {
        let me = this;
        // console.log('me', me)
        //根据用户设备环境，动态处理cms地址
        if (args && args.length && args[0] === false) {
            let tag = 'm';
            if (_zax.device.app) {
                tag = 'a';
            } else if (_zax.device.weixin) {
                tag = 'wx';
            }
            val = val.replace(/m.z|a.z|wx.z/g, match => {
                return tag + '.z'
            });
        }

        if (val.indexOf('bizOrigin') > -1) {
            return val;
        }

        let div = ""

        if (val.indexOf('?') > -1) {
            div = "&"
        } else {
            div = "?";
        }

        val += (div + 'bizOrigin=' + _util.url.get('bizOrigin'));
        return val;
    },
    prefixZero(val, ...args) {
        if ((val + '').length == 1) {
            return '0' + val;
        }
        return val;
    },
    FixedFloat(str, len = 2) {
        return parseFloat(str).toFixed(len);
    },
    removeZero(val, ...args) {
        let arr = val.split(':');
        return arr[0] + ':' + arr[1];
    },
    removeUnit(val, ...args) {
        let arr = val.replace('元', '');
        return arr;
    },
    gapTime(val, ...args) {
        let len = ('' + val).length;
        val = '0'.repeat(4 - len) + val;
        let res = val.split('').map(item => {
            if (item == '.') {
                return `<i>.</i>`
            } else {
                return `<b>${item}</b>`;
            }
        });
        return res.join('');
    },
    gapBricks(val, node = true) {
        let len = ('' + val).length;
        val = '0'.repeat(3 - len) + val;
        let res = val.split('').map(item => {
            return node ? `<b>${item}</b>` : `${item}`
        });
        return res.join('');
    }
}