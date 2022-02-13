<template>
	<section class="main-background">
		<div id="nav">
			<router-view />
		</div>
	</section>
</template>

<style>
:root {
	--primary-green: rgb(30, 215, 96);
	--primary-black: rgb(25, 20, 20);
	--background-gradient: linear-gradient(#535353, rgb(25, 20, 20) 90%);
	--background-gradient-reverse: linear-gradient(rgb(25, 20, 20), #1c1c1c 90%);
}

* {
	box-sizing: border-box;
}

body {
	padding: 0;
	margin: 0;
}

.main-background {
	width: 100vw;
	height: 100vh;
	background-image: var(--background-gradient);
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
