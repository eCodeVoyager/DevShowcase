import { useParams } from "react-router-dom";

const Profile = () => {
  const { userId } = useParams();
  return <div>Profile Id is : {userId}</div>;
};
export default Profile;
