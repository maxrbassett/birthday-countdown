import React from 'react'
import './App.css'
import Stories from 'react-insta-stories'
import data from './data/day-data.json'

function App() {
  const [showStory, setShowStory] = React.useState(false)
  const [showAllStories, setShowAllStories] = React.useState(false)
  const [stories, setStories] = React.useState()
  var dayArr = Array.apply(null, { length: 30 }).map(Number.call, Number)

  const backToHome = () => {
    setShowStory(false)
    setShowAllStories(false)
  }

  const goToStory = (daySelected) => {
    let day = daySelected || 0 // TODO: Calculate day
    console.log(day)
    if (data.dayData[day]) {
      setShowStory(true)
      let storiesArr = [
        {
          content: ({ }) => {
            return (

              <div className="m-auto story-page" style={{ background: "linear-gradient(180deg, rgba(242,192,255,1) 19%, rgba(176,82,193,1) 98%)" }}>
                <div className="text">
                  {`Today, let's remember when you were ${day === 0 ? 'born' : `${day} ${day === 1 ? 'year old' : 'years old'}`}. 
                 ${day === 0 ? '' : 'Picture yourself at that age. '}`}
                  Think about someone you've come to love and appreciate more since then.
                </div>
              </div>
            )
          }
        },
        {
          content: () => {
            return (
              <div className="m-auto story-page" style={{ background: "linear-gradient(180deg, rgba(254,197,197,1) 19%, rgba(255,189,107,1) 98%)" }}>
                <div className="text text-center">
                  Many people love and appreciate you for who you are! For example...
                </div>
              </div>
            )
          }
        },
        ...data.dayData[day].videos.map((url, ind) => {// This sets up all of the videos
          return {
            url,
            type: 'video',
            header: { heading: data.dayData[day].names[ind] || '' }
          }
        }),
        {
          content: () => {
            return (
              <div className="m-auto story-page" style={{ background: "linear-gradient(180deg, rgba(159,255,241,1) 19%, rgba(107,219,255,1) 98%)" }}>
                <div className='text'>
                  <div className="text-center you-are-loved">YOU ARE LOVED&#10084;</div>
                  Challenge: Take some time to reach out to each of these people and say hello!
                  <div className="text-center btn-container mt-5">
                    <button onClick={backToHome}>Back to Home</button>
                  </div>
                </div>
              </div>
            )
          }
        }
      ]
      if (day === 0) {
        storiesArr.unshift({
          content: () => {
            return (
              <div className="m-auto story-page text-center" style={{ background: "linear-gradient(32deg, rgba(14,161,189,1) 7%, rgba(0,142,191,1) 98%)" }}>
                <div className='text'>
                  <div className="welcome">Hi Ash!</div>
                  You're invited each day for the next 30 days to open this app and journey through the wonderful life you've lived!
                  <div className="small">{"(Tap on the right to move to the next screen)"}</div>
                </div>
              </div>
            )
          }
        })
      }
      setStories(storiesArr)
    }
  }
  console.log('showStory', showStory)
  return (
    <div>
      {!showStory && !showAllStories ?
        <div className="home-page">
          <div className='btn-container m-auto'>
            <div className="whole-title">
              <div className="title main">30 </div>
              <div className="title sub">Days to 30</div>
            </div>
            <div className="text-center mt-5">
              <div><button onClick={() => goToStory()}>Today's Story</button></div>
              <div><button onClick={() => setShowAllStories(true)}>All Stories</button></div>
            </div>
          </div>
        </div>
        : showStory ?
          <div className="story">
            <Stories
              defaultInterval={120000}
              stories={stories}
            />
          </div>
          :
          <div className="all-stories-container">
            <div className="all-stories">
              {
                dayArr.map((d) => {
                  return (
                    <>
                    {/* TODO: DISABLE THIS BUTTON IF WE HAVENT REACHED IT YET!! */}
                      <button onClick={() => goToStory(d)} className="box">
                        {d}
                      </button>

                    </>
                  )
                })
              }
            </div>
            <div className="text-center btn-container mt-3">
            <button onClick={backToHome}>Back to Home</button>
            </div>
          </div>
      }
    </div>
  );
}

export default App;
