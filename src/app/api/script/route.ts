import { NextRequest, NextResponse } from 'next/server';
import { LLMClient, Config, HeaderUtils, Message } from 'coze-coding-dev-sdk';

interface ScriptRequest {
  templateType: 'story' | 'product' | 'folk';
  dialect: string;
  location: string;
  storyGenre?: string;
  productName?: string;
  customPrompt?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ScriptRequest = await request.json();
    const { templateType, dialect, location, storyGenre, productName, customPrompt } = body;

    const customHeaders = HeaderUtils.extractForwardHeaders(request.headers);
    const config = new Config();
    const client = new LLMClient(config, customHeaders);

    // Build prompt based on template type
    let systemPrompt = '';
    let userPrompt = '';

    if (templateType === 'story') {
      const uniqueId = Date.now().toString(36);
      systemPrompt = `你是短视频编剧。严格输出JSON格式，禁止输出其他任何内容。
格式：{"title":"标题","scenes":[{"scene_id":"1","scene_name":"场景名","scene_description":"场景详细描写","time":"时间"}],"dialogues":[{"scene_id":"1","text":"台词内容，不少于20字","speaker":"角色"}]}
要求：
- 类型：${storyGenre || '热门短剧'}
- 地点：${location}
- 语言：${dialect}
- 至少8个场景
- 总对话数>=50段
- 每段台词不少于20字
- 参考ID：${uniqueId}`;

      userPrompt = `[强制]写一个${storyGenre || '热门'}题材完整短剧剧本。${customPrompt || '剧情自拟'}
- 必须输出完整JSON
- 必须包含至少8个场景
- 总对话数>=50段
- 对话内容丰富详细`;
    } else if (templateType === 'product') {
      systemPrompt = `你是带货主播编剧。严格输出JSON格式。
格式：{"title":"标题","scenes":[{"scene_id":"1","scene_name":"场景名","scene_description":"场景描写","time":"时间"}],"dialogues":[{"scene_id":"1","text":"台词","speaker":"角色"}]}
要求：
- 产品：${productName || '农产品'}
- 语言：${dialect}
- 至少6个场景
- 总对话数>=40段
- 包含开场、产品介绍、观众互动、购买号召`;

      userPrompt = `写一个推广${productName || '农产品'}的完整带货剧本。${customPrompt || '介绍产品特色和卖点'}。
格式必须是JSON，场景描写详细，对话丰富有感染力。`;
    } else {
      systemPrompt = `你是乡村文化编剧。严格输出JSON格式。
格式：{"title":"标题","scenes":[{"scene_id":"1","scene_name":"场景名","scene_description":"场景描写","time":"时间"}],"dialogues":[{"scene_id":"1","text":"台词","speaker":"角色"}]}
要求：
- 地点：${location}
- 语言：${dialect}
- 至少6个场景
- 总对话数>=30段
- 展现乡村文化魅力和人文情怀`;

      userPrompt = `写一个展现${location}乡村文化的完整短剧剧本。${customPrompt || '体现传统文化和民俗'}。
格式必须是JSON，场景描写详细，对话丰富温暖。`;
    }

    const messages: Message[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ];

    // Generate script with streaming
    let fullResponse = '';
    
    for await (const chunk of client.stream(messages, { 
      temperature: 1.0,
      model: 'doubao-seed-2-0-pro-260215'
    })) {
      if (chunk.content) {
        fullResponse += chunk.content.toString();
      }
    }

    // Helper function to create fallback script
    const createFallbackScript = () => {
      return {
        title: `乡间的故事 - ${dialect}版`,
        scenes: [
          { scene_id: '1', scene_name: '开场', scene_description: '清晨，阳光洒在金黄的麦田上，主人公开始了新的一天，带着对乡村的热爱和对未来的憧憬', time: '00:00-00:30' },
          { scene_id: '2', scene_name: '发展', scene_description: '在村口的小店里，大家围坐在一起聊天，分享乡村生活，讲述农产品背后的故事', time: '00:30-01:00' },
          { scene_id: '3', scene_name: '高潮', scene_description: '展示乡村特有的风景和农产品的魅力，主人公向大家推荐优质的农产品', time: '01:00-01:30' },
        ],
        dialogues: [
          { scene_id: '1', text: '大家好，欢迎来到乡见！我是你们的老朋友，今天带大家看看我们乡村的美好生活。', speaker: '旁白' },
          { scene_id: '1', text: '哇，这麦田真是太美了！金灿灿的，一看就是好收成！', speaker: '主人公' },
          { scene_id: '2', text: '是啊，我们这里的农产品都是纯天然的，没有任何添加剂，保证品质！', speaker: '村民' },
          { scene_id: '2', text: '来来来，给大家看看我们家的特产，都是精心挑选的！', speaker: '主人公' },
          { scene_id: '3', text: '这款农产品是我们的明星产品，销量一直很好，大家都夸好！', speaker: '主人公' },
          { scene_id: '3', text: '喜欢的朋友记得下单哦，我们会第一时间给您发货，感谢支持！', speaker: '旁白' },
        ],
        productMention: productName ? `今天要推荐的是我们的${productName}，品质上乘，欢迎选购！` : undefined,
      };
    };

    // Parse the response as JSON
    console.log('[Script API] Full response length:', fullResponse.length);
    console.log('[Script API] Full response preview:', fullResponse.substring(0, 500));
    
    let script = createFallbackScript(); // Default to fallback
    
    try {
      // Try to extract JSON from the response
      const jsonMatch = fullResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        console.log('[Script API] JSON found, trying to parse...');
        try {
          const parsed = JSON.parse(jsonMatch[0]);
          console.log('[Script API] Parsed successfully - scenes:', parsed?.scenes?.length, 'dialogues:', parsed?.dialogues?.length);
          
          // Normalize the script structure to match frontend expectations
          if (parsed.scenes && Array.isArray(parsed.scenes)) {
            script.scenes = parsed.scenes.map((scene: Record<string, unknown>) => ({
              scene_id: String(scene.scene_id || scene.id || Math.random()),
              scene_name: String(scene.scene_name || scene.name || '未命名场景'),
              scene_description: String(scene.scene_desc || scene.scene_description || scene.description || ''),
              time: String(scene.duration || scene.time || ''),
            }));
          }
          if (parsed.dialogues && Array.isArray(parsed.dialogues)) {
            script.dialogues = parsed.dialogues.map((dialogue: Record<string, unknown>) => ({
              scene_id: String(dialogue.scene_id || ''),
              text: String(dialogue.content || dialogue.text || ''),
              speaker: String(dialogue.character || dialogue.speaker || '旁白'),
            }));
          }
          if (parsed.title) {
            script.title = parsed.title;
          }
          console.log('[Script API] Normalized - scenes:', script.scenes?.length, 'dialogues:', script.dialogues?.length);
        } catch (parseError) {
          console.log('[Script API] JSON parse error:', parseError);
          console.log('[Script API] Using fallback script due to parse error');
          // Keep using fallback script
        }
      } else {
        console.log('[Script API] No JSON found in response, using fallback');
      }
    } catch {
      console.log('[Script API] Error processing response, using fallback');
    }

    return NextResponse.json({
      success: true,
      script,
    });
  } catch (error) {
    console.error('Script generation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate script' },
      { status: 500 }
    );
  }
}
