'use client';
import { Deal } from '@/types';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: '3' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
};

export default function DealMemo({
  deal,
  onChange
}: {
  deal: Deal;
  onChange: (v: any) => any;
}) {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (deal.memo && content.length < 1) {
      setContent(deal.memo);
    }
  }, []);

  useEffect(() => {
    onChange(content);
  }, [content]);

  return (
    <div className="w-full">
      <header className="flex flex-col items-start mb-6">
        <h2 className="text-xl">Write your memo</h2>
      </header>
      <main>
        <ReactQuill
          modules={modules}
          value={content}
          onChange={setContent}
          theme="snow"
        />
      </main>
    </div>
  );
}
