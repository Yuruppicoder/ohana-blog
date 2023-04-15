declare module '@sanity/block-content-to-react' {
    import React from 'react';
  
    export interface Block {
      _type: string;
      [key: string]: any;
    }
  
    export interface Serializer {
      types?: {
        [key: string]: React.ComponentType<any>;
      };
      marks?: {
        [key: string]: React.ComponentType<any>;
      };
      list?: React.ComponentType<any>;
      listItem?: React.ComponentType<any>;
      hardBreak?: React.ComponentType<any>;
      container?: React.ComponentType<any>;
      className?: string;
    }
  
    export interface BlockContentProps {
      blocks: Block[];
      serializers?: Serializer;
      projectId?: string;
      dataset?: string;
      className?: string;
      renderContainerOnSingleChild?: boolean;
    }
  
    const BlockContent: React.ComponentType<BlockContentProps>;
    export default BlockContent;
  }
  