import {Link} from 'react-router-dom'

import './index.css'

const CourseItem = props => {
  const {courseDetails} = props
  const {id, name, logoUrl} = courseDetails

  return (
    <Link to={`/courses/${id}`} className="link-item">
      <li className="course-item">
        <img src={logoUrl} alt={name} className="logo" />
        <h1 className="course-name">{name}</h1>
      </li>
    </Link>
  )
}

export default CourseItem
