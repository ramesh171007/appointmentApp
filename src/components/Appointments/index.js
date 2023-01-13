import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem/index'

// import {format} from 'date-fns'
import './index.css'

class Appointments extends Component {
  state = {appointmentList: [], name: '', dateTask: ''}

  onNameChange = event => {
    this.setState({name: event.target.value})
  }

  onTaskChange = event => {
    const revDate = event.target.value
    // const date = new Date(revDate)
    // const newDate = format(date, 'd LLL yyyy EEEE')
    this.setState({dateTask: revDate})
  }

  submitItem = event => {
    event.preventDefault()
    const {name, dateTask} = this.state
    const newTask = {
      id: uuidv4(),
      name,
      dateTask,
      isStarted: false,
    }
    console.log(newTask)

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newTask],
      name: '',
      dateTask: '',
    }))
  }

  startedItem = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(each => {
        if (each.id === id) {
          return {...each, isStarted: !each.isStarted}
        }
        return each
      }),
    }))
  }

  filterItem = () => {
    const {appointmentList} = this.state
    const res = appointmentList.filter(each => each.isStarted === true)
    this.setState({appointmentList: res})
  }

  render() {
    const {appointmentList, name, dateTask} = this.state

    return (
      <div className="bg-container">
        <div className="card-item">
          <div className="top-section">
            <div className="form-section">
              <h1>Add Appointment</h1>
              <form className="form-style" onSubmit={this.submitItem}>
                <p className="label">Title</p>
                <input
                  type="text"
                  className="input-style"
                  value={name}
                  onChange={this.onNameChange}
                  placeholder="Title"
                />
                <p className="label">Date</p>
                <input
                  type="date"
                  className="input-style"
                  value={dateTask}
                  onChange={this.onTaskChange}
                />
                <button type="submit" className="btn-style">
                  Add
                </button>
              </form>
            </div>
            <div className="image-section">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appoint-img"
              />
            </div>
          </div>
          <hr />

          <div className="appoint-container">
            <div className="appoint-heading">
              <h1 className="heading">Appointments</h1>
              <button
                type="button"
                className="star-style"
                onClick={this.filterItem}
              >
                Starred
              </button>
            </div>
            <div className="app-card-container">
              {appointmentList.map(eachItem => (
                <AppointmentItem
                  key={eachItem.id}
                  appintmentDetails={eachItem}
                  startedItem={this.startedItem}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
