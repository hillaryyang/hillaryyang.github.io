<script setup lang="ts">
    import { ref } from 'vue'
    
    const interests = ref([
        { name: 'cubing', color: '#e82001', type: 'image', image: 'https://picsum.photos/400/300'},
        { name: 'crosswording', color: '#65b1e3', type: 'text', preview: '1A: Something clever...'},
        { name: 'consuming', color: '#f39202', type: 'image', image: 'https://picsum.photos/400/400'},
        { name: '(c)researching', color: '#52e303', type: 'image', image: 'https://picsum.photos/400/600'},
        { name: 'cooking', color: '#FFD500', type: 'image', image: 'https://picsum.photos/400/350'},
        { name: 'composing', color: '#D3D3D3', type: 'text', preview: 'Something will go here...'}
    ])
</script>

<template>
    <section id="projects" style="background-color: aliceblue;" class="items-center justify-center pb-16 pt-10">
        <h2 style="font-family: 'Newsreader', sans-serif;" class="text-5xl font-bold mb-8 px-10 text-left w-full">Currently...</h2>

        <div class="interests-grid w-full overflow-x-auto">
            <div class="interests-grid-top w-full mb-10">
                <div class="rounded-xl interest-card bg-white relative overflow-hidden p-4 pt-2 flex flex-col justify-between text-center">
                    <span style="font-family: 'Notable', sans-serif;" class="text-2xl mb-2">cubing</span>
                    <div>
                        <img src="/src/assets/cubes.jpg" class="w-full object-cover">
                    </div>
                    <p style="font-family: 'Basic', sans-serif;" class="text-sm text-gray-500 text-center pt-2 pb-2">My ever-growing puzzle collection</p>
                </div>

                <div class="rounded-xl interest-card bg-white relative overflow-hidden p-4 pt-3 flex flex-col justify-between">
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
                <div class=" rounded-xl interest-card bg-white" style="">cooking</div>
            </div>
            <div class="interests-grid-bottom w-full">
                <div class="rounded-xl interest-card bg-white" style="">crosswording</div>
                <div class="rounded-xl interest-card bg-white" style="">composing</div>
                <div class="rounded-xl interest-card bg-white" style="">consuming</div>
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
    transform: scale(1.03);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
</style>