import { useSelector, useDispatch } from "react-redux";
import { clearActiveTags, createNoteBodyValue, deleteNote, setEditNote, setCreateNoteValues, saveCreateNote, setTagActive, warningMessage } from "../redux/actions";
const Notes = ({ tagScreen, editScreen, createScreen }) => {
    const { notes, tags, activeTags } = useSelector(state => state.app);
    const { bodyInputValue, tagsInputValue } = useSelector(state => state.app.createNote);
    const warning = useSelector(state => state.app.warning);
    const dispatch = useDispatch();
    const clickAllTagsHandler = () => {
        dispatch(clearActiveTags())
    }
    const clickTagHandler = (tag) => {
        dispatch(setTagActive(tag));
    }
    const clickEditHandler = (index) => {
        dispatch(setEditNote(index));
        editScreen();
    };
    const clickDeleteHandler = (id) => {
        dispatch(deleteNote(id));
    }
    const bodyInputHandler = (event) => {
        const value = event.target.value;
        dispatch(createNoteBodyValue(value));
    }
    const clickCreateWithTagsHandler = () => {
        dispatch(setCreateNoteValues());
        createScreen();
    };
    const clickSaveHandler = () => {
        if(bodyInputValue) {
            dispatch(saveCreateNote(tagsInputValue, bodyInputValue));
        } else {
            dispatch(warningMessage())
        }        
    }
    return (
        <>
            <h2>Notes List</h2>
            <div className="tags-container">
                {}
                <div className="tags-container__tags">
                    <span 
                        data-testid="all-tags" 
                        style={ activeTags.length > 0 ? { background: 'none', color: '#f36244' } : { background: '#f36244' } }
                        onClick={ () => clickAllTagsHandler() }
                     >All</span>
                    { tags.length && tags.map(( tag ) => (<span 
                        key={ tag + '_1' } 
                        className={ activeTags.indexOf(tag) !== -1 ? 'active' : '' }  
                        data-testid="span"
                        onClick={ () => clickTagHandler(tag) }
                    >{ tag }</span>)) }
                </div>
                {}
                <div className="icon" onClick={ () => tagScreen() } data-testid='svg-setup'>
                    <svg>
                        <use xlinkHref="#setup-icon-48x48"></use>
                        <title id="title">Setup tags</title>
                    </svg>
                </div>
            </div>
            <hr></hr>
            <div className="notes" data-testid="notes">
                {}
                {
                    notes.length 
                        ? notes.map(({ tags, body, id, active }, index) => active && ( 
                            <div className="notes__note" key={ index.toString() + '_1' }>
                                <div className="notes__note-info" data-testid={ index + "-note" }>
                                    <span className="note-tags">{
                                        tags && tags.map((tag, i) => i === (tags.length - 1) ? ('#' + tag) : ('#' + tag + ', '))
                                    }</span>
                                    <span className="note-body">{ body }</span>
                                </div>
                                <div className="notes__note-controls">
                                    {}
                                    <div className="icon" onClick={ () => { clickEditHandler(index) } } data-testid={ index + "-edit" }>
                                        <svg>
                                            <use xlinkHref="#edit-icon-48x48"></use>
                                        </svg>
                                    </div>
                                    {}
                                    <div className="icon delete" onClick={ () => { clickDeleteHandler(id) } } data-testid={ index + "-delete" }>
                                        <svg>
                                            <use xlinkHref="#delete-icon-48x48"></use>
                                        </svg>
                                    </div>
                                </div>      
                            </div>
                            ))
                        : (
                            <span>No notes</span>
                        )
                }
            </div>
            <hr></hr>
            <h2 className="new">New Note</h2>
            <div className="notes__note add ">
                <div className="notes__note-info">
                    {}
                    <input 
                        type="text" 
                        placeholder="type note here" 
                        value={ bodyInputValue } 
                        data-testid="body-input" 
                        onChange={ (event) => bodyInputHandler(event) }
                        style={ warning === true ? { border: '2px solid #f36244' } : { border: '2px solid #f404040' } }
                    ></input>
                </div>
                <div className="notes__note-controls mr-1em">
                    {}
                    <div className="icon" onClick={ () => clickCreateWithTagsHandler() } data-testid='svg-save-extended'>
                        <svg data-testid="svg-tag">
                            <use xlinkHref="#tag-icon-48x48"></use>
                            <title id="title">Create note with tag</title>
                        </svg>
                    </div>
                    {}
                    <div className="icon" onClick={ () => clickSaveHandler() } data-testid='svg-save-simple'>
                        <svg data-testid="svg-save">
                            <use xlinkHref="#save-icon-48x48"></use>
                            <title id="title">Save note</title>
                        </svg>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Notes;