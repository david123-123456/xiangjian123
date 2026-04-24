'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { ShoppingBag, Search, Star, ShoppingCart, Heart, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// 农产品图片 - 每种产品对应类型的图片
const productImages = {
  apple: 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_31db7a66-d94f-4fb0-89c7-668f412b44bf.jpeg?sign=1808552190-2224473377-0-94bdb0abca0744d49441eecab9bb0d51fda1fb7b8bbc0109ed0f4de7843cf8c9',
  honey: 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_14d15101-7591-404d-8a66-9e21f9504dac.jpeg?sign=1808552190-39daf7b7fb-0-e64248a4b3bc50f16e72ef0f8e4a5b602cb0c4d9cd3b1918724e66817a02c423',
  sweetPotato: 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_acc70e5d-07cd-43ab-9a9f-f2f59a93d74e.jpeg?sign=1808552191-c65f9b4a47-0-5d28b2a3e628369e1a50bc7712dbab8dcfc2171ae947a2915dfd41027ea9dfd3',
  blueberry: 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_801fc3d2-69ab-4dcc-a034-ad955950710e.jpeg?sign=1808552192-40bfea0e49-0-1c2063cfb2c89ff7c761054fd53f608a3da49caa5fade6da07f433bdefa04e20',
  tea: 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_a6ec16d4-03f8-47ad-8f98-2c38d6a90956.jpeg?sign=1808552192-1a96dbaafa-0-73891e1a4202735ac907cd5c569cd1afd88456b53185b93c77efbec9b09b9b0c',
  mushroom: 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_162b1f5c-ef76-4424-9366-eb319ec2abb3.jpeg?sign=1808552191-ad9a93e8b4-0-4ccb3010909732fb8b16c242328c95bd4256657402804cf71cad27f4c522460f',
  rice: 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_86626f6f-9b70-4f9c-97d5-55dd94d8af59.jpeg?sign=1808552190-8b62c8be1f-0-4989a9b5d0c8c43538aca616bb8ce0b9cef71743c96d41eb5e3930aa422f9e4c',
  orange: 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_1d061dac-2f40-44cf-873b-6bc0e2aaf3ae.jpeg?sign=1808552192-4bdbee6bec-0-55363fe0b0ba3536c3c771ea1ee513c434b06b4c35da3c84d35c382a5de1424b',
};

const allProducts = [
  {
    id: '1',
    name: '正宗山东红富士苹果',
    price: 39.9,
    originalPrice: 59.9,
    sales: 2580,
    rating: 4.9,
    image: productImages.apple,
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
    image: productImages.honey,
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
    image: productImages.sweetPotato,
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
    image: productImages.tea,
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
    image: productImages.mushroom,
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
    image: productImages.rice,
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
