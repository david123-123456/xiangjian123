'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { ShoppingBag, Search, Star, ShoppingCart, Heart, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// 农产品封面图片 - 根据产品名称自动匹配
const productCoverImages = {
  apple: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop',
  honey: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop',
  vegetables: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
  tea: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=300&fit=crop',
  eggs: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop',
  shrimp: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=300&fit=crop',
  chicken: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=300&fit=crop',
  strawberry: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=300&fit=crop',
  mushroom: 'https://images.unsplash.com/photo-1504545102780-26774c1bb073?w=400&h=300&fit=crop',
  corn: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=300&fit=crop',
  rice: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=300&fit=crop',
  tomato: 'https://images.unsplash.com/photo-1546470427-227c7b3f8310?w=400&h=300&fit=crop',
  grape: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400&h=300&fit=crop',
  peanut: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop',
  ginger: 'https://images.unsplash.com/photo-1604975701397-6365ccbd028a?w=400&h=300&fit=crop',
  garlic: 'https://images.unsplash.com/photo-1543076659-9380cdf10613?w=400&h=300&fit=crop',
  carrot: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop',
  pork: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=300&fit=crop',
  duck: 'https://images.unsplash.com/photo-1588554182644-f82e27f4d6da?w=400&h=300&fit=crop',
  default: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&h=300&fit=crop',
};

// 根据产品名称返回对应的封面图片
function getProductCover(productName: string): string {
  const name = productName.toLowerCase();
  if (name.includes('苹果') || name.includes('富士') || name.includes('apple')) return productCoverImages.apple;
  if (name.includes('番茄') || name.includes('西红柿') || name.includes('tomato')) return productCoverImages.tomato;
  if (name.includes('蜂蜜') || name.includes('蜂') || name.includes('honey')) return productCoverImages.honey;
  if (name.includes('红薯') || name.includes('薯') || name.includes('地瓜')) return productCoverImages.vegetables;
  if (name.includes('蔬菜') || name.includes('青菜') || name.includes('白菜') || name.includes('vegetable')) return productCoverImages.vegetables;
  if (name.includes('茶') || name.includes('大红袍') || name.includes('龙井') || name.includes('tea')) return productCoverImages.tea;
  if (name.includes('鸡蛋') || name.includes('土蛋') || name.includes('蛋') || name.includes('egg')) return productCoverImages.eggs;
  if (name.includes('虾') || name.includes('对虾') || name.includes('明虾') || name.includes('shrimp')) return productCoverImages.shrimp;
  if (name.includes('鸡') || name.includes('土鸡') || name.includes('母鸡') || name.includes('chicken')) return productCoverImages.chicken;
  if (name.includes('草莓') || name.includes('莓') || name.includes('strawberry')) return productCoverImages.strawberry;
  if (name.includes('蘑菇') || name.includes('菌') || name.includes('香菇') || name.includes('mushroom')) return productCoverImages.mushroom;
  if (name.includes('玉米') || name.includes('苞谷') || name.includes('棒子') || name.includes('corn')) return productCoverImages.corn;
  if (name.includes('大米') || name.includes('稻') || name.includes('米') || name.includes('rice')) return productCoverImages.rice;
  if (name.includes('葡萄') || name.includes('grape')) return productCoverImages.grape;
  if (name.includes('花生') || name.includes('peanut')) return productCoverImages.peanut;
  if (name.includes('生姜') || name.includes('姜') || name.includes('ginger')) return productCoverImages.ginger;
  if (name.includes('大蒜') || name.includes('蒜') || name.includes('garlic')) return productCoverImages.garlic;
  if (name.includes('胡萝卜') || name.includes('萝卜') || name.includes('carrot')) return productCoverImages.carrot;
  if (name.includes('猪肉') || name.includes('肉') || name.includes('pork')) return productCoverImages.pork;
  if (name.includes('鸭') || name.includes('鹅') || name.includes('duck')) return productCoverImages.duck;
  return productCoverImages.default;
}

const allProducts = [
  {
    id: '1',
    name: '正宗山东红富士苹果',
    price: 39.9,
    originalPrice: 59.9,
    sales: 2580,
    rating: 4.9,
    farm: '红富士农场',
    location: '山东烟台',
    tags: ['水果', '有机'],
    description: '产地直发，新鲜采摘，香甜多汁',
  },
  {
    id: '2',
    name: '农家自酿蜂蜜',
    price: 68.0,
    originalPrice: 98.0,
    sales: 1860,
    rating: 4.8,
    farm: '深山蜂场',
    location: '云南大理',
    tags: ['蜂蜜', '天然'],
    description: '深山老林野生蜂蜜，纯天然无添加',
  },
  {
    id: '3',
    name: '现挖有机红薯',
    price: 28.8,
    originalPrice: 38.8,
    sales: 3200,
    rating: 4.7,
    farm: '绿色田园',
    location: '河南开封',
    tags: ['蔬菜', '有机'],
    description: '沙地种植，口感绵密，营养丰富',
  },
  {
    id: '4',
    name: '武夷山正岩大红袍',
    price: 168.0,
    originalPrice: 268.0,
    sales: 980,
    rating: 5.0,
    farm: '岩茶世家',
    location: '福建武夷山',
    tags: ['茶叶', '名茶'],
    description: '正宗武夷山岩茶，回甘悠长',
  },
  {
    id: '5',
    name: '秦岭野生木耳',
    price: 45.0,
    originalPrice: 65.0,
    sales: 1450,
    rating: 4.6,
    farm: '秦岭山珍',
    location: '陕西西安',
    tags: ['菌类', '野生'],
    description: '秦岭深山野生木耳，质地厚实',
  },
  {
    id: '6',
    name: '东北五常大米',
    price: 78.0,
    originalPrice: 98.0,
    sales: 2100,
    rating: 4.9,
    farm: '五常稻香',
    location: '黑龙江五常',
    tags: ['粮食', '优质'],
    description: '正宗五常大米，香糯可口',
  },
  {
    id: '7',
    name: '正宗土鸡蛋',
    price: 45.0,
    originalPrice: 58.0,
    sales: 3200,
    rating: 4.8,
    farm: '乡村鸡舍',
    location: '安徽黄山',
    tags: ['禽蛋', '天然'],
    description: '散养土鸡，蛋黄橙红，营养丰富',
  },
  {
    id: '8',
    name: '阳澄湖大闸蟹',
    price: 288.0,
    originalPrice: 388.0,
    sales: 890,
    rating: 5.0,
    farm: '阳澄蟹庄',
    location: '江苏苏州',
    tags: ['水产', '鲜活'],
    description: '正宗阳澄湖大闸蟹，膏满黄肥',
  },
  {
    id: '9',
    name: '农家腊肉',
    price: 58.0,
    originalPrice: 78.0,
    sales: 1680,
    rating: 4.7,
    farm: '湘味坊',
    location: '湖南湘西',
    tags: ['肉类', '传统'],
    description: '传统工艺腌制，柴火熏制，香味浓郁',
  },
];

export default function ConsumerShopPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const categories = ['全部', '水果', '茶叶', '粮油', '蔬菜', '菌类', '蜂蜜'];

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.farm.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === '全部' || product.tags.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  return (
    <div className="min-h-screen bg-rural-gradient">
      <Navbar mode="consumer" />

      {/* Header */}
      <section className="bg-gradient-to-r from-[#2d5016] to-[#4a7c23] text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">农产品商城</h1>
          <p className="text-white/80">来自全国各地的优质农产品，产地直发</p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a7c23]" />
              <Input
                placeholder="搜索商品或农场..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-[#8bc34a]/30 focus:border-[#4a7c23]"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[160px] border-[#8bc34a]/30">
                <SelectValue placeholder="商品分类" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="container mx-auto px-4 pb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="rural-card-hover overflow-hidden">
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src={getProductCover(product.name)} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-red-500">-{Math.round((1 - product.price / product.originalPrice) * 100)}%</Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 left-2 bg-white/80 hover:bg-white"
                >
                  <Heart className="w-5 h-5 text-[#4a7c23]" />
                </Button>
              </div>
              <CardContent className="pt-4">
                <p className="text-xs text-[#4a7c23] mb-1">@{product.farm} · {product.location}</p>
                <h3 className="font-semibold text-[#2d5016] mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-sm text-[#4a7c23]/80 mb-3">{product.description}</p>
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium text-[#2d5016]">{product.rating}</span>
                  <span className="text-sm text-[#4a7c23]/60">({product.sales}评价)</span>
                </div>
                <div className="flex gap-2 mb-3">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-[#8bc34a]/20 text-[#2d5016] text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-[#2d5016]">¥{product.price}</span>
                  <span className="text-sm text-[#4a7c23]/60 line-through">¥{product.originalPrice}</span>
                </div>
              </CardContent>
              <CardFooter className="pt-0 flex gap-2">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(product.id, -1)}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-8 text-center text-sm">{quantities[product.id] || 1}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(product.id, 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <Button className="flex-1 bg-[#2d5016] hover:bg-[#4a7c23] gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  加入购物车
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-[#4a7c23]/40 mx-auto mb-4" />
            <p className="text-[#4a7c23]">暂无符合条件的商品</p>
          </div>
        )}
      </section>
    </div>
  );
}
