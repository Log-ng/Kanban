import React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import './kanban.css';

const users = [
  {
    id: 'long1',
    text: 'nguyen1',
  },
  {
    id: 'long2',
    text: 'nguyen2',
  },
  {
    id: 'long3',
    text: 'nguyen3',
  },
  {
    id: 'long4',
    text: 'nguyen4',
  },
  {
    id: 'long5',
    text: 'nguyen5',
  },
];

const MemberTag = () => {
  const suggestions = users;

  const [tags, setTags] = React.useState([
    {
      id: 'long6',
      text: 'nguyen6',
    },
  ]);

  return (
    <ReactTags
      tags={tags}
      suggestions={suggestions}
      delimiters={[]}
      handleDelete={(i) => {
        setTags(tags.filter((tag, index) => index !== i));
      }}
      handleAddition={(tag) => setTags([...tags, tag])}
      handleTagClick={(index) =>
        console.log('The tag at index ' + index + ' was clicked')
      }
      inputFieldPosition='inline'
      autocomplete
      placeholder='Search to add new member...'
      allowDragDrop={false}
    />
  );
};

export default MemberTag;
