<template>
	<div class="all">
		<h1>All Playlists</h1>
		<div class="scrollable">
			<ul class="list">
				<li v-for="(playlist, index) in this.AllPlaylists?.items" :key="index">
					<ListItem
						:playlistTitle="playlist.name"
						@playlistClicked="pin(index)"
					></ListItem>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"

import ListItem from "../atoms/ListItem.vue"

export default {
	name: "AllPlaylists",
	components: {
		ListItem
	},
	computed: {
		...mapGetters(["AllPlaylists"])
	},
	created() {
		console.log("this", this.AllPlaylists)
	},
	methods: {
		...mapMutations(["pinPlaylist"]),
		pin(index) {
			console.log("this triggered", index)
			this.pinPlaylist(index)
		}
	}
}
</script>

<style>
.all {
}

.scrollable {
	overflow-y: scroll;
	height: 25vh;
	width: 20vw;
}

h1 {
	font-size: 0.9em;
	color: white;
	font-weight: bold;
	padding-left: 10px;
}

.list {
	padding: 0px;
	list-style-type: none;
}
</style>
