<script setup>
import SidebarRoute from './SidebarRoute.vue'
const props = defineProps(['routes', 'pathIcons'])
</script>

<template>
  <aside class="fixed top-0 left-0 w-80 h-full sidebar custom-margin" id="sidebarWrapper" aria-label="Sidenav">
    <div class="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 hidden-padding" id="sidebar">
      <ul class="space-y-2">
        <SidebarRoute v-for="item in props.routes" :key="item.text" :route="item" :pathIcons="pathIcons" :showIndentation="false" :isTopLevel="true">
          {{ item.text }}
        </SidebarRoute>
      </ul>
    </div>
  </aside>
</template>
<style scoped>
@media only screen and (min-width: 720px) {
  .custom-margin {
    margin-top: 58px;
    padding-bottom: 58px;
  }
}
</style>
