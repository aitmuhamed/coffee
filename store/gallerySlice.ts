
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GalleryImage } from '../types';
import { GALLERY_IMAGES as initialItems } from '../constants';

interface GalleryState {
  images: GalleryImage[];
}

const initialState: GalleryState = {
  images: initialItems,
};

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    addImage: (state, action: PayloadAction<GalleryImage>) => {
      state.images.push(action.payload);
    },
    deleteImage: (state, action: PayloadAction<string>) => {
      state.images = state.images.filter(img => img.id !== action.payload);
    },
  },
});

export const { addImage, deleteImage } = gallerySlice.actions;
export default gallerySlice.reducer;
