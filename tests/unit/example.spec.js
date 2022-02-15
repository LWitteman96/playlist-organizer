import { mount } from "@vue/test-utils"
import { createStore } from "vuex"
import CurrentSong from "../../src/components/atoms/CurrentSong.vue"

describe("CurrentSong", () => {
	let store

	beforeEach(() => {
		store = createStore({
			state: {
				webplayback: {
					playbackState: {
						track_window: {
							current_track: {
								name: "You",
								artists: [
									{
										name: "Joshua J"
									}
								],
								album: {
									name: "1998",
									images: [
										{
											url: "https://i.scdn.co/image/ab67616d0000b27365858cb59af8c8de3836bf68",
											height: 640,
											width: 640
										}
									]
								}
							}
						}
					}
				}
			}
		})
	})

	test("Uses current_track.name from the store", async () => {
		const wrapper = mount(CurrentSong, {
			global: {
				plugins: [store]
			}
		})
		expect(wrapper.html()).toContain("You")
	})
})
