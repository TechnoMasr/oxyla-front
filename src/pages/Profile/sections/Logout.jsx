import { RiLogoutCircleLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { logoutAct } from "../../../store/profile/profileSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAct())
      .unwrap()
      .then(() => {
        navigate("/", { replace: true });
      });
  };

  return (
    <section>
      <h2 className="text-2xl font-bold text-myPurple mb-4">Logout</h2>

      <div className="flex flex-col items-center gap-4 h-full">
        <span className="text-5xl text-white bg-myGreen p-2 rounded-full">
          <RiLogoutCircleLine />
        </span>

        <h1 className="text-2xl font-bold">
          Are you sure you want to logout ?
        </h1>

        <button className="mainBtn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </section>
  );
};

export default Logout;
