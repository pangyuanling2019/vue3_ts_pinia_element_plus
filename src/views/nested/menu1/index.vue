<template>
  <div class="app-container">
    <p>θεδΈ</p>
    <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>


