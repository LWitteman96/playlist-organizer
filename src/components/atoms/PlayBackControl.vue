<template>
	<div class="wrapper">
		<div class="controls">
			<i @click="this.toggleShuffle(device)" class="fas fa-random"></i>
			<i
				@click="this.skipToPrevious(device)"
				class="fas fa-step-backward"
			></i>
			<i
				v-if="!this.playing"
				@click="this.startResume(device)"
				class="fas fa-play"
			></i>
			<i v-else @click="this.pause(device)" class="fas fa-pause"></i>
			<i @click="this.skipToNext(device)" class="fas fa-step-forward"></i>
			<i class="fas fa-sync-alt"></i>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex"
export default {
	name: "PlayBackControl",
	computed: {
		...mapState({
			device: (state) => state.webplayback.this_device,
			playbackState: (state) => state.webplayback.playbackState,
			playing: (state) => state.webplayback.is_playing
		}),
		...mapGetters(["is_playing"])
	},
	methods: {
		...mapActions([
			"getPlaybackState",
			"transferPlayBack",
			"startResume",
			"pause",
			"skipToNext",
			"skipToPrevious",
			"setVolume",
			"toggleShuffle"
		])
	},
	created() {
		this.getPlaybackState()
	}
}
</script>

<style scoped>
.controls {
	display: flex;
	gap: 1em;
}

i {
	color: white;
	cursor: pointer;
}
</style>
