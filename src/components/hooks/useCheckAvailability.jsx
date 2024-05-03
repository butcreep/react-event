import { useState } from "react";
import axios from "axios";

const useCheckAvailability = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [availability, setAvailability] = useState({
    id: true,
    email: true,
    phoneNumber: true,
  });

  const checkField = async (field, value) => {
    if (!value) {
      setAvailability(prev => ({ ...prev, [field]: true }));
      setError(null);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/users?${field}=${value}`);
      setAvailability(prev => ({ ...prev, [field]: response.data.length === 0 }));
      setError(null);
    } catch (error) {
      console.error(`Failed to check ${field} availability:`, error);
      setAvailability(prev => ({ ...prev, [field]: false }));
      setError(`Failed to check ${field} availability`);
    } finally {
      setIsLoading(false);
    }
  };

  return { checkField, isLoading, availability, error };
};

export default useCheckAvailability;
