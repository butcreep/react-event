import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const useFetchMails = url => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const formattedData = response.data.map(item => ({
          ...item,
          key: item.id,
          category: item.category,
          sentAt: moment(item.sentAt).format("YYYY. MM. DD"),
          time: item.time,
        }));
        setData(formattedData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useFetchMails;
