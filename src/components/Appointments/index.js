// Write your code here

import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {title: '', date: '', appointmentsList: [], isStarredActive: false}

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onAddDetails = event => {
    event.preventDefault()
    const {title, date} = this.state
    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy,EEEE')
      : ''

    const newUser = {
      id: uuidv4(),
      title,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newUser],
      title: '',
      date: '',
    }))
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onFilter = () => {
    const {isStarredActive} = this.state
    this.setState({isStarredActive: !isStarredActive})
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, isStarredActive} = this.state

    if (isStarredActive) {
      return appointmentsList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {title, date, isStarredActive} = this.state
    const filterClassName = isStarredActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()
    return (
      <div className="app-container">
        <div className="container">
          <form id="form" className="form">
            <div>
              <h1 className="heading">Add Appointment</h1>
              <div className="input-title">
                <label htmlFor="title">TITLE</label>
                <input
                  type="text"
                  value={title}
                  id="title"
                  className="form-control"
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="input-date">
                <label htmlFor="date">DATE</label>
                <input
                  type="date"
                  value={date}
                  id="date"
                  className="form-control"
                  onChange={this.onChangeDate}
                />
              </div>
              <button
                type="submit"
                className="add-button"
                onClick={this.onAddDetails}
              >
                Add
              </button>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </form>
          <hr className="line" />
          <div className="footer">
            <h1 className="appointment-heading">Appointments</h1>
            <button
              type="button"
              className={`starred-button ${filterClassName}`}
              onClick={this.onFilter}
            >
              Starred
            </button>
          </div>
          <ul className="list-items">
            {filteredAppointmentsList.map(each => (
              <AppointmentItem
                key={each.id}
                toggleIsStarred={this.toggleIsStarred}
                appDetails={each}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
