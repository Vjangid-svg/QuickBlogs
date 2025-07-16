import React from 'react'

const NewsLater = () => {
  return (
   <div className='flex flex-col items-center justify-center text-center space-y-2 my-32'>
  <h1 className='md:text-4xl text-2xl font-semibold'>
    Never Miss a Blog!
  </h1>
  <p className='md:text-lg text-gray-500/70 pb-8'>
    Subscribe to get the latest blog, new tech, and exclusive news.
  </p>

  <form
    className='flex max-w-2xl w-full h-12 md:h-13'
    onSubmit={(e) => {
      e.preventDefault();
      // handle subscription logic here
    }}
  >
    <input
      type='text'
      required
      placeholder='Enter your email id'
      className='border border-gray-300 h-full px-4 outline-none text-gray-500 rounded-l-md w-full'
    />
    <button
      type='submit'
      className='px-6 md:px-12 h-full bg-primary text-white hover:bg-primary/80 cursor-pointer transition-all rounded-r-md'
    >
      Subscribe
    </button>
  </form>
</div>
  )
}

export default NewsLater