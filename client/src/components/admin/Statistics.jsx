import React, {useState, useEffect} from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios'
import Loader from './../utils/Loader'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Statistics() {

  const [statistics, setStatistics] = useState([])
  const [loading, setLoading] = useState(false)

  const getStatistics = async () => {
    setLoading(true)
    const res = await axios.get('/api/admin/statistics')
    console.log(res.data)
    setStatistics(res.data)
    setLoading(false)
  }

  useEffect(() => {
    getStatistics()
  }, [])

  return (
    <div>
      {
        loading && <Loader />
      }
      {
        statistics.city && 
        (
          <>
            <div className="row">
            <div className="col-3">
              <div className="d-flex justify-content-around align-items-center rounded-3 p-3 bg-primary mx-1">
                <div className='text-center'>
                  <i className="fas fa-users display-5 text-white"></i>
                </div>  
                <div>
                  <h1 className="display-6 text-center text-white">{statistics.studentCount}</h1>
                  <h5 className='my-2 text-center text-white'>Students</h5> 
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="d-flex justify-content-around align-items-center rounded-3 p-3 bg-success mx-1">
                <div className='text-center'>
                  <i className="fas fa-chalkboard-teacher display-5 text-white"></i>
                </div>
                <div>
                  <h1 className="display-6 text-center text-white">{statistics.teacherCount}</h1>
                  <h5 className='my-2 text-center text-white'>Teachers</h5>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="d-flex justify-content-around align-items-center rounded-3 p-3 bg-warning mx-1">
                <div className='text-center'>
                  <i className="fas fa-envelope display-5 text-white"></i>
                </div>
                <div>
                  <h1 className="display-6 text-center text-white">{statistics.contactCount}</h1>
                  <h5 className='my-2 text-center text-white'>Messages</h5>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="d-flex justify-content-around align-items-center rounded-3 p-3 bg-danger mx-1">
                <div className='text-center'>
                  <i className="fas fa-calendar-alt display-5 text-white"></i>
                </div>
                <div>
                  <h1 className="display-6 text-center text-white">0</h1>
                  <h5 className='my-2 text-center text-white'>Appointments</h5>
                </div>
              </div>
            </div>
            </div>
            <div className="row mt-5">
              <Bar data={
              {
                  labels: statistics ? statistics.city.map(item => item.city) : [],
                  datasets: [
                    {
                      label: 'Teachers per city',
                      data: statistics ? statistics.city.map(item => item.count) : [],
                      backgroundColor: 'rgba(255, 99, 132, 0.2)',
                      borderColor: 'rgba(255, 99, 132, 1)',
                      borderWidth: 1,
                    }
                ]
              }}

              width={100}
              height={30}
              />
            </div>
            <div className="row mt-5">
              <div class="progress p-0" style={{height:'50px'}}>
                <div class="progress-bar bg-info" role="progressbar" style={{width: '50%'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                  {
                    Math.floor(statistics.completion.completed / (statistics.completion.completed + statistics.completion.notCompleted) * 100)
                  }
                </div>
                <div class="progress-bar bg-light text-dark" role="progressbar" style={{width: '50%'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                  {
                    Math.floor(statistics.completion.notCompleted / (statistics.completion.completed + statistics.completion.notCompleted) * 100)
                  }
                </div>
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}

export default Statistics