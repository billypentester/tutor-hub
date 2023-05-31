import React, {useState, useEffect} from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Filler, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import axios from 'axios'
import Loader from './../utils/Loader'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
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

  // const completePercentage = Math.round((statistics.completion.completed  / (statistics.completion.completed + statistics.completion.notCompleted)) * 100);
  // const incompletePercentage = Math.round((statistics.completion.notCompleted / (statistics.completion.completed + statistics.completion.notCompleted)) * 100);

  // const malePercentage = Math.round((statistics.gender.male/(statistics.gender.male + statistics.gender.female)) * 100);

  // const femalePercentage = Math.round((statistics.gender.female/(statistics.gender.female + statistics.gender.male)) * 100)


  useEffect(() => {
    getStatistics()
  }, [])

  return (
    <div>
      {
        loading && <Loader />
      }
      {
        statistics.city && statistics.gender && statistics.completion && 
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
                    <h1 className="display-6 text-center text-white">{statistics.appointmentCount}</h1>
                    <h5 className='my-2 text-center text-white'>Appointments</h5>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-5">
              <h4>Teacher's Rating</h4>
              <hr />
              <Line data={
              {
                  labels: [4.5, 4, 3, 2, 1, 0],
                  datasets: [
                    {
                      fill: true,
                      label: 'Teachers\' count',
                      data: statistics && [statistics.rate.fourHalf, statistics.rate.four, statistics.rate.three, statistics.rate.two, statistics.rate.one, statistics.rate.zero],
                      backgroundColor: 'rgba(255, 99, 132, 0.2)',
                      borderColor: 'rgba(255, 99, 132, 1)',
                      borderWidth: 1,
                    }
                ]
              }}

              options={{
                plugins: {
                  legend: {
                    display: false, // Hide the main label
                  },
                },
                elements: {
                  line: {
                    tension: 0.2, // Adjust the tension value to make the line smoother
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false, 
                    },
                  },
                  y: {
                    grid: {
                      display: false,
                    },
                  },
                },
              }}

              width={100}
              height={30}
              />
            </div>

            <div className="row mt-5">
              <div className="col-6">
                <h4 className=''>Teacher's Profile</h4>
                <hr />
                <div class="progress p-0 shadow-lg" style={{height:'50px', width:'100%'}}>
                  <div class="progress-bar bg-success" role="progressbar" style={{ width: `${Math.round((statistics.completion.completed  / (statistics.completion.completed + statistics.completion.notCompleted)) * 100)}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                    {
                      `${Math.round(statistics.completion.completed / (statistics.completion.completed + statistics.completion.notCompleted) * 100)}` 
                    }
                    % completed
                  </div>
                  <div class="progress-bar bg-light text-dark" role="progressbar" style={{ width: `${Math.round((statistics.completion.notCompleted / (statistics.completion.completed + statistics.completion.notCompleted)) * 100)}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"> 
                    {
                      `${Math.round(statistics.completion.notCompleted / (statistics.completion.completed + statistics.completion.notCompleted) * 100)} `
                    } 
                    % incomplete
                  </div>
                </div>
              </div>
              <div className="col-6">
                <h4 className=''>Gender Count</h4>
                <hr />
                <div class="progress p-0 shadow-lg" style={{height:'50px', width:'100%'}}>
                  <div class="progress-bar bg-info" role="progressbar" style={{ width: `${Math.round((statistics.gender.male/(statistics.gender.male + statistics.gender.female)) * 100)}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                    {
                      `${statistics.gender.male} `
                    }
                    Male
                  </div>
                  <div class="progress-bar bg-light text-dark" role="progressbar" style={{ width: `${Math.round((statistics.gender.female/(statistics.gender.female + statistics.gender.male)) * 100)}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"> 
                    {
                      `${statistics.gender.female} `
                    }
                    Female
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-5">
              <h4>Teachers per city</h4>
              <hr />
              <Bar data={
              {
                  labels: statistics ? statistics.city.map(item => item.city) : [],
                  datasets: [
                    {
                      label: 'Teachers\' count',
                      data: statistics ? statistics.city.map(item => item.count) : [],
                      backgroundColor: 'rgba(255, 99, 132, 0.2)',
                      borderColor: 'rgba(255, 99, 132, 1)',
                      borderWidth: 1,
                    }
                ]
              }}

              options={{
                plugins: {
                  legend: {
                    display: false, // Hide the main label
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false, 
                    },
                    ticks: {
                      display: false
                    }
                  },
                  y: {
                    grid: {
                      display: false,
                    },
                  },
                },
              }}

              width={100}
              height={30}
              />
            </div>

          </>
        )
      }
    </div>
  )
}

export default Statistics