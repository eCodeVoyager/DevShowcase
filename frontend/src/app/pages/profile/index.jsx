import { useParams } from "react-router-dom";

const Profile = () => {
  const { username } = useParams();
  return <section>Profile Id is : {username}</section>;
};
export default Profile;
