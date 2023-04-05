import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function AdminLogin() {

    const [admin, setAdmin] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChangeInput = e => {
        const {name, value} = e.target
        setAdmin({...admin, [name]:value})
    }

    const handleSubmit = async e => {
        setLoading(true)
        e.preventDefault()
        try {
            console.log(admin)
            const res = await axios.post(`http://localhost:3000/admin/login`, admin)
            console.log(res)
            if(res.status === 200) {
                const { token } = res.data
                localStorage.setItem('token', token)
                setLoading(false)
                navigate(`/admin/dashboard`)
            }
        }
        catch (err) {
            setError(err.response.data.message)
        }
    }


    return (
        <div className="d-flex">

            <div className="col-3 loginBackground"></div>

            <div className="container">
            <div className="row align-items-center justify-content-center">
                <div className="col-md-7 py-5">
                <h3 className="display-5">Login</h3>
                <p className="mb-4">Welcome Admin! Please log in to access your account.</p>

                {
                    error && 
                    <div className="postion-absolute w-100 alert alert-danger alert-dismissible m-0">
                    <strong>Oh snap!</strong> {error}
                    <button type="button" class="btn-close" data-dismiss="alert"></button>
                    </div>
                }

                <form>

                    <div className="row">
                    <div className="form-group">
                        <label for="exampleInputEmail" className="form-label mt-4">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="email" placeholder="Enter email" name="email" value={admin.email} onChange={handleChangeInput}/>
                    </div>
                    </div>

                    <div className="row">
                    <div className="form-group">
                        <label for="exampleInputPassword" className="form-label mt-4">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword" placeholder="Password" name="password" value={admin.password} onChange={handleChangeInput}/>
                    </div>
                    </div>
                    
                    <div className="d-flex mb-5 mt-4 align-items-center">
                    <div className="d-flex align-items-center">
                        <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                        <label className="form-check-label" for="flexCheckDefault">
                            Keep me logged in
                        </label>
                        </div>
                    </div>
                    </div>

                    <button className="btn px-5 btn-primary" onClick={handleSubmit}>Login</button>

                </form>
                </div>
            </div>
            </div>

        </div>
    )

}

export default AdminLogin