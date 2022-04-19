import React, {Component} from 'react';
import Axios from 'axios';

import './app.css';

class App extends Component {

  state = {
    name: '',
    email: '',
    phone: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const datas = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }
    Axios.post('/users/register',datas)
    .then(res => alert('Thank you! ' + res.data.name + '. Your registration is successfully.'))
    .catch(err => console.log('Error : '+err))
  }

  render() {
    return(
      <div className="app-container">
        <article className="row">
          <article className="flex-v-center col-lg-6 col-lg-push-3 col-md-6 col-md-push-3 col-sm-10 col-sm-push-1 col-xs-10 col-xs-push-1">
            <form className="form-box" onSubmit={this.handleSubmit}>
              <h2 className="text-center">Re-bots</h2>
              <div className="form-group">
                <input type="text" name="name" className="form-control" placeholder="Enter the Name" autoComplete="off" onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <input type="email" name="email" className="form-control" placeholder="Enter the Email" autoComplete="off" onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <input type="password" name="password" className="form-control" placeholder="Enter the Password" autoComplete="off" onChange={this.handleChange} />
              </div>
              <button type="submit" className="btn btn-success">Let's Go</button>
            </form>
          </article>
        </article>
      </div>
    )
  }
}
export default App;
