import { Navbar } from '@/components/layout/Navbar';
import Link from 'next/link';
import { Video, ShoppingBag, ArrowRight, TrendingUp, Sparkles, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// 短剧封面图片 - 乡村助农短剧风格
const dramaCovers: Record<string, string> = {
  '霸总': 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_222e0fba-4bb8-4c6e-86e3-30d7b1734f5e.jpeg',
  '重生': 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_787dad68-7d19-4aa6-a2d9-292d79291572.jpeg',
  '末世': 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_65a46e1b-8306-4393-a05a-ccb7f7f52763.jpeg',
  '穿越': 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_734a7c06-bc85-439c-b2f7-cd922386d8ba.jpeg',
  '豪门': 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_e08dfe1c-9704-4ec9-9deb-5d6a40624098.jpeg',
  '宫斗': 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_d9c87f06-5bca-4bdb-bbbf-73d19ffd7a28.jpeg',
  '仙侠': 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_0a84bf70-6071-40e3-b99e-831d52fa07d3.jpeg',
  '带货': 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_e192f84e-9d30-4322-a009-f32a904d573c.jpeg',
  '创业': 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_e192f84e-9d30-4322-a009-f32a904d573c.jpeg',
  '非遗': 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_507061f9-b0eb-4ba9-a49a-5bbd1b2da774.jpeg',
  '文化': 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_507061f9-b0eb-4ba9-a49a-5bbd1b2da774.jpeg',
  '传承': 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_507061f9-b0eb-4ba9-a49a-5bbd1b2da774.jpeg',
  '爱情': 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_222e0fba-4bb8-4c6e-86e3-30d7b1734f5e.jpeg',
  '科幻': 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_65a46e1b-8306-4393-a05a-ccb7f7f52763.jpeg',
  '悬疑': 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_65a46e1b-8306-4393-a05a-ccb7f7f52763.jpeg',
  '搞笑': 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_734a7c06-bc85-439c-b2f7-cd922386d8ba.jpeg',
  '励志': 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_507061f9-b0eb-4ba9-a49a-5bbd1b2da774.jpeg',
  'default': 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_507061f9-b0eb-4ba9-a49a-5bbd1b2da774.jpeg',
};

// 根据类型获取封面图片
const getDramaCover = (category: string): string => {
  return dramaCovers[category] || dramaCovers.default;
};

// 农产品封面图片 - 根据产品名称自动匹配
const productCoverImages: Record<string, string> = {
  apple: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop',
  tomato: 'https://images.unsplash.com/photo-1546470427-227c7b3f8310?w=400&h=300&fit=crop',
  honey: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop',
  vegetables: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
  tea: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=300&fit=crop',
  eggs: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop',
  shrimp: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=300&fit=crop',
  chicken: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=300&fit=crop',
  strawberry: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=300&fit=crop',
  mushroom: 'https://images.unsplash.com/photo-1504545102780-26774c1bb073?w=400&h=300&fit=crop',
  corn: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=300&fit=crop',
  grape: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400&h=300&fit=crop',
  peanut: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop',
  ginger: 'https://images.unsplash.com/photo-1604975701397-6365ccbd028a?w=400&h=300&fit=crop',
  garlic: 'https://images.unsplash.com/photo-1543076659-9380cdf10613?w=400&h=300&fit=crop',
  carrot: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop',
  pork: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=300&fit=crop',
  duck: 'https://images.unsplash.com/photo-1588554182644-f82e27f4d6da?w=400&h=300&fit=crop',
  rice: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=300&fit=crop',
  default: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&h=300&fit=crop',
};

// 根据产品名称返回对应的封面图片
function getProductCover(productName: string): string {
  const name = productName.toLowerCase();
  if (name.includes('苹果') || name.includes('富士') || name.includes('apple')) return productCoverImages.apple;
  if (name.includes('番茄') || name.includes('西红柿') || name.includes('tomato')) return productCoverImages.tomato;
  if (name.includes('蜂蜜') || name.includes('honey')) return productCoverImages.honey;
  if (name.includes('蔬菜') || name.includes('青菜') || name.includes('白菜') || name.includes('vegetable')) return productCoverImages.vegetables;
  if (name.includes('茶') || name.includes('大红袍') || name.includes('龙井') || name.includes('tea')) return productCoverImages.tea;
  if (name.includes('鸡蛋') || name.includes('土蛋') || name.includes('蛋') || name.includes('egg')) return productCoverImages.eggs;
  if (name.includes('虾') || name.includes('对虾') || name.includes('明虾') || name.includes('shrimp')) return productCoverImages.shrimp;
  if (name.includes('鸡') || name.includes('土鸡') || name.includes('母鸡') || name.includes('chicken')) return productCoverImages.chicken;
  if (name.includes('草莓') || name.includes('莓') || name.includes('strawberry')) return productCoverImages.strawberry;
  if (name.includes('蘑菇') || name.includes('菌') || name.includes('香菇') || name.includes('mushroom')) return productCoverImages.mushroom;
  if (name.includes('玉米') || name.includes('苞谷') || name.includes('corn')) return productCoverImages.corn;
  if (name.includes('葡萄') || name.includes('grape')) return productCoverImages.grape;
  if (name.includes('花生') || name.includes('peanut')) return productCoverImages.peanut;
  if (name.includes('生姜') || name.includes('姜') || name.includes('ginger')) return productCoverImages.ginger;
  if (name.includes('大蒜') || name.includes('蒜') || name.includes('garlic')) return productCoverImages.garlic;
  if (name.includes('胡萝卜') || name.includes('萝卜') || name.includes('carrot')) return productCoverImages.carrot;
  if (name.includes('猪肉') || name.includes('肉') || name.includes('pork')) return productCoverImages.pork;
  if (name.includes('鸭') || name.includes('鹅') || name.includes('duck')) return productCoverImages.duck;
  if (name.includes('大米') || name.includes('稻') || name.includes('米') || name.includes('rice')) return productCoverImages.rice;
  if (name.includes('红薯') || name.includes('薯') || name.includes('地瓜')) return productCoverImages.vegetables;
  return productCoverImages.default;
}

const featuredDramas = [
  {
    id: '1',
    title: '柚子飘香的秘密',
    category: '民俗版',
    author: '刘家柚园',
    views: '12.5万',
    likes: 8900,
    cover: getDramaCover('乡村'),
    description: '讲述柚农老刘一家与柚子的感人故事',
  },
  {
    id: '2',
    title: '霸总的乡村奇遇',
    category: '故事版',
    author: '王大姐特产店',
    views: '8.3万',
    likes: 5600,
    cover: getDramaCover('霸总'),
    description: '都市霸总误入乡村，邂逅质朴爱情',
  },
  {
    id: '3',
    title: '重生之我在农村卖苹果',
    category: '带货版',
    author: '红富士农场',
    views: '15.7万',
    likes: 12000,
    cover: getDramaCover('带货'),
    description: '女主重生回到农村，用苹果致富的励志故事',
  },
  {
    id: '4',
    title: '末世农场的希望',
    category: '故事版',
    author: '希望农场',
    views: '6.2万',
    likes: 4200,
    cover: getDramaCover('末世'),
    description: '末世幸存者在农村重建家园的感人故事',
  },
  {
    id: '5',
    title: '穿越古代当农民',
    category: '故事版',
    author: '古村驿站',
    views: '9.8万',
    likes: 7800,
    cover: getDramaCover('穿越'),
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
    farm: '红富士农场',
  },
  {
    id: '2',
    name: '农家自酿蜂蜜',
    price: 68.0,
    originalPrice: 98.0,
    sales: 1860,
    farm: '深山蜂场',
  },
  {
    id: '3',
    name: '现挖有机红薯',
    price: 28.8,
    originalPrice: 38.8,
    sales: 3200,
    farm: '绿色田园',
  },
  {
    id: '4',
    name: '武夷山农家茶叶',
    price: 88.0,
    originalPrice: 128.0,
    sales: 1450,
    farm: '云雾茶园',
  },
  {
    id: '5',
    name: '正宗土鸡蛋',
    price: 45.0,
    originalPrice: 58.0,
    sales: 2100,
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
                  src={getProductCover(product.name)} 
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
