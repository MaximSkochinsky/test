import { DELETE_TAG, 
        SAVE_EDIT_NOTE, 
        EDIT_NOTE_BODY_VALUE, 
        EDIT_NOTE_TAGS_VALUE, 
        HIDE_WARNING, 
        SAVE_TAG, 
        SET_EDIT_NOTE, 
        SET_EDIT_NOTE_VALUES, 
        SHOW_WARNING, 
        TAG_SETUP_INPUT_VALUE, 
        DELETE_NOTE, 
        ADD_EDIT_CLICKED_TAG, 
        SET_CREATE_NOTE_VALUES,
        CREATE_NOTE_TAGS_VALUE,
        CREATE_NOTE_BODY_VALUE,
        ADD_CREATE_CLICKED_TAG,
        SAVE_CREATE_NOTE,
        SET_TAG_ACTIVE,
        SET_NOTES_ACTIVE,
        CLEAR_ACTIVE_TAGS} from "./constants"


export const tagSetupInputValue = (value) => {
    return {
        type: TAG_SETUP_INPUT_VALUE,
        payload: value
    }
}


export const saveTag = () => {
    return {
        type: SAVE_TAG
    }
}


export const showWarning = () => {
    return {
        type: SHOW_WARNING
    }
}


export const hideWarning = () => {
    return {
        type: HIDE_WARNING
    }
}


export const warningMessage = () => {
    return dispatch => {
        dispatch(showWarning());
        setTimeout(() => {
            dispatch(hideWarning());
        }, 1500)
    }
}


export const deleteTag = (index) => {
    return {
        type: DELETE_TAG,
        payload: index
    }
}


export const setEditNote = (id) => {
    return {
        type: SET_EDIT_NOTE,
        payload: id
    }
}


export const setEditNoteValues = (id) => {
    return {
        type: SET_EDIT_NOTE_VALUES,
    }
}


export const editNoteTagsValue = (value) => {
    return {
        type: EDIT_NOTE_TAGS_VALUE,
        payload: value
    }
}


export const editNoteBodyValue = (value) => {
    return {
        type: EDIT_NOTE_BODY_VALUE,
        payload: value
    }
}


export const addEditClickedTag = (tag) => {
    return {
        type: ADD_EDIT_CLICKED_TAG,
        payload: tag
    }
}


export const saveEditNote = (tags,body) => {
    return {
        type: SAVE_EDIT_NOTE,
        payload: getTags(tags,body),
    }
}


export const deleteNote = (id) => {
    return {
        type: DELETE_NOTE,
        payload: id
    }
}


export const setCreateNoteValues = () => {
    return {
        type: SET_CREATE_NOTE_VALUES,
    }
}


export const createNoteTagsValue = (value) => {
    return {
        type: CREATE_NOTE_TAGS_VALUE,
        payload: value
    }
}


export const createNoteBodyValue = (value) => {
    return {
        type: CREATE_NOTE_BODY_VALUE,
        payload: value
    }
}


export const addCreateClickedTag = (tag) => {
    return {
        type: ADD_CREATE_CLICKED_TAG,
        payload: tag
    }
}


export const saveCreateNote = (tags,body) => {
    return dispatch => {
        dispatch({
            type: SAVE_CREATE_NOTE,
            payload: getTags(tags,body)
        });
        dispatch({ type: SET_NOTES_ACTIVE })
    }
}


export const setTagActive = (tag) => {
    return dispatch => {
        dispatch({
            type: SET_TAG_ACTIVE,
            payload: tag
        });
        dispatch({ type: SET_NOTES_ACTIVE })
    }
}


export const clearActiveTags = () => {
    return {
        type: CLEAR_ACTIVE_TAGS
    }
}


const getTags = (tags, body) => {
    
    const tagsArr = tags ? tags.split(',').map(item => item.replace(/[^a-zа-яё]/gi, '')).filter(item => item !== '') : null;
    
    const bodyTagsArr = body.match(/\B(#[a-zа-яё0-9]+)(\s|\!|\?|\.|\,|\]|$)/ig)
        ? body.match(/\B(#[a-zа-яё0-9]+)(\s|\!|\?|\.|\,|\]|$)/ig).map(item => item.replace(/[^a-zа-яё]/gi, '')).filter(item => item !== '') 
        : null;

    if(!tagsArr && bodyTagsArr) {
        return [...new Set(bodyTagsArr)]
    }
    if(tagsArr && !bodyTagsArr) {
        return [...new Set(tagsArr)]
    }
    if(!tagsArr && !bodyTagsArr) {
        return []
    }
    return [...new Set(tagsArr.concat(bodyTagsArr))]
}