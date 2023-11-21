/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies

import HardBreak from '@tiptap/extension-hard-break';
import { Image as TipTapImage } from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Image as ImageIcon,
} from 'lucide-react';
import Image from 'next/legacy/image';
import { useRef, useState } from 'react';

import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Toggle } from '@/components/ui/Toggle';
import useUpload from '@/hooks/useUpload';

type IEditorProps = {
  getHTML: (html: string) => void;
  defaultContent?: string;
};

export default function Editor({ getHTML, defaultContent }: IEditorProps) {
  const { isLoading, uploadImage } = useUpload();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageAlt, setImageAlt] = useState<string>('');
  const [open, setOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      HardBreak,
      TipTapImage.configure({
        HTMLAttributes: {
          style: 'margin: auto',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph', 'image'],
      }),
    ],
    content: defaultContent?.replace(/<p><\/p>/g, '<br/>') || '',
    editorProps: {
      attributes: {
        class: 'textarea textarea-bordered w-full min-h-[200px] p-2',
      },
    },
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file) {
        const imageUrlUploaded = await uploadImage(file, 'blog');
        setImageUrl(imageUrlUploaded);
      }
    }
  };

  const getHTMLHandler = () => {
    if (editor) getHTML(editor.getHTML().replace(/<p><\/p>/g, '<br/>'));
  };

  if (!editor) return null;

  return (
    <div>
      <div className="mb-4 flex flex-row space-x-2">
        <Toggle
          data-state={editor.isActive('bold') ? 'on' : 'off'}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </Toggle>
        <Toggle
          data-state={editor.isActive('heading', { level: 1 }) ? 'on' : 'off'}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          H1
        </Toggle>
        <Toggle
          data-state={editor.isActive('heading', { level: 2 }) ? 'on' : 'off'}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </Toggle>
        <Toggle
          data-state={editor.isActive('heading', { level: 3 }) ? 'on' : 'off'}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          H3
        </Toggle>
        <Toggle
          data-state={editor.isActive({ textAlign: 'left' }) ? 'on' : 'off'}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
        >
          <AlignLeft />
        </Toggle>
        <Toggle
          data-state={editor.isActive({ textAlign: 'center' }) ? 'on' : 'off'}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
        >
          <AlignCenter />
        </Toggle>
        <Toggle
          data-state={editor.isActive({ textAlign: 'right' }) ? 'on' : 'off'}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
        >
          <AlignRight />
        </Toggle>
        <Toggle
          data-state={editor.isActive({ textAlign: 'justify' }) ? 'on' : 'off'}
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        >
          <AlignJustify />
        </Toggle>

        {isLoading ? (
          <p>Uploading...</p>
        ) : (
          <Button
            type="button"
            onClick={() => {
              setOpen(true);
            }}
          >
            <ImageIcon />
          </Button>
        )}
        <input
          className="hidden"
          ref={fileInputRef}
          type="file"
          onChange={handleImageChange}
        />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="h-[570px] sm:h-[510px]">
          <DialogHeader>
            <DialogTitle>Upload Image</DialogTitle>
            <DialogDescription>You can upload image here.</DialogDescription>
          </DialogHeader>
          <div className="my-4 grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Select Image</Label>
            <Input id="picture" type="file" onChange={handleImageChange} />
          </div>
          {imageUrl ? (
            <div className="relative my-4 h-36 w-full max-w-[200px]">
              <Image
                src={imageUrl}
                alt=""
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
          ) : (
            <div className="relative my-4 flex h-36 w-full max-w-[200px] items-center justify-center rounded-md border-2 border-dotted">
              <p>Preview</p>
            </div>
          )}
          <Input
            type="text"
            placeholder="Insert Image ALT here..."
            value={imageAlt}
            onChange={(e) => setImageAlt(e.target.value)}
          />
          <div className="flex flex-row space-x-4">
            <Button
              onClick={() => {
                setImageAlt('');
                setImageUrl('');
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (editor && imageUrl && imageAlt) {
                  editor.commands.setImage({ src: imageUrl, alt: imageAlt });
                  editor.chain().focus().run();
                  setOpen(false);
                }
              }}
            >
              Add Image
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <EditorContent
        className="rounded-md border"
        editor={editor}
        onBlur={getHTMLHandler}
      />
    </div>
  );
}
