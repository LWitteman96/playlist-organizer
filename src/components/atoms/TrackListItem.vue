<template>
	<div @click="this.startResume({ device, tracks: uri })" class="track-item">
		<span class="artist">{{ artist }}</span>
		<span class="title">{{ track_title }}</span>
	</div>
</template>

<script>
import { mapActions, mapState } from "vuex"
export default {
	name: "TrackListItem",
	props: {
		track_title: String,
		artist: String,
		uri: String
	},
	computed: {
		...mapState({
			device: (state) => state.webplayback.this_device
		})
	},
	methods: {
		...mapActions(["startResume"])
	}
}
</script>

<style>
.track-item {
	display: flex;
	flex-direction: column;
	margin: 1em 0;
	cursor: pointer;
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
