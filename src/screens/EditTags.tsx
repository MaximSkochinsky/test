import { useDispatch, useSelector } from "react-redux";
import { deleteTag, saveTag, tagSetupInputValue, warningMessage } from "../redux/actions";
const Tags = ({ tagScreen }) => {
    const { tags, tagInputValue, warning } = useSelector(state => state.app);
    const dispatch = useDispatch();
    const inputHandler = (event) => {
        const value = event.target.value;
        dispatch(tagSetupInputValue(value));
    }
    const clickSaveHandler = () => {
        if(tagInputValue.length) {
            dispatch(saveTag());
        } else {
            dispatch(warningMessage())
        }
    }
    const clickDeleteTagHandler = (tag) => {
        dispatch(deleteTag(tag));
    }
    return (
        <>
            <div className="tags-h2">
                <h2>Tags List</h2>
                {}
                <div className="icon" onClick={ () => tagScreen() } data-testid='exit-svg'> 
                    <svg>
                        <use xlinkHref="#exit-icon-48x48"></use>
                    </svg>
                </div>
            </div>
            <hr></hr>
            <div className="tags-setup"> {}
                { 
                    tags && tags.length 
                        ? tags.map(( tag, index ) => (
                                <div className="tags-setup__tag" key={ index + '_2' } data-testid="tag-item">
                                    <span>{ tag }</span>
                                    <div className="icon delete" onClick={ () => clickDeleteTagHandler(tag) } data-testid={ tag + "-delete" }>
                                        <svg>
                                            <use xlinkHref="#delete-icon-48x48"></use> {}
                                        </svg>
                                    </div>
                                </div>
                            )) 
                        : (<span>No notes</span>) 
                }
            </div>
            <hr></hr>
            <h2 className="new">New Tag</h2>
            <div className="tags-setup__tag add">
                <div className="tags-setup__tag-info">
                    {}
                    <input 
                        type="text" 
                        placeholder="tag" 
                        data-testid="tags-input" 
                        onChange={ (event) => { inputHandler(event) } } 
                        value={ tagInputValue }
                        style={ warning === true ? { border: '2px solid #f36244' } : { border: '2px solid #f404040' } }
                    ></input>
                </div>
                <div className="notes__note-controls">
                    <div className="icon" onClick={ () => { clickSaveHandler() } }> {}
                        <svg data-testid="svg-save">
                            <use xlinkHref="#save-icon-48x48"></use>
                        </svg>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Tags;