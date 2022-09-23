import React from 'react';

interface Props {
  type: string;
  placeholder: string;
}

const InputForm: React.FC<Props> = (props) => {
  const { type, placeholder } = props;

  return (
    <div className='border-b border-titleLogin my-1 mb-5'>
      <input
        className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 leading-tight focus:outline-none mb-3'
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputForm;
