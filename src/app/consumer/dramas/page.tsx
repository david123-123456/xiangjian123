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

// 短剧封面图片
const dramaCovers = [
  'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_1467257c-8941-4a62-a58b-257d7f96948c.jpeg?sign=1808551597-e576537e09-0-c66cfc375616d258a039534b5805258a55c9ec7f41673f56338548647dd2ddd6',
  'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_d3ec4e66-cf63-49f4-b827-a685d54c2c98.jpeg?sign=1808551598-12fcda7ecb-0-6a6afee286e25dcd80d3632a211d413c31963e254273fa647629a07b06d9e8cc',
  'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_f065b8d4-106f-42b7-b05b-b7b18e265661.jpeg?sign=1808551598-881aaeefdf-0-ee819cae4188d826424d28915b093462500847938eeac593672d5b7c303f2093',
  'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_1df2bf54-0d21-46a4-a906-f0431a3e05bc.jpeg?sign=1808551599-3e81ed112e-0-3f80f14a0289658aaa9912f1a7ebdb42c5bcf7ebc4e61cb24d096cbc0b7d5173',
  'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_97ccb309-c254-4a77-b539-e9172550f31b.jpeg?sign=1808551591-513fd2507e-0-db665212101cd42a701f72273bf3b98c6933e57b2900a0c3c36dc7e859381f2f',
  'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_9288f439-ab08-49ec-af2f-62cffbd54484.jpeg?sign=1808551591-5a924d8c94-0-9a331bd34e70a8e76bd59e6f3bd0d7f3835747f92681e9e27db2bebbadf83af6',
];

const allDramas = [
  {
    id: '1',
    title: '柚子飘香的秘密',
    category: '民俗版',
    genre: '乡村',
    author: '刘家柚园',
    views: '12.5万',
    likes: 8900,
    cover: dramaCovers[0],
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
    cover: dramaCovers[1],
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
    cover: dramaCovers[2],
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
    cover: dramaCovers[3],
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
    cover: dramaCovers[4],
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
    cover: dramaCovers[5],
    description: '现代茶艺师穿越到古代，与茶农一起书写茶文化传奇。',
    tags: ['穿越', '茶文化', '历史'],
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
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
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
