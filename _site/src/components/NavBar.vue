<template>
    <nav style="font-family: 'Basic', sans-serif;" class="top-0 left-0 w-full flex gap-8 px-10 py-6 bg-white/30">
        <RouterLink to="/" class="nav-link" style="--underline-color: #ff6b6b">Home</RouterLink>
        <RouterLink to="/now" class="nav-link" style="--underline-color: #FFD500">Now</RouterLink>
        <a href="/#projects" class="nav-link" style="--underline-color: #52e303">Projects</a>
        <RouterLink to="/thinking" class="nav-link" style="--underline-color: #65b1e3">Thinking</RouterLink>
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
    background: var(--underline-color);
    transition: width 0.3s ease;
}

.nav-link:hover::after {
    border-radius:2px;
    width: 100%;
}
</style>