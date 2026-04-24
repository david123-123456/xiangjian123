import { Navbar } from '@/components/layout/Navbar';
import Link from 'next/link';
import { Video, ShoppingBag, ArrowRight, TrendingUp, Sparkles, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// 短剧封面图片
const dramaCovers = [
  'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_1467257c-8941-4a62-a58b-257d7f96948c.jpeg?sign=1808551597-e576537e09-0-c66cfc375616d258a039534b5805258a55c9ec7f41673f56338548647dd2ddd6',
  'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_d3ec4e66-cf63-49f4-b827-a685d54c2c98.jpeg?sign=1808551598-12fcda7ecb-0-6a6afee286e25dcd80d3632a211d413c31963e254273fa647629a07b06d9e8cc',
  'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_f065b8d4-106f-42b7-b05b-b7b18e265661.jpeg?sign=1808551598-881aaeefdf-0-ee819cae4188d826424d28915b093462500847938eeac593672d5b7c303f2093',
  'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_1df2bf54-0d21-46a4-a906-f0431a3e05bc.jpeg?sign=1808551599-3e81ed112e-0-3f80f14a0289658aaa9912f1a7ebdb42c5bcf7ebc4e61cb24d096cbc0b7d5173',
];

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

const featuredDramas = [
  {
    id: '1',
    title: '柚子飘香的秘密',
    category: '民俗版',
    author: '刘家柚园',
    views: '12.5万',
    likes: 8900,
    cover: dramaCovers[0],
    description: '讲述柚农老刘一家与柚子的感人故事',
  },
  {
    id: '2',
    title: '霸总的乡村奇遇',
    category: '故事版',
    author: '王大姐特产店',
    views: '8.3万',
    likes: 5600,
    cover: dramaCovers[1],
    description: '都市霸总误入乡村，邂逅质朴爱情',
  },
  {
    id: '3',
    title: '重生之我在农村卖苹果',
    category: '带货版',
    author: '红富士农场',
    views: '15.7万',
    likes: 12000,
    cover: dramaCovers[2],
    description: '女主重生回到农村，用苹果致富的励志故事',
  },
  {
    id: '4',
    title: '乡村创业记',
    category: '故事版',
    author: '返乡青年',
    views: '6.2万',
    likes: 4200,
    cover: dramaCovers[3],
    description: '年轻大学生返乡创业，带领村民共同致富',
  },
];

const hotProducts = [
  {
    id: '1',
    name: '正宗山东红富士苹果',
    price: 39.9,
    originalPrice: 59.9,
    sales: 2580,
    image: productImages.apple,
    farm: '红富士农场',
  },
  {
    id: '2',
    name: '农家自酿蜂蜜',
    price: 68.0,
    originalPrice: 98.0,
    sales: 1860,
    image: productImages.honey,
    farm: '深山蜂场',
  },
  {
    id: '3',
    name: '现挖有机红薯',
    price: 28.8,
    originalPrice: 38.8,
    sales: 3200,
    image: productImages.sweetPotato,
    farm: '绿色田园',
  },
  {
    id: '4',
    name: '云南新鲜蓝莓',
    price: 88.0,
    originalPrice: 128.0,
    sales: 1560,
    image: productImages.blueberry,
    farm: '云南蓝莓基地',
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
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20" />
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
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
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
