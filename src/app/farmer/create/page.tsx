'use client';

import { useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import {
  Video, Mic, MicOff, Upload, Play, Download, ArrowLeft, ArrowRight,
  Sparkles, ShoppingBag, Building, Check, Loader2, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

type TemplateType = 'story' | 'product' | 'folk';
type StoryGenre = '霸总' | '重生' | '末世' | '豪门' | '宫斗' | '仙侠' | '穿越' | '田园';
type Dialect = '普通话' | '粤语' | '四川话' | '上海话' | '北京话' | '其他';
type Location = '乡村' | '古镇' | '城市';

interface FormData {
  templateType: TemplateType;
  dialect: Dialect;
  location: Location;
  storyGenre: StoryGenre;
  productName: string;
  customPrompt: string;
  uploadedImages: string[];
}

interface GeneratedScript {
  title: string;
  scenes: string[];
  dialogues: string[];
  productMention?: string;
}

export default function FarmerCreatePage() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') as TemplateType || 'story';
  
  const [step, setStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedText, setRecordedText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [generatedScript, setGeneratedScript] = useState<GeneratedScript | null>(null);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [videoProgress, setVideoProgress] = useState(0);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  
  const [formData, setFormData] = useState<FormData>({
    templateType: initialType,
    dialect: '普通话',
    location: '乡村',
    storyGenre: '重生',
    productName: '',
    customPrompt: '',
    uploadedImages: [],
  });

  const templateOptions = [
    {
      type: 'story' as TemplateType,
      title: '故事版',
      description: '热门短剧风格，引发观众情感共鸣',
      icon: Video,
      genres: ['霸总', '重生', '末世', '豪门', '宫斗', '仙侠', '穿越', '田园'],
    },
    {
      type: 'product' as TemplateType,
      title: '带货版',
      description: '直播销售风格，直接展示产品魅力',
      icon: ShoppingBag,
      genres: ['直播带货', '产品展示', '使用教程'],
    },
    {
      type: 'folk' as TemplateType,
      title: '民俗版',
      description: '展示乡村文化故事，传递人文情怀',
      icon: Building,
      genres: ['传统技艺', '民间故事', '节庆习俗', '乡村生活'],
    },
  ];

  const dialects: Dialect[] = ['普通话', '粤语', '四川话', '上海话', '北京话', '其他'];
  const locations: Location[] = ['乡村', '古镇', '城市'];

  const startRecording = () => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const recognition = new SpeechRecognition() as any;
        recognition.continuous = true;
        recognition.interimResults = true;
        
        recognition.onresult = (event: any) => {
          let finalTranscript = '';
          for (let i = 0; i < event.results.length; i++) {
            finalTranscript += event.results[i][0].transcript;
          }
          setRecordedText(finalTranscript);
        };
        
        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsRecording(false);
        };
        
        recognition.start();
        recognitionRef.current = recognition;
        setIsRecording(true);
      }
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
      setFormData(prev => ({ ...prev, customPrompt: recordedText }));
    }
  };

  const generateScript = async () => {
    setIsGenerating(true);
    setError(null);
    setLoadingMessage('正在连接AI服务...');
    
    try {
      setLoadingMessage('正在生成剧本，请稍候...');
      const response = await fetch('/api/script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateType: formData.templateType,
          dialect: formData.dialect,
          location: formData.location,
          storyGenre: formData.storyGenre,
          productName: formData.productName,
          customPrompt: formData.customPrompt || recordedText,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || '生成剧本失败，请重试');
      }
      
      if (data.success && data.script) {
        setGeneratedScript(data.script);
        setStep(3);
        setLoadingMessage('');
      } else {
        throw new Error(data.error || '剧本生成失败，请重试');
      }
    } catch (err) {
      console.error('Failed to generate script:', err);
      setError(err instanceof Error ? err.message : '生成剧本时发生错误，请检查网络连接后重试');
      setLoadingMessage('');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateVideo = async () => {
    setIsGeneratingVideo(true);
    setVideoProgress(0);
    
    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setVideoProgress(prev => Math.min(prev + 10, 90));
      }, 2000);
      
      const response = await fetch('/api/video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          script: generatedScript,
          templateType: formData.templateType,
        }),
      });
      
      const data = await response.json();
      clearInterval(progressInterval);
      
      if (data.success) {
        setVideoProgress(100);
        setGeneratedVideoUrl(data.videoUrl);
        setStep(4);
      }
    } catch (error) {
      console.error('Failed to generate video:', error);
    } finally {
      setIsGeneratingVideo(false);
    }
  };

  return (
    <div className="min-h-screen bg-rural-gradient">
      <Navbar mode="farmer" />

      {/* Progress Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= s ? 'bg-[#2d5016] text-white' : 'bg-[#8bc34a]/20 text-[#4a7c23]'
                }`}>
                  {step > s ? <Check className="w-5 h-5" /> : s}
                </div>
                <span className={`ml-2 text-sm ${
                  step >= s ? 'text-[#2d5016] font-medium' : 'text-[#4a7c23]'
                } hidden md:inline`}>
                  {s === 1 ? '选择模板' : s === 2 ? '设置参数' : s === 3 ? '生成剧本' : '生成视频'}
                </span>
                {s < 4 && <div className={`w-12 md:w-24 h-1 mx-2 rounded ${
                  step > s ? 'bg-[#2d5016]' : 'bg-[#8bc34a]/20'
                }`} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step 1: Template Selection */}
      {step === 1 && (
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-[#2d5016] text-center mb-8">
            选择短剧模板
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {templateOptions.map((template) => {
              const Icon = template.icon;
              return (
                <Card
                  key={template.type}
                  className={`cursor-pointer transition-all ${
                    formData.templateType === template.type
                      ? 'template-card active'
                      : 'template-card'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, templateType: template.type }))}
                >
                  <CardHeader className="text-center pb-2">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                      formData.templateType === template.type
                        ? 'bg-[#2d5016]'
                        : 'bg-[#8bc34a]/20'
                    }`}>
                      <Icon className={`w-8 h-8 ${
                        formData.templateType === template.type ? 'text-white' : 'text-[#2d5016]'
                      }`} />
                    </div>
                    <CardTitle className="text-xl text-[#2d5016]">{template.title}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {template.genres.map((genre) => (
                        <Badge
                          key={genre}
                          variant="secondary"
                          className="bg-[#8bc34a]/20 text-[#2d5016] text-xs"
                        >
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Button
              onClick={() => setStep(2)}
              className="bg-[#2d5016] hover:bg-[#4a7c23] gap-2"
            >
              下一步：设置参数
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </section>
      )}

      {/* Step 2: Parameters */}
      {step === 2 && (
        <section className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-[#2d5016] mb-8 text-center">
              设置创作参数
            </h2>

            <Card>
              <CardContent className="pt-6 space-y-6">
                {/* Story Genre (for story template) */}
                {formData.templateType === 'story' && (
                  <div>
                    <Label className="text-[#2d5016] mb-3 block">故事题材</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {templateOptions[0].genres.map((genre) => (
                        <Button
                          key={genre}
                          variant={formData.storyGenre === genre ? 'default' : 'outline'}
                          size="sm"
                          className={
                            formData.storyGenre === genre
                              ? 'bg-[#2d5016] hover:bg-[#4a7c23]'
                              : 'border-[#8bc34a] text-[#2d5016]'
                          }
                          onClick={() => setFormData(prev => ({ ...prev, storyGenre: genre as StoryGenre }))}
                        >
                          {genre}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dialect */}
                <div>
                  <Label className="text-[#2d5016] mb-3 block">方言选择</Label>
                  <Select
                    value={formData.dialect}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, dialect: value as Dialect }))}
                  >
                    <SelectTrigger className="border-[#8bc34a]/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {dialects.map((dialect) => (
                        <SelectItem key={dialect} value={dialect}>
                          {dialect}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div>
                  <Label className="text-[#2d5016] mb-3 block">故事地点</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {locations.map((loc) => (
                      <Button
                        key={loc}
                        variant={formData.location === loc ? 'default' : 'outline'}
                        className={
                          formData.location === loc
                            ? 'bg-[#2d5016] hover:bg-[#4a7c23]'
                            : 'border-[#8bc34a] text-[#2d5016]'
                        }
                        onClick={() => setFormData(prev => ({ ...prev, location: loc }))}
                      >
                        {loc}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Product Name (for product template) */}
                {formData.templateType === 'product' && (
                  <div>
                    <Label className="text-[#2d5016] mb-3 block">产品名称</Label>
                    <Input
                      placeholder="请输入要推广的农产品名称"
                      value={formData.productName}
                      onChange={(e) => setFormData(prev => ({ ...prev, productName: e.target.value }))}
                      className="border-[#8bc34a]/30 focus:border-[#4a7c23]"
                    />
                  </div>
                )}

                {/* Custom Prompt */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-[#2d5016]">自定义描述</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#4a7c23] gap-2"
                      onClick={isRecording ? stopRecording : startRecording}
                    >
                      {isRecording ? (
                        <>
                          <MicOff className="w-4 h-4 text-red-500" />
                          <span className="text-red-500">停止录音</span>
                        </>
                      ) : (
                        <>
                          <Mic className="w-4 h-4" />
                          语音输入
                        </>
                      )}
                    </Button>
                  </div>
                  <Textarea
                    placeholder="描述你想要的短剧内容...（也可以使用上方语音按钮输入）"
                    value={recordedText || formData.customPrompt}
                    onChange={(e) => setFormData(prev => ({ ...prev, customPrompt: e.target.value }))}
                    className="min-h-[120px] border-[#8bc34a]/30 focus:border-[#4a7c23]"
                  />
                  {isRecording && (
                    <div className="flex items-center gap-2 mt-2 text-[#4a7c23]">
                      <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-sm">正在聆听...</span>
                    </div>
                  )}
                </div>

                {/* Upload Reference Images */}
                <div>
                  <Label className="text-[#2d5016] mb-3 block">参考图片上传（可选）</Label>
                  <div className="border-2 border-dashed border-[#8bc34a]/30 rounded-lg p-8 text-center">
                    <Upload className="w-8 h-8 text-[#4a7c23] mx-auto mb-2" />
                    <p className="text-sm text-[#4a7c23]">点击上传农户人物自拍、乡村素材或产品素材</p>
                    <p className="text-xs text-[#4a7c23]/60 mt-1">支持 JPG、PNG 格式，最多9张</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="border-[#4a7c23] text-[#2d5016] gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                上一步
              </Button>
              <Button
                onClick={generateScript}
                disabled={isGenerating || (!formData.customPrompt && !recordedText)}
                className="bg-[#2d5016] hover:bg-[#4a7c23] gap-2 min-w-[160px]"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    生成中...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    生成剧本
                  </>
                )}
              </Button>
            </div>

            {/* Loading Message */}
            {isGenerating && loadingMessage && (
              <div className="mt-4 text-center">
                <p className="text-sm text-[#4a7c23] animate-pulse">{loadingMessage}</p>
                <p className="text-xs text-[#4a7c23]/60 mt-1">首次生成可能需要10-30秒，请耐心等待</p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <Alert className="mt-4 bg-red-50 border-red-200">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <AlertDescription className="text-red-700">
                  {error}
                  <button 
                    onClick={() => setError(null)}
                    className="ml-2 underline hover:no-underline"
                  >
                    关闭
                  </button>
                </AlertDescription>
              </Alert>
            )}
          </div>
        </section>
      )}

      {/* Step 3: Generated Script */}
      {step === 3 && generatedScript && (
        <section className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <Alert className="bg-[#8bc34a]/20 border-[#8bc34a] mb-6">
              <Sparkles className="w-5 h-5 text-[#2d5016]" />
              <AlertDescription className="text-[#2d5016]">
                剧本已生成！您可以查看并编辑，或直接生成视频。
              </AlertDescription>
            </Alert>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-[#2d5016]">{generatedScript.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#2d5016] mb-2">场景设定</h4>
                  <div className="space-y-2">
                    {generatedScript.scenes.map((scene, i) => (
                      <div key={i} className="flex gap-3">
                        <Badge className="shrink-0 bg-[#8bc34a]/20 text-[#2d5016]">
                          {i + 1}
                        </Badge>
                        <p className="text-[#4a7c23]">{scene}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-[#2d5016] mb-2">台词对话</h4>
                  <div className="space-y-3 bg-[#8bc34a]/10 rounded-lg p-4">
                    {generatedScript.dialogues.map((dialogue, i) => (
                      <p key={i} className="text-[#4a7c23] italic">"{dialogue}"</p>
                    ))}
                  </div>
                </div>
                {generatedScript.productMention && (
                  <div>
                    <h4 className="font-semibold text-[#2d5016] mb-2">产品植入</h4>
                    <p className="text-[#4a7c23] bg-[#2d5016]/10 rounded-lg p-3">
                      {generatedScript.productMention}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setStep(2)}
                className="border-[#4a7c23] text-[#2d5016] gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                重新编辑
              </Button>
              <Button
                onClick={generateVideo}
                disabled={isGeneratingVideo}
                className="bg-[#2d5016] hover:bg-[#4a7c23] gap-2"
              >
                {isGeneratingVideo ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    正在生成视频...
                  </>
                ) : (
                  <>
                    <Video className="w-4 h-4" />
                    生成视频
                  </>
                )}
              </Button>
            </div>

            {isGeneratingVideo && (
              <div className="mt-6">
                <p className="text-sm text-[#4a7c23] mb-2">视频生成进度</p>
                <Progress value={videoProgress} className="h-2 bg-[#8bc34a]/20" />
                <p className="text-xs text-[#4a7c23]/60 mt-1">
                  请耐心等待，视频生成可能需要几分钟...
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Step 4: Video Generated */}
      {step === 4 && generatedVideoUrl && (
        <section className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <Alert className="bg-[#2d5016] border-[#2d5016] mb-6">
              <Check className="w-5 h-5 text-white" />
              <AlertDescription className="text-white">
                视频生成成功！您可以预览、下载或分享您的作品。
              </AlertDescription>
            </Alert>

            <Card className="overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-[#2d5016] to-[#4a7c23] relative">
                <video
                  src={generatedVideoUrl}
                  controls
                  className="w-full h-full"
                  poster="/api/placeholder/800/450"
                />
              </div>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-[#2d5016] text-lg mb-4">
                  {generatedScript?.title}
                </h3>
                <div className="flex gap-3">
                  <Button className="flex-1 bg-[#2d5016] hover:bg-[#4a7c23] gap-2">
                    <Download className="w-4 h-4" />
                    下载视频
                  </Button>
                  <Button variant="outline" className="flex-1 border-[#4a7c23] text-[#2d5016] gap-2">
                    <Play className="w-4 h-4" />
                    预览效果
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center mt-8 gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  setStep(1);
                  setGeneratedScript(null);
                  setGeneratedVideoUrl(null);
                  setFormData({
                    templateType: 'story',
                    dialect: '普通话',
                    location: '乡村',
                    storyGenre: '重生',
                    productName: '',
                    customPrompt: '',
                    uploadedImages: [],
                  });
                }}
                className="border-[#4a7c23] text-[#2d5016] gap-2"
              >
                <Sparkles className="w-4 h-4" />
                创建新短剧
              </Button>
              <Button className="bg-[#2d5016] hover:bg-[#4a7c23] gap-2">
                <Video className="w-4 h-4" />
                查看我的作品
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
