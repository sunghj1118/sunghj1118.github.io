import React, { useState, useEffect } from 'react';

const ViewCount = ({ path }) => {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch(`https://sunghj1118.goatcounter.com/counter/${encodeURIComponent(path)}.json`);
        const data = await response.json();
        setCount(data.count);
      } catch (error) {
        console.error('Error fetching view count:', error);
      }
    };

    fetchCount();
  }, [path]);

  if (count === null) return null;

  return <p>Views: {count}</p>;
};

export default ViewCount;