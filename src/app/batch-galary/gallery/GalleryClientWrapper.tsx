'use client';

import React from 'react';
import GalleryPage from './page';

export default function GalleryClientWrapper({
  headingLevel,
}: {
  headingLevel?: 'h1' | 'h2';
}) {
  return <GalleryPage headingLevel={headingLevel} />;
}
