<template>
	<div class="wrapper">
		<img :src="currentSong?.album?.images[0]?.url" class="song-image" />
		<div class="song-container">
			<span class="song-title" data-test="song-title">{{
				currentSong?.name
			}}</span>
			<span class="song-artist">
				{{ currentSong?.artists[0].name }}
			</span>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex"

export default {
	name: "CurrentSong",
	computed: {
		...mapState({
			currentSong: (state) =>
				state.webplayback.playbackState?.track_window?.current_track
		})
	}
}
</script>

<style scoped>
.song-container {
	color: white;
	width: 12em;
	height: 3em;
	display: flex;
	flex-direction: column;
}

.song-title {
	font-size: 1em;
}

.song-image {
	width: 10em;
	height: 10em;
}

.song-artist {
	font-size: 0.8em;
	font-weight: 300;
	color: lightgray;
}
</style>
