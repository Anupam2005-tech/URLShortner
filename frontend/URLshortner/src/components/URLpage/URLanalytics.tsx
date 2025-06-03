import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URLanalyticsHandle, analyticsDeleteHandle } from "../../connections";
import trash from '../../assets/trash.svg'
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import QuickLinkLoader from "../utils/loader";
import { checkLoadingIn, checkLoadingOut } from "../../redux/slice/usersSlice/usersSlice";
import Popup from "../utils/Popup";
const backendURL = import.meta.env.VITE_BACKEND_URL;
import deleteTrash from '../../assets/deleteTrash.svg'
interface AnalyticsData {
  slNo: number;
  shortId: string;
  url: string;
  createdAt: string;
  clicks: number;
}

const URLanalytics: React.FC = () => {
  const dispatch = useAppDispatch();
  const isloading = useAppSelector(state => state.loading.isLoadingIn);
  const [data, setData] = useState<AnalyticsData[]>([]);
  const [error, setError] = useState<string>("");
  const [Open,setOpen]=useState(false)
  const navigate = useNavigate();

  async function fetchData() {
    dispatch(checkLoadingIn());
    const result = await URLanalyticsHandle();

    if (typeof result === "string") {
      setError(result);
    } else if (Array.isArray(result)) {
      setData(result);
      setError("");
    }
    dispatch(checkLoadingOut());
  }

  useEffect(() => {
    fetchData();
  }, [navigate]);

  async function deleteAnalytics() {
    dispatch(checkLoadingIn());
    await analyticsDeleteHandle();
    await fetchData();
    dispatch(checkLoadingOut());
  }

  // Render loader first to cover full screen if loading
  if (isloading) {
    return <QuickLinkLoader />;
  }

  return (

 <>
   <Popup
        title="Delete Analytics"
        content={`${deleteTrash}`}
        firstOption="Cancel"
        secondOption="Delete All"
        isOpen={Open}
        onclose={() => setOpen(false)}
        onfirstOption={()=>{setOpen(false)}}
        onsecondOption={deleteAnalytics}
        firstOptionColor="bg-gray-300"
        firstOptionTextColor="text-black"
        firstOptionHoverColor="hover:bg-gray-400"
        secondOptionColor="bg-red-600"
        secondOptionHoverColor="hover:bg-red-700"
        titleColor="text-red-600"
      />
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-sky-700">
          Your URL Analytics
        </h2>

        <div className="flex justify-end mb-4">
          <button
            onClick={() => setOpen(true)}
            className="bg-[#f75c5c] py-2 px-4 rounded-lg hover:cursor-pointer hover:bg-red-600 flex font-bold text-white space-x-1"
          >
            <span>Delete All</span><img src={trash} alt="delete" />
          </button>
        </div>

        {error ? (
          <p className="text-center text-red-600 text-lg">{error}</p>
        ) : data.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No analytics data found.</p>
        ) : (
          <div className="overflow-auto bg-white rounded-xl shadow-lg">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-sky-100 text-gray-800 sticky top-0 z-10 text-center">
                <tr>
                  <th className="px-6 py-4">Sl No.</th>
                  <th className="px-6 py-4">Short ID</th>
                  <th className="px-6 py-4">Original URL</th>
                  <th className="px-6 py-4">Created At</th>
                  <th className="px-6 py-4">Clicks</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={item.shortId}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-sky-50 transition-colors duration-200`}
                  >
                    <td className="px-6 py-4 text-center">{item.slNo}</td>
                    <td className="px-6 py-4 text-center text-blue-600 font-medium">
                      {item.shortId}
                    </td>
                    <td className="px-6 py-4 text-center max-w-sm truncate">
                      <a
                        href={`${backendURL}/url/${item.shortId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {item.url}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">
                      {new Date(item.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-center font-semibold">
                      {item.clicks}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div></>
  );
};

export default URLanalytics;
