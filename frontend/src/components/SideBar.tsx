import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { adminLinks } from "../data/list";
import ConfirmationModal from "./ConfirmationModal";
import LoadingComponent from "./Loading";
import ErrorComponent from "./ErrorComponent";

const SideBar: React.FC = () => {
  const navigate = useNavigate();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogout(): Promise<void> {
    setLogoutLoading(true);

    try {
      await axios.post("http://localhost:5000/auth/logout");
      navigate("/", { replace: true });
    } catch (error) {
      const message =
        axios.isAxiosError(error) && error.response?.data?.error
          ? String(error.response.data.error)
          : "Unable to logout right now";
      setErrorMessage(message);
    } finally {
      setLogoutLoading(false);
      setConfirmLogout(false);
    }
  }

  return (
    <>
      <div className="flex h-full flex-col bg-[#055266] p-4 text-white" style={{ width: "15vw" }}>
        <img
          className="ml-6 h-32 w-28 rounded-full border-2 border-white"
          src="/images/logo.jpg"
          alt="Logo"
        />
        <nav className="mt-24 flex-1">
          {adminLinks.map((group) => (
            <Fragment key={group.title}>
              <p className="mb-1">{group.title}</p>
              {group.links.map((link) => (
                <Link key={link.name} to={link.path}>
                  <div className="p-3 font-bold hover:bg-[#2695a9]">
                    <link.icon className="mr-2 inline-block text-lg" />
                    {link.name}
                  </div>
                </Link>
              ))}
            </Fragment>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setConfirmLogout(true)}
          className="mt-6 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-left font-semibold transition hover:bg-white/20"
        >
          Logout
        </button>
      </div>

      {confirmLogout ? (
        <ConfirmationModal
          title="Logout"
          message="Are you sure you want to logout from the admin portal?"
          confirmText="Logout"
          isLoading={logoutLoading}
          onCancel={() => {
            if (!logoutLoading) {
              setConfirmLogout(false);
            }
          }}
          onConfirm={() => void handleLogout()}
        />
      ) : null}

      {logoutLoading ? <LoadingComponent message="Logging out..." /> : null}
      {errorMessage ? (
        <ErrorComponent errMsg={errorMessage} onClose={() => setErrorMessage("")} />
      ) : null}
    </>
  );
};

export default SideBar;
