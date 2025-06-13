import React from 'react';
import MDXRenderer from './MDXRenderer';
import Prose from './Prose';

interface MDXContentProps {
  source: any;
}

export default function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="mdx-content">
      <Prose>
        <MDXRenderer source={source} />
      </Prose>
    </div>
  );
} 