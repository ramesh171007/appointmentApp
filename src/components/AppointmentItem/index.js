import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appintmentDetails, startedItem} = props
  const {id, name, dateTask, isStarted} = appintmentDetails
  const newDate = format(new Date(dateTask), 'd LLL yyyy EEEE')
  const starUrl = isStarted
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const clickedStar = () => {
    startedItem(id)
  }
  return (
    <div className="li-container">
      <div className="app-card">
        <div className="heading-cont">
          <p className="app-heading">{name}</p>
          <button
            type="button"
            className="star"
            onClick={clickedStar}
            data-testid="star"
          >
            <img src={starUrl} alt="star" />
          </button>
        </div>

        <p className="app-date">{newDate}</p>
      </div>
    </div>
  )
}

export default AppointmentItem
