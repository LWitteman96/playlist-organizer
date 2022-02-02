<template>
	<div class="song-slider"></div>
</template>

<script>
import { mapGetters, mapState } from "vuex"

export default {
	name: "SongSlider",
	computed: {
		...mapGetters(["is_playing"]),
		...mapState({
			playing: (state) => state.webplayback.is_playing
		})
	},
	watch: {
		playing: function (oldValue, newValue) {
			console.log("\n\n\n\n\n\n\n11111does the code get here?")
			console.log("oldValue", oldValue, "newValue", newValue)
			this.getPlaybackState()
		}
	},
	methods: {
		getPlaybackState() {
			while (this.is_playing) {
				console.log("\n\n\n\n\n\n\ndoes the code get here?")
				window.Spotify.player.getCurrentState().then((state) => {
					if (!state) {
						console.error(
							"User is not playing music through the Web Playback SDK"
						)
						return
					}
					console.log("device state from getCurrentState", state)
				})
			}
		}
	}
}
</script>

<style>
.song-slider {
	width: 100%;
	height: 0.5em;
	background-color: red;
}
</style>
