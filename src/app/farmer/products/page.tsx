'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { ShoppingBag, Plus, Edit, Trash2, Eye, Upload, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog';

// 农产品封面映射
const productCoverMap: Record<string, string> = {
  '苹果': 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=400&h=400&fit=crop',
  '番茄': 'https://images.unsplash.com/photo-1546470427-227c7b3f8310?w=400&h=400&fit=crop',
  '蜂蜜': 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop',
  '鸡蛋': 'https://images.unsplash.com/photo-1569288052389-dac9b01c9c05?w=400&h=400&fit=crop',
  '茶叶': 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=400&fit=crop',
  '蔬菜': 'https://images.unsplash.com/photo-1518843875459-f738682238a6?w=400&h=400&fit=crop',
  'default': 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&h=400&fit=crop',
};

const getProductCover = (name: string): string => {
  for (const [keyword, url] of Object.entries(productCoverMap)) {
    if (keyword !== 'default' && name.includes(keyword)) {
      return url;
    }
  }
  return productCoverMap['default'];
};

const myProducts = [
  {
    id: '1',
    name: '正宗山东红富士苹果',
    price: 39.9,
    originalPrice: 59.9,
    stock: 500,
    sales: 258,
    status: '在售',
    image: '',
  },
  {
    id: '2',
    name: '农家自制苹果干',
    price: 28.0,
    originalPrice: 38.0,
    stock: 200,
    sales: 86,
    status: '在售',
    image: '',
  },
  {
    id: '3',
    name: '苹果醋饮料',
    price: 45.0,
    originalPrice: 58.0,
    stock: 0,
    sales: 124,
    status: '缺货',
    image: '',
  },
];

export default function FarmerProductsPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-rural-gradient">
      <Navbar mode="farmer" />

      {/* Header */}
      <section className="bg-gradient-to-r from-[#2d5016] to-[#4a7c23] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">我的商品</h1>
              <p className="text-white/80">管理您的农产品，查看销售数据</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-white text-[#2d5016] hover:bg-white/90 gap-2">
                  <Plus className="w-4 h-4" />
                  添加商品
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="text-[#2d5016]">添加新商品</DialogTitle>
                  <DialogDescription>
                    填写商品信息，上传商品图片
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <label className="text-sm font-medium text-[#2d5016] mb-2 block">商品名称</label>
                    <Input placeholder="请输入商品名称" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-[#2d5016] mb-2 block">售价</label>
                      <Input type="number" placeholder="0.00" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#2d5016] mb-2 block">原价</label>
                      <Input type="number" placeholder="0.00" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#2d5016] mb-2 block">库存</label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#2d5016] mb-2 block">商品描述</label>
                    <textarea
                      className="w-full min-h-[100px] px-3 py-2 border border-[#8bc34a]/30 rounded-md focus:border-[#4a7c23] focus:outline-none"
                      placeholder="描述商品特点..."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#2d5016] mb-2 block">商品图片</label>
                    <div className="border-2 border-dashed border-[#8bc34a]/30 rounded-lg p-8 text-center cursor-pointer hover:border-[#4a7c23] transition-colors">
                      <Upload className="w-8 h-8 text-[#4a7c23] mx-auto mb-2" />
                      <p className="text-sm text-[#4a7c23]">点击上传商品图片</p>
                      <p className="text-xs text-[#4a7c23]/60">支持 JPG、PNG，建议尺寸 800x800</p>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    取消
                  </Button>
                  <Button className="bg-[#2d5016] hover:bg-[#4a7c23]">
                    确认添加
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 -mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-white/95 backdrop-blur shadow-sm">
            <CardContent className="pt-4 text-center">
              <p className="text-2xl font-bold text-[#2d5016]">{myProducts.length}</p>
              <p className="text-sm text-[#4a7c23]">在售商品</p>
            </CardContent>
          </Card>
          <Card className="bg-white/95 backdrop-blur shadow-sm">
            <CardContent className="pt-4 text-center">
              <p className="text-2xl font-bold text-[#2d5016]">
                {myProducts.reduce((sum, p) => sum + p.stock, 0)}
              </p>
              <p className="text-sm text-[#4a7c23]">总库存</p>
            </CardContent>
          </Card>
          <Card className="bg-white/95 backdrop-blur shadow-sm">
            <CardContent className="pt-4 text-center">
              <p className="text-2xl font-bold text-[#2d5016]">
                {myProducts.reduce((sum, p) => sum + p.sales, 0)}
              </p>
              <p className="text-sm text-[#4a7c23]">总销量</p>
            </CardContent>
          </Card>
          <Card className="bg-white/95 backdrop-blur shadow-sm">
            <CardContent className="pt-4 text-center">
              <p className="text-2xl font-bold text-[#2d5016]">¥8,420</p>
              <p className="text-sm text-[#4a7c23]">预估收益</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Product List */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-[#8bc34a]/20 to-[#4a7c23]/20 relative">
                <img 
                  src={getProductCover(product.name)} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <Badge
                  className={`absolute top-2 right-2 ${
                    product.status === '在售' ? 'bg-[#2d5016]' : 'bg-red-500'
                  }`}
                >
                  {product.status}
                </Badge>
              </div>
              <CardContent className="pt-4">
                <h3 className="font-semibold text-[#2d5016] mb-2 line-clamp-1">{product.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl font-bold text-[#2d5016]">¥{product.price}</span>
                  <span className="text-sm text-[#4a7c23]/60 line-through">¥{product.originalPrice}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-[#4a7c23]">
                  <span>库存: {product.stock}</span>
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {product.sales} 已售
                  </span>
                </div>
              </CardContent>
              <CardFooter className="pt-0 gap-2">
                <Button variant="outline" size="sm" className="flex-1 gap-1 border-[#4a7c23] text-[#2d5016]">
                  <Eye className="w-4 h-4" />
                  预览
                </Button>
                <Button variant="outline" size="sm" className="flex-1 gap-1 border-[#4a7c23] text-[#2d5016]">
                  <Edit className="w-4 h-4" />
                  编辑
                </Button>
                <Button variant="ghost" size="icon" className="text-red-500">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
