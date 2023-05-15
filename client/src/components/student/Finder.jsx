import React, {useState, useEffect} from 'react'
import Loader from './../utils/Loader'
import { Link } from 'react-router-dom'
import axios from 'axios'

function User({ name, profile, city, rating, expertise, username}) {
  return (
    <Link className="card border-light bg-light mb-3 py-2 px-5 text-decoration-none text-black" to={`/student/dashboard/profile/${username}`}>
      <div className="row">
        <div className="col-3 text-center">
          <img src={profile} className="rounded-circle" alt="..."  width="150" height="150"/>  
        </div>
        <div className="col-9">
          <div className="card-body">
            <h4 className="card-title">{name}</h4>
            <div className="d-flex justify-content-between mt-3">
              <div className="">
                <div className="d-flex flex-column">
                  <p className="card-text lead mb-1">City</p>
                  <div className="d-flex flex-row align-items-center">
                    <i class="fa-solid fa-location-dot mx-2"></i>
                    <p className="card-text">{city}</p>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="d-flex flex-column">
                  <p className="card-text lead mb-1">Rating</p>
                  <div className="d-flex flex-row align-items-center">
                    <i className="fa-solid fa-star mx-2"></i>
                    <p className="card-text">{rating}</p>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="d-flex flex-column">
                  <p className="card-text lead mb-1">Expertise</p>
                  <div className="d-flex flex-row align-items-center">
                  <i className="fa-solid fa-bolt mx-2"></i>
                    <p className="card-text">{expertise}</p>
                  </div>
                </div>
              </div>
            </div> 
          </div>
        </div>
      </div>
    </Link>
  );
}

function UsersList(props) {
  const users = props.users.map((user) => (
    <User
      key={user.username}
      name={user.name}
      username={user.username}
      profile={user.profile}
      city={user.city}
      rating={user.rating}
      experience={user.experience}
      expertise={user.expertise}
      subjectType={user.subjectType}
      subjectLevel={user.subjectLevel}
      fee={user.fee}
    />
  ));

  return <div>{users}</div>;
}

function Finder() {

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    name: '',
    profile: '',
    city: '',
    rating: '',
    username: '',
    expertise: '',
    experience: '',
    subjectType: '',
    subjectLevel: '',
    fee: ''
  });

  const fetchUsers = async () => {
    setLoading(true);
    const TeacherData = await axios.get("/api/teacher/search");
    console.log(TeacherData)
    const {data} = TeacherData;
    console.log(data);
    setUsers(data);
    setFilteredUsers(data);
    setLoading(false);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  const filterUsers = () => {
    let filteredUsers = users;
    for (const [key, value] of Object.entries(filters)) { 
      if (value) {
        filteredUsers = filteredUsers.filter((user) =>
          key === "rating" ? user[key] >= value : 
          key === "fee" ? user[key] <= value : 
          user[key].toLowerCase().includes(value.toLowerCase())
        );
      }
    }
    setFilteredUsers(filteredUsers);
  };

  useEffect(() => {
    fetchUsers();
    console.log(users); 
  }, []);

  useEffect(() => {
    filterUsers();
  }, [filters]);


  return (
    <section>
      <div className="text-center p-5">
        <h1 className='display-6'>Discover Your Perfect Tutor</h1>
      </div>
      <div className='row mb-5'>
        <div className='col-4'>
          <div className="card border-light bg-light">
            <div className="card-body">
              <h5 className="card-title">Filter</h5>
              <form className='my-2'>

                <div className="form-group">
                  <label for="City" className="form-label mt-4">City</label>
                  <input type="text" className="form-control" id="City" placeholder="Search with city" name="city" value={filters.city} onChange={handleFilterChange}/>
                </div>

                <div className="form-group">
                  <label for="Rating" className="form-label mt-4">Rating</label>
                  <input type="text" className="form-control" id="Rating" placeholder="4.5" name="rating" value={filters.rating} onChange={handleFilterChange}/>
                </div>

                <div class="form-group">
                  <label for="Experience" class="form-label mt-4">Experience</label>
                  <select class="form-select" id="Experience" name="experience" value={filters.experience} onChange={handleFilterChange}>
                    <option value="" selected>Choose...</option>
                    <option value="professional">Professional</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="beginner">Beginner</option>
                  </select>
                </div> 

                <div class="form-group">
                  <label for="SubjectType" class="form-label mt-4">Subject Type</label>
                  <select class="form-select" id="SubjectType" name="subjectType"value={filters.subjectType} onChange={handleFilterChange}>
                    <option value="" selected>Choose...</option>
                    <option value="Science">Science Subjects</option>
                    <option value="Arts">Arts Subjects</option>
                    <option value="Commerce">Commerce Subjects</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                <div class="form-group">
                    <label for="exampleFee" className="form-label mt-4">Budget</label>
                    <input type="number" class="form-control" id="exampleFee" placeholder="Search for expected charges" name="fee" value={filters.fee} onChange={handleFilterChange}/>
                </div>
                
              </form>
            </div>
          </div>
        </div>
        <div className='col-8'>
          <div className="row">
            <div className="card border-light bg-light mb-3">
              <div className="card-body">
                <h5 className="card-title">Search</h5>
                <form className='my-3'>
                  <div className="row">
                    <div className="col-5">
                      <div className='form-group '>
                        <input type="text" class="form-control" id="expertise" placeholder="Search for Subject" name="expertise" value={filters.expertise} onChange={handleFilterChange}/>
                      </div>
                    </div> 
                    <div className="col-4">
                      <div className='form-group '>
                        <input type="text" class="form-control" id="username" placeholder="Search by username..." name="username" value={filters.username} onChange={handleFilterChange}/>
                      </div>
                    </div> 
                    <div className="col-3">
                      <button type="submit" className="btn btn-primary w-100">Search by location</button>
                    </div>
                  </div>
                </form>  
              </div>
            </div>
            <div className="card border-primary">
              <div className="card-body">
                <h5 className="card-title">
                  <span className="badge bg-light text-dark">{filteredUsers.length}</span>
                  <span className="badge bg-primary text-light">Results</span>
                </h5>
                <div className='my-3'>
                  {
                    loading && <Loader />
                  }
                  {
                    !loading && <UsersList users={filteredUsers} />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Finder