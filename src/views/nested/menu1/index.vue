<template>
  <div class="app-container">
    <p>菜单一</p>
    <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>


