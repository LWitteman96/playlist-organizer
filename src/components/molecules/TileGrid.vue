<template>
	<div class="container">
		<div id="app">
			<ul :style="gridStyle" class="card-list">
				<li
					v-for="(playlist, index) in this.NinePlaylists"
					:key="index"
					class="card-item"
				>
					<PlaylistTile
						:image="
							playlist.images[1]?.url || playlist.images[0]?.url
						"
						:title="playlist.name"
					/>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import PlaylistTile from "../atoms/PlaylistTile.vue"
import { mapGetters, mapState } from "vuex"

export default {
	name: "TileGrid",
	components: {
		PlaylistTile
	},
	computed: {
		...mapState({
			playlists: (state) => state.user.userInfo.playlists.items
		}),
		...mapGetters(["NinePlaylists"]),
		gridStyle() {
			return {
				gridTemplateColumns: `repeat(${this.numberOfColumns}, minmax(160px, 3em))`,
				width: "450px"
			}
		}
	},
	data() {
		return {
			nineSelected: [],
			numberOfColumns: 3
		}
	},
	created() {},
	methods: {}
}
</script>

<style>
.container {
	display: flex;
	justify-content: center;
	align-items: center;
}

.playlist-tile {
	background-color: dodgerblue;
	padding: 2em;
}

.card-list {
	display: grid;
	grid-gap: 1em;
}

body {
	background: #20262e;
	padding: 20px;
	font-family: Helvetica;
}

#app {
	width: 50vw;
	height: 50vh;
	border-radius: 4px;
	padding: 20px;
	transition: all 0.2s;
}

ul {
	list-style-type: none;
}
</style>
