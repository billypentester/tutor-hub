import React from 'react'

function Class() {
  return (
    <div className='my-4'>
        <div className='bg-light rounded-3 shadow-lg' style={{height: '84vh'}}>
            <div className='d-flex'>
                <div className='col-3 rounded-start bg-dark' style={{height: '84vh'}}>
                    <div className='d-flex flex-column align-items-center p-3'>
                        
                        <div className='bg-info p-3 rounded-3 w-100 text-center text-white'>
                            <h3 className='text-white'>ClassRoom 1</h3>
                            <p className='mb-0 lead'>Teacher Name</p>
                        </div>

                        <div className='mt-3 w-100 text-center text-white'>
                            <h4 className='w-100 text-center p-3 text-white border-bottom border-white'>Subjects</h4>
                            <h4 className='w-100 text-center p-3 text-white border-bottom border-white'>Announcement</h4>
                        </div>
                        
                    </div>
                </div>
                <div className='col-9'>
                    <div className='d-flex justify-content-center align-items-center' style={{height: '84vh'}}>
                        <h4>Click on a subject to view the class</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Class