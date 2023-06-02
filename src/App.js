import React from 'react'
import './App.css'
import Stories from 'react-insta-stories'
import data from './data/day-data.json'
import moment from 'moment'

function App() {
  const [showStory, setShowStory] = React.useState(false)
  const [showAllStories, setShowAllStories] = React.useState(false)
  const [stories, setStories] = React.useState()
  var dayArr = Array.apply(null, { length: 31 }).map(Number.call, Number)

  const backToHome = () => {
    setShowStory(false)
    setShowAllStories(false)
  }

  const calculateDay = () => {
    let startDay = moment('06-01-2023', 'MM-DD-YYYY') 
    return moment().diff(startDay, 'days')
  }

  const goToStory = (daySelected) => {
    let day = daySelected || (daySelected === 0 ? 0 : calculateDay()) 
    if (data.dayData[day]) {
      setShowStory(true)
      let storiesArr = [
        {
          content: () => {
            return (
              <div className="m-auto story-page" style={{ background: "linear-gradient(180deg, rgba(242,192,255,1) 19%, rgba(176,82,193,1) 98%)" }}>
                <div className="text">
                  {`Today, let's remember ${data.dayData[day].remembering}.
                 ${day === 0 ? '' : 'Picture yourself around that time. '}`}
                  Think about someone you've come to love and appreciate more since then.
                </div>
                <button className="home-btn" onClick={backToHome}><i className="fa fa-home" /></button>
              </div>
            )
          }
        },
        {
          content: () => {
            return (
              <div className="m-auto story-page" style={{ background: "linear-gradient(180deg, rgba(254,197,197,1) 19%, rgba(255,189,107,1) 98%)" }}>
                <div className="text">
                  Many people love and appreciate you for who you are! For example...
                </div>
                <button className="home-btn" onClick={backToHome}><i className="fa fa-home" /></button>
              </div>
            )
          }
        },
        ...data.dayData[day].videos.map((url, ind) => {// This sets up all of the videos
          return {
            url,
            type: 'video',
            header: { heading: data.dayData[day].names[ind] || '' },
            styles: { minHeight: '777px'}
          }
        }),
        {
          content: () => {
            return (
              <div className="m-auto story-page" style={{ background: "linear-gradient(180deg, rgba(159,255,241,1) 19%, rgba(107,219,255,1) 98%)" }}>
                <div className='text'>
                  <div className="you-are-loved">YOU ARE LOVED&#10084;</div>
                  Take some time to reach out to each of these people and say hello!
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
          url: "https://res.cloudinary.com/dt2yq6ezw/video/upload/v1685460548/30til30/Max3_xl7t7m.mp4",
          type: 'video',
          header: { heading: "Intro" },
          styles: { minHeight: '777px'}
        })
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

  return (
    <div>
      {!showStory && !showAllStories ?
        <div className="home-page">
          <div className='btn-container m-auto'>
            <div className="whole-title">
              <div className="small-line-height">
                <div className="title main">30 </div>
                <div className="title sub">Days to 30</div>
              </div>
            </div>
              <div className="icon text-center"><i className="fa fa-birthday-cake"></i></div>
            <div className="text-center mt-2">
              <div><button onClick={() => goToStory()}>Today's Story</button></div>
              {calculateDay() > 0 &&
                <div><button onClick={() => setShowAllStories(true)}>All Stories</button></div>
              }
            </div>
          </div>
            <button className="refresh-btn" onClick={() => window.location.reload()}><i className="fa fa-refresh" /></button>
        </div>
        : showStory ?
          <div className="story">
            <Stories
              defaultInterval={120000}
              stories={stories}
              width={"100%"}
              height={"100%"}
              storyContainerStyles={{minHeight: "777px"}}
            />
          </div>
          :
          <div className="all-stories-container">
            <div className="all-stories">
              {
                dayArr.map((d) => {
                  return (
                    <>
                      <button disabled={d > calculateDay()} onClick={() => goToStory(d)} className={`box ${d > calculateDay() ? 'disabled' : ''}`}>
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
