<script setup lang="ts">
import AboutSection from '../components/AboutSection.vue'
import ProjectsSection from '../components/ProjectsSection.vue';
import BioSection from '../components/BioSection.vue'
</script>

<template>
    <div>
        <div class="flex gap-12 items-center px-20">
            <AboutSection />
            <BioSection />
        </div>
        <ProjectsSection />
    </div>
</template>