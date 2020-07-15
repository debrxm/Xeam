import React from 'react';
import firebase from 'firebase/app';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { updateProfile } from '../../firebase/firebase.utils';
import cancel from '../../assets/cancel.svg';
import cam from '../../assets/cam.svg';
import FormInput from '../../components/FormInput/FormInput';
import Spinner from '../../components/Spinner/Spinner';
import './EditMe.scss';
class EditProfile extends React.Component {
  state = {
    fullName: '',
    bio: '',
    website: '',
    pp: '',
    cover: '',
    location: '',
    isLoading: false,
  };
  componentDidMount() {
    this.setState({
      fullName: this.props.currentUser.displayName
        ? this.props.currentUser.displayName
        : '',
      bio: this.props.currentUser.bio ? this.props.currentUser.bio : '',
      website: this.props.currentUser.website
        ? this.props.currentUser.website
        : '',
      cover: this.props.currentUser.cover ? this.props.currentUser.cover : '',
      pp: this.props.currentUser.profile_pic
        ? this.props.currentUser.profile_pic
        : '',
    });
  }

  handleCoverChange = async (e) => {
    this.setState({ isLoading: true });
    const selectedFile = e.target.files[0];
    this.fetchImageUrl(selectedFile, 'cover', 'cover');
  };

  handlePpChange = async (e) => {
    this.setState({ isLoading: true });
    const selectedFile = e.target.files[0];
    this.fetchImageUrl(selectedFile, 'profile-pic', 'pp');
  };

  fetchImageUrl = async (selectedFile, dest, sta) => {
    const storageRef = firebase
      .storage()
      .ref(`users/${this.props.currentUser.id}/${dest}/${selectedFile}`);
    const uploadTask = storageRef.put(selectedFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log('Upload is running');
            break;
          default:
            return;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        // get the uploaded image url back
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          sta === 'pp'
            ? this.setState({ pp: downloadURL })
            : this.setState({ cover: downloadURL });
        });
      }
    );
    this.setState({ isLoading: false });
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleSave = async () => {
    const { fullName, bio, website, location, pp, cover } = this.state;
    const incomingData = {
      fullName,
      bio,
      website,
      cover,
      profile_pic: pp,
      location,
    };
    await updateProfile(this.props.currentUser.id, incomingData);
    this.props.history.push('/me');
  };
  render() {
    const { currentUser } = this.props;
    const { fullName, bio, website, pp, cover } = this.state;
    return (
      <div className="profile-edit-page main">
        {currentUser ? (
          <div className="profile-edit">
            <div className="profile-edit-page-header">
              <div className="edit-control">
                <div className="cancel_title">
                  <Link to="/me">
                    <img src={cancel} alt="cancel icon" />
                  </Link>
                  <span>Edit Profile</span>
                </div>
                <span className="save" onClick={this.handleSave}>
                  Save
                </span>
              </div>
              <div className="profile-page-header-image">
                <div className="cover-container">
                  <img className="cover-image" src={cover} alt="cover" />
                </div>
                <div className="ctrls">
                  <div className="upload-btn-wrapper">
                    <img src={cam} alt="upload icon" />
                    <input
                      type="file"
                      name="cover"
                      accept="image/gif, image/jpeg, image/png"
                      onChange={this.handleCoverChange}
                    />
                  </div>
                  <img src={cancel} alt="cancel icon" />
                </div>
              </div>
              <div className="profile-pic_buttons">
                <div
                  className="profile-pic"
                  style={{
                    backgroundImage: `linear-gradient(#0000008e, #000000a1), url(${pp})`,
                  }}
                >
                  <div className="pp">
                    <div className="upload-btn-wrapper">
                      <img src={cam} alt="upload icon" />
                      <input
                        type="file"
                        name="pp"
                        accept="image/gif, image/jpeg, image/png"
                        onChange={this.handlePpChange}
                      />
                    </div>
                  </div>
                  <br />
                </div>
              </div>
            </div>
            <form onSubmit={this.handleSave}>
              <FormInput
                type="text"
                name="fullName"
                value={fullName}
                label="Fullname"
                onChange={this.handleChange}
                edit
              />
              <FormInput
                type="text"
                name="bio"
                value={bio}
                label="Bio"
                onChange={this.handleChange}
                edit
              />
              <FormInput
                type="text"
                name="website"
                value={website}
                label="Website"
                onChange={this.handleChange}
                edit
              />
            </form>
            {/* </>
          )} */}
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default withRouter(connect(mapStateToProps)(EditProfile));
