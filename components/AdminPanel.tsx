
'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addItem, deleteItem } from '../store/menuSlice';
import { addImage, deleteImage } from '../store/gallerySlice';
import { MenuItem, GalleryImage } from '../types';
import { ICONS } from '../constants';

const AdminPanel: React.FC = () => {
  const dispatch = useDispatch();
  const menuItems = useSelector((state: RootState) => state.menu.items);
  const galleryImages = useSelector((state: RootState) => state.gallery.images);
  
  const [activeTab, setActiveTab] = useState<'menu' | 'gallery'>('menu');
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    category: 'Coffee',
    price: 0,
    name: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800'
  });

  const [newImage, setNewImage] = useState<Partial<GalleryImage>>({
    url: '',
    caption: ''
  });

  const handleSaveMenu = (e: React.FormEvent) => {
    e.preventDefault();
    const item: MenuItem = {
      ...newItem as MenuItem,
      id: Date.now().toString(),
    };
    dispatch(addItem(item));
    setIsAdding(false);
    setNewItem({ category: 'Coffee', price: 0, name: '', description: '', image: newItem.image });
  };

  const handleSaveGallery = (e: React.FormEvent) => {
    e.preventDefault();
    const img: GalleryImage = {
      ...newImage as GalleryImage,
      id: `g-${Date.now()}`
    };
    dispatch(addImage(img));
    setIsAdding(false);
    setNewImage({ url: '', caption: '' });
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-serif font-bold text-coffee-dark">Administrative Hub</h1>
            <p className="text-gray-500 mt-2 uppercase tracking-widest text-xs font-bold">57 Coffee House Workspace</p>
          </div>
          
          <div className="flex bg-gray-100 p-1.5 rounded-2xl border border-gray-200">
             <button 
               onClick={() => setActiveTab('menu')}
               className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'menu' ? 'bg-white text-coffee-dark shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
             >
               Menu
             </button>
             <button 
               onClick={() => setActiveTab('gallery')}
               className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'gallery' ? 'bg-white text-coffee-dark shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
             >
               Gallery
             </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
           <h2 className="text-xl font-serif font-bold text-coffee-dark uppercase tracking-widest">
             {activeTab === 'menu' ? 'Current Offerings' : 'Visual Storytelling'}
           </h2>
           <button 
             onClick={() => setIsAdding(true)}
             className="bg-coffee-dark text-white px-8 py-3 rounded-xl font-bold hover:bg-coffee-light transition-all flex items-center space-x-2 shadow-lg text-[10px] uppercase tracking-widest"
           >
             <ICONS.Plus className="w-4 h-4" />
             <span>Add {activeTab === 'menu' ? 'Item' : 'Image'}</span>
           </button>
        </div>

        {isAdding && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-coffee-dark/60 backdrop-blur-sm" onClick={() => setIsAdding(false)}></div>
            <form 
              onSubmit={activeTab === 'menu' ? handleSaveMenu : handleSaveGallery} 
              className="relative bg-white w-full max-w-lg rounded-3xl p-10 shadow-2xl animate-in zoom-in-95 duration-300"
            >
              <h3 className="text-2xl font-serif font-bold mb-8 text-coffee-dark">Create {activeTab === 'menu' ? 'Menu Item' : 'Gallery Entry'}</h3>
              
              {activeTab === 'menu' ? (
                <div className="space-y-5">
                  <input 
                    type="text" placeholder="Item Name" required
                    className="w-full border border-gray-100 bg-gray-50 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-coffee-light transition-all"
                    value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})}
                  />
                  <div className="grid grid-cols-2 gap-5">
                    <select 
                      className="border border-gray-100 bg-gray-50 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-coffee-light transition-all"
                      value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value as any})}
                    >
                      <option>Coffee</option>
                      <option>Tea</option>
                      <option>Pastry</option>
                      <option>Cake</option>
                      <option>Brunch</option>
                    </select>
                    <input 
                      type="number" step="0.01" placeholder="Base Price ($)" required
                      className="border border-gray-100 bg-gray-50 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-coffee-light transition-all"
                      value={newItem.price || ''} onChange={e => setNewItem({...newItem, price: parseFloat(e.target.value)})}
                    />
                  </div>
                  <textarea 
                    placeholder="Describe the artisan experience..." required
                    className="w-full border border-gray-100 bg-gray-50 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-coffee-light h-32 transition-all resize-none"
                    value={newItem.description} onChange={e => setNewItem({...newItem, description: e.target.value})}
                  ></textarea>
                  <input 
                    type="text" placeholder="Unsplash Image URL"
                    className="w-full border border-gray-100 bg-gray-50 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-coffee-light transition-all"
                    value={newItem.image} onChange={e => setNewItem({...newItem, image: e.target.value})}
                  />
                </div>
              ) : (
                <div className="space-y-5">
                  <input 
                    type="text" placeholder="Image URL" required
                    className="w-full border border-gray-100 bg-gray-50 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-coffee-light transition-all"
                    value={newImage.url} onChange={e => setNewImage({...newImage, url: e.target.value})}
                  />
                  <input 
                    type="text" placeholder="Caption (e.g. Morning Light)" required
                    className="w-full border border-gray-100 bg-gray-50 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-coffee-light transition-all"
                    value={newImage.caption} onChange={e => setNewImage({...newImage, caption: e.target.value})}
                  />
                  {newImage.url && (
                    <div className="aspect-video rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">
                       <img src={newImage.url} className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              )}

              <div className="mt-10 flex space-x-5">
                <button type="button" onClick={() => setIsAdding(false)} className="flex-1 py-4 text-gray-400 font-bold uppercase tracking-widest text-[10px] hover:text-coffee-dark transition-colors">Cancel</button>
                <button type="submit" className="flex-1 bg-coffee-dark text-white py-4 rounded-2xl font-bold hover:bg-coffee-light transition-all shadow-xl uppercase tracking-widest text-[10px]">Save Changes</button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'menu' ? (
          <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-[10px] uppercase tracking-widest font-bold text-gray-400 border-b border-gray-100">
                  <th className="px-10 py-6">Item</th>
                  <th className="px-10 py-6">Category</th>
                  <th className="px-10 py-6">Base Price</th>
                  <th className="px-10 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {menuItems.map(item => (
                  <tr key={item.id} className="group hover:bg-[#faf9f6] transition-all">
                    <td className="px-10 py-8">
                      <div className="flex items-center space-x-5">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                          <img src={item.image} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-coffee-dark text-base">{item.name}</p>
                          <p className="text-[10px] text-gray-400 font-light truncate max-w-[200px] mt-0.5">{item.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <span className="text-[9px] font-bold text-coffee-light uppercase tracking-widest bg-coffee-light/5 px-2.5 py-1 rounded-full border border-coffee-light/10">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-10 py-8 font-serif font-bold text-coffee-dark text-lg">${item.price.toFixed(2)}</td>
                    <td className="px-10 py-8 text-right">
                      <button 
                        onClick={() => dispatch(deleteItem(item.id))}
                        className="text-gray-200 hover:text-red-400 transition-all p-2 hover:bg-red-50 rounded-xl"
                      >
                        <ICONS.Close className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {galleryImages.map(img => (
               <div key={img.id} className="group relative bg-white p-3 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all">
                  <div className="aspect-square rounded-2xl overflow-hidden mb-4">
                     <img src={img.url} className="w-full h-full object-cover" />
                  </div>
                  <div className="px-2 pb-2">
                     <p className="font-serif italic text-coffee-dark text-sm">{img.caption}</p>
                  </div>
                  <button 
                    onClick={() => dispatch(deleteImage(img.id))}
                    className="absolute top-5 right-5 w-8 h-8 bg-white/90 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                  >
                    <ICONS.Close className="w-4 h-4" />
                  </button>
               </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
