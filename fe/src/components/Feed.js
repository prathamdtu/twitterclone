import React from 'react'
import CreatePost from './CreatePost'
import Tweet from './Tweet'
import { useSelector } from 'react-redux'

const Feed = () => {
  const {Tweets} = useSelector(store=>store.Tweets);
  return (
    <div className='w-[50%] border border-gray-200'>
        <div>
            <CreatePost/>
            {
              Tweets?.map((Tweets)=><Tweet key={Tweets?._id} Tweets ={Tweets}/> )
            }
            
        </div>
    </div>
  )
}

export default Feed