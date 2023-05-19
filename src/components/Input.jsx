import React from 'react'

const Input = () => {
  return (
    <div className="input">
        <input type="text" placeholder='type...' />
        <div className="send">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Send</button>
        </div>
    </div>
  )
}

export default Input