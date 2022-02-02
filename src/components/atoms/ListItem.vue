<template>
	<div class="title">
		<i :class="isPinned" @click="$emit('playlistClicked')"></i>
		<span class="title-text">{{ this.playlistTitle }}</span>
	</div>
</template>

<script>
export default {
	name: "ListItem",
	props: {
		playlistTitle: String,
		pinned: Boolean
	},
	computed: {
		isPinned() {
			if (this.pinned) {
				return "fas fa-thumbtack"
			} else {
				console.log(this.pinned)
				return "fas fa-plus"
			}
		}
	},
	methods: {}
}
</script>

<style scoped>
.title {
	margin: 10px 0;
}

.title-text {
	color: #afafafaf;
}

.fas {
	color: #20bb69;
	margin: 0 10px;
}
</style>
