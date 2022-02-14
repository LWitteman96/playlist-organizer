import { mount, shallowMount } from "@vue/test-utils"
import CurrentSong from "../../src/components/atoms/CurrentSong.vue"

test("renders current song", async () => {
  const $store = {
    state: {
      currentSong: {
        artists: [
          {
            name: "Eminem"
          }
        ]
      }
    },
    commit: jest.fn()
  }
  const wrapper = mount(CurrentSong)

  const songArtist = wrapper.get('[data-test="song-artist"')

  expect(songArtist.text().toBe("Eminem"))
})

// test("vuex using a mock store", async () => {
//   const $store = {
//     state: {
//       count: 25
//     },
//     commit: jest.fn()
//   }

//   const wrapper = mount(App, {
//     global: {
//       mocks: {
//         $store
//       }
//     }
//   })

//   expect(wrapper.html()).toContain("Count: 25")
//   await wrapper.find("button").trigger("click")
//   expect($store.commit).toHaveBeenCalled()
// })
