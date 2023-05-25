import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import data from './data.json'

function Statistics() {

  const [news, setNews] = useState(data)
  const [student, setStudent] = useState({})

  const profileFields = [
    { field: 'name', weight: 10 },
    { field: 'email', weight: 15 },
    { field: 'username', weight: 15 },
    { field: 'isVerified', weight: 15 },
    { field: 'profile', weight: 15 },
    { field: 'contactno', weight: 15 },
    { field: 'dob', weight: 5 },
    { field: 'city', weight: 4 },
    { field: 'gender', weight: 3 },
    { field: 'language', weight: 3 }
  ];

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  const calculateProfileCompletion = () => {
    let completedWeight = 0;
  
    profileFields.forEach(field => {
      if (student[field.field]) {
        completedWeight += field.weight;
      }
    });
  
    const completionPercentage = (completedWeight / 100) * 100;
    return completionPercentage.toFixed(2);
  };

  useEffect(() => {
    const student = JSON.parse(localStorage.getItem('student'))
    setStudent(student)
  }, [])


  return (
    <div className='my-5'>

      <section className='mb-4'>
        <div className='row flex-row justify-content-between align-items-stretch'>

          <div className='col-6'>
            <div className='bg-light p-3 rounded shadow-lg'>
                <h3 className='mb-4'>Profile Completion</h3>
                <div className='d-flex justify-content-around align-items-center'>
                  <img src={student.profile} alt={student.name} className='rounded-circle' width='80' />
                  <div className='col-9 d-flex flex-column'>
                    <h4 className='mb-2 lead text-center'>{student.name}</h4>
                    <div className='progress w-100'>
                      <div className='progress-bar' role='progressbar' style={{width: `${calculateProfileCompletion()}%`}} aria-valuenow='25' aria-valuemin='0' aria-valuemax='100'>{calculateProfileCompletion()}%</div>
                    </div>
                  </div>
                </div>
                <div className='mt-4 col-12 text-center'>
                  <Link to="/" className='btn btn-outline-primary'>Add more information to your profile</Link>
                </div>
            </div>  
          </div>

          <div className='col-6'>
            <div className='bg-light p-3 rounded shadow-lg h-100'>
            <h3 className='mb-4'>Account Verification</h3>
            <div className='d-flex justify-content-between align-items-center'>
              <div className='col-2 d-flex align-items-center justify-content-center mb-3'>
                <img src='https://img.icons8.com/color/256/verified-badge.png' alt='graduation' className='img-fluid' width={'50px'} />
              </div>
              <div className='col-10'>
                <div className='d-flex align-items-center'>
                  <div className='mx-4'>
                    {
                      student.isVerified ?
                      <>
                        <h5>Your Profile is verified</h5>
                        <p className='text-dark'>Your account is verified. You can now search and hire tutors.</p>
                      </>
                      :
                      <>
                        <h5>Your Profile is not verified</h5>
                        <p className='text-dark'>Your account is not verified. Please verify your account to search and hire tutors.</p>
                      </>
                    }
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>

        </div>
      </section>

      <section className='mb-4'>
        <h3 className='mb-3'>Educational News</h3>
        <div className='row'>
          
          {
            news.map((item, index) => {
              return (
                <div className='col-3 mb-3' key={index}>
                  <div className='card'>
                    <div className='card-body p-0'>
                      <img src={item.urlToImage} alt={item.title} className='card-img-top' />
                      <div className='p-3'>
                        <h5 className='card-title'>{item.title}</h5>
                        <p className='card-text'>
                        {
                          item.description.length > 80 ? item.description.substring(0, 80) + '...' : item.description
                        }
                        </p>
                        <p className='card-text'><small className='text-muted'>{item.source.name} - {formatDate(item.publishedAt)}</small></p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </section>

    </div>
  )
}

export default Statistics