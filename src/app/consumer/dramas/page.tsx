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

// 短剧封面图片 - 乡村助农短剧风格
const dramaCovers: Record<string, string> = {
  // 故事版类型 - 乡村励志风格
  '霸总': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
  '重生': 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=300&fit=crop',
  '末世': 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop',
  '穿越': 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=300&fit=crop',
  '豪门': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop',
  '宫斗': 'https://images.unsplash.com/photo-1533669955142-6a73332af4db?w=400&h=300&fit=crop',
  '仙侠': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=300&fit=crop',
  // 带货版类型
  '带货': 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop',
  '创业': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
  // 民俗版类型 - 乡村文化
  '非遗': 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
  '文化': 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop',
  '传承': 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop',
  // 其他
  '爱情': 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=300&fit=crop',
  '科幻': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
  '悬疑': 'https://images.unsplash.com/photo-1509248961895-40216a3149f8?w=400&h=300&fit=crop',
  '搞笑': 'https://images.unsplash.com/photo-1543592939-a4e0c0f5ddcc?w=400&h=300&fit=crop',
  '励志': 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop',
  // 默认 - 乡村田园
  'default': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop',
};

// 根据类型获取封面图片
const getCoverByGenre = (tags: string[], category: string): string => {
  // 优先根据category类型获取封面
  if (category === '民俗版') return dramaCovers['传统文化'] || dramaCovers.default;
  if (category === '带货版') return dramaCovers['带货'];
  if (category === '故事版') {
    // 故事版优先根据标签获取封面
    for (const tag of tags) {
      if (dramaCovers[tag]) return dramaCovers[tag];
    }
    return dramaCovers['default'];
  }
  return dramaCovers.default;
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
    cover: getCoverByGenre(['乡村', '家庭', '励志'], '民俗版'),
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
    cover: getCoverByGenre(['霸总', '爱情', '乡村'], '故事版'),
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
    cover: getCoverByGenre(['重生', '创业', '带货'], '带货版'),
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
    cover: getCoverByGenre(['非遗', '文化', '传承'], '民俗版'),
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
    cover: getCoverByGenre(['末世', '科幻', '农业'], '故事版'),
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
    cover: getCoverByGenre(['穿越', '茶文化', '历史'], '民俗版'),
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
    cover: getCoverByGenre(['豪门', '逆袭', '爱情'], '故事版'),
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
    cover: getCoverByGenre(['仙侠', '奇幻', '农业'], '故事版'),
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
    cover: getCoverByGenre(['重生', '村长', '致富'], '带货版'),
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
