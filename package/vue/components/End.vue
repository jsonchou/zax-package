<template>
    <transition name="opacity">
        <div class="md-popup" v-if="$parent.popStatus.endMask">
            <p class="tc f28">Sorry!<br>来晚了一步，活动已结束。</p>
        </div>
    </transition>
</template>
<style lang="scss" scoped>
    div {
        top: 10%;
        transform: translateX(-50%);
        color: #FFF;
    }
</style>