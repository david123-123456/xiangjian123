import Link from 'next/link';
import { Leaf, Video, ShoppingBag, Users, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-rural-gradient">
      {/* Header */}
      <header className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2d5016] to-[#4a7c23] flex items-center justify-center shadow-lg">
            <Leaf className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[#2d5016]">乡见</h1>
        </div>
        <p className="text-center text-[#4a7c23] mt-2 text-lg">连接乡村与城市的助农平台</p>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2d5016] mb-6">
            用短剧讲述乡村故事
            <br />
            用产品连接万家灯火
          </h2>
          <p className="text-lg text-[#4a7c23] mb-8">
            乡见是一个创新的助农平台，让农户通过AI生成的创意短剧推广优质农产品，
            让消费者在观看精彩内容的同时，发现来自田野的馈赠。
          </p>
        </div>
      </section>

      {/* Mode Selection */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Consumer Card */}
          <Link href="/consumer">
            <Card className="rural-card-hover cursor-pointer border-2 border-transparent hover:border-[#4a7c23] bg-rural-card">
              <CardHeader className="text-center pb-2">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#8bc34a] to-[#4a7c23] flex items-center justify-center shadow-lg animate-float">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl text-[#2d5016]">消费者端</CardTitle>
                <CardDescription className="text-[#4a7c23]">
                  浏览精彩短剧，发现优质农产品
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-[#4a7c23]">
                  <li className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-[#4a7c23]" />
                    观看农户创作的创意短剧
                  </li>
                  <li className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-[#4a7c23]" />
                    购买来自乡村的优质农产品
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#4a7c23]" />
                    发现乡村故事与文化
                  </li>
                </ul>
                <Button className="w-full bg-[#2d5016] hover:bg-[#4a7c23] gap-2">
                  进入消费端
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>

          {/* Farmer Card */}
          <Link href="/farmer">
            <Card className="rural-card-hover cursor-pointer border-2 border-transparent hover:border-[#4a7c23] bg-rural-card">
              <CardHeader className="text-center pb-2">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#4a7c23] to-[#2d5016] flex items-center justify-center shadow-lg animate-sway">
                  <Leaf className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl text-[#2d5016]">农户端</CardTitle>
                <CardDescription className="text-[#4a7c23]">
                  AI赋能创作，推广你的农产品
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-[#4a7c23]">
                  <li className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#4a7c23]" />
                    AI生成创意短剧剧本
                  </li>
                  <li className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-[#4a7c23]" />
                    一键生成短剧视频
                  </li>
                  <li className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-[#4a7c23]" />
                    展示并销售农产品
                  </li>
                </ul>
                <Button className="w-full bg-[#4a7c23] hover:bg-[#2d5016] gap-2">
                  进入农户端
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-2xl font-bold text-[#2d5016] text-center mb-8">平台特色</h3>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <FeatureCard
            icon={Video}
            title="创意短剧模板"
            description="故事版、带货版、民俗版，多种短剧模板任你选择"
          />
          <FeatureCard
            icon={Sparkles}
            title="AI智能生成"
            description="输入关键词，AI自动生成精彩剧本和视频"
          />
          <FeatureCard
            icon={Leaf}
            title="乡村振兴"
            description="用科技赋能农业，让乡村被更多人看见"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-[#8bc34a]/20">
        <div className="text-center text-[#4a7c23] text-sm">
          <p>乡见 - 让每一份耕耘都被看见</p>
          <p className="mt-2">用短剧讲述乡村故事，用产品连接城市万家</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <Card className="bg-white/80 backdrop-blur border-[#8bc34a]/30">
      <CardContent className="pt-6 text-center">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#8bc34a]/20 flex items-center justify-center">
          <Icon className="w-6 h-6 text-[#2d5016]" />
        </div>
        <h4 className="font-semibold text-[#2d5016] mb-2">{title}</h4>
        <p className="text-sm text-[#4a7c23]">{description}</p>
      </CardContent>
    </Card>
  );
}
