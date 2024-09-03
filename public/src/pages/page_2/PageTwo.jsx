import DashboardTextCard from '../dashboard/components/DashboardTextCard';
import BasicTable from './components/BasicTable';
import GoogleSearchVolume from './components/GoogleSearchVolume';
import MetricComponent from './components/MetricComponent';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchKeywordSuggestions } from '../../helper_functions/axios';
import { isValumeDataSubmit, setValumeData,setOtherInfoValumePayload} from '../../actions/actions';
import { WORDS_LIMIT } from '../../helper_functions/consts';
import { fetchUserData } from '../../utils/auth';
import Swal from 'sweetalert2';

export default function PageTwo() {
  const keywordValumeData = useSelector((state) => state?.valumeReducerData?.keywordValumeData);

  const isValumeDataSubmitData = useSelector((state) => state?.valumeReducerData?.isSubmit);
  const valumeOtherData = useSelector((state) => state?.valumeReducerData?.valumeOtherData);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({ keywords: keywordValumeData });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await fetchUserData();
        setUser(userData);
        dispatch(setOtherInfoValumePayload({ language_name: 'English', userid: userData.id }));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, [dispatch]);

  // const handleApi = async () => {
  //   if (!user) {
  //     console.error('User is not defined');
  //     return; // Exit the function if user is not available
  //   }
  
  //   try {
  //     const response = await fetch('https://dashboard.keywordstrategytool.com/wp-json/custom/v1/search-details', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         userid: user.id, // user.id is safe to use here
  //         keyword: "keyword",
  //       }),
  //     });
  
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  
  //     const data = await response.json();
  
  //     if (data.success) {
  //       Swal.fire('Success', `Token used successfully. Remaining tokens: ${data.token}`, 'success');
  //     } else {
  //       Swal.fire('Error', 'Cannot search, token is 0 please update membership', 'error');
  //     }
  //     console.log('Success:', data);
  
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };
  
  

  // const getSearchVolume = (data) => {
  //   if (data && data.keywords.length) {
  //     const separatedData = splitKeywords(data);
  //     Promise.all(
  //       separatedData.map((item) => { 
  //         return fetchKeywordSuggestions('/v3/keywords_data/google_ads/search_volume/live', [item]);
  //       }),
  //     )
  //       .then((response) => {
  //         const result = [{ result: [...response.map((item) => item[0].result)].flat() }];
  //         dispatch(setValumeData(result));
  //         dispatch(isValumeDataSubmit(false));
  //       })
  //       .catch((error) => {
  //         dispatch(isValumeDataSubmit(false));
  //         console.error(error); // Handle errors
  //       })
  //   }
  // };

  // // // useEffect(()=> {
  // // //     if (keywordValumeData?.length && !isValumeDataSubmitData) {
  // // //         getSearchVolume(payload);
  // // //     }
  // // // }, [keywordValumeData]);

  // useEffect(() => {
  //   if (isValumeDataSubmitData) {
  //     const newPayload = { ...payload, keywords: keywordValumeData, ...valumeOtherData };
  //     setPayload(newPayload);
  //     getSearchVolume(newPayload);
  //   }
  // }, [isValumeDataSubmitData]);

  return (
    <>
      <DashboardTextCard></DashboardTextCard>
      <GoogleSearchVolume></GoogleSearchVolume>
      <MetricComponent WORDS_LIMIT = {WORDS_LIMIT}fetchKeywordSuggestions={fetchKeywordSuggestions}></MetricComponent>
      <BasicTable></BasicTable>
    </>
  );
}

function splitKeywords(data) {
  let res = [];
  const capacity = WORDS_LIMIT / 4;
  let wordsCopied = 0;

  for (let i = 0; i < 4; i++) {
    if (!data.keywords[wordsCopied]) {
      break;
    }

    res.push({
      ...data,
      keywords: [],
    });

    while (data.keywords[wordsCopied]) {
      const current = data.keywords[wordsCopied];

      if (wordsCopied === capacity * i + capacity) {
        break;
      }

      res[i].keywords.push(current);
      wordsCopied++;
    }
  }

  return res;
}
