import React, { useEffect, useState } from 'react';
import { Box, Card, Button } from '@mui/material';
import MyDropDown from './MyDropDown';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../../../components/loader';
import Swal from 'sweetalert2';
import { isValumeDataSubmit, setOtherInfoValumePayload,setValumeData } from '../../../actions/actions';
import { fetchUserData } from '../../../utils/auth';
import {WORDS_LIMIT} from "../../../helper_functions/consts"
import {fetchKeywordSuggestions} from "../../../helper_functions/axios"

export default function MetricComponent() {
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const keywords = useSelector((state) => state?.valumeReducerData?.keywordValumeData) || [];
  const valumeOtherData = useSelector((state) => state?.valumeReducerData?.valumeOtherData);

  const getData = (data) => {
    setSearchData({ ...searchData, ...data });
  };
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

  const getSearchVolume = (data) => {
    if (data && data.keywords.length) {
      const separatedData = splitKeywords(data);
      Promise.all(
        separatedData.map((item) => { 
          return fetchKeywordSuggestions('/v3/keywords_data/google_ads/search_volume/live', [item]);
        }),
      )
        .then((response) => {
          const result = [{ result: [...response.map((item) => item[0].result)].flat() }];
          dispatch(setValumeData(result));
          dispatch(isValumeDataSubmit(false));
        })
        .catch((error) => {
          dispatch(isValumeDataSubmit(false));
          console.error(error); // Handle errors
        })
    }
  };
  const searchResult = async () => {
    if (!user) {
      Swal.fire('Error', 'User data not loaded', 'error');
      return;
    }
  
    if (!keywords || keywords.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Please enter a keyword',
      });
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await fetch('https://dashboard.keywordstrategytool.com/wp-json/custom/v1/search-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userid: user.id,
          keyword: keywords.join(', '),
        }),
      });
  
      // Check if the response status is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log('API Response:', result); // Log the API response
  
      if (result.success) {
        Swal.fire('Success', `Token used successfully. Remaining tokens: ${result.token}`, 'success');
        console.log('Dispatching setOtherInfoValumePayload:', searchData);
        dispatch(setOtherInfoValumePayload(searchData));
        console.log('Dispatching isValumeDataSubmit: true');
        dispatch(isValumeDataSubmit(true));
  
        // Call getSearchVolume after successful API response
        getSearchVolume({ keywords, ...valumeOtherData });
      } else {
        Swal.fire('Error', 'Cannot search, token is 0 please update membership', 'error');
      }
    } catch (error) {
      console.error('Error during search:', error);
      Swal.fire('Error', `An error occurred during the search: ${error.message}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <Loader visible={isLoading} />
    <Card sx={{ borderRadius: '1rem', boxShadow: 0, marginY: 4 }}>
      <Box
        paddingY={5}
        flexDirection={{ xs: 'column', md: 'row' }} // Make it column on small screens and row on medium and larger screens
        paddingX={5}>
        <Box
          display={'flex'}
          paddingX={3}
          paddingY={3}
          justifyContent="center"
          gap={2}
          sx={{
            color: '#F1F3F6',
            backgroundColor: '#F1F3F6',
            borderRadius: '.7rem',
          }}>
          <MyDropDown
            title={'Metric languages'}
            items={['English']}
            selected={'English'}
            getValue={(e) => getData({ language_name: e })}></MyDropDown>

          <MyDropDown title={'Metric currencies'} items={['British Pound']} selected={'British Pound'}></MyDropDown>

          <MyDropDown
            title={'Metric network'}
            items={['Google and Search Partner’s']}
            selected={'Google and Search Partner’s'}></MyDropDown>

          <Button
            variant="contained"
            sx={{
              bgcolor: 'orangered',
              paddingY: 0,
              marginTop: 4,
              paddingX: 10,
              borderRadius: '2rem',
            }}
            onClick={searchResult}>
            SEARCH
          </Button>
        </Box>
      </Box>
    </Card>
    </>
  );
}
