import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Thunk_fetchAllJumpRecords,
  Thunk_fetchSingleJump,
  Thunk_updateJump,
  Thunk_deleteJump,
  Thunk_createJump,
} from '../store/jumpRecords';
import {
  thunk_fetchSingleDropzone,
  thunk_updateDropzone,
  thunk_createDropzone,
  thunk_deleteDropzone,
  thunk_fetchAllDropzones,
} from '../store/dropzones.js';
import {
  thunk_fetchAllLoads,
  thunk_createLoad,
  thunk_deleteLoad,
  thunk_fetchSingleLoad,
  thunk_updateLoad,
} from '../store/loads';

/**
 * REACT COMPONENT
 */
export class AllDropzones extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    await this.props.getDropzones();
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  render() {
    const allDropzones = this.props.dropzones;

    return (
      <div>
        <h2>Dropzones:</h2>
        {allDropzones.map((dropzone) => (
          <div key={dropzone.id}>
            <p>First name: {dropzone.name}</p>
            <p>Last name: {dropzone.address} </p>
            <p>Email: {dropzone.email} </p>
            <Link to={`/dropzones/${dropzone.id}`} >
              <button>View more</button>
            </Link>
            <hr />
            <hr />
          </div>
        ))}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    jumpRecords: state.jumpRecords,
    users: state.auth,
    dropzones: state.dropzones,
    loads: state.loads,
  };
};

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
  };
};

export default connect(mapState, mapDispatch)(AllDropzones);