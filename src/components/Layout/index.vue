<template>
    <div class="layout">
        <AppHeader></AppHeader>
        <AppMain></AppMain>
    </div>
</template>

<script>
import AppHeader from "./components/AppHeader"
import AppMain from "./components/AppMain"
export default {
  components: {
    // SideBar,
    AppMain,
    AppHeader
  }
}
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>