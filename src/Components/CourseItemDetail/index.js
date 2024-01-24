import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class CourseItemDetail extends Component {
  state = {
    apiStatus: apiStatusConstant.initial,
    courseDetails: {},
  }

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      console.log(updatedData)
      this.setState({
        apiStatus: apiStatusConstant.success,
        courseDetails: updatedData,
      })
    }
  }

  renderSuccessView = () => {
    const {courseDetails} = this.state
    const {name, imageUrl, description} = courseDetails

    return (
      <div className="course-detail-container ">
        <div className="content-container">
          <img src={imageUrl} alt={name} className="course-image" />
          <div className="text-container">
            <h1 className="course-name">{name}</h1>
            <p className="course-description">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  renderLoaderView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#4656a1" height={50} width={50} />
    </div>
  )

  renderCourseDetail = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderSuccessView()
      case apiStatusConstant.inProgress:
        return this.renderLoaderView()
      case apiStatusConstant.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderCourseDetail()}
      </>
    )
  }
}

export default CourseItemDetail
