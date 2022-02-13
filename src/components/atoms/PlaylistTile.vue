<template>
	<div class="card">
		<img class="playlist-image" :src="image" alt="" />
		<span class="playlist-title">{{ this.title }}</span>
	</div>
</template>

<script>
export default {
	name: "PlaylistTile",
	props: {
		title: String,
		image: String,
		tracks: Object,
		public: Boolean
	},
	data: function () {
		return {}
	},
	computed: {},
	created() {}
}
</script>

<style>
.card {
	width: 140px;
	height: 180px;
	position: relative;
}

.playlist-image {
	border-radius: 10%;
	width: 140px;
	height: 140px;
	position: absolute;
}

.playlist-title {
	color: lightgrey;
	font-weight: bold;
	font-size: 12px;
	z-index: 100;
	position: absolute;
	/* padding-bottom: 50px; */
	bottom: 20px;
	right: 0px;
	width: 100%;
}
</style>
