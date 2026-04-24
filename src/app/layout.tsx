import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: {
    default: '乡见 - 助农短剧与农产品平台',
    template: '%s | 乡见',
  },
  description:
    '乡见是一个连接乡村与城市的助农平台，农户可以生成创意短剧推广农产品，消费者可以观看短剧并购买优质农产品。',
  keywords: [
    '乡见',
    '助农',
    '短剧',
    '农产品',
    '乡村振兴',
    '农村电商',
  ],
  authors: [{ name: '乡见团队' }],
  generator: '乡见',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.COZE_PROJECT_ENV === 'DEV';

  return (
    <html lang="zh-CN">
      <body className={`antialiased min-h-screen bg-rural-gradient`}>
        {isDev && <Inspector />}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
