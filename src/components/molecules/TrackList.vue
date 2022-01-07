<template>
	<div class="track-list-container">
		<div class="saved-queue-wrapper">
			<i class="fas fa-heart"></i>
			<h1>Liked Songs Queue</h1>
		</div>
		<ul class="track-list">
			<li
				class="track-list-item"
				v-for="(track, index) in savedTracks"
				:key="index"
			>
				<TrackListItem
					:track_title="track.track.name"
					:artist="track.track.artists[0].name"
				/>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapActions, mapState } from "vuex"
import TrackListItem from "../atoms/TrackListItem.vue"

export default {
	name: "TrackList",
	components: {
		TrackListItem
	},
	computed: {
		...mapState({
			savedTracks: (state) => state.user.userInfo.savedTracks
		})
	},
	methods: {
		...mapActions(["fetchSavedTracklist"])
	},
	created() {
		console.log("fetching tracks...")
		this.fetchSavedTracklist()
		if (this.savedTracks.length != 0) {
			console.log("here are your tracks. ", this.savedTracks)
		}
	}
}
</script>

<style>
.track-list-container {
	width: 30vw;
}

.track-list {
	max-height: 70vh;
	overflow-y: scroll;
	overflow-x: hidden;
	list-style-type: none;
}

.saved-queue-wrapper {
	margin-left: 3em;
	height: 1.8em;
	width: 12em;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #363636;
	border-radius: 20px;
	text-align: center;
}
.saved-queue-wrapper i {
	color: #20bb69;
	margin: 0 10px;
}

.saved-queue-wrapper h1 {
	font-size: 0.7em;
	color: white;
	font-weight: 500;
}
</style>
