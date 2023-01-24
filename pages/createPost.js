import React, { useState } from 'react'
import Router from 'next/router'
import { getRandomPrompt } from '../utils';
import { FormField, Loader} from '../components'
import axios from 'axios';
import Image from 'next/image';

function CreatePost() {

  const [form, setForm] = useState({
      name: '',
      prompt: '',
      photo: '',
  })

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await axios.post('https://dall-e-orpin.vercel.app/api/dalle', {prompt: form.prompt})

        const data = await response.data;
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}`});
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.prompt && form.photo) {
    setLoading(true);
    try {
      
      const response = await axios.post('http://localhost:3000/api/post', { form })
      
      alert('Success');
      Router.push('/');
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  } else {
    alert('Please generate an image with proper details');
  }
};

const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({...form, prompt: randomPrompt})
}

  return (
    <section className='p-5 mx-auto max-w-7xl'>
           
    <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>Create</h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>
            Create imaginative and visually stunning images through by DALL-E AI and share them to the community
        </p>
    </div>

    <form className="max-w-3xl mt-16" onSubmit={handleSubmit}>
<div className="flex flex-col gap-5">
  <FormField
    labelName="Your Name"
    type="text"
    name="name"
    placeholder="Ex., john doe"
    value={form.name}
    handleChange={handleChange}
  />

  <FormField
    labelName="Prompt"
    type="text"
    name="prompt"
    placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
    value={form.prompt}
    handleChange={handleChange}
    isSurpriseMe
    handleSurpriseMe={handleSurpriseMe}
  />

  <div className="relative flex items-center justify-center w-64 h-64 p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500">
    { form.photo ? (
      <Image
        src={form.photo}
        alt={form.prompt}
        width={256}
        height={256}        
      />
    ) : (
      <Image
        src="/preview.png"
        alt="preview"
        className="opacity-40"
        width={256}
        height={256}   
      />
    )}

    {generatingImg && (
      <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
        <Loader />
      </div>
    )}
  </div>
</div>

<div className="flex gap-5 mt-5">
  <button
    type="button"
    onClick={generateImage}
    className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
  >
    {generatingImg ? 'Generating...' : 'Generate'}
  </button>
</div>

<div className="mt-10">
  <p className="mt-2 text-[#666e75] text-[14px]">** Once you have created the image you want, you can share it with others in the community **</p>
  <button
    type="submit"
    className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
  >
    {loading ? 'Sharing...' : 'Share with the Community'}
  </button>
</div>
</form>
  
</section>
  )
}

export default CreatePost