/**
 * Basic Markdown parser utility
 * 
 * This is a simple utility to demonstrate how the markdown content would be parsed.
 * In a production environment, you would use a full-featured markdown parser library
 * like 'marked', 'remark', or 'markdown-it'.
 */

export interface MarkdownFrontMatter {
  title: string;
  description: string;
  date: string;
  category: string;
  estimatedTime?: number;
  skill_level?: string;
  [key: string]: any;
}

export interface MarkdownSection {
  id: string;
  title: string;
  level: number;
  content: string;
}

export interface ParsedMarkdown {
  frontMatter: MarkdownFrontMatter;
  sections: MarkdownSection[];
}

/**
 * Parse front matter from markdown text
 */
function parseFrontMatter(markdown: string): MarkdownFrontMatter {
  const frontMatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = markdown.match(frontMatterRegex);
  
  if (!match) return {
    title: 'Untitled',
    description: '',
    date: new Date().toLocaleDateString(),
    category: 'Uncategorized'
  };
  
  const frontMatterText = match[1];
  const frontMatter: MarkdownFrontMatter = {
    title: 'Untitled',
    description: '',
    date: new Date().toLocaleDateString(),
    category: 'Uncategorized'
  };
  
  const lines = frontMatterText.split('\n');
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();
      frontMatter[key] = value;
    }
  }
  
  return frontMatter;
}

/**
 * Parse markdown content into sections
 */
function parseSections(markdown: string): MarkdownSection[] {
  // Remove front matter
  const contentWithoutFrontMatter = markdown.replace(/---\s*([\s\S]*?)\s*---/, '').trim();
  
  // Split by headers
  const headerRegex = /^(#{1,6})\s+(.+)$/gm;
  const sections: MarkdownSection[] = [];
  let lastIndex = 0;
  let lastLevel = 0;
  let lastTitle = '';
  let lastId = '';
  
  // Find all headers
  let match;
  while ((match = headerRegex.exec(contentWithoutFrontMatter)) !== null) {
    const headerLevel = match[1].length;
    const headerTitle = match[2].trim();
    const headerId = headerTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    const headerIndex = match.index;
    
    // If this is not the first header, add the previous section
    if (lastIndex > 0) {
      const sectionContent = contentWithoutFrontMatter.slice(lastIndex, headerIndex).trim();
      sections.push({
        id: lastId,
        title: lastTitle,
        level: lastLevel,
        content: sectionContent
      });
    }
    
    lastIndex = headerIndex;
    lastLevel = headerLevel;
    lastTitle = headerTitle;
    lastId = headerId;
  }
  
  // Add the last section
  if (lastIndex > 0) {
    const sectionContent = contentWithoutFrontMatter.slice(lastIndex).trim();
    sections.push({
      id: lastId,
      title: lastTitle,
      level: lastLevel,
      content: sectionContent
    });
  }
  
  return sections;
}

/**
 * Parse markdown text into structured content
 */
export function parseMarkdown(markdown: string): ParsedMarkdown {
  const frontMatter = parseFrontMatter(markdown);
  const sections = parseSections(markdown);
  
  return {
    frontMatter,
    sections
  };
}

/**
 * Process note/warning/tip blocks
 */
export function processAlerts(content: string): string {
  // Transform > [!NOTE] blocks
  content = content.replace(/>\s*\[!NOTE\]\s*\n([\s\S]*?)(?=\n\n|\n>|\n#|$)/g, 
    '<div class="note note-info">$1</div>');
  
  // Transform > [!WARNING] blocks
  content = content.replace(/>\s*\[!WARNING\]\s*\n([\s\S]*?)(?=\n\n|\n>|\n#|$)/g, 
    '<div class="note note-warning">$1</div>');
  
  // Transform > [!TIP] blocks
  content = content.replace(/>\s*\[!TIP\]\s*\n([\s\S]*?)(?=\n\n|\n>|\n#|$)/g, 
    '<div class="note note-tip">$1</div>');
  
  return content;
}

/**
 * Process code blocks
 */
export function processCodeBlocks(content: string): string {
  return content.replace(/```(\w+)?\n([\s\S]*?)```/g, 
    '<pre class="code-block" data-language="$1"><code>$2</code></pre>');
}

/**
 * Process lists
 */
export function processLists(content: string): string {
  // Unordered lists
  content = content.replace(/^(\*|\-|\+)\s+(.+)$/gm, '<li>$2</li>');
  content = content.replace(/(<li>.*<\/li>\n)+/g, '<ul>$&</ul>');
  
  // Ordered lists
  content = content.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>');
  content = content.replace(/(<li>.*<\/li>\n)+/g, '<ol>$&</ol>');
  
  return content;
}

/**
 * Process images
 */
export function processImages(content: string): string {
  return content.replace(/!\[(.*?)\]\((.*?)\)/g, 
    '<img src="$2" alt="$1" class="content-image">');
}

/**
 * Process links
 */
export function processLinks(content: string): string {
  return content.replace(/\[(.*?)\]\((.*?)\)/g, 
    '<a href="$2" class="content-link">$1</a>');
}

/**
 * Process basic formatting
 */
export function processFormatting(content: string): string {
  // Bold
  content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  content = content.replace(/__(.*?)__/g, '<strong>$1</strong>');
  
  // Italic
  content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');
  content = content.replace(/_(.*?)_/g, '<em>$1</em>');
  
  return content;
}

/**
 * Process paragraphs
 */
export function processParagraphs(content: string): string {
  return content.replace(/^(?!<h\d|<ul|<ol|<pre|<div).+$/gm, '<p>$&</p>');
}

/**
 * Convert markdown content to HTML
 */
export function markdownToHtml(markdown: string): string {
  let html = markdown;
  
  // Process various elements
  html = processAlerts(html);
  html = processCodeBlocks(html);
  html = processLists(html);
  html = processImages(html);
  html = processLinks(html);
  html = processFormatting(html);
  html = processParagraphs(html);
  
  return html;
}