<template>
    <transition name="opacity">
        <div class="md-popup" @click="onCloseMask" v-if="$parent.popStatus.weixinmask">
            <img :src="cfg.assetsPath+'/images/weixinmask.png'">
        </div>
    </transition>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        methods: {
            onCloseMask(e) {
                let me = this;
                me.$parent.setPopStatus({
                    weixinmask: false,
                });
            }
        },
        created() {
            let me = this;
        },
    }
</script>
<style lang="scss" scoped>
    div {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        img {
            width: r(423);
            height: r(273);
            float: right;
            margin: r(28) r(24) 0 0;
        }
    }
</style>