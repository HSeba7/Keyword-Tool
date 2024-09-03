import React, { useEffect, useState } from 'react';
import { Box, Card, TextField, Typography, Chip } from '@mui/material';
import Swal from 'sweetalert2';
import XIcon from '../../../checkbox_icons/XIcon.png';
import { useDispatch, useSelector } from 'react-redux';
import { setKeywordValumePayload } from '../../../actions/actions';
import { WORDS_LIMIT } from '../../../helper_functions/consts';

export default function GoogleSearchVolume() {
  const keywordValumeData = useSelector((state) => state?.valumeReducerData?.keywordValumeData) || [];
  const [keywords, setKeywords] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setKeywords([...keywordValumeData]);
  }, [keywordValumeData]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      setKeywords([...keywords, inputValue.trim()]);
      setInputValue('');
      dispatch(setKeywordValumePayload([...keywords, inputValue.trim()]));
    } else if (event.key === 'Enter') {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Please enter a keyword',
      });
    }
  };

  const handleRemoveKeyword = (keywordToRemove) => {
    const newKeywords = keywords?.filter((keyword) => keyword !== keywordToRemove);

    setKeywords(newKeywords);
    dispatch(setKeywordValumePayload([...newKeywords]));
  };

  return (
    <>
      <Card sx={{ borderRadius: '1rem', boxShadow: 0, marginY: 4, height: 280 }}>
        <Box paddingY={5} paddingX={5}>
          <Typography sx={{ mb: 1 }} fontWeight={'bold'} fontSize={25} textAlign={'start'}>
            GOOGLE SEARCH VOLUME
          </Typography>
          <TextField
            fullWidth
            error={keywordValumeData.length >= WORDS_LIMIT}
            helperText={
              keywordValumeData.length >= WORDS_LIMIT ? `The limit of ${WORDS_LIMIT} keywords has been reached` : ''
            }
            disabled={keywords.length >= WORDS_LIMIT}
            id="standard-basic"
            label=""
            variant="standard"
            placeholder="Keywords"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleEnterKeyPress}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              borderColor: '#E4E4E4',
              '& label': {
                borderColor: '#E4E4E4',
              },
              '& label.Mui-focused': {
                borderColor: '#E4E4E4',
              },
              '& .MuiInput-underline:after': {
                borderColor: '#E4E4E4',
              },
              '& .MuiOutlinedInput-root': {
                '& ': {
                  borderColor: '#E4E4E4',
                },
                '&:hover fieldset': {
                  borderColor: '#E4E4E4',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#E4E4E4',
                },

                '& .MuiInput-underline:hover:before': {
                  border: 'none !important',
                },
              },
              '& input': {
                border: 'none',
                paddingX: 0,
                paddingY: '5px',
                fontSize: '18px',
              },
            }}
          />

          <Box
            marginTop={2}
            justifyContent={'start'}
            display="flex"
            flexWrap="wrap"
            paddingBottom={8}
            sx={{
              height: 200,
              overflowY: 'scroll',
            }}>
            {keywords.map((keyword, index) => (
              <Chip
                key={index}
                label={keyword}
                variant="outlined"
                onDelete={() => handleRemoveKeyword(keyword)}
                sx={{
                  paddingY: 2.2,
                  paddingLeft: 2,
                  borderRadius: '2rem',
                  backgroundColor: '#0D4BC1',
                  color: 'white',
                  marginRight: 1,
                  marginBottom: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  textAlign: 'start', // Align the label at the start
                }}
                deleteIcon={
                  <Box display="flex" alignItems="flex-end">
                    <img
                      height={15}
                      width={19}
                      style={{
                        marginLeft: 10,
                        paddingRight: 4,
                        marginBottom: 1,
                      }}
                      src={XIcon}
                      alt="close-icon"
                    />
                  </Box>
                }
              />
            ))}
          </Box>
        </Box>
      </Card>
    </>
  );
}
