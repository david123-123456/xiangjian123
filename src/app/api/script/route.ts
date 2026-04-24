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
      systemPrompt = `你是一位专业的短视频编剧，擅长创作热门短剧剧本。请根据用户的需求生成一个引人入胜的短剧剧本。
要求：
1. 剧本要符合当下热门短剧的调性（霸总、重生、末世等）
2. 使用${dialect}风格
3. 故事发生在${location}
4. 剧本要包含场景描写和对话
5. 输出JSON格式，包含title（标题）、scenes（场景列表）、dialogues（对话列表）`;

      userPrompt = `请为我创作一个${storyGenre}题材的短剧剧本。
${customPrompt ? `用户额外要求：${customPrompt}` : ''}
请生成一个吸引人的剧本，包含：
- 有吸引力的标题
- 3-5个精彩场景
- 每个场景的详细描写
- 主要角色的对话`;
    } else if (templateType === 'product') {
      systemPrompt = `你是一位专业的带货主播编剧，擅长创作直播销售风格的短视频剧本。请根据农产品特点生成一个能有效展示产品魅力的带货剧本。
要求：
1. 剧本要自然融入产品介绍，不要太生硬
2. 使用${dialect}风格
3. 突出产品特色和卖点
4. 包含吸引人的开场和有力的号召购买`;

      userPrompt = `请为我创作一个带货短视频剧本，推广产品：${productName || '我的农产品'}
${customPrompt ? `产品特点：${customPrompt}` : ''}
请生成：
- 有吸引力的标题
- 开场抓人眼球的场景
- 产品特色介绍
- 观众互动和购买引导`;
    } else {
      systemPrompt = `你是一位专业的乡村文化纪录片编剧，擅长创作展现乡村文化魅力的短视频剧本。请根据乡村特色生成一个能传递人文情怀的故事剧本。
要求：
1. 剧本要展现乡村生活的美好和淳朴
2. 使用${dialect}风格
3. 突出${location}的地方特色
4. 传递温暖和正能量`;

      userPrompt = `请为我创作一个展现乡村文化的短剧剧本。
${customPrompt ? `用户描述：${customPrompt}` : ''}
请生成：
- 有文化内涵的标题
- 展现乡村或古镇风情的场景
- 体现传统文化或民俗的故事
- 温暖的结尾`;
    }

    const messages: Message[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ];

    // Generate script with streaming
    let fullResponse = '';
    
    for await (const chunk of client.stream(messages, { 
      temperature: 0.8,
      model: 'doubao-seed-2-0-pro-260215'
    })) {
      if (chunk.content) {
        fullResponse += chunk.content.toString();
      }
    }

    // Parse the response as JSON
    let script;
    try {
      // Try to extract JSON from the response
      const jsonMatch = fullResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        script = JSON.parse(jsonMatch[0]);
        
        // Normalize the script structure to match frontend expectations
        if (script.scenes) {
          script.scenes = script.scenes.map((scene: Record<string, unknown>) => ({
            scene_id: String(scene.scene_id || scene.id || Math.random()),
            scene_name: String(scene.scene_name || scene.name || '未命名场景'),
            scene_description: String(scene.scene_desc || scene.scene_description || scene.description || ''),
            time: String(scene.duration || scene.time || ''),
          }));
        }
        if (script.dialogues) {
          script.dialogues = script.dialogues.map((dialogue: Record<string, unknown>) => ({
            scene_id: String(dialogue.scene_id || ''),
            text: String(dialogue.content || dialogue.text || ''),
            speaker: String(dialogue.character || dialogue.speaker || '旁白'),
          }));
        }
      } else {
        // If no JSON found, create a structured response
        const lines = fullResponse.split('\n').filter(line => line.trim().length > 0);
        script = {
          title: `乡间${templateType === 'story' ? '故事' : templateType === 'product' ? '好物' : '风情'}`,
          scenes: lines.slice(0, 3).map((line, i) => ({
            scene_id: String(i + 1),
            scene_name: `场景${i + 1}`,
            scene_description: line,
            time: `00:${String(i * 30).padStart(2, '0')}-00:${String((i + 1) * 30).padStart(2, '0')}`
          })),
          dialogues: [
            { text: '欢迎来到乡见，今天给大家分享乡村的美好故事...', speaker: '旁白' },
            { text: '这是我们村里的特产，品质非常好！', speaker: '主角' },
            { text: '喜欢的朋友们记得下单哦！', speaker: '旁白' },
          ],
          productMention: templateType === 'product' ? `特别推荐：${productName}，品质优良，值得信赖！` : undefined,
        };
      }
    } catch {
      // Fallback script generation
      script = {
        title: `乡间的故事 - ${dialect}版`,
        scenes: [
          { scene_id: '1', scene_name: '开场', scene_description: '清晨，阳光洒在金黄的麦田上，主人公开始了新的一天', time: '00:00-00:30' },
          { scene_id: '2', scene_name: '发展', scene_description: '在村口的小店里，大家围坐在一起聊天，分享乡村生活', time: '00:30-01:00' },
          { scene_id: '3', scene_name: '高潮', scene_description: '展示乡村特有的风景和农产品的魅力', time: '01:00-01:30' },
        ],
        dialogues: [
          { text: '大家好，欢迎来到乡见！今天带大家看看我们乡村的美好生活。', speaker: '旁白' },
          { text: '哇，这麦田真是太美了！', speaker: '主角' },
          { text: '是啊，我们这里的农产品都是纯天然的，没有任何添加剂。', speaker: '村民' },
          { text: '喜欢的朋友记得关注我们，下次再见！', speaker: '旁白' },
        ],
        productMention: productName ? `今天要推荐的是我们的${productName}，品质上乘！` : undefined,
      };
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
