import React from 'react';

// Simple rich text renderer for Payload's default rich text format
export function RichText({ content }: { content: any }) {
  if (!content) return null;

  const renderNode = (node: any, index: number): React.ReactNode => {
    if (!node) return null;

    // Handle text nodes
    if (node.text !== undefined) {
      let text: React.ReactNode = node.text;

      if (node.bold) {
        text = <strong key={index}>{text}</strong>;
      }
      if (node.italic) {
        text = <em key={index}>{text}</em>;
      }
      if (node.underline) {
        text = <u key={index}>{text}</u>;
      }
      if (node.strikethrough) {
        text = <s key={index}>{text}</s>;
      }
      if (node.code) {
        text = <code key={index} className="bg-gray-100 px-1 py-0.5 rounded text-sm">{text}</code>;
      }

      return text;
    }

    // Handle element nodes
    const children = node.children?.map((child: any, i: number) => renderNode(child, i));

    switch (node.type) {
      case 'h1':
        return <h1 key={index} className="text-4xl font-bold mt-8 mb-4">{children}</h1>;
      case 'h2':
        return <h2 key={index} className="text-3xl font-bold mt-6 mb-3">{children}</h2>;
      case 'h3':
        return <h3 key={index} className="text-2xl font-bold mt-5 mb-2">{children}</h3>;
      case 'h4':
        return <h4 key={index} className="text-xl font-bold mt-4 mb-2">{children}</h4>;
      case 'h5':
        return <h5 key={index} className="text-lg font-bold mt-3 mb-1">{children}</h5>;
      case 'h6':
        return <h6 key={index} className="text-base font-bold mt-2 mb-1">{children}</h6>;
      case 'p':
        return <p key={index} className="mb-4 leading-relaxed">{children}</p>;
      case 'blockquote':
        return (
          <blockquote key={index} className="border-l-4 border-primary-500 pl-4 py-2 my-4 italic bg-gray-50">
            {children}
          </blockquote>
        );
      case 'ul':
        return <ul key={index} className="list-disc list-inside mb-4 ml-4">{children}</ul>;
      case 'ol':
        return <ol key={index} className="list-decimal list-inside mb-4 ml-4">{children}</ol>;
      case 'li':
        return <li key={index} className="mb-1">{children}</li>;
      case 'link':
        return (
          <a
            key={index}
            href={node.url}
            className="text-primary-600 hover:text-primary-700 underline"
            target={node.newTab ? '_blank' : undefined}
            rel={node.newTab ? 'noopener noreferrer' : undefined}
          >
            {children}
          </a>
        );
      case 'code':
        return (
          <pre key={index} className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto my-4">
            <code>{children}</code>
          </pre>
        );
      default:
        return <React.Fragment key={index}>{children}</React.Fragment>;
    }
  };

  if (Array.isArray(content)) {
    return (
      <div className="prose max-w-none">
        {content.map((node, index) => renderNode(node, index))}
      </div>
    );
  }

  return <div className="prose max-w-none">{renderNode(content, 0)}</div>;
}
