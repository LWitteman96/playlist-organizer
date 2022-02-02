<template>
	<!-- <div class="PlaybackTray">
		<SongSlider /> -->
	<div class="wrapper">
		<CurrentSong class="current-song" />
		<PlayBackControl class="playback-control" />
		<VolumeControl class="volume-control" />
	</div>
	<!-- </div> -->
</template>

<script>
import PlayBackControl from "../atoms/PlayBackControl.vue"
import CurrentSong from "../atoms/CurrentSong.vue"
import VolumeControl from "../atoms/VolumeControl.vue"
// import SongSlider from "../atoms/SongSlider.vue"

export default {
	name: "PlayBackTray",
	components: {
		PlayBackControl,
		CurrentSong,
		VolumeControl
		// SongSliderS
	}
}
</script>

<style scoped>
/* .PlaybackTray {
	display: flex;
	flex-direction: column;
} */

.wrapper {
	display: flex;
	justify-content: space-evenly;
	flex-direction: row;
	align-items: center;
	background-image: var(--background-gradient-reverse);
}

.current-song {
	margin-left: 0em;
}

.playback-control {
	margin: 0 auto;
}

.volume-control {
	margin-right: 10em;
}
</style>
