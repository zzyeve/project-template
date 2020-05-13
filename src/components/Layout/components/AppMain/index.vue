<template>
  <div class="main">
    <!-- <AppHeader></AppHeader> -->
    <Sidebar></Sidebar>
    <div class="main-content">
        <div class="breadcrumb">
            <Breadcrumb></Breadcrumb>
        </div>
        <div class="content">
            <transition name="fade-transverse">
                <keep-alive :include="cacheList">
                    <router-view :key="$route.path"></router-view>
                </keep-alive>
            </transition>
        </div>
      
    </div>
  </div>
</template>

<script>
import Breadcrumb from "../Breadcrumb"
import Sidebar from "../SideBar"
export default {
    components: {
        Sidebar,
        Breadcrumb
    },
    data() {
        return {
            cacheList: []
        }
    }
}
</script>

<style lang="scss" scoped>
.main {
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: row;

  &-content {
    height: 100%;
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 12px;
    .content {
        flex: 1;
        overflow-y: auto;
    }
  }
}
// 过渡动画 横向渐变
.fade-transverse-leave-active,
.fade-transverse-enter-active {
  transition: all 0.5s;
}
.fade-transverse-enter,
.fade-transverse-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>
