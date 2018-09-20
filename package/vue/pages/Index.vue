<template>
    <div :class="[ 'pg-teamplate', ` template-${pageName} ` ]">
        <button v-if="!hasLogin" @click="handleClick('login')">一键登陆</button>
        <button @click="handleClick('weixinmask')">微信分享</button>
        <button @click="handleClick('endMask')">活动已结束</button>
    </div>
</template>

<script>
    import mixins from "../api/mixins";

    export default {
        mixins: [ mixins ],
        components: {
        },
        data() {
            return {
                hasLogin: false
            }
        },
        methods: {
            _initPage() {
                let me = this;
                this.hasLogin = _zax.cookie.get(me.cfg.token);
            },
            handleClick(key) {
                let me = this;
                me.setPopStatus({
                    [key]: true
                });
            },
        },
        created() {
            let me = this;
        },
        mounted() {
            let me = this;
            me._initPage();
        },
        updated() {},
        beforeDestroy() {
            let me = this;
        },
        destroyed() {
            let me = this;
        }
    };
</script>

<style lang="scss">
    button {
        font-size: r(30);
        -webkit-appearance: none;
        background: #12c287;
        color: #FFF;
        border: none;
        outline: none;
        margin: r(50) auto;
        display: block;
    }
</style>