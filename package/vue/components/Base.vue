<template>
    <div class="base-placeholder">
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        methods: {

        },
        async beforeCreate() {
            console.log('base beforeCreate')
            let me = this;
            const token = _zax.cookie.get(me.cfg.token);

            _zax.use(["ilog"], () => {
            });

            token && me.$parent.setUserCode(token);

            const { dmAccountTicket, dmNoRedirect } = me.storage.cookieNames;

            //14分钟refershAccessKey
            setInterval(async () => {
                let ck = _zax.cookie.get(me.cfg.token);
                
                if (ck) {
                    try {
                        let res = await me.service.refreshAccessKey(me)
                        if (res.code == 200) {
                            me.$parent.setUserCode(ck);
                        } else {
                            me.$parent.setUserCode("");
                            _zax.cookie.del(me.cfg.token);
                            _zax.cookie.del(dmAccountTicket);
                            _zax.cookie.del(dmNoRedirect);
                        }
                    } catch(err) {
                        me.setUserCode("");
                        _zax.cookie.del(me.cfg.token);
                        _zax.cookie.del(dmAccountTicket);
                        _zax.cookie.del(dmNoRedirect);
                        console.warn('err', err);
                    }
                    
                }
            }, 1000 * 60 * 14);

        },
        created() {
            let me = this;
            console.log('base created')

        },
    }
</script>