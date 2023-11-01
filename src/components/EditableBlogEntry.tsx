'use client';

import { useState } from 'react';

import { BlogForm } from './BlogForm';

type IEditableBlogEntryProps = {
  id: number;
  username: string;
  body: string;
};

const EditableBlogEntry = (props: IEditableBlogEntryProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing((value) => !value);
  };

  const handleStopEditing = () => {
    setIsEditing(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          handleEdit();
        }}
      >
        <svg
          className="h-6 w-6 stroke-current"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <path d="M4 20h4L18.5 9.5a1.5 1.5 0 0 0-4-4L4 16v4M13.5 6.5l4 4" />
        </svg>
      </button>

      <div className="ml-1 grow">
        {isEditing ? (
          <BlogForm
            edit
            id={props.id}
            defaultValues={{
              username: props.username,
              body: props.body,
            }}
            handleStopEditing={handleStopEditing}
          />
        ) : (
          <>
            <span className="text-gray-500">{props.username}:</span>{' '}
            <span className="text-gray-800">{props.body}</span>
          </>
        )}
      </div>
    </>
  );
};

export { EditableBlogEntry };
