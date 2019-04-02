import React, { Component } from 'react'; 
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase';
import config from './firebaseConfig';
import './App.css';

firebase.initializeApp(config)

class App extends Component {

  state = {
    image: '',
    imageURL: '',
    progress: 0
  }

  handleUploadStart = () => {

    this.setState({

      progress: 0
    })
  }

  handleUploadSuccess = filename => {

    this.setState({

      image: filename,
      progress: 100
    })

    firebase.storage().ref('fire').child(filename).getDownloadURL()
      .then(url => this.setState({
          imageURL: url
      }))
  }

  handleProgress = progress => {
    this.setState({

      progress: progress
    })
  }

  render() {

    return (
      <div>

        <label> Progress:</label>
          <p>{this.state.progress}</p>

          <br/>
          <br/>
          <br/>
          <label> Image:</label>
            {this.state.image && <img src={this.state.imageURL} />}

            {this.state.imageURL && <a href={this.state.imageURL}> Download me</a>}
            <br/>
            <br/>
            <br/>
        <FileUploader 
          accept="image/*"
          name='image'
          storageRef={firebase.storage().ref('fire')}
          onUploadStart={this.handleUploadStart}
          onUploadSuccess={this.handleUploadSuccess}
          onProgress={this.handleProgress}

        
        />
      </div>
    );
  }
}

export default App;
