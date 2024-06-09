import { combineReducers } from 'redux';
import {
    SET_DATA,
    SET_KEYWORDS,
    SET_VALUME,
    SET_KEYWORD_VALUME_PAYLOAD,
    SET_VALUME_OTHER_PAYLOAD,
    IS_SUBMIT,
    SET_POSITIVE_KEYWORDS,
    SET_NEGATIVE_KEYWORDS,
    SET_FILTERING_TEXT,
} from '../actions/actions.js';

const dataReducer = (state = [], action) => {
    switch (action.type) {
        case SET_DATA:
            return action.payload;
        case SET_KEYWORDS:
            if (action.flag === false) {
                return action.payload;
            } else {
                return state.concat(action.payload);
            }
        default:
            return state;
    }
};

const positiveKeyWordsReducer = (state = [], action) => {
    switch (action.type) {
        case SET_POSITIVE_KEYWORDS:
            if (action.flag) {
                if (action.flag === false) {
                    return action.payload;
                } else {
                    return [
                        ...new Map(
                            state
                                .concat(action.payload)
                                .map((m) => [m.label, m])
                        ).values(),
                    ];
                    // return state.concat(action.payload)
                }
            } else {
                return action.payload;
            }
        default:
            return state;
    }
};

const negativeKeyWordsReducer = (state = [], action) => {
    switch (action.type) {
        case SET_NEGATIVE_KEYWORDS:
            return action.payload;
        default:
            return state;
    }
};

const filteringTextReducer = (state = '', action) => {
    switch (action.type) {
        case SET_FILTERING_TEXT:
            return action.payload;
        default:
            return state;
    }
};

const volumeReducer = (
    state = {
        valumeData: [],
        keywordValumeData: [],
        valumeOtherData: [],
        isSubmit: false,
    },
    action
) => {
    switch (action.type) {
        case SET_VALUME:
            return { ...state, valumeData: action.payload };
        case SET_KEYWORD_VALUME_PAYLOAD:
            return { ...state, keywordValumeData: action.payload };
        case SET_VALUME_OTHER_PAYLOAD:
            return { ...state, valumeOtherData: action.payload };
        case IS_SUBMIT:
            return { ...state, isSubmit: action.payload };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    data: dataReducer,
    positiveKeyWordsReducer: positiveKeyWordsReducer,
    negativeKeyWordsReducer: negativeKeyWordsReducer,
    filteringTextData: filteringTextReducer,
    valumeReducerData: volumeReducer,
});

export default rootReducer;
