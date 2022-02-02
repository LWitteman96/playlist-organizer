<template>
	<div class="wrapper">
		<div id="app">
			<ul :style="gridStyle" class="card-list">
				<li
					v-for="(playlist, index) in this.NinePlaylists"
					:key="index"
					class="card-item"
					@click="addToPlaylist(index)"
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
import { mapState } from "vuex"

export default {
	name: "TileGrid",
	components: {
		PlaylistTile
	},
	computed: {
		...mapState({
			playlists: (state) => state.user.userInfo.playlists.items,
			NinePlaylists: (state) => state.user.userInfo.NinePlaylists
		}),
		gridStyle() {
			return {
				gridTemplateColumns: `repeat(${this.numberOfColumns}, minmax(160px, 3em))`
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
	methods: {
		addToPlaylist(index) {
			console.log(index)
		}
	}
}
</script>

<style scoped>
.wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 60vh;
	width: 40vw;
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
	font-family: Helvetica;
}

#app {
	width: 50vw;
	height: 50vh;
	border-radius: 4px;
	transition: all 0.2s;
}

ul {
	list-style-type: none;
}

.selected {
	padding: 2px;
	border: 1px solid white;
}
</style>
