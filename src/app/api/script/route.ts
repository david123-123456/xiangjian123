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
      systemPrompt = `你是专业短视频编剧，擅长创作${storyGenre || '热门'}题材的爆款短剧。

【输出格式 - 必须严格遵循】
{
  "title": "完整剧名",
  "scenes": [
    {"scene_id": "1", "scene_name": "场景名称", "scene_description": "详细的场景环境描写，包括时间、地点、人物活动、氛围等，至少50字", "time": "00:00-00:30"},
    ...更多场景
  ],
  "dialogues": [
    {"scene_id": "1", "text": "角色台词，不少于30字，要自然流畅有感情", "speaker": "角色名"},
    ...更多对话
  ]
}

【强制要求 - 必须全部满足】
1. 题材：${storyGenre || '热门短剧'}（如霸总、重生、末世、穿越、豪门、宫斗、仙侠）
2. 地点：${location}（乡村/古镇/城市）
3. 语言：${dialect}（普通话/粤语/四川话/上海话/北京话/其他）
4. 场景数量：10-12个场景
5. 对话总数：60-80段
6. 每段台词：不少于30字
7. 场景描写：每个场景不少于50字详细描写
8. 剧情要完整：包含开头、发展、高潮、结局
9. 参考ID：${uniqueId}

【禁止】
- 不要输出JSON以外的任何内容
- 不要输出解释或说明
- 不要简化或省略任何内容`;

      userPrompt = `【强制任务】请根据以下要求创作一个完整的${storyGenre || '热门'}题材短剧剧本：

用户补充：${customPrompt || '请创作一个精彩的故事'}

要求：
1. 必须严格遵循JSON格式
2. 必须创作10-12个场景
3. 总对话数60-80段
4. 每个场景有详细的描写
5. 每段台词不少于30字，自然流畅
6. 故事完整，有起承转合
7. 体现${location}的地方特色
8. 角色语言风格符合${dialect}

请立即输出完整的JSON剧本，不要有任何省略或简化。`;
    } else if (templateType === 'product') {
  systemPrompt = `你是专业带货主播编剧，擅长创作有感染力的农产品直播带货剧本。

【输出格式 - 必须严格遵循】
{
  "title": "完整标题",
  "scenes": [
    {"scene_id": "1", "scene_name": "场景名称", "scene_description": "详细的场景描写，包括主播状态、环境氛围、观众互动等，至少50字", "time": "00:00-00:30"}
  ],
  "dialogues": [
    {"scene_id": "1", "text": "主播台词，不少于30字，要有感染力、说服力", "speaker": "角色名"}
  ]
}

【强制要求】
1. 产品：${productName || '农产品'}
2. 语言：${dialect}
3. 场景数量：8-10个场景
4. 对话总数：50-70段
5. 每段台词不少于30字
6. 场景描写每个不少于50字`;

  userPrompt = `【强制任务】创作推广${productName || '农产品'}的完整直播带货剧本：用户补充${customPrompt || '详细介绍产品特色和卖点'}。要求：创作8-10个场景，50-70段对话，每段30字以上。请输出完整JSON。`;
} else {
      systemPrompt = `你是乡村文化编剧。严格输出JSON格式。
格式：{"title":"标题","scenes":[{"scene_id":"1","scene_name":"场景名","scene_description":"场景描写","time":"时间"}],"dialogues":[{"scene_id":"1","text":"台词","speaker":"角色"}]}
要求：
- 地点：${location}
- 语言：${dialect}
- 至少6个场景
- 总对话数>=30段
- 展现乡村文化魅力和人文情怀，创作8-10个场景，50-70段对话，每段30字以上`;

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

    // Helper function to create fallback script with more content
    const createFallbackScript = () => {
      const baseScenes = [
        { scene_id: '1', scene_name: '开场介绍', scene_description: '清晨的阳光洒在金黄的麦田上，主人公站在村口的老槐树下，向观众介绍这个美丽的乡村和这里勤劳的村民们。微风吹过，麦浪起伏，远处传来鸡鸣狗吠的声音，一幅生机勃勃的乡村画卷徐徐展开。', time: '00:00-00:45' },
        { scene_id: '2', scene_name: '乡村风景', scene_description: '镜头跟随主人公走进村庄，展示青砖灰瓦的老房子、石板铺就的小路、门前晾晒的农作物。村民们三三两两地聚在村口大树下乘凉聊天，孩子们在巷子里追逐嬉戏，老人们在门前编织竹筐，一派祥和的乡村生活景象。', time: '00:45-01:30' },
        { scene_id: '3', scene_name: '农产品展示', scene_description: '主人公带大家来到自家的院子，展示今天要推荐的农产品。从菜园里新鲜采摘的蔬菜到果园里成熟的水果，从山上采集的野味到农家自制的特产，每一样都凝聚着村民们的心血和汗水。', time: '01:30-02:15' },
        { scene_id: '4', scene_name: '产品介绍', scene_description: '主人公详细介绍每一样农产品的特点、产地、种植方式、口感和营养价值。用朴实的话语讲述农产品背后的故事，让观众感受到乡村人民的真诚和热情。', time: '02:15-03:00' },
        { scene_id: '5', scene_name: '品尝环节', scene_description: '主人公现场品尝农产品，展示真实的口感和品质。通过品尝让观众更直观地了解产品的优良品质，增强购买的信心。', time: '03:00-03:45' },
        { scene_id: '6', scene_name: '村民互动', scene_description: '邀请村里的老人或长辈讲述农产品制作的传统工艺，传承乡村文化。让观众了解这些农产品背后的历史和文化内涵。', time: '03:45-04:30' },
        { scene_id: '7', scene_name: '购买号召', scene_description: '主人公真诚地号召观众下单购买，支持乡村发展，感谢每一位支持乡村产业的朋友。用温暖的话语打动观众的心。', time: '04:30-05:15' },
        { scene_id: '8', scene_name: '结尾祝福', scene_description: '主人公和村民们一起向观众道别，送上祝福。感谢大家的支持和陪伴，期待与大家再次相见，共同见证乡村的美好发展。', time: '05:15-06:00' },
      ];
      
      const baseDialogues = [
        { scene_id: '1', text: '大家好，欢迎来到我们美丽的乡村！我是小王，今天带大家看看我们这里的特色农产品。', speaker: '主人公' },
        { scene_id: '1', text: '大家看看这金灿灿的麦田，再过一个星期就可以收割了，今年又是一个丰收年啊！', speaker: '主人公' },
        { scene_id: '1', text: '我们这里的空气好、水好、土地好，种出来的农产品那是真正的绿色天然无污染！', speaker: '主人公' },
        { scene_id: '2', text: '现在让我们走进村庄，看看这里的生活。大家看这青砖灰瓦的老房子，都有上百年的历史了。', speaker: '旁白' },
        { scene_id: '2', text: '村里的大爷大妈们可热情了，每天都在这棵老槐树下乘凉聊天，生活可惬意了。', speaker: '主人公' },
        { scene_id: '2', text: '这些石板路都是祖辈们一块一块铺起来的，走在上面特别踏实，感觉时光都慢下来了。', speaker: '主人公' },
        { scene_id: '3', text: '现在来到我家院子，给大家展示一下我们今天要推荐的农产品，每一样都是精心挑选的！', speaker: '主人公' },
        { scene_id: '3', text: '这些都是今天一大早从地里新鲜采摘的，还带着露水呢，保证新鲜度！', speaker: '主人公' },
        { scene_id: '3', text: '大家看看这蔬菜的颜色，多鲜嫩啊！绝对是没有打过农药的绿色蔬菜。', speaker: '主人公' },
        { scene_id: '4', text: '首先给大家介绍这个苹果，是我们村果园里种的，皮薄肉脆，汁水特别多。', speaker: '主人公' },
        { scene_id: '4', text: '我们的苹果都是用山泉水浇灌的，施的是农家肥，所以特别甜特别好吃。', speaker: '主人公' },
        { scene_id: '4', text: '再给大家看看这个蜂蜜，这是我们村养蜂人老李家的土蜂蜜，纯天然无添加。', speaker: '主人公' },
        { scene_id: '4', text: '老李养蜂三十多年了，经验丰富，他家的蜂蜜在十里八乡都是出了名的好！', speaker: '主人公' },
        { scene_id: '5', text: '说了这么多，可能大家还是不太放心，那我现在就给大家现场品尝一下！', speaker: '主人公' },
        { scene_id: '5', text: '哇，这苹果咬一口下去，真是太甜了！汁水特别多，口感脆脆的，特别好吃！', speaker: '主人公' },
        { scene_id: '5', text: '再来尝尝这蜂蜜，用温水冲泡后特别香甜，喝一口感觉整个人都精神了！', speaker: '主人公' },
        { scene_id: '5', text: '而且这个蜂蜜营养价值特别高，富含多种维生素和矿物质，老少皆宜！', speaker: '主人公' },
        { scene_id: '6', text: '说起这个蜂蜜的制作工艺啊，我专门请来了我们村的养蜂专家老李给大家讲讲。', speaker: '主人公' },
        { scene_id: '6', text: '养蜂这个活儿啊，得勤快还得有耐心，每天都要查看蜂箱的情况。', speaker: '老李' },
        { scene_id: '6', text: '我们村的蜂蜜都是传统工艺酿造的，绝对不掺假，保证让大家吃得放心！', speaker: '老李' },
        { scene_id: '7', text: '说了这么多，就是想让大家都尝尝我们乡村的好东西，支持一下我们农民。', speaker: '主人公' },
        { scene_id: '7', text: '点击下方链接就可以下单了，我们会在第一时间给您发货，保证新鲜直达！', speaker: '主人公' },
        { scene_id: '7', text: '现在下单还有优惠活动，买二送一，多买多送，机会难得，不要错过哦！', speaker: '主人公' },
        { scene_id: '7', text: '您的每一份支持都是在帮助乡村发展，帮助农民增收，感谢大家！', speaker: '主人公' },
        { scene_id: '8', text: '好了，今天的推荐就到这里，感谢大家观看和支持！', speaker: '主人公' },
        { scene_id: '8', text: '祝大家生活愉快，身体健康，期待与大家下次再见！', speaker: '主人公' },
        { scene_id: '8', text: '也欢迎大家有机会来我们乡村做客，尝尝农家菜，看看乡村美景！', speaker: '主人公' },
      ];
      
      // Customize based on template type
      if (templateType === 'story' && storyGenre) {
        return {
          title: `${storyGenre}题材乡村故事 - ${dialect}版`,
          scenes: baseScenes.map((s, i) => ({
            ...s,
            scene_name: `第${i + 1}幕：${storyGenre}剧情展开`,
            scene_description: `在这个${storyGenre}题材的故事中，${location}的乡村背景为剧情增添了独特的乡土气息。${s.scene_description}`,
          })),
          dialogues: baseDialogues.map((d, i) => ({
            ...d,
            text: `[${storyGenre}剧情] ${d.text}`,
          })),
        };
      } else if (templateType === 'folk') {
        return {
          title: `${location}乡村文化 - ${dialect}版`,
          scenes: baseScenes.map((s, i) => ({
            ...s,
            scene_name: `展现${location}文化的第${i + 1}幕`,
            scene_description: `${location}的乡村有着独特的文化底蕴，${s.scene_description}`,
          })),
          dialogues: baseDialogues,
        };
      } else if (templateType === 'product' && productName) {
        return {
          title: `${productName}推荐专场`,
          scenes: baseScenes,
          dialogues: baseDialogues.map((d, i) => ({
            ...d,
            text: `[${productName}] ${d.text}`,
          })),
          productMention: `今天重点推荐的是我们的${productName}，品质上乘，欢迎选购！`,
        };
      }
      
      return {
        title: `乡间的故事 - ${dialect}版`,
        scenes: baseScenes,
        dialogues: baseDialogues,
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
