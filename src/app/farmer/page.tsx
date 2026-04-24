import { Navbar } from '@/components/layout/Navbar';
import Link from 'next/link';
import { Video, ShoppingBag, ArrowRight, Sparkles, TrendingUp, Users, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// 短剧封面图片
const dramaCovers = {
  folk: 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_259bd5c3-4bef-4406-a258-d5b81f0facd8.jpeg',
  ceo: 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_2e25884b-578f-4054-aa4a-0db6cc6d0145.jpeg',
  live: 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_d6ae9249-4fb7-4937-ab53-c745efbad851.jpeg',
  creation: 'https://coze-coding-project.tos.coze.site/coze_storage_7632202352149168164/image/generate_image_688d376b-db6d-4a02-bf0b-203b5ecb0476.jpeg',
};

const stats = [
  { label: '已创作短剧', value: '12', icon: Video },
  { label: '累计观看', value: '45.6万', icon: Users },
  { label: '商品销量', value: '892单', icon: ShoppingBag },
  { label: '创作收益', value: '¥12,580', icon: TrendingUp },
];

const recentDramas = [
  { id: '1', title: '柚子飘香的秘密', views: '12.5万', status: '已发布', createdAt: '2024-01-15', cover: dramaCovers.folk },
  { id: '2', title: '霸总的乡村奇遇', views: '8.3万', status: '已发布', createdAt: '2024-01-12', cover: dramaCovers.ceo },
  { id: '3', title: '重生之我在农村卖苹果', views: '15.7万', status: '已发布', createdAt: '2024-01-10', cover: dramaCovers.live },
  { id: '4', title: '农户创作中', views: '0', status: '创作中', createdAt: '2024-01-18', cover: dramaCovers.creation },
];

const quickActions = [
  { label: '创建故事版', description: '霸总、重生、末世等热门题材', icon: Video, href: '/farmer/create?type=story' },
  { label: '创建带货版', description: '直播销售风格的短剧', icon: ShoppingBag, href: '/farmer/create?type=product' },
  { label: '创建民俗版', description: '展示乡村文化故事', icon: Sparkles, href: '/farmer/create?type=folk' },
];

export default function FarmerHomePage() {
  return (
    <div className="min-h-screen bg-rural-gradient">
      <Navbar mode="farmer" />

      {/* Welcome Banner */}
      <section className="bg-gradient-to-r from-[#2d5016] to-[#4a7c23] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                欢迎回来，张大哥！
              </h1>
              <p className="text-white/80 mb-6">
                用AI赋能你的农产品，用短剧讲述乡村故事。
                今天想创作什么样的内容呢？
              </p>
              <Link href="/farmer/create">
                <Button className="bg-white text-[#2d5016] hover:bg-white/90 gap-2">
                  <Plus className="w-4 h-4" />
                  创建新短剧
                </Button>
              </Link>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="w-48 h-48 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                <Sparkles className="w-24 h-24 text-white/80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="bg-white/95 backdrop-blur shadow-lg">
                <CardContent className="pt-4 text-center">
                  <Icon className="w-8 h-8 text-[#4a7c23] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-[#2d5016]">{stat.value}</p>
                  <p className="text-sm text-[#4a7c23]">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-[#2d5016] mb-6">快速创建</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.label} href={action.href}>
                <Card className="rural-card-hover cursor-pointer h-full">
                  <CardHeader className="pb-2">
                    <div className="w-12 h-12 rounded-full bg-[#8bc34a]/20 flex items-center justify-center mb-2">
                      <Icon className="w-6 h-6 text-[#2d5016]" />
                    </div>
                    <CardTitle className="text-[#2d5016]">{action.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[#4a7c23] mb-4">{action.description}</p>
                    <Button className="w-full bg-[#2d5016] hover:bg-[#4a7c23] gap-2">
                      开始创建
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Recent Dramas */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#2d5016]">最近创作</h2>
          <Link href="/farmer/create">
            <Button variant="ghost" className="text-[#2d5016] gap-2">
              查看全部
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <Card className="bg-white/95 backdrop-blur">
          <CardContent className="p-0">
            <div className="divide-y">
              {recentDramas.map((drama) => (
                <div key={drama.id} className="flex items-center justify-between p-4 hover:bg-[#8bc34a]/5">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-14 rounded overflow-hidden relative">
                      <img 
                        src={drama.cover} 
                        alt={drama.title}
                        className="w-full h-full object-cover"
                      />
                      {drama.status === '创作中' && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-[#2d5016]">{drama.title}</h4>
                      <p className="text-sm text-[#4a7c23]">创建于 {drama.createdAt}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-[#4a7c23]">{drama.views}观看</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      drama.status === '已发布' 
                        ? 'bg-[#8bc34a]/20 text-[#2d5016]' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {drama.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Tips */}
      <section className="container mx-auto px-4 py-12">
        <Card className="bg-gradient-to-r from-[#8bc34a]/20 to-[#4a7c23]/20 border-[#8bc34a]/40">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#2d5016] flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-[#2d5016] mb-2">创作小贴士</h3>
                <p className="text-sm text-[#4a7c23]">
                  故事版短剧更容易引发观众共鸣，带货版能直接促进商品转化，民俗版则能展示独特的乡村文化魅力。
                  建议您根据农产品特点选择合适的模板类型，让内容更具吸引力！
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-[#8bc34a]/20">
        <div className="text-center text-[#4a7c23] text-sm">
          <p>乡见 - 让每一份耕耘都被看见</p>
        </div>
      </footer>
    </div>
  );
}
