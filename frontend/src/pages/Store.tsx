import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
}

const Store: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    // Mock data - replace with API call
    setProducts([
      {
        id: '1',
        name: 'VIP Rank',
        category: 'Ranks',
        price: 1500,
        description: 'Permanent VIP perks and cosmetics',
        image: 'https://picsum.photos/id/1015/300/200'
      },
      // Add more products...
    ]);
  }, []);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const filteredProducts = products.filter(p => 
    activeCategory === 'All' || p.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-bold text-center mb-4 tracking-tighter"
        >
          KITFFA <span className="text-[#FFD54A]">STORE</span>
        </motion.h1>
        
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {['All', 'Ranks', 'Kits', 'Crates', 'Cosmetics'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-2xl transition-all ${activeCategory === cat 
                ? 'bg-[#FFD54A] text-black font-semibold' 
                : 'bg-zinc-900 hover:bg-zinc-800'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden group"
            >
              <div className="h-52 bg-zinc-800 relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded-full text-xs font-mono">
                  {product.category}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
                <p className="text-zinc-400 text-sm mb-6 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#FFD54A]">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-mono text-xl">{product.price}</span>
                    <span className="text-sm text-zinc-500">COINS</span>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart(product)}
                    className="flex items-center gap-2 bg-[#FFD54A] hover:bg-amber-300 text-black px-8 py-3 rounded-2xl font-semibold transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    BUY
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Store;
