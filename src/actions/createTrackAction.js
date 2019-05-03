import TrackApi from '../api/Tracks';

async function createTrackAction(dispatch, currentUser, clashId, track){
  const response = await TrackApi.create(currentUser.jwt, clashId, track);
  dispatch({
    type: 'CREATE_TRACK',
    track: {...response.data},
    clashId: clashId,
  })

}
export default createTrackAction;