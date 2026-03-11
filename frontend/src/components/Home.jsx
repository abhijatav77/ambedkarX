import React from 'react'
import Hero from '../home/Hero'
import Trending from '../home/Trending'
import Famous from '../home/Famous'
import SuggestionForm from '../home/SuggestionForm'

const Home = () => {
  return (
    <div>
        <Hero />
        <Trending />
        <Famous />
        <SuggestionForm />
    </div>
  )
}

export default Home