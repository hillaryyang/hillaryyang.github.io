<script setup lang="ts">
import AboutSection from '../components/AboutSection.vue'
import ProjectsSection from '../components/ProjectsSection.vue';
import BioSection from '../components/BioSection.vue'

/*const showArrow = ref(true)

function handleScroll() {
    showArrow.value = window.scrollY > 50 ? false : true
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))*/

</script>

<template>
    <div>
        <div class="flex gap-12 items-center justify-center min-h-screen px-20 -mt-14">
            <AboutSection />
            <BioSection />
        </div>
        <!--<div v-if="showArrow" class="flex justify-center pb-8 -mt-16">
            <a href="#projects" class="text-4xl text-gray-400 hover:text-gray-700">&#8964;</a>
        </div>-->
        <ProjectsSection />
    </div>
</template>