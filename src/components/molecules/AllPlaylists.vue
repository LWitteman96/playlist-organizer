<template>
	<div class="all">
		<h1>All Playlists</h1>
		<div class="scrollable">
			<ul class="list">
				<li
					v-for="(playlist, index) in this.AllPlaylists.items"
					:key="index"
				>
					<ListItem :playlistTitle="playlist.name"></ListItem>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex"

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
