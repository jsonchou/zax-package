<template>
    <div class="pop-placeholder">
        <ui-login></ui-login>
        <ui-weixin-mask></ui-weixin-mask>
        <ui-end></ui-end>
    </div>
</template>

<script>
    import mixins from "../api/mixins";
    import Login from './Login';
    import WeixinMask from './weixinmask';
    import End from './End';

    export default {
        components: {
            UiLogin: Login,
            UiWeixinMask: WeixinMask,
            UiEnd: End
        },
        mixins: [ mixins ],
        data() {
            return {
                isApp: false, // 是否为app 环境
                isIos: false,
            }
        },
        watch: {
        },
        methods: {
        },
        mounted() {
            let me = this;
            if(_zax.device.app) me.isApp = true; // 判断此活动所处的环境
            if(_zax.device.iphone) me.isIos = true;
        },
        updated() {
        },
        beforeDestory() {
            let me = this;
        }
    }
</script>