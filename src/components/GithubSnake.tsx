import { useEffect, useState, useRef } from 'react';

const GithubSnake = ({ url,className }: { url: string, className?: string }) => {
  const [svgContent, setSvgContent] = useState<string>('');
  const svgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(url)
      .then(response => response.text())
      .then(data => {
        setSvgContent(data);
      })
      .catch(error => console.error('failed to load svg:', error));
  }, []);

  useEffect(() => {
    if (svgRef.current) {
      const svgElement = svgRef.current.querySelector('svg');
      if (svgElement) {
        svgElement.setAttribute('width', '100%');
        svgElement.setAttribute('height', 'auto');
        // re-trigger animation
        svgElement.querySelectorAll('*').forEach((element) => {
          element.getBoundingClientRect();
        });
      }
    }
  }, [svgContent]);

  return (
    <div ref={svgRef} className={`github-snake ${className}`} dangerouslySetInnerHTML={{ __html: svgContent }} />
  );
};

export default GithubSnake;