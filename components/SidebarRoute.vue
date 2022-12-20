<script setup lang="ts">
import { computed } from 'vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const showChildren = ref(false)
const router = useRouter()
const props = defineProps<{
  route: any
  pathIcons: any
  showIndentation: boolean
  isTopLevel: boolean
}>()

const navigateToPage = () => {
  if (!props.route.link) {
    showChildren.value = !showChildren.value
  }
  if (props.route.link) {
    router.push({ path: props.route.link })
  }
}

//Check if actual url includes props.route.link
const isActive = computed(() => {
  if ((!props.route.link || props.route.link.includes('index')) && router.currentRoute.value.path.includes(props.route.text)) {
    const decodedUri = decodeURI(router.currentRoute.value.path)
    const splittedItems = decodedUri.split('/')
    const foundItem = splittedItems.find((item) => item === props.route.text)
    if (foundItem) {
      showChildren.value = true
      return true
    }
  }

  if (props.route.link && router.currentRoute.value.path) {
    let modifiedRoute = props.route.link
    if (props.route.link.includes('index')) {
      modifiedRoute = props.route.link.replace('index', '')
    }
    const decodedUri = decodeURI(router.currentRoute.value.path)
    const lastDotPathIndex = decodedUri.lastIndexOf('.')
    const routePathIndex = modifiedRoute.lastIndexOf('.')
    const result = lastDotPathIndex > 0 ? decodedUri.slice(0, lastDotPathIndex).includes(modifiedRoute.slice(0, routePathIndex)) : decodedUri.includes(modifiedRoute.slice(0, routePathIndex))
    if (result) {
      showChildren.value = result
    }
    return result
  }
  return false
})

const pathIcon = computed(() => {
  if (props.pathIcons) {
    const foundItem = props.pathIcons.find((item) => {
      return item.split('.')[0].split('/').pop() === props.route.text
    })

    return foundItem
  }
})

const uppercaseFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}
</script>

<template>
  <div :style="{ paddingLeft: props.showIndentation ? '8px' : '6px' }">
    <button
      type="button"
      class="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-900"
      @click="navigateToPage"
    >
      <div class="h-full w-6">
        <img v-if="props.isTopLevel && pathIcon" :src="pathIcon" />
        <svg v-if="props.isTopLevel && !pathIcon" width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.5 3C12.9045 3 13.6067 3 14.1111 3.33706C14.3295 3.48298 14.517 3.67048 14.6629 3.88886C15 4.39331 15 5.09554 15 6.5V16C15 17.8856 15 18.8284 14.4142 19.4142C13.8284 20 12.8856 20 11 20H5C3.11438 20 2.17157 20 1.58579 19.4142C1 18.8284 1 17.8856 1 16V6.5C1 5.09554 1 4.39331 1.33706 3.88886C1.48298 3.67048 1.67048 3.48298 1.88886 3.33706C2.39331 3 3.09554 3 4.5 3"
            stroke="#9F9F9F"
            stroke-width="2"
          />
          <path d="M5 3C5 1.89543 5.89543 1 7 1H9C10.1046 1 11 1.89543 11 3C11 4.10457 10.1046 5 9 5H7C5.89543 5 5 4.10457 5 3Z" stroke="#9F9F9F" stroke-width="2" />
          <path d="M5 10L11 10" stroke="#9F9F9F" stroke-width="2" stroke-linecap="round" />
          <path d="M5 14L9 14" stroke="#9F9F9F" stroke-width="2" stroke-linecap="round" />
        </svg>
      </div>
      <span class="flex-1 ml-3 text-left whitespace-nowrap" :style="{ fontWeight: isActive ? 700 : 400, color: isActive ? 'var(--c-text-accent)' : 'var(--c-text)' }">{{
        uppercaseFirstLetter(props.route.text)
      }}</span>
      <!-- Down arrow -->
      <svg v-if="props.route.children && props.route.children.length > 0 && !showChildren" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
      <!-- Right arrow -->
      <svg v-if="props.route.children && props.route.children.length > 0 && showChildren" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </button>
    <div v-if="props.route.children && showChildren">
      <SidebarRoute v-for="child in props.route.children" :key="child.id" :route="child" :pathIcons="props.pathIcons" :showIndentation="true" :isTopLevel="false">
        {{ child.text }}
      </SidebarRoute>
    </div>
  </div>
</template>
