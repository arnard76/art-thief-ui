// @ts-nocheck
import { writable } from "svelte/store";

const store = writable(
  [
    { path: "/painting_picture/monalisa.jpg", vertical: true},
    { path:"/painting_picture/scream.jpg", vertical: true},
    { path:"/painting_picture/starry_night.jpg", vertical: false},
    { path:"/painting_picture/guernica.jpg", vertical: false},
  ]
)

const currentArtworks = {

  ...store,
  updateArtwork(oldPath, {newPath, vertical}){
    store.update((current)=>{
      const index = current.findIndex(artwork=>artwork.path===oldPath);
      current[index] = {path: newPath, vertical}
    })
  }
}

export default currentArtworks;