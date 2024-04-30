<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    fileColor: 'black' | 'white'
}>();

const computedFileColor = computed((): string => {
    return props.fileColor === 'black' ? '#b58863' : '#f0d9b5';
});
</script>

<template>
    <div class="chess-file" />
</template>

<style scoped>
.chess-file {
    width: 70px;
    height: 70px;
    background-color: v-bind('computedFileColor');
    border: 1px solid white;
}
</style>
