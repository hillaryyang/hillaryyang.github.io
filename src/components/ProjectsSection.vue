<script setup lang="ts">
    import { ref } from 'vue'

    // media section
    const currentIndex = ref<number>(0);
    const media = ref([
        { title: 'Book1', author: 'Author name', cover: 'https://picsum.photos/100/150', link: '#'},
        { title: 'Book2', author: 'Author Name', cover: 'https://picsum.photos/100/150', link: '#'},
        { title: 'Movie title', author: 'Director name', cover: 'https://picsum.photos/100/150', link: '#' },
    ])

    function next() {
        currentIndex.value = (currentIndex.value + 1) % media.value.length;
    }
</script>

<template>
    <section id="projects" style="background-color: aliceblue;" class="items-center justify-center pb-16 pt-10">
        <h2 style="font-family: 'Newsreader', sans-serif;" class="text-5xl font-bold mb-8 px-10 text-left w-full">Currently...</h2>

        <div class="interests-grid w-full overflow-x-auto">
            <!--TOP ROW OF INTERESTS-->
            <div class="interests-grid-top w-full mb-10">
                <!--CUBING CARD-->
                <div class="rounded-xl interest-card bg-white relative overflow-hidden p-4 pt-2 flex flex-col justify-between text-center">
                    <span style="font-family: 'Notable', sans-serif;" class="text-2xl mb-2">cubing</span>
                    <div class="p-1 border border-black self-center mt-1 mb-1">
                        <img src="/src/assets/cubes.jpg" class="w-full object-cover">
                    </div>
                    <p style="font-family: 'Basic', sans-serif;" class="text-sm text-center pt-1">My ever-growing puzzle collection</p>
                </div>
                
                <!--RESEARCH CARD-->
                <div class="rounded-xl interest-card bg-white relative overflow-hidden p-4 pt-3 flex flex-col justify-between text-center">
                    <span style="font-family: 'Gelasio', sans-serif;" class="text-2xl">(c)Researching</span>
                    <div class="flex gap-3">
                        <a href="https://arxiv.org/abs/2410.20630" target="_blank" class="paper-card rounded-lg flex-1 h-45" style="">
                            <div class="p-2 mt-1">
                                <img src="/src/assets/tvd.png" class="w-full object-cover">
                            </div>
                            <span style="font-family: 'Basic', sans-serif;" class="text-center block text-xs">
                                Rubik's cube scrambling number
                            </span>
                            <span style="font-family: 'Basic', sans-serif;" class="text-center block text-xs text-gray-400 italic">
                            How hard is it to mix up the cube?
                            </span>
                        </a>
                        <a href="https://arxiv.org/abs/2412.02578" target="_blank" class="paper-card rounded-lg flex-1 h-45" style="">
                            <div class="p-2 mt-1">
                                <img src="/src/assets/priv.png" class="w-full object-cover">
                            </div>

                            <span style="font-family: 'Basic', sans-serif;" class="text-center block text-xs">
                                Private linear regression
                            </span>
                        </a>
                    </div>
                </div>

                <!--COOKING CARD-->
                <div class=" rounded-xl interest-card bg-white relative p-4 pt-3 flex flex-col text-center">
                    <span style="font-family: 'Pinyon Script', sans-serif;" class="text-3xl">cooking</span>
                    <div class="p-1 border border-black self-center mt-1 mb-1">
                        <img src="/src/assets/food.jpg" class="object-contain max-h-35 block rounded-xl">
                    </div>                    
                <a style="font-family:'Basic', sans-serif;" class="text-center block text-xs">Chinese braised tofu</a>
                </div>
            </div>
            
            <!--BOTTOM ROW OF INTERESTS-->
            <div class="interests-grid-bottom w-full">
                <!--CROSSWORDING CARD-->
                <div class="rounded-xl interest-card bg-white h-full relative">
                    <span style="font-family: 'Fascinate Inline', sans-serif;" class="absolute bottom-4 right-4 text-2xl">crosswording</span>
                    <img src="/src/assets/xword.png" class="absolute left-6 bottom-10 h-3/4 object-contain">

                    <div class="absolute top-5 right-20 max-w-48 text-[0.6rem]" style="font-family: 'Basic', sans-serif;">
                        <p>Across</p>
                        <p>1A: Animator Disney</p>
                        <p>5A: Singing group</p>
                        <p>6A: bundle exec jekyll ____</p>
                        <p>7A: Doesn't like at all</p>
                        <p>8A: Sirius or Polaris</p>
                    </div>

                    <div class="absolute bottom-12 right-8 max-w-48 text-[0.6rem]" style="font-family: 'Basic', sans-serif;">
                        <p>Down</p>
                        <p>1D: Breadmaking ingredient in Minecraft</p>
                        <p>2D: Major blood vessel</p>
                        <p>3D: Meat that may be "chopped"</p>
                        <p>4D: Uno + dos</p>
                        <p>5D: Your favorite club!</p>
                    </div>
                </div>
                <!--COMPOSING CARD-->
                <div class="rounded-xl interest-card bg-white h-full relative p-4 flex flex-col">
                    <span style="font-family: 'Yesteryear', sans-serif;" class="text-4xl text-center">composing</span>
                    <a href="google.com" target="_blank" class="paper-card rounded-lg bg-gray-50 p-4 flex flex-col gap-1 my-auto">
                        <span style="font-family: 'Basic', sans-serif;" class="text-sm font-bold">The day before the world ended</span>
                        <span style="font-family: 'Basic', sans-serif;" class="text-xs text-gray-400">May 2026</span>
                        <span style="font-family: 'Basic', sans-serif;" class="text-xs text-gray-500">The day before the world ended,
                            the sky was a pale, faux pink.
                            I drove to the neighborhood gas station and bought a blueberry muffin.
                            Then, on second thought,
                            a pack of cigarettes and a lottery ticket.
                        </span>
                    </a>
                </div>

                <!--CONSUMING CARD-->
                <div class="rounded-xl interest-card bg-white h-full relative p-3 flex flex-col">
                    <a :href="media[currentIndex].link" target="_blank" class="paper-card">
                        <div class="flex flex-row items-center gap-4 p-3">
                            <img :src="media[currentIndex].cover" class="h-40 object-cover rounded">
                            <div>
                                <p style="font-family:'Basic', sans-serif;">{{ media[currentIndex].title }}</p>
                                <p style="font-family:'Basic'" class="text-gray-400"> {{ media[currentIndex].author }}</p>
                            </div>
                        </div>
                    </a>
                    
                    <span style="font-family:'Estedad',sans-serif;" class="text-2xl text-center mt-auto">consuming (media)</span>
                </div>
            </div>
        </div>
    </section>
</template>

<style>
.interests-grid-top {
    display: grid;
    grid-template-columns: 2fr 3fr 2fr;
    gap: 30px;
    padding: 0 40px;
    grid-template-rows: 250px;
    width: 1150px;
}

.interests-grid-bottom {
    display: grid;
    grid-template-columns: 3fr 2fr 2fr;
    gap: 30px;
    padding: 0 40px;
    grid-template-rows: 250px;
    width: 1150px;
}

.paper-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.paper-card:hover {
    box-shadow: 0 4px 4px rgba(0,0,0,0.11);
}
</style>