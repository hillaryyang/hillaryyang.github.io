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