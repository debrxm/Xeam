import React from "react";
import firebase from "firebase/app";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { updateProfile } from "../../firebase/firebase.utils";
import glob from "../../assets/global.svg";
import bioIcon from "../../assets/bio.svg";
import nameIcon from "../../assets/name.svg";
import camera from "../../assets/camera.svg";
import FormInput from "../../components/FormInput/FormInput";
import Spinner from "../../components/Spinner/Spinner";
import "./EditMe.scss";
class EditProfile extends React.Component {
  state = {
    fullName: "",
    bio: "",
    website: "",
    pp: "",
    isLoading: false,
    isChanged: false,
  };
  componentDidMount() {
    this.setState({
      fullName: this.props.currentUser.displayName
        ? this.props.currentUser.displayName
        : "",
      bio: this.props.currentUser.bio ? this.props.currentUser.bio : "",
      website: this.props.currentUser.website
        ? this.props.currentUser.website
        : "",
      pp: this.props.currentUser.profile_pic
        ? this.props.currentUser.profile_pic
        : "",
    });
  }

  handlePpChange = async (e) => {
    this.setState({ isLoading: true, isChanged: true });
    const selectedFile = e.target.files[0];
    this.fetchImageUrl(selectedFile, "profile-pic");
  };

  fetchImageUrl = async (selectedFile, dest) => {
    const storageRef = firebase
      .storage()
      .ref(`users/${this.props.currentUser.id}/${dest}/${selectedFile}`);
    const uploadTask = storageRef.put(selectedFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log("Upload is running");
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
          this.setState({ pp: downloadURL });
        });
      }
    );
    this.setState({ isLoading: false });
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, isChanged: true });
  };
  handleSave = async () => {
    const { fullName, bio, website, location, pp } = this.state;
    const incomingData = {
      fullName,
      bio,
      website,
      profile_pic: pp,
    };
    await updateProfile(this.props.currentUser.id, incomingData);
    this.props.history.push("/me");
  };
  render() {
    const { currentUser } = this.props;
    const { fullName, bio, website, pp } = this.state;
    return (
      <div className="profile-edit-page main">
        {currentUser ? (
          <div className="profile-edit">
            <div className="profile-edit-page-header">
              <div className="edit-control">
                {this.state.isChanged && (
                  <span className="Update" onClick={this.handleSave}>
                    Save
                  </span>
                )}
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
                      <img src={camera} alt="upload icon" />
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
              <div className="form-input-group">
                <div className="icon-conatainer">
                  <img className="padlock-icon" src={nameIcon} alt="padlock" />
                </div>
                <FormInput
                  type="text"
                  name="fullName"
                  value={fullName}
                  label="Fullname"
                  onChange={this.handleChange}
                  edit
                />
              </div>
              <div className="form-input-group">
                <div className="icon-conatainer">
                  <img className="padlock-icon" src={bioIcon} alt="padlock" />
                </div>
                <FormInput
                  type="text"
                  name="bio"
                  value={bio}
                  label="Bio"
                  onChange={this.handleChange}
                  edit
                />
              </div>
              <div className="form-input-group">
                <div className="icon-conatainer">
                  <img className="padlock-icon" src={glob} alt="padlock" />
                </div>
                <FormInput
                  type="text"
                  name="website"
                  value={website}
                  label="Website"
                  onChange={this.handleChange}
                  edit
                />
              </div>
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
