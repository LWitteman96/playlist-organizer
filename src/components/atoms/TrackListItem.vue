<template>
	<div class="track-item">
		<span class="artist">{{ artist }}</span>
		<span class="title">{{ track_title }}</span>
	</div>
</template>

<script>
export default {
	name: "TrackListItem",
	props: {
		track_title: String,
		artist: String
	}
}
</script>

<style>
.track-item {
	display: flex;
	flex-direction: column;
	margin: 1em 0;
}
.title,
.artist {
	color: #afafafaf;
	font-size: 0.8em;
}

.artist {
	font-weight: bold;
}

.title {
	max-width: 20em;
}
</style>
