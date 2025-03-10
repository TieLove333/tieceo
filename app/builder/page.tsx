'use client';

import React from 'react';
import { BuilderComponent, builder, useIsPreviewing } from '@builder.io/react';

// Initialize Builder with your API key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY || '');

export default function BuilderPage() {
  // This flag checks if the page is being edited in Builder
  const isPreviewing = useIsPreviewing();
  
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* The BuilderComponent renders the content from Builder.io */}
      <BuilderComponent model="page" />
      
      {/* Only shown when not in Builder preview */}
      {!isPreviewing && (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          opacity: 0.7
        }}>
          <p>This page is editable in Builder.io</p>
        </div>
      )}
    </div>
  );
} 