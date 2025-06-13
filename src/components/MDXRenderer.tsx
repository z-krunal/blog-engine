'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { MDXProvider } from '@mdx-js/react';
import ResponsiveImage from './ResponsiveImage';
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

export type MDXRendererProps = {
  source: MDXRemoteSerializeResult;
  components?: Record<string, React.ComponentType<any>>;
};

const defaultComponents = {
  img: (props: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => {
    const { src, alt = '' } = props;
    if (!src) return null;
    return <ResponsiveImage src={src} alt={alt} variant="natural" className="my-8" />;
  },
};

export default function MDXRenderer({ source, components }: MDXRendererProps) {
  const mergedComponents = { ...defaultComponents, ...components };
  
  return (
    <MDXProvider components={mergedComponents}>
      <MDXRemote {...source} components={mergedComponents} />
    </MDXProvider>
  );
} 