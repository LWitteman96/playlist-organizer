<template>
	<div class="slidecontainer">
		<input
			type="range"
			min="1"
			max="100"
			v-model="volumeLevel"
			@input="update"
			class="slider"
			id="myRange"
		/>
	</div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex"

export default {
	name: "VolumeControl",
	data() {
		return {
			volumeLevel: 50
		}
	},
	computed: {
		...mapState({
			volume: (state) => state.webplayback?.volumeLevel,
			device: (state) => state.webplayback.this_device
		})
	},
	watch: {
		volume(value) {
			console.log("Updated device volume to:", value)
			this.setVolume(this.device)
		}
	},
	methods: {
		...mapMutations(["updateVolume"]),
		...mapActions(["setVolume"]),
		update() {
			this.$store.commit("updateVolume", this.volumeLevel)
			this.$emit("input", this.volumeLevel)
		}
	}
}
</script>

<style></style>
