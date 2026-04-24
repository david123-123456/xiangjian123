'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Video, Search, Play, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// 短剧封面图片 - 使用公开可访问的图片
const dramaCovers = {
  folk: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop',
  ceo: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
  live: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop',
  rebirth: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop',
  apocalypse: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop',
  timetravel: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop',
  rich: 'https://images.unsplash.com/photo-1510797215324-95aa89f43c33?w=400&h=300&fit=crop',
  palace: 'https://images.unsplash.com/photo-1533669955142-6a73332af4db?w=400&h=300&fit=crop',
  fantasy: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=300&fit=crop',
};

const allDramas = [
  {
    id: '1',
    title: '柚子飘香的秘密',
    category: '民俗版',
    genre: '乡村',
    author: '刘家柚园',
    views: '12.5万',
    likes: 8900,
    cover: dramaCovers.folk,
    description: '讲述柚农老刘一家与柚子的感人故事，展现乡村生活的美好与艰辛。',
    tags: ['乡村', '家庭', '励志'],
  },
  {
    id: '2',
    title: '霸总的乡村奇遇',
    category: '故事版',
    genre: '霸总',
    author: '王大姐特产店',
    views: '8.3万',
    likes: 5600,
    cover: dramaCovers.ceo,
    description: '都市霸总误入乡村，邂逅质朴爱情，在田园中找回初心。',
    tags: ['霸总', '爱情', '乡村'],
  },
  {
    id: '3',
    title: '重生之我在农村卖苹果',
    category: '带货版',
    genre: '重生',
    author: '红富士农场',
    views: '15.7万',
    likes: 12000,
    cover: dramaCovers.live,
    description: '女主重生回到农村，用智慧和汗水种植优质苹果，带领乡亲致富。',
    tags: ['重生', '创业', '带货'],
  },
  {
    id: '4',
    title: '古镇的最后一位绣娘',
    category: '民俗版',
    genre: '传统文化',
    author: '云锦阁',
    views: '6.2万',
    likes: 4200,
    cover: dramaCovers.palace,
    description: '记录古镇非遗传承人的故事，展现传统手工艺的魅力。',
    tags: ['非遗', '文化', '传承'],
  },
  {
    id: '5',
    title: '末世农场的希望',
    category: '故事版',
    genre: '末世',
    author: '科技农场',
    views: '9.8万',
    likes: 7800,
    cover: dramaCovers.apocalypse,
    description: '末世背景下，一群人靠智慧农业重建家园的希望故事。',
    tags: ['末世', '科幻', '农业'],
  },
  {
    id: '6',
    title: '穿越千年的茶香',
    category: '民俗版',
    genre: '穿越',
    author: '茶山人家',
    views: '11.2万',
    likes: 9500,
    cover: dramaCovers.timetravel,
    description: '现代茶艺师穿越到古代，与茶农一起书写茶文化传奇。',
    tags: ['穿越', '茶文化', '历史'],
  },
  {
    id: '7',
    title: '豪门千金在农村',
    category: '故事版',
    genre: '豪门',
    author: '田园梦工厂',
    views: '7.5万',
    likes: 6100,
    cover: dramaCovers.rich,
    description: '豪门千金隐瞒身份来到农村，经历了从娇娇女到励志女孩的蜕变。',
    tags: ['豪门', '逆袭', '爱情'],
  },
  {
    id: '8',
    title: '仙侠农场的奇妙冒险',
    category: '故事版',
    genre: '仙侠',
    author: '云雾山庄',
    views: '8.9万',
    likes: 7200,
    cover: dramaCovers.fantasy,
    description: '修仙者下山历练，在农村用仙法帮助村民致富的奇妙故事。',
    tags: ['仙侠', '奇幻', '农业'],
  },
  {
    id: '9',
    title: '重生之我是村长',
    category: '带货版',
    genre: '重生',
    author: '振兴乡村',
    views: '13.4万',
    likes: 11000,
    cover: dramaCovers.rebirth,
    description: '重生者回到过去成为村长，带领全村发展特色农业。',
    tags: ['重生', '村长', '致富'],
  },
];

export default function ConsumerDramasPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedGenre, setSelectedGenre] = useState('全部');

  const categories = ['全部', '故事版', '带货版', '民俗版'];
  const genres = ['全部', '霸总', '重生', '末世', '乡村', '穿越', '爱情', '创业'];

  const filteredDramas = allDramas.filter((drama) => {
    const matchesSearch = drama.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drama.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === '全部' || drama.category === selectedCategory;
    const matchesGenre = selectedGenre === '全部' || drama.tags.includes(selectedGenre);
    return matchesSearch && matchesCategory && matchesGenre;
  });

  return (
    <div className="min-h-screen bg-rural-gradient">
      <Navbar mode="consumer" />

      {/* Header */}
      <section className="bg-gradient-to-r from-[#2d5016] to-[#4a7c23] text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">短剧广场</h1>
          <p className="text-white/80">发现来自全国各地农户创作的精彩短剧</p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a7c23]" />
              <Input
                placeholder="搜索短剧或作者..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-[#8bc34a]/30 focus:border-[#4a7c23]"
              />
            </div>
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[140px] border-[#8bc34a]/30">
                  <SelectValue placeholder="模板类型" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="w-[140px] border-[#8bc34a]/30">
                  <SelectValue placeholder="题材" />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Drama Grid */}
      <section className="container mx-auto px-4 pb-12">
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="bg-[#8bc34a]/20">
            <TabsTrigger value="all" className="data-[state=active]:bg-[#2d5016]">全部</TabsTrigger>
            <TabsTrigger value="story" className="data-[state=active]:bg-[#2d5016]">故事版</TabsTrigger>
            <TabsTrigger value="product" className="data-[state=active]:bg-[#2d5016]">带货版</TabsTrigger>
            <TabsTrigger value="folk" className="data-[state=active]:bg-[#2d5016]">民俗版</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDramas.map((drama) => (
            <Card key={drama.id} className="rural-card-hover overflow-hidden">
              <div className="aspect-video relative cursor-pointer group overflow-hidden">
                <img 
                  src={drama.cover} 
                  alt={drama.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                    <Play className="w-8 h-8 text-[#2d5016] ml-1" />
                  </div>
                </div>
                <Badge className="absolute top-2 left-2 bg-[#2d5016]">{drama.category}</Badge>
                <Badge className="absolute top-2 right-2 bg-[#8bc34a]">{drama.genre}</Badge>
              </div>
              <CardContent className="pt-4">
                <h3 className="font-semibold text-[#2d5016] mb-1 line-clamp-1">{drama.title}</h3>
                <p className="text-sm text-[#4a7c23] mb-2">@{drama.author}</p>
                <p className="text-sm text-[#4a7c23]/80 line-clamp-2">{drama.description}</p>
                <div className="flex gap-2 mt-3">
                  {drama.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-[#8bc34a]/20 text-[#2d5016]">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-0 flex justify-between">
                <span className="text-sm text-[#4a7c23]">{drama.views}观看</span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="text-[#4a7c23]">
                    <Heart className="w-4 h-4 mr-1" />
                    {drama.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-[#4a7c23]">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredDramas.length === 0 && (
          <div className="text-center py-12">
            <Video className="w-16 h-16 text-[#4a7c23]/40 mx-auto mb-4" />
            <p className="text-[#4a7c23]">暂无符合条件的短剧</p>
          </div>
        )}
      </section>
    </div>
  );
}
