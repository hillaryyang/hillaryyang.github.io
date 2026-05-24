<script setup lang="ts">
    import { ref } from 'vue'
    
    const interests = ref([
        { name: 'cubing', color: '#e82001'},
        { name: 'crosswords', color: '#65b1e3'},
        { name: 'consuming', color: '#f39202'},
        { name: '(c)research', color: '#52e303'},
        { name: 'cooking', color: '#FFD500'},
        { name: 'composing', color: '#D3D3D3'}
    ])
</script>

<template>
    <section id="projects" style="background-color: aliceblue;" class="flex flex-col items-center justify-center gap-8 pb-16">
        <h2 style="font-family: 'Newsreader', sans-serif;" class="text-5xl font-bold mb-4 mt-13 px-10 text-left w-full">Current Interests</h2>

        <div class="grid grid-cols-3 gap-6">
            <div v-for="interest in interests" :style="{ borderLeftColor: interest.color }" class="interest-card flex items-center px-6 w-60 h-24 bg-white border-l-4 cursor-pointer">
                <span style="font-family: 'basic', sans-serif;" class="text-4xl">{{ interest.name }}</span>
            </div>
        </div>
    </section>
</template>

<style>
.interest-card {
    position: relative;
    transition: transform 0.1s ease
}

.interest-card:active {
    transform: scale(0.97);
    box-shadow: 0 2px 4px rgba(0,0,0,0.15);
}
</style>