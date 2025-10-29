<!-- components/NavMenu.vue -->
<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue'

  type ChildItem = { label: string; icon?: string; path?: string }
  type NavigationMenuItem = { label: string; icon?: string; path?: string; children?: ChildItem[] }

  const props = defineProps<{
    items: NavigationMenuItem[]
  }>()

  const openIndex = ref<number | null>(null)

  function toggle(index: number) {
    openIndex.value = openIndex.value === index ? null : index
  }

  function close() {
    openIndex.value = null
  }

  function onKeydown(e: KeyboardEvent, index: number) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle(index)
    } else if (e.key === 'Escape') {
      close()
    }
  }

  function handleClickOutside(e: MouseEvent) {
    const root = document.getElementById('nav-root')
    if (root && !root.contains(e.target as Node)) close()
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', (e) => e.key === 'Escape' && close())
  })
  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
  })
</script>

<template>
  <nav id="nav-root" class="relative">
    <ul class="flex">
      <li v-for="(item, i) in props.items" :key="item.label" class="relative">
        <!-- Nút top-level -->
        <button
          class="px-4 rounded-lg hover:text-primary active:text-primary transition data-[open=true]:text-primary"
          :data-open="openIndex === i"
          @click.stop="toggle(i)"
          @keydown="onKeydown($event, i)"
          type="button"
          :aria-expanded="openIndex === i"
          :aria-haspopup="!!item.children"
        >
          <span class="inline-flex items-center gap-2 cursor-pointer">
            <i v-if="item.icon" :class="item.icon" />
            {{ item.label }}
            <svg
              v-if="item.children"
              class="size-4 transition-transform"
              :class="{ 'rotate-180': openIndex === i }"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </button>

        <!-- Card children -->
        <transition
          enter-active-class="transition ease-out duration-150"
          enter-from-class="opacity-0 translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-100"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-1"
        >
          <div v-if="item.children && openIndex === i" class="absolute left-0 top-full z-50 mt-2">
            <div
              class="min-w-64 max-w-[22rem] rounded-2xl shadow-xl ring-1 ring-black/5 p-2"
              role="menu"
            >
              <ul class="grid">
                <li v-for="child in item.children" :key="child.label">
                  <a
                    :href="child.path || '#'"
                    class="flex items-start rounded-xl px-3 py-2 cursor-pointer"
                    role="menuitem"
                    @click="close()"
                  >
                    <i v-if="child.icon" :class="child.icon" />
                    <span class="text-sm font-medium">{{ child.label }}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </li>
    </ul>
  </nav>
</template>
