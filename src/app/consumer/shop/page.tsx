'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { ShoppingBag, Search, Star, ShoppingCart, Heart, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// 农产品图片
const productImages = [
  'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_58998bf8-df20-4bf1-b7ab-f545141deb45.jpeg?sign=1808551590-36a2f184a0-0-a227690e395f8e73f09c0776d3844d3682c057f185f0a1d52f2d9f46dd1856e1',
  'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_34f50fd7-e602-43f4-a5c3-b0f4fc71f9f7.jpeg?sign=1808551590-97a6ce30bd-0-113f8422cc83ba4681ff568f00b229e2f94c08c56e6d4d8b375eff5eaadd2729',
  'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_3235a2f6-8e1d-4320-a2b8-69d1c45fdbbd.jpeg?sign=1808551591-cb76403b0d-0-f98b8b53040f3b76684cb208db22127b6b7043b9d45f941e3b02cf6430440565',
  'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_542be8bc-9867-432f-9c3d-abd3a554ebe4.jpeg?sign=1808551591-4d25ce3dfa-0-8793e19cd5786d7035943619d40b80bbc84e0b84540b7d413121befa695e4274',
  'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_97ccb309-c254-4a77-b539-e9172550f31b.jpeg?sign=1808551591-513fd2507e-0-db665212101cd42a701f72273bf3b98c6933e57b2900a0c3c36dc7e859381f2f',
  'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_9288f439-ab08-49ec-af2f-62cffbd54484.jpeg?sign=1808551591-5a924d8c94-0-9a331bd34e70a8e76bd59e6f3bd0d7f3835747f92681e9e27db2bebbadf83af6',
];

const allProducts = [
  {
    id: '1',
    name: '正宗山东红富士苹果',
    price: 39.9,
    originalPrice: 59.9,
    sales: 2580,
    rating: 4.9,
    image: productImages[0],
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
    image: productImages[1],
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
    image: productImages[2],
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
    image: productImages[3],
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
    image: productImages[4],
    farm: '秦岭山珍',
    location: '陕西西安',
    tags: ['菌类', '野生'],
    description: '秦岭深山野生木耳，质地厚实',
  },
  {
    id: '6',
    name: '东北五常大米',
    price: 78.0,
    originalPrice: 108.0,
    sales: 4200,
    rating: 4.9,
    image: productImages[5],
    farm: '黑土地粮仓',
    location: '黑龙江五常',
    tags: ['粮油', '优质'],
    description: '稻花香品种，香糯可口',
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
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
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
