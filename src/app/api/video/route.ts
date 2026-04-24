import { NextRequest, NextResponse } from 'next/server';
import { VideoGenerationClient, Config, HeaderUtils } from 'coze-coding-dev-sdk';

interface VideoRequest {
  script: {
    title: string;
    scenes: string[];
    dialogues: string[];
    productMention?: string;
  };
  templateType: 'story' | 'product' | 'folk';
}

export async function POST(request: NextRequest) {
  try {
    const body: VideoRequest = await request.json();
    const { script, templateType } = body;

    const customHeaders = HeaderUtils.extractForwardHeaders(request.headers);
    const config = new Config({ timeout: 120000 }); // 2 minute timeout for video generation
    const client = new VideoGenerationClient(config, customHeaders);

    // Build video prompt based on template type
    let prompt = '';
    
    if (templateType === 'story') {
      prompt = `A cinematic short drama scene: ${script.scenes[0] || script.title}. `;
      prompt += `Beautiful rural landscape with ${script.dialogues[0] || 'warm dialogue'}. `;
      prompt += `Emotional storytelling, high quality, cinematic lighting.`;
    } else if (templateType === 'product') {
      prompt = `A promotional video showcasing agricultural products: ${script.productMention || script.title}. `;
      prompt += `Clean, professional product display with warm rural background. `;
      prompt += `Modern e-commerce style, appealing visuals.`;
    } else {
      prompt = `A cultural documentary style video: ${script.scenes[0] || script.title}. `;
      prompt += `Showcasing traditional rural life and folk culture. `;
      prompt += `Peaceful atmosphere, authentic and heartwarming.`;
    }

    const content = [
      {
        type: 'text' as const,
        text: prompt,
      },
    ];

    // Generate video
    const response = await client.videoGeneration(content, {
      model: 'doubao-seedance-1-5-pro-251215',
      duration: 5,
      ratio: '16:9',
      resolution: '720p',
      generateAudio: true,
      watermark: true,
    });

    if (response.videoUrl) {
      return NextResponse.json({
        success: true,
        videoUrl: response.videoUrl,
        taskId: response.response.id,
        status: response.response.status,
      });
    } else {
      return NextResponse.json({
        success: false,
        error: 'Video generation failed',
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Video generation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate video' },
      { status: 500 }
    );
  }
}
