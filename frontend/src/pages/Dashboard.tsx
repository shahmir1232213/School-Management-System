import { useEffect, useState } from 'react'
import axios from 'axios'
import StatCard from '../components/DashBoard/StatCard'
import Loading from '../components/Loading'
import ErrorComponent from '../components/ErrorComponent'

interface passProp {
  totalStudents?: number
  noOfClasses?: number
  noOfTeachers?: number
  error?: string
}

const Dashboard = () => {
  const [dataFetch, setDataFetch] = useState<passProp | undefined>(undefined)
  const [errorFlag, setErrorFlag] = useState<boolean>(false)
  const [loadingFlag, setLoadingFlag] = useState<boolean>(true)

  useEffect(() => {
    async function fetch() {
      try {
        const { data } = await axios.get('http://localhost:5000/dashBoard/fetch')
        console.log('data: ', data)
        setDataFetch({
          totalStudents: data.totalStudents,
          noOfClasses: data.noOfClasses,
          noOfTeachers: data.noOfTeachers,
        })
      } catch (err: any) {
        console.log('err: ', err)
        setErrorFlag(true)
        setDataFetch({ error: err.message })
      } finally {
        setLoadingFlag(false)
      }
    }
    fetch()
  }, [])

  return (
    <div className="relative min-h-screen px-6 py-8 overflow-hidden">
  {/* Background image layer */}
  <div
  className="absolute inset-0 bg-no-repeat bg-cover opacity-10 z-0"
  style={{
    backgroundImage: "url('/images/logo.jpg')",
    backgroundPosition: 'center 15%', // move image down
  }}
></div>
       {loadingFlag ? (
        <Loading />
      ) : errorFlag ? (
        <ErrorComponent errMsg={dataFetch?.error ?? 'Unknown error'} onClose={() => setErrorFlag(false)} />
      ) : (
        <>
        <h1 className="relative inline-block text-3xl font-bold text-[#055266] mb-10 animate-fade-in-up transition-all duration-1000 hover:scale-105 hover:text-teal-700 hover:drop-shadow-lg cursor-pointer group">
          Jannat Scholars
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-teal-700 transition-all duration-500 group-hover:w-full"></span>
        </h1>
          {/* Stat Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <StatCard
              value={dataFetch?.totalStudents}
              icon="studentpic.png"
              label="Students"
              bg1="#0d687d"
              bg2="#e2fdfd"
            />
            <StatCard
              value={dataFetch?.noOfClasses}
              icon="img.PNG"
              label="Classes"
              bg1="#0d9488"
              bg2="#e2fdfd"
            />
            <StatCard
              value={dataFetch?.noOfTeachers}
              icon="teacherPic.png"
              label="Teachers"
              bg1="#16a34a"
              bg2="#e2fdfd"
            />
          </div>

          {/* Founders Section */}
          <div className="mt-16">
             <h1 className="relative inline-block text-3xl font-bold text-[#055266] mb-10 animate-fade-in-up transition-all duration-1000 hover:scale-105 hover:text-teal-700 hover:drop-shadow-lg cursor-pointer group">
                Founders
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-teal-700 transition-all duration-500 group-hover:w-full"></span>
              </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">    
              {[
                { name: 'Dada', img: '/images/dada.jpg' },
                { name: 'Dilawar', img: '/images/dilawar.jpg' },
                { name: 'Jameela Naheed Abdul Azeem Daddi', img: '/images/azeem.jpg' },
                { name: 'Din Muhammad Daddi Azam Ur Rahman Daddi', img: '/images/azam.jpg' },
              ].map((founder, idx) => (
                <div
                  key={idx}
                  className="group relative flex flex-col items-center transition-transform duration-300"
                >
                  <div className="w-[200px] h-[200px] rounded-full overflow-hidden shadow-lg transform transition duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                    <img
                      src={founder.img}
                      alt={founder.name}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <p className="mt-4 text-base text-center font-semibold text-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    {founder.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard
