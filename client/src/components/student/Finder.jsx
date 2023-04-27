import React, {useState, useEffect} from 'react'
import ProfileData from './../../assets/data/teachers.json'

function User(props) {
  return (
    <div className="card border-light bg-light mb-3 py-3">
      <div className="row">
        <div className="col-4 text-center">
          <img src="https://via.placeholder.com/150" className="img-fluid rounded-circle" alt="..." />
        </div>
        <div className="col-8">
          <div className="card-body">
            <h5 className="card-title">{props.username}</h5>
            <div className="d-flex flex-wrap justify-content-between">
              <p className="card-text">City: {props.city}</p>
              <p className="card-text">Rating: {props.rating}</p>
              <p className="card-text">Experience: {props.experience}</p>
              <p className="card-text">Expertise: {props.expertise}</p>
              <p className="card-text">Subject Type: {props.subjectType}</p>
              <p className="card-text">fee:{props.fee}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UsersList(props) {
  const users = props.users.map((user) => (
    <User
      key={user.username}
      username={user.username}
      city={user.city}
      rating={user.rating}
      experience={user.experience}
      expertise={user.expertise}
      subjectType={user.subjectType}
      subjectLevel={user.subjectLevel}
      days={user.days}
      timeslot={user.timeslot}
      fee={user.fee}
    />
  ));

  return <div>{users}</div>;
}

function Finder() {

  const [users, setUsers] = useState([]);

  const [filters, setFilters] = useState({
    city: '',
    rating: '',
    username: '',
    expertise: '',
    experience: '',
    subjectType: '',
    fee: ''
  });

  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  const filterUsers = () => {
    let filteredUsers = users;
    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        filteredUsers = filteredUsers.filter((user) =>
          key === "rating" || key === "fee" ? user[key] >= value : user[key].toLowerCase().includes(value.toLowerCase())
        );
      }
    }
    setFilteredUsers(filteredUsers);
  };

  useEffect(() => {
    setUsers(ProfileData);
    setFilteredUsers(ProfileData);
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
                        <input type="text" class="form-control" id="expertise" placeholder="Search for Subject" name="search" value={filters.expertise} onChange={handleFilterChange}/>
                      </div>
                    </div> 
                    <div className="col-4">
                      <div className='form-group '>
                        <input type="text" class="form-control" id="username" placeholder="Search by username..." name="search" value={filters.username} onChange={handleFilterChange}/>
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
                <h5 className="card-title">Results</h5>
                <div className='my-3'>
                  <UsersList users={filteredUsers} />
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