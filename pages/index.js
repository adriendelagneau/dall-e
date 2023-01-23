import Head from 'next/head'
import { Inter } from '@next/font/google'
import axios from 'axios'
import { Loader, Card, FormField } from '../components'
import { useState } from 'react'
//import Link from 'next/link'
import dbConnect from '../utils/mongo'


const inter = Inter({ subsets: ['latin'] })

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return (
      data.map((post) => <Card key={post._id} {...post} />)
    );
  }
  return (
      <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
    );
  };


export default function Home(props) {

  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = props.posts.data.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResult);
      }, 500),
    );
  };

  return (
    <>
      
      <section className='max-w-7xl mx-auto p-5'>

<div>
    <h1 className='font-extrabold text-[#222328] text-[32px]'>The Community Showcase</h1>
    <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>
        Browser trough a collection of imaginative and visually stunning images generated by DALL-E AI
    </p>
</div>

<div className='mt-16'>
    <FormField
        labelName="Search posts"
        type="text"
        name="text"
        placeholder="Search something..."
        value={searchText}
        handleChange={handleSearchChange}
    />
</div>

<div className="mt-10">
    {loading ? (
    <div className="flex justify-center items-center">
        <Loader />
    </div>
    ) : (
    <>
        {searchText && (
        <h2 className="font-medium text-[#666e75] text-xl mb-3">
            Showing Resuls for <span className="text-[#222328]">{searchText}</span>:
        </h2>
        )}
        <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
        {searchText ? (
            <RenderCards
            data={searchedResults}
            title="No Search Results Found"
            />
        ) : (
            <RenderCards
            data={props.posts.data}
            title="No Posts Yet"
            />
        )}
        </div>
    </>
    )}
</div>
</section>
    </>
  )
}


export const getServerSideProps = async () => {
  dbConnect()



  const res = await axios.get('https://dall-e-orpin.vercel.app/api/post')


 
 return {
   props: {
     posts: res.data,

   },
 };
};
