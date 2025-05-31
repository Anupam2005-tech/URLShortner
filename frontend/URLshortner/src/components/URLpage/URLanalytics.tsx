import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URLanalyticsHandle } from "../../connections";

interface AnalyticsData {
  slNo: number;
  shortId: string;
  url: string;
  createdAt: string;
  clicks: number;
}

const URLanalytics: React.FC = () => {
  const [data, setData] = useState<AnalyticsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const result = await URLanalyticsHandle();

      if (result === 401) {
        navigate("/user/login");
        return;
      }

      if (typeof result === "string") {
        setError(result);
      } else if (Array.isArray(result)) {
        setData(result);
      }
      setLoading(false);
    }

    fetchData();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-sky-700">
          Your URL Analytics
        </h2>

        {loading ? (
          <p className="text-center text-gray-600 text-lg">Loading...</p>
        ) : error ? (
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
                        href={`http://localhost:8000/url/${item.shortId}`}
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
    </div>
  );
};

export default URLanalytics;
