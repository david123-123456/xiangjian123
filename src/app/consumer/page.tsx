import { Navbar } from '@/components/layout/Navbar';
import Link from 'next/link';
import { Video, ShoppingBag, ArrowRight, TrendingUp, Sparkles, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// 短剧封面图片
const dramaCovers = {
  folk: 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_259bd5c3-4bef-4406-a258-d5b81f0facd8.jpeg',
  ceo: 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_2e25884b-578f-4054-aa4a-0db6cc6d0145.jpeg',
  live: 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_d6ae9249-4fb7-4937-ab53-c745efbad851.jpeg',
  rebirth: 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_ee551e00-61e5-498b-b65b-64477f0d9543.jpeg',
  apocalypse: 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_10873636-465c-462f-8edd-2e77bdcc1108.jpeg',
  timetravel: 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_86e31c49-f5d5-4c54-b4e4-ae867a3c4d3b.jpeg',
  rich: 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_51da36f2-785b-49de-9896-00a1cba0e59e.jpeg',
  palace: 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_1f7bc6cd-743b-4dee-ab0c-195571f98425.jpeg',
  fantasy: 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_e9dcfffa-c2c0-434f-b51f-41379374c21c.jpeg',
};

// 农产品封面图片
const productCovers = {
  apple: 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_275cd96f-c3ed-441f-a8ad-7331cd069caf.jpeg',
  honey: 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_6b135382-9e83-4ef8-8f2f-7a9a32c735e6.jpeg',
  vegetables: 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_c85a8acf-936d-4e44-9bf4-6cfdaa47de0f.jpeg',
  tea: 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_0823672b-1d42-4a03-bc54-5fcb0d3fdda8.jpeg',
  eggs: 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_b070fb9c-26c3-4176-9d3a-736776801475.jpeg',
};

const featuredDramas = [
  {
    id: '1',
    title: '柚子飘香的秘密',
    category: '民俗版',
    author: '刘家柚园',
    views: '12.5万',
    likes: 8900,
    cover: dramaCovers.folk,
    description: '讲述柚农老刘一家与柚子的感人故事',
  },
  {
    id: '2',
    title: '霸总的乡村奇遇',
    category: '故事版',
    author: '王大姐特产店',
    views: '8.3万',
    likes: 5600,
    cover: dramaCovers.ceo,
    description: '都市霸总误入乡村，邂逅质朴爱情',
  },
  {
    id: '3',
    title: '重生之我在农村卖苹果',
    category: '带货版',
    author: '红富士农场',
    views: '15.7万',
    likes: 12000,
    cover: dramaCovers.live,
    description: '女主重生回到农村，用苹果致富的励志故事',
  },
  {
    id: '4',
    title: '末世农场的希望',
    category: '末世',
    author: '希望农场',
    views: '6.2万',
    likes: 4200,
    cover: dramaCovers.apocalypse,
    description: '末世幸存者在农村重建家园的感人故事',
  },
  {
    id: '5',
    title: '穿越古代当农民',
    category: '穿越',
    author: '古村驿站',
    views: '9.8万',
    likes: 7800,
    cover: dramaCovers.timetravel,
    description: '现代人穿越到古代农村，用智慧改变命运',
  },
];

const hotProducts = [
  {
    id: '1',
    name: '正宗山东红富士苹果',
    price: 39.9,
    originalPrice: 59.9,
    sales: 2580,
    image: productCovers.apple,
    farm: '红富士农场',
  },
  {
    id: '2',
    name: '农家自酿蜂蜜',
    price: 68.0,
    originalPrice: 98.0,
    sales: 1860,
    image: productCovers.honey,
    farm: '深山蜂场',
  },
  {
    id: '3',
    name: '现挖有机红薯',
    price: 28.8,
    originalPrice: 38.8,
    sales: 3200,
    image: productCovers.vegetables,
    farm: '绿色田园',
  },
  {
    id: '4',
    name: '武夷山农家茶叶',
    price: 88.0,
    originalPrice: 128.0,
    sales: 1450,
    image: productCovers.tea,
    farm: '云雾茶园',
  },
  {
    id: '5',
    name: '正宗土鸡蛋',
    price: 45.0,
    originalPrice: 58.0,
    sales: 2100,
    image: productCovers.eggs,
    farm: '乡村鸡舍',
  },
];

export default function ConsumerHomePage() {
  return (
    <div className="min-h-screen bg-rural-gradient">
      <Navbar mode="consumer" />

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#2d5016] to-[#4a7c23] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                发现乡村之美
              </h1>
              <p className="text-white/80 mb-6">
                在这里，你可以观看来自全国各地农户创作的精彩短剧，
                了解乡村故事，发现并购买来自田野的优质农产品。
              </p>
              <div className="flex gap-4">
                <Link href="/consumer/dramas">
                  <Button className="bg-white text-[#2d5016] hover:bg-white/90 gap-2">
                    <Video className="w-4 h-4" />
                    浏览短剧
                  </Button>
                </Link>
                <Link href="/consumer/shop">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    选购农产品
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="w-48 h-48 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                <Sparkles className="w-24 h-24 text-white/80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dramas */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#2d5016]">热门短剧</h2>
            <p className="text-[#4a7c23]">发现农户们创作的精彩故事</p>
          </div>
          <Link href="/consumer/dramas">
            <Button variant="ghost" className="text-[#2d5016] gap-2">
              查看更多
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredDramas.map((drama) => (
            <Card key={drama.id} className="rural-card-hover overflow-hidden">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={drama.cover} 
                  alt={drama.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 left-2 bg-[#2d5016]">{drama.category}</Badge>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-[#2d5016] line-clamp-1">
                  {drama.title}
                </CardTitle>
                <p className="text-sm text-[#4a7c23]">{drama.author}</p>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-[#4a7c23]/80 line-clamp-2">{drama.description}</p>
              </CardContent>
              <CardFooter className="pt-0 flex justify-between text-sm text-[#4a7c23]">
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {drama.views}观看
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {drama.likes}
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Hot Products */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#2d5016]">热卖农产品</h2>
            <p className="text-[#4a7c23]">来自乡村的优质好物</p>
          </div>
          <Link href="/consumer/shop">
            <Button variant="ghost" className="text-[#2d5016] gap-2">
              查看更多
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {hotProducts.map((product) => (
            <Card key={product.id} className="rural-card-hover overflow-hidden">
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-red-500">热卖</Badge>
              </div>
              <CardContent className="pt-4">
                <p className="text-xs text-[#4a7c23] mb-1">{product.farm}</p>
                <CardTitle className="text-base text-[#2d5016] line-clamp-2 mb-2">
                  {product.name}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-[#2d5016]">¥{product.price}</span>
                  <span className="text-sm text-[#4a7c23]/60 line-through">¥{product.originalPrice}</span>
                </div>
                <p className="text-xs text-[#4a7c23] mt-1">{product.sales}人已购买</p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button className="w-full bg-[#2d5016] hover:bg-[#4a7c23]">
                  加入购物车
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-[#8bc34a]/20 mt-12">
        <div className="text-center text-[#4a7c23] text-sm">
          <p>乡见 - 让每一份耕耘都被看见</p>
        </div>
      </footer>
    </div>
  );
}
