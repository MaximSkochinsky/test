import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEditClickedTag, editNoteBodyValue, editNoteTagsValue, saveEditNote, setEditNoteValues, warningMessage } from "../redux/actions";
const EditNote = ({ editScreen }) => {
    const { tagsInputValue, bodyInputValue, availableTags } = useSelector(state => state.app.editNote);
    const warning = useSelector(state => state.app.warning);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setEditNoteValues())
    }, [])
    const tagClickHandler = (tag) => {
        dispatch(addEditClickedTag(tag))
    }
    const tagsInputHandler = (event) => {
        const value = event.target.value;
        dispatch(editNoteTagsValue(value));
    }
    const bodyInputHandler = (event) => {
        const value = event.target.value;
        dispatch(editNoteBodyValue(value));
    }
    const clickSaveHandler = () => {
        if(bodyInputValue) {
            dispatch(saveEditNote(tagsInputValue, bodyInputValue));
            editScreen();
        } else {
            dispatch(warningMessage())
        }        
    }
    return (
        <>
            <div className="tags-h2">
                <h2>Edit Note</h2>
                {}
                <div className="icon" onClick={ () => clickSaveHandler() } data-testid='exit-svg'>
                    <svg>
                        <use xlinkHref="#exit-icon-48x48"></use>
                    </svg>
                </div> 
            </div>        
            <div className="notes__note add ">
                <div className="notes__note-info">
                    <div className="tags-container">
                        <div className="tags-container__tags">
                            {}
                            { availableTags.map(( tag ) => (<span 
                                key={ tag + '_1' } 
                                data-testid="span"
                                onClick={ () => tagClickHandler(tag) }
                            >{ tag }</span>)) }
                        </div>
                    </div>
                    {}
                    <input 
                        type="text" 
                        className="tag-input"
                        placeholder="tags" 
                        data-testid="tags-input" 
                        value={ tagsInputValue }
                        onChange={ (event) => tagsInputHandler(event) }
                    ></input>
                    {}
                    <textarea 
                        type="text" 
                        placeholder="body" 
                        data-testid="body-input" 
                        value={ bodyInputValue }
                        onChange={ (event) => bodyInputHandler(event) }
                        style={ warning === true ? { border: '2px solid #f36244' } : { border: '2px solid #f404040' } }
                    ></textarea>
                    <div className="add-note">
                        {}
                        <div className="icon" onClick={ () => clickSaveHandler() }>
                            <svg data-testid="svg-save">
                                <use xlinkHref="#save-icon-48x48"></use>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default EditNote;