export default {
    media: {
        play(id) {
            let media = document.getElementById(id);
            if (_zax.device.weixin) {

                let _evt = () => {
                    wx.config({
                        debug: false,
                    });
                    wx.ready(function () {
                        media && media.play();
                    })
                }

                if (!window.wx) {
                    let timer = setInterval(() => {
                        if (window.wx) {
                            clearInterval(timer)
                            _evt();
                        }
                    }, 100)
                } else {
                    _evt();
                }

            } else {
                media && media.play();
            }
        },
        pause(id) {
            let media = document.getElementById(id);
            if (_zax.device.weixin) {
                let _evt = () => {
                    wx.config({
                        debug: false,
                    });
                    wx.ready(function () {
                        media && media.pause();
                    })
                }

                if (!window.wx) {
                    let timer = setInterval(() => {
                        if (window.wx) {
                            clearInterval(timer)
                            _evt();
                        }
                    }, 100)
                } else {
                    _evt();
                }
            } else {
                media && media.pause();
            }
        }
    },
    file: {
        base64(url, way = 'filereader', format = 'jpg') {
            // image/png, image/jpeg, image/jpg, image/gif, image/bmp, image/tiff, image/x-icon, image/svg+xml, image/webp, image/xxx
            // image/png, image/jpeg, image/webp
            if (way == 'filereader') {
                return fetch(url)
                    .then(response => response.blob())
                    .then(blob => new Promise((resolve, reject) => {
                        const reader = new FileReader()
                        reader.onloadend = () => resolve(reader.result)
                        reader.onerror = function (error) {
                            reject(error)
                        }
                        reader.readAsDataURL(blob)
                    }))
            } else if (way == 'canvas') {
                return new Promise(function (resolve, reject) {
                    let img = new Image();
                    img.src = url;
                    img.crossOrigin = 'Anonymous';
                    img.onload = function () {
                        let canvas = document.createElement('CANVAS');
                        let ctx = canvas.getContext('2d');
                        let dataURL;
                        canvas.height = this.naturalHeight;
                        canvas.width = this.naturalWidth;
                        ctx.drawImage(this, 0, 0);
                        dataURL = canvas.toDataURL('image/' + format);
                        resolve(dataURL)
                    };
                    img.onerror = function (error) {
                        reject(error)
                    }

                    if (img.complete || img.complete === undefined) {
                        img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
                    }
                })

            } else if (way == "server") {
                return new Promise(function (resolve, reject) {
                    $.ajax({
                        url: `//mip.zhongan.com/venus/imgToBase64`,
                        type: 'GET',
                        dataType: 'jsonp',
                        data: {
                            imgUrl: encodeURIComponent(url),
                            type: format
                        },
                    }).done(res => {
                        resolve(res)
                    }).fail(error => {
                        console.log(error)
                        reject(error)
                    })
                })
            }
        },
    },
    string: {
        camelcase: str => {
            return str.toLowerCase()
                .replace(/[-_]+/g, ' ')
                .replace(/[^\w\s]/g, '')
                .replace(/ (.)/g, function ($1) {
                    return $1.toUpperCase();
                })
                .replace(/\s+/g, '');
        },
        constantcase: str => {
            return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1_').toUpperCase()
        },
        prefixZero: n => {
            n = n.toString()
            return n[1] ? n : '0' + n
        }
    },
    event: {
        lazy(me = {}, getter = "", key = 'id', cb) {
            if (me[getter] && me[getter][key]) {
                cb && cb();
            } else {
                let timer = setInterval(() => {
                    if (me[getter] && me[getter][key]) {
                        cb && cb();
                        clearInterval(timer)
                    }
                }, 20)
            }
        },
        lazyAntifraud(cfg, cb) {
            if (cfg.antifraud.tail.seraph_did) {
                cb && cb();
            } else {
                let timer = setInterval(() => {
                    if (cfg.antifraud.tail.seraph_did) {
                        cb && cb();
                        clearInterval(timer)
                    }
                }, 20)
            }
        },
        antifraud(open, provider, module, debug, code, cb) {
            //反欺诈
            if (!open) {
                return;
            }
            if (provider === 'seraph') {
                dunkey.run(module + '#' + (debug ? 'test' : 'prd') + '#' + code, //场景id
                    {
                        ana: {
                            host: 'https://' + (debug ? 'test-' : '') + 'af.zhongan.io/trace.jsonp',
                            path: ''
                        },
                        is_af: true, //是否以反欺诈模式接入
                    },
                    function (did, token) {
                        //did 为设备指纹， token 为会话token 
                        //did 和 token 将带入到业务数据中传入到服务端
                        //console.log('getdid', did, 'token', token);
                        $('body').append("<input type='hidden' id='seraph_did' value='" + did + "' /><input type='hidden' id='seraph_token' value='" + token + "' />");
                        if (!window.dunkey.did) {
                            //王明博代码补充
                            window.dunkey.did = did;
                        }
                        cb && cb({
                            did: did,
                            token: token
                        });
                    });
            } 
        }
    },
    url: {
        set: function (url, tag, tagV) { //重新拼接URL
            var search = ''

            if (url) { // url 截取 search
                url = url.split('?')[1];
                search = url.split('#')[0];
            } else {
                search = decodeURIComponent(location.search);
            }

            var seaArr = [];
            if (search) {
                search = search.replace('?', '');
                seaArr = search.split('&');
                for (var i = 0; i < seaArr.length; i++) {
                    var item = seaArr[i].split('=');
                    if (item[0].toLowerCase() == tag.toLowerCase()) {
                        seaArr[i] = (tag + '=' + tagV); //修改标识，不做边界值删除校验
                        break;
                    }
                }
                //追加标识
                if (seaArr.join('&').toLowerCase().indexOf(tag.toLowerCase() + '=') == -1) {
                    seaArr.push(tag + '=' + tagV); //不做边界值校验
                }
            }

            if (seaArr.length) {
                //追加标识
                return location.origin + location.pathname + '?' + seaArr.join('&') + (location.hash || '');
            }
            return location.href;
        },
        del: function (url, tag) {
            var search = ''

            if (url) { // url 截取 search
                url = url.split('?')[1];
                search = url.split('#')[0];
            } else {
                search = decodeURIComponent(location.search);
            }

            if (search) {
                search = search.replace('?', '');
                var seaArr = search.split('&');
                for (var i = 0; i < seaArr.length; i++) {
                    var item = seaArr[i].split('=');
                    if (item[0].toLowerCase() == tag.toLowerCase()) {
                        seaArr.splice(i, 1); //删除标识
                        break;
                    }
                }
                return location.origin + location.pathname + '?' + seaArr.join('&') + (location.hash || '');
            }
            return location.href;
        },
    },
}