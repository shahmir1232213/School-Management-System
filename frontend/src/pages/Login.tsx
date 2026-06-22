import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorComponent from "../components/ErrorComponent";
import LoadingComponent from "../components/Loading";

const Login: React.FC = () => {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [loadingFlag, setLoadingFlag] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function verifyAuth(): Promise<void> {
      try {
        await axios.get("http://localhost:4000/auth/verify");
        navigate("/home/dashboard", { replace: true });
      } catch (error) {
        return;
      }
    }

    void verifyAuth();
  }, [navigate]);

  async function handleSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    setLoadingFlag(true);

    try {
      await axios.post("http://localhost:4000/auth/login", {
        adminId,
        password,
      });
      navigate("/home/dashboard", { replace: true });
    } catch (error) {
      const message =
        axios.isAxiosError(error) && error.response?.data?.error
          ? String(error.response.data.error)
          : "Unable to login";
      setErrorMessage(message);
    } finally {
      setLoadingFlag(false);
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#d7f0ef,_#f6fbfa_55%,_#eef5f3)] px-6 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl overflow-hidden rounded-[2rem] border border-white/80 bg-white/85 shadow-[0_24px_80px_rgba(5,82,102,0.18)] backdrop-blur">
        <div className="hidden w-[46%] flex-col justify-between bg-[linear-gradient(160deg,_#055266,_#0d9488)] p-10 text-white md:flex">
          <div>
            <div className="mb-8 flex items-center gap-4">
              <img
                src="/images/logo.jpg"
                alt="School Logo"
                className="h-20 w-20 rounded-2xl border-2 border-white/70 object-cover shadow-lg"
              />
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-teal-100">Admin Portal</p>
                <h1 className="text-3xl font-bold">School Management</h1>
              </div>
            </div>
            <p className="max-w-sm text-base leading-7 text-teal-50">
              Sign in to manage students, teachers, classes, subjects, and timetable updates from
              one place.
            </p>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center p-8 sm:p-12">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center md:hidden">
              <img
                src="/images/logo.jpg"
                alt="School Logo"
                className="mx-auto mb-4 h-20 w-20 rounded-2xl border border-teal-100 object-cover shadow-md"
              />
              <h1 className="text-3xl font-bold text-[#055266]">School Management</h1>
            </div>

            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0d9488]">
                Welcome Back
              </p>
              <h2 className="mt-3 text-4xl font-bold text-[#073642]">Admin Login</h2>
              <p className="mt-3 text-base leading-7 text-slate-500">
                Use your admin credentials to continue to the dashboard.
              </p>
            </div>

            <form className="space-y-5" onSubmit={(event) => void handleSubmit(event)}>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">Admin ID</label>
                <input
                  type="text"
                  value={adminId}
                  onChange={(event) => setAdminId(event.target.value)}
                  placeholder="Enter admin ID"
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-slate-700 outline-none transition focus:border-[#0d9488] focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter password"
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-slate-700 outline-none transition focus:border-[#0d9488] focus:bg-white"
                  required
                />
              </div>

              <button
                type="submit"
                className="h-14 w-full rounded-2xl bg-[#055266] text-base font-semibold text-white shadow-lg shadow-teal-900/10 transition hover:bg-[#06647d]"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>

      {loadingFlag ? <LoadingComponent message="Signing you in..." /> : null}
      {errorMessage ? (
        <ErrorComponent errMsg={errorMessage} onClose={() => setErrorMessage("")} />
      ) : null}
    </div>
  );
};

export default Login;
