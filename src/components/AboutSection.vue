<script setup lang="ts">
    import { ref } from 'vue'
    const firstName = ref('Hillary')
    const lastName = ref('Yang')
    const bio = ref('Stanford CS/Math')
    const showBio = ref(true)

    const links = ref([
        { icon: 'fa-solid fa-envelope', href: 'mailto:hillaryy@stanford.edu'},
        { icon: 'fa-brands fa-github', href: 'https://github.com/hillaryyang'},
    ])
</script>

<template>
    <section id="about" class="flex flex-col justify-center items-end px-6 gap-6">
        <div class="flex flex-col items-end">
            <h1 style="font-family: 'Newsreader', sans-serif; background: linear-gradient(to right, #ff6b6b, #ff8c5a, #ffa94d, #ffc84d, #ffe066, #a8e06a,
   #69db7c, #4dc9a0, #4dabf7); -webkit-background-clip: text; -webkit-text-fill-color: transparent;" class="text-6xl font-bold">
                {{ firstName }}
            </h1>
            <h2 style="font-family: 'Newsreader', sans-serif;" class="text-6xl font-bold">
                {{ lastName }}
            </h2>
        </div>
        <p v-if="showBio" style="font-family: 'Basic', sans-serif;" class="text-xl text-gray-500">{{ bio }}</p>
        <div class="flex gap-4">
            <a v-for="link in links" :href="link.href" class="text-4xl text-gray-600 hover:text-black">
                <i :class="link.icon"></i>
            </a>
        </div>
    </section>
</template>