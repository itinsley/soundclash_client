import _ from "lodash";

const insertComment=(trackId, comment, currentClash)=>{
  const clash = _.cloneDeep(currentClash);
  const round = clash.rounds.find(r=>(r.owner_track.id===trackId ||r.opponent_track.id===trackId ));
  const track = (round.owner_track.id===trackId)?round.owner_track:round.opponent_track;
  track.comments.unshift(comment)
  return clash;
}

export {
  insertComment
}