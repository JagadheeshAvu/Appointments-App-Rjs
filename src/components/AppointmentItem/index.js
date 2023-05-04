// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appDetails, toggleIsStarred} = props
  const {id, title, date, isStarred} = appDetails

  const onClickStarred = () => {
    toggleIsStarred(id)
  }
  const starImageUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="appointment-item">
      <div className="list-elements">
        <div>
          <p className="title-name">{title}</p>
          <p className="date">Date: {date}</p>
        </div>
        <button
          type="button"
          className="star-button"
          onClick={onClickStarred}
          data-testid="star"
        >
          <img src={starImageUrl} alt="star" className="star-image" />
        </button>
      </div>
    </li>
  )
}

export default AppointmentItem
