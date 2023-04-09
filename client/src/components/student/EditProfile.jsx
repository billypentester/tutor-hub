import React, {useState} from 'react'
import { Link } from 'react-router-dom'

function EditProfile() {

  const [profile, setProfile] = React.useState({})
  
  async function getProfile() {
    const response = localStorage.getItem('student')
    const data = JSON.parse(response)
    setProfile(data)
  }

  React.useEffect(() => {
    getProfile()
  }, [])

  return (
    <div className='d-flex justify-content-center'>
      <div className='col-10'>

        <div className='d-flex justify-content-center align-items-center px-4 mb-4'>
          <div>
            <h1 className='display-5'>Profile</h1>
          </div>
        </div>

        <div className='d-flex bg-light p-4 mb-4 rounded-3 flex-column'>
          <div className='p-3'>
            <h4>Personal Information</h4>
            <div className='d-flex flex-column'>
              <div className='row'>
                <div className='col-md-6'>
                  <div class="form-group">
                    <label for="updateName" class="form-label mt-4">Name</label>
                    <input type="text" class="form-control" id="updateName" placeholder="Enter name" value={profile.name}/>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div class="form-group">
                    <label for="updateUsername" class="form-label mt-4">Username</label>
                    <input type="text" class="form-control" id="updateUsername" placeholder="Enter name" value={profile.username}/>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-6'>
                  <div class="form-group">
                    <label for="updateEmail" class="form-label mt-4">Email address</label>
                    <input type="email" class="form-control" id="updateEmail" placeholder="Enter email" value={profile.email}/>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div class="form-group">
                    <label for="updateContact" class="form-label mt-4">Contact No.</label>
                    <input type="email" class="form-control" id="updateContact" placeholder="Enter Phone No." value={profile.contact}/>
                  </div>
                </div>
              </div>
              <div className='row align-items-end'>
                <div className='col-md-6'>
                  <div class="form-group">
                    <label for="formFile" class="form-label mt-4 d-block">Profile</label>
                    <div className='text-center my-4'>
                      <img src={profile.profile} alt='profile' className='img-fluid rounded-circle'/>
                    </div>
                    <input class="form-control" type="file" id="formFile"/>  
                  </div>
                </div>
                <div className='col-md-6'>
                  <div class="form-group">
                    <label for="updateDOB" class="form-label mt-4">Date of Birth</label>
                    <input type="date" class="form-control" id="updateDOB" placeholder="Select DOB"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='p-3'>
            <h4>Prefrences</h4>
            <div className='d-flex flex-column'>
              <div className='row'>
                <div className='col-md-4'>
                  <div class="form-group">
                    <label for="updateCity" class="form-label mt-4">City</label>
                    <select class="form-select" id="updateCity">
                      <option>Karachi</option>
                      <option>Lahore</option>
                      <option>Faisalabad</option>
                      <option>Rawalpindi</option>
                      <option>Gujranwala</option>
                      <option>Peshawar</option>
                      <option>Multan</option>
                      <option>Saidu Sharif</option>
                      <option>Hyderabad City</option>
                      <option>Islamabad</option>
                      <option>Quetta</option>
                      <option>Bahawalpur</option>
                      <option>Sargodha</option>
                      <option>Sialkot City</option>
                      <option>Sukkur</option>
                      <option>Larkana</option>
                      <option>Chiniot</option>
                      <option>Shekhupura</option>
                      <option>Jhang City</option>
                      <option>Dera Ghazi Khan</option>
                      <option>Gujrat</option>
                      <option>Rahimyar Khan</option>
                      <option>Kasur</option>
                      <option>Mardan</option>
                      <option>Mingaora</option>
                      <option>Nawabshah</option>
                      <option>Sahiwal</option>
                      <option>Mirpur Khas</option>
                      <option>Okara</option>
                      <option>Mandi Burewala</option>
                      <option>Jacobabad</option>
                      <option>Saddiqabad</option>
                      <option>Kohat</option>
                      <option>Muridke</option>
                      <option>Muzaffargarh</option>
                      <option>Khanpur</option>
                      <option>Gojra</option>
                      <option>Mandi Bahauddin</option>
                      <option>Abbottabad</option>
                      <option>Turbat</option>
                      <option>Dadu</option>
                      <option>Bahawalnagar</option>
                      <option>Khuzdar</option>
                      <option>Pakpattan</option>
                      <option>Tando Allahyar</option>
                      <option>Ahmadpur East</option>
                      <option>Vihari</option>
                      <option>Jaranwala</option>
                      <option>New Mirpur</option>
                      <option>Kamalia</option>
                      <option>Kot Addu</option>
                      <option>Nowshera</option>
                      <option>Swabi</option>
                      <option>Khushab</option>
                      <option>Dera Ismail Khan</option>
                      <option>Chaman</option>
                      <option>Charsadda</option>
                      <option>Kandhkot</option>
                      <option>Chishtian</option>
                      <option>Hasilpur</option>
                      <option>Attock Khurd</option>
                      <option>Muzaffarabad</option>
                      <option>Mianwali</option>
                      <option>Jalalpur Jattan</option>
                      <option>Bhakkar</option>
                      <option>Zhob</option>
                      <option>Dipalpur</option>
                      <option>Kharian</option>
                      <option>Mian Channun</option>
                      <option>Bhalwal</option>
                      <option>Jamshoro</option>
                      <option>Pattoki</option>
                      <option>Harunabad</option>
                      <option>Kahror Pakka</option>
                      <option>Toba Tek Singh</option>
                      <option>Samundri</option>
                      <option>Shakargarh</option>
                      <option>Sambrial</option>
                      <option>Shujaabad</option>
                      <option>Hujra Shah Muqim</option>
                      <option>Kabirwala</option>
                      <option>Mansehra</option>
                      <option>Lala Musa</option>
                      <option>Chunian</option>
                      <option>Nankana Sahib</option>
                      <option>Bannu</option>
                      <option>Pasrur</option>
                      <option>Timargara</option>
                      <option>Parachinar</option>
                      <option>Chenab Nagar</option>
                      <option>Gwadar</option>
                      <option>Abdul Hakim</option>
                      <option>Hassan Abdal</option>
                      <option>Tank</option>
                      <option>Hangu</option>
                      <option>Risalpur Cantonment</option>
                      <option>Karak</option>
                      <option>Kundian</option>
                      <option>Umarkot</option>
                      <option>Chitral</option>
                      <option>Dainyor</option>
                      <option>Kulachi</option>
                      <option>Kalat</option>
                      <option>Kotli</option>
                      <option>Gilgit</option>
                      <option>Narowal</option>
                      <option>Khairpur Mir’s</option>
                      <option>Khanewal</option>
                      <option>Jhelum</option>
                      <option>Haripur</option>
                      <option>Shikarpur</option>
                      <option>Rawala Kot</option>
                      <option>Hafizabad</option>
                      <option>Lodhran</option>
                      <option>Malakand</option>
                      <option>Attock City</option>
                      <option>Batgram</option>
                      <option>Matiari</option>
                      <option>Ghotki</option>
                      <option>Naushahro Firoz</option>
                      <option>Alpurai</option>
                      <option>Bagh</option>
                      <option>Daggar</option>
                      <option>Leiah</option>
                      <option>Tando Muhammad Khan</option>
                      <option>Chakwal</option>
                      <option>Badin</option>
                      <option>Lakki</option>
                      <option>Rajanpur</option>
                      <option>Dera Allahyar</option>
                      <option>Shahdad Kot</option>
                      <option>Pishin</option>
                      <option>Sanghar</option>
                      <option>Upper Dir</option>
                      <option>Thatta</option>
                      <option>Dera Murad Jamali</option>
                      <option>Kohlu</option>
                      <option>Mastung</option>
                      <option>Dasu</option>
                      <option>Athmuqam</option>
                      <option>Loralai</option>
                      <option>Barkhan</option>
                      <option>Musa Khel Bazar</option>
                      <option>Ziarat</option>
                      <option>Gandava</option>
                      <option>Sibi</option>
                      <option>Dera Bugti</option>
                      <option>Eidgah</option>
                      <option>Uthal</option>
                      <option>Khuzdar</option>
                      <option>Chilas</option>
                      <option>Panjgur</option>
                      <option>Gakuch</option>
                      <option>Qila Saifullah</option>
                      <option>Kharan</option>
                      <option>Aliabad</option>
                      <option>Awaran</option>
                      <option>Dalbandin</option>

                    </select>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div class="form-group">
                    <label for="updateGender" class="form-label mt-4">Gender</label>
                    <select class="form-select" id="updateGender">
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div class="form-group">
                    <label for="updateLanguage" class="form-label mt-4">Language</label>
                    <select class="form-select" id="updateLanguage">
                      <option>Urdu</option>
                      <option>English</option>
                      <option>Punjabi</option>
                      <option>Sindhi</option>
                      <option>Pashto</option>
                      <option>Saraiki</option>
                      <option>Balochi</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className='my-3 mx-auto'>
            <button type="submit" class="btn btn-primary">Save</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default EditProfile