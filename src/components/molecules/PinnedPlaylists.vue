<template>
	<div class="pinned">
		<h1>Pinned Playlists</h1>
		<ul class="list">
			<li v-for="(playlist, index) in this.NinePlaylists" :key="index">
				<ListItem
					:pinned="true"
					:playlistTitle="playlist.name"
					@playlistClicked="unpin(index)"
				></ListItem>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex"

import ListItem from "../atoms/ListItem.vue"

export default {
	name: "PinnedPlaylists",
	components: {
		ListItem
	},
	computed: {
		...mapGetters(["AllPlaylists"]),
		...mapState({
			playlists: (state) => state.user.userInfo.playlists.items,
			NinePlaylists: (state) => state.user.userInfo.NinePlaylists
		})
	},
	methods: {
		...mapMutations(["unpinPlaylist"]),
		unpin(index) {
			console.log("this triggered", index)
			this.unpinPlaylist(index)
		}
	}
}
</script>

<style scoped>
h1 {
	font-size: 0.9em;
	color: white;
	font-weight: bold;
	padding-left: 10px;
}

.list {
	padding: 0px;
}
</style>
