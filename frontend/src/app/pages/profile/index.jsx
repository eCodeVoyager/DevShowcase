import { useParams } from "react-router-dom";

const Profile = () => {
  const { username } = useParams();
  return <div>Profile Id is : {username}</div>;
};
export default Profile;
