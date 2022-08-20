import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState({
    "location": {
      "name": "Ho Chi Minh City",
      "region": "",
      "country": "Vietnam",
      "lat": 10.75,
      "lon": 106.67,
      "tz_id": "Asia/Ho_Chi_Minh",
      "localtime_epoch": 1660978545,
      "localtime": "2022-08-20 13:55"
    },
    "current": {
      "last_updated_epoch": 1660977900,
      "last_updated": "2022-08-20 13:45",
      "temp_c": 31.0,
      "temp_f": 87.8,
      "is_day": 1,
      "condition": {
        "text": "Overcast",
        "icon": "//cdn.weatherapi.com/weather/64x64/day/122.png",
        "code": 1009
      },
      "wind_mph": 26.6,
      "wind_kph": 42.8,
      "wind_degree": 250,
      "wind_dir": "WSW",
      "pressure_mb": 1004.0,
      "pressure_in": 29.65,
      "precip_mm": 0.7,
      "precip_in": 0.03,
      "humidity": 66,
      "cloud": 50,
      "feelslike_c": 36.6,
      "feelslike_f": 97.9,
      "vis_km": 10.0,
      "vis_miles": 6.0,
      "uv": 7.0,
      "gust_mph": 18.3,
      "gust_kph": 29.5,
      "air_quality": {
        "co": 377.20001220703125,
        "no2": 5.800000190734863,
        "o3": 19.5,
        "so2": 1.899999976158142,
        "pm2_5": 4.300000190734863,
        "pm10": 5.699999809265137,
        "us-epa-index": 1,
        "gb-defra-index": 1
      }
    }
  })
  const [location, setLocation] = useState('')
  const APIUrl = `https://api.weatherapi.com/v1/current.json?key=fe9b3dc355a5483680d135825221908&q=${location}&units=imperial&aqi=yes`


  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(APIUrl).then((res) => {
        setData(res.data)
      })
        .catch(() => (alert("Can't found this location")))
      setLocation('')
    }
  }


  return (
    <div className="w-[90%] sm:w-[40%] h-[80vh] sm:h-[90vh] mx-auto mt-8 bg-[rgba(0,0,0,0.4)] rounded-xl relative">
      <div className=' w-full absolute left-[50%] translate-x-[-50%] top-[30px]'>
        <input className='w-[60%] block m-auto pl-4 h-[40px] rounded-full bg-[rgba(0,0,0,0.4)] text-white outline-none' type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder='Enter location . . .' onKeyPress={searchLocation} />
      </div>
      <div className='text-white absolute top-[95px] left-[40px]'>
        <h1 className='text-[20px]'>{data.location.name} - {data.location.country}</h1>
        <span className='text-[50px] font-bold'>{data.current.temp_c}°C</span>
      </div>
      <div className='absolute flex flex-wrap left-[40px] text-[30px] text-white top-[40%]'>
        <img className='mx-[8px]' src={data.current.condition.icon} width='40px' />
        {data.current.condition.text}
      </div>

      <div className='bg-[rgba(255,255,255,0.1)] rounded-lg w-[80%] m-auto absolute bottom-8 left-[50%] translate-x-[-50%] flex justify-around items-center text-white md:text-[20px]'>
        <div className='text-center md:p-4'>
          <span className='font-bold'>{data.current.feelslike_c}°C</span>
          <p>Feels Like</p>
        </div>
        <div className='text-center py-3 md:p-4'>
          <span className='font-bold'>{data.current.humidity}%</span>
          <p>Humidity</p>
        </div>
        <div className='text-center md:p-4'>
          <span className='font-bold'>{data.current.vis_km} km/h</span>
          <p>Wind speed</p>
        </div>
      </div>
    </div>
  )
}

export default App
