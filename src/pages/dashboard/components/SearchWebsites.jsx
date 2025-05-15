import React, { useEffect, useState } from 'react';
import { Button, TextField, InputAdornment, Box, Card, Typography, Checkbox } from '@mui/material';
import { Loader } from '../../../components/loader';
import CheckedIcon from '../../../checkbox_icons/checked.png';
import UnCheckedIcon from '../../../checkbox_icons/unchecked.png';
import SearchIcon from '@mui/icons-material/Search';
import LocationDropDown from './LocationSelect';
import { blueGrey, grey } from '@mui/material/colors';
import ServiceButton from './ServiceButton';
import { fetchKeywordSuggestions } from '../../../helper_functions/axios';
import {
  setKeywordsData,
  savePositiveKeywordsData,
  setOtherInfoValumePayload,
  isValumeDataSubmit,
} from '../../../actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { setKeywordValumePayload } from '../../../actions/actions';
import { WORDS_LIMIT } from '../../../helper_functions/consts';
import Swal from 'sweetalert2';
import { fetchUserData } from '../../../utils/auth';

const SearchWebsites = ({ setAllowedToSend }) => {
  const { keywordValumeData } = useSelector((state) => state?.valumeReducerData);
  const [selectedService, setSelectedService] = useState('GOOGLE');
  const [keywords, setKeywords] = useState('');
  const [location, setLocation] = useState('');
  const [language, setLanguage] = useState('');
  const [checkBox, setChecked] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [searchData, setSearchData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setAllowedToSend(keywordValumeData.length <= WORDS_LIMIT);
  }, [keywordValumeData]);

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

  const setCheckBox = () => {
    setChecked(!checkBox);
  };

  const handleServiceChange = (data) => {
    setSelectedService(data);
  };

  const handleKeywordChange = (event) => {
    setKeywords(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.location);
    setLanguage(event.language);
  };

  const searchResult = async () => {
    if (!keywords) {
      Swal.fire('Error', 'Please enter keywords', 'error');
      return;
    }

    if (!user) {
      Swal.fire('Error', 'User data not loaded', 'error');
      return;
    }

    try {
      const response = await fetch('https://dashboard.keywordstrategytool.com/wp-json/custom/v1/search-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userid: user.id,
          keyword: keywords,
        }),
        
      });

      if (!response.ok) {
        const errorDetails = await response.text(); // Get error details from response
        console.error('API Error:', errorDetails);
        Swal.fire('Error', 'Cannot search, token is 0 please update membership', 'error');
        return;
      }

      const result = await response.json();
      console.log('API Response:', result); // Log the API response

      if (result.success) {
        if (result.token > 0) {
          // Proceed with keyword suggestions API call
          const post_array = [
            {
              keyword: keywords, // Use actual keyword input
              language_name: language || 'English',
              location_name: location || 'United Kingdom', // Use actual location input
              include_serp_info: false,
              limit: 1000,
              include_seed_keyword: false,
            },
          ];

          setIsLoading(true);

          const keywordResponse = await fetchKeywordSuggestions(
            '/v3/dataforseo_labs/keyword_suggestions/live',
            post_array,
          );
          console.log('Keyword Suggestions:', keywordResponse);

          const allKeywords = [];
          const keywordsArr = [];
          keywordResponse.forEach((apiResponse) => {
            apiResponse.result.forEach((result) => {
              result.items.forEach((item) => {
                allKeywords.push({ label: item.keyword, isChecked: false });
                keywordsArr.push(item.keyword);
              });
            });
          });

          dispatch(setKeywordValumePayload([...keywordsArr], checkBox));
          dispatch(setKeywordsData(allKeywords, checkBox));
          dispatch(savePositiveKeywordsData(allKeywords, checkBox));
          setSearchData(allKeywords);

          Swal.fire('Success', `Token used successfully. Remaining tokens: ${result.token}`, 'success');
          dispatch(setOtherInfoValumePayload({ language_name: 'English', userid: user.id }));
          dispatch(isValumeDataSubmit(true));
        } else {
          Swal.fire('Error', 'Cannot search, token is 0. Please update membership.', 'error');
        }
      } else {
        Swal.fire('Error', 'Cannot search, token is 0. Please update membership.', 'error');
      }
    } catch (error) {
      console.error('Error during search:', error);
      Swal.fire('Error', 'An error occurred during the search', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Loader visible={isLoading} />
      <Card sx={{ borderRadius: '1rem', boxShadow: 0, marginTop: 3 }}>
        <Box sx={{ alignItems: 'center', gap: 2, paddingTop: 5, paddingX: 5 }}>
          <Box display={'flex'} sx={{ paddingX: 2 }}>
            <ServiceButton
              selectedService={selectedService}
              service="GOOGLE"
              onClick={() => handleServiceChange('GOOGLE')}
            />
            {/* Add more buttons for other services if needed */}
          </Box>

          <Box
            display={'flex'}
            sx={{
              position: 'relative',
              color: blueGrey[50],
              borderRadius: '1rem',
              gap: 4,
              backgroundColor: blueGrey[50],
              paddingY: 3,
              paddingX: 2,
            }}>
            <TextField
              variant="outlined"
              value={keywords}
              fullWidth
              type="search"
              placeholder="Keywords"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& input': {
                    borderColor: 'white',
                  },
                },
              }}
              onChange={handleKeywordChange}
              InputProps={{
                style: {
                  borderRadius: '30px',
                  backgroundColor: 'white',
                  borderColor: 'white',
                  height: '100%',
                  borderWidth: 0,
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            <LocationDropDown onLocationChange={handleLocationChange} />
            <Button
              variant="contained"
              onClick={searchResult}
              sx={{
                bgcolor: 'orangered',
                paddingY: 2,
                paddingX: 13,
                borderRadius: '2rem',
              }}>
              SEARCH
            </Button>
            {keywordValumeData.length >= WORDS_LIMIT && (
              <Typography variant="p" color={'red'} sx={{ position: 'absolute', bottom: '0' }}>
                The limit of {WORDS_LIMIT} keywords has been reached
              </Typography>
            )}
          </Box>

          <Box display={'flex'} justifyContent="center" alignItems="center">
            <Checkbox
              icon={<img alt="unCheckedIcon" height={30} width={30} src={UnCheckedIcon}></img>}
              checkedIcon={<img alt="checkedIcon" height={30} width={30} src={CheckedIcon}></img>}
              checked={checkBox}
              onClick={() => setChecked((e) => !e)}
            />
            <Typography variant="h5" paddingY={3} color={grey[500]}>
              Select this box to apply new suggestions to current list
            </Typography>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default SearchWebsites;
