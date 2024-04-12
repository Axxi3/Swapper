import React from 'react';

function InputComponent({ onInputChange,name }) {
  // Function to handle input change
  const handleChange = (e) => {
    const inputValue = e.target.value;
    onInputChange(inputValue); // Call the callback function with input value
  };

  return (
    <div className="w-full">
         <label
    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-4"
    htmlFor="name"
  >
   {name}
  </label>
      <input
        className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
    
        placeholder={name}
        onChange={handleChange} // Handle input change
      />
    </div>
  );
}

export default InputComponent;
