<template>
    <nav style="font-family: 'Basic', sans-serif;" class="fixed top-0 left-0 w-full flex gap-8 px-10 py-6 backdrop-blur-md bg-white/30">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/now" class="nav-link">Now</RouterLink>
        <RouterLink to="/thinking" class="nav-link">Thinking</RouterLink>
    </nav>
</template>

<style>
.nav-link {
    position: relative;
    text-decoration: none;
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: black;
    transition: width 0.3s ease;
}

.nav-link:hover::after {
    width: 100%;
}
</style>