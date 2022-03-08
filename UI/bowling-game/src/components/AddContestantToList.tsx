import React, { useState } from 'react'
import { IContestant } from '../Interfaces/Interfaces';

interface IProps {
    setContestant: React.Dispatch<React.SetStateAction<IContestant[]>>
    contestant: IContestant[]
}

const AddContestantToList: React.FC<IProps> = ({setContestant, contestant}) => {

    const [input, setInput] = useState({
        name: "",
    }) 
    const [isContestantAdded, SetContestantAdded] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleClick = () => {
        if(!input.name) return

        if(!isContestantAdded){
            setContestant([
                ...contestant,
                {
                    contestantName: input.name
                }
            ]);

            setInput({
                name: ''
            })
        }
    }

   const handleCheckAddedContestant = (name: string) => {
        return contestant.some(c => name === c.contestantName);
    }

    return (
        <div className="AddToList">
            <input 
                type="text"
                onChange={handleChange}
                className="AddToList-input"
                name="name"
                value={input.name}
                placeholder="contestant Name"
            />
            {(contestant.length > 0) ? <div className='success-message'>
                {contestant.map((x,i)=>{
                    return <><span key={i+x.contestantName} className='success-text'>{i+1}. {x.contestantName} Added</span><br /></>
                })}
            </div> : null}
            <button
                onClick={() =>{
                    SetContestantAdded(handleCheckAddedContestant(input.name));
                    handleClick();
                }}
                className="AddToList-btn"
            >
                Add to contestant
            </button>
            {(isContestantAdded) ?
            <div className="error-message"> 
                <span className="error-text">Contestant name {input.name} is already added.</span>
            </div> : null}
        </div>
    )
}

export default AddContestantToList