<script setup lang="ts">
    import { ref } from 'vue'
    
    const interests = ref([
        { name: 'cubing', color: '#FF4D4D'},
        { name: 'crosswords', color: '#4D79FF'},
        { name: 'consuming', color: '#FF9F4D'},
        { name: '(c)research', color: '#4DFF91'},
    ])
</script>

<template>
    <section class="min-h-screen flex flex-col items-center justify-center gap-8 px-6">
        <div class="grid grid-cols-2 gap-6">
            <div v-for="interest in interests" :style="{ backgroundColor: interest.color }" class="w-80 h-80 flex flex-col items-center justify-center rounded-2xl cursor-pointer text-white">
                <span style="font-family: 'basic', sans-serif;" class="text-5xl">{{ interest.name }}</span>
            </div>
        </div>
    </section>
</template>