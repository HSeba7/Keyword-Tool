// actions.js
export const SET_DATA = 'SET_DATA';
export const SET_KEYWORDS = 'SET_KEYWORDS';
export const SET_VALUME = 'SET_VALUME';
export const SET_KEYWORD_VALUME_PAYLOAD = 'SET_KEYWORD_VALUME_PAYLOAD';
export const SET_VALUME_OTHER_PAYLOAD = 'SET_VALUME_OTHER_PAYLOAD';
export const IS_SUBMIT = 'IS_SUBMIT';
export const SET_POSITIVE_KEYWORDS = 'SET_POSITIVE_KEYWORDS';
export const SET_NEGATIVE_KEYWORDS = 'SET_NEGATIVE_KEYWORDS';
export const SET_FILTERING_TEXT = 'SET_FILTERING_TEXT';

export const setData = (data) => ({
  type: SET_DATA,
  payload: data,
});
export const setKeywordsData = (data, flag) => ({
  type: SET_KEYWORDS,
  payload: data || [],
  flag,
});

export const savePositiveKeywordsData = (data, flag) => ({
  type: SET_POSITIVE_KEYWORDS,
  payload: data || [],
  flag,
});

export const saveNegativeKeyWordsData = (data) => ({
  type: SET_NEGATIVE_KEYWORDS,
  payload: data || []
});

export const setFilteringText = (data) => ({
  type: SET_FILTERING_TEXT,
  payload: data
})

export const setValumeData = (data) => ({
  type: SET_VALUME,
  payload: data || [],
});


export const setKeywordValumePayload = (data, flag) => ({
  type: SET_KEYWORD_VALUME_PAYLOAD,
  payload: data || [],
  flag,
});


export const setOtherInfoValumePayload = (data) => ({
  type: SET_VALUME_OTHER_PAYLOAD,
  payload: data || {},
});

export const isValumeDataSubmit = (data) => ({
  type: IS_SUBMIT,
  payload: data || false,
});