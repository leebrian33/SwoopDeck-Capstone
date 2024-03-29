import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import {
  Thunk_fetchAllJumpRecords,
  Thunk_fetchSingleJump,
  Thunk_updateJump,
  Thunk_deleteJump,
  Thunk_createJump,
} from "../store/jumpRecords";
import {
  thunk_fetchSingleDropzone,
  thunk_updateDropzone,
  thunk_createDropzone,
  thunk_deleteDropzone,
  thunk_fetchAllDropzones,
} from "../store/dropzones.js";
import {
  thunk_fetchAllLoads,
  thunk_createLoad,
  thunk_deleteLoad,
  thunk_fetchSingleLoad,
  thunk_updateLoad,
  addLoad,
} from "../store/loads";
import { Thunk_fetchUsers, Thunk_fetchUser } from "../store/allusers";
/**
 * REACT COMPONENT
 */
export class CreateLoad extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      aircraft: "",
      slots: "0",
      status: "on time",
      departureTime: "0",
    };

    this.handleChange = this.handleChange.bind(this);
    this.createLoad = this.createLoad.bind(this);
    this.clearFields = this.clearFields.bind(this);
  }
  componentDidMount() {
    //this.props.getSingleUser(this.props.match.params.id);
    this.props.getUsers();
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  createLoad(evt) {
    //GETTING DATE & TIME INFO

    const year = new Date();
    const createYear = year.getFullYear();

    const month = new Date();
    const createMonth = month.getMonth() + 1;

    const day = new Date();
    const createDay = day.getDate();

    const hour = new Date();
    const createHour = hour.getHours();

    const minutes = new Date();
    const createMinutes = minutes.getMinutes();
    //GETTING DATE & TIME INFO

    const dropzoneId = this.props.user.dropzoneId;
    console.log(this.props.user);

    const load = {
      ...this.state,
      isFull: false,
      date: `${createYear}-${createDay}-${createMonth} at ${createHour}:${createMinutes}`,
      dropzoneId: dropzoneId,
      slotsFilled: 0,
      // slots: this.state.slots,
    };
    this.props.addLoad(load, dropzoneId);
    // this.props.getLoads(dropzoneId);
    this.props.history.push('/:dropzoneId/todaysLoads')
  }

  clearFields() {
    this.setState({
      aircraft: "",
      slots: "0",
      status: "on time",
      departureTime: "0",
    });
  }

  render() {
    const { handleChange, clearFields, createLoad } = this;

    return (
      <div className="flex-right">
        <form>
          <div className="basic-info-group">
            <div className="edit-account-title-container">
              <div className="frame-528">
                <div className="frame-526">
                  <p id="titleLog">Create A Load</p>
                  <div className="view-all-past-skydiving-jump-logs">
                    Establish load details below
                  </div>
                </div>
                <div className="frame-527">
                  <button
                    id="cancel-btn"
                    onClick={() => {
                      this.props.history.push(`/home`);
                    }}
                  >
                    Cancel
                  </button>
                  {/* <Link to={`/:dropzoneId/todaysLoads`}> */}
                  <button
                    className="save-btn"
                    onClick={createLoad}
                  >
                    Save
                  </button>
                  {/* </Link>  */}
                </div>
              </div>
            </div>
            <div className="rectangle-21"></div>
            <div className="flex-row-1">
              <div className="flex-col-left">
                <div className="first-name manrope-normal-shark-14px">Aircraft Type</div>

                <input
                  className="search-bar border-1px-mystic search"
                  type="text"
                  name="aircraft"
                placeholder="Aircraft"
                onChange={handleChange}
                />

                <div className="frame-1">
                  <div className="frame-2">
                    <div className="email manrope-normal-shark-14px"
                    style={{width: '100px'}}>
                      Available Slots
                    </div>
                  </div>
                </div>
                <input
                  className="search-bar border-1px-mystic search"
                  type="text"
                  name="slots"
                  placeholder="10"
                  onChange={handleChange}
                />
              </div>

              <div className="flex-col-right">
                <div className="first-name manrope-normal-shark-14px">
                  Departure Time
                </div>

                <input
                  className="search-bar border-1px-mystic search"
                  type="text"
                  name="departureTime"
                  placeholder="Departure Time"
                  onChange={handleChange}
                />

                <div className="frame-1">
                  <div className="frame-2">
                    <div className="email manrope-normal-shark-14px">
                      Load Status
                    </div>
                  </div>
                </div>


              <select 
              className="search-bar border-1px-mystic search"
              name="status"
              onChange={handleChange}
              style={{padding: '.5rem'}}
              >
                <option name="on time">On Time</option>
                <option name="delayed">Delayed</option>
                <option name="closed">Closed</option>
              </select>
                
              </div>

            </div>
          </div>
        </form>

        {/* //////////////////////////// ORIGINAL FORM BELOW //////////////////////////// */}

        {/* <h1>Create New Load</h1>
        <form>
          <label htmlFor="aircraft">Aircraft Type</label>
          <input
            type="text"
            name="aircraft"
            placeholder="Aircraft"
            onChange={handleChange}
          />
          <label htmlFor="slots">Available Slots</label>
          <input
            type="text"
            name="slots"
            placeholder="10"
            onChange={handleChange}
          />
          <label htmlFor="departureTime">Departure Time</label>
          <input
            type="text"
            name="departureTime"
            placeholder="Departure Time"
            onChange={handleChange}
          />
          <label htmlFor="status">Status</label>
          <select name="status" onChange={handleChange}>
            <option name="on time">On Time</option>
            <option name="delayed">Delayed</option>
            <option name="closed">Closed</option>
          </select>
          <button type="button" onClick={createLoad}>
            Submit
          </button>
        </form> */}

        {/* //////////////////////////// ORIGINAL FORM ABOVE //////////////////////////// */}
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    jumpRecords: state.jumpRecords,
    user: state.auth,
    dropzones: state.dropzones.allDropzones,
    loads: state.loads,
  };
};

// const mapState = (state) => {
//   return {
//     jumpRecords: state.jumpRecords,
//     Users: state.users.allUsers,
//     dropzones: state.dropzones.allDropzones,
//     loads: state.loads,
//     singleUser: state.users.singleUser,
//     singleDropzone: state.dropzones.singleDropzone,
//   };
// };

const mapDispatch = (dispatch) => {
  return {
    editJumpRecord: (jump, userId, jumpId) =>
      dispatch(Thunk_updateJump(jump, userId, jumpId)), //WORKING//
    getJumpRecords: (userId) => dispatch(Thunk_fetchAllJumpRecords(userId)), //WORKING//
    deleteJumpRecord: (userId, jumpId) =>
      dispatch(Thunk_deleteJump(userId, jumpId)), //WOKRING//
    addJumpRecord: (jump, id) => dispatch(Thunk_createJump(jump, id)), //WORKING//
    getSingleJumpRecord: (userId, jumpId) =>
      dispatch(Thunk_fetchSingleJump(userId, jumpId)), //WORKING//

    ////////ABOVE is for USER TABLE//////BELOW IS FOR DROPZONE//////////////////////////

    editDropzone: (dropzoneId, dropzone) =>
      dispatch(thunk_updateDropzone(dropzoneId, dropzone)), //WOKRING//
    getDropzones: () => dispatch(thunk_fetchAllDropzones()), //WOKRING//
    deleteDropzone: (dropzoneId) => dispatch(thunk_deleteDropzone(dropzoneId)), //WOKRING//
    addDropzone: (DROPZONE) => dispatch(thunk_createDropzone(DROPZONE)), //WORKING//
    getSingleDropzone: (dropzoneId) =>
      dispatch(thunk_fetchSingleDropzone(dropzoneId)), //WORKING//

    /////////ABOVE IS FOR DROPZONE////////BELOW IS FOR LOADS/////////////////////////////

    editLoad: (dropzoneId, loadId, LOAD) =>
      dispatch(thunk_updateLoad(dropzoneId, loadId, LOAD)), //WORKING//
    getLoads: (dropzoneId) => dispatch(thunk_fetchAllLoads(dropzoneId)), //WORKING//
    deleteLoad: (dropzoneId, loadId) =>
      dispatch(thunk_deleteLoad(dropzoneId, loadId)), //WORKING//
    addLoad: (LOAD, dropzoneId) => dispatch(thunk_createLoad(LOAD, dropzoneId)), //WORKING//
    getSingleLoad: (dropzoneId, loadId) =>
      dispatch(thunk_fetchSingleLoad(dropzoneId, loadId)), //WORKING//

    //////////////////BELOW IS FOR USER////////////////////
    getUsers: () => dispatch(Thunk_fetchUsers()),
    getSingleUser: (id) => dispatch(Thunk_fetchUser(id)),
  };
};

export default connect(mapState, mapDispatch)(CreateLoad);
