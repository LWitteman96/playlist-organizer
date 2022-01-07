<template>
	<div class="pinned">
		<h1>Pinned Playlists</h1>
		<ul class="list">
			<li v-for="(playlist, index) in this.NinePlaylists" :key="index">
				<ListItem
					:pinned="true"
					:playlistTitle="playlist.name"
				></ListItem>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapGetters } from "vuex"

import ListItem from "../atoms/ListItem.vue"

export default {
	name: "PinnedPlaylists",
	components: {
		ListItem
	},
	computed: {
		...mapGetters(["NinePlaylists"])
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
