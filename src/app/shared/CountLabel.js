import pluralize from "pluralize";

const CountLabel = ({ count, label }) => {
  return count + " " + pluralize(label, count);
};

export default CountLabel;
