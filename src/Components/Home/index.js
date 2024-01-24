import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import CourseItem from '../CourseItem'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstant.initial,
    listOfCourse: [],
  }

  componentDidMount() {
    this.getCourseList()
  }

  getCourseList = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const url = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.courses.map(eachCourse => ({
        id: eachCourse.id,
        name: eachCourse.name,
        logoUrl: eachCourse.logo_url,
      }))
      console.log(updatedData)
      this.setState({
        apiStatus: apiStatusConstant.success,
        listOfCourse: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderLoaderView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#4656a1" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {listOfCourse} = this.state

    return (
      <ul className="course-list-container">
        {listOfCourse.map(eachCourse => (
          <CourseItem key={eachCourse.id} courseDetails={eachCourse} />
        ))}
      </ul>
    )
  }

  renderCourses = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderSuccessView()
      case apiStatusConstant.inProgress:
        return this.renderLoaderView()
      case apiStatusConstant.failure:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="appContainer">
        <Header />
        <div className="coursesContainer">
          <h1 className="mainHeadingText">Courses</h1>
          {this.renderCourses()}
        </div>
      </div>
    )
  }
}

export default Home
