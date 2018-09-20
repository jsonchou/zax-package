<template>
  <div :class="'page-'+pageName">
    <div id="app">
      <ui-base></ui-base>
      <ui-pop></ui-pop>
      <!--弹窗组-->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" :ref="$route.meta.name"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" :ref="$route.meta.name"></router-view>
    </div>
  </div>
</template>

<script>
  import mixins from "./api/mixins";
  import Base from "./components/Base";
  import Pop from "./components/Pop";

  export default {
    mixins: [ mixins ],
    components: {
      UiPop: Pop,
      UiBase: Base,
    },
    created() {
      let me = this;
      me.initShare();
    }
  };
</script>