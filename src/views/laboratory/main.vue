<!--  -->
<template>
  <div class='laboratory'>
    <transition name="fade"
      mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<style scoped>
.laboratory {
  height: 100%;
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  top: 0px;
  background: #fafafa;
  z-index: 10000;
}
</style>