import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Empty from '../utils/Empty';
import Loader from '../utils/Loader';
import TutorProfile from '../utils/TutorProfile';

function ViewProfile() {

    const [teacher, setTeacher] = useState('');
    const [loading, setLoading] = useState(false)
    const [myself, setMyself] = useState(false)

    async function getTeacher() {
        try{
            setLoading(true)
            const {username} = JSON.parse(localStorage.getItem('teacher'))
            console.log(username)
            const res = await axios.get(`/api/teacher/profile/${username}`)
            console.log(res.data)
            setTeacher(res.data)
            setMyself(true)
            setLoading(false)
        }
        catch(err) {
            setTeacher('')
            setLoading(false)
            console.log(err)
        }
    }

    useEffect(()=>{
        getTeacher()
    },[])


    return (
        <>  
            {
                loading && <Loader />
            }
            {
                teacher == "" ?
                <Empty image='https://img.icons8.com/ios/100/teacher.png' title='Personal Profile' subtitle='Complete your profile to get students' />
                :
                teacher && 
                <TutorProfile teacher={teacher} myself={myself} />
            }
        </>
    )
}

export default ViewProfile