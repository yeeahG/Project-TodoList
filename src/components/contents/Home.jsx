import React, {useState, useEffect} from 'react'
import './Home.css'

//get the localstorage data back
const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");

    if(lists) { 
        return JSON.parse(lists);
    } else {
        return [];
    }
}

const Home = () => {
    const [inputData, setInputData]=useState("");
    const [items, setItems]=useState(getLocalData());
    const [isEditItem, setIsEditItem]=useState("");
    const [toggleButton, setToggleButton]=useState(false);

    //add the items function
    const addItem = () => {
        if(!inputData) {
            alert('fill the data')
        } else if(inputData && toggleButton) {
            setItems(
                items.map((curElm) => {
                    if(curElm.id === isEditItem) {
                        return{...curElm, name: inputData}
                    } return curElm;
                })
            )

        }
        else {
            const myNewInputData = {
                id:new Date().getTime().toString(),
                name: inputData,
            };
            setItems([...items, myNewInputData])
            setInputData("");
        }
    };

    //edit the items
    const editItem = (index) => {
        const item_todo_edited = items.find((curElm) => {
            return curElm.id === index;
        });
        setInputData(item_todo_edited.name);
        setIsEditItem(index);
        setToggleButton(true);
    }

    //how to delete items section
    const deleteItem = (index) => {
        const updatedItem = items.filter((curElm) => {
            return curElm.id !== index;
        });
        setItems(updatedItem);
    };

    //remove all elements
    const removeAll = () => {
        setItems([]);
    };

    //adding localStorage
    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items))
    }, [items]);

  return (
    <div className='main-div'>
        <div className='navi-content'>
            WRITE YOUR TODO
        </div>
        <div className='child-div'>
            <figure>
                {/* <img src="./images/memo.png" alt="todo-logo" /> */}
                {/*<img src="https://img.freepik.com/free-vector/dark-gradient-background-with-copy-space_53876-99548.jpg?t=st=1649588676~exp=1649589276~hmac=7d118e90082cfbb8d638ce573dc3e4e23ed0c1420ce22ca3e3b0ca520cd8f470&w=1060" alt="todo-logo" />
                 <a href="https://kr.freepik.com/vectors/background">Background 벡터는 rawpixel.com - kr.freepik.com가 제작함</a>*/}
                <figcaption>
                    writemyday
                </figcaption>
            </figure>

            <div className='todo-text'>
                <div className='addItems'>
                    <input type="text" 
                    placeholder='Add Item'
                    className='form-control'
                    value={inputData}
                    onChange={(event) => setInputData(event.target.value)}
                    />
                    {toggleButton ? 
                    <i className='edit-btn' onClick={addItem}>edit</i>
                     : 
                    <i className='add-btn' onClick={addItem}>➕</i>}
                </div>

                {/*SHOW OUR ITEMS */}
                <div className='showItems'>
                    {items.map((curElm) => {
                    return (
                        <div className='eachItem' key={curElm.id}>
                            <h3>{curElm.name}</h3>
                            <div className='todo-btn'>
                                <i className='edit-btn' onClick={() => editItem(curElm.id)}>edit</i>
                                <i onClick={() => deleteItem(curElm.id)}>➖</i>
                            </div>
                        </div>
                    )
                    })}
                </div>

                {/*DELETE ALL ITEMS */}
                <div className='showItems'>
                    <button className='del-btn' onClick={removeAll}>
                        <span>Finish</span>
                    </button>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Home