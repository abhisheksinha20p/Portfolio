import DOMPurify from 'dompurify';

const MAX_REQUESTS_PER_DAY = 100;

interface UsageData {
  count: number;
  date: string;
}

const getUsageData = (): UsageData => {
  try {
    const data = localStorage.getItem('portfolio_ai_usage');
    const today = new Date().toISOString().split('T')[0];

    if (!data) {
      return { count: 0, date: today };
    }

    const parsedData = JSON.parse(data);
    if (!parsedData || typeof parsedData.count !== 'number' || parsedData.date !== today) {
      return { count: 0, date: today };
    }

    return parsedData;
  } catch (error) {
    console.error('Error reading usage data:', error);
    return { count: 0, date: new Date().toISOString().split('T')[0] };
  }
};

const incrementUsage = () => {
  try {
    const data = getUsageData();
    data.count += 1;
    localStorage.setItem('portfolio_ai_usage', JSON.stringify(data));
  } catch (error) {
    console.error('Error incrementing usage:', error);
  }
};

const sanitizeResponse = (response: string): string => {
  return DOMPurify.sanitize(response);
};

export const chatWithAI = async (message: string): Promise<string> => {
  const usage = getUsageData();

  if (usage.count >= MAX_REQUESTS_PER_DAY) {
    throw new Error(`Daily limit reached (${MAX_REQUESTS_PER_DAY} requests). Please try again tomorrow!`);
  }

  if (!message || message.trim().length === 0) {
    throw new Error('Message cannot be empty');
  }

  if (message.length > 1000) {
    throw new Error('Message is too long. Maximum 1000 characters allowed.');
  }

  try {
    const response = await fetch('/.netlify/functions/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      
      if (response.status === 429) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      }
      
      throw new Error(errorData.error || 'Failed to connect to AI service');
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }

    if (!data.response) {
      throw new Error('AI service returned an empty response');
    }

    const sanitizedResponse = sanitizeResponse(data.response);
    
    incrementUsage();
    
    return sanitizedResponse;
  } catch (error: any) {
    console.error('AI Chat Error:', error);
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your connection and try again.');
    }
    
    throw error;
  }
};

export const getRemainingRequests = (): number => {
  const usage = getUsageData();
  return Math.max(0, MAX_REQUESTS_PER_DAY - usage.count);
};
