<template>
	<section class="main-background">
		<div id="nav">
			<router-link to="/">Home</router-link> |
			<router-link to="/about">About</router-link>
			<router-view />
		</div>
	</section>
</template>

<style>
:root {
	--primary-green: rgb(30, 215, 96);
	--primary-black: rgb(25, 20, 20);
	--background-gradient: linear-gradient(#454545, rgb(25, 20, 20) 70%);
}

* {
	box-sizing: border-box;
}

body {
	/* overflow: hidden; */
	padding: 0;
	margin: 0;
}

.main-background {
	width: 100vw;
	height: 100vh;
	background-image: var(--background-gradient);
}
</style>
