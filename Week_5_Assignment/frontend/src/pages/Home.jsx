import React from 'react'
import Navbar from '../components/Navbar'
import BlogCard from '../components/Featured'
import LatestPosts from '../components/LatestPost'

const Home = () => {
  return (
    <>
    <BlogCard/>
    <LatestPosts/>
    </>
  )
}

export default Home