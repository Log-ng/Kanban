import React from 'react';
interface Props {
  type: string;
  placeholder: string;
  getUserInfo: (type: string, value: string) => void;
  showError: boolean
}

const InputForm: React.FC<Props> = (props) => {
  const { type, placeholder, getUserInfo, showError } = props;

  return (
    <div className={'border-b border-titleLogin my-1 mb-5' + (showError?' border-red-700 border-b-2': '')}>
      <input
        className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 leading-tight focus:outline-none mb-3'
        type={type}
        placeholder={placeholder}
        onChange={(e) => getUserInfo(placeholder, e.target.value)}
      />
    </div>
  );
};

export default InputForm;
